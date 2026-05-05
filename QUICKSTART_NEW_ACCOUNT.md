# QUICKSTART — pgallivan@outlook.com Claude setup

**Read me on your phone before you log into the new account.** Full pack at:
https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/MIGRATION.md

---

## 5-minute setup

**Step 1.** Sign in to claude.ai as **pgallivan@outlook.com**

**Step 2.** Settings → Personal preferences → paste this:

> push to LuckDragonAsgard/asgard-workers/PROFILE.md on GitHub, or in a chat just say "update my profile: <change>" and I'll commit it. Falkor's /profile.md route caches for 60s, so changes appear within a minute.

**Step 3.** Create a project named **Luck Dragon 2.0** → Project instructions → paste this:

> At the start of every new chat, silently fetch:
>   1. https://falkor.luckdragon.io/profile.md  — who I am + how I work
>   2. https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md  — current state
>
> Open with a short brief: any in-flight work, then the top 3 items from "Sport Portal — what's NEXT → Immediate". Don't ask which project — wait for me to say.
>
> Persist progress as you go (don't wait for end of session, don't ask permission):
>   - Material progress (deploys, decisions, breaking changes) → push to FALKOR_HANDOVER.md on GitHub (LuckDragonAsgard/asgard-workers).
>   - Durable facts (URLs, deploy gotchas, security details) → POST to https://falkor-brain.luckdragon.io/remember with X-Pin: <AGENT_PIN from vault>.
>   - Project-specific state → save to Cowork auto-memory (project_*.md).
>
> If unsure where something belongs, ask. Otherwise just do it.
>
> Everything needs to be updated here too
> https://falkor.luckdragon.io

**Step 4.** Open a new chat in that project. Send Claude this single message:

> Fetch https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/MIGRATION.md and save all 14 memory files in section E to your auto-memory system, one file each with the given frontmatter. Then fetch the Asgard handover and brief me.

That's it. Five minutes, max.

---

## What survives the migration unchanged

GitHub repos. Cloudflare Workers. asgard-vault. Falkor. Google Drive. Domains. Stripe. SLY. LessonLab. Sport Portal. WD26 race-day infra. None of those care which Claude account you're on.

## What dies with the old account

Old Cowork session memory files (rebuilt by step 4 above). Claude.ai chat history (no export path between accounts). TaskList state (per-session anyway). Cowork plugin configs (reinstall on new Cowork — quick).

---

## Race day reminder (Thu 7 May 2026)

You don't need Claude for race day. Phone runs CT timing.

- Access code: **WPS-2026**
- Carnival code (typed on the day): **WD26**
- Bibs: https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/wd26/WD26_bibs.pdf
- Live results: https://sportcarnival.com.au/wd26
- Tomorrow's dry-run code: **WD26TEST**

---

## If anything looks off

```
curl -s -H "X-Pin: 535554" https://asgard-vault.luckdragon.io/secret/CF_API_TOKEN
```

If that returns a `cfut_*` token, your whole stack still works. The Claude UI is just the steering wheel.

You've got this, Paddy.
