---
name: Cost Tracking Dashboard
description: Plan + schema for tracking monthly spend across Stripe / Cloudflare / Claude / Groq for the Luck Dragon ecosystem
type: project
status: Ready to integrate
last_updated: 2026-05-04
---

# Cost Tracking Dashboard

**Status:** Ready to integrate
**Updated:** 2026-05-04

## Monthly Cost Summary (Current)

| Service | Category | Amount | Currency | Date | Status |
|---------|----------|--------|----------|------|--------|
| Stripe | Sport Portal Transaction Fee | TBD | AUD | 2026-05 | Live |
| Stripe | Carnival Timing Transaction Fee | TBD | AUD | 2026-05 | Live |
| Cloudflare | Workers Compute | TBD | USD | 2026-05 | Live |
| Cloudflare | D1 Storage | TBD | USD | 2026-05 | Live |
| Cloudflare | KV Namespace | TBD | USD | 2026-05 | Live |
| Claude API | Model Usage | TBD | USD | 2026-05 | Live |
| Groq API | Model Usage | TBD | USD | 2026-05 | Live |

## Data Sources & Integration Points

### Stripe
- **Endpoint:** `GET /v1/charges` (requires SECRET_KEY)
- **Accounts:** Sport Portal, Carnival Timing
- **Data to log:** amount, currency, status, created timestamp
- **Account email:** paddy@luckdragon.io

### Cloudflare
- **Endpoint:** CF API `/accounts/{id}/analytics/graphql`
- **Accounts:** Main (a6f47c17), LD (b6a2ea8732)
- **Metrics:** Workers invocations & compute time, D1 storage, KV reads/writes, Pages build minutes
- **Account email:** paddy@luckdragon.io

### Claude API
- **Endpoint:** Usage tracking (if available)
- **Metrics:** Tokens used, model costs

### Groq API
- **Endpoint:** `GET /api/usage` (if available)
- **Metrics:** Tokens used, model costs

## Implementation Steps

### Phase 1: Manual data collection (immediate)
1. Confirm all accounts use paddy@luckdragon.io (DONE)
2. Create monthly log entry template
3. Pull data from each service dashboard (API or manual snapshot)
4. Log to `cost_logs` table in asgard-prod D1

### Phase 2: Automated collection (this week)
1. Create `cost-tracker` worker (runs daily via Cron trigger)
2. Worker calls Stripe, CF, Claude, Groq APIs
3. Parses responses and logs to D1
4. Returns JSON with current month's total

### Phase 3: Dashboard widget (Falkor integration)
1. Create Falkor dashboard widget showing:
   - Current month total
   - Breakdown by service (pie chart)
   - Daily trend (line chart)
   - Month-over-month comparison
2. Wire to D1 `cost_logs` table
3. Make accessible from `/dashboard/costs` in Falkor

### Phase 4: Alerts & thresholds
1. Set budget alerts ($X/month per service)
2. Alert when service approaches limit
3. Monthly summary email to paddy@luckdragon.io

## Database Schema

```sql
CREATE TABLE cost_logs (
  id TEXT PRIMARY KEY,           -- uuid
  date TEXT NOT NULL,            -- YYYY-MM
  service TEXT NOT NULL,         -- 'stripe', 'cloudflare', 'claude', 'groq'
  category TEXT NOT NULL,        -- 'transaction-fee', 'workers', 'd1', 'kv', 'llm'
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'AUD',
  source TEXT,                   -- 'api', 'manual', 'invoice'
  metadata TEXT,                 -- JSON
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_service ON cost_logs(service);
CREATE INDEX idx_date ON cost_logs(date);
CREATE INDEX idx_service_date ON cost_logs(service, date);
```

## Quick Dashboard View

```
COST TRACKING DASHBOARD - May 2026

  Total Spend (May 1-3): $XXX.XX

  BY SERVICE:
    - Stripe         $XX.XX  (X% of total)
    - Cloudflare     $XX.XX  (X% of total)
    - Claude API     $XX.XX  (X% of total)
    - Groq API       $XX.XX  (X% of total)

  DETAILED BREAKDOWN:
    - Stripe / Sport Portal fees      $X.XX
    - Stripe / Carnival Timing fees   $X.XX
    - Cloudflare / Workers compute    $X.XX
    - Cloudflare / D1 storage         $X.XX
    - Cloudflare / KV reads/writes    $X.XX
    - Claude API / model tokens       $X.XX
    - Groq API   / model tokens       $X.XX

  ACCOUNT: paddy@luckdragon.io
  Last Updated: 2026-05-03 14:22 AEST
```

## Next: Cost Tracker Worker

Once this dashboard is approved, build automated `cost-tracker` worker that:
1. Runs daily at 9am AEST via Cron trigger
2. Pulls fresh data from all APIs
3. Logs to D1
4. Updates Falkor dashboard in real-time
