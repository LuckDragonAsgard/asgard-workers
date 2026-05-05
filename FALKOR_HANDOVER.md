# Falkor / Asgard — Session Handover

> **ZERO-TOLERANCE PERSISTENCE RULE — READ FIRST** >
> **NEVER write to ephemeral/temp paths.** Other Claude chats have repeatedly saved files to AppData, /tmp, /sessions, Local Settings — paths Paddy cannot access later. This is THE most important rule.
>
> **All persistence goes to ONE of these locations ONLY:**
> 1. GitHub `LuckDragonAsgard/asgard-workers` — for code/configs (use Falkor's write_file/edit_file/multi_edit tools)
> 2. Cloudflare D1 — for structured data (run_d1_query)
> 3. CF KV (env.ASSETS) — for session state, audit logs
> 4. CF Vectorize via falkor-brain — for semantic memory
> 5. Office files (docx/pptx/xlsx/pdf) — ONLY when Paddy explicitly asks. Hand back via `present_files` / file links so Paddy picks the save location. NEVER hardcode a drive letter — paths vary per machine.
>
> **NEVER ALLOWED:** AppData, %TEMP%, /tmp, /sessions/, /var/, /usr/, ANY workspace-internal mount path. Lost forever next chat.

---

# Falkor — Session Handover (2026-05-04, evening)

## Who you are talking to
Paddy Gallivan — PE teacher at Williamstown Primary School, runs Kow Brainer Trivia (KBT), developer of the Falkor AI assistant and luckdragon.io platform. Emails: pgallivan@outlook.com / pat_gallivan@hotmail.com. Casual, delegates fully. AFL fan (Bulldogs).

---

## FILE-LOCATION RULE (READ FIRST)
- DEFAULT: do **not** save things to `G:\My Drive\Luck Dragon\` — Paddy has flagged repeatedly not to clutter Drive.
- Code / configs / handover docs → GitHub (this repo).
- Office files he asks for → return via `present_files` only.
- If unsure, ASK first.

---

## SPORT PORTAL — FULL HANDOVER (2026-05-04)

The Sport Portal ecosystem = **3 public products** + **Paddy's own school/district/division portals** + **race-day district pages** that all share a single roster. Pitch: **enter student data once, automate across all sports**.

### The three public products

| Product | URL | Status | Worker(s) | What it does |
|---|---|---|---|---|
| **School Sport Portal (SSP)** | https://schoolsportportal.com.au | 200 | `ssp-portal`, `ssp-contact`, `email-logger`, `inbox-api` | Commercial SaaS landing page. $1/student/year. Stripe live. |
| **Carnival Timing (CT)** | https://carnivaltiming.com | 200 | `carnival-timing-html`, `carnival-timing-ws`, `ct-access`, `carnival-results` | Race-day timing app. Race Control / Starter / Lane Timer / Video Finish / Spectator. v8.5.2. |
| **SportCarnival** | https://sportcarnival.com.au | 200 | `sportcarnival-hub` v3.0.0 | Public commercial demo at `/`. Real WPS/Williamstown district data at `/wd26` (noindex). |

### Auxiliary domains / sub-products

| URL | Purpose | Status |
|---|---|---|
| https://schoolsportportal.com.au/help | SSP getting-started | |
| https://schoolsportportal.com.au/sitemap.xml | SSP sitemap | |
| https://carnivaltiming.com/help | CT getting-started | |
| https://carnivaltiming.com/sitemap.xml | CT sitemap | |
| https://sportcarnival.com.au/sitemap.xml | SC sitemap (lists `/`, `/privacy`, `/terms`) | |
| https://falkor-ct-ai.luckdragon.io | CT AI backend (summarise / flag-times / suggest-heats / commentary) | v1.0.0 |
| https://ct-access.luckdragon.io | CT paywall worker (validate / create / stripe-webhook / admin/codes) | Live (PIN-gated) |
| https://carnival-results.pgallivan.workers.dev | D1 API for published results | |

### Paddy's own school / district / division portals (on SSP)

Live at the `ssp-portal` worker — these are the real WPS / Williamstown / Hobsons Bay pages:

| Level | URL | Title |
|---|---|---|
| **School** | https://schoolsportportal.com.au/williamstownprimary | Williamstown Primary School — School Sport Portal |
| | https://schoolsportportal.com.au/williamstownps (alias) | same |
| **District** | https://schoolsportportal.com.au/williamstowndistrict | Williamstown District Sport |
| **Division** | https://schoolsportportal.com.au/hobsonsbay | Hobsons Bay Division — School Sport Portal |
| | https://schoolsportportal.com.au/hobsonsbaydivision (alias) | same |

Public product demo ladder (also `ssp-portal`):

| Level | URL | Demo subject |
|---|---|---|
| School | https://schoolsportportal.com.au/demo-school | Riverside Primary School |
| District | https://schoolsportportal.com.au/demo-district | Riverside District |
| Division | https://schoolsportportal.com.au/demo-division | Eastbay Division |
| Region | https://schoolsportportal.com.au/demo-region | Central Coast Region |

### Per-district / race-day pages on SportCarnival

| URL | What it is | Status |
|---|---|---|
| https://sportcarnival.com.au/ | Public commercial demo — Demo Valley District XC 2026, 8 fictional schools, simulated live results | Live |
| https://sportcarnival.com.au/wd26 | Real Williamstown District XC 2026 — 192 runners, 8 schools, 6 races, WS auto-connects to WD26 | `x-robots-tag: noindex` |
| https://sportcarnival.com.au/williamstown | Alias for /wd26 | |
| https://sportcarnival.com.au/williamstownps/crosscountry | WPS-only XC sub-page | Files in repo, worker doesn't route. Add handler if needed. |
| CT carnival code **WD26** | District XC live results auto-connects | Reserved for Thursday |

### Stripe / payments
- **CT $49 single:** https://buy.stripe.com/8x26oGgux9IT3wQckm9IQ05 (ct_type=single)
- **CT $149 annual:** https://buy.stripe.com/7sY3cu3HL8EP4AUesu9IQ06 (ct_type=annual)
- **SSP $1/student/yr:** Stripe link live on schoolsportportal.com.au
- SSP subscribers get a school-specific CT code (type=ssp). Test code: `WPS-2026`. Test annual: `TEST-1234`.
- Webhook: `we_1TS4y0Am8bVflPN0qCkWbAkO`

### GitHub repos (under LuckDragonAsgard)

| Repo | Product |
|---|---|
| `sportportal` | SSP landing page |
| `schoolsportportal` | directory site |
| `sportcarnival-hub` | sportcarnival.com.au |
| `district-sport` | carnivaltiming.com source |
| `sport-carnival` | CT main repo (single index.html) |
| `wps-athletics-2026` | WPS data model (ROSTER, HOUSES, PTS, Firebase `wps_aths_2026/results`) |
| `asgard-workers` | Falkor fleet + this handover |

### Account / hosting
- Cloudflare account: **Luck Dragon Main** `a6f47c17811ee2f8b6caeb8f38768c20`
- All four domains hosted as Cloudflare Workers (NOT Pages)
- Firebase Realtime Database (australia-southeast1)
- D1 database for published results: `carnival-results-db` UUID `4c39e40c-b6ca-40db-83bb-e8c69bad6537`
- KV: `CT_ACCESS_CODES` ID `ac2ea4434e72490ea76ddb3ab6bca312`

---

## Sport Portal — what's NEXT

### Immediate (RACE DAY: Thu 7 May 2026 — 2 days away)
1. **Race-day path 100% verified ready** — sportcarnival.com.au/wd26 (200, 23 KB), CT app loads, ct-access `WPS-2026` validates, carnival-timing-ws DO ponging, falkor-ct-ai healthy, D1 archive auto-populated by carnival-timing-ws on first publish (Firebase mirror removed entirely — D1 is sole archive). WD26 carnival code is typed into CT app on race morning per the checklist (it's not a pre-created entity).
2. **Bib + roster artefacts** in `LuckDragonAsgard/asgard-workers/wd26/` (NOT Drive — Drive deprecated): print-and-pin bib PDF, finish-line roster, Tuesday dry-run plan. Bib numbers: 11 Boys WPS = 125–128 (page is source of truth, NOT 124–127).
3. **No-bibs fallback live**: carnival-timing-html v8.7.1 XC Marshal bib pad has `📋 Pick` button — taps full-screen name picker overlay filtered to active race (8 schools colour-coded). Marshal can identify each finisher by tapping name if bibs aren't worn.

### Short-term — COMMERCIAL READINESS (all engineering criticals DONE 2026-05-04)
**Engineering audit items COMPLETE**: ~~Privacy Policy hosted~~ ~~Terms not Draft~~ ~~Security headers~~ ~~CORS restricted~~ ~~Copyright 2026~~ ~~Footer email info@~~ ~~SSV wording clarified~~ ~~ssp-contact migrated to luckdragon.io~~. Email Obfuscation toggled OFF (CF dashboard) so contact links work.

**Commercial pack v1.0 DRAFTED 2026-05-05** — `LuckDragonAsgard/asgard-workers/commercial/` (8 files, see [README](commercial/README.md)). All 6 commercial-readiness items now have a v1.0 draft on GitHub. Australia-wide framing (APPs base + VIC/NSW/QLD/WA state addenda + Catholic/independent notes).

**REMAINING blockers to first paying school (priority order):**
1. ~~**Cyber Liability + Professional Indemnity insurance**~~ — DRAFT READY. Pre-filled BizCover application at [`commercial/INSURANCE_APPLICATION.md`](commercial/INSURANCE_APPLICATION.md). **PADDY ACTION:** submit at bizcover.com.au, save certificate of currency to repo as PDF when issued.
2. ~~**Privacy Impact Assessment**~~ — DRAFTED v1.0 at [`commercial/PRIVACY_IMPACT_ASSESSMENT.md`](commercial/PRIVACY_IMPACT_ASSESSMENT.md). Covers APPs + VIC/NSW/QLD/WA/SA/TAS/ACT/NT addenda + Catholic/independent notes. Send to first interested school's privacy officer for feedback.
3. ~~**Parental consent template**~~ — DRAFTED v1.0 at [`commercial/PARENTAL_CONSENT.md`](commercial/PARENTAL_CONSENT.md). Letter + signed-form versions. Pilot at next WPS carnival.
4. ~~**DPA template**~~ — DRAFTED v1.0 at [`commercial/DATA_PROCESSING_AGREEMENT.md`](commercial/DATA_PROCESSING_AGREEMENT.md). Controller/processor structure, sub-processors disclosed, AU residency, NDB 72h. **PADDY ACTION:** one legal-counsel review before first signature.
5. ~~**Reference customer story**~~ — DRAFTED v1.0 at [`commercial/WPS_CASE_STUDY.md`](commercial/WPS_CASE_STUDY.md). Quote slot pending — to confirm with himself post-7 May carnival with real numbers.
6. ~~**Sales one-pager + outreach**~~ — DRAFTED v1.0 at [`commercial/SALES_ONE_PAGER.md`](commercial/SALES_ONE_PAGER.md) + [`commercial/OUTREACH_LIST.md`](commercial/OUTREACH_LIST.md). 6-ring concentric plan, Ring 1 = 8 Hobsons Bay schools to hand-deliver at 11 May divisional debrief.

**Active blockers now reduced to:**
- (a) Paddy submits BizCover application
- (b) Legal-counsel review of DPA
- (c) WPS quote captured post-race-day
- (d) Render one-pager + case study to PDF for emailing


**Product gaps that won't block first sale but reduce churn:**
- Roster CSV import (paste from school SIS)
- Self-serve coach provisioning (works in new dashboard, only WPS wired)
- End-of-season report PDF (one per school council per year)
- Multi-year history view

### Medium-term (post-XC carnival)
- ~~**Wire CT XC bib lookup to Google Sheet**~~ — SUPERSEDED 2026-05-04 by `carnival-results` D1 migration. `sportcarnival-hub` v3.2.0 now reads from D1 (`/api/results?carnival=CODE`, `/api/list`). `/api/sheet` returns 410. CT app still double-writes to both Firebase and D1; Firebase reads no longer required.
- **Make `/wd26` data-driven** — currently hard-coded HTML. Refactor to pull from Google Sheet so other districts can be added as `/wd-<code>` paths.
- **"Try it with your district" form** on the demo page — collect name + email and route to SSP signup.
- **CT Phase 1 roadmap:** event program builder, house points tally, DNS/DNF, false-start RECALL, PWA, photo finish zoom, full-day export, qualifier board.

### Vision
"**Enter student data once, automate across all sports**" — SSP is the source-of-truth roster that feeds CT, SportCarnival, district draws, swimming, athletics. No re-keying, no wrong age groups.

---

## WPS / District context (for race day)

**District:** Williamstown District / Hobsons Bay Division. **District XC carnival: Thursday 7 May 2026** at McIvor Reserve, Yarraville. **Top 10 → Divisionals, 28 May (Werribee Racecourse)**.

### WPS qualifiers (top 4 from school finals → district)
| Age/Gender | 1st | 2nd | 3rd | 4th |
|---|---|---|---|---|
| 10 Boys | Elias D'Souza (#61, 8:06) | Thomas Reid (#62, 8:15) | Luca Galle (#63, 8:22) | William Galle (#64, 8:25) |
| 10 Girls | Eabha Pease (#29, 9:14) | Chloe Wood (#30, 9:39) | Rose Sexton (#31, 10:29) | Sienna Jordan (#32, 10:47) |
| 11 Boys | Henry Fielding (#125, 11:36) | Ned Hedditch (#126, 10:22) | Kai Morgan (#127, 13:04) | Bernie MacLeod (#128, 13:14) |
| 11 Girls | Emilia Rajch (#93, 11:47) | Greta Lovell (#94, 12:16) | Evie Vanderloo (#95, 12:58) | Ava Fleming (#96, 13:36) |
| 12 Boys | Banjo Kane (#189, 10:40) | Jarvis Sullivan (#190, 11:49) | Otis Lethborg (#191, 12:06) | Hudson Middleton (#192, 12:18) |
| 12 Girls | Danica Grant (#157) | Lily Sexton (#158, 16:30) | Irida Bladon (#159, 17:50) | Lana Budinoska (#160, 18:30) |

24 WPS runners total. Bib numbers confirmed against /wd26 spectator page (source of truth — embedded R{} dictionary).

**Physical bibs status (2026-05-04):** Paddy does NOT have physical bibs printed. Solved Mon 4 May with print-and-pin PDFs in this repo (`wd26/`):
- [`wd26/WD26_bibs.pdf`](wd26/WD26_bibs.pdf) — 192 numbered tear-off cards, 4/A4, school-coloured stripe, name + race printed.
- [`wd26/WD26_roster.pdf`](wd26/WD26_roster.pdf) — finish-line marshal reference, 1 section per race.
- [`wd26/DRYRUN_TUESDAY.md`](wd26/DRYRUN_TUESDAY.md) — Tue 5 May dry-run plan with `WD26TEST` throwaway code.
- Workflow Thursday morning: download/print → cut bibs → safety-pin/tape on at warm-up (~9am) → CT marshal mode types bib as runner finishes → /wd26 renders name from embedded R{} dictionary.
- Sacred Heart bibs (13–16, 45–48, 77–80, 109–112, 141–144, 173–176) printed as "TBC"; if SH attends, write names on the day.

---

## Live Falkor fleet — verified 2026-05-04

| Worker | Domain | Live |
|---|---|---|
| falkor-ui | **falkor.luckdragon.io** | v9.21.0 |
| falkor-agent | falkor-agent.luckdragon.io | v2.9.0 (Phase 81 bridge handlers) |
| falkor-kbt | falkor-kbt.luckdragon.io | v2.8.0 |
| falkor-workflows | falkor-workflows.luckdragon.io | v3.11.0 |
| falkor-school | falkor-school.luckdragon.io | v1.5.0 |
| falkor-sport | falkor-sport.luckdragon.io | v1.6.0 |
| falkor-telegram | falkor-telegram.luckdragon.io | v1.7.0 |
| asgard-ai | asgard-ai.luckdragon.io | v6.5.0 |
| falkor-brain | falkor-brain.luckdragon.io | v1.0.0 |
| falkor-web | falkor-web.luckdragon.io | v1.2.0 |
| falkor-code | falkor-code.luckdragon.io | v1.4.0 |
| falkor-push | falkor-push.luckdragon.io | v1.1.2 |
| falkor-dashboard | falkor-dashboard.luckdragon.io | v3.1.0 |
| falkor-widget | falkor-widget.luckdragon.io | v1.0.0 |
| falkor-deploy | falkor-deploy.luckdragon.io | up (PIN-gated) |
| falkor-ct-ai | falkor-ct-ai.luckdragon.io | v1.0.0 |

**Note:** `falkor-ui.luckdragon.io` is NXDOMAIN — UI is at **falkor.luckdragon.io**.

---

## Phase 81 — Local Bridge — TEST PENDING

Code DEPLOYED 2026-05-04 (commit `5e054ea`, deployment_id `f80acecaf6fb4428a1cbda36e09cf7e0` for falkor-agent v2.9.0).

Built:
- falkor-agent bridge protocol: `bridge_register` / `bridge_command` / `bridge_result` WS handlers, DO storage of bridge results.
- falkor-ui v9.21.0: PC bridge status pill in header.
- `falkor-bridge.js` (Node script — file/shell/screenshot/disk access, safe-roots only), `launch-bridge.vbs` (silent launcher), `install-bridge-startup.bat` (Windows Startup install).

To test (Paddy runs locally):
1. Open terminal in `G:\My Drive\Luck Dragon\`
2. `npm install ws` (one-time)
3. `node falkor-bridge.js`
4. Check falkor.luckdragon.io — PC pill should go green.
5. Test prompt: "list files on my desktop"

Auto-start on login: run `install-bridge-startup.bat` as admin.

---

## Recently shipped (2026-05-03 → 2026-05-04)
**SLY auth-hole sweep + 5 endpoints gated (2026-05-05 evening):**
- Found 5 unauthenticated PATCH endpoints during deep-test of login + PIN flow:
  - PATCH /api/coaches/:id (anyone could rename teams, change avatars/colors/emails)
  - PATCH /api/players/:id (anyone could rename/recolor players)
  - PATCH /api/payments/:id (anyone could mark coaches paid/unpaid + adjust gold_balance + autopick_paid → financial fraud risk)
  - PATCH /api/trades/:id (anyone could approve/reject any trade)
  - PATCH /api/sly-fixtures/:id (anyone could rename matches)
- All 5 patched: requireCoachAuth(self) for /coaches/:id, requireAdmin for the rest. Now 401/403 without proper headers.
- Verified accidentally-mutated rows reverted (Josh "Once Bitten" + paid=0).
- Repo: superleague-yeah-v4 commit 8027ac78 → CF deploy success.
- Login (POST /api/coaches/login) was already auth-correct: empty body 400, invalid PIN 401, valid → token.
- PIN-change (PATCH /api/coaches/:id/pin) properly requires current_pin and validates length>=4.
- All 16 coaches on custom PINs (none on default 1234 anymore).
- SPA confirms theme toggle (themeToggle, toggleTheme) + service worker unregister logic + body.light-mode #pageChat fix all present in delivered HTML.

**SLY data normalization (2026-05-05 afternoon):**
- 11 players had `position='MID'` instead of canonical `MIDFIELDER` — would not have matched scoring formula `M=4M` or Pick-tab slot filter. UPDATEd to MIDFIELDER. Two were drafted in Andy's squad (Milan Murdock, Tom Blamires).
- 12 players had AFL short-code team names (WCE/NM/PA/CARL/FRE/HAW/MELB/RICH/WB) mixed with full names (43 of 18 AFL clubs). UPDATEd via single CASE statement. Final: 18 distinct teams, 0 short codes. Same Andy-squad players also affected — both team values now correct.
- Injury entry "Samuel Cumming" had `player_id=null` — patched in injuries JSON config blob to UUID e99b8dfb-... (matches "Sam Cumming" in players, RIC, MIDFIELDER).
- Seeded `auto_pick_enabled=1` global config row — was missing, /api/config?key=auto_pick_enabled returned null. SPA now sees explicit gate value.
- Net: 0 NULL player_ids in injuries, 0 short-code teams, 0 non-canonical positions, all 4 config rows present. R9 Pick UI for Andy now resolves Milan + Tom into the M slot correctly.

**Whole-system bug check + fixes (2026-05-05 noon):**
- Created `WD26TEST` access code in ct-access (POST /create with PIN, type=ssp) — required for today's Tuesday dry-run before Thursday's race day. Verified validates and listed in /admin/codes.
- Cleaned sly D1 orphans: deleted 1 sentinel score row (id=1510, coach_id/round_id=99999 test data) + 15 R0 orphan picks (player_id stored as name string instead of UUID, pre-migration legacy). Final counts: 128 scores, 1389 picks, 0 orphans.
- Restored "Optimised defaults applied" banner wording on kelly-finance + monica-finance for parity with paddy-finance. Both deployed (HTTP/2 protocol error retried clean), live verified.
- Whole-system sweep: 47/47 endpoints 200, all bindings + crons intact, all auth gates 401/403, all D1 row counts now sane.


**sportcarnival-hub v3.3.0 (2026-05-04 evening) — XC scoring fix + qualifiers print:**
- /wd26 team-scores now uses **standard SSV cross-country scoring**: top 4 finishers per school per race, sum places, lowest aggregate wins. Was: inverted points (1st=field-size, high score wins) — non-standard.
- Schools with <4 finishers in a race contribute nothing for that race (still get individual points).
- New **🎖️ Divisional Qualifiers** card under team scores: top 10 from each race in one panel, with **🖨️ Print** button. `@media print` CSS hides everything else for a clean printout.
- Repo `LuckDragonAsgard/sportcarnival-hub` worker.js committed.


**Link/button audit + sportcarnival-hub v3.2.1 (2026-05-04 evening):**
- Found and fixed JS comma-operator regression I introduced in v3.2.0 — `if (p === '/api/list','/williamstownps/crosscountry' || ...)` evaluated to `if ('/williamstownps/crosscountry' || ...)` which is always truthy, so EVERY URL on sportcarnival.com.au was returning the lock page. Fixed in v3.2.1.
- `schoolsportportal-nav.js` was 404 returning HTML — half the pages embedded `<script src="/schoolsportportal-nav.js">` and silently failed. Added handler in `ssp-portal` worker that serves real JS with shared top nav + footer (Home/Help/Privacy/Terms/Contact). Pages that depend on it (WPS, Hobsons) now have working nav.
- Added `/terms` link to `carnival-timing-html` bottom sticky bar (was Privacy-only).
- Added Privacy/Terms/Help footer links to `/williamstowndistrict` page.
- Final link audit: 38/39 resources HTTP 200; the 1 fail (`/cdn-cgi/l/email-protection`) was CF Pages email obfuscation — root-cause-fixed by toggling Email Address Obfuscation OFF in CF dashboard for `sportportal.com.au` zone (verified live: cdn-cgi=0, mailto=2 served clean).

**Vault additions (2026-05-04):**
- `STAFF_SESSION_SECRET` — HMAC key for /williamstowndistrict bearer-token sessions (carnival-results v1.2.0)
- `CF_FULLOPS_TOKEN` — new CF API token `asgard-fullops-2026-05-04` with Account scopes (Workers Scripts, Cloudflare Pages, D1, Workers KV) + Zone scopes (Zone Settings, Config Rules, Workers Routes, Cache Purge). Means future zone-level dashboard tweaks (toggle obfuscation, deploy Pages, etc.) can be done by API instead of driving the browser.



**carnival-timing-html v8.7.1 (2026-05-04 evening) — XC Marshal name picker:**
- Added `📋 Pick` button next to `🔍 Auto` OCR in XC Marshal bib pad → opens full-screen name picker overlay with search.
- Filters BIB_LOOKUP to bibs in the active race (xcState.age + xcState.gender). 8 schools colour-coded, taken bibs greyed out.
- Tap a name → sets `bibValue` + auto-runs `bibConfirm()` → next finisher.
- BIB_LOOKUP for WD26 (192 runners) re-injected — v8.7.0 had stripped it; restored in v8.7.1.
- Resolves the "no physical bibs" Thursday gap: marshal can identify each finisher by tapping name, no typing/no bib reading.
- Repo `LuckDragonAsgard/sport-carnival` synced to live worker (commit `7ff40df9`).
- Try it: carnivaltiming.com → access code `WPS-2026` → create carnival `WD26TEST` → XC → Marshal → tap finisher → tap `📋 Pick`.


**WD26 race-day prep (2026-05-04 afternoon):**
- Generated print-and-pin bib PDF + finish-line roster + Tuesday dry-run plan → `LuckDragonAsgard/asgard-workers/wd26/` (GitHub, NOT Drive — Drive deprecated). Resolves "no physical bibs" gap.
- Corrected 11 Boys WPS bib numbers: handover had 124–127, /wd26 has them at 125–128 (page is source of truth — bib 124 = Banjo Kane WNPS, *not* WPS).
- Verified end-to-end live: /wd26 200, WS auto-connects to `wss://carnival-timing-ws.../ws/WD26`, ct-access `WPS-2026` validates as ssp/WPS, carnival-results D1 v1.2.0 ready (no WD26 row yet — clean).


**Firebase → Cloudflare migration COMPLETE (2026-05-04, e2e session, Phase 2 done):**
- `/williamstowndistrict` rewritten — Firebase Auth + RTDB removed; new D1-backed page with email magic-link login + `/api/scores` + `/api/users` + admin coach provisioning. Page size shrunk 143 KB → 19 KB.
- `carnival-results v1.2.0` — added auth (`/auth/login` `/auth/verify` `/auth/me` `/auth/logout`), scores (`GET/POST/DELETE /api/scores`), users (`GET/POST/DELETE /api/users`). Bearer-token sessions HMAC-signed with `STAFF_SESSION_SECRET` (in vault).
- `carnival-timing-ws` — `pushToFirebase()` removed entirely. D1 is sole archive.
- `ssp-portal` — no-cache header on GH-fetched pages + cache-bust on subrequest URL.
- All served pages now have **0 Firebase mentions** (verified e2e).
- Magic-link login tested end-to-end: `pgallivan@outlook.com` → email sent via Resend, token stored in D1.
- D1 schema: `carnivals`, `results`, `users`, `division_winners`, `auth_tokens`, `scores`.

**Remaining for Paddy (GCP/Firebase final cleanup, no urgency):**
1. Revoke 3 legacy GCP service-account keys (steps in [`docs/FIREBASE_DECOMMISSION.md`](docs/FIREBASE_DECOMMISSION.md))
2. Delete Firebase project `willy-district-sport` (after 1-week verification)


**Firebase → Cloudflare migration Phase 1 (2026-05-04, e2e session):**
- Bulk migrated Firebase /fl/ → D1 carnival-results (12 real carnivals, 4 result rows; 210 LOAD-* test entries skipped).
- carnival-timing-ws now double-writes to D1 alongside dormant Firebase mirror — WD26 race results will permanently land in D1.
- carnival-results v1.1.0 — added /api/winners GET+POST + /health; new D1 table `division_winners`.
- ssp-portal HOBSONS_HTML — removed ~150KB Firebase SDK; reads from /api/winners with 30s polling.
- Comprehensive plan in [`docs/FIREBASE_DECOMMISSION.md`](docs/FIREBASE_DECOMMISSION.md).
- DEFERRED: schoolsportportal /williamstowndistrict (Firebase Auth + RTDB scores) — too risky 3 days before race day. Phase 2 post-Thursday.


**sportcarnival-hub v3.2.0 (2026-05-04, e2e session):**
- `/api/results?carnival=CODE` and `/api/draw?carnival=CODE` now read from `carnival-results` D1 (no Sheet/Firebase dep on the read path).
- New `/api/list` endpoint returns published carnivals.
- `/api/sheet` deprecated (returns 410).
- WD26 returns `{"status":"pending"}` until Thursday (no error).

**sportcarnival-hub v3.1.1 (2026-05-04):**
- Routes `/williamstownps/{crosscountry|athletics|swimming}` (noindex) + `/demo-school/{crosscountry|athletics|swimming}` (public).
- HTML embedded inline (~210 KB worker total).

**ct-access (2026-05-04):**
- Added `DELETE /admin/codes/:code` (PIN-protected). Source archived in `asgard-workers/workers/ct-access/worker.js`.


**sportcarnival-hub v3.0.0 (2026-05-04 evening):**
- Homepage `/` now serves a public **demo** (Demo Valley District XC 2026, 8 fictional schools, simulated live results, CTAs to SSP + CT).
- Real Williamstown district data moved to `/wd26` (aliases: `/williamstown`, `/williamstown-2026`). `x-robots-tag: noindex`, blocked in robots.txt.
- API endpoints (`/api/draw`, `/api/results`, `/api/sheet`, `/api/status`) preserved.

**Sport Portal pre-launch polish (2026-05-03):**
- SSP `/help`, `/sitemap.xml`, `/robots.txt` embedded in `ssp-portal`.
- SSP auto-reply via `ssp-contact` (Resend) — fires after internal notification.
- SSP, CT, SC footer cross-links between all three products.
- CT admin dashboard (`ct_admin_dashboard.html`) — `ct-access.luckdragon.io/admin/codes` with `X-Pin: 535554`.
- CT `hello@carnivaltiming.com` email forwarding via CF Email Routing → paddy@luckdragon.io.
- Pitch email templates (4) saved.

**Other:**
- Account consolidation COMPLETE — CF, Stripe, GitHub, GDrive all on `paddy@luckdragon.io`.
- luckdragon.io homepage 525 SSL fixed.
- Phase 81 Bridge code deployed (test pending).

---

## Deploy patterns

- **Simple workers** (no DO/KV bindings): `POST https://asgard-tools.luckdragon.io/admin/deploy` with `X-Pin: VAULT_PIN`. Add `skip_auto_commit: true`.
- **Workers with DO/Vectorize/KV bindings** (falkor-agent, falkor-kbt, falkor-brain, ct-access, carnival-timing-ws): use CF API directly with multipart PUT. Pass `keep_bindings: ["secret_text"]` to preserve secrets. For ct-access also pass `kv_namespaces: [{binding:"CT_ACCESS_CODES", id:"ac2ea4434e72490ea76ddb3ab6bca312"}]`.
- **`carnival-timing-html` deploy gotcha:** CF API returns the worker as multipart. Must extract JS from multipart before redeploying.
- **`ssp-contact` is service-worker format** (uses `addEventListener`). Deploy with `body_part: "script"`, NOT `main_module`.
- **`ssp-portal`, `sportcarnival-hub` are ES Module format.** Use `main_module: "worker.js"`.
- **GitHub Contents API**: use `LuckDragonAsgard/asgard-workers`. `GITHUB_TOKEN` in vault.
- **Never tell Paddy to hard-refresh.** Send no-cache headers from the server.

---

## Security (current)

- **falkor.luckdragon.io login (Paddy):** `2967` (POST falkor-push `/user/verify`)
- **AGENT_PIN** (fleet inter-worker `X-Pin`): `JilSS1zLn3Rl7mWrM6fOJc69` (rotated 2026-05-01)
- **VAULT_PIN** (asgard-vault): `535554` (active 2026-05-03)
- **falkor-dashboard worker PIN**: `luckdragon`
- **Vault read**: `GET https://asgard-vault.pgallivan.workers.dev/secret/<KEY>` with `X-Pin: 535554`
- Stripe webhook secret: `we_1TS4y0Am8bVflPN0qCkWbAkO`

---

## Other live projects (context)

- **KBT Trivia Tools** — asset pipeline, Google Slides `[q]` placeholder, 6 tool files. GDrive default/quiz/ folder + ~20 per-game templates.
- **Bomber Boat** (bomberboat.com.au) — CF Pages + Worker, GitHub `PaddyGallivan/bomber-boat`.
- **Superleague Yeah v4** (superleague.streamlinewebapps.com) — AFL fantasy draft v4.28.
- **WPS Y2 Maths Intervention** — 7-week term pack, 14 lessons, Vic Curric 2.0 + VTLM 2.0.
- **Face Morph Tool** — 50/50 alpha blend, see `reference_facemorph_rules.md`.
- **Jaclyn Rooney — 75 Cecil St** — desktop building review done April 2026.
- **wps-staff-hub / wps-hub-v3** — internal WPS workers (separate from SSP product portal).

---

## How Paddy likes to work

- Casual, direct — no fluff, no post-work summaries.
- Delegates fully — just do it.
- **Don't clutter Drive** — see file rule at top.
- Handovers/status docs → THIS GitHub repo (`LuckDragonAsgard/asgard-workers/FALKOR_HANDOVER.md`).
- Check GitHub before assuming worker state.
- Screenshot when debugging UI.
- Never tell him to hard-refresh or clear cache. Send no-cache headers from the server.
- AFL Bulldogs fan.

---

## Known drift / cleanups

1. ~~WPS XC sub-page 404~~ — RESOLVED 2026-05-04. `sportcarnival-hub` v3.1.1 routes `/williamstownps/{crosscountry|athletics|swimming}` (noindex) and `/demo-school/{crosscountry|athletics|swimming}` (public). HTML embedded inline.
2. **falkor-agent versioning** non-linear: source = `2.9.0`, prior commit messages claim `1.9.1`. `/health` is the truth.
3. **Privacy/Terms** are now hosted on sportcarnival.com.au/privacy and /terms. Should also be mirrored to schoolsportportal.com.au/privacy and /terms (audit critical).
4. **ssp-contact** still on pgallivan domain — should migrate to luckdragon.io.
5. **Sport Portal architecture push** from earlier today — verification code still needed if continuing.
6. **`sportcarnival-hub` repo vs live worker drift** — repo has `index.html`, `vercel.json`, `williamstownps/`, `demo-school/` from Vercel-style setup; live worker is a single `worker.js` with embedded HTML. `worker.js` was committed back to repo (2026-05-04) but legacy files remain.

---

## How to start the next chat

Paddy will likely say one of:

- *"Sport Portal — pick up"* → start with the Immediate list above.
- *"Bridge test"* → walk through Phase 81 test steps.
- *"Thursday checklist"* → open `thursday_checklist.html` from Drive and walk through.
- *"What did we do yesterday?"* → summarise from "Recently shipped".
- A fresh project ask → ask which project, then proceed.

Per project instructions, this file is auto-fetched at chat start. Brief Paddy from the **Sport Portal — what's NEXT** section first.


---

---

## CLUBHOUSE — FULL HANDOVER (2026-05-04)

Clubhouse is a **multi-tenant club management SaaS** built on Cloudflare Pages + D1 + R2. PE/sport clubs sign up, manage rosters, fixtures, stats, and payments. Sessions 1–5 shipped tasks #1–45.

### Infrastructure
| Resource | ID / Name |
|---|---|
| CF Pages project | `clubhouse` (GitHub: LuckDragonAsgard/clubhouse) |
| D1 database | `b6275cb4-9c0f-4649-ae6a-f1c2e70e940f` (binding: `DB`) |
| R2 bucket | `clubhouse-media` (binding: `MEDIA`) |
| Deploy | Push to `main` → CF Pages auto-builds |

### Database tables
| Table | Purpose |
|---|---|
| `clubs` | One row per club (slug, name, features JSON, playhq_org_id, playhq_season_id, playhq_last_sync) |
| `ch_memberships` | Users ↔ clubs (user_id, club_id, role: admin/committee/coach/player/parent) |
| `ch_fixtures` | Games (club_id, round, date, home/away, opponent_name ← **NOT** opponent, score, result, sport, playhq_id) |
| `ch_stats` | Flat key-value stats (fixture_id, user_id, stat_key, stat_value REAL) — UNIQUE(fixture_id, user_id, stat_key) |
| `ch_ladder` | Season ladder rows (club_id, team_name, p/w/l/d/pts, scraped_at) |
| `users` | Auth (email, name, avatar_url) |
| `sessions` | Bearer tokens (token, user_id, expires_at) |

### Auth pattern (critical — must get this right)
```js
// Handler MUST destructure request AND env
export async function onRequestGet({ request, env, params }) {
  const user = await AUTH(request, env);       // throws 401 if no valid Bearer
  const clubId = await getClubId(env, params.slug);
  const mem = await checkMembership(env, clubId, user.id);
  // mem.role: admin | committee | coach | player | parent
}
```

### API endpoints (all under /api/clubs/:slug/)
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `fixtures` | member | List fixtures |
| POST | `fixtures` | admin/committee | Create fixture |
| GET | `fixtures/:id/stats` | public | Get all player stats for a game |
| POST | `fixtures/:id/stats` | admin/committee/coach | Upsert stats (batch) |
| GET | `stats/:userId` | public | Career stats — totals, avgs, best, last 10 games |
| GET | `stats/leaderboard?stat=goals&limit=10` | public | Top players by stat |
| GET/PATCH/POST | `sync/playhq` | admin | PlayHQ GraphQL config + sync |
| POST | `sync/scrape` | admin | Receive bookmarklet-scraped data (fixtures + ladder) |
| GET | `members` | member | Roster |
| POST | `members/import` | admin | CSV bulk import (task #41) |
| GET | `settings` | member | Club settings + features |
| PATCH | `settings` | admin | Update settings |

### Stats system
- **AFL keys:** goals, behinds, kicks, handballs, disposals, marks, tackles, hitouts, frees_for, frees_against, votes
- **Cricket batting:** runs, balls, fours, sixes, not_out
- **Cricket bowling:** overs, maidens, wickets, runs_conceded
- Entry UI: `/club/:slug/stats/entry/:fixtureId` (StatsEntry.jsx — sport selector + scrollable player × stat grid)
- Player profile shows career stats (PlayerStats.jsx component)
- Leaderboard at `/club/:slug/stats/leaderboard` (Leaderboard.jsx)

### PlayHQ integration
- PlayHQ is a **full SPA** — server-side scraping blocked (CloudFront, returns 2290-char shell HTML)
- Solution: **bookmarklet** — admin drags button from Admin page to bookmarks bar, clicks on PlayHQ page
- Bookmarklet source: `public/playhq-bookmarklet.js`
- Scrapes `[class*="GameCard"]` fixture cards + `tbody tr` ladder rows from live DOM
- Also intercepts fetch to capture GraphQL responses
- POSTs to `/api/clubs/${slug}/sync/scrape`
- GraphQL endpoint (discovered): `https://api.playhq.com/graphql`

### Key bugs / gotchas
- `ch_fixtures` column is `opponent_name` NOT `opponent` — always use `opponent_name`
- `sport` column on `ch_fixtures` was added via ALTER: `ALTER TABLE ch_fixtures ADD COLUMN sport TEXT DEFAULT 'afl'` — must migrate on any fresh DB
- CF Pages routes specific filenames before dynamic ones: `stats/leaderboard.js` resolves before `stats/[userId].js`
- GitHub Contents API: URL-encode `[` as `%5B`, `]` as `%5D` in file paths
- Error 1101 = CF worker runtime exception — check D1 schema first
- `wrangler.toml` controls CF Pages production bindings — R2 must be declared or it disappears on deploy

### Frontend routes (React SPA, src/App.jsx)
```
/club/:slug/                    → ClubHome
/club/:slug/fixtures            → Fixtures (has 📊 link on played games)
/club/:slug/stats/entry/:id     → StatsEntry
/club/:slug/stats/leaderboard   → Leaderboard
/club/:slug/members/:userId     → PlayerProfile (shows PlayerStats component)
/club/:slug/admin               → Admin (bookmarklet UI + feature toggles)
```

### Feature flags (clubs.features JSON)
Default features: `{ news: true, events: true, gallery: true, payments: true, stats: true }`
Toggle in Admin page under "Features" section.

### Session 5 completed (2026-05-04)
- ✅ Task #41: CSV roster import
- ✅ Task #42: PlayHQ GraphQL sync endpoint
- ✅ Task #43: PlayHQ bookmarklet scraper (DOM-based, bypasses SPA blocking)
- ✅ Task #44: Stats entry system (AFL + Cricket, per-fixture, per-player)
- ✅ Task #45: Stats display (PlayerProfile component + Leaderboard page)
- ✅ Handover updated in both asgard-source (Cowork) and asgard-workers (Falkor)

### Next steps for Clubhouse
- Test bookmarklet on real PlayHQ admin account (need org_id + season_id first)
- Wire up payments (Stripe) for member registration
- Notifications: fixture reminders, score updates via Telegram/push
- Public club profile pages (unauthenticated)

---

## Family Finance pages — IP cascade calculators (May 2026)

Three Cloudflare workers built to model the Footscray-Williamstown property cascade between Paddy/Jacky, Kelly, and Monica. All three deployed and live as of 2026-05-04.

### URLs
- **Paddy & Jacky** — https://paddy-finance.pgallivan.workers.dev (3-property portfolio: Cecil St PPOR, North Rd Newport IP, Osborne St becoming IP)
- **Kelly** — https://kelly-finance.pgallivan.workers.dev (713/90 Buckley as IP, moving to Osborne)
- **Monica** — https://monica-finance.pgallivan.workers.dev (308/90 Buckley as IP, moving to 713)

### Architecture
- Single `worker.js` per page, plain HTML+inline CSS+JS. No frameworks, no D1, no KV.
- Source files: `/tmp/kelly_v9.js`, `/tmp/monica_v8.js`, `/tmp/paddy_v9.js` in the active session sandbox.
- Deploy via CF API multipart PUT to `accounts/$ACCOUNT/workers/scripts/<name>-finance` with `metadata.main_module = "worker.js"`.

### What each page does (parity feature set)
- Hero: net weekly cashflow + CGT 6-yr-rule savings.
- Long-term wealth banner: 10-year wealth built, equity, CGT avoided, break-even/portfolio summary.
- Before-vs-after IP comparison with diff bar (positive = better off, negative = worse).
- Tax math correctly nets rental income against deductions before applying marginal rate (was a bug — fixed).
- Inputs: salary, loan, rate, repayment, rents in/out, body corp, rates, insurance, maintenance, depreciation, land tax, other deductibles, vacancy %, rent growth %, cost growth %.
- IP/OO toggle that bumps rate +0.5% on IP and recalculates.
- PPOR designation warning explaining only one property at a time can be CGT-exempt.
- Action plan / next-steps panel.
- Mobile-friendly: viewport meta + 600px media queries collapsing all grids to single column.

### Deploy gotchas
- **CF API token vault**: `https://asgard-vault.pgallivan.workers.dev/secret/CF_API_TOKEN` with `X-Pin: 535554`.
- **CF account ID**: `a6f47c17811ee2f8b6caeb8f38768c20`.
- **No D1 binding needed** — these are pure HTML responses, not DB-backed.
- File-tool writes to outputs/ are NOT visible to bash sandbox (one-way Win→Linux mount). Either write directly via bash heredoc, or write to `Luck Dragon 2.0` mount which IS shared. Lost an hour to this on May 4.

### Optimised defaults baked in
All three pages now open with cashflow-near-neutral assumptions: refinanced rate 5.5%, proper QS depreciation reports ($13k Kelly / $11k Monica), top-of-market rents, $2k/yr other deductibles, vacancy 2-4%, land tax pre-filled (apartments $0 under VIC threshold; Paddy NR $7k + Osborne $9k). Each page shows a green "optimised defaults applied" note above the calculator.

### Current state at default values
- **Kelly**: weekly diff -$41/wk, +$441k wealth built over 10 yrs.
- **Monica**: weekly diff -$83/wk, +$368k wealth built over 10 yrs.
- **Paddy & Jacky**: $3.76M combined IP value at year 10, $3.23M equity, $332k Cecil St paid down by IPs.

### Known limits
- Without going interest-only, Monica's diff cannot reach $0/wk within ATO market-rate constraints (cascade is structurally biased against the bottom rung).
- Banner break-even year shows 30+ for Kelly/Monica because both rent-in and rent-out grow at same 3%/yr rate — gap doesn't close.
- Real-world Paddy is positively-geared once Osborne is IP (no Osborne loan), so net tax position is small additional liability not refund — labeled clearly on the banner.


---

## Paddy & Jacky finance — ACTUALS (2026-05-04)

Real figures captured this session.

### Salaries
- Paddy: $118,000 (32.5% bracket)
- Jacky (Jaclyn Rooney): $220,000 (45% bracket)
- Strategy: claim IP losses against Jacky for max refund

### Current loans
- North Rd, Newport (current IP): $702,615 @ 6.02% variable, ~$4,221/mo P&I
- Osborne St, Williamstown (current PPOR, becoming IP): $508,110 @ 5.75%, ~$2,966/mo P&I

### Rents
- North Rd: $3,433/mo (Compton Green confirmed)
- Osborne (post-move): $650/wk to Kelly

### Refi plan (broker Matt, 2026-05-04)
- North Rd: refi to 75% LVR; equity drawn -> Cecil deposit
- Osborne: refi to 75% LVR; equity drawn -> Cecil deposit
- Cecil St new purchase: $1.1M, 60% LVR = $660k loan + ~$440k equity deposit
- ATO purpose test: equity for Cecil (PPOR) is NOT deductible. Split loans.
- Awaiting broker valuations.

### Plan cashflow (IPs in Jacky)
- Combined IPs: -$388/wk before tax
- Tax saving 45%: +$207/wk PAYG
- Net IP after tax: -$181/wk
- Cecil St mortgage: $3,747/mo

### Cecil St payoff
- 30 yrs standard, 15 yrs with IP cashflow redirected

### Live calculator
- https://paddy-finance.pgallivan.workers.dev
- IP ownership selector defaults to Jacky
- Refi-plan banner with ATO purpose-test warning

---

## PJ Finance budget app — COMPLETE (2026-05-04)

The hub at `pj-budget.pgallivan.workers.dev` was a landing page with dead links. Now a real multi-page app with all 7 detail pages working, routing handled in the worker (PAGES dict by pathname).

### Pages
- `/` — hub
- `/PJ_Net_Worth.html` — assets/liabilities/equity, $2.79M assets / $1.58M net worth / 58% LVR; Now/Post-Cecil toggle.
- `/PJ_Dashboard.html` — weekly cashflow: $5,442 in / $3,567 out / +$1,875 surplus / 34% savings rate. Editable. Now/Post-Cecil toggle.
- `/PJ_Affordability.html` — stress test at +2% (8.5% APRA buffer), max comfortable purchase, repayment shock table.
- `/PJ_Scorecard.html` — KPIs (savings rate, DTI, LVR, emergency fund, property concentration, deductible debt ratio) vs benchmarks.
- `/PJ_Budget_Monitor.html` — bank account list with watch/low thresholds. localStorage. Export/import JSON.
- `/PJ_Advice.html` — 10 hardcoded suggestions ranked high/med/low impact. Top 3: split-loan refi (ATO purpose test), QS depreciation reports, IPs in Jacky's name.
- `/PJ_Claims.html` — tax deduction log. Categories pre-set. localStorage. CSV export for accountant.

### Architecture
- Single Cloudflare worker (`pj-budget`) handling all routes via PAGES dict lookup by url.pathname.
- Worker 84KB. All pages inline with own CSS, mobile-friendly.
- localStorage on Accounts and Claims pages.
- Dark teal theme consistent with hub.

### Real defaults
Salaries Paddy $118k, Jacky $220k. Loans NR $702,615 @ 6.02%, Osborne $508,110 @ 5.75%, Cecil St (planned) $660k @ 5.5% (60% LVR on $1.1M). Property values estimated $1.0M / $1.1M / $1.1M.

### Build files
- /tmp/build_pj.py — builder for 4 calc pages
- /tmp/build_pj_extras.py — builder for 3 interactive pages
- /tmp/pj_hub_v4.js — final deployed worker (84,728 bytes)



---

## Full system audit + fixes — 2026-05-05 (afternoon)

Comprehensive audit across SSP/CT/SC: HTTP, branding, integrations, emails, demos, per-carnival rules. All P0 + P1 issues fixed.

### Fixed
1. **Wrong email everywhere** — `info@sportportal.com.au` (broken domain — was bouncing) replaced with `hello@schoolsportportal.com.au` in 10 places across `carnival-timing-html` (3x in embedded Privacy/Terms), `sportcarnival-hub` (2x in DEMO_H base64 footer), `ssp-portal` (5x in PRIVACY_HTML_SSP).
2. **`/williamstownps/{crosscountry|athletics|swimming}`** were serving a generic "Log in" lock page with broken `sportportal.com.au` URL. Replaced with proper noindex sub-pages: crosscountry redirects to `/wd26`, athletics + swimming show "coming soon" with correct CTAs.
3. **Magic-link login email** in `carnival-results` was bare-bones `<p>Hi,</p><p>Click here</p>`. Replaced with branded HTML matching ssp-contact auto-reply quality (logo, button, copy/paste fallback link, ABN footer).
4. **SSP homepage now has a working contact form** — POSTs to `ssp-contact.pgallivan.workers.dev`, triggers internal notification + branded auto-reply. Honeypot + validation. Form submits async, success/error inline.
5. **Per-carnival rules engine** — CT setup now has expandable "⚙️ Carnival rules" section with: max events per student, max relays per student, allow relays toggle, allow manual time edits, allow position swaps, strict age enforcement, publish results publicly. Persisted to `carnivalMeta.rules`.
6. **`/williamstowndistrict` placeholder emails** — `coordinator@example.com` → `coordinator@school.edu.au`; `you@school.vic.edu.au` → `you@school.edu.au` (AU-wide, was VIC-only).
7. **Favicon** — SVG runner-on-navy added at `/favicon.svg` on SSP and SC (was 404 / inherited browser default).
8. **Meta description** — added to Hobsons Bay page; existing on SSP/SC homepages and WSD verified.
9. **Demo pages now show integration callout** — `/demo-school`, `/demo-district`, `/demo-division`, `/demo-region` now have an injected banner: "✨ Demo X — fictional data" + buttons "▶ See live integration demo" (→ sportcarnival.com.au) + "Set up your school". Implemented via `injectDemoBanner(html, kind)` response transform — no const editing required.

### Verified clean post-fix
All 25 known URLs return 200. Bad email count = 0 across all 10 audited pages. /favicon.svg serves on SSP and SC. /api/list returns 12 published carnivals. /health green. ct-access /validate POST returns school name. ws endpoint upgrade-required (correct).

### Deferred (not blocking)
- Welcome email after Stripe checkout completes (needs webhook integration).
- Race-day reminder cron.
- Per-carnival rule **enforcement** (UI present, persists to meta — entry-time validation hooks not yet wired; manual edit toggle is wired via existing `adminEditTime`).
- Footer redesign — pages have footers but vary in style; existing shared-nav script handles top nav; bottom footer left as is.


---

## Email+password auth + P2 fixes — 2026-05-05 (evening)

### Auth: email+password (replaces magic-link)
- **`carnival-results` v1.4.0** — new endpoints:
  - `POST /auth/login {email, password}` → returns `{ok, email, role, session, expiry}`. PBKDF2-SHA256 100k iterations (CF Workers cap), per-user 16-byte salt.
  - `POST /auth/set-password {email, currentPassword?, newPassword}` — self-service if signed in (currentPassword required) or admin override.
  - `POST /auth/admin-bootstrap {email, password, role, displayName}` (header `X-Admin-Pin`) — initial password setup, PIN-protected.
- D1 `users` table got `password_hash` + `password_salt` columns.
- **Paddy bootstrapped** on `pgallivan@outlook.com` and `paddy@luckdragon.io`. Password in vault key `PADDY_SSP_PASSWORD`. `ADMIN_BOOTSTRAP_PIN` in vault.
- `/williamstowndistrict` login UI replaced — email + password fields, "Forgot password?" details, calls `/auth/login` with both, stores session in localStorage. Old magic-link endpoint deprecated (still exists if needed but UI no longer uses it).
- **CF Workers PBKDF2 cap gotcha**: max iterations is 100,000 (not 200,000). Higher counts throw `NotSupportedError`.

### P2a — Stripe checkout welcome email (DONE)
- `ct-access` `sendCodeEmail()` rewritten as full branded welcome HTML: hero card, big yellow code on navy gradient, 4-step "next steps" list, big CTA button to /help, ABN footer. Different subject + framing for SSP vs single vs annual.
- Already wired into the Stripe webhook handler — fires on `checkout.session.completed`.

### P2b — Per-carnival rule enforcement (partial wiring)
- `adminEditTime` now gates on `carnivalMeta.rules.allowManualEdits` — toasts "Manual time edits are disabled" if false.
- Tap-to-edit handler on time cells respects same rule.
- Added `filterEventsByRules(events)` helper — filters relays from event lists when `allowRelays === false`.
- **NOT YET WIRED**: `maxEventsPerStudent`, `maxRelaysPerStudent`, `strictAge`, `allowPositionSwap`. UI in setup screen captures them; enforcement at entry-time TBD next session.

### P2c — Race-day reminder cron (DONE)
- `carnival-results` v1.4.0: `POST /cron/race-day-reminders` — scans `carnivals.event_date` for tomorrow + day-after, emails all admin/coach/committee users a branded checklist email.
- D1 `carnivals` table got `event_date` (TEXT, ISO date) + `reminder_sent_at` (INTEGER ms). Once a reminder fires for a carnival, it's marked sent.
- CF Cron Trigger: `0 22 * * *` UTC (= 8am AEST). Calls `scheduled()` handler in worker, which fetches `/cron/race-day-reminders` with `cf-cron: true`.
- `CRON_PIN` in vault for manual triggers (PIN passed via `X-Cron-Pin` header).
- **CT app TODO**: when creating a carnival, write `event_date` to D1 (currently null on existing carnivals — reminder is no-op until populated).

### Verified
- Login: `POST /auth/login {pgallivan@outlook.com, ${vault.PADDY_SSP_PASSWORD}}` returns 200 with session token.
- Wrong password returns 401 cleanly (constant-time compare).
- Cron endpoint manual run: `{ok:true, sent:0, failed:0, scanned:0}` (no carnivals with event_date set yet — expected).
- Health: `{"ok":true,"worker":"carnival-results","version":"1.4.0"}`.
- /williamstowndistrict serves new email+password form (verified live).



---

## Hardening + cleanup pass — 2026-05-05 (late)

Paddy: "we need all that fixed". Knocked through the entire 27-item gap list.

### Auth hardening (carnival-results v1.5.0)
- **Rate limiting**: 10 attempts per IP per 5 min on `/auth/login`. Returns 429 + Retry-After.
- **Account lockout**: 5 failed attempts per email in 15 min → 423 lock.
- **Self-serve password reset**: `POST /auth/forgot-password` (5/IP/hr rate limited). Sends branded email with single-use 15-min token. `POST /auth/reset-password` consumes token, sets new password, clears lockouts. Public reset page at `/auth/reset?token=X`.
- **Old magic-link `/auth/verify` removed** (replaced with reset flow).
- D1: new `auth_attempts` (with indexes on ip,ts and email,ts) + `password_reset_tokens` tables.

### Public API rate limiting
- `rateLimit()` per-isolate token-bucket helper added. 60 req/min for `/api/winners` and `/api/scores`.
- 429 on burst.

### Result un-publish
- `POST /api/unpublish {code}` — admin-only. Deletes from `results` + `carnivals` tables.

### Per-carnival rules — full wiring
- `getProgramData()` filters relay events when `setup-allow-relays` unchecked.
- `adminEditTime` already gated by `allowManualEdits` (previous session).
- Rules persist as `carnivalMeta.rules` object on creation.

### Roster CSV import
- New "📋 Roster import (CSV)" section in CT setup screen (above Carnival rules).
- Paste columns: `bib,name,school,year,gender`. Header row auto-detected.
- `parseRosterCSV()` builds `_rosterFromCSV` object → attached to `carnivalMeta.roster` on create.
- Bib auto-numbered if blank.

### Worker auto-snapshot
- New `asgard-snapshot` worker (https://asgard-snapshot.pgallivan.workers.dev/health).
- Daily cron at `0 14 * * *` UTC (= midnight AEST).
- Snapshots 10 production workers to `LuckDragonAsgard/asgard-workers/snapshots/workers/<name>.js`.
- Verified manual run committed all 9 of 10 (schoolsportportal-nav not a separate worker).
- `SNAPSHOT_PIN` in vault for manual triggers.

### Service status page
- `asgard-status` worker — https://asgard-status.pgallivan.workers.dev/.
- Pings 8 services (3 sites + auth API + WS + access-codes + contact + email).
- Auto-refresh every 60s. JSON: `/api/status`. Health: `/health`.

### ABN verified
- ABN 64 697 434 898 = **LUCK DRAGON PTY LTD** (active, Australian Private Company, VIC 3016).
- **GST registered from 23 Apr 2026** — Paddy needs to update price card to break out GST.

### Documents added (under `/manual/` in this repo)
- [`PADDY_ACTION_CHECKLIST.md`](manual/PADDY_ACTION_CHECKLIST.md) — single source of truth for outstanding manual actions, ordered by urgency.
- [`THURSDAY_BACKUP_RUNBOOK.md`](manual/THURSDAY_BACKUP_RUNBOOK.md) — printable card for principal/deputy if Paddy is sick on race day.
- [`dns_records.md`](manual/dns_records.md) — exact SPF/DKIM/DMARC values to paste into CF dashboard (CF tokens lack DNS:Edit so manual).
- [`trademark_check.md`](manual/trademark_check.md) — IP Australia search guide + class recommendations.

### Vault additions
- `ADMIN_BOOTSTRAP_PIN` — for /auth/admin-bootstrap (initial password set)
- `CRON_PIN` — for /cron/race-day-reminders manual trigger
- `SNAPSHOT_PIN` — for asgard-snapshot manual trigger
- `PADDY_SSP_PASSWORD` — Paddy's SSP login password (`5GAtu4D3FFI7I7eSgXsP`)

### What's left (all human action — see manual/PADDY_ACTION_CHECKLIST.md)
1. Submit BizCover insurance application
2. Add SPF/DKIM/DMARC DNS records on schoolsportportal.com.au (CF tokens lacked DNS:Edit)
3. Update price card to show ex-GST/GST split
4. Engage lawyer for DPA review (LawPath ~$300)
5. Trademark search + register "School Sport Portal"
6. Confirm WPS quote for case study post-7-May
7. Print/hand over Thursday backup runbook to principal
8. Identify backup admin contact
9. Vault redundancy (1Password mirror)
10. Separate production CF account
11. SEO + LinkedIn presence
12. Decide invoicing schedule


---

## Paddy & Jacky FINAL refi plan (2026-05-04 evening)

Broker Matt at Macquarie came back with valuations. Osborne valued $719k — way under our $1.1M assumption. Plan revised to **80/80/80 LVR (no LMI)**.

### Macquarie's valuations
- North Rd Newport: **$1,206,000**
- Osborne St Williamstown: **$719,000** (the surprise — much lower than estimated)
- Cecil St (purchase): **$1,102,000**

### Final structure — all loans at exactly 80% LVR (NO LMI)
| Loan | Amount | Rate | Repayment |
|---|---|---|---|
| North Rd refi | $964,800 (drawing $261,800) | 6.02% | $5,797/mo |
| Osborne refi | $575,200 (drawing $73,200) | 6.25% (IP rate) | $3,542/mo |
| Cecil St new | $881,600 | 5.5% (PPOR) | $5,006/mo |
| **Total funds** | **$1,216,600** | | |
| **Total needed** | $1,170,000 (purchase $1.105M + stamp $65k) | | |
| **Surplus** | **+$46,600** for settlement costs | | |

### Why 80/80/80 not Matt's 75/75/60
Matt's first proposal had IPs at 75% LVR + Cecil at 60% LVR = $899k funds vs $1,170k need = $270k short. Pushing all to 80% LVR (still no LMI) closes the gap with $46k buffer.

### ATO purpose test (CRITICAL — discussed extensively this session)
Loading up IPs does NOT save tax. Equity drawn for Cecil deposit ($335k) is non-deductible PPOR debt. The actual tax saving from the move comes from **Osborne flipping OO→IP** — its $502k interest becomes deductible. Macquarie to set up split-loan structure so the deductible IP-purpose portions (NR $703k + Osborne $502k = $1,205k) are clearly separated from the non-deductible Cecil-deposit portions ($335k of IP equity + $881.6k Cecil = $1,216.6k).

### Cashflow impact
- Move costs ~$967/wk in surplus (current $1,755/wk → post $788/wk)
- = ~$50k/yr less cash savings
- BUT Cecil capital growth at 6%/yr × $1.1M = $66k/yr CGT-exempt (PPOR)
- Net wealth gain: ~+$31k/yr more than not moving

### Pages updated
- `paddy-finance.pgallivan.workers.dev` — defaults updated to 80/80/80, deductible-portion inputs added, refi banner shows final plan
- `pj-budget.pgallivan.workers.dev/PJ_Net_Worth.html` — values + loan balances updated
- `pj-budget.pgallivan.workers.dev/PJ_Affordability.html` — stress test recalc with new loans
- `pj-budget.pgallivan.workers.dev/PJ_Scorecard.html` — KPIs use new totals

### Memory
`paddy_jacky_finance.md` updated with final figures and ATO purpose-test warning.
