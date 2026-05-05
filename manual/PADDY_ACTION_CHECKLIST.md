# Paddy — outstanding actions checklist (v3 — 2026-05-05 night)

What's left after the latest pass. **8 items — all genuinely you-only.**

---

## ⚠️ Today / tomorrow (race day = Thu 7 May)

### 1. Print Thursday backup runbook ⏱ 5 min
- **Already in your inbox** — I emailed `WD26_Thursday_Runbook.pdf` to pgallivan@outlook.com.
- Print it tomorrow morning, hand to your principal or a deputy.

### 2. Submit BizCover insurance application ⏱ 10 min · ~$1.2-2k/yr
- File: [`commercial/INSURANCE_APPLICATION.md`](../commercial/INSURANCE_APPLICATION.md)
- All form fields pre-filled. Apply at https://www.bizcover.com.au.

---

## 📅 This week

### 3. Engage lawyer for DPA review ⏱ 15 min · ~$300
- File: [`commercial/DATA_PROCESSING_AGREEMENT.md`](../commercial/DATA_PROCESSING_AGREEMENT.md)
- LawPath SaaS contract review (~$300, returns marked-up version in 48h).

### 4. Trademark registration ⏱ 30 min · ~$330–$1,300
- All three names verified clear (zero live conflicts). See [`trademark_check.md`](trademark_check.md) for findings.
- Recommended: register **School Sport Portal** in class 42 first via TM Headstart at https://www.ipaustralia.gov.au.

---

## 📅 This month

### 5. Capture WPS quote for case study ⏱ 5 min
- After Thursday's carnival, write yourself 2-3 sentences for [`commercial/WPS_CASE_STUDY.md`](../commercial/WPS_CASE_STUDY.md). Replace `[Quote pending]`.

### 6. Hand out outreach pack at Hobsons Bay debrief (11 May) ⏱ 30 min
- Files: [`commercial/SALES_ONE_PAGER.pdf`](../commercial/SALES_ONE_PAGER.pdf), [`commercial/WPS_CASE_STUDY.pdf`](../commercial/WPS_CASE_STUDY.pdf)
- Print 8 copies, hand-deliver to each Hobsons Bay PE coordinator.

### 7. Identify a backup admin contact ⏱ 30 min
- A second person who could run a carnival in your absence (using the Thursday runbook).

---

## 📅 Quarter / longer

### 8. LinkedIn presence ⏱ 1 hour
- Profile under your name as "Founder, School Sport Portal — built for AU PE teachers".
- Connect with PE coordinators in Hobsons Bay first, then expand.

---

## ✅ All these are now done

### Hard infrastructure
- ✅ Email + password auth + rate limit (10/5min/IP) + lockout (5/15min) + self-serve forgot/reset
- ✅ Welcome email after Stripe checkout (rerouted to verified luckdragon.io for deliverability)
- ✅ Race-day reminder cron (daily 8am AEST, scans event_date, emails admins)
- ✅ Per-carnival rules (max events, relays toggle, manual edit, position swap, age strict, public publish)
- ✅ Roster CSV import in CT setup
- ✅ Public API rate limiting (60/min on /api/winners, /api/scores)
- ✅ Result un-publish endpoint (`POST /api/unpublish` admin-only)
- ✅ Auto-snapshot 10 production workers to GitHub daily (cron 0 14 * * *)
- ✅ Service status page (https://asgard-status.pgallivan.workers.dev/)

### DNS / email deliverability — all live as of tonight
- ✅ DKIM `resend._domainkey` TXT record on schoolsportportal.com.au
- ✅ SPF MX `send.schoolsportportal.com.au` → feedback-smtp.ap-northeast-1.amazonses.com
- ✅ SPF TXT `send.schoolsportportal.com.au` → v=spf1 include:amazonses.com ~all
- ✅ DMARC TXT `_dmarc.schoolsportportal.com.au` → v=DMARC1; p=none; rua=mailto:paddy@luckdragon.io
- ✅ Resend domain registered (verifies in 1-24h once DNS fully propagates)

### Commercial pack
- ✅ ABN + Pty Ltd verified, **GST registered from 23 Apr 2026**
- ✅ Pricing card shows $1/student/year inc GST with $0.91 ex + $0.09 GST split
- ✅ ToS Section 3 + 4 across all 3 sites updated with explicit GST language
- ✅ Stripe configured: business URL fixed, account.tax_code set, recurring price + one-time price + Williamstown Primary test customer + sample $440 invoice (in_1TTcG2)
- ✅ Trademark search done — all 3 names clear
- ✅ Privacy Impact Assessment + DPA + parental consent + WPS case study + sales pack
- ✅ JSON-LD SoftwareApplication structured data + og:image for SSP homepage

### Operational
- ✅ Vault keys: ADMIN_BOOTSTRAP_PIN, CRON_PIN, SNAPSHOT_PIN, PADDY_SSP_PASSWORD
- ✅ Daily worker snapshots to GitHub
