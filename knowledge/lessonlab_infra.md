---
name: LessonLab infrastructure architecture
description: DNS, hosting, and CF zone details for LessonLab — critical context for any infra work
type: project
originSessionId: 4355ff86-f53d-4885-8077-2fb19683da16
---
## LessonLab hosting (as of 2026-04-30, updated same day)

**Nameservers updated 2026-04-30** — VentraIP registrar nameservers changed from `ns1/2/3.nameserver.net.au` to `coraline.ns.cloudflare.com` + `renan.ns.cloudflare.com`. Propagation takes up to 1 hour. After propagation, CF zone `3353e2f276434918c4f0056d2ef7be4a` in "Luck Dragon (Main)" will become ACTIVE.

**Live serving**: CF Pages project `lessonlab` in Luck Dragon (Main) account. `www.lessonlab.com.au` → `lessonlab.pages.dev` (registrar CNAME, will be superseded by CF zone once active).

**Once CF zone goes active**: apex redirect (`lessonlab.com.au → www`) and SSL will work automatically. Can then add Worker Custom Domains to `lessonlab.com.au` zone if migrating from Pages to Workers.

**lessonlab.luckdragon.io** → served by `lessonlab` Worker in Luck Dragon (Main), via luckdragon.io zone. Works correctly.

**How to apply:** CF zone activation should complete within 1 hour of 2026-04-30. Verify by checking zone status in CF dashboard or running `dig lessonlab.com.au NS`.
