---
name: Continuous handover persistence
description: How to persist progress per Paddy's project instructions — applies to every Claude session in the Luck Dragon 2.0 project
type: feedback
originSessionId: c5ea31e6-58ba-4d41-91df-30d6271f7687
---
When working in Luck Dragon 2.0 project, persist progress as you go (don't wait for end of session, don't ask permission):

- **Material progress** (deploys, decisions, breaking changes) → push to `FALKOR_HANDOVER.md` on GitHub `LuckDragonAsgard/asgard-workers`. Use the Contents API with `Authorization: token $GH_TOKEN` (vault key `GITHUB_TOKEN`).
- **Durable facts** (URLs, deploy gotchas, security details) → POST to `https://falkor-brain.luckdragon.io/remember` with `X-Pin: <AGENT_PIN>`. ⚠ As of 2026-05-05 there's no AGENT_PIN provisioned in the vault — endpoint returns Unauthorized. If still the case, skip this channel and rely on FALKOR_HANDOVER + auto-memory. Tell Paddy if you discover this.
- **Project-specific state** → save to Cowork auto-memory (this folder) as `project_*.md` files.

**Why:** Why: lets the next Claude session (different account, different chat, etc.) pick up where you left off without Paddy re-explaining context.

**How to apply:** Update these continuously during a session, not just at wrap-up. A full session-wrap doc (`docs/handovers/YYYY-MM-DD-session-wrap.md`) is only needed for major architecture pivots, account migrations, or when many breaking changes happened in one session.

**Vault PIN for asgard-vault:** <VAULT_PIN> (X-Pin header). Vault is at `https://asgard-vault.pgallivan.workers.dev/`, list keys at `/secrets`, get one at `/secret/KEY_NAME`.

**Common gotcha when handing over:** if the doc you're trying to push to GitHub contains live secrets/tokens, GitHub's secret scanning will reject the push. Reference vault keys instead of pasting the values.
