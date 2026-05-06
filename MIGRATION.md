# Claude Account Migration Pack — mona.seddon → pgallivan@outlook.com

**Built:** 2026-05-05 22:57 AEST
**For:** Paddy Gallivan
**Old account (cancelled):** monacastle.seddon@gmail.com
**New account:** pgallivan@outlook.com
**Drive (already on new account):** pgallivan@outlook.com
**Canonical raw URL of this file (works from any Claude account):**
https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/MIGRATION.md

---

## TL;DR — fastest path on the new account (5 minutes)

1. Sign in to claude.ai as **pgallivan@outlook.com**
2. **Settings → Personal preferences** → paste section A below
3. Create a project named **"Luck Dragon 2.0"** → **Project instructions** → paste section B below
4. In your first chat in the new project, paste section C as the very first message — it will rebuild Claude's memory
5. Reinstall Cowork desktop app on the new account if you want desktop control again (the app is per-account)
6. Done. The new Claude will fetch Falkor and FALKOR_HANDOVER.md on first message and pick up exactly where this one left off.

The good news: nothing important lives inside Claude. Your real state is all in GitHub + Cloudflare + Falkor — and those are account-independent. This migration is just rebuilding your *Claude UI* on the new account.

---

## A. Personal preferences (paste into Settings → Personal preferences)

```
push to LuckDragonAsgard/asgard-workers/PROFILE.md on GitHub, or in a chat just say "update my profile: <change>" and I'll commit it. Falkor's /profile.md route caches for 60s, so changes appear within a minute.
```

---

## B. Project instructions for "Luck Dragon 2.0" (paste into Project Instructions)

```
At the start of every new chat, silently fetch:
  1. https://falkor.luckdragon.io/profile.md  — who I am + how I work
  2. https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md  — current state

Open with a short brief: any in-flight work, then the top 3 items from "Sport Portal — what's NEXT → Immediate". Don't ask which project — wait for me to say.

Persist progress as you go (don't wait for end of session, don't ask permission):
  - Material progress (deploys, decisions, breaking changes) → push to FALKOR_HANDOVER.md on GitHub (LuckDragonAsgard/asgard-workers).
  - Durable facts (URLs, deploy gotchas, security details) → POST to https://falkor-brain.luckdragon.io/remember with X-Pin: <AGENT_PIN from vault>.
  - Project-specific state → save to Cowork auto-memory (project_*.md).

If unsure where something belongs, ask. Otherwise just do it.

Everything needs to be updated here too
https://falkor.luckdragon.io
```

---

## C. First-message memory seed (paste as your very first message in the new project)

> Hi Claude — I just migrated from a different account. Please save the following 14 items to memory verbatim using your auto-memory system. Each block is one memory file. After you've saved them all, fetch the Asgard bootstrap URL and brief me on what's in flight.

(Then paste section E below — the full memory dump. The new Claude will write each block to its own memory file.)

---

## D. Cross-account bootstrap URLs (memorise these, they work from any Claude / any computer)

| What | URL |
|---|---|
| **Asgard portfolio handover** (master) | https://raw.githubusercontent.com/PaddyGallivan/asgard-source/main/docs/HANDOVER.md |
| **Falkor profile** (who you are + how Claude should work) | https://falkor.luckdragon.io/profile.md |
| **Falkor handover** (current portfolio state) | https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md |
| **Falkor brain — remember** (POST durable facts) | https://falkor-brain.luckdragon.io/remember (header `X-Pin: <PADDY_PIN>`) |
| **Falkor dashboard** | https://falkor.luckdragon.io |
| **Vault — read any secret** | `curl -s -H "X-Pin: <VAULT_PIN>" https://asgard-vault.luckdragon.io/secret/<NAME>` |
| **CF API token (live)** | vault key `CF_API_TOKEN` (fetch via vault — not embedded in this doc for security) |
| **PADDY_PIN** | `<VAULT_PIN>` |
| **CF Account ID** (Luck Dragon Main) | `a6f47c17811ee2f8b6caeb8f38768c20` |
| **GitHub orgs** | `LuckDragonAsgard` (primary), `PaddyGallivan` (legacy) |

