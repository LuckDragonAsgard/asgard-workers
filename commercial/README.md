# Commercial Pack — Sport Portal

This folder is the commercial-readiness pack for **School Sport Portal** (and the related Carnival Timing + SportCarnival products). Everything a school business manager, principal, privacy officer, or peer PE coordinator might ask for is in here.

## Contents

| File | Audience | Purpose |
|---|---|---|
| [`INSURANCE_APPLICATION.md`](INSURANCE_APPLICATION.md) | Paddy (internal) | Pre-filled BizCover application data — apply once, attach certificate to other docs |
| [`PRIVACY_IMPACT_ASSESSMENT.md`](PRIVACY_IMPACT_ASSESSMENT.md) | School privacy officer / business manager | PIA covering APPs + state addenda (VIC, NSW, QLD, WA, etc.) |
| [`PARENTAL_CONSENT.md`](PARENTAL_CONSENT.md) | Parents (via school) | Letter + signed-form template for sending home before public results |
| [`DATA_PROCESSING_AGREEMENT.md`](DATA_PROCESSING_AGREEMENT.md) | School business manager / principal | Counterparty contract to platform Terms of Service |
| [`WPS_CASE_STUDY.md`](WPS_CASE_STUDY.md) | Peer PE coordinator | Williamstown Primary reference customer story |
| [`SALES_ONE_PAGER.md`](SALES_ONE_PAGER.md) | Cold-pitch email attachment | Problem / solution / pricing / proof |
| [`OUTREACH_LIST.md`](OUTREACH_LIST.md) | Paddy (internal) | Concentric-ring sales plan + email templates |

## Status (May 2026)

| Item | Status | Owner | Next |
|---|---|---|---|
| Insurance | **Drafted — ready to apply** | Paddy | Submit BizCover application |
| PIA template | **Drafted v1.0** | Paddy | Send to first interested school for feedback |
| Parental consent | **Drafted v1.0** | Paddy | Use at WPS for the next carnival as a pilot |
| DPA template | **Drafted v1.0** | Paddy | One legal review pass before first signature |
| WPS case study | **Drafted v1.0 — quote pending** | Paddy | Confirm quote with himself (PE Coordinator @ WPS) post-7 May carnival |
| One-pager | **Drafted v1.0** | Paddy | Render to PDF for emailing |
| Outreach list | **Drafted v1.0** | Paddy | Hand-deliver Ring 1 at Hobsons Bay debrief 11 May |

## How to render to PDF (for emailing)

```bash
# from repo root
for f in commercial/SALES_ONE_PAGER commercial/WPS_CASE_STUDY commercial/PRIVACY_IMPACT_ASSESSMENT commercial/DATA_PROCESSING_AGREEMENT commercial/PARENTAL_CONSENT; do
  pandoc "$f.md" -o "$f.pdf" --pdf-engine=weasyprint -V geometry:margin=2cm
done
```

Or paste each file into Google Docs → Download as PDF for a quick one-off.

## Versioning

- v1.0 — 2026-05-05 — initial pack drafted (this commit).
- Subsequent revisions tracked via git history.
