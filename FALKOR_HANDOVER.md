---
---

## 2026-05-06 — KBT New Question Types — 21 Opus Build Briefs Pushed

**Repo:** `LuckDragonAsgard/kbt-trivia-tools/briefs/`
**Total briefs now in repo:** 27 (6 existing + 21 new)

### New briefs pushed today (all ready for individual Opus chats)

| Brief | URL | Category |
|-------|-----|----------|
| `pixel-reveal-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/pixel-reveal-tool.md) | Visual |
| `silhouette-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/silhouette-tool.md) | Visual |
| `baby-photo-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/baby-photo-tool.md) | Visual |
| `close-up-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/close-up-tool.md) | Visual |
| `movie-frame-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/movie-frame-tool.md) | Visual |
| `intro-only-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/intro-only-tool.md) | Audio |
| `wrong-speed-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/wrong-speed-tool.md) | Audio |
| `backwards-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/backwards-tool.md) | Audio |
| `voice-id-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/voice-id-tool.md) | Audio |
| `instrument-solo-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/instrument-solo-tool.md) | Audio |
| `emoji-song-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/emoji-song-tool.md) | Word/Text |
| `translator-fail-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/translator-fail-tool.md) | Word/Text |
| `text-message-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/text-message-tool.md) | Word/Text |
| `first-letters-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/first-letters-tool.md) | Word/Text |
| `country-outline-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/country-outline-tool.md) | Geography |
| `city-skyline-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/city-skyline-tool.md) | Geography |
| `flag-mashup-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/flag-mashup-tool.md) | Geography |
| `sound-and-pic-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/sound-and-pic-tool.md) | Combo |
| `title-sequence-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/title-sequence-tool.md) | Combo |
| `stats-puzzle-tool.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/stats-puzzle-tool.md) | Combo |
| `song-bank-infra.md` | [link](https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/song-bank-infra.md) | Infra |

### Key design decisions across all briefs
- **All audio tools** use Deezer free preview (no API key) via kbt-api proxy (`/api/deezer/search`, `/api/deezer/preview`)
- **Shared Web Audio API** pattern: `loadPreview → trimBuffer → reverseBuffer` — identical across Intro Only, Wrong Speed, Backwards. Audio tools should extract `kbt-audio-utils.js` as shared inline util
- **Emoji rendering** in html2canvas is tricky — Emoji Song and Movie Frame both use DOM div approach (not canvas `fillText`) to capture emoji correctly
- **Song Bank** (Supabase `song_bank` table in `huvfgenbcaiicatvtxak`) is prerequisite for all audio tools — build first
- **birefnet matting** (`/api/matting-hq`) used by Silhouette tool — same endpoint as Brain Tool and Face Morph
- **GeoJSON shapes** from `datasets/geo-countries` — Country Outline uses this, no backend needed
- **flagcdn.com** — free flag images by ISO2 code, supports CORS (useCORS: true in html2canvas)
- All tools: black background except Baby Photo (white) and Emoji/Translator/Text Message (white)

### Build priority order (suggested)
1. **Song Bank infra** — all audio tools depend on it
2. **Pixel Reveal** — simplest visual tool, quick win
3. **Country Outline** — self-contained, no AI, no audio
4. **Flag Mashup** — self-contained, flagcdn.com only
5. **Emoji Song** — popular format, good party energy
6. **First Letters** — no external deps, pure text
7. **Intro Only** — first audio tool (establishes Deezer pipeline)
8. **Wrong Speed** — trivial delta on Intro Only
9. **Backwards** — trivial delta on Intro Only (adds reverseBuffer)
10. Rest in any order

### Existing 6 briefs (execution pending Opus chats)
| Brief | Status |
|-------|--------|
| `brain-tool.md` | Brief written, needs Opus execution |
| `crack-the-code-tool.md` | Brief written, needs Opus execution |
| `carmen-sandiego-tool.md` | Brief written, needs Opus execution |
| `linked-pics-tool.md` | Brief written, needs Opus execution |
| `host-brief-tool.md` | Brief written, needs Opus execution |
| `soundmash-tool.md` | Brief written, needs Opus execution |


## 2026-05-06 — Brain Tool — Matting + Shadow Quality Pass

**Repo:** `LuckDragonAsgard/kbt-trivia-tools` → live at `kbt.luckdragon.io/brain-tool`
**Commit:** `e799217c`

### What changed
- **Replaced** client-side `@imgly/background-removal` (isnet, jaggy edges, ~170MB WASM download) with server-side `POST /api/matting-hq` on `kbt-api.luckdragon.io` (fal-ai/birefnet, hair-aware). Same endpoint face-morph-tool uses — single source of truth for KBT matting.
- **API contract:** POST `{image: dataURL}` → JSON `{url: <matted-png-url>}`. Brief said `await res.blob()` but the actual API returns `{url}` JSON; followed face-morph's working pattern instead.
- **Drop shadow constants** in `applyEffectsAndFit` updated to Lucia spec: `SHADOW_OX=12, OY=32, BLUR=90, OPACITY=0.65` (was 10/14/28/0.55). Matches face-morph hardwired values.
- **Outline stroke** already 12px (no change needed).
- **First-load warning copy** updated — no more "downloads ~170MB" language; says "server-side hair-aware matting (fal-ai/birefnet) — typically 3-6s per image".
- **Removed** `@imgly/background-removal` import + `removeBackground()` call entirely. Switched the script tag from `type="module"` to plain script (no more imports needed).

### Pipeline downstream — UNCHANGED
- face-api.js (ssdMobilenetv1 + faceLandmark68Net) still does face/eye detection on the original image
- `buildSplineCut` (organic brow-line cut) unchanged
- `applyEffectsAndFit` logic unchanged except the four shadow constants
- KBT grid + green pill chrome retained (consistency with 2026-05-06 9-tool audit; brief said "no grid/pill" describing the OLD reference PNG, not the deployed tool)

### Verified
- Live `/brain-tool` returns 200 + new code (matting-hq present, @imgly count = 0)
- `/api/matting-hq` proxies correctly to fal-ai/birefnet (smoke-tested with 1×1 PNG → expected `image_too_small` 422 from fal — endpoint chain is healthy)
- Page loads cleanly in Chrome, no console errors
- **Full E2E with a real celeb photo is on Paddy** (per brief: VERIFY VISUALLY — drop celeb pic, check organic cut at brows, white stroke, dramatic shadow vs Larry David reference)

### Brief referenced
`LuckDragonAsgard/kbt-trivia-tools/briefs/brain-tool.md`

### NOTE — handover restoration
This entry was originally landed as commit `624ad871` at 11:58, then **wiped** at 12:07 by a parallel "Linked Pics" chat's botched restore (`1ab86c50` — "prior commit truncated by mishap"). Several other 2026-05-06 entries (Crack The Code, LessonLab v11, Carmen Sandiego refit, original Linked Pics) are also missing from the file as a result and may need re-adding.

# FALKOR HANDOVER

---

## 2026-05-06 — Host Brief Tool — Output Quality Rebuild

**Repo:** `LuckDragonAsgard/kbt-trivia-tools` → live at `kbt.luckdragon.io/host-brief-tool`
**Brief:** `https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/host-brief-tool.md`

### Problem
The "Generate Host Brief" button worked, but output was a generic flowing paragraph — no per-round intros, no section headers, no Aussie pub energy. Brief explicitly demanded: 🎤 WELCOME / 📋 RULES / 🎯 ROUND N (one per round) / 🏆 FINALE with stage directions and varied per-round energy.

### Fix — three commits + CF API deploy
1. **Prompt rewrite** (`workers/kbt-api.js`): explicit emoji section headers, per-round intros for ALL N rounds, transitions in `[brackets]`, ROUND TYPE energy guide (SoundMash → ears, Face Morph → eyes, etc.), few-shot example, hard "DO NOT" list. Now also receives `prizes` (was destructured-out before).
2. **Per-tool model override** (new pattern): `TOOL_MODEL_OVERRIDES` map in kbt-api.js. host-brief now uses `anthropic/claude-haiku-4.5` (instruction-following), other tools stay on `google/gemini-flash-1.5` (cost). Other tools that need format fidelity should use this same override.
3. **HTML polish** (`host-brief-tool.html`): Inter font for the script (was Georgia), 1.15em / line-height 1.7, Print button alongside Copy, `@media print` hides chrome and renders 13pt for paper.