---

## E. Memory dump — 14 files to seed into the new account

Each block below is one memory file. Tell the new Claude: *"Save each of these to a separate memory file with the given name and frontmatter."* Or just paste this whole document into the new chat and ask Claude to do it.

### MEMORY.md (the index)

```markdown
- [User identity](user_identity.md) — user is Paddy Gallivan (pgallivan@outlook.com), not Mona; always address as Paddy
- [Asgard bootstrap](asgard_bootstrap.md) — fetch this URL on every new chat for portfolio state
- [LessonLab v11 state](lessonlab_v11_state.md) — current state + open follow-ups for the LessonLab project
- [LessonLab infra](lessonlab_infra.md) — DNS/hosting architecture: zone is PENDING, Pages serves www, Worker serves luckdragon.io
- [GitHub-first storage rule](feedback_storage_first.md) — Drive deprecated; everything lives in GitHub + CF
- [Cloudflare API token](reference_cf_token.md) — asgard-fullops token in vault, used for CF automation
- [Sport Portal current state](project_sport_portal_state.md) — engineering all done; insurance + DPA + parental consent are blockers to first sale
- [Family Hub deploy rule](feedback_family_hub_deploy.md) — always include D1 binding (DB, abcbe15d) in CF PUT metadata or env.DB silently disappears
- [File sharing via Drive](feedback_file_sharing.md) — always upload files to Google Drive (pgallivan@outlook.com), never use present_files from local session path
- [SLY outstanding requests](sly_outstanding_requests.md) — full backlog for SLY Fantasy AFL app; read at start of every SLY session
- [Per-chat scope locks](feedback_chat_scope.md) — when Paddy says "this chat is only for X", stay in X; "whole-system" means within X, not the portfolio
- [Root-cause before patching](feedback_root_cause_first.md) — never patch a symptom without finding root cause; verify the effect of every deploy, not just the 200 status
- [WD26 District XC state](wd26_state.md) — race day Thu 7 May 2026; bibs PDF in Drive; /wd26 R{} is bib-name source of truth
- [Paddy & Jacky finances](paddy_jacky_finance.md) — real loans, salaries, refi plan; do not ask Paddy these — read this first
```

> **NOTE:** the new Claude will be on a fresh Cowork install with empty memory. The 14 files below contain the full content. Just ask Claude to save them all.

---

### 1. user_identity.md

```markdown
---
name: User identity
description: The person using this Cowork session is Paddy Gallivan, not Mona — always address them as Paddy
type: user
---
The Cowork account is registered to Mona (monacastle.seddon@gmail.com) but the person actually using it is **Paddy Gallivan** (pgallivan@outlook.com / paddy@luckdragon.io).

Always address the user as Paddy, never Mona.
```

> **MIGRATION NOTE:** as of 2026-05-05 the new account IS pgallivan@outlook.com — so the name confusion is resolved. Keep this memory but update the framing.

---

### 2. asgard_bootstrap.md

```markdown
---
name: Asgard bootstrap — fetch this URL at start of every chat
description: Single source of truth for the whole portfolio. On any new session, fetch the Asgard handover URL below before doing anything else — the handover lists every active product (LessonLab, Superleague, etc.) with pointers to per-repo docs/HANDOVER.md files. Replaces the dead project-hub-api.pgallivan.workers.dev reference in user_preferences.
type: reference
---
**Bootstrap URL** (public, no auth, works from any Claude account / computer / surface):

`https://raw.githubusercontent.com/PaddyGallivan/asgard-source/main/docs/HANDOVER.md`

**Protocol on every new chat:**

