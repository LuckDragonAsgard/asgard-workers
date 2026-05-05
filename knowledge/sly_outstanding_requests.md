---
name: SLY outstanding requests
description: All outstanding/pending user requests for the SLY Fantasy AFL app — updated each session so nothing gets lost
type: project
originSessionId: 1e50b334-4eef-415a-9910-2b591562d194
---

## Current state (2026-05-05, post-system-check)
App: https://superleague.streamlinewebapps.com — sly-app v5.24. Repo `LuckDragonAsgard/superleague-yeah-v4` HEAD `356c6153` (sly-api `/api/rounds` clip-fix on 2026-05-05). `python3 sly-checks.py` from repo root for post-deploy verification.

R9 locks Thu 7 May 8:30 UTC (~54 hrs from 2026-05-05) — first fully-automated scoring round on the new system. Cron runs every minute, computes scores via position-specialist formula from Supabase match_player_stats. R9 row, fixtures (8 games / 16 coaches), all bindings, all crons, all auth gates verified clean.

D1 has all 25 rounds correctly typed (16 H2H + 5 HS R12-R16 + 4 Final R21-R24). 2026-05-05 fix: `/api/rounds` was clipping output to `round_number<=current+1` so SPA only saw 11 of 25 rounds; filter removed and live verified.

**2026-05-05 afternoon — data normalization:**
- 11 players: `position='MID'` → `'MIDFIELDER'` (canonical). Would have broken Pick-tab slot filter + scoring formula `M=4M`. Affected Andy's drafted squad (Milan Murdock, Tom Blamires).
- 11 players: short-code team names (WCE/NM/PA/CARL/FRE/HAW/MELB/RICH/WB) → full club names. 18 distinct teams = 18 AFL clubs.
- Injury "Samuel Cumming" `player_id=null` → patched to `e99b8dfb-a199-4e90-887a-8aafc1ccc1ed` (Sam Cumming, RIC).
- Seeded `auto_pick_enabled=1` config row (was NULL).
- Net: 0 orphans across all FKs, 0 short-codes, 0 non-canonical positions, 0 null player_ids in injuries. SLY data integrity green.

## All completed work (multi-session, confirmed live)

### Infrastructure
- ✅ sly-api D1 binding restored, PADDY_PIN restored, sly-api.luckdragon.io custom domain
- ✅ Service worker unregister (no more hard refresh), pgallivan refs removed, white rectangles fixed

### Data & scoring
- ✅ R1–R7 historical picks migrated to D1
- ✅ R7 + R8 final scores, all 16 coaches scored, rounds marked complete
- ✅ sly-score-cron built — runs every 1 min, auto-syncs + auto-completes rounds going forward
- ✅ Tanka R8 picks overridden with R7 team
- ✅ /api/scores SQL bug fixed, batch recalc endpoint fixed

### UI fixes (all tabs verified clean)
- ✅ Home: correct round, open status label, "who hasn't submitted" card
- ✅ Fixtures: scores showing (not "vs")
- ✅ Pick: lock countdown banner, blank player name in activity feed fixed
- ✅ Fund: OUTSTANDING column, unpaid coaches highlighted red
- ✅ Banter: chat text visible in light mode (CSS specificity fix — body.light-mode #pageChat)
- ✅ Trophy: names visible in light mode
- ✅ Match Day: /api/squiggle proxy working
- ✅ Nav: scrollable, active pill, login logo gradient

### Autopick $5 feature (2026-05-04)
- ✅ payments.autopick_paid column in D1
- ✅ /api/autopick-status public endpoint
- ✅ Toggle modal: "You'll owe SLY $5" confirmation when enabling
- ✅ Autopick cron gated on auto_pick_enabled=1 AND autopick_paid=1
- ✅ AUTOPICK TAB in Fund — public, shows opted-in coaches + owed/paid status

### Rules tab + every-player tracker (2026-05-04, v5.14)
- ✅ /api/usage-tracker endpoint — per-coach squad/used/unused/compliance_pct
- ✅ Rules tab in nav (📋 before Match Day) — entry/scoring/every-player/autopick/trades blurbs
- ✅ Compliance leaderboard on Rules tab — sortable, click row to expand unused players
- ✅ Pick tab widget: "Still need to start: Smith, Jones..." for current coach
- ✅ Patches 10–13 added to sly-app-v2.js

### Root-cause overhaul (2026-05-04, v5.16→v5.24)
- ✅ White rectangles fixed at root (CORS + canvas-strip threshold, not multiply kludge)
- ✅ Auto-refresh poller (was infinite reload loop pre-v5.20)
- ✅ Single `const VERSION` at top of worker — every place reads from it
- ✅ 6 auth holes plugged (X-Coach-Id + X-Coach-Pin headers; admin = coach.id===1 OR Bearer MIGRATION_TOKEN)
- ✅ Scoring root-caused: position-specialist formula (SG=10G+B, G1/G2=6G+B, R=½H+½D+M, M=4M, T=4T, D1/D2=D)
- ✅ R1-R8 scores + fixtures backfilled from old-site truth
- ✅ R9-R20 H2H fixtures synced from old site
- ✅ R12-R16 marked round_type='HS' (top 8 win, no H2H)
- ✅ R21-R24 marked round_type='Final' with AFL Top 8 bracket auto-generator (fires after each feeder round)
- ✅ SPA renders HS + Final rounds with proper banners (no more "No fixtures set" blank)
- ✅ sly-checks.py at repo root: 28+ checks, score-drift guard, finals-readiness check
- ✅ Cross-portfolio rule + checks.py template in PaddyGallivan/asgard-source/docs/
- ✅ All 20 other live products got checks.py stub
- ✅ Falkor learned: engineering rules (importance 10), SLY scoring formula (9), auth model (8), ladder snapshot (6), session wrap (7)
- ✅ Falkor agent system prompt has rules baked in
- ✅ Falkor dashboard timezone fixed (renders AEST not raw UTC)

## Outstanding (Paddy's jobs)
- Chase 16 coaches for $50 league fee — mark via Fund tab
- Autopick: nobody opted in yet — appears on Fund tab when they do, mark $5 paid there
- Gold tier UI — build when first person pays (setGoldMember() already in SPA)

## App URLs & access
- App: https://superleague.streamlinewebapps.com
- API: https://sly-api.luckdragon.io
- KV namespace: 4f427724561e48f682d4a7c6153d7124 (standalone-index.html)
- D1: sly D1 id 8d0b8373-40ea-4174-bfd9-628b790abf92
- PIN: 535554
- Full handover: RESUME-HERE.md in repo (SHA b597f3a)

**Why:** User explicitly asked to commit all requests to memory so they don't get lost across sessions.
**How to apply:** At the start of every SLY session, read this file and brief Paddy on what's outstanding.
