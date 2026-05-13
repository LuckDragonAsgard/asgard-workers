# Firebase Decommission — Status Audit 2026-05-12 (UPDATED)

This audit supersedes the 2026-05-04 plan section.

---

## STATUS (post-Option-B migration, 2026-05-12 evening)

**Production sport sites no longer execute any Firebase code.** Verified by stripping all HTML+JS comments and counting `firebase.*` references in executable script bodies: **0** on both Athletics and Swim pages.

Stack now:
- All reads: `carnival-results` worker D1 API (`/api/list`, `/api/results/{code}`, `/api/results?carnival=`)
- All writes: `POST /api/results/{code}` with `X-Publish-Pin` header
- Firebase database: legacy, no live writers, no live readers

---

## What changed today (Option B execution)

### 1. `carnival-results` worker — write endpoint hardened
`POST /api/results/{code}` now requires one of:
- `X-Publish-Pin` header matching env `CARNIVAL_PUBLISH_PIN` (for marshal apps on shared devices), OR
- A valid session cookie for a user with role `admin`, `committee`, or `coach`

Without auth: 403 Forbidden. CORS `Access-Control-Allow-Headers` extended to include `X-Publish-Pin`. Code is validated against `/^[A-Z0-9]{3,16}$/` to prevent path-spoofing.

Secret generated, stored in Vault as `CARNIVAL_PUBLISH_PIN`, bound to the worker. 20 characters, alphanumeric, ambiguous chars (I O 0 1) excluded for marshal readability.

### 2. `sportcarnival-hub` worker — `WPS_ATHLETICS_H` constant rewritten
- Removed `<script src="https://www.gstatic.com/firebasejs/...">` tags
- Replaced `firebase.initializeApp(...)` with a thin D1 API shim
- Shim preserves the exact Firebase JS API used by the rest of the file (`fbDb.ref(path).on/.off/.child/.set/.remove`, `.info/connected` listener) so every other call site in the 70 KB app is untouched
- Reads: poll `/api/results/WPSAT` every 5 s, fire listeners with same `snap.val()` interface
- Writes: optimistic local update + `POST /api/results/WPSAT` with full state
- PIN prompted once per session via `prompt()`, stored in `sessionStorage` (not `localStorage`) — cleared on tab close, and cleared automatically on 403 response

### 3. `sportcarnival-hub` worker — `WPS_SWIMMING_H` constant rewritten
- Same SDK removal
- Read-only mode (no write logic existed in this app)
- Shim emulates `db.ref('carnivalResults').on('value', cb)` by polling `/api/list` + hydrating matched carnivals via `/api/results/{code}`

### 4. Other workers — unchanged
`carnival-timing-html` was already Firebase-free as of yesterday. `ssp-portal` and `schoolsportportal` were already Firebase-free. No edits needed.

---

## What still requires Paddy direct action

### URGENT — Lock Firebase rules
The realtime DB at `willy-district-sport-default-rtdb` still accepts anonymous PATCH/PUT to every path. Paste the contents of `firebase-rules-2026-05-12.json` into Firebase Console → Realtime Database → Rules → Publish.

Now that no production code writes to Firebase, applying these rules has **zero functional impact** on live carnivals. Worst case: random internet writes get rejected, which is the goal.

### Next carnival day (whatever event runs first)
First marshal opens `sportcarnival.com.au/williamstownps/Athletics26` (or `/Swim26`), the prompt asks for the publish PIN. Paddy gives them the PIN from `Vault: CARNIVAL_PUBLISH_PIN`. Marshals on the same shared device for the rest of the day are not re-prompted (sessionStorage).

If a marshal closes and reopens the tab they'll be re-prompted. Acceptable for a one-day carnival; if it becomes painful, swap `sessionStorage` for `localStorage` in the shim (one-line change).

### After first successful carnival
1. Tail `carnival-results` worker logs for any 403s on `/api/results/*` (would indicate stale Firebase-targeted code elsewhere)
2. Verify D1 has the day's results via `https://sportcarnival.com.au/api/results?carnival=WPSAT`
3. Run a backup export of `/fl/WPSAT` from Firebase Realtime DB (precautionary)
4. Delete the Firebase project after a clean month (Console → Settings → Delete project)

---

## Verified on production (2026-05-12 ~23:30 UTC)
- POST `/api/results/TESTAUTH` without PIN → **403** ✓
- POST `/api/results/TESTAUTH` with wrong PIN → **403** ✓
- POST `/api/results/TESTAUTH` with correct PIN → **200 + record landed in D1 + cleaned up** ✓
- `sportcarnival.com.au/williamstownps/Athletics26` page → **0 live `firebase.*` references** ✓
- `sportcarnival.com.au/williamstownps/Swim26` page → **0 live `firebase.*` references** ✓
- All other sport URLs (24 checked) → **HTTP 200** ✓
- `carnival-timing-html` event pages already on D1 from previous turn → still working ✓

---

## Rollback (if needed)
- Revert `sportcarnival-hub` worker: previous version backed up at `/home/claude/asgard-backup/sportcarnival-hub__sportcarnival-hub.js`
- Revert `carnival-results` worker: revert just the str_replace at lines 78-96 (PIN check) — endpoint becomes open again

Both reverts are safe (the D1 schema is unchanged; only handler logic moved).
