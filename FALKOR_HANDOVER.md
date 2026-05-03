# Falkor — Session Handover (2026-05-04, evening)

## Who you are talking to
Paddy Gallivan — PE teacher at Williamstown Primary School, runs Kow Brainer Trivia (KBT), developer of the Falkor AI assistant and luckdragon.io platform. Emails: pgallivan@outlook.com / pat_gallivan@hotmail.com. Casual, delegates fully. AFL fan (Bulldogs).

---

## ⛔ FILE-LOCATION RULE (READ FIRST)
- DEFAULT: do **not** save things to `G:\My Drive\Luck Dragon\` — Paddy has flagged repeatedly not to clutter Drive.
- Code / configs / handover docs → GitHub (this repo).
- Office files he asks for → return via `present_files` only.
- If unsure, ASK first.

---

## What Falkor is
Falkor is Paddy's personal AI assistant — Cloudflare Workers fleet (15+ workers) at falkor.luckdragon.io. Features: voice (Hey Falkor wake word, always-on), Telegram bot, AFL+NRL tipping comps, KBT trivia game engine, PE lesson planner, XC results, image gen + vision, proactive daily briefing, local PC bridge.

GitHub repo: **LuckDragonAsgard/asgard-workers** (ID: 1222393804) — source of truth for the fleet.
Claude auto-memory: `project_falkor.md` (full phase history + endpoints).

---

## Live fleet — verified 2026-05-04 via /health

| Worker | Domain | Live |
|---|---|---|
| falkor-ui | **falkor.luckdragon.io** | v9.21.0 |
| falkor-agent | falkor-agent.luckdragon.io | v2.9.0 (Phase 81 bridge handlers deployed) |
| falkor-kbt | falkor-kbt.luckdragon.io | v2.8.0 |
| falkor-workflows | falkor-workflows.luckdragon.io | v3.11.0 |
| falkor-school | falkor-school.luckdragon.io | v1.5.0 |
| falkor-sport | falkor-sport.luckdragon.io | v1.6.0 |
| falkor-telegram | falkor-telegram.luckdragon.io | v1.7.0 |
| asgard-ai | asgard-ai.luckdragon.io | v6.5.0 (deployment_id 9de28641d9c84a3fa47a82466c55c116) |
| falkor-brain | falkor-brain.luckdragon.io | v1.0.0 |
| falkor-web | falkor-web.luckdragon.io | v1.2.0 |
| falkor-code | falkor-code.luckdragon.io | v1.4.0 |
| falkor-push | falkor-push.luckdragon.io | v1.1.2 |
| falkor-dashboard | falkor-dashboard.luckdragon.io | v3.1.0 |
| falkor-widget | falkor-widget.luckdragon.io | v1.0.0 |
| falkor-deploy | falkor-deploy.luckdragon.io | up (PIN-gated) |

**Note:** `falkor-ui.luckdragon.io` is NXDOMAIN — UI is at **falkor.luckdragon.io**.

---

## ⏳ In-flight work (pick up here)

### 1. Sport Portal architecture push — PENDING (from prior chat, 2026-05-04)
Prior chat created a Sport Portal architecture doc and a cost-tracking dashboard locally; commit was made but the **GitHub push is still pending** — was waiting on a verification code from email when the chat ended.

Likely artifacts from that session (not in Drive, were chat-only present_files):
- `HANDOVER-Sport-Portal-Push-2026-05-04.md`
- `Memory-SportPortal-Architecture.md`
- `COST-TRACKING-DASHBOARD.md`
- updates to `CLAUDE.md`

NEXT STEP if Paddy confirms continuing: get the 6-digit GitHub verification code from his email and complete the push. Target repo most likely the SSP / sportportal repo (NOT asgard-workers — that's the Falkor fleet).

### 2. Phase 81 — Local Bridge — TEST PENDING
Code DEPLOYED 2026-05-04 (commit `5e054ea`, deployment_id `f80acecaf6fb4428a1cbda36e09cf7e0` for falkor-agent v2.9.0).

What exists:
- falkor-agent bridge protocol: `bridge_register` / `bridge_command` / `bridge_result` WS handlers, DO storage of bridge results.
- falkor-ui v9.21.0: 🔌 PC bridge status pill in header.
- `falkor-bridge.js` (Node script — file/shell/screenshot/disk access, safe-roots only), `launch-bridge.vbs` (silent launcher), `install-bridge-startup.bat` (Windows Startup install).

Pushed to this GitHub repo. Files also exist in `G:\My Drive\Luck Dragon\` from earlier work.

To test (Paddy runs these locally):
1. Open terminal in `G:\My Drive\Luck Dragon\`
2. `npm install ws` (one-time)
3. `node falkor-bridge.js`
4. Check falkor.luckdragon.io — PC pill should go green.
5. Test prompt: "list files on my desktop"

Auto-start on login: run `install-bridge-startup.bat` as admin.

---

## ✅ Recently shipped (2026-05-03 → 2026-05-04)
- **Account consolidation COMPLETE** — Cloudflare, Stripe, GitHub, GDrive all on `paddy@luckdragon.io` (verified 2026-05-03).
- **luckdragon.io homepage** — 525 SSL error fixed, zone `ca610439`.
- **Carnival Timing v8.5.2** (carnivaltiming.com) — paywall + help + sitemap + admin dashboard live, pre-launch polish complete.
- **School Sport Portal** (schoolsportportal.com.au) — $1/student/yr, Stripe live, help + sitemap + auto-reply + cross-links live.
- **SportCarnival** (sportcarnival.com.au) — sitemap + cross-links live.
- **Phase 81 Bridge** — code deployed (test pending, see above).

---

## Deploy patterns
- **Simple workers** (no DO/KV bindings): `POST https://asgard-tools.luckdragon.io/admin/deploy` with `X-Pin: VAULT_PIN`. Always add `skip_auto_commit: true` for automated runs.
- **Workers with DO/Vectorize bindings** (falkor-agent, falkor-kbt, falkor-brain): use the CF API directly with multipart PUT — see `deploy_phase81.py` template. Pass `keep_bindings: ["secret_text"]` in metadata to preserve secrets.
- **GitHub Contents API**: use `LuckDragonAsgard/asgard-workers` (NOT any pgallivan repo). Token in vault as `GITHUB_TOKEN`.
- **CF Worker gotchas**: multipart download extraction, service-worker vs ESM format mismatch, `CF_TOKEN_LD` vs `CF_API_TOKEN`, full account ID required. See `feedback_cf_worker_deploy.md` in auto-memory.

