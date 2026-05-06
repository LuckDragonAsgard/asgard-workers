# New chat / new account bootstrap — read this first

You are Claude, picking up Paddy Gallivan's portfolio of work mid-stream. Read this whole file before doing anything.

---

## Who you are talking to

**Paddy Gallivan** — primary-school PE teacher at Williamstown Primary School (Vic), runs Williamstown District sport, founder of **Luck Dragon Pty Ltd** (ABN 64 697 434 898, GST registered from 23 Apr 2026). Solo director.

- Email: **pgallivan@outlook.com** (primary) / paddy@luckdragon.io
- Phone: 0466 651 720
- Note: the Cowork account may be registered to "Mona" / monacastle.seddon@gmail.com — that's incidental. Always address the user as **Paddy**.

## Active projects

| Project | URL / repo | Status |
|---|---|---|
| **Sport Portal** (commercial SaaS) | schoolsportportal.com.au · carnivaltiming.com · sportcarnival.com.au | Engineering 100% complete, commercial pack drafted, going to first paying school. **Most active**. |
| **LessonLab v11** | lessonlab.com.au | Live |
| **KBT Trivia** (Kow Brainer Trivia) | falkor-kbt.luckdragon.io | v11.2 live |
| **SLY Fantasy AFL** | superleague.streamlinewebapps.com | v4.28 live |
| **Family Finance pages** | paddy-finance.pgallivan.workers.dev (+ kelly + monica) | Live |
| **Family Hub** | family-hub.pgallivan.workers.dev | Live |
| **Bomber Boat** | bomberboat.com.au | Live |

## Bootstrap routine (every new chat)

1. **Pull the canonical handover** — `https://raw.githubusercontent.com/LuckDragonAsgard/asgard-workers/main/FALKOR_HANDOVER.md` (no auth needed).
2. **Pull the profile** — `https://falkor.luckdragon.io/profile.md` (60s cache).
3. **Read THIS file** if you're a brand-new Claude account that hasn't built up local Cowork auto-memory.
4. Open with a short brief from the handover, then ask Paddy what he wants to focus on.

## Persistence layers (where to read/write)

| Layer | URL / location | What's there | Auth |
|---|---|---|---|
| **GitHub primary** | `LuckDragonAsgard/asgard-workers` | Source of truth: code snapshots, FALKOR_HANDOVER, manual/, commercial/, knowledge/ | `GITHUB_TOKEN` from vault |
| **GitHub secondary** | `LuckDragonAsgard/sportportal`, `…/schoolsportportal`, `…/sportcarnival-hub`, `…/sport-carnival`, `…/district-sport`, `…/wps-athletics-2026`, `…/clubhouse` | Per-product source repos | same |
| **Falkor brain** | `https://falkor-brain.luckdragon.io/remember` (POST) | Durable facts: "Sport Portal commercial pack v1.0 drafted", URLs, deploy gotchas | `X-Pin: JilSS1zLn3Rl7mWrM6fOJc69` |
| **Asgard vault** | `https://asgard-vault.pgallivan.workers.dev/secret/<KEY>` (GET) | All secrets — CF tokens, Stripe, GitHub, password hashes, etc. | `X-Pin: <VAULT_PIN>` |
| **Cowork auto-memory** | `LuckDragonAsgard/asgard-workers/knowledge/` (GitHub mirror) | Local-account memories — user identity, feedback, project states. Mirrored from auto-memory. | GitHub token |
| **CF Workers** | live at *.workers.dev / custom domains | Production code | `CF_FULLOPS_TOKEN` from vault |
| **CF D1** | `4c39e40c-b6ca-40db-83bb-e8c69bad6537` | Carnival results, users, scores, auth_tokens, password_reset_tokens, auth_attempts, division_winners, carnivals | via `CF_FULLOPS_TOKEN` |

## How Paddy likes to work

- **Casual, direct, no fluff, no post-work summaries.**
- Delegates fully — just do it.
- Don't clutter Drive — everything lives in GitHub + Cloudflare.
- Handovers/status docs → THIS GitHub repo (`LuckDragonAsgard/asgard-workers/FALKOR_HANDOVER.md`).
- Check GitHub before assuming worker state.
- Never tell him to hard-refresh or clear cache. Send no-cache headers from the server.
- Root-cause before patching: never patch a symptom without finding root cause; verify the effect of every deploy, not just the 200 status.
- AFL Bulldogs fan.

## Storage policy

