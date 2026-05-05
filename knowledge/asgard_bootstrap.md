---
name: Asgard bootstrap — fetch this URL at start of every chat
description: Single source of truth for the whole portfolio. On any new session, fetch the Asgard handover URL below before doing anything else — the handover lists every active product (LessonLab, Superleague, etc.) with pointers to per-repo docs/HANDOVER.md files. Replaces the dead project-hub-api.pgallivan.workers.dev reference in user_preferences.
type: reference
originSessionId: a9ea245e-0d68-45d3-8f71-4d7074379599
---
**Bootstrap URL** (public, no auth, works from any Claude account / computer / surface):

`https://raw.githubusercontent.com/PaddyGallivan/asgard-source/main/docs/HANDOVER.md`

**Protocol on every new chat:**

1. Fetch the URL above. The handover is cross-account-safe by design.
2. If Mona names a project (e.g. "LessonLab", "Superleague", "Boothmeup"), find it in the "Portfolio products" section of HANDOVER.md → fetch that repo's `docs/HANDOVER.md` → brief Mona in one paragraph from the latest section.
3. If she doesn't name one, list the active products from the handover and ask "Which project today?" — one line.

**Why:**
The user_preferences in Claude Settings still reference `https://project-hub-api.pgallivan.workers.dev/projects` which is dead. This memory entry is the new bootstrap path.

**How to apply:**
- Use this in place of any old "fetch project-hub-api" instruction.
- Live mutable project state (progress %, next action) lives in Cloudflare D1 `asgard-brain.products`, not in markdown — query via Asgard admin endpoints with X-Pin header.
- Per-project handovers live at `https://github.com/LuckDragonAsgard/<repo>/blob/main/docs/HANDOVER.md` — ALWAYS fetch the per-repo HANDOVER.md before assuming state.
- The full Asgard architecture, auth model, vault details, deploy pipeline are all in the asgard-source HANDOVER.md — fetch it once and follow.

**Per-project HANDOVER known good (2026-04-30):**
- LessonLab: `https://github.com/LuckDragonAsgard/lessonlab/blob/main/docs/HANDOVER.md` (commit `9658078`)
