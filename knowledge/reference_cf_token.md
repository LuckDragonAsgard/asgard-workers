---
name: Cloudflare API token reference
description: Where the active CF API tokens are stored and what they can do.
type: reference
---

All CF tokens live in the vault. Never paste raw tokens into source files.

Fetch via:
  curl -H "X-Pin: 535554" https://asgard-vault.pgallivan.workers.dev/secret/CF_FULLOPS_TOKEN

Available vault keys:
- CF_FULLOPS_TOKEN — primary working token. Account-scoped Workers/Pages/D1/KV + Zone Settings/Config Rules/Workers Routes/Cache Purge. NO DNS edit.
- CF_API_TOKEN — zone read
- CF_TOKEN_LD — Luck Dragon scoped
- CF_PAGES_TOKEN — Pages edit

asgard-tools deploy endpoint (easier than raw multipart PUT):
  POST https://asgard-tools.luckdragon.io/admin/deploy
  X-Pin: 535554
  body: {"worker_name":"NAME","code_b64":"BASE64","skip_auto_commit":true}

Account ID: a6f47c17811ee2f8b6caeb8f38768c20 (Luck Dragon Main)
Vault PIN: 535554

DNS edit is NOT in any current token. Use Chrome MCP via Cloudflare dashboard for DNS changes.