**Drive is deprecated.** Default save location: GitHub `LuckDragonAsgard/asgard-workers`. Office files only when explicitly asked. Workers / configs / handovers / knowledge / commercial pack / legal pack — all GitHub.

## Key URLs (always 200)

- https://schoolsportportal.com.au — main SaaS site
- https://carnivaltiming.com — race-day timing app
- https://sportcarnival.com.au — public results / demo
- https://sportcarnival.com.au/wd26 — Williamstown District XC live
- https://falkor.luckdragon.io — Paddy's Falkor UI
- https://asgard-status.pgallivan.workers.dev/ — service status (8/8 services)
- https://asgard-snapshot.pgallivan.workers.dev/ — daily worker snapshot

## Key vault keys

| Key | What it does |
|---|---|
| `CF_FULLOPS_TOKEN` | CF API token, has Workers/D1/KV/Pages, but NO DNS edit |
| `CF_API_TOKEN` | older CF token, zone read |
| `CF_TOKEN_LD` | Luck Dragon scoped CF token |
| `GITHUB_TOKEN` | GH PAT for LuckDragonAsgard org |
| `RESEND_API_KEY` | Resend (email) |
| `STRIPE_SECRET_KEY` | Stripe (live key — be careful) |
| `STAFF_SESSION_SECRET` | HMAC for /williamstowndistrict sessions |
| `ADMIN_BOOTSTRAP_PIN` | for /auth/admin-bootstrap on carnival-results |
| `CRON_PIN` | for /cron/race-day-reminders manual trigger |
| `SNAPSHOT_PIN` | for asgard-snapshot manual trigger |
| `PADDY_SSP_PASSWORD` | Paddy's SSP login password |
| `AGENT_PIN` | falkor-brain X-Pin (literal: `JilSS1zLn3Rl7mWrM6fOJc69`) |

Vault read: `curl -H "X-Pin: <VAULT_PIN>" https://asgard-vault.pgallivan.workers.dev/secret/<KEY>`

## Race day Thursday 7 May 2026 (UPCOMING)

Williamstown District Cross-Country at McIvor Reserve, Yarraville. 192 runners, 8 schools, 6 races. WD26 carnival code, WPS-2026 access code. /wd26 page is the public live results URL. Race-day reminder cron fired test on 5 May. Backup runbook PDF emailed to Paddy + saved at `manual/THURSDAY_BACKUP_RUNBOOK.md`.

## Sport Portal — what's actually pending

After 2 days of sustained work, only these remain (all need Paddy personally):

1. **Submit BizCover insurance** — `commercial/INSURANCE_APPLICATION.md` has all answers pre-filled
2. **Send the legal review pack to a lawyer** — `manual/legal/SchoolSportPortal_Legal_Review_Pack.zip`, recommendation: LawPath ~$300
3. **Register "School Sport Portal" trademark** in class 42 — IP Australia search confirmed clear, ~$330 via TM Headstart
4. **Run the WD26TEST dry-run** today (Tuesday 5 May)
5. **Print the Thursday backup runbook PDF** (in his inbox), hand to principal
6. **Capture WPS quote** post-7-May for the case study (`commercial/WPS_CASE_STUDY.md`)
7. **Hand-deliver outreach pack** at Hobsons Bay debrief 11 May
8. **LinkedIn presence** as "Founder, School Sport Portal"

Everything else is built and deployed. See `manual/PADDY_ACTION_CHECKLIST.md` for the full canonical list.

## What's been done (last 48h)

The full chronicle is in `FALKOR_HANDOVER.md`. Highlights:

- Email + password auth with rate limit, lockout, self-serve reset (replaced magic link)
- Per-carnival rules engine (max events, relays, manual edits, age strict)
- Roster CSV import in CT setup
- Branded welcome email after Stripe checkout
- Race-day reminder cron (daily 22:00 UTC)
- Public API rate limiting
- Result un-publish endpoint
- 11 legal/trust pages on each site (privacy, terms, cookies, subprocessors, security, sla, accessibility, child-safety, about, changelog, modern-slavery)
- /.well-known/security.txt RFC 9116
- Branded 404 pages
- DNS records for email deliverability (DKIM, SPF, DMARC) added via Chrome MCP
- Stripe Tax + ABN configured, sample invoice generated with GST split
- Trademark search confirmed all 3 names clear
- Daily worker snapshots to GitHub
- Public service status page
- Commercial pack: PIA, DPA, parental consent, WPS case study, sales one-pager, outreach list, insurance app data sheet
- Legal review pack with cover memo + 5 PDFs ready to email to a lawyer