1. Fetch the URL above. The handover is cross-account-safe by design.
2. If Paddy names a project (e.g. "LessonLab", "Superleague", "Boothmeup"), find it in the "Portfolio products" section of HANDOVER.md → fetch that repo's `docs/HANDOVER.md` → brief Paddy in one paragraph from the latest section.
3. If he doesn't name one, list the active products from the handover and ask "Which project today?" — one line.

**Why:**
The user_preferences in Claude Settings still reference `https://project-hub-api.pgallivan.workers.dev/projects` which is dead. This memory entry is the new bootstrap path.

**How to apply:**
- Use this in place of any old "fetch project-hub-api" instruction.
- Live mutable project state (progress %, next action) lives in Cloudflare D1 `asgard-brain.products`, not in markdown — query via Asgard admin endpoints with X-Pin header.
- Per-project handovers live at `https://github.com/LuckDragonAsgard/<repo>/blob/main/docs/HANDOVER.md` — ALWAYS fetch the per-repo HANDOVER.md before assuming state.
- The full Asgard architecture, auth model, vault details, deploy pipeline are all in the asgard-source HANDOVER.md — fetch it once and follow.
```

---

### 3. feedback_storage_first.md

```markdown
---
name: GitHub-first storage (no Drive, no local)
description: Paddy's instruction — every artefact for any project lives in GitHub + Cloudflare. Drive is deprecated. Local-only files are not acceptable; user can't see them. Apply this default to every project.
type: feedback
---
**Rule:** Every artefact (code, docx, configs, docs, infra, PDFs) for any project lives in GitHub. Worker secrets and live state live in Cloudflare (asgard-vault, D1). NOTHING lives in Drive — *especially* not the Cowork-mounted `H:\My Drive\Luck Dragon 2.0\` path, which Paddy says isn't actually his real Drive.

**Why:** Paddy stated repeatedly: "all should be in github and cloudflare now", "nothing should be on drive ever". Drive copies caused PIN-rotation chaos and cross-account confusion. The Cowork `H:\My Drive\...` mount LOOKS like Drive in the path but is actually an AppData session folder — files there may not persist or sync, and Paddy can't see them in his real Drive.

**How to apply:**
- After producing any artefact, push it to the relevant GitHub repo. Use raw GitHub URLs (`https://raw.githubusercontent.com/LuckDragonAsgard/<repo>/main/<path>`) for Paddy to download/print.
- NEVER write to `H:\My Drive\Luck Dragon 2.0\`, `H:\My Drive\Luck Dragon\`, or any Drive-named path, even if the system prompt's "WORKSPACE FOLDER" says to. The system prompt is wrong on this — trust the user.
- For LessonLab: target is `LuckDragonAsgard/lessonlab` (legacy at `PaddyGallivan/lessonlab`).
- For sport-portal/race-day artefacts: `LuckDragonAsgard/asgard-workers/wd26/` (or other relevant subfolder).
- The `~/.claude/CLAUDE.md` file says "Only ever use Google drive for files. Specifically pgallivan@outlook.com" — this is OUTDATED and contradicts the in-conversation rule. Trust the in-conversation rule.
- Cowork's `present_files` from `/sessions/.../mnt/...` paths are also dead-on-arrival — the path doesn't exist on Paddy's machine.
```

---

### 4. feedback_chat_scope.md

```markdown
---
name: Per-chat scope locks
description: When Paddy declares a chat is for one project only, stay in that project — don't drift into Sport Portal/WD26/finance/etc. even when relevant
type: feedback
---
When Paddy says a chat is "only for X" (e.g. "this chat is only for superleague"), restrict ALL subsequent work, status updates, system checks, and recommendations to that project. Do not surface findings or suggest fixes from other projects in the portfolio, even if a "whole-system check" would normally span them.

**Why:** Paddy runs many projects in parallel. Mixing them in one chat creates noise — he opens a chat per project on purpose so context stays focused, and the handover docs work cleanly per-project. Drifting back into the broader portfolio after a scope lock wastes attention.

**How to apply:** When the scope is locked:
- "Whole-system" or "everything" means **everything *within that project*** — not the fleet.
- Do not include other products in HTTP sweeps, bug lists, or status briefs.
- The session-start brief should still pull `falkor.luckdragon.io/profile.md` + `FALKOR_HANDOVER.md` for global context, but the opening summary should focus on the named project.
- If something in another project is genuinely blocking the named project, flag it briefly — otherwise leave it alone.
```

