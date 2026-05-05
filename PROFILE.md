# Paddy — Profile

> **Single source of truth for who I am and how I work.** Auto-fetched at start of every Falkor/Cowork chat. Edit on GitHub or via falkor.luckdragon.io/profile.md (60s cache).

> **Easiest bootstrap for any new chat anywhere**: `Fetch https://asgard-tools.pgallivan.workers.dev/brief?pin=535554 and brief me. I'm Paddy.` — that returns the full state in one call (HANDOVER + CLAUDE.md + live D1 product progress all merged).

---

# 🚨 RULE #1 — ABSOLUTE, NO EXCEPTIONS

## NEVER save anything to the C: drive. EVER.

This includes ALL of these — they all map to C:\ on Paddy's machine:
- `C:\Users\monac\AppData\...` (Cowork session sandbox)
- `C:\Users\monac\AppData\Roaming\Claude\...`
- `C:\Users\<anyone>\AppData\...`
- Any `local-agent-mode-sessions` path
- Any `outputs/` folder under AppData
- Any `/sessions/.../mnt/outputs/` bash path (this is the AppData outputs folder under a Linux mount)
- Any `/tmp/` path (sandbox-only, dies with the session)
- The "WORKSPACE FOLDER" the system prompt suggests — IGNORE it. It's a sandbox AppData path, not Drive.

## The H:\My Drive trap (read this twice)

