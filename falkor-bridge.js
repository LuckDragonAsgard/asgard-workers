#!/usr/bin/env node
// falkor-bridge.js — Phase 81: PC bridge for Falkor agent
// Gives Falkor real-time control over your PC via WebSocket
//
// Setup (one-time):
//   npm install ws          (for Node.js WebSocket)
//   pip install pillow      (for screenshots)
//
// Run:
//   node falkor-bridge.js
//
// Optional PIN override:
//   FALKOR_PIN=xxxx node falkor-bridge.js

const WebSocket = require('ws');
const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');
const os   = require('os');

const FALKOR_WS_URL   = process.env.FALKOR_WS_URL || 'wss://falkor-agent.luckdragon.io/';
const RECONNECT_DELAY = 5000;
const PLATFORM = process.platform;
const HOSTNAME = os.hostname();
const HOME     = os.homedir();

const CAPABILITIES = [
  'list_dir', 'read_file', 'run_command', 'open_app',
  'open_url', 'screenshot', 'disk_info', 'system_info', 'search_files'
];

let ws;
let bridgeId = null;
let reconnectTimer = null;

// ── Connection ────────────────────────────────────────────────────────────────
function connect() {
  console.log(`🔌 Connecting to ${FALKOR_WS_URL}...`);
  ws = new WebSocket(FALKOR_WS_URL);

  ws.on('open', () => {
    console.log('✅ Connected!');
    ws.send(JSON.stringify({
      type: 'bridge_register',
      capabilities: CAPABILITIES,
      platform: PLATFORM,
      hostname: HOSTNAME,
      home: HOME,
    }));
  });

  ws.on('message', async (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }

    if (msg.type === 'bridge_ack') {
      bridgeId = msg.bridgeId;
      console.log(`🎯 Registered! Bridge is live. bridgeId=${bridgeId}`);
      console.log(`   Platform: ${PLATFORM} | Host: ${HOSTNAME}`);
      console.log(`   Capabilities: ${CAPABILITIES.join(', ')}`);
      return;
    }

    if (msg.type === 'bridge_command') {
      const { commandId, command, args = {} } = msg;
      console.log(`\n▶️  [${commandId}] ${command}`, JSON.stringify(args));
      let result;
      try {
        result = { ok: true, ...(await executeCommand(command, args)) };
        console.log(`✅ [${commandId}] done`);
      } catch (e) {
        result = { ok: false, error: e.message };
        console.log(`❌ [${commandId}] ${e.message}`);
      }
      ws.send(JSON.stringify({ type: 'bridge_result', commandId, data: result }));
      return;
    }

    if (msg.type === 'ping') { ws.send(JSON.stringify({ type: 'pong' })); }
  });

  ws.on('close', () => {
    console.log('🔴 Disconnected. Reconnecting in 5s...');
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(connect, RECONNECT_DELAY);
  });

  ws.on('error', (err) => {
    console.error('⚠️  WS error:', err.message);
  });
}

// ── Command executor ──────────────────────────────────────────────────────────
async function executeCommand(cmd, args) {
  switch (cmd) {
    case 'list_dir': {
      const dir = args.path || HOME;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      return { path: dir, entries: entries.slice(0, 200).map(e => ({ name: e.name, type: e.isDirectory() ? 'dir' : 'file' })) };
    }

    case 'read_file': {
      const content = fs.readFileSync(args.path, 'utf8');
      return { path: args.path, content: content.slice(0, 50_000) };
    }

    case 'run_command': {
      const output = execSync(args.cmd, { encoding: 'utf8', timeout: 30_000, shell: true });
      return { output: output.slice(0, 50_000) };
    }

    case 'open_app': {
      const app = args.app || args.name;
      if (PLATFORM === 'win32') execSync(`start "" "${app}"`);
      else if (PLATFORM === 'darwin') execSync(`open -a "${app}"`);
      else execSync(`xdg-open "${app}"`);
      return { opened: app };
    }

    case 'open_url': {
      const url = args.url;
      if (PLATFORM === 'win32') execSync(`start "" "${url}"`);
      else if (PLATFORM === 'darwin') execSync(`open "${url}"`);
      else execSync(`xdg-open "${url}"`);
      return { opened: url };
    }

    case 'screenshot': {
      const tmp = path.join(os.tmpdir(), `falkor_ss_${Date.now()}.jpg`);
      execSync(
        `python3 -c "from PIL import ImageGrab; img=ImageGrab.grab(); img.save('${tmp}','JPEG',quality=70)"`,
        { timeout: 15_000 }
      );
      const b64 = fs.readFileSync(tmp).toString('base64');
      try { fs.unlinkSync(tmp); } catch {}
      return { image_b64: b64, mime: 'image/jpeg' };
    }

    case 'disk_info': {
      let output;
      if (PLATFORM === 'win32')
        output = execSync('wmic logicaldisk get caption,size,freespace', { encoding: 'utf8' });
      else
        output = execSync('df -h', { encoding: 'utf8' });
      return { output };
    }

    case 'system_info': {
      return {
        platform: PLATFORM,
        hostname: HOSTNAME,
        home: HOME,
        arch: os.arch(),
        release: os.release(),
        cpus: os.cpus().length,
        memory_gb: +(os.totalmem() / 1e9).toFixed(1),
        uptime_hours: Math.round(os.uptime() / 3600),
      };
    }

    case 'search_files': {
      const searchDir = args.dir || HOME;
      const pattern   = args.pattern || args.name || '';
      let output;
      if (PLATFORM === 'win32')
        output = execSync(`dir /s /b "${searchDir}" | findstr /i "${pattern}"`, { encoding: 'utf8', shell: 'cmd.exe' });
      else
        output = execSync(`find "${searchDir}" -name "*${pattern}*" -maxdepth 6 2>/dev/null | head -50`, { encoding: 'utf8' });
      return { results: output.trim().split('\n').filter(Boolean) };
    }

    default:
      throw new Error(`Unknown command: ${cmd}`);
  }
}

// ── Boot ──────────────────────────────────────────────────────────────────────
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(' Falkor Bridge v1.0  (Phase 81)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
connect();

process.on('SIGINT', () => {
  console.log('\n👋 Bridge stopped.');
  if (ws) ws.close();
  process.exit(0);
});
