// Asgard Chrome Extension - Background Service Worker
// Polls falkor-desktop for pending chrome_* commands and executes them.

const WORKER_URL = 'https://falkor-desktop.luckdragon.io';
const POLL_INTERVAL_MS = 2500;

let pin = '';
let polling = false;
let pollTimer = null;

// ── Load saved settings ──────────────────────────────────────────────────────
async function loadSettings() {
  const data = await chrome.storage.local.get(['asgard_pin', 'asgard_active']);
  pin = data.asgard_pin || '';
  return !!data.asgard_active;
}

// ── Start / stop polling ─────────────────────────────────────────────────────
async function startPolling() {
  if (polling) return;
  polling = true;
  await chrome.storage.local.set({ asgard_active: true });
  schedulePoll();
  console.log('[Asgard] Polling started');
}

function stopPolling() {
  polling = false;
  if (pollTimer) { clearTimeout(pollTimer); pollTimer = null; }
  chrome.storage.local.set({ asgard_active: false });
  console.log('[Asgard] Polling stopped');
}

function schedulePoll() {
  if (!polling) return;
  pollTimer = setTimeout(doPoll, POLL_INTERVAL_MS);
}

// ── Main poll loop ───────────────────────────────────────────────────────────
async function doPoll() {
  if (!polling) return;
  try {
    const res = await fetch(`${WORKER_URL}/chrome/pending`, {
      headers: { 'X-Pin': pin }
    });
    if (res.ok) {
      const data = await res.json();
      const commands = data.commands || [];
      for (const cmd of commands) {
        await executeCommand(cmd);
      }
    }
  } catch (e) {
    console.warn('[Asgard] Poll error:', e.message);
  }
  schedulePoll();
}

// ── Execute a single command ─────────────────────────────────────────────────
async function executeCommand(cmd) {
  const { id, command, payload } = cmd;
  let result = { ok: false, error: 'Unknown command' };

  try {
    switch (command) {
      case 'navigate':
        result = await cmdNavigate(payload);
        break;
      case 'screenshot':
        result = await cmdScreenshot(payload);
        break;
      case 'extract':
        result = await cmdExtract(payload);
        break;
      case 'click':
        result = await cmdClick(payload);
        break;
      case 'type':
        result = await cmdType(payload);
        break;
      default:
        result = { ok: false, error: `Unknown command: ${command}` };
    }
  } catch (e) {
    result = { ok: false, error: e.message };
  }

  // Post result back
  try {
    await fetch(`${WORKER_URL}/chrome/result/${id}`, {
      method: 'POST',
      headers: { 'X-Pin': pin, 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    });
  } catch (e) {
    console.warn('[Asgard] Failed to post result:', e.message);
  }
}

// ── Command implementations ──────────────────────────────────────────────────

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) throw new Error('No active tab');
  return tab;
}

// navigate: go to a URL
async function cmdNavigate(payload) {
  const url = payload?.url;
  if (!url) return { ok: false, error: 'url required' };
  const tab = await getActiveTab();
  await chrome.tabs.update(tab.id, { url });
  // Wait for tab to load
  await waitForTabLoad(tab.id);
  return { ok: true, result: `Navigated to ${url}` };
}

function waitForTabLoad(tabId, timeoutMs = 10000) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      chrome.tabs.onUpdated.removeListener(listener);
      resolve();
    }, timeoutMs);

    function listener(id, info) {
      if (id === tabId && info.status === 'complete') {
        clearTimeout(timeout);
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    }
    chrome.tabs.onUpdated.addListener(listener);
  });
}

// screenshot: capture the active tab as PNG base64
async function cmdScreenshot(payload) {
  const fullPage = payload?.full_page || false;
  const tab = await getActiveTab();

  if (fullPage) {
    // Inject content script to scroll-capture full page
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getFullPageDimensions
    });
    const dims = results[0]?.result || {};
    const origHeight = dims.scrollHeight || 0;

    // Scroll to bottom to trigger lazy loads
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.scrollTo(0, document.body.scrollHeight)
    });
    await sleep(300);
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.scrollTo(0, 0)
    });
    await sleep(200);
  }

  const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {
    format: 'png'
  });

  // Strip data:image/png;base64, prefix
  const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
  return {
    ok: true,
    result: 'Screenshot captured',
    image_data_url: dataUrl,
    image_b64: base64,
    image_mime: 'image/png'
  };
}

function getFullPageDimensions() {
  return {
    scrollHeight: document.documentElement.scrollHeight,
    scrollWidth: document.documentElement.scrollWidth
  };
}

// extract: get text or html from tab, optionally scoped to a selector
async function cmdExtract(payload) {
  const format = payload?.format || 'text';
  const selector = payload?.selector || null;
  const tab = await getActiveTab();

  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: extractContent,
    args: [format, selector]
  });

  const content = results[0]?.result || '';
  return { ok: true, result: content };
}

function extractContent(format, selector) {
  const el = selector ? document.querySelector(selector) : document.documentElement;
  if (!el) return `Selector "${selector}" not found`;
  if (format === 'html') return el.outerHTML;
  return el.innerText || el.textContent || '';
}

// click: click a CSS selector
async function cmdClick(payload) {
  const selector = payload?.selector;
  if (!selector) return { ok: false, error: 'selector required' };
  const tab = await getActiveTab();

  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: clickElement,
    args: [selector]
  });

  return results[0]?.result || { ok: false, error: 'Click failed' };
}

function clickElement(selector) {
  const el = document.querySelector(selector);
  if (!el) return { ok: false, error: `Selector "${selector}" not found` };
  el.click();
  return { ok: true, result: `Clicked: ${selector}` };
}

// type: type text into a selector, optionally submit
async function cmdType(payload) {
  const selector = payload?.selector;
  const text = payload?.text;
  const submit = payload?.submit || false;
  if (!selector) return { ok: false, error: 'selector required' };
  if (text === undefined) return { ok: false, error: 'text required' };
  const tab = await getActiveTab();

  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: typeIntoElement,
    args: [selector, text, submit]
  });

  return results[0]?.result || { ok: false, error: 'Type failed' };
}

function typeIntoElement(selector, text, submit) {
  const el = document.querySelector(selector);
  if (!el) return { ok: false, error: `Selector "${selector}" not found` };
  el.focus();
  el.value = text;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  if (submit) {
    const form = el.closest('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    } else {
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
    }
  }
  return { ok: true, result: `Typed into: ${selector}` };
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ── Message handler from popup ───────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'START') {
    pin = msg.pin || pin;
    chrome.storage.local.set({ asgard_pin: pin });
    startPolling();
    sendResponse({ ok: true, status: 'polling' });
  } else if (msg.type === 'STOP') {
    stopPolling();
    sendResponse({ ok: true, status: 'stopped' });
  } else if (msg.type === 'STATUS') {
    sendResponse({ ok: true, polling, pin: pin ? '••••' : '' });
  }
  return true;
});

// ── Auto-start if previously active ─────────────────────────────────────────
(async () => {
  const active = await loadSettings();
  if (active && pin) {
    startPolling();
  }
})();