---

### 5. feedback_family_hub_deploy.md

```markdown
---
name: Family Hub deploy — always include D1 binding in metadata
description: CF Workers API PUT without explicit D1 binding silently wipes it; must include binding in every deploy
type: feedback
---
Always include the D1 binding in CF worker deploy metadata, or `env.DB` will be undefined and all DB routes crash with 1101.

**Why:** CF Workers API PUT replaces bindings with whatever is in `metadata.bindings`. Omitting DB binding silently removes it. This caused the Family Hub login/invite/register routes to crash (env.DB was undefined) while GET routes appeared to work (they hit `if (!user) return 401` before touching DB).

**How to apply:** Every deploy must include all non-secret bindings. Secrets (secret_text) are preserved automatically; D1, KV, R2 are NOT. Account ID = `a6f47c17811ee2f8b6caeb8f38768c20`.

**Known worker bindings:**
- `family-hub`: D1 `DB` (id `abcbe15d-9a98-4e01-82eb-c82a0acd1443`) + R2 `PHOTOS` (bucket `family-hub-photos`)
- `sly-api`: D1 `DB` (id `8d0b8373-40ea-4174-bfd9-628b790abf92`)
- `sly-app`: KV `SLY_STATIC` (namespace_id `4f427724561e48f682d4a7c6153d7124`)

Use Python requests (not curl) for large files. Confirm with GET /bindings after every deploy.
```

---

### 6. feedback_file_sharing.md

```markdown
---
name: File sharing — always use Google Drive (legacy)
description: NOTE: This memory is now superseded by feedback_storage_first.md (GitHub-first). Kept for historical context only.
type: feedback
---
**SUPERSEDED by feedback_storage_first.md.** The in-effect rule is GitHub-first; Drive is deprecated. This memory only exists to remind you that the OLD rule was "always upload to Drive" — if you see a chat that pre-dates 2026-05-04, that's why.
```

---

### 7. feedback_root_cause_first.md

```markdown
---
name: Root-cause before patching, verify effect after deploying
description: For SLY (and all Paddy's projects) — never patch a symptom without finding the root cause; never claim a fix is done without proving the effect on served output
type: feedback
---
Before changing CSS/JS that looks defensive (mix-blend-mode, !important, guard clauses, threshold checks), read the surrounding 30 lines AND any nearby comments. If the code reads like a workaround, identify what it's masking. Don't remove the workaround until the underlying bug is fixed (or confirmed gone).

After any worker deploy, do not stop at "deploy returned 200". Fetch the served output (or the new endpoint) and verify the actual effect of the change. The reload-loop bug, the white-rectangle "fix", and the multiply-blend regression all happened because I deployed and assumed.

If a session feels like solving the same problem that was solved before — STOP. Read the prior commit, read the existing code, find why the fix didn't stick. Don't keep slapping new patches on top.

**Why:** Paddy spent a month going in circles on these projects partly because Claude kept patching symptoms. Multiple sessions, multiple "fixes", same bugs re-surface — because the root cause investigation never happened.

**How to apply:** Apply on every code change in SLY/Asgard/Family Hub etc. Especially relevant when (a) touching CSS rules with `!important`, (b) modifying anything that looks like a workaround/fallback, (c) bumping versions, (d) shipping anything that depends on a runtime check (poller, version compare, feature flag). Always pair the change with a verification that EXERCISES the behaviour, not just inspects a 200 status code.

Companion to this: there should be a `sly-checks.py` smoke-test script in the SLY repo. After every deploy, run it. Add a check to it whenever a new class of bug is found.
```

