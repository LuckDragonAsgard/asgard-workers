# Firebase → Cloudflare Migration

**Status as of 2026-05-04:** Phase 1 (read paths + safe write mirror) DONE. Phase 2 (live coordinator login dashboard) DEFERRED to post-Thursday for safety.

---

## What's done

### 1. sportcarnival.com.au reads → D1 (DONE)
- `sportcarnival-hub` v3.2.0 reads from `carnival-results` D1 worker
- `/api/results?carnival=CODE`, `/api/list`, `/api/draw` all D1-backed
- `/api/sheet` returns 410 Gone

### 2. Firebase /fl/ data → D1 (DONE)
- All 12 real carnivals migrated (210 LOAD-* test entries skipped)
- WPSAT (3 races) and QBQF (1 race) results imported
- Empty shells migrated as records (ZNLN, EBKH, RWMK, EJYA, DVSL, etc.)

### 3. carnival-timing-ws → double-write D1 (DONE)
- `pushToD1()` method added alongside `pushToFirebase()`
- WD26 results from Thursday's race will now permanently land in D1
- Firebase mirror kept active as failsafe; remove next week

### 4. Hobsons division "live winners board" → D1 (DONE)
- `ssp-portal` HOBSONS_HTML rewritten — Firebase SDK removed (~150KB shed)
- New `division_winners` D1 table + `/api/winners` GET+POST endpoints on `carnival-results`
- Page polls every 30s (no real-time WS — fine because the data updates rarely)

### 5. carnival-results worker upgrade (DONE)
- New `/api/winners` GET + POST endpoints
- New `/health` endpoint
- Bumped to v1.1.0

---

## What's NOT done — and why

### `/williamstowndistrict` coordinator dashboard (schoolsportportal worker)

This is the only remaining significant Firebase consumer. It's a 140KB single-page app with:
- **Firebase Auth (email/password)** — coordinator login
- **/users/{uid}** in RTDB — user roles ('admin' / 'coach')
- **/scores** in RTDB — real-time score writes
- **firebase.app('secondary').auth().createUserWithEmailAndPassword()** — admins provision new coaches

**Why deferred:** This is a live login surface used by district coordinators. Rewriting auth + score persistence + admin UI 3 days before the district XC race carries real risk of locking coordinators out or losing scores.

