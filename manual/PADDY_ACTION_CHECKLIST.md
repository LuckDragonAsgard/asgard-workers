# Paddy — outstanding actions checklist

Things only you can do. Sorted by urgency.

---

## Today / Tomorrow (race day = Thu 7 May)

### 1. ✋ Print + brief backup runbook for Thursday
**File:** [`THURSDAY_BACKUP_RUNBOOK.md`](THURSDAY_BACKUP_RUNBOOK.md)
**Action:** Print, hand to your principal or a deputy. If you're sick Thursday they can run the carnival from this card.
**Time:** 5 min

### 2. 🔌 Add SPF / DKIM / DMARC DNS records on schoolsportportal.com.au
**File:** [`dns_records.md`](dns_records.md)
**Action:** Cloudflare dashboard → schoolsportportal.com.au → DNS → Add 4 records (values in the doc).
**Why:** Without these, every email you send (welcome, magic-link, contact form auto-reply) lands in spam folders.
**Time:** 10 min

### 3. 💸 Submit BizCover insurance application
**File:** [`commercial/INSURANCE_APPLICATION.md`](../commercial/INSURANCE_APPLICATION.md)
**Action:** Go to https://www.bizcover.com.au, paste pre-filled answers from the doc. Cyber Liability $1M + Professional Indemnity $2M + Public Liability $20M.
**Why:** First school will ask for your certificate of currency before signing.
**Time:** 10 min · Cost: ~$1,200–$2,000/yr

---

## This week

### 4. ✅ Verify ABN status (DONE — no action needed)
- ABN 64 697 434 898 — **LUCK DRAGON PTY LTD** — Active (Australian Private Company), VIC 3016
- **GST registered from 23 Apr 2026** — see action 5 below

### 5. 💰 Update pricing to break out GST
**Action:** You're now GST-registered. $1/student/year is currently shown as inc-GST. For school invoices it should show ex-GST + GST separately.
- $1.00 inc GST = $0.91 ex GST + $0.09 GST
- Update https://schoolsportportal.com.au pricing card to say "$1/student/year (inc GST)"
- Update ToS Section 3 "All prices include GST" (currently vague: "where applicable")
- Set up your invoicing software (Xero/Stripe) to issue tax invoices showing GST split
**Time:** 30 min — ToS edit + pricing card text. Xero setup separate (1 hour).

### 6. ⚖️ Get DPA reviewed by a lawyer
**File:** [`commercial/DATA_PROCESSING_AGREEMENT.md`](../commercial/DATA_PROCESSING_AGREEMENT.md)
**Action:** Cheapest route: LawPath flat-fee SaaS contract review (~$300). Or LegalVision (~$500). Returns marked-up version in 48–72h.
**Why:** Before first school council signs.
**Time:** 15 min to engage · 2-3 days turnaround

### 7. 📌 Trademark search + registration
**File:** [`trademark_check.md`](trademark_check.md)
**Action:** Search at https://search.ipaustralia.gov.au/trademarks/search/quick — names: "School Sport Portal", "Carnival Timing", "SportCarnival". If clear, register class 9 + class 42 for at least "School Sport Portal" (~$660).
**Time:** 15 min search + 30 min registration form

---

## This month

### 8. 📞 Capture WPS quote (post-7-May)
**File:** [`commercial/WPS_CASE_STUDY.md`](../commercial/WPS_CASE_STUDY.md)
**Action:** After Thursday's carnival, write yourself 2-3 sentences for the case-study quote slot. Replace `[Quote pending]`.
**Time:** 5 min

### 9. 🚀 Hand out outreach pack at Hobsons Bay debrief (11 May)
**Files:** [`commercial/SALES_ONE_PAGER.pdf`](../commercial/SALES_ONE_PAGER.pdf), [`commercial/WPS_CASE_STUDY.pdf`](../commercial/WPS_CASE_STUDY.pdf)
**Action:** Print 8 copies of each, hand to each Hobsons Bay PE coordinator at the next divisional meeting. Offer free Term 3 trial.
**Time:** 30 min printing + meeting

### 10. 👥 Backup admin contact
**Action:** Identify a second person (your principal, or a teacher friend) who could:
   - Run a carnival in your absence (using the Thursday runbook)
   - Get a copy of vault credentials in a sealed envelope
   - Be reachable as a "second contact" on the certificate of currency
**Why:** Sole-point-of-failure today; schools care.
**Time:** 30 min conversation + envelope

---

## Quarter / longer

### 11. 🛡️ Vault redundancy
**Action:** Mirror critical secrets (ADMIN_BOOTSTRAP_PIN, CRON_PIN, GITHUB_TOKEN, CF tokens) to a 1Password vault or similar. If `asgard-vault.pgallivan.workers.dev` ever breaks, you'd be locked out.
**Time:** 30 min

### 12. 🔑 Separate production CF account
**Action:** Sign up a second Cloudflare account just for SSP/CT/SC production. Move (or duplicate) the live workers there. Keeps your dev/personal CF stuff isolated. Reduces blast radius if main account compromised.
**Time:** 2-3 hours migration

### 13. 📈 SEO + LinkedIn
**Action:**
- Write a LinkedIn profile under your name with "Founder, School Sport Portal — built for AU PE teachers". Connect with PE coordinators.
- Add structured data to schoolsportportal.com.au (already partially done)
- Get one .edu.au backlink from WPS (e.g., link from school newsletter to /williamstownprimary)
**Time:** 2-3 hours total

### 14. 📊 Service status awareness
**Action:** When you spot CT going down (your status page is at https://asgard-status.pgallivan.workers.dev/), tweet/email schools proactively. "We're aware, fixing now" beats "users complain to me first".
**Time:** Ongoing

### 15. 💬 Schools' invoicing schedule
**Action:** Decide your billing cycle:
   - Annual upfront (Term 1) — cleanest for accounting
   - Term-by-term (4 invoices/yr) — better cashflow for them, more admin for you
   - Pay on first event — simple for trial
Choose, document on the pricing page, set up Xero recurring invoices.
**Time:** 1 hour decision + 1-2 hours Xero setup

---

## Done already (no action needed)

- ✅ ABN verified, Pty Ltd active, GST registered
- ✅ All commercial pack docs drafted (PIA, DPA, parental consent, case study, sales pack)
- ✅ Insurance application data sheet pre-filled (just submit at BizCover)
- ✅ Email + password auth live with rate limit, lockout, self-serve reset
- ✅ Welcome email after Stripe checkout (auto-fires)
- ✅ Race-day reminder cron (auto-fires when carnival has event_date)
- ✅ Per-carnival rules engine (max events, relays, manual edit toggle)
- ✅ Roster CSV import in CT setup
- ✅ Public API rate limiting
- ✅ Branded magic-link removed → email+password
- ✅ Auto-snapshot workers to GitHub daily
- ✅ Service status page at https://asgard-status.pgallivan.workers.dev/
- ✅ Result un-publish endpoint (admin-only POST /api/unpublish)
- ✅ Favicon, contact form, demo banners, lock-page replacements