---

### 8. reference_cf_token.md

```markdown
---
name: Cloudflare API token (asgard-fullops)
description: Active CF API token minted 2026-04-27 with Zone:Edit + DNS:Edit + Workers Routes:Edit (all zones) + Workers Scripts:Edit (Luck Dragon Main). Use this for all CF automation, NOT the older Workers-only token.
type: reference
---
**⚠️ Older tokens may be STALE/REVOKED** — never embed CF tokens in chats or docs. Always fetch fresh from vault.

**Working token:** Fetch from vault (canonical store):
```
curl -s -H "X-Pin: <VAULT_PIN>" https://asgard-vault.luckdragon.io/secret/CF_API_TOKEN
```
Token confirmed working 2026-05-02. Vault is the source of truth — never paste the value into git or chats.

**asgard-tools has CF_API_TOKEN in env** — use `asgard-tools /admin/deploy`, `/admin/patch`, `/admin/add-d1-binding`, `/admin/kv-write` for CF operations without needing the raw token.

**PADDY_PIN:** `<VAULT_PIN>` — restored to `asgard-vault` env binding 2026-05-02 (was missing after Falkor migration). Both `asgard-vault.luckdragon.io` and `asgard-vault.pgallivan.workers.dev` work.

**Account:** `Luck Dragon (Main)` — `a6f47c17811ee2f8b6caeb8f38768c20`
```

---

### 9. lessonlab_infra.md

```markdown
---
name: LessonLab infrastructure architecture
description: DNS, hosting, and CF zone details for LessonLab — critical context for any infra work
type: project
---
## LessonLab hosting (as of 2026-04-30)

**Nameservers updated 2026-04-30** — VentraIP registrar nameservers changed from `ns1/2/3.nameserver.net.au` to `coraline.ns.cloudflare.com` + `renan.ns.cloudflare.com`. Propagation takes up to 1 hour. After propagation, CF zone `3353e2f276434918c4f0056d2ef7be4a` in "Luck Dragon (Main)" will become ACTIVE.

**Live serving**: CF Pages project `lessonlab` in Luck Dragon (Main) account. `www.lessonlab.com.au` → `lessonlab.pages.dev` (registrar CNAME, will be superseded by CF zone once active).

**Once CF zone goes active**: apex redirect (`lessonlab.com.au → www`) and SSL will work automatically. Can then add Worker Custom Domains to `lessonlab.com.au` zone if migrating from Pages to Workers.

**lessonlab.luckdragon.io** → served by `lessonlab` Worker in Luck Dragon (Main), via luckdragon.io zone. Works correctly.
```

---

### 10. lessonlab_v11_state.md

```markdown
---
name: LessonLab v11 — current state and follow-ups
description: Snapshot of LessonLab project at end of 2026-04-30 session. v11 lesson plan template fully shipped across 10 subjects + tokenised blanks + v11 generator wired into app.html. Use HANDOVER.md as source of truth — this memory is just the quick-orient pointer.
type: project
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

**Open follow-ups (priority order):**
1. **Multi-lesson v11 export** — `exportToWordV11()` currently emits only first lesson; rest of term plan silently dropped.
2. **Extend `generateLesson()` in app.html** to emit richer fields the v11 tokens need.
3. **Port v6/v7 PE lessons forward** to v11 shape (~931 lessons in lessonlab-api D1).
4. **More year levels per subject** — currently one year per subject as proof of shape.

**Word zip-fix:** EVERY docx built must have `[Content_Types].xml` at zip position 0 — Word refuses files where it isn't.
```

---

### 11. paddy_jacky_finance.md

