// Asgard Chrome Extension - Popup logic

const pinInput  = document.getElementById('pinInput');
const mainBtn   = document.getElementById('mainBtn');
const statusPill = document.getElementById('statusPill');
const statusText = document.getElementById('statusText');
const dot        = document.getElementById('dot');

let isPolling = false;

async function refreshStatus() {
  chrome.runtime.sendMessage({ type: 'STATUS' }, (res) => {
    if (chrome.runtime.lastError) return;
    isPolling = res?.polling || false;
    setUI(isPolling);
  });

  // Also restore saved PIN
  const data = await chrome.storage.local.get('asgard_pin');
  if (data.asgard_pin) {
    pinInput.value = data.asgard_pin;
  }
}

function setUI(active) {
  if (active) {
    statusPill.className = 'status-pill active';
    statusText.textContent = 'Connected';
    dot.className = 'dot green';
    mainBtn.className = 'btn stop';
    mainBtn.textContent = 'Disconnect';
  } else {
    statusPill.className = 'status-pill inactive';
    statusText.textContent = 'Inactive';
    dot.className = 'dot grey';
    mainBtn.className = 'btn start';
    mainBtn.textContent = 'Connect';
  }
}

mainBtn.addEventListener('click', () => {
  const pin = pinInput.value.trim();

  if (!isPolling) {
    // Start
    chrome.runtime.sendMessage({ type: 'START', pin }, (res) => {
      if (res?.ok) {
        isPolling = true;
        setUI(true);
      }
    });
  } else {
    // Stop
    chrome.runtime.sendMessage({ type: 'STOP' }, (res) => {
      if (res?.ok) {
        isPolling = false;
        setUI(false);
      }
    });
  }
});

// Initialise
refreshStatus();
