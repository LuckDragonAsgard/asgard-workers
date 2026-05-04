# Paddy — Profile

> Single source of truth for who I am and how I work. Auto-fetched at start of every Cowork chat. Edit on GitHub or via falkor.luckdragon.io/profile.md.

## Identity
- **Name:** Paddy Gallivan
- **Role:** PE teacher at Williamstown Primary School (Hobsons Bay Division)
- **Side:** Run Kow Brainer Trivia (KBT). Build software at luckdragon.io.
- **Family comps:** Run footy tipping + racing tipping comps for a big family.
- **Emails:** pgallivan@outlook.com / pat_gallivan@hotmail.com (also paddy@luckdragon.io for accounts)
- **AFL:** Western Bulldogs.

## Products I build
- **School Sport Portal** (schoolsportportal.com.au) — $1/student/yr, Stripe live.
- **Carnival Timing** (carnivaltiming.com) — race-day timing, $49/$149.
- **SportCarnival** (sportcarnival.com.au) — public demo + race-day district pages.
- **Falkor** (falkor.luckdragon.io) — personal AI assistant on Cloudflare Workers.
- **KBT trivia tools** — Google Slides asset pipeline.
- Several smaller projects (Bomber Boat, Superleague, Lesson Lab, etc).

## How I like to work
- **Casual, direct.** No fluff, no "great question!", no post-work summaries.
- **Delegate fully.** Just do it. Don't ask which project unless it's truly ambiguous — read the handover first.
- **Verify before claiming done.** Actually curl the URL, run the query, check the diff. Don't assume.
- **Don't tell me to hard-refresh or clear cache.** Fix it server-side with no-cache headers.
- **Don't clutter `G:\My Drive\Luck Dragon\`.** Code/configs/handover docs → GitHub. Office files → `present_files` only. If unsure, ASK.
- **Take screenshots when debugging UI.**

## Auto-persistence rules (for every chat)
- Material progress → push to `FALKOR_HANDOVER.md` on GitHub (`LuckDragonAsgard/asgard-workers`).
- Durable facts (URLs, deploy patterns, security, etc) → POST to `https://falkor-brain.luckdragon.io/remember` with `X-Pin: <AGENT_PIN>`.
- Project-specific state → save to Cowork auto-memory (`project_*.md`).
- Don't ask permission to persist — just do it as you go.

## Domains and accounts I own
- Cloudflare account: **Luck Dragon Main** `a6f47c17811ee2f8b6caeb8f38768c20`
- Active zones: luckdragon.io, schoolsportportal.com.au, sportcarnival.com.au, sportportal.com.au, carnivaltiming.com, schoolstaffhub.com.au, bomberboat.com.au, lessonlab.com.au, longrangetipping.com(.au), bulldogsboat.com.au, savemyseat.au, rooneygolftours.com.au, horseracetipping.com, streamlinewebapps.com, plus a few more (full list: see CF dashboard).
- All accounts (CF, Stripe, GDrive, GitHub) consolidated on **paddy@luckdragon.io** (verified 2026-05-03).

## Where state lives
- **GitHub source of truth:** `LuckDragonAsgard/asgard-workers` (Falkor fleet) + per-product repos.
- **Falkor brain (RAG):** `falkor-brain.luckdragon.io` — Vectorize index `falkor-memory`, D1 `asgard-prod`.
- **Vault:** `asgard-vault.pgallivan.workers.dev/secret/<KEY>` with `X-Pin: VAULT_PIN`.
- **Handover (current state):** `https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md` — auto-fetched at chat start.
