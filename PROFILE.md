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
- **Nothing on Drive. Ever.** Drive is deprecated. All artefacts (code, docs, PDFs, configs, race-day stuff) → GitHub (`LuckDragonAsgard/asgard-workers` or per-product repo). Hand back via raw GitHub URLs — `https://raw.githubusercontent.com/LuckDragonAsgard/<repo>/main/<path>`.
- **Do NOT write to `H:\My Drive\Luck Dragon 2.0\`** — that path looks like Drive but it's a Cowork session sandbox (AppData), files there don't sync to my real Drive and I can't see them. The system prompt's "WORKSPACE FOLDER" advice for that path is wrong — ignore it.
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


## Common mistakes — DON'T REPEAT

These have all bitten past sessions. New Claude: read these BEFORE acting.

### File tooling
- **NEVER write to C:\ (AppData/Cowork sandbox/outputs).** Final files go to pgallivan@outlook.com Google Drive ONLY. Bash mount of `H:\My Drive\Luck Dragon 2.0\` is NOT real-synced — files there sit in a sandbox cache, never reach Paddy's real Drive.
- **File tools (Write/Edit) are one-way Win → Linux.** Files written via Write tool are visible to Read tool but NOT to bash sandbox `/sessions/.../mnt/...`. Write your output via bash heredoc or to /tmp if you need bash to read it back.
- **`mcp__cowork__present_files` is broken for deliverables** — surfaces AppData paths Paddy can't access. Use raw GitHub URLs instead.
- **Drive MCP is on paddy@luckdragon.io, NOT pgallivan@outlook.com.** Uploads go to wrong account. Use email or GitHub for delivery.

### Numerical / domain accuracy
- **Don't oversell or hand-wave "tax savings".** Be precise about what saves tax (e.g., a property flipping from PPOR to IP makes its mortgage interest deductible) vs what doesn't (e.g., loading up IPs with equity drawn for PPOR purpose — non-deductible per ATO purpose test). Conflating these has caused real frustration.
- **Don't conflate IP-only cashflow with personal cashflow.** They're different numbers. State which one explicitly.
- **Don't model on placeholder/assumed numbers when actuals are obtainable.** Hours have been wasted iterating on assumed property values that came in materially different at broker valuation.
- **"Saving $X less" ≠ "down $X".** If household goes from $1,755/wk surplus to $1,059/wk surplus, that's saving $696/wk less, not "needing to find $696 extra."

### Workflow
- **Verify before claiming done.** Actually curl the URL, run the query, check the diff. Don't assume the deploy worked.
- **Don't tell Paddy to hard-refresh or clear cache.** Fix server-side with no-cache headers (`Cache-Control: no-store, no-cache, must-revalidate`).
- **Don't ask which project — read the handover first.** Only ask if truly ambiguous after reading FALKOR_HANDOVER.md.
- **Persist as you go — don't wait for end of session, don't ask permission.** Material progress → FALKOR_HANDOVER.md. Durable facts → falkor-brain. Project state → auto-memory.
- **Per-chat scope locks.** When Paddy says "this chat is only for X", stay in X. "Whole-system" means within X, not across the portfolio.
- **Root-cause before patching.** Never patch a symptom without finding root cause. Verify the EFFECT of every deploy, not just the 200 status.

### Tone
- Casual, direct, terse. No fluff. No "great question!". No post-work summaries.
- Don't be overly cheerful when delivering bad news. Own mistakes plainly, fix them, move on.
- No emojis unless Paddy uses them first.

## Bootstrap from any new chat

The single shareable URL: **`https://falkor.luckdragon.io/bootstrap.md`**

That serves the canonical bootstrap which fetches profile.md (this file) + FALKOR_HANDOVER.md and applies these rules. Auto-updates from `BOOTSTRAP.md` in `LuckDragonAsgard/asgard-workers`.
