---
name: Sport Portal Architecture
description: Complete Sport Portal ecosystem map - URLs, auth, data flow, Williamstown setup
type: project
last_updated: 2026-05-04
owner: Paddy (Luck Dragon Pty Ltd)
---

# Sport Portal Architecture

**Last updated:** 2026-05-04
**Owner:** Paddy (Luck Dragon Pty Ltd)
**Scope:** All school/district/division/region sites + Carnival Timing integration

## Public Sites (Indexable)

| Site | URL | Purpose | Status |
|------|-----|---------|--------|
| School Sport Portal | https://schoolsportportal.com.au | Marketing + login gateway | OK |
| Carnival Timing | https://carnivaltiming.com | Free timing tool (standalone) | OK |
| Sport Carnival | https://sportcarnival.com.au | Carnival planner + results | OK |
| Sport Portal | https://sportportal.com.au | Product home + onboarding | OK |
| Luck Dragon | https://luckdragon.io | Product directory | OK |

## Private Sites (Staff-Only, Unlisted)

**Access:** Firebase Authentication (identitytoolkit.googleapis.com), visible only to signed-in users.
**Base domain:** `schoolsportportal.com.au`

### Williamstown Primary School
- **URL:** https://schoolsportportal.com.au/williamstownps
- **Status:** Live (13.6 KB)
- **Access:** Firebase-authenticated staff/coordinators
- **Child links:** Sport Carnival pages at `sportcarnival.com.au/williamstownps/{athletics|swimming|crosscountry}`
- **Parent:** Williamstown District
- **Division:** Hobsons Bay Division
- **Region:** Western Metro Region

### Williamstown District
- **URL:** https://schoolsportportal.com.au/williamstowndistrict
- **Status:** Live (140 KB)
- **Access:** Firebase-authenticated district coordinators
- **Member schools:** Williamstown PS + others in Williamstown District
- **Data feed:** Aggregates results from member schools' carnivals (via Firebase Realtime DB)

### Hobsons Bay Division
- **URL:** https://schoolsportportal.com.au/hobsonsbaydivision
- **Status:** Live (via schoolsportportal repo)
- **Access:** Firebase-authenticated division coordinators
- **Member districts:** Williamstown District + others in Hobsons Bay Division
- **Data feed:** Aggregates results from member districts

### Western Metro Region (wmr)
- **URL:** https://schoolsportportal.com.au/wmr
- **Status:** Live (placeholder file)
- **Access:** Firebase-authenticated regional coordinators
- **Member divisions:** Hobsons Bay Division + others in WMR

## Authentication Model

- **Auth provider:** Firebase Authentication (Google Cloud)
- **Auth domain:** `willy-district-sport.firebaseapp.com`
- **Auth method:** Firebase SDK v9.23.0 compat layer (identitytoolkit.googleapis.com endpoint)
- **Access control:** Firebase Realtime Database rules `.read: true, .write: "auth != null"` (public read, authenticated write)

**Who has access:**
- Williamstown Primary staff (PE teacher + designated staff via Firebase user management)
- District coordinators (Williamstown District)
- Division coordinators (Hobsons Bay Division)
- Regional coordinators (Western Metro Region)

## Data Flow

**Carnival Timing -> School Page (sportcarnival.com.au):**
1. Event timing recorded in Carnival Timing app
2. Results published in Carnival Timing admin (carnivaltiming.com)
3. Flow to school page: WebSocket via `carnival-timing-ws.pgallivan.workers.dev`
4. Backend: Cloudflare Worker (WebSocket handler) bridges Carnival Timing -> Firebase Realtime DB
5. Frontend: sportcarnival.com.au pages subscribe to Firebase DB changes in real-time
6. Latency: Real-time (instant via WebSocket)

**School -> District -> Division -> Region (schoolsportportal.com.au):**
- **Data aggregation:** Automatic via Firebase Realtime DB queries on page load
- **Query structure:** Each tier queries child results from Firebase `fl/` (fixtures) path
  - School queries: results for own school code (e.g., DVSL)
  - District queries: results for all school codes in district
  - Division queries: results for all districts in division
  - Region queries: results for all divisions in region
- **Timing:** Real-time on page load; Firebase listeners trigger updates as results arrive

## Integrations

| System | Connected | Flow | Notes |
|--------|-----------|------|-------|
| Carnival Timing | Yes | Results -> SportCarnival pages | WebSocket to `carnival-timing-ws.pgallivan.workers.dev` |
| Firebase Realtime DB | Yes | All data storage + sync | `willy-district-sport`, asia-southeast1 |
| Firebase Auth | Yes | User authentication | `willy-district-sport.firebaseapp.com`, IdentityToolkit API |
| Stripe | Yes (SSP only) | $1/student/year billing | paddy@luckdragon.io |
| Cloudflare Workers | Yes | Hosting for all 4 domains | sportportal, schoolsportportal, sportcarnival, carnivaltiming |

## Outstanding Questions

- [x] Actual school/district/division URLs - RESOLVED
- [x] Login/auth method - RESOLVED (Firebase Auth)
- [x] Who has access to what - RESOLVED (Firebase user management)
- [x] How data flows from CT to each tier - RESOLVED (WebSocket -> Firebase RTDB)
- [x] Is this all in Falkor codebase? - PARTIALLY (frontends in repos; backend workers in asgard fleet)
- [ ] How are user roles/custom claims assigned in Firebase? (admin dashboard for PA)
- [ ] Admin dashboard URL for updating staff/coordinator access?
- [ ] Webhook URLs from Carnival Timing to WebSocket handler?
- [ ] Any API endpoints for programmatic access to results?
- [ ] GCP service-account key status (3 legacy keys need revocation per Asgard handover)

## Repository Locations

**Frontend:**
- `LuckDragonAsgard/sportcarnival-hub` - SportCarnival pages (Williamstown carnival pages for athletics/swimming/cross-country)
- `LuckDragonAsgard/schoolsportportal` - School Portal pages (WPS / District / Division / Region hierarchy + demo pages)

**Backend (Cloudflare Workers / Asgard):**
- `LuckDragonAsgard/asgard-workers` - Falkor fleet + handover (THIS REPO)
- Firebase project: `willy-district-sport` (owned by paddy@luckdragon.io)

---

**Source of truth:** This file. Originally drafted 2026-05-03; pushed to GitHub 2026-05-04.