```markdown
---
name: Paddy & Jacky property finances
description: Real loan balances, rates, salaries, and the May 2026 refi plan for Cecil St purchase. Saved so future sessions don't have to ask again.
type: project
---
## Salaries (May 2026)
- **Paddy**: $118,000 → 32.5% marginal bracket
- **Jacky** (Jaclyn Rooney): $220,000 → 45% marginal bracket
- **Implication**: any IP loss should be claimed against Jacky for max tax saving (45% vs 32.5%)

## Current loans (pre-refi)
- **North Rd, Newport** (current IP): $702,615 @ 6.02% variable. Rent: $3,433/mo confirmed
- **Osborne St, Williamstown** (current home): $508,110 @ 5.75%

## Broker Matt's valuations (2026-05-04, Macquarie)
- North Rd: $1,206,000
- Osborne St: $719,000 (came in MUCH lower than estimated $1.1M)
- Cecil St (purchase): $1,102,000

## Final refi plan — 80/80/80 strategy (no LMI)
- North Rd refi to 80% LVR: $964,800 (drawing $261,800 equity for Cecil)
- Osborne refi to 80% LVR: $575,200 (drawing $73,200 equity, becomes IP)
- Cecil St new loan at 80% LVR: $881,600 + $223k cash deposit + $65k stamp
- Total: $1,216,600 vs need $1,170,000 → surplus ~$46,600
- NO LMI — all three exactly at 80% LVR
- Lender: Macquarie

## ATO purpose test (CRITICAL)
- Loading up IPs does NOT save tax — equity drawn for Cecil PPOR is NOT deductible
- Macquarie to set up split-loan structure to clearly separate deductible from non-deductible
- Actual tax saving comes from Osborne flipping OO→IP, NOT from refi structure

## Cecil St — already purchased, 30-day settlement (May 2026)
- Purchase: $1,102,000 + Stamp $65,000 + Repairs ~$15k + Settlement extras ~$5k + Tenant prep ~$7k + Move ~$7k

## Live calculator
- https://paddy-finance.pgallivan.workers.dev — all defaults updated to actuals 2026-05-04
- IP ownership selector defaults to Jacky for best tax outcome
```

---

### 12. project_sport_portal_state.md

```markdown
---
name: Sport Portal current state (post 2026-05-05 commercial pack v1.0)
description: Current commercial + engineering state — engineering shipped, commercial pack v1.0 drafted, only insurance + legal review remain before first sale
type: project
---
# Sport Portal — state as of 2026-05-05

## Engineering: 100% off Firebase, all audit criticals shipped
- All 4 sites (SSP/CT/SC/SP) have 0 Firebase mentions in served HTML
- /williamstowndistrict rewritten with email magic-link auth + D1-backed scores/users
- carnival-results v1.2.0 has /auth/* + /api/scores + /api/users + /api/winners
- carnival-timing-ws Firebase mirror removed (D1 sole archive)
- ssp-portal serves /schoolsportportal-nav.js
- sportcarnival-hub v3.2.1 fixed comma-operator bug
- CF Email Obfuscation toggled OFF on sportportal.com.au zone

## Vault additions
- `STAFF_SESSION_SECRET` — HMAC for /williamstowndistrict bearer-token sessions
- `CF_FULLOPS_TOKEN` — `asgard-fullops-2026-05-04`

## Commercial readiness — pack v1.0 DRAFTED 2026-05-05
All 6 items have a v1.0 draft on GitHub at `LuckDragonAsgard/asgard-workers/commercial/` (8 files):
1. INSURANCE_APPLICATION.md — pre-filled BizCover sheet. **PADDY ACTION: submit at bizcover.com.au**
2. PRIVACY_IMPACT_ASSESSMENT.md — APPs base + state addenda + Catholic/independent notes
3. PARENTAL_CONSENT.md — letter + signed-form. Pilot at next WPS carnival
4. DATA_PROCESSING_AGREEMENT.md — controller/processor, AU residency, NDB 72h. **PADDY ACTION: legal review**
5. WPS_CASE_STUDY.md — quote slot pending, real numbers post-7 May
6. SALES_ONE_PAGER.md + OUTREACH_LIST.md — 6-ring concentric plan, Ring 1 = 8 Hobsons Bay schools

**Active blockers reduced to 4:** (a) BizCover submission, (b) DPA legal review, (c) WPS quote post-race-day, (d) PDF rendering for emailing.

## Race day infra (Thu 7 May 2026 — district XC) — 100% green
- sportcarnival.com.au/wd26 live (23 KB, no Firebase)
- carnival-timing-html v8.7.1 has 📋 Pick name picker (no-bibs fallback)
- ct-access WPS-2026 validates as ssp/WPS
- carnival-timing-ws DO ponging
- D1 archive auto-populated by carnival-timing-ws on publish
- Bib PDF + roster + dry-run plan in `LuckDragonAsgard/asgard-workers/wd26/`
- WD26 carnival code typed into CT app on race morning per checklist
```