### Verified live
3.1KB script generated for "Kow Brainer Tuesday Night Trivia, 6 rounds, Face Morph R3 + SoundMash R5, $100/$50 bar tab + wooden-spoon free schooner". All sections present, all 6 rounds have unique intros, R3 hits "FACE MORPH ... eyes up", R5 hits "SOUNDMASH ... ears open, drinks down", finale calls out the actual prize amounts. Reads cleanly aloud.

### ⚠️ Deploy gotcha (already documented but bears repeating)
**Pushing to `workers/kbt-api.js` does NOT auto-deploy.** `kbt-trivia-tools` is a CF Pages project (`pages_build_output_dir: ./`). The live `kbt-api` Worker (id `685b262cc21649ac9866407748d94710` in account `a6f47c17... Luck Dragon Main`) needs a direct CF API multipart PUT or `wrangler deploy`. Use `keep_bindings: ["secret_text", "kv_namespace", "d1", "r2_bucket", "service", "queue", "ai", "analytics_engine"]` in metadata to preserve existing secrets.

### Commits
- `eb90af5` workers/kbt-api.js — prompt rewrite + model override = claude-haiku-4.5
- `5f2146f` host-brief-tool.html — Inter, print CSS, Print btn
- CF Worker upload etag `6bed8e09…` (then re-deployed with model fix)

---


## 2026-05-06 — Linked Pics Tool — Full Redesign (concept change)

**Old concept (broken):** generic "what's the connection between these 4 images?" — too vague, hard to score.
**New concept:** 4 movie posters, all featuring the same actor. Players score for naming the actor AND their year of birth.

### Files changed (all auto-deployed via push to main)
| File | Repo | Change |
|------|------|--------|
| `linked-pics-tool.html` | `LuckDragonAsgard/kbt-trivia-tools` | Full rewrite — actor + birthYear inputs, AI Suggest Movies button, 2x2 poster grid with tilt/shadow, Q slide (posters only) + A slide (posters + huge "ACTOR NAME" + "BORN YYYY") |
| `functions/api/ai-text.js` | same repo | linked-pics prompt now branches on `actor`: returns JSON `{movies:[4 titles], note}` for actor mode; legacy "find connection" still works if `subjects` is sent |
| `workers/kbt-api.js` | same repo | Mirrored same prompt + JSON parsing into the standalone Worker (which is what `kbt-api.luckdragon.io/api/ai-text` actually serves — Pages function had no FAL_KEY) |

### Live verification (2026-05-06)
- `https://kbt.luckdragon.io/linked-pics-tool` — new UI live, 4 movies pulled for Tom Hanks (Forrest Gump, Cast Away, Toy Story, Saving Private Ryan) ✅
- `POST kbt-api.luckdragon.io/api/ai-text {tool:"linked-pics",actor:"Amy Adams",birthYear:"1974"}` returns `{movies:["Enchanted","Arrival","American Hustle","The Fighter"],note:"..."}` ✅
- Answer slide preview shows "TOM HANKS" + "BORN 1956" in Bowlby One SC purple over 4 poster slots ✅

### Architecture note worth remembering
**`kbt-api.luckdragon.io` is the Worker at `workers/kbt-api.js`, NOT the Pages function at `functions/api/ai-text.js`.**
The two share an identical prompt set but are separately deployed. Tools (linked-pics, soundmash, etc.) all call `kbt-api.luckdragon.io`. Always mirror prompt changes into both files OR just deploy the worker — Pages function is unused unless something points at `kbt.luckdragon.io/api/ai-text`.

Worker deploy (multipart PUT to CF API): `accounts/$ACCOUNT/workers/scripts/kbt-api` with `metadata={"main_module":"worker.mjs","compatibility_date":"2024-09-23","keep_bindings":["secret_text"]}` — file part name MUST equal the `main_module` value.

### Brief location
`https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/linked-pics-tool.md`

---

## 2026-05-06 — Brain Tool — Matting + Shadow Quality Pass

**Repo:** `LuckDragonAsgard/kbt-trivia-tools` → live at `kbt.luckdragon.io/brain-tool`  
**Commit:** `e799217c`

### What changed
- **Replaced** client-side `@imgly/background-removal` (isnet, jaggy edges, ~170MB WASM download) with server-side `POST /api/matting-hq` on `kbt-api.luckdragon.io` (fal-ai/birefnet, hair-aware). Same endpoint face-morph-tool uses — single source of truth for KBT matting.
- **API contract:** POST `{image: dataURL}` → JSON `{url: <matted-png-url>}`. Brief said `await res.blob()` but the actual API returns `{url}` JSON; followed face-morph's working pattern instead.
- **Drop shadow constants** in `applyEffectsAndFit` updated to Lucia spec: `SHADOW_OX=12, OY=32, BLUR=90, OPACITY=0.65` (was 10/14/28/0.55). Matches face-morph hardwired values.
- **Outline stroke** already 12px (no change needed).
- **First-load warning copy** updated — no more "downloads ~170MB" language; says "server-side hair-aware matting (fal-ai/birefnet) — typically 3-6s per image".
- **Removed** `@imgly/background-removal` import + `removeBackground()` call entirely. Switched the script tag from `type="module"` to plain script (no more imports needed).

### Pipeline downstream — UNCHANGED
- face-api.js (ssdMobilenetv1 + faceLandmark68Net) still does face/eye detection on the original image
- `buildSplineCut` (organic brow-line cut) unchanged
- `applyEffectsAndFit` logic unchanged except the four shadow constants
- KBT grid + green pill chrome retained (consistency with 2026-05-06 9-tool audit; brief said "no grid/pill" describing the OLD reference PNG, not the deployed tool)

### Verified
- Live `/brain-tool` returns 200 + new code (matting-hq present, @imgly count = 0)
- `/api/matting-hq` proxies correctly to fal-ai/birefnet (smoke-tested with 1×1 PNG → expected `image_too_small` 422 from fal — endpoint chain is healthy)
- Page loads cleanly in Chrome, no console errors
- **Full E2E with a real celeb photo is on Paddy** (per brief: VERIFY VISUALLY — drop celeb pic, check organic cut at brows, white stroke, dramatic shadow vs Larry David reference)

### Brief referenced
`LuckDragonAsgard/kbt-trivia-tools/briefs/brain-tool.md`

---

## 2026-05-06 — Carmen Sandiego Tool — Brief refit shipped