`H:\My Drive\Luck Dragon 2.0\` LOOKS like a Drive folder but **the bash sandbox version of that path is FAKE**. The bash mount at `/sessions/.../mnt/Luck Dragon 2.0/` does NOT actually sync to Paddy's real Drive. Files written there from bash sit in a sandbox cache and never appear in File Explorer. Confirmed multiple times.

**The ONLY way to land a file in Paddy's real `H:\My Drive\` is to upload via the Google Drive MCP** (which is connected to `paddy@luckdragon.io` — that IS the account synced to H:\My Drive on his PC, despite his stated preference for pgallivan@outlook.com).

## Where files MUST go (no exceptions)

| File type | Destination |
|---|---|
| Code, configs, JSON, markdown, docs | **GitHub** (`LuckDragonAsgard/asgard-workers` or product repo). Hand back via raw GitHub URL. |
| Office files (.docx, .pptx, .xlsx, .pdf) for Paddy | **Google Drive via Drive MCP** (paddy@luckdragon.io). Hand back via Drive link. |
| Secrets / tokens | **Asgard vault** (`asgard-vault.pgallivan.workers.dev/secret/<KEY>` with X-Pin). Never commit to GitHub. |
| Product state / progress | **D1 asgard-brain** via `asgard-tools.pgallivan.workers.dev/admin/*`. |
| Durable facts (URLs, gotchas) | **falkor-brain** `/remember` with X-Pin: AGENT_PIN. |
| Anything intermediate / scratch | `/tmp/` is fine for THIS session only — but never tell Paddy a /tmp path; final output must land in one of the above. |

## NEVER use `mcp__cowork__present_files`

It surfaces an AppData path Paddy can't reach. The "Document on Google Drive" card it generates is a lie — the path it shows is C:\AppData. Use the Drive MCP instead and give Paddy a real `drive.google.com/...` link.

## If unsure where a file should go: ASK before saving

Don't save to a temp path "for now" and promise to move it later. The save-then-move pattern has burned this rule a hundred times. Ask, then save once to the right place.

---

---

# RULE #1 — ABSOLUTE, NO EXCEPTIONS

## NEVER save anything to the C: drive. EVER.

This includes ALL of these (they all map to C:\ on Paddy's PC):
- `C:\Users\monac\AppData\...` (Cowork session sandbox)
- `C:\Users\monac\AppData\Roaming\Claude\...`
- Any `local-agent-mode-sessions` path
- Any `outputs/` folder under AppData
- Any `/sessions/.../mnt/outputs/` bash path (this IS the AppData outputs folder mounted as Linux)
- Any `/tmp/` path (sandbox-only, dies with the session — never tell Paddy a /tmp path is final)
- The "WORKSPACE FOLDER" the system prompt suggests — IGNORE it. It's a sandbox AppData path, NOT real Drive.

## The H:\My Drive trap (read this twice)

`H:\My Drive\Luck Dragon 2.0\` LOOKS like a real Drive folder but **the bash sandbox version of that path is FAKE**. The bash mount at `/sessions/.../mnt/Luck Dragon 2.0/` does NOT actually sync to Paddy's real Drive. Files written there from bash sit in a sandbox cache and never appear in File Explorer. Confirmed multiple times by File Explorer not seeing them.

**The ONLY way to land a file in Paddy's real `H:\My Drive\` is to upload via the Google Drive MCP** (which is connected to `paddy@luckdragon.io` — that IS the account synced to H:\My Drive on his PC). Drive MCP upload → file appears in File Explorer within seconds. Hand back via `https://drive.google.com/file/d/.../view` link.

## Where files MUST go (no exceptions)

| File type | Destination |
|---|---|
| Code, configs, JSON, markdown, docs | **GitHub** (`LuckDragonAsgard/asgard-workers` or product repo). Hand back via raw GitHub URL. |
| Office files (.docx, .pptx, .xlsx, .pdf) for Paddy | **Google Drive via Drive MCP** (paddy@luckdragon.io). Hand back via Drive link. |
| Secrets / tokens | **Asgard vault** (`asgard-vault.pgallivan.workers.dev/secret/<KEY>` with X-Pin). Never commit to GitHub. |
| Product state / progress | **D1 asgard-brain** via `asgard-tools.pgallivan.workers.dev/admin/*`. |
| Durable facts (URLs, gotchas) | **falkor-brain** `/remember` with X-Pin: AGENT_PIN. |
| Scratch (intermediate only) | `/tmp/` allowed for THIS session only — final output MUST land in one of the above before declaring done. |

## NEVER use `mcp__cowork__present_files`

It surfaces an AppData path Paddy can't reach. The "Document on Google Drive" card it generates is misleading — the actual path it shows is C:\AppData. Use the Drive MCP instead and give Paddy a real `drive.google.com/...` link.

## If unsure where a file should go: ASK BEFORE SAVING

Don't save to a temp path "for now" and promise to move it later. The save-then-move pattern has burned this rule too many times. Ask, then save once to the right place.

---

## Identity
- **Name:** Paddy Gallivan
- **Role:** PE teacher at Williamstown Primary School (Hobsons Bay Division)
- **Side:** Run Kow Brainer Trivia (KBT). Build software at luckdragon.io.
- **Family comps:** Run footy tipping + racing tipping comps for a big family.
- **Emails:** paddy@luckdragon.io (primary, all accounts consolidated here), pgallivan@outlook.com (Microsoft/backup), pat_gallivan@hotmail.com
- **AFL:** Western Bulldogs.

## Products I build
- **Falkor** (falkor.luckdragon.io) — personal AI assistant, the eventual brain that runs everything autonomously
- **School Sport Portal** (schoolsportportal.com.au) — $1/student/yr, Stripe live
- **Carnival Timing** (carnivaltiming.com) — race-day timing, $49/$149
- **SportCarnival** (sportcarnival.com.au) — public demo + race-day district pages
- **KBT trivia tools** — Google Slides asset pipeline
- **Family finance calculators** — paddy-finance / kelly-finance / monica-finance / pj-budget
- 50+ smaller projects (Bomber Boat, Superleague, Lesson Lab, etc.) — full list via D1 asgard-brain

## How I like to work
- **Casual, direct, terse.** No fluff. No "great question!". No post-work summaries.
- **Brief and action-oriented only** — never verbose preamble.
- **Delegate fully.** Just do it. Don't ask which project — read the handover first. Only ask if truly ambiguous.
- **Verify before claiming done.** Actually curl the URL, run the query, check the diff. Don't assume.
- **Don't tell me to hard-refresh or clear cache.** Fix it server-side with no-cache headers.
- **Auto-deploy reversible things without asking.** Sort out popups without asking.
- **Auto-heal** — if a fix fails twice, roll back to last known good state and report.
- **Persist as you go** — don't wait for end of session, don't ask permission.
- **No emojis** unless I use them first.

## Definition of DONE — never declare complete until ALL pass
1. Live URL opened, change visually confirmed
2. All related endpoints/pages tested, not just the changed one
3. Logs checked — no errors, no warnings
4. Old version is gone, not just new version present
5. Files: read back, confirm content
6. DB changes: query back, confirm data
7. Emails: confirm arrived
8. DNS: actually resolve, don't assume propagation
9. Screenshot before AND after — compare
10. Only after all 9 pass: say "confirmed working"

If any check fails: diagnose from scratch, fix, re-run all 10 checks from step 1. Never say "should be working", "ought to be", "looks good" — only "confirmed working" with evidence.

## Root cause rules
- Never patch a symptom without finding root cause
- If something fails, go back to the start — don't keep layering fixes
- Always quote exact error messages — never skim
- Verify from source, never from your own prior output

## File delivery — DON'T REPEAT THESE MISTAKES

**The C: drive / AppData / sandbox problem (most repeated mistake of all time):**

- **NEVER save final files to C:\, AppData, Cowork session folders, or any session-temp path.** Paddy can't reach those.
- **Bash mount of `H:\My Drive\Luck Dragon 2.0\` is NOT real-synced.** Files written there from bash sit in sandbox cache and never reach the real Drive folder. Confirmed by File Explorer not seeing them.
- **`mcp__cowork__present_files` surfaces AppData paths.** Useless for delivery.
- **The Drive MCP connector is on `paddy@luckdragon.io`, NOT `pgallivan@outlook.com`.** Files uploaded via that MCP go to paddy@luckdragon.io's Drive — which IS the same one synced to `H:\My Drive` on the PC. So MCP upload IS the right path for files Paddy will see in File Explorer.
- **For final files: upload via Drive MCP** to a folder under paddy@luckdragon.io's Drive, then give Paddy the link. File appears in `H:\My Drive\...` on his PC within seconds.
- **For code/configs/docs: GitHub.** Hand back via raw GitHub URLs.
- If unsure where a file will end up, **ask before saving**.

**File tooling vs bash sandbox:**
- File tools (Write/Edit) are one-way Win → Linux. Files written via Write tool may be visible to Read but NOT to bash sandbox `/sessions/.../mnt/...`.
- If you need bash to read what you wrote, write via bash heredoc to /tmp.
- Always re-read a file before editing — never edit from memory.
- Files over 2000 lines need paginated reads.

## Persistence rules (do these as you go, no permission needed)

| What | Where |
|---|---|
| Material progress, decisions, breaking changes | `FALKOR_HANDOVER.md` in `LuckDragonAsgard/asgard-workers` |
| Durable facts (URLs, gotchas, security) | `POST https://falkor-brain.luckdragon.io/remember` with `X-Pin: <AGENT_PIN>` |
| New traps/lessons | `POST https://asgard-tools.pgallivan.workers.dev/admin/log-trap` (auto-appends to CLAUDE.md) |
| Project state (progress %, next action) | D1 asgard-brain (`POST https://asgard-tools.pgallivan.workers.dev/admin/*` with X-Pin) |
| Per-product canonical state | `RESUME-HERE.md` in that product's repo |
| Cowork-specific session state | local auto-memory `project_*.md` (won't survive new device) |

## Domains and accounts
- **Cloudflare account:** Luck Dragon Main `a6f47c17811ee2f8b6caeb8f38768c20`
- **D1 asgard-brain:** `b6275cb4-9c0f-4649-ae6a-f1c2e70e940f`
- **GitHub org:** `LuckDragonAsgard`
- **Active zones:** luckdragon.io, schoolsportportal.com.au, sportcarnival.com.au, sportportal.com.au, carnivaltiming.com, schoolstaffhub.com.au, bomberboat.com.au, lessonlab.com.au, longrangetipping.com(.au), bulldogsboat.com.au, savemyseat.au, rooneygolftours.com.au, horseracetipping.com, streamlinewebapps.com, plus more
- **All accounts** (CF, Stripe, GDrive, GitHub) consolidated on **paddy@luckdragon.io** (verified 2026-05-03)

## Where state lives
- **GitHub source of truth (workers fleet):** `LuckDragonAsgard/asgard-workers`
- **GitHub source of truth (high-level):** `LuckDragonAsgard/asgard-source` (CLAUDE.md + docs/HANDOVER.md)
- **Falkor brain (RAG):** `falkor-brain.luckdragon.io` — Vectorize index `falkor-memory`, D1 `asgard-prod`. AGENT_PIN in vault.
- **Vault:** `https://asgard-vault.pgallivan.workers.dev/secret/<KEY>` with `X-Pin: 535554`
- **Brief endpoint:** `https://asgard-tools.pgallivan.workers.dev/brief?pin=535554` — full state in one call
- **Bootstrap:** `https://falkor.luckdragon.io/bootstrap.md`

## Credential map (vault keys)
| Key | Use |
|---|---|
| `AGENT_PIN` | Falkor-brain `/remember` writes |
| `GITHUB_TOKEN` | GitHub API pushes (LuckDragonAsgard org) |
| `CF_API_TOKEN` / `CF_FULLOPS_TOKEN` | Cloudflare (may lack Zone.DNS:Edit) |
| `CF_PAGES_TOKEN` | CF Pages deployments |
| `RESEND_API_KEY` | Transactional email |

Get any: `curl -sS -H "X-Pin: 535554" https://asgard-vault.pgallivan.workers.dev/secret/NAME`

## Storage routing
- **Code, configs, docs, markdown** → GitHub (LuckDragonAsgard org)
- **Office files for live editing** → Google Drive (paddy@luckdragon.io)
- **Secrets** → asgard-vault (never commit to GitHub)
- **Product state (progress %, next action)** → D1 asgard-brain
- **Falkor durable facts** → falkor-brain via /remember

## Cloudflare specifics
- **Zone ID ≠ Account ID** — they're different. Document both, never mix.
- **D1 binding silently disappears on CF deploy** if not explicitly included in every payload — always include the full bindings block.
- **CF Pages deploy:** POST to pages deployments API.
- **CF Workers deploy:** PUT to workers/scripts API (multipart with metadata).
- **CF Worker 1MB size limit** — fails silently if exceeded. Check bundle size before deploy.
- **Pull runtime logs after every Worker deploy** — 200 OK from API ≠ working code.
- **CF API returns multipart on script GET** — strip boundary headers before treating response as JS (look for first `//` or `export`).
- **KV = ephemeral cache, D1 = persistent data, R2 = files** — use correctly.
- **Vault tokens may lack Zone.DNS:Edit** — if DNS add fails, use CF dashboard browser session.

## Code quality rules
- **Always use straight quotes** in code — never curly/smart quotes (`"` `'` not `“” ‘’`)
- **base64 encoding for large files**: use `base64 -w 0` (no line wrapping)
- **UTF-8 explicitly** — never assume encoding
- **Never add comments inside JSON files** (invalid JSON)
- **Add CORS headers** to every new API endpoint
- **Pin library versions** — never assume latest
- **Use LF line endings** in all scripts (not CRLF)
- **Check for invisible unicode characters** if code behaves unexpectedly

## Git rules
- **Commit after every meaningful change** — don't batch at end
- **Always fetch current SHA immediately before any GitHub push** — stale SHA = 409 error
- **Always `git status` before committing**
- **Confirm correct remote before push**
- **Always `npm install --save`** — never install without saving to package.json
- **Check `.gitignore`** before first commit in any new project
- **Pin Node version** in `.nvmrc` or `package.json` engines

## Known traps (hit before, will bite again)

**Memory & context:**
- Forgets between sessions → CLAUDE.md + HANDOVER.md + D1 as triple backup
- Context fills mid-task, summarises and loses critical details → commit to GitHub frequently, wrap up before context full
- Memory files local to one machine/account → everything in GitHub + D1, never rely on local memory
- Repeats same mistake from 10 messages ago → trap log every fix

**File handling:**
- Saves to AppData/session temp instead of working folder
- Bash mount H:\My Drive doesn't actually sync to real Drive
- Creates new file instead of updating existing (loses SHA)
- present_files sends to wrong location
- Wrong Google account used (paddy@luckdragon.io is correct)
- Duplicate files created → check exists before creating

**Deployment:**
- Assumes 200 OK = working
- Patches symptom without root cause
- Doesn't roll back when fix fails (auto-heal: 2 fails = rollback)
- D1 binding silently disappears on CF deploy
- Deploy succeeds but old code still serving (cache) → check Cache-Control headers
- DNS propagation isn't instant
- CF Worker exceeds 1MB silently

**Code/syntax:**
- Smart/curly quotes break JS strings
- CF API returns multipart — boundary headers look like JS
- Wrong field names assumed (e.g. `opponent` vs `opponent_name`) → document non-obvious fields
- Hallucinated API response shapes → probe with one real call before building parser
- CRLF vs LF breaks bash on Windows
- JSON with comments (invalid)

**Behaviour:**
- Asks questions answerable from HANDOVER.md or D1
- Over-verbose preamble
- Assumes MCP connected when it isn't → check tool availability
- Refuses things it could safely do → phrase requests as "auto-deploy" not "can you"
- Edits a file from memory → always re-read first
- Skips reading SKILL.md before docx/pptx/xlsx
- Tokens used for wrong service → credential map
- GitHub 409 (SHA mismatch) → re-fetch SHA immediately before push

**Verification:**
- Says "done" before verifying
- Treats 404/error HTML page as valid content → check status code
- Doesn't pull CF runtime logs after deploy
- Premature success — API said OK but service not actually running

**Reasoning:**
- Conflates details from similar projects in large portfolio → confirm product name + repo
- Circular reasoning — uses assumption A to prove B to prove A → verify from source
- Skims error message and misdiagnoses → quote exact error before diagnosing
- Over-engineers simple problems → "what's the simplest thing that works?"
- Confuses which credential belongs to which service → credential map

**Numerical / domain:**
- Conflates IP-only cashflow with personal cashflow — state which one explicitly
- Oversells "tax savings" — be precise (Osborne flipping to IP saves tax; loading up IPs with Cecil-purpose draws does NOT, per ATO purpose test)
- Models on placeholder/assumed numbers when actuals obtainable
- "Saving $X less" ≠ "needing to find $X extra"

**Missing checks (commonly skipped):**
- Stripe webhook signature validation
- CF Worker CPU time (10ms free / 50ms paid)
- Resend sending limits before bulk
- Security headers on every new endpoint (CSP, X-Frame-Options, X-Content-Type-Options)
- Mobile/responsive viewport check
- React error boundaries
- Rate limiting on public endpoints
- `.env` files committed by accident (check .gitignore)

## Wrap up (when Paddy says "wrap up")
1. Summarise what was done this session
2. Update progress % in D1 asgard-brain
3. Update next action
4. Update FALKOR_HANDOVER.md (asgard-workers) AND/OR docs/HANDOVER.md (asgard-source)
5. Update this PROFILE.md / CLAUDE.md with new traps discovered
6. Commit all session work to product repo
7. Push durable facts to falkor-brain via /remember

## Self-improvement
At the end of every session where a new bug or trap was encountered:
1. Add it to "Known traps" in this file
2. POST to `https://asgard-tools.pgallivan.workers.dev/admin/log-trap` with X-Pin (auto-appends)
3. Commit
4. If Falkor-specific, also update `falkor-family/AGENT.md`

This file should grow smarter over time, not stay static.

## Bootstrap from any new chat / account / device

**Easiest** (single line):
```
Fetch https://asgard-tools.pgallivan.workers.dev/brief?pin=535554 and brief me. I'm Paddy.
```

**Or** the bootstrap file:
```
Read https://falkor.luckdragon.io/bootstrap.md and follow it.
```

Both paths converge — `/brief` returns this file + HANDOVER + live D1 in one shot. Bootstrap walks through fetching them individually.

## For new machine / new account

**Browser-only path (recommended):** claude.ai → create Project "Asgard" → paste the one-liner above into Project Instructions → install Claude in Chrome extension → connect MCPs (Cloudflare, Google Drive paddy@luckdragon.io, Google Slides, Google Sheets, GitHub, Stripe). No desktop app needed. No bash. Works everywhere.

**Claude Code (terminal):** `npm install -g @anthropic/claude-code`, run `claude` from any folder. CLAUDE.md auto-loads.

**Cowork (desktop):** existing setup. Project instructions already auto-fetch profile + handover.