---

### 13. sly_outstanding_requests.md

```markdown
---
name: SLY outstanding requests
description: All outstanding/pending user requests for the SLY Fantasy AFL app — updated each session so nothing gets lost
type: project
---
## Current state (2026-05-05)
App: https://superleague.streamlinewebapps.com — sly-app v5.24. Repo `LuckDragonAsgard/superleague-yeah-v4` HEAD `356c6153`. `python3 sly-checks.py` from repo root for post-deploy verification.

R9 locks Thu 7 May 8:30 UTC — first fully-automated scoring round on the new system. Cron runs every minute, computes scores via position-specialist formula from Supabase match_player_stats. R9 row, fixtures (8 games / 16 coaches), all bindings, all crons, all auth gates verified clean.

D1 has all 25 rounds correctly typed (16 H2H + 5 HS R12-R16 + 4 Final R21-R24).

**2026-05-05 afternoon — data normalization:** 11 players `position='MID'` → `'MIDFIELDER'`; 11 short-codes → full club names; injury "Samuel Cumming" patched. Net: 0 orphans, 0 short-codes, 0 non-canonical positions.

## Scoring formula (position-specialist)
SG=10G+B, G1/G2=6G+B, R=½H+½D+M, M=4M, T=4T, D1/D2=D

## Outstanding (Paddy's jobs)
- Chase 16 coaches for $50 league fee — mark via Fund tab
- Autopick: nobody opted in yet — appears on Fund tab when they do, mark $5 paid there
- Gold tier UI — build when first person pays (setGoldMember() already in SPA)

## App URLs & access
- App: https://superleague.streamlinewebapps.com
- API: https://sly-api.luckdragon.io
- KV namespace: 4f427724561e48f682d4a7c6153d7124
- D1: sly D1 id 8d0b8373-40ea-4174-bfd9-628b790abf92
- PIN: <VAULT_PIN>
```

---

### 14. wd26_state.md

```markdown
---
name: WD26 District XC race-day state
description: Williamstown District XC carnival 7 May 2026 — physical-bib status, deliverables, and known data drift
type: project
---
**WD26 = Williamstown District Cross Country, Thursday 7 May 2026, McIvor Reserve Yarraville. 192 runners, 6 races, 8 schools (incl. Sacred Heart TBC).**

**Why:** Top 10 of each race progress to Divisionals 28 May at Werribee Racecourse. Spectator: sportcarnival.com.au/wd26.

**How to apply:**
- /wd26 R{} dictionary embedded in worker is the SOURCE OF TRUTH for bib→runner mapping. If FALKOR_HANDOVER.md disagrees, the page is correct.
- Bib 124 = Banjo Kane *Williamstown North PS* (NOT WPS) — different student from bib 189 Banjo Kane *WPS*.
- WPS 11 Boys are bibs 125-128 (Henry Fielding, Ned Hedditch, Kai Morgan, Bernie MacLeod). Not 124-127.
- Sacred Heart bibs (13-16, 45-48, 77-80, 109-112, 141-144, 173-176) are TBC placeholders.

**Physical bibs in GitHub** `LuckDragonAsgard/asgard-workers/wd26/`:
- WD26_bibs.pdf — 192 numbered cards, 4/A4, school-coloured stripe
- WD26_roster.pdf — 1 page per race for finish-line marshal
- DRYRUN_TUESDAY.md — runbook for Tue 5 May test using throwaway code `WD26TEST`

**Race-day flow:** Open carnivaltiming.com → access code `WPS-2026` → create carnival `WD26` → XC → marshal mode → bib entry → publish each race → /wd26 renders live with ✓ Qual badges.
```

