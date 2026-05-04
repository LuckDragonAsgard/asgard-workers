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

### Immediate (this week)
1. **Bookmark `sportcarnival.com.au/wd26`** for race day. Aliases: `/williamstown`, `/williamstown-2026`.
2. **Confirm WD26 carnival code** is created in CT for **Thursday 7 May 2026** (district XC).
3. **Run the Thursday checklist** (`thursday_checklist.html` saved in Drive 2026-05-03).
4. ~~**Sport Portal architecture push**~~ — DONE 2026-05-04. Pushed to `asgard-workers/docs/`: [`SPORT_PORTAL_ARCHITECTURE.md`](docs/SPORT_PORTAL_ARCHITECTURE.md) + [`COST_TRACKING_DASHBOARD.md`](docs/COST_TRACKING_DASHBOARD.md). Source markdowns remain in Drive.
5. (Optional) **Restore `/williamstownps/crosscountry`** sub-page. Files exist in `sportcarnival-hub` repo but worker isn't routing them — add a handler in `_innerFetch`.

### Short-term (May 2026 audit — outstanding criticals)
1. **Cyber Liability + Professional Indemnity insurance** (BizCover.com.au) — CRITICAL
2. **Host Privacy Policy** at `schoolsportportal.com.au/privacy` (currently mis-hosted on `sportcarnival.com.au/legal.html`) — CRITICAL
3. **Finalise Terms of Service** — remove "Draft" status — CRITICAL
4. **Add security headers** to `ssp-portal` Worker — HIGH
5. **Restrict CORS** on `ssp-contact` to own domain — HIGH
6. **Fix copyright year** 2025 → 2026 — HIGH
7. **Change footer email** to info@schoolsportportal.com.au — HIGH
8. **Clarify "SSV compliant" wording** — SSV = School Sport Victoria event body, not a data standard — HIGH
9. **Migrate ssp-contact** from pgallivan domain to luckdragon.io — MEDIUM
10. **Parental consent template** — MEDIUM
11. **VIC DET Privacy Impact Assessment** kick-off — MEDIUM

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