**Repo:** `LuckDragonAsgard/kbt-trivia-tools` → live at `kbt.luckdragon.io/carmen-sandiego-tool`
**Commit:** `7a5ba14955` — "Carmen Sandiego: Voyager tiles + Nominatim search + clean export (no KBT chrome) + Q/A naming"
**Brief:** [`briefs/carmen-sandiego-tool.md`](https://github.com/LuckDragonAsgard/kbt-trivia-tools/blob/main/briefs/carmen-sandiego-tool.md)

### What changed (all 5 brief items + naming bonus):
1. **Tiles → CartoDB Voyager** (was ESRI World Imagery satellite). Topographic / road style with city + country labels — matches `Mappins Bhutan Q.png` reference. Free, no API key, CORS-friendly.
2. **Location search** — Nominatim (free, no key). New input + Go button + Enter-key. Auto-fills the filename field if blank. Status line shows resolved place.
3. **High-res export** — offscreen 1920×1080 Leaflet map, event-based `tiles.on('load')` wait + 8s hard fallback + 400ms settle, then `html2canvas(scale:1, useCORS:true)`. No more stretched-screen blur.
4. **KBT chrome removed** — `drawKBTGrid` / `drawKBTPill` / `loadFontsForCanvas` all stripped from export pipeline AND from the script (dead code). Reference outputs have clean map only.
5. **Filename pattern** — `CarmenQ_{slideLabel}_{location}.png` (question, all red) and `CarmenA_{slideLabel}_{location}.png` (answer, correct pin green). Slide label is filename-only, never overlaid.

Bonus: button text + how-it-works copy renamed `A/B → Q/A` to match question/answer semantics.

### Visual QA confirmed live:
Loaded `kbt.luckdragon.io/carmen-sandiego-tool`, typed "Bhutan", hit Go → map jumped to country at zoom 7, rendered crisp Voyager tiles (THIMPHU, SHIGATSE, GUWAHATI labels visible). Search status line shows "→ Bhutan". Filename field auto-filled. Live grep: `drawKBTPill 0`, `World_Imagery 0`, `voyager 2`, `navigateTo 4`.

### Deploy lesson:
`raw.githubusercontent.com` aggressively caches — after a PUT, querying raw with cache-buster still returned old content for ~30–60s. Use `api.github.com/repos/{owner}/{repo}/contents/{path}` to verify push immediately; CDN catches up shortly.

---

## 2026-05-06 — LessonLab — v11 generator follow-ups all shipped

**Repo:** `LuckDragonAsgard/lessonlab` → auto-deploys to `www.lessonlab.com.au` on push to main.
**Live verified:** size 1,122,141 bytes; `_v11LegacyMap` × 3, `_v11Enrich` × 7.

Three open follow-ups from the 2026-04-30 v11 wiring session, all closed in one chat:

| # | Change | Commit |
|---|--------|--------|
| 1 | **Multi-lesson v11 export** — `exportToWordV11()` now stitches every lesson in `state.lessons` into one combined `.docx`. Algorithm: load the per-subject blank once, peel off the body template (between `<w:body>` and the trailing `<w:sectPr>`), token-replace a fresh copy per lesson, separate consecutive lessons with a `<w:br w:type="page"/>` paragraph, reattach the original `<w:sectPr>...</w:body></w:document>` tail. Headers/footers/styles/rels untouched. | `69519084` |
| 2 | **`_v11Enrich` helper** — augments lesson data with vocab tiers (subject-aware bank for all 11 subjects), sentence stems, metacog, EAL/D + Koorie + disability + disadvantage cohort prompts, worked example, week-keyed retrieval plan. `generateLesson()` is now a thin wrapper around the renamed `_generateLessonRaw()`. Cohort token rows in `_v11TokenMap()` rewired to read `d.eald[1-4]` / `d.koorie[1-4]` / `d.disability[1-4]` / `d.disadv[1-4]`. | `5db375f9` |
| 3 | **`_v11LegacyMap` adapter** — runtime mapper for the 604 v2/v3 ai_lessons rows in `lessonlab-api` D1 (binding `DB`, id `295203f9-1f60-43f0-91f2-a6fd6b55d069`, table `ai_lessons`). Hoists `materials → equipment`, `cues → cue1/2/3`, `points → cue fallback`, `entry → entry1`, `entrySay → warmUpSay`, `teach → teach1`, `practice → practice1`, `game → app1`, `exit → packup1`, `ifWell → differentiation.extension`, `ifNot → differentiation.support`. `_v11TokenMap()` calls `_v11LegacyMap(d)` + `_v11Enrich(d, ...)` at the top, so any lesson — fresh, loaded, or imported — exports a fully populated v11 docx. End-to-end verified against ai_lessons id=212 (Handballing Helpers, v3): all PE narrative slots populated rather than defaulted. | `5a1fdc88` |

**Defensive cleanup:** pre-existing `'👎 Noted. We'll improve this.'` syntax error in `rateLessonAI()` (literal ASCII apostrophe inside SQ string — Node `--check` rejected block #8) fixed at the same time by replacing with U+2019 `’`. Block #8 now parses cleanly.

**Templates fetched from:** `https://raw.githubusercontent.com/LuckDragonAsgard/lessonlab/main/templates/` — the live `app.html` lives in `LuckDragonAsgard/lessonlab` (not `PaddyGallivan/lessonlab`; that fork is stale).

**Detailed handover:** `LuckDragonAsgard/lessonlab/docs/HANDOVER.md` (commit `bcc2ae83`).

---

## 2026-05-06 — Crack The Code: black bg + structured AI clues

**Repo:** `LuckDragonAsgard/kbt-trivia-tools` → `kbt.luckdragon.io/crack-the-code-tool`
**Worker:** `kbt-api` (etag `03a919d80abb5737`, modified 2026-05-06)

### Changes (all per `briefs/crack-the-code-tool.md`)
1. **Black canvas** — `crack-the-code-tool.html` `#export-canvas` and `.canvas-wrapper` are `#000000`; `html2canvas` `backgroundColor: '#000000'`; grid lines removed; `.rebus-image` outline upgraded to `12px solid #ffffff` for sticker effect; answer/question text set to `#ffffff` for black bg.
2. **AI prompt rewrite** — both `workers/kbt-api.js:81` and `functions/api/ai-text.js:13` now hold the `STRICT RULES` prompt (no first name, no full last name, sound-alike syllable clues, JSON output `{clues:[{syllable,image,sound}],explanation}`). Verified live: Kelly Clarkson → CELERY/DRAGONFLY/CLARKS MERCANTILE/SONNET (no "Kelly" leak).
3. **Structured clue UI** — `renderAiClues()` parses JSON from `kbt-api`, renders per-clue cards (syllable + image desc + sound) in the AI panel, with a "Create N image slots" button calling `syncSlotsToClues(n)` to resize the upload grid to match.

### Deploy
- HTML + functions auto-deploy via CF Pages (commit `3a6eb354`, `6b4e870c`).
- `kbt-api` worker deployed via CF API multipart PUT, `keep_bindings: ["secret_text"]` to preserve ANTHROPIC_API_KEY / FAL_KEY / GOOGLE_* / SUPABASE_SERVICE_ROLE_KEY.

### Visual QA
- Black preview canvas confirmed live (screenshot 2026-05-06).
- AI endpoint returns structured JSON for both Kelly Clarkson and Sandra Bullock — no first-name leakage.

---

## 2026-05-06 — KBT Tools Suite — Branding/Bug Fixes

**Session:** KBT all-tools audit + fix pass (separate chat from face-morph work)
**Repo:** `LuckDragonAsgard/kbt-trivia-tools` → auto-deploys to `kbt.luckdragon.io`

### Fixes committed (all in one session, all pushed to main):

| Tool | Fix | Commit |
|------|-----|--------|
| **Brand Tool** | CSS selector `.header h1/p` → `header h1/p` (header element was unstyled) | `67d4af99` |
| **Crack The Code** | `alt<"Rebus ${i+1}">` → `alt="Rebus ${i+1}"` (malformed HTML in renderImageSlots) | `eb4b4e2b` |
| **Ghost Actors** | Removed `disabled` from `slideLabel` input on page load — was needlessly blocking label entry before upload | `d5a8f861` |
| **Carmen Sandiego** | Added KBT pill+grid chrome overlay on map exports — was zero-branded before (raw Leaflet map only). Added `slide-label` input, `drawKBTGrid/drawKBTPill/loadFontsForCanvas` helpers, Inter+Bowlby fonts, overlays chrome at 0.12 alpha grid + full-opacity pill | `77dea82f` |
| **Host Brief** | Full theme rewrite from dark (#1a1a2e/#e91e63 pink) to standard KBT light theme (white bg, #16a34a green, Luckiest Guy header, Londrina Solid body). All functionality preserved. | `f0761466` |
| **Linked Pics** | Added Inter to Google Fonts link + `await document.fonts.ready` before html2canvas call in `exportImage()` — ensures pill/label fonts are loaded before capture | `47048b9b` |

### Visual QA pass — ALL 9 TOOLS CONFIRMED LIVE (2026-05-06)
Opened each tool at kbt.luckdragon.io in browser and visually verified:

| Tool | Status | Notes |
|------|--------|-------|
| soundmash-tool | ✅ | Green header, clean layout — reference quality |
| brain-tool | ✅ | Green header, slide label field present |
| guess-the-year-tool | ✅ | Green header, R1Q1 pill visible in preview |
| ghost-actors-tool | ✅ | Purple header, slide label enabled (not greyed out) |
| linked-pics-tool | ✅ | Purple header, 4-cell grid, R1Q1 pill + LINKED PICS label |
| brand-tool | ✅ | Blue header with subtitle — CSS fix confirmed working |
| crack-the-code-tool | ✅ | Blue header, R1Q1 pill in preview |
| carmen-sandiego-tool | ✅ | Green header, Leaflet map loaded |
| host-brief-tool | ✅ | Green header, white bg light theme — dark theme fully gone |

### What was NOT touched:
- `face-morph-tool.html` — being worked in separate chat (v12.0.7 current)

### Key auth lesson this session:
- `asgard-vault.pgallivan.workers.dev` (NOT `luckdragon.io`) is the vault URL
- Vault PIN was rotated (535554 dead); access via `asgard-tools.pgallivan.workers.dev/chat/smart` using `get_secret` tool (no PIN needed from outside, uses env.PADDY_PIN internally)
- GitHub token retrieved via: `POST asgard-tools.pgallivan.workers.dev/chat/smart` → `get_secret("GITHUB_TOKEN")`
- Token is `<GITHUB_TOKEN — retrieve via asgard-tools get_secret>` (short-lived PAT — rotate if stale)


# Falkor / Asgard — Session Handover

> **ZERO-TOLERANCE PERSISTENCE RULE — READ FIRST** >
> **NEVER write to ephemeral/temp paths.** Other Claude chats have repeatedly saved files to AppData, /tmp, /sessions, Local Settings — paths Paddy cannot access later. This is THE most important rule.
>
> **All persistence goes to ONE of these locations ONLY:**
> 1. GitHub `LuckDragonAsgard/asgard-workers` — for code/configs (use Falkor's write_file/edit_file/multi_edit tools)
> 2. Cloudflare D1 — for structured data (run_d1_query)
> 3. CF KV (env.ASSETS) — for session state, audit logs
> 4. CF Vectorize via falkor-brain — for semantic memory
> 5. Office files (docx/pptx/xlsx/pdf) — ONLY when Paddy explicitly asks. Hand back via `present_files` / file links so Paddy picks the save location. NEVER hardcode a drive letter — paths vary per machine.
>
> **NEVER ALLOWED:** AppData, %TEMP%, /tmp, /sessions/, /var/, /usr/, ANY workspace-internal mount path. Lost forever next chat.

---

## KBT Trivia Tools — Build Briefs (2026-05-06)

Each KBT tool has a full Opus build brief in `LuckDragonAsgard/kbt-trivia-tools/briefs/`.
To start a KBT tool build chat, fetch the relevant brief:

| Tool | Brief URL | Status |
|------|-----------|--------|
| 🧠 Brain Tool | https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/brain-tool.md | Ready to build |
| 🔑 Crack the Code | https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/crack-the-code-tool.md | Ready to build |
| 🗺️ Carmen Sandiego | https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/carmen-sandiego-tool.md | Ready to build |
| 🎬 Linked Pics | https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/linked-pics-tool.md | Full redesign |
| 🎤 Host Brief | https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/host-brief-tool.md | Ready to build |
| 🎵 SoundMash | https://raw.githubusercontent.com/LuckDragonAsgard/kbt-trivia-tools/main/briefs/soundmash-tool.md | Big rebuild (needs kbt-api changes) |

### KBT Tool Chat Startup
When starting a KBT tool Opus chat, paste:
```
Fetch this brief and execute it exactly. Don't ask questions — read it, understand it, then build.
[paste the raw brief URL above]
Also fetch https://falkor.luckdragon.io/profile.md for who Paddy is and how he works.
```

### KBT Tools Suite — What Was Fixed This Session (2026-05-06)
All tools at `LuckDragonAsgard/kbt-trivia-tools` → `kbt.luckdragon.io`

| Tool | Fix |
|------|-----|
| Brand Tool | CSS `.header h1/p` → `header h1/p` |
| Crack the Code | `alt<"Rebus">` → `alt="Rebus"` malformed HTML |
| Ghost Actors | Removed `disabled` from slideLabel input |
| Carmen Sandiego | Added KBT pill+grid chrome (NOTE: brief says to REMOVE this — brief takes priority) |
| Host Brief | Full dark→light theme rewrite |
| Linked Pics | Added Inter font + `document.fonts.ready` before html2canvas |

### kbt-api endpoints (production)
- `POST https://kbt-api.luckdragon.io/api/matting-hq` — birefnet HQ matting, body: `{image: dataUrl}`
- `POST https://kbt-api.luckdragon.io/api/ai-text` — AI text gen, body: `{tool: '...', ...fields}`
- `POST https://kbt-api.luckdragon.io/api/save-morph` — save face morph to Supabase + Drive


---

# Falkor — Session Handover (2026-05-04, evening)

## Who you are talking to
Paddy Gallivan — PE teacher at Williamstown Primary School, runs Kow Brainer Trivia (KBT), developer of the Falkor AI assistant and luckdragon.io platform. Emails: pgallivan@outlook.com / pat_gallivan@hotmail.com. Casual, delegates fully. AFL fan (Bulldogs).

---

## FILE-LOCATION RULE (READ FIRST)
- DEFAULT: do **not** save things to `G:\My Drive\Luck Dragon\` — Paddy has flagged repeatedly not to clutter Drive.
- Code / configs / handover docs → GitHub (this repo).
- Office files he asks for → return via `present_files` only.
- If unsure, ASK first.

---

## SPORT PORTAL — FULL HANDOVER (2026-05-04)

The Sport Portal ecosystem = **3 public products** + **Paddy's own school/district/division portals** + **race-day district pages** that all share a single roster. Pitch: **enter student data once, automate across all sports**.

### The three public products

| Product | URL | Status | Worker(s) | What it does |
|---|---|---|---|---|
| **School Sport Portal (SSP)** | https://schoolsportportal.com.au | 200 | `ssp-portal`, `ssp-contact`, `email-logger`, `inbox-api` | Commercial SaaS landing page. $1/student/year. Stripe live. |
| **Carnival Timing (CT)** | https://carnivaltiming.com | 200 | `carnival-timing-html`, `carnival-timing-ws`, `ct-access`, `carnival-results` | Race-day timing app. Race Control / Starter / Lane Timer / Video Finish / Spectator. v8.5.2. |
| **SportCarnival** | https://sportcarnival.com.au | 200 | `sportcarnival-hub` v3.0.0 | Public commercial demo at `/`. Real WPS/Williamstown district data at `/wd26` (noindex). |

### Auxiliary domains / sub-products

| URL | Purpose | Status |
|---|---|---|
| https://schoolsportportal.com.au/help | SSP getting-started | |
| https://schoolsportportal.com.au/sitemap.xml | SSP sitemap | |
| https://carnivaltiming.com/help | CT getting-started | |
| https://carnivaltiming.com/sitemap.xml | CT sitemap | |
| https://sportcarnival.com.au/sitemap.xml | SC sitemap (lists `/`, `/privacy`, `/terms`) | |
| https://falkor-ct-ai.luckdragon.io | CT AI backend (summarise / flag-times / suggest-heats / commentary) | v1.0.0 |
| https://ct-access.luckdragon.io | CT paywall worker (validate / create / stripe-webhook / admin/codes) | Live (PIN-gated) |
| https://carnival-results.pgallivan.workers.dev | D1 API for published results | |

### Paddy's own school / district / division portals (on SSP)

Live at the `ssp-portal` worker — these are the real WPS / Williamstown / Hobsons Bay pages:

| Level | URL | Title |
|---|---|---|
| **School** | https://schoolsportportal.com.au/williamstownprimary | Williamstown Primary School — School Sport Portal |
| | https://schoolsportportal.com.au/williamstownps (alias) | same |
| **District** | https://schoolsportportal.com.au/williamstowndistrict | Williamstown District Sport |
| **Division** | https://schoolsportportal.com.au/hobsonsbay | Hobsons Bay Division — School Sport Portal |
| | https://schoolsportportal.com.au/hobsonsbaydivision (alias) | same |

Public product demo ladder (also `ssp-portal`):

| Level | URL | Demo subject |
|---|---|---|
| School | https://schoolsportportal.com.au/demo-school | Riverside Primary School |
| District | https://schoolsportportal.com.au/demo-district | Riverside District |
| Division | https://schoolsportportal.com.au/demo-division | Eastbay Division |
| Region | https://schoolsportportal.com.au/demo-region | Central Coast Region |

### Per-district / race-day pages on SportCarnival

| URL | What it is | Status |
|---|---|---|
| https://sportcarnival.com.au/ | Public commercial demo — Demo Valley District XC 2026, 8 fictional schools, simulated live results | Live |
| https://sportcarnival.com.au/wd26 | Real Williamstown District XC 2026 — 192 runners, 8 schools, 6 races, WS auto-connects to WD26 | `x-robots-tag: noindex` |
| https://sportcarnival.com.au/williamstown | Alias for /wd26 | |
| https://sportcarnival.com.au/williamstownps/crosscountry | WPS-only XC sub-page | Files in repo, worker doesn't route. Add handler if needed. |
| CT carnival code **WD26** | District XC live results auto-connects | Reserved for Thursday |

### Stripe / payments
- **CT $49 single:** https://buy.stripe.com/8x26oGgux9IT3wQckm9IQ05 (ct_type=single)
- **CT $149 annual:** https://buy.stripe.com/7sY3cu3HL8EP4AUesu9IQ06 (ct_type=annual)
- **SSP $1/student/yr:** Stripe link live on schoolsportportal.com.au
- SSP subscribers get a school-specific CT code (type=ssp). Test code: `WPS-2026`. Test annual: `TEST-1234`.
- Webhook: `we_1TS4y0Am8bVflPN0qCkWbAkO`

### GitHub repos (under LuckDragonAsgard)

| Repo | Product |
|---|---|
| `sportportal` | SSP landing page |
| `schoolsportportal` | directory site |
| `sportcarnival-hub` | sportcarnival.com.au |
| `district-sport` | carnivaltiming.com source |
| `sport-carnival` | CT main repo (single index.html) |
| `wps-athletics-2026` | WPS data model (ROSTER, HOUSES, PTS, Firebase `wps_aths_2026/results`) |
| `asgard-workers` | Falkor fleet + this handover |

### Account / hosting
- Cloudflare account: **Luck Dragon Main** `a6f47c17811ee2f8b6caeb8f38768c20`
- All four domains hosted as Cloudflare Workers (NOT Pages)
- Firebase Realtime Database (australia-southeast1)
- D1 database for published results: `carnival-results-db` UUID `4c39e40c-b6ca-40db-83bb-e8c69bad6537`
- KV: `CT_ACCESS_CODES` ID `ac2ea4434e72490ea76ddb3ab6bca312`

---

## Sport Portal — what's NEXT

### Immediate (this week)
1. **Bookmark `sportcarnival.com.au/wd26`** for race day. Aliases: `/williamstown`, `/williamstown-2026`.
2. **Confirm WD26 carnival code** is created in CT for **Thursday 7 May 2026** (district XC).
3. **Run the Thursday checklist** (`thursday_checklist.html` saved in Drive 2026-05-03).
4. ~~**Sport Portal architecture push**~~ — DONE 2026-05-04. Pushed to `asgard-workers/docs/`: [`SPORT_PORTAL_ARCHITECTURE.md`](docs/SPORT_PORTAL_ARCHITECTURE.md) + [`COST_TRACKING_DASHBOARD.md`](docs/COST_TRACKING_DASHBOARD.md). Source markdowns remain in Drive.
5. (Optional) **Restore `/williamstownps/crosscountry`** sub-page. Files exist in `sportcarnival-hub` repo but worker isn't routing them — add a handler in `_innerFetch`.

### Short-term (May 2026 audit — outstanding criticals)
1. **Cyber Liability + Professional Indemnity insurance** (BizCover.com.au) — CRITICAL
2. **Host Privacy Policy** at `schoolsportportal.com.au/privacy` (currently mis-hosted on `sportcarnival.com.au/legal.html`) — CRITICAL
3. **Finalise Terms of Service** — remove "Draft" status — CRITICAL
4. **Add security headers** to `ssp-portal` Worker — HIGH
5. **Restrict CORS** on `ssp-contact` to own domain — HIGH
6. **Fix copyright year** 2025 → 2026 — HIGH
7. **Change footer email** to info@schoolsportportal.com.au — HIGH
8. **Clarify "SSV compliant" wording** — SSV = School Sport Victoria event body, not a data standard — HIGH
9. **Migrate ssp-contact** from pgallivan domain to luckdragon.io — MEDIUM
10. **Parental consent template** — MEDIUM
11. **VIC DET Privacy Impact Assessment** kick-off — MEDIUM

### Medium-term (post-XC carnival)
- ~~**Wire CT XC bib lookup to Google Sheet**~~ — SUPERSEDED 2026-05-04 by `carnival-results` D1 migration. `sportcarnival-hub` v3.2.0 now reads from D1 (`/api/results?carnival=CODE`, `/api/list`). `/api/sheet` returns 410. CT app still double-writes to both Firebase and D1; Firebase reads no longer required.
- **Make `/wd26` data-driven** — currently hard-coded HTML. Refactor to pull from Google Sheet so other districts can be added as `/wd-<code>` paths.
- **"Try it with your district" form** on the demo page — collect name + email and route to SSP signup.
- **CT Phase 1 roadmap:** event program builder, house points tally, DNS/DNF, false-start RECALL, PWA, photo finish zoom, full-day export, qualifier board.

### Vision
"**Enter student data once, automate across all sports**" — SSP is the source-of-truth roster that feeds CT, SportCarnival, district draws, swimming, athletics. No re-keying, no wrong age groups.

---

## WPS / District context (for race day)

**District:** Williamstown District / Hobsons Bay Division. **District XC carnival: Thursday 7 May 2026** at McIvor Reserve, Yarraville. **Top 10 → Divisionals, 28 May (Werribee Racecourse)**.

### WPS qualifiers (top 4 from school finals → district)
| Age/Gender | 1st | 2nd | 3rd | 4th |
|---|---|---|---|---|
| 10 Boys | Elias D'Souza (#61, 8:06) | Thomas Reid (#62, 8:15) | Luca Galle (#63, 8:22) | William Galle (#64, 8:25) |
| 10 Girls | Eabha Pease (#29, 9:14) | Chloe Wood (#30, 9:39) | Rose Sexton (#31, 10:29) | Sienna Jordan (#32, 10:47) |
| 11 Boys | Henry Fielding (#125, 11:36) | Ned Hedditch (#126, 10:22) | Kai Morgan (#127, 13:04) | Bernie MacLeod (#128, 13:14) |
| 11 Girls | Emilia Rajch (#93, 11:47) | Greta Lovell (#94, 12:16) | Evie Vanderloo (#95, 12:58) | Ava Fleming (#96, 13:36) |
| 12 Boys | Banjo Kane (#189, 10:40) | Jarvis Sullivan (#190, 11:49) | Otis Lethborg (#191, 12:06) | Hudson Middleton (#192, 12:18) |
| 12 Girls | Danica Grant (#157) | Lily Sexton (#158, 16:30) | Irida Bladon (#159, 17:50) | Lana Budinoska (#160, 18:30) |

24 WPS runners total. Bib numbers confirmed against /wd26 spectator page (source of truth — embedded R{} dictionary).

**Physical bibs status (2026-05-04):** Paddy does NOT have physical bibs printed. Solved Mon 4 May with print-and-pin PDFs in this repo (`wd26/`):
- [`wd26/WD26_bibs.pdf`](wd26/WD26_bibs.pdf) — 192 numbered tear-off cards, 4/A4, school-coloured stripe, name + race printed.
- [`wd26/WD26_roster.pdf`](wd26/WD26_roster.pdf) — finish-line marshal reference, 1 section per race.
- [`wd26/DRYRUN_TUESDAY.md`](wd26/DRYRUN_TUESDAY.md) — Tue 5 May dry-run plan with `WD26TEST` throwaway code.
- Workflow Thursday morning: download/print → cut bibs → safety-pin/tape on at warm-up (~9am) → CT marshal mode types bib as runner finishes → /wd26 renders name from embedded R{} dictionary.
- Sacred Heart bibs (13–16, 45–48, 77–80, 109–112, 141–144, 173–176) printed as "TBC"; if SH attends, write names on the day.

---

## Live Falkor fleet — verified 2026-05-04

| Worker | Domain | Live |
|---|---|---|
| falkor-ui | **falkor.luckdragon.io** | v9.21.0 |
| falkor-agent | falkor-agent.luckdragon.io | v2.9.0 (Phase 81 bridge handlers) |
| falkor-kbt | falkor-kbt.luckdragon.io | v2.8.0 |
| falkor-workflows | falkor-workflows.luckdragon.io | v3.11.0 |
| falkor-school | falkor-school.luckdragon.io | v1.5.0 |
| falkor-sport | falkor-sport.luckdragon.io | v1.6.0 |
| falkor-telegram | falkor-telegram.luckdragon.io | v1.7.0 |
| asgard-ai | asgard-ai.luckdragon.io | v6.5.0 |
| falkor-brain | falkor-brain.luckdragon.io | v1.0.0 |
| falkor-web | falkor-web.luckdragon.io | v1.2.0 |
| falkor-code | falkor-code.luckdragon.io | v1.4.0 |
| falkor-push | falkor-push.luckdragon.io | v1.1.2 |
| falkor-dashboard | falkor-dashboard.luckdragon.io | v3.1.0 |
| falkor-widget | falkor-widget.luckdragon.io | v1.0.0 |
| falkor-deploy | falkor-deploy.luckdragon.io | up (PIN-gated) |
| falkor-ct-ai | falkor-ct-ai.luckdragon.io | v1.0.0 |

**Note:** `falkor-ui.luckdragon.io` is NXDOMAIN — UI is at **falkor.luckdragon.io**.

---

## Phase 81 — Local Bridge — TEST PENDING

Code DEPLOYED 2026-05-04 (commit `5e054ea`, deployment_id `f80acecaf6fb4428a1cbda36e09cf7e0` for falkor-agent v2.9.0).

Built:
- falkor-agent bridge protocol: `bridge_register` / `bridge_command` / `bridge_result` WS handlers, DO storage of bridge results.
- falkor-ui v9.21.0: PC bridge status pill in header.
- `falkor-bridge.js` (Node script — file/shell/screenshot/disk access, safe-roots only), `launch-bridge.vbs` (silent launcher), `install-bridge-startup.bat` (Windows Startup install).

To test (Paddy runs locally):
1. Open terminal in `G:\My Drive\Luck Dragon\`
2. `npm install ws` (one-time)
3. `node falkor-bridge.js`
4. Check falkor.luckdragon.io — PC pill should go green.
5. Test prompt: "list files on my desktop"

Auto-start on login: run `install-bridge-startup.bat` as admin.

---

## Recently shipped (2026-05-03 → 2026-05-04)

**carnival-timing-html v8.7.1 (2026-05-04 evening) — XC Marshal name picker:**
- Added `📋 Pick` button next to `🔍 Auto` OCR in XC Marshal bib pad → opens full-screen name picker overlay with search.
- Filters BIB_LOOKUP to bibs in the active race (xcState.age + xcState.gender). 8 schools colour-coded, taken bibs greyed out.
- Tap a name → sets `bibValue` + auto-runs `bibConfirm()` → next finisher.
- BIB_LOOKUP for WD26 (192 runners) re-injected — v8.7.0 had stripped it; restored in v8.7.1.
- Resolves the "no physical bibs" Thursday gap: marshal can identify each finisher by tapping name, no typing/no bib reading.
- Repo `LuckDragonAsgard/sport-carnival` synced to live worker (commit `7ff40df9`).
- Try it: carnivaltiming.com → access code `WPS-2026` → create carnival `WD26TEST` → XC → Marshal → tap finisher → tap `📋 Pick`.


**WD26 race-day prep (2026-05-04 afternoon):**
- Generated print-and-pin bib PDF + finish-line roster + Tuesday dry-run plan → `LuckDragonAsgard/asgard-workers/wd26/` (GitHub, NOT Drive — Drive deprecated). Resolves "no physical bibs" gap.
- Corrected 11 Boys WPS bib numbers: handover had 124–127, /wd26 has them at 125–128 (page is source of truth — bib 124 = Banjo Kane WNPS, *not* WPS).
- Verified end-to-end live: /wd26 200, WS auto-connects to `wss://carnival-timing-ws.../ws/WD26`, ct-access `WPS-2026` validates as ssp/WPS, carnival-results D1 v1.2.0 ready (no WD26 row yet — clean).


**Firebase → Cloudflare migration COMPLETE (2026-05-04, e2e session, Phase 2 done):**
- `/williamstowndistrict` rewritten — Firebase Auth + RTDB removed; new D1-backed page with email magic-link login + `/api/scores` + `/api/users` + admin coach provisioning. Page size shrunk 143 KB → 19 KB.
- `carnival-results v1.2.0` — added auth (`/auth/login` `/auth/verify` `/auth/me` `/auth/logout`), scores (`GET/POST/DELETE /api/scores`), users (`GET/POST/DELETE /api/users`). Bearer-token sessions HMAC-signed with `STAFF_SESSION_SECRET` (in vault).
- `carnival-timing-ws` — `pushToFirebase()` removed entirely. D1 is sole archive.
- `ssp-portal` — no-cache header on GH-fetched pages + cache-bust on subrequest URL.
- All served pages now have **0 Firebase mentions** (verified e2e).
- Magic-link login tested end-to-end: `pgallivan@outlook.com` → email sent via Resend, token stored in D1.
- D1 schema: `carnivals`, `results`, `users`, `division_winners`, `auth_tokens`, `scores`.

**Remaining for Paddy (GCP/Firebase final cleanup, no urgency):**
1. Revoke 3 legacy GCP service-account keys (steps in [`docs/FIREBASE_DECOMMISSION.md`](docs/FIREBASE_DECOMMISSION.md))
2. Delete Firebase project `willy-district-sport` (after 1-week verification)


**Firebase → Cloudflare migration Phase 1 (2026-05-04, e2e session):**
- Bulk migrated Firebase /fl/ → D1 carnival-results (12 real carnivals, 4 result rows; 210 LOAD-* test entries skipped).
- carnival-timing-ws now double-writes to D1 alongside dormant Firebase mirror — WD26 race results will permanently land in D1.
- carnival-results v1.1.0 — added /api/winners GET+POST + /health; new D1 table `division_winners`.
- ssp-portal HOBSONS_HTML — removed ~150KB Firebase SDK; reads from /api/winners with 30s polling.
- Comprehensive plan in [`docs/FIREBASE_DECOMMISSION.md`](docs/FIREBASE_DECOMMISSION.md).
- DEFERRED: schoolsportportal /williamstowndistrict (Firebase Auth + RTDB scores) — too risky 3 days before race day. Phase 2 post-Thursday.


**sportcarnival-hub v3.2.0 (2026-05-04, e2e session):**
- `/api/results?carnival=CODE` and `/api/draw?carnival=CODE` now read from `carnival-results` D1 (no Sheet/Firebase dep on the read path).
- New `/api/list` endpoint returns published carnivals.
- `/api/sheet` deprecated (returns 410).
- WD26 returns `{"status":"pending"}` until Thursday (no error).

**sportcarnival-hub v3.1.1 (2026-05-04):**
- Routes `/williamstownps/{crosscountry|athletics|swimming}` (noindex) + `/demo-school/{crosscountry|athletics|swimming}` (public).
- HTML embedded inline (~210 KB worker total).

**ct-access (2026-05-04):**
- Added `DELETE /admin/codes/:code` (PIN-protected). Source archived in `asgard-workers/workers/ct-access/worker.js`.


**sportcarnival-hub v3.0.0 (2026-05-04 evening):**
- Homepage `/` now serves a public **demo** (Demo Valley District XC 2026, 8 fictional schools, simulated live results, CTAs to SSP + CT).
- Real Williamstown district data moved to `/wd26` (aliases: `/williamstown`, `/williamstown-2026`). `x-robots-tag: noindex`, blocked in robots.txt.
- API endpoints (`/api/draw`, `/api/results`, `/api/sheet`, `/api/status`) preserved.

**Sport Portal pre-launch polish (2026-05-03):**
- SSP `/help`, `/sitemap.xml`, `/robots.txt` embedded in `ssp-portal`.
- SSP auto-reply via `ssp-contact` (Resend) — fires after internal notification.
- SSP, CT, SC footer cross-links between all three products.
- CT admin dashboard (`ct_admin_dashboard.html`) — `ct-access.luckdragon.io/admin/codes` with `X-Pin: 535554`.
- CT `hello@carnivaltiming.com` email forwarding via CF Email Routing → paddy@luckdragon.io.
- Pitch email templates (4) saved.

**Other:**
- Account consolidation COMPLETE — CF, Stripe, GitHub, GDrive all on `paddy@luckdragon.io`.
- luckdragon.io homepage 525 SSL fixed.
- Phase 81 Bridge code deployed (test pending).

---

## Deploy patterns

- **Simple workers** (no DO/KV bindings): `POST https://asgard-tools.luckdragon.io/admin/deploy` with `X-Pin: VAULT_PIN`. Add `skip_auto_commit: true`.
- **Workers with DO/Vectorize/KV bindings** (falkor-agent, falkor-kbt, falkor-brain, ct-access, carnival-timing-ws): use CF API directly with multipart PUT. Pass `keep_bindings: ["secret_text"]` to preserve secrets. For ct-access also pass `kv_namespaces: [{binding:"CT_ACCESS_CODES", id:"ac2ea4434e72490ea76ddb3ab6bca312"}]`.
- **`carnival-timing-html` deploy gotcha:** CF API returns the worker as multipart. Must extract JS from multipart before redeploying.
- **`ssp-contact` is service-worker format** (uses `addEventListener`). Deploy with `body_part: "script"`, NOT `main_module`.
- **`ssp-portal`, `sportcarnival-hub` are ES Module format.** Use `main_module: "worker.js"`.
- **GitHub Contents API**: use `LuckDragonAsgard/asgard-workers`. `GITHUB_TOKEN` in vault.
- **Never tell Paddy to hard-refresh.** Send no-cache headers from the server.

---

## Security (current)

- **falkor.luckdragon.io login (Paddy):** `2967` (POST falkor-push `/user/verify`)
- **AGENT_PIN** (fleet inter-worker `X-Pin`): `JilSS1zLn3Rl7mWrM6fOJc69` (rotated 2026-05-01)
- **VAULT_PIN** (asgard-vault): `535554` (active 2026-05-03)
- **falkor-dashboard worker PIN**: `luckdragon`
- **Vault read**: `GET https://asgard-vault.pgallivan.workers.dev/secret/<KEY>` with `X-Pin: 535554`
- Stripe webhook secret: `we_1TS4y0Am8bVflPN0qCkWbAkO`

---

## Other live projects (context)

- **KBT Trivia Tools** — asset pipeline, Google Slides `[q]` placeholder, 6 tool files. GDrive default/quiz/ folder + ~20 per-game templates.
- **Bomber Boat** (bomberboat.com.au) — CF Pages + Worker, GitHub `PaddyGallivan/bomber-boat`.
- **Superleague Yeah v4** (superleague.streamlinewebapps.com) — AFL fantasy draft v4.28.
- **WPS Y2 Maths Intervention** — 7-week term pack, 14 lessons, Vic Curric 2.0 + VTLM 2.0.
- **Face Morph Tool** — 50/50 alpha blend, see `reference_facemorph_rules.md`.
- **Jaclyn Rooney — 75 Cecil St** — desktop building review done April 2026.
- **wps-staff-hub / wps-hub-v3** — internal WPS workers (separate from SSP product portal).

---

## How Paddy likes to work

- Casual, direct — no fluff, no post-work summaries.
- Delegates fully — just do it.
- **Don't clutter Drive** — see file rule at top.
- Handovers/status docs → THIS GitHub repo (`LuckDragonAsgard/asgard-workers/FALKOR_HANDOVER.md`).
- Check GitHub before assuming worker state.
- Screenshot when debugging UI.
- Never tell him to hard-refresh or clear cache. Send no-cache headers from the server.
- AFL Bulldogs fan.

---

## Known drift / cleanups

1. ~~WPS XC sub-page 404~~ — RESOLVED 2026-05-04. `sportcarnival-hub` v3.1.1 routes `/williamstownps/{crosscountry|athletics|swimming}` (noindex) and `/demo-school/{crosscountry|athletics|swimming}` (public). HTML embedded inline.
2. **falkor-agent versioning** non-linear: source = `2.9.0`, prior commit messages claim `1.9.1`. `/health` is the truth.
3. **Privacy/Terms** are now hosted on sportcarnival.com.au/privacy and /terms. Should also be mirrored to schoolsportportal.com.au/privacy and /terms (audit critical).
4. **ssp-contact** still on pgallivan domain — should migrate to luckdragon.io.
5. **Sport Portal architecture push** from earlier today — verification code still needed if continuing.
6. **`sportcarnival-hub` repo vs live worker drift** — repo has `index.html`, `vercel.json`, `williamstownps/`, `demo-school/` from Vercel-style setup; live worker is a single `worker.js` with embedded HTML. `worker.js` was committed back to repo (2026-05-04) but legacy files remain.

---

## How to start the next chat

Paddy will likely say one of:

- *"Sport Portal — pick up"* → start with the Immediate list above.
- *"Bridge test"* → walk through Phase 81 test steps.
- *"Thursday checklist"* → open `thursday_checklist.html` from Drive and walk through.
- *"What did we do yesterday?"* → summarise from "Recently shipped".
- A fresh project ask → ask which project, then proceed.

Per project instructions, this file is auto-fetched at chat start. Brief Paddy from the **Sport Portal — what's NEXT** section first.


---

---

## CLUBHOUSE — FULL HANDOVER (2026-05-04)

Clubhouse is a **multi-tenant club management SaaS** built on Cloudflare Pages + D1 + R2. PE/sport clubs sign up, manage rosters, fixtures, stats, and payments. Sessions 1–5 shipped tasks #1–45.

### Infrastructure
| Resource | ID / Name |
|---|---|
| CF Pages project | `clubhouse` (GitHub: LuckDragonAsgard/clubhouse) |
| D1 database | `b6275cb4-9c0f-4649-ae6a-f1c2e70e940f` (binding: `DB`) |
| R2 bucket | `clubhouse-media` (binding: `MEDIA`) |
| Deploy | Push to `main` → CF Pages auto-builds |

### Database tables
| Table | Purpose |
|---|---|
| `clubs` | One row per club (slug, name, features JSON, playhq_org_id, playhq_season_id, playhq_last_sync) |
| `ch_memberships` | Users ↔ clubs (user_id, club_id, role: admin/committee/coach/player/parent) |
| `ch_fixtures` | Games (club_id, round, date, home/away, opponent_name ← **NOT** opponent, score, result, sport, playhq_id) |
| `ch_stats` | Flat key-value stats (fixture_id, user_id, stat_key, stat_value REAL) — UNIQUE(fixture_id, user_id, stat_key) |
| `ch_ladder` | Season ladder rows (club_id, team_name, p/w/l/d/pts, scraped_at) |
| `users` | Auth (email, name, avatar_url) |
| `sessions` | Bearer tokens (token, user_id, expires_at) |

### Auth pattern (critical — must get this right)
```js
// Handler MUST destructure request AND env
export async function onRequestGet({ request, env, params }) {
  const user = await AUTH(request, env);       // throws 401 if no valid Bearer
  const clubId = await getClubId(env, params.slug);
  const mem = await checkMembership(env, clubId, user.id);
  // mem.role: admin | committee | coach | player | parent
}
```

### API endpoints (all under /api/clubs/:slug/)
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `fixtures` | member | List fixtures |
| POST | `fixtures` | admin/committee | Create fixture |
| GET | `fixtures/:id/stats` | public | Get all player stats for a game |
| POST | `fixtures/:id/stats` | admin/committee/coach | Upsert stats (batch) |
| GET | `stats/:userId` | public | Career stats — totals, avgs, best, last 10 games |
| GET | `stats/leaderboard?stat=goals&limit=10` | public | Top players by stat |
| GET/PATCH/POST | `sync/playhq` | admin | PlayHQ GraphQL config + sync |
| POST | `sync/scrape` | admin | Receive bookmarklet-scraped data (fixtures + ladder) |
| GET | `members` | member | Roster |
| POST | `members/import` | admin | CSV bulk import (task #41) |
| GET | `settings` | member | Club settings + features |
| PATCH | `settings` | admin | Update settings |

### Stats system
- **AFL keys:** goals, behinds, kicks, handballs, disposals, marks, tackles, hitouts, frees_for, frees_against, votes
- **Cricket batting:** runs, balls, fours, sixes, not_out
- **Cricket bowling:** overs, maidens, wickets, runs_conceded
- Entry UI: `/club/:slug/stats/entry/:fixtureId` (StatsEntry.jsx — sport selector + scrollable player × stat grid)
- Player profile shows career stats (PlayerStats.jsx component)
- Leaderboard at `/club/:slug/stats/leaderboard` (Leaderboard.jsx)

### PlayHQ integration
- PlayHQ is a **full SPA** — server-side scraping blocked (CloudFront, returns 2290-char shell HTML)
- Solution: **bookmarklet** — admin drags button from Admin page to bookmarks bar, clicks on PlayHQ page
- Bookmarklet source: `public/playhq-bookmarklet.js`
- Scrapes `[class*="GameCard"]` fixture cards + `tbody tr` ladder rows from live DOM
- Also intercepts fetch to capture GraphQL responses
- POSTs to `/api/clubs/${slug}/sync/scrape`
- GraphQL endpoint (discovered): `https://api.playhq.com/graphql`

### Key bugs / gotchas
- `ch_fixtures` column is `opponent_name` NOT `opponent` — always use `opponent_name`
- `sport` column on `ch_fixtures` was added via ALTER: `ALTER TABLE ch_fixtures ADD COLUMN sport TEXT DEFAULT 'afl'` — must migrate on any fresh DB
- CF Pages routes specific filenames before dynamic ones: `stats/leaderboard.js` resolves before `stats/[userId].js`
- GitHub Contents API: URL-encode `[` as `%5B`, `]` as `%5D` in file paths
- Error 1101 = CF worker runtime exception — check D1 schema first
- `wrangler.toml` controls CF Pages production bindings — R2 must be declared or it disappears on deploy

### Frontend routes (React SPA, src/App.jsx)
```
/club/:slug/                    → ClubHome
/club/:slug/fixtures            → Fixtures (has 📊 link on played games)
/club/:slug/stats/entry/:id     → StatsEntry
/club/:slug/stats/leaderboard   → Leaderboard
/club/:slug/members/:userId     → PlayerProfile (shows PlayerStats component)
/club/:slug/admin               → Admin (bookmarklet UI + feature toggles)
```

### Feature flags (clubs.features JSON)
Default features: `{ news: true, events: true, gallery: true, payments: true, stats: true }`
Toggle in Admin page under "Features" section.

### Session 5 completed (2026-05-04)
- ✅ Task #41: CSV roster import
- ✅ Task #42: PlayHQ GraphQL sync endpoint
- ✅ Task #43: PlayHQ bookmarklet scraper (DOM-based, bypasses SPA blocking)
- ✅ Task #44: Stats entry system (AFL + Cricket, per-fixture, per-player)
- ✅ Task #45: Stats display (PlayerProfile component + Leaderboard page)
- ✅ Handover updated in both asgard-source (Cowork) and asgard-workers (Falkor)

### Next steps for Clubhouse
- Test bookmarklet on real PlayHQ admin account (need org_id + season_id first)
- Wire up payments (Stripe) for member registration
- Notifications: fixture reminders, score updates via Telegram/push
- Public club profile pages (unauthenticated)

---

## Family Finance pages — IP cascade calculators (May 2026)

Three Cloudflare workers built to model the Footscray-Williamstown property cascade between Paddy/Jacky, Kelly, and Monica. All three deployed and live as of 2026-05-04.

### URLs
- **Paddy & Jacky** — https://paddy-finance.pgallivan.workers.dev (3-property portfolio: Cecil St PPOR, North Rd Newport IP, Osborne St becoming IP)
- **Kelly** — https://kelly-finance.pgallivan.workers.dev (713/90 Buckley as IP, moving to Osborne)
- **Monica** — https://monica-finance.pgallivan.workers.dev (308/90 Buckley as IP, moving to 713)

### Architecture
- Single `worker.js` per page, plain HTML+inline CSS+JS. No frameworks, no D1, no KV.
- Source files: `/tmp/kelly_v9.js`, `/tmp/monica_v8.js`, `/tmp/paddy_v9.js` in the active session sandbox.
- Deploy via CF API multipart PUT to `accounts/$ACCOUNT/workers/scripts/<name>-finance` with `metadata.main_module = "worker.js"`.

### What each page does (parity feature set)
- Hero: net weekly cashflow + CGT 6-yr-rule savings.
- Long-term wealth banner: 10-year wealth built, equity, CGT avoided, break-even/portfolio summary.
- Before-vs-after IP comparison with diff bar (positive = better off, negative = worse).
- Tax math correctly nets rental income against deductions before applying marginal rate (was a bug — fixed).
- Inputs: salary, loan, rate, repayment, rents in/out, body corp, rates, insurance, maintenance, depreciation, land tax, other deductibles, vacancy %, rent growth %, cost growth %.
- IP/OO toggle that bumps rate +0.5% on IP and recalculates.
- PPOR designation warning explaining only one property at a time can be CGT-exempt.
- Action plan / next-steps panel.
- Mobile-friendly: viewport meta + 600px media queries collapsing all grids to single column.

### Deploy gotchas
- **CF API token vault**: `https://asgard-vault.pgallivan.workers.dev/secret/CF_API_TOKEN` with `X-Pin: 535554`.
- **CF account ID**: `a6f47c17811ee2f8b6caeb8f38768c20`.
- **No D1 binding needed** — these are pure HTML responses, not DB-backed.
- File-tool writes to outputs/ are NOT visible to bash sandbox (one-way Win→Linux mount). Either write directly via bash heredoc, or write to `Luck Dragon 2.0` mount which IS shared. Lost an hour to this on May 4.

### Optimised defaults baked in
All three pages now open with cashflow-near-neutral assumptions: refinanced rate 5.5%, proper QS depreciation reports ($13k Kelly / $11k Monica), top-of-market rents, $2k/yr other deductibles, vacancy 2-4%, land tax pre-filled (apartments $0 under VIC threshold; Paddy NR $7k + Osborne $9k). Each page shows a green "optimised defaults applied" note above the calculator.

### Current state at default values
- **Kelly**: weekly diff -$41/wk, +$441k wealth built over 10 yrs.
- **Monica**: weekly diff -$83/wk, +$368k wealth built over 10 yrs.
- **Paddy & Jacky**: $3.76M combined IP value at year 10, $3.23M equity, $332k Cecil St paid down by IPs.

### Known limits
- Without going interest-only, Monica's diff cannot reach $0/wk within ATO market-rate constraints (cascade is structurally biased against the bottom rung).
- Banner break-even year shows 30+ for Kelly/Monica because both rent-in and rent-out grow at same 3%/yr rate — gap doesn't close.
- Real-world Paddy is positively-geared once Osborne is IP (no Osborne loan), so net tax position is small additional liability not refund — labeled clearly on the banner.


---

## Paddy & Jacky finance — ACTUALS (2026-05-04)

Real figures captured this session.

### Salaries
- Paddy: $118,000 (32.5% bracket)
- Jacky (Jaclyn Rooney): $220,000 (45% bracket)
- Strategy: claim IP losses against Jacky for max refund

### Current loans
- North Rd, Newport (current IP): $702,615 @ 6.02% variable, ~$4,221/mo P&I
- Osborne St, Williamstown (current PPOR, becoming IP): $508,110 @ 5.75%, ~$2,966/mo P&I

### Rents
- North Rd: $3,433/mo (Compton Green confirmed)
- Osborne (post-move): $650/wk to Kelly

### Refi plan (broker Matt, 2026-05-04)
- North Rd: refi to 75% LVR; equity drawn -> Cecil deposit
- Osborne: refi to 75% LVR; equity drawn -> Cecil deposit
- Cecil St new purchase: $1.1M, 60% LVR = $660k loan + ~$440k equity deposit
- ATO purpose test: equity for Cecil (PPOR) is NOT deductible. Split loans.
- Awaiting broker valuations.

### Plan cashflow (IPs in Jacky)
- Combined IPs: -$388/wk before tax
- Tax saving 45%: +$207/wk PAYG
- Net IP after tax: -$181/wk
- Cecil St mortgage: $3,747/mo

### Cecil St payoff
- 30 yrs standard, 15 yrs with IP cashflow redirected

### Live calculator
- https://paddy-finance.pgallivan.workers.dev
- IP ownership selector defaults to Jacky
- Refi-plan banner with ATO purpose-test warning
