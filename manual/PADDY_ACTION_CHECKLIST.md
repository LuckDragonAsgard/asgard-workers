# Paddy — outstanding actions checklist (v2 — 2026-05-05 evening)

After the deep-clean pass, here's the (much shorter) list of items that genuinely need you. Sorted by urgency.

---

## ⚠️ Today / Tomorrow (race day = Thu 7 May)

### 1. Print + brief Thursday backup runbook ⏱ 5 min
- File: [`THURSDAY_BACKUP_RUNBOOK.md`](THURSDAY_BACKUP_RUNBOOK.md)
- Print, hand to your principal or another teacher.

### 2. Submit BizCover insurance application ⏱ 10 min · ~$1.2-2k/yr
- File: [`commercial/INSURANCE_APPLICATION.md`](../commercial/INSURANCE_APPLICATION.md)
- All form fields pre-filled. Apply at https://www.bizcover.com.au.

---

## 📅 This week

### 3. Add 4 DNS records on schoolsportportal.com.au ⏱ 10 min
- File: [`dns_records.md`](dns_records.md)
- Cloudflare dashboard → DNS → Records → Add. The CF API tokens lack DNS:Edit permission so this must be done via dashboard.
- **Mitigation already in place**: I rerouted all email sends to use the *already-verified* `noreply@luckdragon.io` domain with `reply_to: hello@schoolsportportal.com.au`. This means schools see "School Sport Portal" as the sender and can reply to a branded address — but the sending domain is luckdragon.io which already has SPF/DKIM/DMARC. Deliverability is therefore good even without adding the schoolsportportal.com.au records. The records are still nice-to-have for future direct sends from that domain.

### 4. Engage lawyer for DPA review ⏱ 15 min · ~$300
- File: [`commercial/DATA_PROCESSING_AGREEMENT.md`](../commercial/DATA_PROCESSING_AGREEMENT.md)
- LawPath SaaS contract review (~$300, returns marked-up version in 48h).

### 5. Trademark search — 5 min on IP Australia ⏱ 5 min
- File: [`trademark_check.md`](trademark_check.md)
- Soft signal from my search: no famous TMs surface. But IP Australia search is JS-only — must be done in a browser.
- If clear, register class 9 + 42 for "School Sport Portal" via TM Headstart ~$500.

---

## 📅 This month

### 6. Capture WPS quote for case study ⏱ 5 min
- After Thursday's carnival, write yourself 2-3 sentences for [`commercial/WPS_CASE_STUDY.md`](../commercial/WPS_CASE_STUDY.md). Replace `[Quote pending]`.

### 7. Hand out outreach pack at Hobsons Bay debrief (11 May) ⏱ 30 min
- Files: [`commercial/SALES_ONE_PAGER.pdf`](../commercial/SALES_ONE_PAGER.pdf), [`commercial/WPS_CASE_STUDY.pdf`](../commercial/WPS_CASE_STUDY.pdf)
- Print 8 copies, hand-deliver to each Hobsons Bay PE coordinator.

### 8. Identify a backup admin contact ⏱ 30 min
- A second person who could run a carnival in your absence (using the Thursday runbook).

### 9. Set up Stripe Invoicing for tax invoices ⏱ 30 min
- File: [`INVOICING_GUIDE.md`](INVOICING_GUIDE.md)
- Enable Stripe Tax, add your ABN, configure Australian tax invoice template. Recommendation: annual upfront billing, invoiced Term 1.

---

## 📅 Quarter / longer

### 10. Vault redundancy ⏱ 30 min
- Mirror critical secrets to a 1Password vault.

### 11. Separate production CF account ⏱ 2-3 hrs
- Migrate live workers to a new CF account isolated from your dev work.

### 12. SEO + LinkedIn ⏱ 2-3 hrs
- I added structured data (JSON-LD SoftwareApplication, og:image) to schoolsportportal.com.au.
- LinkedIn account in your name as "Founder, School Sport Portal" — connect with PE coordinators.
- Get one .edu.au backlink from WPS (link from school newsletter to /williamstownprimary).

---

## ✅ All these are now done — no action needed

### Engineering
- ✅ ABN verified, GST registered noted
- ✅ Email + password auth + rate limit + lockout + self-serve reset
- ✅ Welcome email after Stripe checkout (rerouted to luckdragon.io for deliverability)
- ✅ Race-day reminder cron
- ✅ Per-carnival rules (max events, relays, manual edit toggle, age strict)
- ✅ Roster CSV import in CT setup
- ✅ Public API rate limiting (60/min on /api/winners, /api/scores)
- ✅ Result un-publish endpoint (admin POST /api/unpublish)
- ✅ Auto-snapshot workers to GitHub daily (asgard-snapshot worker)
- ✅ Service status page (https://asgard-status.pgallivan.workers.dev/)

### Commercial
- ✅ Privacy Impact Assessment (AU-wide + state addenda)
- ✅ Data Processing Agreement
- ✅ Parental consent letter
- ✅ Sales one-pager + WPS case study
- ✅ Outreach list (Hobsons Bay → Western Metro → NSW etc)
- ✅ Pricing card shows $1/student/year inc GST with split called out
- ✅ ToS Section 3+4 updated with explicit GST language ($0.91 ex + $0.09 GST)
- ✅ All emails reroute via luckdragon.io (verified Resend domain) with reply-to schoolsportportal.com.au
- ✅ JSON-LD SoftwareApplication structured data + og:image SVG
- ✅ Favicon, contact form, demo banners, lock-page replacements

### Operational
- ✅ Workers auto-committed to GitHub (cron `0 14 * * *` UTC = midnight AEST)
- ✅ Service status page live + auto-refresh
- ✅ Vault keys: ADMIN_BOOTSTRAP_PIN, CRON_PIN, SNAPSHOT_PIN, PADDY_SSP_PASSWORD

