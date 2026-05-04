# WD26 Tuesday Dry-Run Plan

**When:** Tue 5 May, ~10–15 min, somewhere with phone + laptop + internet.
**Goal:** Prove the full publish loop works before Thursday with zero risk to WD26.

## Why a separate code (not WD26)

Don't create WD26 in CT until Thursday morning — once a code is in CT it's live, and a stray test publish will appear on /wd26 to anyone watching. Use a throwaway code, e.g. `WD26TEST` or `DRY-XC`.

## Setup

1. **Phone:** open `carnivaltiming.com` → enter access code `WPS-2026` → tap "Create carnival" → set code to `WD26TEST` → event type **Cross Country (XC)**.
2. **Laptop / 2nd phone:** open `https://sportcarnival.com.au/wd26` → in the spectator page, change the carnival-code input from `WD26` to `WD26TEST` → tap **Connect**. Status pill should turn green.
   - (Or just hit `https://sportcarnival.com.au/wd26?code=WD26TEST` if a code-override query param exists — if not, just type in the input.)

## Test sequence (5 mins)

1. In CT, set age=10, gender=girls. Open Marshal mode.
2. Type 5 bib numbers from the WPS 9/10 Girls roster: `29, 30, 31, 32` and any one from another school like `1`. Add fake elapsed times if prompted.
3. **Review** the finish order on phone. Fix any swaps.
4. **Publish** the race.
5. On the laptop tab → results panel under "9/10 Girls" should populate within ~1s. Names should resolve correctly (Eabha Pease, Chloe Wood, Rose Sexton, Sienna Jordan + bib 1 = Ava Filuk).
6. Check the team-scores card at the bottom updates with WPS at the top.
7. Hit `https://carnival-results.pgallivan.workers.dev/api/results?carnival=WD26TEST` — should return JSON with the 5 places (D1 archive). Confirms the double-write landed.

## Cleanup

- In CT, delete the `WD26TEST` carnival (or just leave it — won't conflict with WD26).
- Optionally `DELETE https://carnival-results.pgallivan.workers.dev/api/scores?carnival=WD26TEST` if cleanup endpoint exists; otherwise it sits in D1 harmless.

## What "fail" looks like (and what to do)

- **WS won't connect** (red pill) → `wss://carnival-timing-ws.pgallivan.workers.dev/ws/WD26TEST` blocked. Check carnival-timing-ws worker is up via `curl -I https://carnival-timing-ws.pgallivan.workers.dev/`.
- **Names don't resolve** → /wd26 R{} dictionary doesn't have that bib (most likely Sacred Heart 13/14/15/16 etc — expected for TBC).
- **Results don't appear** → CT publish event isn't firing. Check phone has internet, restart CT, retry.
- **D1 row missing** → carnival-timing-ws double-write to carnival-results may be broken. Will need worker logs.

## Thursday morning (real)

1. Create carnival code `WD26` (not WD26TEST).
2. /wd26 page already auto-connects to `WD26` on load — no input change needed.
3. Race away.

