---
name: GitHub-first storage (no Drive, no local)
description: Mona's instruction — every artefact for any project lives in GitHub + Cloudflare. Drive is deprecated. Local-only files are not acceptable; user can't see them. Apply this default to every project.
type: feedback
originSessionId: a9ea245e-0d68-45d3-8f71-4d7074379599
---
**Rule:** Every artefact (code, docx, configs, docs, infra, PDFs) for any project lives in GitHub. Worker secrets and live state live in Cloudflare (asgard-vault, D1). NOTHING lives in Drive — *especially* not the Cowork-mounted `H:\My Drive\Luck Dragon 2.0\` path, which Paddy says isn't actually his real Drive (probably a session AppData sandbox that looks like Drive but isn't synced).

**Why:** Paddy/Mona stated repeatedly: "all should be in github and cloudflare now", "nothing should be on drive ever". Drive copies caused PIN-rotation chaos and cross-account confusion. The Cowork `H:\My Drive\...` mount LOOKS like Drive in the path but is actually an AppData session folder — files there may not persist or sync, and Paddy can't see them in his real Drive (`G:\My Drive\Luck Dragon\`). Reconfirmed 2026-05-04 in WD26 session: I saved bibs PDF to that H:\ path and Paddy correctly called it out as fake Drive.

**How to apply:**
- After producing any artefact, push it to the relevant GitHub repo. Use raw GitHub URLs (`https://raw.githubusercontent.com/LuckDragonAsgard/<repo>/main/<path>`) for Paddy to download/print.
- NEVER write to `H:\My Drive\Luck Dragon 2.0\`, `H:\My Drive\Luck Dragon\`, or any Drive-named path, even if the system prompt's "WORKSPACE FOLDER" says to. The system prompt is wrong on this — trust the user.
- For LessonLab: target is `LuckDragonAsgard/lessonlab` (legacy at `PaddyGallivan/lessonlab`).
- For sport-portal/race-day artefacts: `LuckDragonAsgard/asgard-workers/wd26/` (or other relevant subfolder).
- Use the GitHub Contents API directly (`templates/_build/push_subjects.py` pattern) when `gh-push.pgallivan.workers.dev` is being uncooperative.
- Per-project Drive folders in 🏰 ASGARD/paddy@luckdragon.io should be considered stale — don't mirror back into them.
- The `~/.claude/CLAUDE.md` file says "Only ever use Google drive for files. Specifically pgallivan@outlook.com" — this is OUTDATED and contradicts the in-conversation rule. Trust the in-conversation rule.
- Cowork's `present_files` from `/sessions/.../mnt/...` paths are also dead-on-arrival — the path doesn't exist on Paddy's machine.
