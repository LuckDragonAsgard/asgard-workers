---
name: WD26 District XC race-day state
description: Williamstown District XC carnival 7 May 2026 — physical-bib status, deliverables, and known data drift
type: project
originSessionId: 85eb3c3d-1c1b-4d6d-8f9f-38dde3ad0cb9
---
**WD26 = Williamstown District Cross Country, Thursday 7 May 2026, McIvor Reserve Yarraville. 192 runners, 6 races, 8 schools (incl. Sacred Heart TBC).**

**Why:** Top 10 of each race progress to Divisionals 28 May at Werribee Racecourse. Spectator: sportcarnival.com.au/wd26. CT app on Paddy's phone runs the timing.

**How to apply:**
- /wd26 R{} dictionary embedded in worker is the SOURCE OF TRUTH for bib→runner mapping. If FALKOR_HANDOVER.md disagrees, the page is correct.
- Bib 124 = Banjo Kane *Williamstown North PS* (NOT WPS) — different student from bib 189 Banjo Kane *WPS*. Same name, different schools.
- WPS 11 Boys are bibs 125-128 (Henry Fielding, Ned Hedditch, Kai Morgan, Bernie MacLeod). Not 124-127 — handover was stale, fixed 2026-05-04.
- Sacred Heart bibs (13-16, 45-48, 77-80, 109-112, 141-144, 173-176) are TBC placeholders. If SH attends, names need adding to /wd26 R{} dict.

**Physical bibs:** Paddy does NOT have printed bibs. Solved 2026-05-04 with print-and-pin PDFs in **GitHub** `LuckDragonAsgard/asgard-workers/wd26/` (NOT Drive):
- [`wd26/WD26_bibs.pdf`](https://github.com/LuckDragonAsgard/asgard-workers/blob/main/wd26/WD26_bibs.pdf) — 192 numbered cards, 4/A4, school-coloured stripe, name + race printed. Cut + safety-pin Thursday morning.
- [`wd26/WD26_roster.pdf`](https://github.com/LuckDragonAsgard/asgard-workers/blob/main/wd26/WD26_roster.pdf) — 1 page per race for finish-line marshal reference.
- [`wd26/DRYRUN_TUESDAY.md`](https://github.com/LuckDragonAsgard/asgard-workers/blob/main/wd26/DRYRUN_TUESDAY.md) — runbook for Tue 5 May test of CT → WS → /wd26 publish loop using throwaway code `WD26TEST`.
- Raw download: `https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/wd26/WD26_bibs.pdf` etc.

**Race-day flow:** Open carnivaltiming.com → access code `WPS-2026` → create carnival `WD26` → XC → marshal mode → bib entry as runners cross → publish each race → /wd26 renders live, top-10 get ✓ Qual badge → print qualifiers list → submit to Division coordinator.
