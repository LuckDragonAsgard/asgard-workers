// Asgard Chrome Extension - Content Script
// Injected into every page. Listens for messages from the background worker.

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'PING') {
    sendResponse({ ok: true, url: window.location.href });
  }
  return true;
});
