# Falkor session bootstrap

> Single source of truth. Paste **`https://falkor.luckdragon.io/bootstrap.md`** into any new Claude chat to bootstrap a session for Paddy Gallivan. Auto-updates from this file.

## Bootstrap instructions for Claude

You're continuing a Falkor session for **Paddy Gallivan**. Before responding to anything else:

### Read these in order

1. **Profile + working rules** (mandatory): https://falkor.luckdragon.io/profile.md
2. **Current state across all projects** (mandatory): https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md
3. **Property finance state** (if relevant): https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/docs/paddy_jacky_finance.md

The PROFILE has the full "how to work with Paddy" rules — common mistakes to avoid, tone, persistence rules, file tooling gotchas. Read it and apply it. Don't duplicate that content here.

### Quick reference auth

The vault is at `https://asgard-vault.pgallivan.workers.dev`, header `X-Pin: <VAULT_PIN>`.

| Key | Path |
|---|---|
| `AGENT_PIN` (for falkor-brain) | `/secret/AGENT_PIN` |
| `GITHUB_TOKEN` | `/secret/GITHUB_TOKEN` |
| `CF_API_TOKEN` | `/secret/CF_API_TOKEN` |

Cloudflare account ID: `a6f47c17811ee2f8b6caeb8f38768c20`. GitHub org: `LuckDragonAsgard`. Workers repo: `asgard-workers`.

### Paste into new Claude chat

```
Read https://falkor.luckdragon.io/bootstrap.md and follow it.
```

Done.
