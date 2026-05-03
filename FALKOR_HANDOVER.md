# Falkor / Asgard — Session Handover (2026-05-04)

## Who you are talking to
Paddy Gallivan — PE teacher at Williamstown Primary School, runs Kow Brainer Trivia (KBT), developer of the Falkor / Asgard portfolio on luckdragon.io. Casual, delegates fully. AFL fan (Bulldogs).

## What it is
**Asgard Project Hub** at `falkor.luckdragon.io` — operator dashboard for the 48-project portfolio. Per Paddy's `Falkor_Blueprint.md`, this is the operator/admin panel; the personal AI ("Jarvis") features come later.

GitHub source of truth: `LuckDragonAsgard/asgard-workers` — falkor-tools.js (the hub) plus the falkor-* worker fleet.

## Live now at falkor.luckdragon.io

Worker: **falkor-tools v2.3.0** — Asgard-style project hub WITH agentic chat that can read & edit project repos.

Six tabs in the sidebar:
- **📋 Projects** — 48 tile grid; search, filter by category/status, sort by Priority/Cost/Name/Updated/Status. Default sort = priority (income_priority).
- **🕒 Recent** — last 30 projects sorted by last_updated.
- **💰 Finance** — totals (total spend, monthly recurring, avg per project) + per-project cost table.
- **🛠 Tools** — direct links: CF Dashboard, Workers list, DNS, AI Gateway, GitHub repos, Stripe, Vercel, Supabase, Drive, Asgard Vault, Falkor APIs.
- **💬 Chat** — always visible right sidebar.
  - **General chat** (no project selected) → `/api/chat` proxy → asgard-ai (groq-fast, fast).
  - **Project-scoped chat** ("Chat about this" on any tile) → `/api/agent-chat` → **Anthropic Claude Haiku 4.5 with tools**: `list_files`, `read_file`, `write_file` against the project's GitHub repo. The AI can actually browse the repo, read files, and commit edits. Up to 8 tool-use iterations per turn. Tool outputs surface in the chat as `[Listed /docs · Read README.md · Edited foo.md (commit a1b2c3d)]`.
  - On most projects, GitHub commits auto-deploy via GitHub Actions / CF Pages, so an AI edit ships to production.
- **⚙ System** — live worker fleet health (14 workers).

Every project tile → modal with **🌐 Open live · 📦 GitHub · ✏️ Edit code (github.dev) · 💬 Chat about this** plus all metadata (URL, GitHub, Domain, Tech, Status, Priority, Cost, Cost notes, Progress %, Y1/Y2/Y3, Scale, Detail, Updated, Next, Notes, Features).

## Login
- URL: `https://falkor.luckdragon.io`
- PIN (Paddy): `2967` — POSTed to `falkor-push.luckdragon.io/user/verify`
- AGENT_PIN (fleet, X-Pin for inter-worker calls): `JilSS1zLn3Rl7mWrM6fOJc69`
- VAULT_PIN (asgard-vault): `535554`

## Worker fleet (versions live 2026-05-04)
- falkor-tools v2.2.0 (the hub at falkor.luckdragon.io — this repo)
- falkor-agent v2.9.0 (DO + Phase 81 bridge handlers)
- falkor-kbt v2.8.0
- falkor-workflows v3.11.0
- falkor-school v1.5.0
- falkor-sport v1.6.0
- falkor-telegram v1.7.0
- asgard-ai v6.5.0 (LLM router + AI Gateway)
- falkor-brain v1.0.0 (Vectorize RAG)
- falkor-web, falkor-code, falkor-push, falkor-dashboard, falkor-widget — all healthy

## Deploy patterns
- Simple workers (no DO bindings): POST `https://asgard-tools.luckdragon.io/admin/deploy` with `X-Pin: VAULT_PIN`
- Workers with DO/Vectorize bindings (falkor-agent, falkor-kbt, falkor-brain): use CF API multipart PUT directly. Pass `keep_bindings: ["secret_text"]` in metadata. See `deploy_phase81.py` and `deploy_hub_pivot.py` in /outputs for working templates.
- falkor-tools deploy: `python3 deploy_hub_pivot.py` (multipart upload + custom domain bind)
- GitHub Contents API: `LuckDragonAsgard/asgard-workers` (NOT any pgallivan repo)

## Architectural decisions (today's session)
1. **falkor.luckdragon.io now serves the falkor-tools worker** (the project hub). The previous personal-AI Falkor UI (falkor-ui worker) is parked — its DNS was unbound. When we build Jarvis features later, they go on top of this hub or at a separate URL.
2. **CHAT proxy:** browser fetch from falkor.luckdragon.io to asgard-ai.luckdragon.io was returning 503 (browser-specific issue, server-side curl fine). Solution: `/api/chat` on falkor-tools forwards server-side to asgard-ai. Same-origin from the browser's perspective.
3. **No-cache headers:** every HTML response has `Cache-Control: no-store, no-cache, must-revalidate, max-age=0` + `Pragma: no-cache` + `Expires: 0`. Paddy doesn't have to clear cache or hard-refresh.
4. **Saved 4 mascot images** are referenced in Drive (`G:\My Drive\ChatGPT Image May 3, 2026, 08_29_*.png`) — Cavalier King Charles Spaniel character sheets. Not yet embedded in UI; still using 🐉 emoji placeholder.

## How Paddy likes to work
- Casual, direct — no fluff, no post-work summaries
- **Don't auto-save to Drive.** Code/configs/handovers → GitHub. Office files he asks for → present_files only.
- **Never tell him to hard-refresh / clear cache.** Server sends no-cache headers; that's the deploy's job.
- Source of truth = GitHub. Memory in Claude is just an index/aide-memoire.

## Next-up (Jarvis features when ready)
- Per-project CRUD in the modal (POST/PUT to dashboard API to add/edit/delete projects)
- Embed the Cavalier mascot images
- Voice input