---

## F. What you DO NOT need to migrate

These are account-independent and continue working unchanged:

| What | Why it survives the migration |
|---|---|
| All GitHub repos (LuckDragonAsgard/*, PaddyGallivan/*) | GitHub login is separate from Claude |
| Cloudflare Workers, D1, KV, R2 | CF login is separate; PADDY_PIN unchanged |
| asgard-vault | Independent worker; PIN <VAULT_PIN> still works |
| Falkor brain + dashboard | Independent worker; profile.md still served |
| Google Drive (pgallivan@outlook.com) | Already on the right account |
| Domain ownership (luckdragon.io, sportcarnival.com.au, lessonlab.com.au, etc.) | Registrar accounts are separate |
| Live products (SLY, LessonLab, Sport Portal, paddy-finance, etc.) | All hosted on CF, no Claude dependency |
| Stripe, BizCover, AusPost, Outlook accounts | Independent logins |

---

## G. What ISN'T worth migrating (let it die)

- The **Cowork session memory files** on the old account's `C:\Users\monac\AppData\...` path — these are cached locally and you can't move them between Cowork installations. Section E rebuilds them on the new account.
- **Claude.ai chat history** on the old account — there's no export-and-import path between accounts. If there's a specific chat you want, archive it as a doc to GitHub before the cancellation completes.
- **TaskList state** — these live per-session, not portfolio-wide.
- **Plugin configs in Cowork** — reinstall on the new Cowork install; they're free and quick to add.

---

## H. Race-day specific (read this if 7 May is approaching)

- WD26 race day is **Thursday 7 May 2026** — you don't need Claude for race day. The CT app on your phone runs the timing. The /wd26 page renders results live.
- Access code: **WPS-2026** (typed into ct-access on race morning)
- Carnival code: **WD26** (typed into CT app to create the carnival on the day)
- Bibs PDF: https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/wd26/WD26_bibs.pdf
- Dry-run code (Tue 5 May): **WD26TEST**

---

## I. Sanity checklist after switching accounts

In the new Claude on pgallivan@outlook.com, ask Claude to do this once:

```
1. Fetch https://falkor.luckdragon.io/profile.md and confirm I am Paddy Gallivan.
2. Fetch https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md and brief me on the last hour of activity.
3. Run `curl -s -H "X-Pin: <VAULT_PIN>" https://asgard-vault.luckdragon.io/secret/CF_API_TOKEN` and confirm it returns a token starting with `cfut_`.
4. Fetch https://sportcarnival.com.au/wd26 and confirm it returns 200.
5. Confirm you've saved all 14 memory files from the migration pack.
```

If all 5 come back green, the migration is done.

---

## J. Emergency contacts for race day

- Paddy phone (CT timing app runs here) — already saved
- Falkor dashboard: https://falkor.luckdragon.io
- Status page: https://asgard-status.luckdragon.io
- Vault PIN: **<VAULT_PIN>**
- WPS access code: **WPS-2026**

---

*End of migration pack. Built 2026-05-05 22:57 AEST. Tuesday before race day. You've got this.*
                                                   