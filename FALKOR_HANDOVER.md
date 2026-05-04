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

## 🏁 SPORT PORTAL — FULL HANDOVER (2026-05-04)

The Sport Portal ecosystem = **3 public products** + **Paddy's own school/district/division portals** + **race-day district pages** that all share a single roster / data source. Pitch: **enter student data once, automate across all sports**.

### The three public products

| Product | URL | Status | Worker(s) | What it does |
|---|---|---|---|---|
| **School Sport Portal (SSP)** | https://schoolsportportal.com.au | ✅ 200 OK | `ssp-portal`, `ssp-contact`, `email-logger`, `inbox-api` | Commercial SaaS landing page. $1/student/year. Stripe live. |
| **Carnival Timing (CT)** | https://carnivaltiming.com | ✅ 200 OK | `carnival-timing-html`, `carnival-timing-ws`, `ct-access`, `carnival-results` | Race-day timing app. Race Control / Starter / Lane Timer / Video Finish / Spectator. Paywall: $49 single, $149 annual, free for SSP schools. v8.5.2. |
| **SportCarnival** | https://sportcarnival.com.au | ✅ 200 OK | `sportcarnival-hub` v3.0.0 | Public commercial demo — fictional "Demo Valley District XC 2026". Real WPS/Williamstown district data moved to `/wd26` (noindex). |

### Auxiliary domains / sub-products

| URL | Purpose | Status |
|---|---|---|
| https://schoolsportportal.com.au/help | SSP getting-started page | ✅ 200 |
| https://schoolsportportal.com.au/sitemap.xml | SSP sitemap | ✅ 200 |
| https://carnivaltiming.com/help | CT getting-started page | ✅ 200 |
| https://carnivaltiming.com/sitemap.xml | CT sitemap | ✅ 200 |
| https://sportcarnival.com.au/sitemap.xml | SC sitemap — lists `/`, `/privacy`, `/terms` (`/wd26` deliberately excluded) | ✅ 200 |
| https://falkor-ct-ai.luckdragon.io | CT AI backend (summarise / flag-times / suggest-heats / commentary) | ✅ v1.0.0 |
| https://ct-access.luckdragon.io | CT paywall worker (validate / create / stripe-webhook / admin/codes) | ✅ Live (PIN-gated) |
| https://carnival-results.pgallivan.workers.dev | D1 API for published results | ✅ Live |

### Paddy's own school / district / division portals (on SSP)

Live at the `ssp-portal` worker — these are the real WPS / Williamstown / Hobsons Bay pages:

| Level | URL | Title |
|---|---|---|
| **School** | https://schoolsportportal.com.au/williamstownprimary | Williamstown Primary School — School Sport Portal |
|  | https://schoolsportportal.com.au/williamstownps (alias) | same as above |
| **District** | https://schoolsportportal.com.au/williamstowndistrict | Williamstown District Sport |
| **Division** | https://schoolsportportal.com.au/hobsonsbay | Hobsons Bay Division — School Sport Portal |
|  | https://schoolsportportal.com.au/hobsonsbaydivision (alias) | same as above |

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
| https://sportcarnival.com.au/ | Public commercial demo — Demo Valley District XC 2026, 8 fictional schools, simulated live results | ✅ Live (deployed 2026-05-04) |
| https://sportcarnival.com.au/wd26 | Real Williamstown District XC 2026 page — 192 runners, 8 schools, 6 races, WS auto-connects to WD26 | ✅ Live, `x-robots-tag: noindex` |
| https://sportcarnival.com.au/williamstown | Alias for /wd26 | ✅ Live |
| https://sportcarnival.com.au/williamstownps/crosscountry | WPS-only XC sub-page | ⚠️ Files exist on GitHub but worker doesn't route them — restore by adding handler if needed |
| CT carnival code **WD26** | District XC live results — `/wd26` page auto-connects | Code reserved for Thursday |

### Stripe / payments
- **CT $49 single:** https://buy.stripe.com/8x26oGgux9IT3wQckm9IQ05 (ct_type=single)
- **CT $149 annual:** https://buy.stripe.com/7sY3cu3HL8EP4AUesu9IQ06 (ct_type=annual)
- **SSP $1/student/yr:** Stripe link live on schoolsportportal.com.au
- SSP subscribers get a school-specific CT code (type=ssp). Test code: `WPS-2026`. Test annual: `TEST-1234`.
- Webhook: `we_1TS4y0Am8bVflPN0qCkWbAkO`

### GitHub repos (under LuckDragonAsgard)

| Repo | Product |
|---|---|
| `sportportal` | SSP landing page (schoolsportportal.com.au) |
| `schoolsportportal` | directory site (sister) |
| `sportcarnival-hub` | sportcarnival.com.au |
| `district-sport` | carnivaltiming.com source |
| `sport-carnival` | CT main repo (single index.html) |
| `wps-athletics-2026` | WPS data model (ROSTER, HOUSES, PTS, Firebase `wps_aths_2026/results`) |
| `asgard-workers` | Falkor fleet + this handover |

### Account / hosting
- Cloudflare account: **Luck Dragon Main** `a6f47c17811ee2f8b6caeb8f38768c20`
- All four domains hosted as Cloudflare Workers (NOT Pages)
- Firebase Realtime Database for real-time race sync (australia-southeast1)
- Data stored in Australia (Google Cloud Sydney + CF)
- D1 database for published results: `carnival-results-db` UUID `4c39e40c-b6ca-40db-83bb-e8c69bad6537`
- KV: `CT_ACCESS_CODES` ID `ac2ea4434e72490ea76ddb3ab6bca312`

---

## ⏳ Sport Portal — what's NEXT

### Immediate (this week)
1. **Bookmark `sportcarnival.com.au/wd26`** for race day — that's the real Williamstown district page now (root is the public commercial demo). Aliases: `/williamstown`, `/williamstown-2026`.
2. **Confirm WD26 carnival code** is created in CT for Thursday's race (district XC = **Thursday 7 May 2026**).
3. **Run the Thursday checklist** (`thursday_checklist.html` saved in Drive 2026-05-03).
4. **Sport Portal architecture push** — prior chat earlier today created an architecture doc + cost-tracking dashboard locally. **GitHub push pending** — was waiting on a 6-digit verification code from email. If continuing: get the code, confirm target repo (likely `sportportal` or `schoolsportportal`), complete push.
5. (Optional) **Restore `/williamstownps/crosscountry`** sub-page if wanted. Files exist in `sportcarnival-hub` repo but worker isn't routing them — add a handler in `_innerFetch`.

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
10. **Parental consent template** for schools — MEDIUM
11. **VIC DET Privacy Impact Assessment** kick-off — MEDIUM

### Medium-term (post-XC carnival)
- **Wire CT XC bib lookup to Google Sheet** (district draw) — currently uses Firebase. Worker already has `/api/draw`, `/api/results`, `/api/sheet` endpoints — just needs `GSHEET_ID` env var set.
- **Make `/wd26` data-driven** — currently hard-coded HTML. Refactor to pull from the same Google Sheet so other districts can be added as `/wd-<code>` paths.
- **Add a "Try it with your dis