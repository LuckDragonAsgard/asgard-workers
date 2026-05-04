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

The "Sport Portal" ecosystem is **3 public products + 1 school-specific page + 1 district event** that all share a single roster / data source. The unifying pitch: **enter student data once, automate across all sports**. Below is everything live, everything pending, every URL.

### The three public products

| Product | URL | Status | Worker(s) | What it does |
|---|---|---|---|---|
| **School Sport Portal (SSP)** | https://schoolsportportal.com.au | ✅ 200 OK | `ssp-portal`, `ssp-contact`, `email-logger`, `inbox-api` | Commercial SaaS landing page. $1/student/year. Stripe live. Schools sign up here. |
| **Carnival Timing (CT)** | https://carnivaltiming.com | ✅ 200 OK | `carnival-timing-html` (HTML), `carnival-timing-ws` (WebSockets/DO), `ct-access` (paywall), `carnival-results` (D1) | Race-day timing app — Race Control / Starter / Lane Timer / Video Finish / Spectator. Paywall: $49 single, $149 annual, free for SSP schools. v8.5.2. |
| **SportCarnival** | https://sportcarnival.com.au | ✅ 200 OK | `sportcarnival-hub` | Public district draw + results page. Currently displays **Williamstown District Cross Country 2026** (page title confirms). |

### Auxiliary domains / sub-products

| URL | Purpose | Status |
|---|---|---|
| https://schoolsportportal.com.au/help | SSP getting-started page | ✅ 200 |
| https://schoolsportportal.com.au/sitemap.xml | SSP sitemap | ✅ 200 |
| https://carnivaltiming.com/help | CT getting-started page | ✅ 200 |
| https://carnivaltiming.com/sitemap.xml | CT sitemap | ✅ 200 |
| https://sportcarnival.com.au/sitemap.xml | SC sitemap | ✅ 200 (only `/` listed — see drift below) |
| https://falkor-ct-ai.luckdragon.io | CT AI backend (summarise / flag-times / suggest-heats / commentary) | ✅ v1.0.0 |
| https://ct-access.luckdragon.io | CT paywall worker (validate / create / stripe-webhook / admin/codes) | ✅ Live (PIN-gated) |
| https://carnival-results.pgallivan.workers.dev | D1 API for published results | ✅ Live (no /health route) |

### Per-school + district pages

| URL | What it should be | Current status |
|---|---|---|
| https://sportcarnival.com.au/williamstownps/crosscountry | WPS-only XC page (24 runners, Firebase results filtered, qualifiers tab) | ⚠️ **404** — was live per memory (2026-05-03), now gone. Investigate worker redeploy. |
| https://sportcarnival.com.au/ (root) | District draw — 192 runners, 6 races, ✓ Qual badges, 🎖️ Divisional Qualifiers section, team scores | ✅ Live (page title: "Williamstown District Cross Country 2026") |
| CT carnival code **WD26** | District XC live results — sportcarnival auto-connects | Code reserved — must match on race day |

### Stripe / payments
- **CT $49 single:** https://buy.stripe.com/8x26oGgux9IT3wQckm9IQ05 (ct_type=single)
- **CT $149 annual:** https://buy.stripe.com/7sY3cu3HL8EP4AUesu9IQ06 (ct_type=annual)
- **SSP $1/student/yr:** Stripe link live on schoolsportportal.com.au
- **SSP subscribers** get a school-specific CT code (type=ssp, never expires). Test code: `WPS-2026`.
- Webhook: `we_1TS4y0Am8bVflPN0qCkWbAkO`
- Test code (annual): `TEST-1234`

### GitHub repos (all under LuckDragonAsgard)

| Repo | Product |
|---|---|
| `sportportal` | SSP landing page (schoolsportportal.com.au) |
| `schoolsportportal` | directory site (sister) |
| `sportcarnival-hub` | sportcarnival.com.au district + school pages |
| `district-sport` | carnivaltiming.com source |
| `sport-carnival` | CT main repo (single index.html in main branch) |
| `wps-athletics-2026` | WPS data model (ROSTER, HOUSES, PTS, Firebase at `wps_aths_2026/results`) |

### Account / hosting
- Cloudflare account: **Luck Dragon Main** `a6f47c17811ee2f8b6caeb8f38768c20`
- All four domains hosted as Cloudflare Workers (NOT Pages)
- Firebase Realtime Database for real-time race sync
- Data stored in Australia (Google Cloud Sydney + CF)
- D1 database for published results: `carnival-results-db` UUID `4c39e40c-b6ca-40db-83bb-e8c69bad6537`
- KV: `CT_ACCESS_CODES` ID `ac2ea4434e72490ea76ddb3ab6bca312`

---

## ⏳ Sport Portal — what's NEXT

### Immediate (this week)
1. **Fix WPS XC sub-page 404** — `sportcarnival.com.au/williamstownps/crosscountry` is currently returning 404. Memory says it was live on 2026-05-03 with all 24 WPS runners + qualifiers tab. Check `sportcarnival-hub` worker source on GitHub vs deployed.
2. **Confirm WD26 carnival code** is created in CT for Thursday's race (district XC carnival is **Thursday 7 May 2026**).
3. **Run the Thursday checklist** (`thursday_checklist.html` saved in Drive 2026-05-03).
4. **Sport Portal architecture push** — prior chat (earlier today) created an architecture doc + cost-tracking dashboard locally. **GitHub push is still pending** — was waiting on a 6-digit verification code from email when chat ended. If continuing: get the code from his email, confirm target repo (likely `sportportal` or `schoolsportportal`, NOT asgard-workers), complete push.

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
10. **Parental consent template** for schools to use — MEDIUM
11. **VIC DET Privacy Impact Assessment** kick-off — MEDIUM

### Medium-term (post-XC carnival)
- **Wire CT XC bib lookup to Google Sheet** (district draw) — currently uses Firebase. Paddy has a master Google Sheet with all schools / runners / bibs that we have NOT seen the contents of. Do NOT use Firebase for district data going forward.
- **Build sportcarnival.com.au as a generic district draw/results template** — currently hard-coded to Williamstown XC 2026. Should accept `?district=...&event=...` and pull from the relevant sheet.
- **CT Phase 1 roadmap items:**
  - Event program builder (pre-load schedule, "Next Event" button)
  - House points tally (HOUSES array, PTS = [8,6,5,4,3,2,1])
  - DNS / DNF options
  - False-start RECALL clears all splits (with confirmation)
  - PWA / installable app (manifest + service worker)
  - Photo finish zoom (tap thumbnail for full-size)
  - Full-day export (all results one CSV/PDF)
  - Qualifier board (across heats toward finals)

### Vision (the actual product)
"**Enter student data once, automate across all sports**" — SSP becomes the source-of-truth roster that feeds CT, SportCarnival, district draws, swimming, athletics. No re-keying, no wrong age groups, no double-handling. This is Paddy's commercial pitch. When working on any sport tool, frame it through this lens.

---

## 🏃 WPS / District context (for reference)

**District:** Williamstown District / Hobsons Bay Division. **District XC carnival: Thursday 7 May 2026.**

### WPS qualifiers (top 4 from school finals → district)
| Age/Gender | 1st | 2nd | 3rd | 4th |
|---|---|---|---|---|
| 10 Boys | Elias D'Souza (#61, 8:06) | Thomas Reid (#62, 8:15) | Luca Galle (#63, 8:22) | William Galle (#64