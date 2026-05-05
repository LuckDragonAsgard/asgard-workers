---
name: Sport Portal current state (post 2026-05-05 full fix-all pass)
description: Sport Portal — engineering complete, commercial pack complete, legal pages complete, 8 Paddy-only items remain before first paying school
type: project
originSessionId: 3038c038-7dc9-4f99-ae36-168dc1987649
---
# Sport Portal — state as of 2026-05-05 (deep-night)

## Status: ENGINEERING + COMMERCIAL + LEGAL PAGES ALL COMPLETE

Race day Thursday 7 May verified ready. WD26 cron wired (event_date in D1, test reminder fired OK). All 11 legal/trust pages on each of SSP/CT/SC. Branded 404. Buy buttons on all 3 sites. GST split shown. Stripe sample invoice templated. Trademark search confirmed clear.

## What's pending — Paddy actions only (8)

1. WD26TEST dry-run today (Tue 5 May)
2. Print Thursday backup runbook (in inbox), hand to principal
3. Submit BizCover insurance app
4. Send legal review pack (manual/legal/SchoolSportPortal_Legal_Review_Pack.zip) to LawPath/LegalVision/Sprintlaw
5. Register "School Sport Portal" trademark class 42 (~$330 TM Headstart)
6. Capture WPS quote post-7-May
7. Hand-deliver outreach pack at Hobsons Bay debrief 11 May
8. LinkedIn presence

See manual/PADDY_ACTION_CHECKLIST.md for full canonical list. Everything else is done.

## Live infra (all green)

- 4 sites — SSP, CT, SC, falkor.luckdragon.io
- 8 production workers — carnival-results v1.5.0 (auth+reset+ratelimit+lockout+unpublish), carnival-timing-html (rules+CSV+manual-edit gate+favicon+11 legal pages), carnival-timing-ws (D1 sole archive), ssp-portal (form+JSONLD+og+favicon+legal+404+GST+footer-strip), sportcarnival-hub (WPS routes+legal+footer-strip), ct-access (welcome email), ssp-contact (auto-reply via luckdragon.io), asgard-snapshot (daily worker→GitHub backup), asgard-status (8/8 services public)
- Vault keys: ADMIN_BOOTSTRAP_PIN, CRON_PIN, SNAPSHOT_PIN, PADDY_SSP_PASSWORD, all CF + GH + Stripe + Resend tokens
- D1 carnival-results: users, sessions, auth_tokens, password_reset_tokens, auth_attempts, scores, division_winners, carnivals (with event_date+reminder_sent_at), results
- Stripe: configured business URL (was wrong), recurring + one-time prices, test customer cus_USXJ3QyZe1FR5t (Williamstown Primary 440 students), sample invoice in_1TTcG2Am0 ($440 inc = $400 ex + $40 GST)

## Where the canonical state lives

- LuckDragonAsgard/asgard-workers/FALKOR_HANDOVER.md — full chronicle
- LuckDragonAsgard/asgard-workers/manual/ — all Paddy-action docs (checklist, runbook, DNS, trademark, invoicing, legal review pack)
- LuckDragonAsgard/asgard-workers/commercial/ — PIA, DPA, parental consent, sales pack, case study, insurance app, outreach list
- LuckDragonAsgard/asgard-workers/knowledge/ — mirrored Cowork auto-memory + NEW_CHAT_BOOTSTRAP.md (any Claude can read this to resume)
- LuckDragonAsgard/asgard-workers/snapshots/workers/ — daily code snapshots of all 9 production workers

## Engineering: 100% off Firebase, all audit criticals shipped

- All 4 sites (SSP/CT/SC/SP) have 0 Firebase mentions in served HTML
- /williamstowndistrict rewritten with email magic-link auth + D1-backed scores/users
- carnival-results v1.2.0 has /auth/* + /api/scores + /api/users + /api/winners
- carnival-timing-ws Firebase mirror removed (D1 sole archive); WD26 results auto-land in D1 on publish
- ssp-portal serves /schoolsportportal-nav.js (was 404 returning HTML — broke shared nav on WPS+Hobsons pages)
- sportcarnival-hub v3.2.1 fixed comma-operator bug that was making EVERY URL on sportcarnival.com.au return the lock page
- CF Ema