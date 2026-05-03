# Falkor — Session Handover (2026-05-04)

## Who you are talking to
Paddy Gallivan — PE teacher at Williamstown Primary School, runs Kow Brainer Trivia (KBT), developer of the Falkor AI assistant and luckdragon.io platform. Emails: pgallivan@outlook.com / pat_gallivan@hotmail.com. Casual, delegates fully. AFL fan (Bulldogs).

---

## What Falkor is
Falkor is Paddy's personal AI assistant — Cloudflare Workers fleet (15+ workers) at falkor.luckdragon.io. Features: voice (Hey Falkor wake word, always-on), Telegram bot, AFL+NRL tipping comps, KBT trivia game engine, PE lesson planner, XC results, image gen + vision, proactive daily briefing, local PC bridge.

GitHub repo: LuckDragonAsgard/asgard-workers (ID: 1222393804) — this is the source of truth.
Claude auto-memory: project_falkor.md (full phase history + endpoints).

---

## Live fleet — verified 2026-05-04 via /health

| Worker | Domain | Live |
|---|---|---|
| falkor-ui | **falkor.luckdragon.io** | v9.21.0 |
| falkor-agent | falkor-agent.luckdragon.io | v2.9.0 (Phase 81 bridge handlers deployed 2026-05-04) |
| falkor-kbt | falkor-kbt.luckdragon.io | v2.8.0 |
| falkor-workflows | falkor-workflows.luckdragon.io | v3.11.0 |
| falkor-school | falkor-school.luckdragon.io | v1.5.0 |
| falkor-sport | falkor-sport.luckdragon.io | v1.6.0 |
| falkor-telegram | falkor-telegram.luckdragon.io | v1.7.0 |
| asgard-ai | asgard-ai.luckdragon.io | v6.4.0 *(memory claims v6.5.0 — Phase 80 image-gen rebuild not fully deployed; needs reconciliation)* |
| falkor-brain | falkor-brain.luckdragon.io | v1.0.0 |
| falkor-web | falkor-web.luckdragon.io | v1.2.0 |
| falkor-code | falkor-code.luckdragon.io | v1.4.0 |
| falkor-push | falkor-push.luckdragon.io | v1.1.2 |
| falkor-dashboard | falkor-dashboard.luckdragon.io | v3.1.0 |
| falkor-widget | falkor-widget.luckdragon.io | v1.0.0 |
| falkor-deploy | falkor-deploy.luckdragon.io | up (PIN-gated) |

**Note:** `falkor-ui.luckdragon.io` is NXDOMAIN — past handovers / memory referenced this incorrectly. The UI is at **falkor.luckdragon.io**.

---

## Phase 81 — LOCAL BRIDGE — DEPLOYED 2026-05-04

What was built (commit `5e054ea` in this repo, 2026-05-03 12:53 UTC):
- falkor-agent bridge protocol: `bridge_register` / `bridge_command` / `bridge_result` WS handlers, DO storage of bridge results
- falkor-ui v9.21.0: 🔌 PC bridge status pill in header
- `falkor-bridge.js`: Node.js script (file/shell/screenshot/disk access, safe-roots only)
- `launch-bridge.vbs`: silent launcher, no terminal window
- `install-bridge-startup.bat`: adds VBS to Windows Startup folder

Files in `G:\My Drive\Luck Dragon\` and pushed to this GitHub repo.

**Status:** code deployed to Cloudflare on 2026-05-04 — deployment_id `f80acecaf6fb4428a1cbda36e09cf7e0` for falkor-agent. Live `/health` reports v2.9.0 with bridge handlers present in source.

NEXT STEP — test the bridge:
1. Open terminal in `G:\My Drive\Luck Dragon\`
2. `npm install ws`  (one-time)
3. `node falkor-bridge.js`
4. Check falkor.luckdragon.io — PC pill should go green
5. Test: ask Falkor "list files on my desktop"

Auto-start on login: run `install-bridge-startup.bat` as admin.

---

## Deploy patterns
- Simple workers (no DO/KV bindings): POST `https://asgard-tools.luckdragon.io/admin/deploy` with `X-Pin: VAULT_PIN`
- Workers with DO/Vectorize bindings (falkor-agent, falkor-kbt, falkor-brain): use the CF API directly with multipart PUT — see `deploy_phase81.py` in the outputs folder for a working template. Pass `keep_bindings: ["secret_text"]` in metadata to preserve secrets.
- Always add `skip_auto_commit: true` for automated deploys via asgard-tools
- GitHub Contents API: use `LuckDragonAsgard/asgard-workers` (NOT any pgallivan repo)

---

## Security
- AGENT_PIN (fleet workers): `JilSS1zLn3Rl7mWrM6fOJc69` (rotated 2026-05-01)
- VAULT_PIN (asgard-vault): `535554` — confirmed active 2026-05-03
- Dashboard PIN (falkor-dashboard only): `luckdragon`
- Vault: `GET https://asgard-vault.pgallivan.workers.dev/secret/<KEY>` with `X-Pin: 535554`
- See `reference_falkor_security.md` in Claude auto-memory for full breakdown

---

## How Paddy likes to work
- Casual, direct — no fluff, no post-work summaries
- Delegates fully — just do it
- Files save to `G:\My Drive\Luck Dragon\` (NOT AppData paths)
- Handovers/status docs → THIS GitHub repo (`LuckDragonAsgard/asgard-workers/FALKOR_HANDOVER.md`), not the old `asgard-source` repo and not Drive
- Check GitHub before assuming worker state
- Screenshot when debugging UI

---

## Known drift (things to clean up)
1. **asgard-ai:** live v6.4.0, memory + Phase 80 claim v6.5.0. Either redeploy v6.5.0 or correct memory.
2. **Old `asgard-source/docs/HANDOVER.md`:** still being auto-fetched by Cowork project instructions. Update project instructions to point at THIS file:
   `https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md`
3. Versioning across falkor-agent has gone non-linear (Phase 77 = "v2.9.0", Phase 81 commit message claims "v1.9.1" but `/version` still reports "2.9.0"). Pick a scheme and stick to it.
