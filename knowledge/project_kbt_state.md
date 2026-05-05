---
name: KBT face-morph tool current state
description: KBT face morph tool architecture, secrets rotation, save-to-library endpoint as of 2026-05-05 — read at start of any KBT session
type: project
originSessionId: c5ea31e6-58ba-4d41-91df-30d6271f7687
---
# KBT Face Morph Tool — current state (2026-05-05)

**Live tool:** https://kbt.luckdragon.io/face-morph-tool **(v11.2)**
**Full handover doc:** https://github.com/LuckDragonAsgard/kbt-trivia-tools/blob/main/docs/handovers/2026-05-05-session-wrap.md

## Architecture (production)
- v11.x is **upload-and-wrap**, NOT per-feature compositing (v10.x was wrong path — Lucia hand-Photoshops, doesn't feature-mix)
- Three input modes: AI Auto-Morph (fal.ai face-swap, ~16s, ~$0.05/call), upload Lucia's PNG, or per-feature auto-composite fallback
- Q-slot is wrapped with 12px Photoshop dilation stroke + soft drop shadow (alpha 0.45, blur 50, offset 6/18)
- Side stickers (Face A/B) use MediaPipe SelfieSegmentation + cropToAlpha + same stroke

## Why: build the right thing
- The 2026-05-04 audited handover claimed "Paddy's spec is per-feature compositing, don't use fal-morph" — **that audit was wrong**.
- Lucia hand-Photoshops single-face blends. Verified by reading actual `kbt_question` qtype=19 rows in Supabase (her morph at id 106696 is the canonical reference quality).

## Worker secrets (kbt-api, all rotated 2026-05-05)
- GOOGLE_CLIENT_ID — now `205533966048-1f5e2js8d66l2970lv5emd48mrg1lhqs.apps.googleusercontent.com` (Asgard AI client in GCP project asgard-493906)
- GOOGLE_CLIENT_SECRET — vault `GOOGLE_CLIENT_SECRET_ASGARD_AI` (X-Pin 535554)
- GOOGLE_REFRESH_TOKEN — vault `GOOGLE_REFRESH_TOKEN_ASGARD_AI`, scopes: presentations + drive, owner: paddy@luckdragon.io
- SUPABASE_SERVICE_ROLE_KEY — added 2026-05-05; needed for `kbt_question` INSERT (RLS enabled on table)

## New endpoint added 2026-05-05
- `POST kbt-api.luckdragon.io/api/save-morph` — body: `{qSlot, aSlotPair, nameA, nameB, slideLabel}` (data URLs). Uploads to Drive, INSERTs kbt_question row, returns `{questionId, driveFiles, dbRow}`.

## Critical gotchas
1. `kbt_question.id` has NO DB default — must compute next id via SELECT MAX(id)+1 before INSERT. /api/save-morph already handles.
2. Cloudflare Pages can leave a stale 500-causing asset after partial-upload — push trivial change to file to force re-upload.
3. fal.ai face-swap costs ~$0.05/call — don't run AI Auto-Morph in test loops.
4. Old OAuth client_id `342815819710-sugohi5jr60hs2mfv1vgi4apfp3p2bjc` doesn't exist in asgard-493906 — don't restore.

## Open follow-ups (low priority)
- Side-sticker (Face A/B) hair-edge jaggies — would need better matting model (RemBG-Pro, MODNet) to fully eliminate
- fal.ai used is `face-swap` not true 50/50 morph — could try `face-fusion` models for better symmetry
- "Save to Library" UI could add "View in DB / Open in Drive" button cluster
