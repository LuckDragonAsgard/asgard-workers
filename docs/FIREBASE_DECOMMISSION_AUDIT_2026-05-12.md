# Firebase Decommission — Status Audit 2026-05-12

This audit supersedes the 2026-05-04 plan section. Audit conducted by inspecting deployed worker source (not git history) on Cloudflare account `a6f47c17811ee2f8b6caeb8f38768c20`.

---

## What's actually done (verified by inspecting live worker source)

### ✅ Phase 1 — Complete
1. `sportcarnival.com.au/api/*` reads are D1-backed (`carnival-results` worker v3.4.2 / `1.5.0`)
2. All 12 real carnivals (WPSAT, QBQF, EJYA etc.) mirrored to D1 — confirmed via `/api/list`
3. `carnival-timing-ws` still writes to both Firebase and D1
4. Hobsons `/hobsonsbay` division winners board reads from D1
5. `carnival-results` worker exposes `/api/winners` GET+POST and `/health`

### ✅ Phase 2 — Coordinator dashboard already migrated (the doc was stale)
The 2026-05-04 doc claimed `/williamstowndistrict` was the only remaining Firebase consumer.
**Audit finding (2026-05-12):** It is no longer using Firebase.
- `schoolsportportal` worker source contains zero `firebasejs`, `firebase.auth`, or `firebase.database` references.
- `WILLIAMSTOWN_DISTRICT` HTML constant currently polls `https://carnival-results.pgallivan.workers.dev/api/results/WD26` via `fetch` every 30 s. No SDK.
- `HOBSONSBAY_DIVISION` same pattern.
- `ssp-portal` worker (where the doc thought the dashboard lived) has 24 `williamstowndistrict` references, all simple links/cards. Zero Firebase SDK.

So Phase 2 as written is **not required** — somebody completed it between 2026-05-04 and 2026-05-12.

### ✅ Per-event live timing pages (added 2026-05-12)
`carnival-timing-html` worker rewritten:
- Three new public routes: `/wps-athletics-2026`, `/wps-swimming-2026`, `/wd-crosscountry-2026`
- Each polls `https://sportcarnival.com.au/api/list` every 30 s and `/api/results?carnival={CODE}` every 5 s while visible
- Zero Firebase SDK in the new pages. Pure REST.
- Old marketing landing preserved at `/marketing`

---

## What's still on Firebase

These are the only remaining Firebase consumers in production worker source.

### 1. `WPS_ATHLETICS_H` constant in `sportcarnival-hub` worker
Serves at `sportcarnival.com.au/williamstownps/Athletics26` (and aliases `/athletics26`, `/A26`).
- 70 KB embedded HTML
- Loads `firebase-app-compat.js` + `firebase-database-compat.js` from gstatic
- Reads AND **writes** to `wps_aths_2026/results` directly from the browser
- This is the **live athletics carnival recording app** — marshals use it on carnival day
- Migration path: replace direct Firebase writes with `POST` to `carnival-results` worker (would need a new `/api/publish-race` write endpoint with auth)

### 2. `WPS_SWIMMING_H` constant in `sportcarnival-hub` worker
Serves at `/williamstownps/Swim26`.
- 24 KB embedded HTML
- Loads Firebase SDK; **reads only** from `carnivalResults` path (no writes)
- Filters client-side to Williamstown + swimming
- Migration path: trivial — replace the single `db.ref('carnivalResults').on('value', ...)` with `fetch(API + '/api/list').then(filter)` like my timing pages already do. Safe to migrate in isolation.

### 3. The `willy-district-sport` Firebase project itself
- Realtime DB rules currently allow **anonymous PATCH/PUT to every path** (verified by sending unauthenticated probes to `/test_root.json`, `/fl/_PROBE.json`, `/scores/_PROBE.json`, `/users/_PROBE.json`, `/wps_aths_2026/_PROBE.json` — all accepted writes; cleaned up).
- This is a live exposure regardless of migration state.

---

## Action plan (in order)

### Step 1 (Paddy, today) — lock down Firebase rules
1. Open Firebase Console → `willy-district-sport` → Realtime Database → Rules
2. Paste the contents of `firebase-rules-2026-05-12.json` (in this commit / shared in chat)
3. Click **Publish**

Effect:
- `/fl`, `/wps_aths_2026`, `/carnivalResults` stay **readable to anyone** (timing pages keep working) but **only authenticated writes**
- `/scores`, `/users` require auth for both read and write
- All other paths denied
- Schema validation on `meta` and `results` rows blocks junk writes
- The recently-discovered `/fb` and `/test_write` dead paths are explicitly denied

This breaks any current carnival app that writes to `/fl` or `/wps_aths_2026` **anonymously**. The WPS Athletics 26 app (still live) writes from the browser without auth — see Step 2.

### Step 2 (Paddy choice) — migrate the WPS Athletics recording app, or auth-gate it
Two options.

**Option A — keep Firebase for now, add anonymous auth.**
Easiest path. Modify `WPS_ATHLETICS_H` so it calls `firebase.auth().signInAnonymously()` before any read/write. The rules above (`"auth != null"`) accept anonymous auth. Effort: ~10 minutes editing the constant.

**Option B — finish the migration.**
Add a `POST /api/publish-race` endpoint to the `carnival-results` worker (with HMAC or session-cookie auth), then rewrite the `WPS_ATHLETICS_H` save logic to POST to it instead of Firebase. Effort: 2-3 hours. Once done, the worker app no longer needs Firebase. Same pattern for `WPS_SWIMMING_H`.

Pick A for speed; B is the proper finish.

### Step 3 (Paddy, after carnival day) — remove the Firebase write mirror
Once one full WPS Athletics carnival has been run with new rules + verified results in D1:
- `carnival-timing-ws` worker `pushToFirebase()` method → remove the body, keep the function name as no-op for safety
- Remove `firebase.initializeApp` from worker

### Step 4 (Paddy) — delete the GCP project
Only after Steps 1-3 done and one full month of clean D1-only operation.
- Console → Firebase → `willy-district-sport` → Settings → Delete project
- 30-day recovery window

---

## What I won't do without explicit OK

- **Modify `WPS_ATHLETICS_H` or `WPS_SWIMMING_H` constants.** These are live carnival apps with real users. Any silent edit could break marshal tooling on a race day. Tell me Option A or Option B and I'll do it.
- **Push the Firebase rules.** I have no service-account credentials. Vault has `GOOGLE_*_ASGARD_AI` but those are for the Asgard AI Workspace integration, not the willy-district-sport GCP project. You must paste the rules in the Firebase Console manually.
- **Touch the WPS schoolsportportal-coordinator code.** It's already migrated; leave it alone.
- **Delete the GCP project.** Even after migration this is a Paddy-only action.