---

## Security (current)
- **falkor.luckdragon.io login (Paddy):** `2967` — POSTed to falkor-push `/user/verify`.
- **AGENT_PIN** (fleet workers, X-Pin header for inter-worker calls): `JilSS1zLn3Rl7mWrM6fOJc69` (rotated 2026-05-01).
- **VAULT_PIN** (asgard-vault): `535554` — confirmed active 2026-05-03.
- **falkor-dashboard worker PIN** (separate from main UI): `luckdragon`.
- **Vault read**: `GET https://asgard-vault.pgallivan.workers.dev/secret/<KEY>` with `X-Pin: 535554`.
- See `reference_falkor_security.md` in Claude auto-memory for full breakdown.

---

## Other live projects (context)
- **KBT Trivia Tools** — asset pipeline, Google Slides `[q]` placeholder, 6 tool files. GDrive default/quiz/ folder + ~20 per-game templates.
- **Bomber Boat** (bomberboat.com.au) — CF Pages + Worker, GitHub `PaddyGallivan/bomber-boat`.
- **Superleague Yeah v4** (superleague.streamlinewebapps.com) — AFL fantasy draft v4.28, GitHub `LuckDragonAsgard/superleague-yeah-v4`.
- **WPS Cross Country 2026** — 6 age groups, qualifiers + Firebase draw with bib numbers done.
- **WPS Y2 Maths Intervention** — 7-week term pack, 14 hands-on lessons, Vic Curric 2.0 + VTLM 2.0 aligned.
- **Face Morph Tool** — 50/50 alpha blend, toggle system, photo alignment pipeline. See `reference_facemorph_rules.md` for full workflow.
- **Jaclyn Rooney — 75 Cecil St** — desktop building review done April 2026.

---

## How Paddy likes to work
- Casual, direct — no fluff, no post-work summaries.
- Delegates fully — just do it.
- **Don't clutter Drive** — see file rule at top.
- Handovers/status docs → THIS GitHub repo (`LuckDragonAsgard/asgard-workers/FALKOR_HANDOVER.md`).
- Check GitHub before assuming worker state.
- Screenshot when debugging UI.
- Take screenshots when debugging Asgard.

---

## Known drift / cleanups
1. **Cowork project instructions** auto-fetch this very file. Confirmed working.
2. **falkor-agent versioning** has gone non-linear: source = `2.9.0`, prior commit messages claim `1.9.1`. `/health` is the truth.
3. Prior **HANDOVER-Sport-Portal-Push-2026-05-04.md** from earlier chat was a chat-only present_file — content NOT persisted unless Paddy saved it. If continuing that work, ask Paddy to paste the verification code and confirm target repo.

---

## How to start the next chat
Paddy will likely say one of:
- *"Bridge test"* → walk through Phase 81 test steps above.
- *"Sport Portal architecture push — continuing"* → ask for the GitHub verification code, confirm target repo, complete push.
- *"What did we do yesterday?"* → summarise from "Recently shipped".
- A fresh project ask → ask which project, then proceed.

Per project instructions, this file is auto-fetched at chat start. Brief Paddy from the In-flight work section first.
