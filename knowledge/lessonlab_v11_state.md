---
name: LessonLab v11 — current state and follow-ups
description: Snapshot of LessonLab project at end of 2026-04-30 session. v11 lesson plan template fully shipped across 10 subjects + tokenised blanks + v11 generator wired into app.html. Use HANDOVER.md as source of truth — this memory is just the quick-orient pointer.
type: project
originSessionId: a9ea245e-0d68-45d3-8f71-4d7074379599
---
**Source of truth:** https://github.com/LuckDragonAsgard/lessonlab/blob/main/docs/HANDOVER.md (commit `9658078` 2026-04-30). Always fetch this first before assuming state.

**Current state (end of 2026-04-30 session):**
- v11 lesson plan template locked, VTLM 2.0 compliant, 3 A4 pages
- 10 subjects shipped with example .docx + per-subject build_*_v11_example.js
- 10 tokenised TEMPLATE blanks shipped (133 `{{tokens}}` each)
- `docs/TOKEN-MAP.md` — full token reference (the generator API)
- `docs/VTLM-2.0-mandate-checklist.md` — element-by-element compliance audit
- `app.html` — `exportToWordV11()` button wired, fetches per-subject blank from GitHub raw, fills tokens, downloads. MVP: first lesson only.
- `gh-push` worker repaired (bearer at vault `/secret/GH_PUSH_BEARER`).
- Drive deprecated — everything in GitHub now.

**Why:** Mona iterated PE template v6→v11 over 2026-04-27, shipped 9 more subjects 2026-04-29, generator wiring 2026-04-30. VTLM 2.0 mandated start of 2028 school year.

**How to apply:** When Mona returns to LessonLab, fetch HANDOVER.md and brief from there. Don't re-derive state from D1 or Drive — repo is canonical.

**Open follow-ups (in priority order):**
1. **Multi-lesson v11 export** — `exportToWordV11()` currently emits only first lesson; rest of term plan silently dropped. Needs to either loop blanks (one docx per lesson, zip together) or stitch document.xml bodies into one combined docx.
2. **Extend `generateLesson()` in app.html** to emit richer fields the v11 tokens need: vocabulary tiers, sentence stems, metacog prompts, cohort prompts (EAL/D, Koorie, disability, disadvantage), worked example, retrieval plan. Currently they fall back to defaults in `_v11TokenMap()`.
3. **Port v6/v7 PE lessons forward** to v11 shape (~931 lessons in lessonlab-api D1).
4. **More year levels per subject** — currently one year per subject as proof of shape (F, Y1-Y6 across 10 subjects = 70 lessons to fill out).

**Build orchestrator pattern:** `templates/_build/orchestrate_subjects.py` (examples) and `templates/_build/orchestrate_blanks.py` (blanks). Edit `templates/_build/subject_configs*.py` to add a new subject; rerun orchestrator; push via `templates/_build/push_subjects.py` with ONLY/SKIP env vars.

**Word zip-fix:** EVERY docx built must have `[Content_Types].xml` at zip position 0 — Word refuses files where it isn't. The orchestrators apply this automatically. If hand-building, use `reorder_zip()` from orchestrate_subjects.py.
