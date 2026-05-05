---
name: Root-cause before patching, verify effect after deploying
description: For SLY (and all Paddy's projects) — never patch a symptom without finding the root cause; never claim a fix is done without proving the effect on served output
type: feedback
originSessionId: be36c02c-b248-4baf-8037-d9cc8c7655b9
---
Before changing CSS/JS that looks defensive (mix-blend-mode, !important, guard clauses, threshold checks), read the surrounding 30 lines AND any nearby comments. If the code reads like a workaround, identify what it's masking. Don't remove the workaround until the underlying bug is fixed (or confirmed gone).

After any worker deploy, do not stop at "deploy returned 200". Fetch the served output (or the new endpoint) and verify the actual effect of the change. The reload-loop bug, the white-rectangle "fix", and the multiply-blend regression all happened because I deployed and assumed.

If a session feels like solving the same problem that was solved before — STOP. Read the prior commit, read the existing code, find why the fix didn't stick. Don't keep slapping new patches on top.

**Why:** Paddy spent a month going in circles on these projects partly because Claude kept patching symptoms. Multiple sessions, multiple "fixes", same bugs re-surface — because the root cause investigation never happened.

**How to apply:** Apply on every code change in SLY/Asgard/Family Hub etc. Especially relevant when (a) touching CSS rules with `!important`, (b) modifying anything that looks like a workaround/fallback, (c) bumping versions, (d) shipping anything that depends on a runtime check (poller, version compare, feature flag). Always pair the change with a verification that EXERCISES the behaviour, not just inspects a 200 status code.

Companion to this: there should be a `sly-checks.py` smoke-test script in the SLY repo. After every deploy, run it. Add a check to it whenever a new class of bug is found.
