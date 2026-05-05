# Data Processing Agreement — School Sport Portal

**Between:**
- **The School** — [SCHOOL NAME], ABN [SCHOOL ABN], of [SCHOOL ADDRESS] (the "**Data Controller**")
- **Luck Dragon Pty Ltd**, ABN [LD ABN], of [LD ADDRESS] (the "**Data Processor**" / "**SSP**")

**Effective:** From the date the School first authenticates an admin account on the platform.

This Data Processing Agreement ("**DPA**") is the counterpart to the platform Terms of Service and Privacy Policy. Where there is conflict, this DPA prevails for matters of personal-information handling.

---

## 1. Definitions

- **Personal Information** has the meaning given in the *Privacy Act 1988* (Cth) and the Australian Privacy Principles.
- **Notifiable Data Breach** ("**NDB**") has the meaning given in Part IIIC of the Privacy Act.
- **Sub-processor** means any third party engaged by SSP to process Personal Information on behalf of the School.
- **Services** means the School Sport Portal, Carnival Timing, and SportCarnival platforms operated by SSP.

---

## 2. Roles

The School is the **Data Controller** of Personal Information of its students, staff, and parents.

SSP is the **Data Processor**, processing Personal Information solely on the documented instructions of the School and only for the purposes set out in § 4.

---

## 3. Personal Information processed

| Category | Data subjects | Examples |
|---|---|---|
| Student information | Students enrolled at the School | Name, year level, year of birth, house, sport results |
| Staff information | School-nominated admins/coaches | Name, work email, role, password hash |
| Parent information (optional) | Parents/guardians of enrolled students | Name, email, linkage to one or more students |

No sensitive information (as defined in s 6 of the Privacy Act) is collected. No government identifier (TFN, USI, Medicare, ATSI status) is collected. No payment card detail is collected (Stripe handles payments).

---

## 4. Permitted purposes

SSP processes Personal Information solely to:
1. Provide the Services.
2. Communicate with school admins about the Services.
3. Maintain platform security, integrity, and audit logs.
4. Produce **de-identified, aggregate** product analytics (e.g. "schools active this term").

SSP **will not**:
- Use Personal Information for marketing to students or parents.
- Sell, trade, or commercially license any Personal Information.
- Use Personal Information to train AI/ML models without separate written consent from the School.
- Combine the School's data with that of any other school for any purpose other than aggregate analytics.

---

## 5. Confidentiality

SSP and any individual authorised to access the Personal Information will maintain confidentiality during and after the term of this DPA. Access is restricted to personnel who require it to deliver the Services (currently: the sole director of Luck Dragon Pty Ltd).

---

## 6. Security measures

SSP applies technical and organisational measures including:
- Encryption of Personal Information **at rest** (Cloudflare D1, KV, R2 — AES-256).
- Encryption **in transit** (TLS 1.2+, HSTS enforced).
- Access control via HMAC-signed bearer tokens with short expiry.
- MFA on the SSP operational accounts (Cloudflare, GitHub, Stripe, Resend).
- Audit logging of admin actions (90-day retention).
- Regular dependency-vulnerability scanning.
- Backups with point-in-time recovery (D1) and 30-day retention.
- Incident response procedure (see § 8).

---

## 7. Sub-processors

SSP may engage Sub-processors. The current list:

| Sub-processor | Purpose | Country | Contractual safeguard |
|---|---|---|---|
| Cloudflare Inc. | Hosting, D1, KV, R2 | Primary AU; replication AU only | Cloudflare DPA + SOC 2 Type II + ISO 27001 |
| Stripe Australia Pty Ltd | School payments | AU | Stripe DPA + PCI DSS Level 1 |
| Resend Inc. | Transactional email (adult addresses only) | US | Resend DPA + SOC 2 Type II |
| GitHub Inc. (Microsoft) | Source code repository — no customer data | US | Microsoft DPA |

SSP will provide **30 days' written notice** before adding or replacing a Sub-processor. The School may terminate this DPA without penalty within that window if it reasonably objects to the new Sub-processor.

---

## 8. Data breach notification

In the event of a confirmed or reasonably suspected unauthorised access to or disclosure of School Personal Information:

1. SSP will notify the School's nominated privacy contact within **72 hours** of becoming aware.
2. The notification will include: nature of the breach, categories of data and approximate number of records affected, likely consequences, measures taken or proposed.
3. SSP will provide reasonable cooperation and forensic detail to enable the School to assess "serious harm" under the NDB scheme and meet its OAIC and individual notification obligations.
4. SSP will preserve relevant logs and artefacts for at least 12 months.

---

## 9. Data subject requests

If SSP receives a request from a data subject (parent, student, staff member) to access, correct, or delete their Personal Information, SSP will refer them to the School and assist the School in responding within the statutory timeframe (30 days under APP 12).

The School can self-serve access, correction, and deletion via the platform admin tools.

---

## 10. Data residency and cross-border disclosure

Primary processing of School Personal Information takes place in Cloudflare's **Sydney (AU)** region. Replication is restricted to Australian regions.

The Sub-processors listed in § 7 marked "US" handle either no Personal Information (GitHub — code only) or only adult email addresses (Resend — for transactional sends).

SSP will not transfer School Personal Information outside Australia for any other purpose without the School's prior written consent.

---

## 11. Return and deletion of data

On expiry, termination, or written request:

- SSP will export all School Personal Information to CSV (or JSON, on request) and provide it to the School within **14 days**.
- SSP will then delete all School Personal Information from the platform, including backups, within a further **30 days**, with written confirmation of deletion provided to the School.
- Audit logs and minimum records required by law may be retained for the statutory period in encrypted form.

---

## 12. Audit

The School (or its appointed independent auditor) may audit SSP's compliance with this DPA on **30 days' written notice**, no more than **once per 12 months**, at a mutually agreed time, at the School's cost. SSP will reasonably cooperate with the audit and may satisfy audit requests by providing copies of its Sub-processors' SOC 2 / ISO 27001 reports where the audit subject is covered.

---

## 13. Liability

SSP's aggregate liability under this DPA is limited to the amounts paid by the School to SSP in the **12 months preceding** the event giving rise to the claim, except liability that cannot be limited at law (including for fraud, wilful breach, and personal injury or death).

Each party indemnifies the other against losses arising from that party's breach of the *Privacy Act 1988* (Cth) directly attributable to that party.

---

## 14. Term and termination

This DPA continues for so long as SSP holds School Personal Information. Either party may terminate on **30 days' written notice**. The data return-and-deletion process in § 11 applies on termination.

---

## 15. Governing law

This DPA is governed by the laws of the State of Victoria, Australia. The parties submit to the non-exclusive jurisdiction of the courts of Victoria.

---

## 16. Signatures

**The School**
| | |
|---|---|
| Name | |
| Position | |
| Signature | |
| Date | |

**Luck Dragon Pty Ltd**
| | |
|---|---|
| Name | Patrick Gallivan |
| Position | Director |
| Signature | _signed_ |
| Date | |

---

## Appendix A — Privacy Officer contacts

**School:**
- Name: ________________________________
- Email: ________________________________
- Phone: ________________________________

**SSP:**
- Name: Patrick Gallivan
- Email: privacy@schoolsportportal.com.au
- Phone: (on file)

---

*Document version 1.0 — May 2026. Schools should review with their legal counsel before signing. Template revisions tracked at https://github.com/LuckDragonAsgard/asgard-workers/blob/main/commercial/DATA_PROCESSING_AGREEMENT.md*
