---
name: Sport Portal current state (post 2026-05-05 commercial pack v1.0)
description: Current commercial + engineering state of Sport Portal — engineering fully shipped, commercial pack v1.0 drafted, only insurance + legal review remain before first sale
type: project
originSessionId: 3038c038-7dc9-4f99-ae36-168dc1987649
---
# Sport Portal — state as of 2026-05-05

## Engineering: 100% off Firebase, all audit criticals shipped

- All 4 sites (SSP/CT/SC/SP) have 0 Firebase mentions in served HTML
- /williamstowndistrict rewritten with email magic-link auth + D1-backed scores/users
- carnival-results v1.2.0 has /auth/* + /api/scores + /api/users + /api/winners
- carnival-timing-ws Firebase mirror removed (D1 sole archive); WD26 results auto-land in D1 on publish
- ssp-portal serves /schoolsportportal-nav.js (was 404 returning HTML — broke shared nav on WPS+Hobsons pages)
- sportcarnival-hub v3.2.1 fixed comma-operator bug that was making EVERY URL on sportcarnival.com.au return the lock page
- CF Email Obfuscation toggled OFF on sportportal.com.au zone (contact links work)

## Vault additions

- `STAFF_SESSION_SECRET` — HMAC for /williamstowndistrict bearer-token sessions
- `CF_FULLOPS_TOKEN` — `asgard-fullops-2026-05-04`, scopes: Account (Workers Scripts/Pages/D1/KV) + Zone (Settings/Config Rules/Workers Routes/Cache Purge). Means future zone-level dashboard tweaks doable by API, no browser driving.

## Commercial readiness — pack v1.0 DRAFTED 2026-05-05

All 6 commercial-readiness items now have a v1.0 draft on GitHub at `LuckDragonAsgard/asgard-workers/commercial/` (8 files):

1. ~~Cyber Liability + PI insurance~~ — pre-filled BizCover application sheet ready (`INSURANCE_APPLICATION.md`). PADDY ACTION: submit at bizcover.com.au.
2. ~~PIA~~ — `PRIVACY_IMPACT_ASSESSMENT.md`. Australia-wide: APPs base + state addenda (VIC/NSW/QLD/WA/SA/TAS/ACT/NT) + Catholic/independent notes.
3. ~~Parental consent~~ — `PARENTAL_CONSENT.md`. Letter + signed-form. Pilot at next WPS carnival.
4. ~~DPA~~ — `DATA_PROCESSING_AGREEMENT.md`. Controller/processor structure, sub-processors disclosed, AU residency, NDB 72h. PADDY ACTION: legal-counsel review.
5. ~~WPS case study~~ — `WPS_CASE_STUDY.md`. Quote slot pending, real numbers post-7 May.
6. ~~Sales one-pager + outreach~~ — `SALES_ONE_PAGER.md` + `OUTREACH_LIST.md`. 6-ring concentric plan, Ring 1 = 8 Hobsons Bay schools, hand-deliver at 11 May divisional debrief.

**Active blockers reduced to 4:** (a) BizCover submission, (b) DPA legal review, (c) WPS quote post-race-day, (d) render to PDF for emailing.

Code is done. Commercial pack v1.0 is done. Outstanding work is human (apply for insurance, get legal eyes, capture quote, hit send on outreach).

## Race day infra (Thu 7 May 2026 — district XC)

100% green:
- sportcarnival.com.au/wd26 live (23 KB, no Firebase, footer Privacy/Terms)
- carnival-timing-html v8.7.1 has 📋 Pick name picker (no-bibs fallback)
- ct-access WPS-2026 validates as ssp/WPS
- carnival-timing-ws DO ponging
- D1 archive auto-populated by carnival-timing-ws on publish
- Bib PDF + roster + dry-run plan in `LuckDragonAsgard/asgard-workers/wd26/`

WD26 carnival code is typed into CT app on race morning per checklist — not a pre-created entity.

## Why: how to use this state

When Paddy opens a new chat about Sport Portal, the bootstrap pulls FALKOR_HANDOVER.md which has all this in `## Sport Portal — what's NEXT`. This memory is a faster lookup for "what state is the product in right now" without reading the full handover.
