---
name: Per-chat scope locks
description: When Paddy declares a chat is for one project only, stay in that project — don't drift into Sport Portal/WD26/finance/etc. even when relevant
type: feedback
originSessionId: d55d6217-b2ed-4be3-8044-3855e3279f98
---
When Paddy says a chat is "only for X" (e.g. "this chat is only for superleague"), restrict ALL subsequent work, status updates, system checks, and recommendations to that project. Do not surface findings or suggest fixes from other projects in the portfolio, even if a "whole-system check" would normally span them.

**Why:** Paddy runs many projects in parallel. Mixing them in one chat creates noise — he opens a chat per project on purpose so context stays focused, and the handover docs work cleanly per-project. Drifting back into the broader portfolio after a scope lock wastes attention.

**How to apply:** When the scope is locked:
- "Whole-system" or "everything" means **everything *within that project*** — not the fleet.
- Do not include other products in HTTP sweeps, bug lists, or status briefs.
- The session-start brief should still pull `falkor.luckdragon.io/profile.md` + `FALKOR_HANDOVER.md` for global context, but the opening summary should focus on the named project.
- If something in another project is genuinely blocking the named project (e.g. asgard-vault is down → SLY can't fetch tokens), flag it briefly — otherwise leave it alone.
