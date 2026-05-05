# Invoicing & GST setup — recommendation

## TL;DR

**Use Stripe Invoicing for SSP school invoices** (Stripe → Dashboard → Billing → Invoicing). It's free, handles GST automatically, schools get a real PDF tax invoice, payment via card OR bank transfer with a single link.

**Recommended cycle:** Annual upfront, Term 1 each year. Cleanest for school accounts payable, fewest invoices for you.

---

## Why Stripe over Xero or manual

| | Stripe Invoicing | Xero | Manual PDF |
|---|---|---|---|
| Setup time | 30 min | 2-3 hours | 0 (just type) |
| Cost | 1.7% + 30¢ AUD per paid invoice | $35–70/mo | Free but painful |
| GST handling | Auto-calculated and shown on invoice | Auto if configured | Manual (error-prone) |
| Payment options | Card, Apple Pay, BPAY (via Stripe Billing) | Bank transfer mostly | Bank transfer mostly |
| Recurring invoices | Yes (subscriptions) | Yes | No (re-create each year) |
| ATO-compliant tax invoice | Yes, includes ABN + GST | Yes | If you remember all fields |
| Schools' AP teams familiar with it | Increasingly yes | Very yes | Yes |

**Verdict:** Stripe for first 20 schools. Switch to Xero only when you have an actual bookkeeper or >$50k MRR.

## Setup checklist

### Stripe Dashboard side (15 min)

1. Stripe Dashboard → **Settings** → **Business** → confirm:
   - Business name: **Luck Dragon Pty Ltd**
   - ABN: **64 697 434 898**
   - Address: VIC 3016
2. Stripe → **Tax** → enable **Stripe Tax** (free; auto-calculates GST):
   - Origin: Australia, VIC
   - Tax IDs: ABN 64 697 434 898 (GST registered: yes, from 23 Apr 2026)
3. Stripe → **Branding** → upload Luck Dragon logo (or School Sport Portal logo) so it appears on the invoice PDF
4. Stripe → **Tax forms** → confirm Australian tax invoice template is selected (showing ABN + GST split)

### Per-school invoice flow

1. Stripe → **Billing** → **Customers** → New Customer
   - Name: e.g. "Williamstown Primary School"
   - Email: business manager's email
   - Tax ID: school ABN (optional — for B2B)
   - Address: school address
2. Stripe → **Invoices** → New Invoice
   - Customer: that school
   - Item: `School Sport Portal — annual subscription, [N] students × $1.00 inc GST`
   - Quantity: number of enrolled students
   - Price: $1.00 (Stripe Tax handles GST split)
   - Memo: "Term 1 [year] to Term 4 [year]. Renewable annually."
3. Send → school receives email with PDF + payment link.

### Recurring (set-and-forget)

Once a school is happy, switch to **Stripe Subscriptions**:
- Product: "School Sport Portal Subscription"
- Price: $1/student/year inc GST, recurring annually on signup anniversary
- Add the school as a customer with their student count
- Stripe handles renewal invoice, GST, and reminders automatically

## Tax invoice template (Australian compliance)

A valid tax invoice must show:
- ✅ The words "**Tax invoice**" (Stripe handles)
- ✅ Seller's name + ABN (Stripe handles once configured)
- ✅ Date of issue (Stripe handles)
- ✅ Buyer's name + ABN (if known)
- ✅ Description of items + quantity + price
- ✅ GST amount or "GST included in total" + breakdown
- ✅ Total amount

Stripe Tax outputs all of these automatically.

## Invoicing schedule decision

### Option A — Annual upfront (Term 1) [RECOMMENDED]

- **Pros:** One invoice/yr per school. Cleanest. Schools' AP teams handle annual SaaS this way. Cashflow upfront.
- **Cons:** Schools commit Term 1 — slight friction for first sign-ups.
- **Sample timing:** Invoice sent Feb 1, due Feb 28. Service runs Term 1 → Term 4.

### Option B — Pay-as-you-go per carnival

- **Pros:** Lowest friction for trial. Works for one-off events.
- **Cons:** 4-6 invoices/yr per school. Scales poorly past ~10 schools.
- **Use:** First-time customers only, then convert to annual at end of year.

### Option C — Term-by-term (4 invoices/yr)

- **Pros:** Better cashflow alignment for schools.
- **Cons:** More admin. Schools' AP teams may object.
- **Skip unless** a specific school requests it.

### Recommendation

- **Default: Option A** (annual upfront, Term 1 invoice).
- **First-trial schools: Option B** for one carnival, then convert to A next year.
- **Multi-school deals (district): Option A** with a discount tier (e.g., 5%+ off if 5+ schools sign).

## What to put on the website

Add to https://schoolsportportal.com.au/help and the pricing card:

> **Pricing:** $1 per enrolled student per year inc GST.
> **Billing:** annual, invoiced in Term 1. Tax invoice issued by Stripe with our ABN (64 697 434 898) and GST clearly shown.
> **Payment options:** card, Apple Pay, or bank transfer via the Stripe payment link.
> **First-time trial:** free Term 3 trial. Invoice issued only if you continue past Term 3.

## Refund / cancellation policy (already in ToS)

- Mid-year cancellation: pro-rata refund for unused terms (rare)
- Within 14 days of invoice + no carnival run: full refund
- After service used: no refund (consistent with SaaS norms)

