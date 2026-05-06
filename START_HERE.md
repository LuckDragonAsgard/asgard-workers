# START HERE — Claude setup on pgallivan@outlook.com

Three pastes. Five minutes. Done.

---

## 1. Sign in

Go to **claude.ai** → sign in as **pgallivan@outlook.com**

---

## 2. PASTE #1 — Personal preferences

**Where:** click your initials top-right → Settings → Personal preferences → paste this in the box → Save

```
push to LuckDragonAsgard/asgard-workers/PROFILE.md on GitHub, or in a chat just say "update my profile: <change>" and I'll commit it. Falkor's /profile.md route caches for 60s, so changes appear within a minute.
```

---

## 3. PASTE #2 — Create project + project instructions

**Where:**

1. Left sidebar → **Projects** → **+ New project**
2. Name it: **Luck Dragon 2.0**
3. Click **Set instructions** (or "Project instructions")
4. Paste this in the box → Save

```
At the start of every new chat, silently fetch:
  1. https://falkor.luckdragon.io/profile.md
  2. https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md

Open with a short brief: any in-flight work, then the top 3 items from "Sport Portal — what's NEXT → Immediate". Don't ask which project — wait for me to say.

Persist progress as you go (don't wait for end of session, don't ask permission):
  - Material progress (deploys, decisions, breaking changes) → push to FALKOR_HANDOVER.md on GitHub (LuckDragonAsgard/asgard-workers).
  - Durable facts (URLs, deploy gotchas, security details) → POST to https://falkor-brain.luckdragon.io/remember with X-Pin: <AGENT_PIN from vault>.
  - Project-specific state → save to Cowork auto-memory (project_*.md).

Everything needs to be updated here too: https://falkor.luckdragon.io
```

---

## 4. PASTE #3 — First chat message

**Where:** open a new chat inside the **Luck Dragon 2.0** project → paste this as your first message → send.

```
Hi Claude. I just migrated from a different account.

Please do these three things in order:

1. Fetch https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/MIGRATION.md and save all 14 memory blocks from section E into your auto-memory system, one file per block, using the frontmatter shown.

2. Then fetch https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md and brief me on what's in flight + the top 3 Sport Portal "Immediate" items.

3. Then run this sanity check and report green/red for each:
   - https://falkor.luckdragon.io/profile.md returns 200
   - https://sportcarnival.com.au/wd26 returns 200
   - curl -s -H "X-Pin: <VAULT_PIN>" https://asgard-vault.luckdragon.io/secret/CF_API_TOKEN returns a token starting with cfut_

After that, I'm Paddy Gallivan and we're picking up where the old account left off.
```

That's it. Claude will rebuild memory, brief you, verify the stack — all in one go.

---

## What if something looks weird

You can always re-open this card from any device:

**https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/START_HERE.md**

If a paste looks malformed, copy from the GitHub URL — chat copy buttons sometimes mangle the indentation.

---

## Race day reminder

Thursday 7 May. Phone runs CT timing — Claude isn't on the critical path.
- Access code: **WPS-2026**
- Carnival code (typed on the day): **WD26**
- Tomorrow's dry-run code: **WD26TEST**
- Bibs PDF: https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/wd26/WD26_bibs.pdf
- Live results: https://sportcarnival.com.au/wd26
