# Falkor — Session Handover (2026-05-03)

## Who you are talking to
Paddy Gallivan — PE teacher at Williamstown Primary School, runs Kow Brainer Trivia (KBT), developer of the Falkor AI assistant and luckdragon.io platform. Emails: pgallivan@outlook.com / pat_gallivan@hotmail.com. Casual, delegates fully. AFL fan (Bulldogs).

---

## What Falkor is
Falkor is Paddy's personal AI assistant — Cloudflare Workers fleet (17+ workers) at falkor.luckdragon.io. Features: voice (Hey Falkor wake word, always-on), Telegram bot, AFL+NRL tipping comps, KBT trivia game engine, PE lesson planner, XC results, image gen + vision, proactive daily briefing.

GitHub repo: LuckDragonAsgard/asgard-workers (ID: 1222393804)
Claude auto-memory: project_falkor.md (full phase history + endpoints)
Status doc: FALKOR_STATUS.md in this repo

---

## Current versions (all live on *.luckdragon.io)
- falkor-ui v9.25.0
- falkor-agent v1.9.0
- falkor-kbt v2.7.0
- falkor-workflows v3.8.0
- falkor-sport v1.5.0
- falkor-school v1.5.0
- falkor-telegram v1.7.0
- asgard-ai v6.5.0

---

## Phase 81 — LOCAL BRIDGE (built, NOT yet tested on PC)

What was built:
- falkor-agent v1.9.0: bridge_register/bridge_result WS protocol, local intent routing
- falkor-ui v9.25.0: PC bridge status pill in header
- falkor-bridge.js: Node.js script (file/shell/screenshot/disk access, safe-roots)
- launch-bridge.vbs: silent launcher, no terminal window
- install-bridge-startup.bat: adds VBS to Windows Startup folder

Files in G:\My Drive\Luck Dragon\ and pushed to GitHub (this repo).

NEXT STEP — test the bridge:
1. Open terminal in G:\My Drive\Luck Dragon\
2. npm install ws  (one-time)
3. node falkor-bridge.js
4. Check falkor.luckdragon.io — PC pill should go green
5. Test: ask Falkor "list files on my desktop"

Auto-start on login: run install-bridge-startup.bat as admin.

---

## Deploy patterns
- Endpoint: POST https://asgard-tools.luckdragon.io/admin/deploy  (X-Pin: VAULT_PIN)
- Always add skip_auto_commit: true for automated deploys
- Workers with DO/Vectorize bindings (falkor-agent, falkor-kbt): deploy via CF API directly
- GitHub Contents API: use LuckDragonAsgard/asgard-workers (NOT any pgallivan repo)

---

## Security
AGENT_PIN, VAULT_PIN (535554), Dashboard PIN (luckdragon) — see reference_falkor_security.md in Claude auto-memory.
Vault: GET https://asgard-vault.pgallivan.workers.dev/secret/KEY  with X-Pin: 535554

---

## How Paddy likes to work
- Casual, direct — no fluff, no post-work summaries
- Delegates fully — just do it
- Files save to G:\My Drive\Luck Dragon\ (NOT AppData paths)
- Handovers/status docs → GitHub (this repo), not Drive
- Check GitHub before assuming worker state
- Screenshot when debugging UI