**Migration plan (post-Thursday):**
1. Add `users` and `scores` tables to D1
2. Stand up Cloudflare Access for login
3. Mint a JWT-or-session-cookie path so the existing JS can call D1 endpoints with auth
4. Rewrite the dashboard JS — replace `firebase.auth()` with CF Access user info, replace `db.ref('scores').on('value', ...)` with `fetch('/api/scores').then(...)` + 30s poll
5. One-time export: Firebase /users/* and /scores/* → D1
6. Coordinate cutover with active coordinators (probably a Sunday)

Estimated effort: 1–2 days.

---

## Cloudflare Access setup (when ready)

### Application config
- **Type:** Self-hosted
- **Application domain:** `schoolsportportal.com.au`
- **Path patterns to gate:** `/williamstowndistrict/*`, future `/admin/*`, `/coach/*`
- **Public paths (no Access):** `/`, `/help`, `/sitemap.xml`, `/williamstownprimary`, `/williamstownps`, `/hobsonsbay`, `/hobsonsbaydivision`, `/wmr`, `/demo-*`, `/privacy`, `/terms`

### Identity provider
- **One-time PIN (email)** — recommended for ~50 coordinators. No Google account needed; works with any school email.
- Future: layer Google Workspace IdP if VIC Department of Education provides OAuth.

### Policy
- **Allow rule:** emails matching the coordinator allowlist + email domain `*.vic.edu.au`
- **Block rule:** all other emails
- **Session length:** 24h

### Coordinator allowlist (placeholder — get from Paddy)
```
paddy@luckdragon.io
pgallivan@outlook.com
pat_gallivan@hotmail.com
# add other district / division / region coordinators here
```

### Steps for Paddy to action
1. Cloudflare dashboard → Zero Trust → Access → Applications → Add an application
2. Self-hosted → name: "School Sport Portal — Coordinator Dashboard"
3. Domain: `schoolsportportal.com.au` Path: `/williamstowndistrict*` (and future admin paths)
4. Identity provider: One-time PIN
5. Policy → Allow → Emails: paste the allowlist
6. Test login with own email
7. Once verified, add other coordinators

---

## GCP / Firebase cleanup (Paddy action required)

### 3 legacy GCP service-account keys (security debt — flagged in Asgard handover)
1. **Console:** https://console.cloud.google.com/iam-admin/serviceaccounts?project=willy-district-sport
2. Click each service account → **Keys** tab
3. Find any keys NOT actively used (typically older than 6 months)
4. Click **DELETE** on each → confirm
5. Verify nothing breaks for ~1 week
6. If something breaks, the API key in `FIREBASE_CONFIG` will likely throw — re-mint as needed

### Firebase Authentication users export (one-time)
- **Console:** https://console.firebase.google.com/project/willy-district-sport/authentication/users
- **Action:** Export users to CSV (for D1 import) before deleting Firebase project
- Each user has: `uid`, `email`, `displayName`, `created`, plus the role we stored under `/users/{uid}` in RTDB

### Firebase Realtime Database export (one-time)
- **Console:** https://console.firebase.google.com/project/willy-district-sport/database/data
- **Action:** Click ⋮ → Export JSON → save as backup before deletion
- Already migrated: `/fl/` (12 carnivals → D1)
- Still in Firebase: `/users/*` and `/scores/*` (need migration before delete)

### Final Firebase project deletion (after auth migration)
1. **Console:** https://console.firebase.google.com/project/willy-district-sport/settings/general
2. Scroll to bottom → **Delete project**
3. Type `willy-district-sport` to confirm
4. Project gone in 30 days (CAN be undone within that window)

---

## Rollback plan (if anything breaks)

- **D1 read-side broken:** The `sportcarnival-hub` worker can be reverted to v3.0.0 (Sheets-error mode) via `git revert 5dffd7f5`. WD26 page is static — would still display.
- **carnival-timing-ws D1 write fails:** Firebase mirror still runs in parallel. Race day data still goes to Firebase. Worst case — D1 archive blank, fix post-race.
- **Hobsons winners board broken:** revert `ssp-portal` to commit before `149a1e10`. Page goes back to Firebase RTDB connection (which was empty anyway, so identical UX).
- **Coordinator dashboard untouched** so no rollback path needed there.

---

## What "fully off Firebase" actually requires

The remaining Firebase touchpoints (post-Phase 1):
1. ✅ All sportcarnival.com.au reads — DONE (D1)
2. ⚠️ carnival-timing-ws still writes to Firebase as failsafe — REMOVE next week after WD26 verified in D1
3. ⚠️ schoolsportportal /williamstowndistrict — still uses Firebase Auth + RTDB — needs Phase 2 migration (1-2 days post-Thursday)
4. ⚠️ 3 GCP service-account keys — Paddy revokes in console
5. ⚠️ Firebase project deletion — Paddy actions after verification

Once 2-5 are done, Firebase is fully decommissioned and the project can be deleted from GCP.

---

## Commits today (2026-05-04 e2e Firebase migration session)

| Repo | Commit | What |
|---|---|---|
| `sportcarnival-hub` | `5dffd7f5` | v3.2.0 — D1 reads (was Sheets) |
| `sportcarnival-hub` | `6618be5e` | v3.1.1 — WPS subroutes |
| `asgard-workers` | `ee232de8` | ct-access DELETE endpoint |
| `asgard-workers` | `38f2b62c` | carnival-timing-ws D1 mirror v1 |
| `asgard-workers` | `2cb2140d` | carnival-timing-ws +UA header |
| `asgard-workers` | `7d52d7ae` | carnival-results v1.1.0 (winners API) |
| `asgard-workers` | `149a1e10` | ssp-portal Hobsons → D1 |

