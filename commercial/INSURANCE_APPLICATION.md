# Insurance Application — Sport Portal

**Action:** Apply at https://www.bizcover.com.au — quote takes 10 min, certificate of currency emailed within 24h.

**What you need:** Cyber Liability + Professional Indemnity (combined policy ~$1,200–$2,000/yr at startup revenue).

---

## Pre-filled answers (paste into BizCover form)

### Business
| Field | Answer |
|---|---|
| Business name | Luck Dragon Pty Ltd (or sole trader if not yet registered — check ASIC) |
| ABN | (your ABN) |
| Business structure | Company / Sole Trader |
| Trading name | School Sport Portal |
| Website | https://schoolsportportal.com.au |
| Business address | (your registered office) |
| Years trading | 1 (started 2025) |
| Number of employees | 1 (sole director / contractor model) |

### Industry & activities
| Field | Answer |
|---|---|
| Industry | Software as a Service (SaaS) — Education |
| ANZSIC code | 7000 — Computer System Design and Related Services |
| Description of services | "Cloud-based sports administration platform for Australian primary and secondary schools. Three products: (1) School Sport Portal — student roster + sport calendar; (2) Carnival Timing — race-day timing app for athletics, swimming, cross-country; (3) SportCarnival — public results page. Schools enter student data once and the platform automates carnival administration, timing, scoring, and results publishing." |
| Annual revenue | $0–$50k (specify actual; year 1) |
| Projected revenue year 2 | $50k–$250k (target: 100 schools × $1/student × ~250 students avg = $25k MRR by EOY 2027) |
| Largest single contract | <$5k (per-school annual fees) |

### Cyber Liability — required answers
| Field | Answer |
|---|---|
| Do you handle personal data? | Yes — student names, dates of birth, year levels, sport results, parent contact emails |
| Do you handle payment data? | No — payments via Stripe; no card data stored on platform |
| Number of personal records held | <50,000 (year 1 estimate) |
| Encryption at rest? | Yes — Cloudflare D1 (encrypted by default), KV (encrypted), R2 (encrypted) |
| Encryption in transit? | Yes — HTTPS only, HSTS enabled, TLS 1.2+ |
| MFA on admin accounts? | Yes — Cloudflare account, GitHub, Stripe all MFA-enforced |
| Backups? | Yes — automated D1 point-in-time recovery, GitHub daily backups |
| Incident response plan? | Yes — see asgard-workers/commercial/INCIDENT_RESPONSE.md (referenced) |
| Sub-processors used? | Cloudflare (hosting), Stripe (payments), Resend (transactional email) |

### Professional Indemnity — required answers
| Field | Answer |
|---|---|
| Type of services | SaaS platform delivery; software development; technical support |
| Do you give advice? | No — platform delivery only; no consulting |
| Highest-risk customer | Schools (consumer-of-record is the school, not parents) |
| Past claims? | None |
| Past circumstances? | None |

### Cover requested
| Cover | Limit | Why |
|---|---|---|
| Cyber Liability | $1,000,000 | Standard SaaS minimum; covers data breach response, regulator fines, business interruption |
| Professional Indemnity | $2,000,000 | Most VIC/NSW DET school business managers ask for $2M minimum |
| Public Liability | $20,000,000 | Often bundled at minimal cost — required if you ever attend a school site to run a carnival |

### Excess
- $1,000–$2,500 cyber excess (lower premium with higher excess; pick $2,500 if cashflow tight)

---

## After you have the certificate
1. Save PDF to `LuckDragonAsgard/asgard-workers/commercial/certificate-of-currency-2026.pdf` (private repo file).
2. Add a line to https://schoolsportportal.com.au/help: *"Insured: Cyber Liability $1M, Professional Indemnity $2M, Public Liability $20M (BizCover, certificate available on request)."*
3. Reply to first cold-pitch email with: *"Certificate of currency attached."*

---

## Alternative providers (if BizCover quote feels off)
- **Tech Insurance Group** — tech-specialist, often cheaper for SaaS
- **Aon Affinity** — higher-end, used by larger SaaS
- **Vero / CGU via your business banker** — slower but bundled with general business

BizCover is fastest first-time and the most common name VIC schools recognise.
