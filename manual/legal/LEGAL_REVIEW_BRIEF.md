# Legal Review Brief — School Sport Portal

**Client:** Luck Dragon Pty Ltd (ABN 64 697 434 898)
**Contact:** Patrick Gallivan, Director · pgallivan@outlook.com · Williamstown VIC 3016
**Date:** 5 May 2026

---

## What I'm asking you to review

I run a SaaS business selling cloud sport-administration software to Australian primary and secondary schools. Three product lines:

1. **School Sport Portal** (schoolsportportal.com.au) — main SaaS, $1/student/year inc GST.
2. **Carnival Timing** (carnivaltiming.com) — race-day timing app, $49 per carnival or $149/year inc GST.
3. **SportCarnival** (sportcarnival.com.au) — public carnival results pages, currently free.

I'm about to start signing schools. **Before the first one signs, I need a senior solicitor to review my contract stack** and tell me what's wrong, what's risky, and what's unenforceable.

## Scope (in priority order)

1. **Data Processing Agreement (DPA)** — the contract that the school signs. Primary review.
2. **Terms of Service** — the consumer-facing terms covering use, payment, refunds, liability.
3. **Privacy Policy** — public-facing data practices statement.
4. **Parental Consent template** — for context only; schools customise it on their letterhead.
5. **Privacy Impact Assessment** — for context only; provided to schools on request.

## Specific questions

### About the DPA (primary)

1. **Controller / processor framing** — I drafted this with the school as data controller and Luck Dragon as data processor. For Victorian DET schools, the *DET itself* is technically the controller. Does my framing still work, or do I need a different version for DET vs Catholic/independent? Should there be a third party (DET) acknowledged as ultimate controller?

2. **Limitation of liability (s 13)** — capped at "amounts paid in 12 months". For a $1/student/year school, that's ~$400. Is that enforceable in Australia for a data-related claim? Should I carry more risk via insurance instead (currently planning Cyber Liability $1M + PI $2M via BizCover)?

3. **Sub-processor changes (s 7)** — 30 days' written notice, opt-out termination. Is "30 days" market-standard, or do AU schools expect 60? What's the exposure if I add a sub-processor without notifying?

4. **Data breach notification (s 8)** — 72 hours, mirrors NDB requirements. Is the 72h commitment realistic and enforceable? What's the standard wording?

5. **Audit rights (s 12)** — once per 12 months, 30 days' notice, school's cost. Is this reasonable, or do schools expect more?

6. **Return + deletion of data (s 11)** — 14 days export + 30 days delete. Adequate?

7. **Cross-border processing (s 10)** — primary in AU; some sub-processors (Resend US, GitHub US for code) hold non-customer data. Sufficient disclosure?

### About the ToS

8. **Refund policy (s 3)** — change-of-mind refund window 14 days for annual, none for per-carnival once code used. Workable under Australian Consumer Law?

9. **GST + tax invoice clause (s 3)** — I'm now GST-registered (effective 23 April 2026). Stripe issues tax invoices automatically. Is the new wording in s 3 ("All prices are in AUD and include 10% GST. Luck Dragon is registered for GST...") accurate and complete?

10. **Limitation of liability (s 10)** — capped to amounts paid in 12 months OR $100. Reasonable, or undermined by ACL guarantees that can't be excluded?

11. **Service availability (s 8)** — no SLA stated. Is this a problem, or is it standard for SaaS at this stage?

12. **Acceptable use (s 5)** — broad enough? Specific enough?

13. **IP assignment (s 9)** — student data remains property of school. Software remains mine. Is the wording clean?

### About the Privacy Policy

14. **APP compliance** — I claim alignment with APPs 1-13. Specifically:
    - APP 8 (cross-border): I have a sub-processor list. Sufficient?
    - APP 11 (security): "encryption at rest + in transit, MFA available". Defensible?
    - APP 12 (access): self-service via admin. Adequate?

15. **Children's privacy (s 8)** — I claim "students do not create accounts; data entered by authorised school staff". Is that enough to discharge my obligations under APPs for a child-data-handling SaaS?

### About parental consent

16. **Default consent model** — I default to "first name + surname-initial" public publication. Schools opt UP to "full surname for representative-level only" or DOWN to "no public publication". Is this defensible without explicit parental opt-in for the default?

## What I have done already

- [DONE] ABN + Pty Ltd + GST registration verified active
- [DONE] Trademark search confirmed names clear (about to register School Sport Portal class 42)
- [DONE] Stripe Tax registration active for AU
- [DONE] DKIM/SPF/DMARC DNS records configured for transactional email
- [DONE] Privacy by design — first-name + surname-initial default, opt-in publication, MFA available, encrypted at rest, AU residency
- [TODO] Cyber + PI insurance — applying via BizCover this week

## What I want from you

A **flat-fee review with marked-up versions of all 5 documents and a short cover letter** flagging anything risky. Ideally returned within 5 business days.

If you think I need more than a fixed-fee review — e.g. structural rewrite of the DPA, or a separate AU-specific version vs an international version — please scope and quote that separately.

## Live URLs (for context)

- https://schoolsportportal.com.au — homepage + pricing
- https://schoolsportportal.com.au/privacy
- https://schoolsportportal.com.au/terms
- https://carnivaltiming.com/privacy
- https://carnivaltiming.com/terms
- https://sportcarnival.com.au/privacy
- https://sportcarnival.com.au/terms
- https://schoolsportportal.com.au/williamstownprimary — example school portal
- https://schoolsportportal.com.au/demo-school — public demo

## Attachments

1. `DATA_PROCESSING_AGREEMENT.pdf` (10 pages)
2. `TERMS_OF_SERVICE.pdf` (6 pages, scraped from live site)
3. `PRIVACY_POLICY.pdf` (5 pages, scraped from live site)
4. `PARENTAL_CONSENT.docx` (editable Word template)
5. `PRIVACY_IMPACT_ASSESSMENT.pdf` (8 pages, for context only)

## Budget

I'm targeting **$300–$800 inclusive** for this review. Recommended providers I'm considering:
- LawPath flat-fee SaaS contract review (~$300)
- LegalVision (~$500)
- Sprintlaw (~$650)

Happy to pay more if the scope warrants.

---

Patrick Gallivan
Luck Dragon Pty Ltd
ABN 64 697 434 898
