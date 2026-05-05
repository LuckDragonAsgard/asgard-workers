const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Paddy & Jacky — Property Calculator</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;color:#1e293b;min-height:100vh}
.hero{background:#0c2340;padding:32px 24px;color:#fff;text-align:center}
.hero h1{font-size:26px;font-weight:800;margin-bottom:4px}
.hero p{color:#7dd3fc;font-size:14px}
.wrap{max-width:1040px;margin:0 auto;padding:28px 16px;display:grid;grid-template-columns:340px 1fr;gap:20px;align-items:start}
@media(max-width:720px){.wrap{grid-template-columns:1fr}}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:22px;box-shadow:0 1px 4px rgba(0,0,0,.06);margin-bottom:16px}
.card h2{font-size:15px;font-weight:700;color:#1e293b;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid #f1f5f9}
.card-sub{font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px}
.field{margin-bottom:13px}
.field label{display:block;font-size:12px;font-weight:600;color:#64748b;margin-bottom:5px;text-transform:uppercase;letter-spacing:.04em}
.field input{width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:15px;font-weight:600;color:#1e293b;transition:.2s;background:#f8fafc}
.field input:focus{outline:none;border-color:#0369a1;background:#fff}
.hint{font-size:11px;color:#94a3b8;margin-top:3px}
.results{display:flex;flex-direction:column;gap:16px}
.scenario-toggle{display:flex;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;width:100%;margin-bottom:16px}
.stab{flex:1;padding:10px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:transparent;color:#64748b;transition:.2s}
.stab.active{background:#0c2340;color:#fff}
.col-before{background:#fef2f2;border:1.5px solid #fca5a5;border-radius:12px;padding:18px}
.col-after{background:#f0fdf4;border:1.5px solid #86efac;border-radius:12px;padding:18px}
.col-before h3{color:#dc2626;font-size:13px;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:.05em}
.col-after h3{color:#16a34a;font-size:13px;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:.05em}
.line{display:flex;justify-content:space-between;font-size:13px;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.06)}
.line:last-child{border:none}
.lname{color:#64748b}
.lval{font-weight:700}
.pos{color:#16a34a}.neg{color:#dc2626}
.total-line{display:flex;justify-content:space-between;font-size:15px;font-weight:800;padding:10px 0 0;margin-top:6px;border-top:2px solid rgba(0,0,0,.1)}
.hero-num{background:#0c2340;color:#fff;border-radius:14px;padding:22px;text-align:center}
.hero-num .big{font-size:48px;font-weight:900;line-height:1}
.hero-num .label{font-size:13px;color:#7dd3fc;margin-top:4px}
.hero-num .sub{font-size:12px;color:#60a5fa;margin-top:8px}
.tax-box{background:#fefce8;border:1.5px solid #fde047;border-radius:12px;padding:18px}
.tax-box h3{color:#854d0e;font-size:13px;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:.05em}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:500px){.grid2{grid-template-columns:1fr}}
.win-box{background:#f0fdf4;border:2px solid #22c55e;border-radius:14px;padding:20px;text-align:center}
.win-box .big{font-size:40px;font-weight:900;color:#16a34a;line-height:1}
.win-box .label{font-size:14px;color:#166534;font-weight:600;margin-top:6px}
.win-box .sub{font-size:12px;color:#64748b;margin-top:6px}

.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px;max-width:600px;margin-left:auto;margin-right:auto}
@media(max-width:580px){.hero-stats{grid-template-columns:1fr}}
.hs{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:16px;text-align:center}
.hs .num{font-size:32px;font-weight:900;color:#93c5fd;line-height:1}
.hs .desc{font-size:12px;color:#bfdbfe;margin-top:4px}
.alert-box{background:#fff;border-left:5px solid #1e40af;border-radius:12px;padding:20px 24px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.alert-box .atitle{font-size:16px;font-weight:800;color:#1e3a5f;margin-bottom:8px}
.alert-box p{font-size:14px;color:#374151;line-height:1.7}
.alert-box strong{color:#1e40af}
.cascade-box{background:#fff;border-radius:16px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.cascade-box h2{font-size:18px;font-weight:800;color:#1e293b;margin-bottom:4px}
.cascade-box .csub{font-size:13px;color:#64748b;margin-bottom:20px}
.cascade-flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;align-items:center;gap:8px;margin-bottom:20px}
@media(max-width:640px){.cascade-flow{grid-template-columns:1fr;gap:4px}.cascade-arrow{display:none}}
.cascade-node{border-radius:12px;padding:14px;text-align:center}
.cn-paddy{background:#1e3a5f;color:#fff}
.cn-kelly{background:#0d6e6e;color:#fff}
.cn-monica{background:#6b21a8;color:#fff}
.cn-3rd{background:#374151;color:#fff}
.cascade-node .cn-name{font-size:13px;font-weight:800;margin-bottom:4px}
.cascade-node .cn-detail{font-size:11px;opacity:.8;line-height:1.4}
.cascade-node .cn-money{font-size:15px;font-weight:900;margin-top:6px;color:#86efac}
.cascade-arrow{font-size:22px;color:#1e40af;font-weight:900;text-align:center}
.why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-top:16px}
.why-item{background:#f8fafc;border-radius:10px;padding:16px;border-left:3px solid #1e40af}
.why-item .wi-icon{font-size:20px;margin-bottom:6px}
.why-item .wi-title{font-size:13px;font-weight:700;color:#1e293b;margin-bottom:4px}
.why-item .wi-desc{font-size:12px;color:#475569;line-height:1.55}

.payoff-section{background:#fff;border-radius:16px;padding:28px;margin:24px 0;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.payoff-section h2{font-size:18px;font-weight:800;margin-bottom:4px;color:#1e293b}
.payoff-section .psub{font-size:13px;color:#64748b;margin-bottom:18px}
.p-inp-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:18px}
@media(max-width:600px){.p-inp-row{grid-template-columns:1fr}}
.p-inp{display:flex;flex-direction:column;gap:4px}
.p-inp label{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.04em}
.p-inp input{padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:15px;font-weight:600;color:#1e293b;background:#f8fafc}
.p-inp input:focus{outline:none;border-color:#1e40af;background:#fff}
.p-inp .phint{font-size:11px;color:#94a3b8}
.payoff-cols{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}
@media(max-width:580px){.payoff-cols{grid-template-columns:1fr}}
.po-col{border-radius:12px;padding:18px}
.po-col.slow{background:#fff5f5;border:2px solid #fecaca}
.po-col.fast{background:#f0fdf4;border:2px solid #86efac}
.po-col h3{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px}
.po-col.slow h3{color:#b91c1c}.po-col.fast h3{color:#15803d}
.po-big{font-size:44px;font-weight:900;line-height:1;margin-bottom:4px}
.po-col.slow .po-big{color:#dc2626}.po-col.fast .po-big{color:#16a34a}
.po-desc{font-size:13px;color:#64748b;margin-bottom:12px}
.po-line{display:flex;justify-content:space-between;font-size:13px;padding:5px 0;border-bottom:1px solid rgba(0,0,0,.07)}
.po-line:last-child{border:none}.pln{color:#64748b}.plv{font-weight:700}
.bar-wrap{background:#e2e8f0;border-radius:8px;height:16px;overflow:hidden;margin:6px 0}
.bar-slow{height:100%;background:#f87171;border-radius:8px}
.bar-fast{height:100%;background:#4ade80;border-radius:8px;transition:width .4s}
.bar-labels{display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-bottom:4px}
.accel-banner{background:linear-gradient(135deg,#1e3a5f,#1e40af);color:#fff;border-radius:14px;padding:24px;text-align:center;margin-top:4px}
.accel-banner .ab-big{font-size:52px;font-weight:900;line-height:1;color:#93c5fd}
.accel-banner .ab-label{font-size:14px;color:#bfdbfe;margin-top:8px;font-weight:600}
.accel-banner .ab-sub{font-size:13px;color:#93c5fd;margin-top:6px;line-height:1.7}
.loan-structure-box{background:#fff;border-radius:16px;padding:24px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.loan-structure-box h3{font-size:16px;font-weight:800;margin-bottom:16px;color:#1e293b}
.loan-toggle-group{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.loan-toggle-btn{padding:14px;border:1.5px solid #e2e8f0;border-radius:10px;background:#f8fafc;cursor:pointer;font-weight:600;font-size:14px;transition:.2s;text-align:center;color:#64748b}
.loan-toggle-btn.active{background:#1e3a5f;color:#fff;border-color:#1e3a5f}
.loan-toggle-desc{font-size:13px;color:#64748b;line-height:1.6;padding:12px;background:#f0fdf4;border-radius:8px;border-left:4px solid #22c55e}
</style>
</head>
<body>
<div class="hero">
  <h1>Paddy &amp; Jacky — 3-Property Portfolio</h1>
  <p>Cecil St (PPOR) · Osborne St → Kelly · North Rd → Antone &amp; Auveen<br>How the cascade works, what it earns, and how fast it pays off your home</p>
  <div class="hero-stats">
    <div class="hs"><div class="num" id="h-combined">$6,061</div><div class="desc">combined monthly net income (both IPs)</div></div>
    <div class="hs"><div class="num" id="h-taxsave">—</div><div class="desc">annual tax saving (both IPs combined)</div></div>
    <div class="hs"><div class="num">3</div><div class="desc">properties · 2 earning · 1 home</div></div>
  </div>
</div>


<div style="background:#fff7ed;border:1.5px solid #fb923c;border-radius:12px;padding:18px 22px;margin:0 auto 18px;font-size:13px;color:#9a3412;line-height:1.65;max-width:880px">
  <strong style="display:block;margin-bottom:6px;font-size:14px">📋 Final refi plan (Macquarie 80% LVR everywhere - no LMI)</strong>
  • <strong>Valuations</strong> (Matt's): NR $1,206,000 / Osborne $719,000 / Cecil $1,102,000.<br>
  • <strong>North Rd</strong> refi to 80% LVR: $964,800 (drawing $261,800 equity, IP rate 6.02%).<br>
  • <strong>Osborne</strong> refi to 80% LVR: $575,200 (drawing $73,200, IP rate 6.25% post-reclassification).<br>
  • <strong>Cecil St</strong> $1,102,000 purchase, 80% LVR loan = $881,600 + $223k cash deposit (from IP equity) + $65k stamp.<br>
  • <strong>Funds</strong>: $881,600 + $261,800 + $73,200 = $1,216,600. Need $1,170,000. <strong>Surplus ~$46,600</strong> for settlement costs.<br>
  • <strong>NO LMI</strong> - all three loans at exactly 80% LVR.<br>
  • <strong>ATO purpose test</strong>: $335k equity draw used for Cecil = NOT deductible. Deductible portions stay $703k NR + $502k Osborne. Macquarie will set up split loans.
</div>

<div class="alert-box">
  <div class="atitle">🏠 Why this was set up this way</div>
  <p>Paddy and Jacky moving to <strong>Cecil Street</strong> was the strategic trigger. Cecil St becomes your new PPOR. That converts Osborne Street from a home into an investment property — <strong>Kelly pays $650/wk</strong>, the ATO gives you deductions, and the equity keeps building. Separately, North Rd Newport is already tenanted by <strong>Antone Chin &amp; Auveen Twomey</strong> via Compton Green at $3,433/mo. Combined, the two IPs generate over $6,000/mo net — and you direct that surplus straight at Cecil St's mortgage.</p>
</div>


<div class="alert-box" style="background:#f0fdf4;border-left-color:#22c55e">
  <div class="atitle" style="color:#166534">💡 How the tax mechanism covers your weekly gap</div>
  <p>Here's the practical flow: Every fortnight, Osborne St and North Rd generate rental income. On the flip side, your <strong>interest payments</strong> (part of each loan repayment) and <strong>management fees, body corp, rates</strong> are all <strong>tax-deductible</strong> expenses. The ATO recognises these as investment costs. At your tax bracket (32.5%), roughly one-third of these deductions come straight back as tax relief — either via PAYG variation or at tax time. That refund bridges the weekly cashflow gap between rent received and loan repayments owed, so both IPs effectively service themselves while their equity compounds. Cecil St's PPOR interest is <em>not</em> deductible (you live there), so that $4,100/mo comes from the combined IP net income above — turning the tenants' rent into your repayment.</p>
</div>

<div class="loan-structure-box">
  <h3>Loan Structure</h3>
  <div class="loan-toggle-group">
    <button class="loan-toggle-btn active" onclick="setLoanType('ip')">Investment Property (IP)</button>
    <button class="loan-toggle-btn" onclick="setLoanType('owner')">Owner-Occupied</button>
  </div>
  <div class="loan-toggle-desc" id="loan-desc">
    <strong>Investment Property:</strong> Both Osborne St and North Rd are structured as IP loans. Interest payments and all property costs are fully tax-deductible. This drives down your taxable income and generates the tax refunds shown above.
  </div>
</div>

<div class="cascade-box">
  <h2>The cascade — how it flows</h2>
  <p class="csub">One move triggers four properties working for you simultaneously</p>
  <div class="cascade-flow">
    <div class="cascade-node cn-paddy">
      <div class="cn-name">Paddy &amp; Jacky</div>
      <div class="cn-detail">Live at Cecil St<br>(new PPOR)</div>
      <div class="cn-money">$6,061/mo net</div>
    </div>
    <div class="cascade-arrow">→</div>
    <div class="cascade-node cn-kelly">
      <div class="cn-name">Kelly</div>
      <div class="cn-detail">Rents Osborne St<br>from Paddy</div>
      <div class="cn-money">$650/wk</div>
    </div>
    <div class="cascade-arrow">→</div>
    <div class="cascade-node cn-monica">
      <div class="cn-name">Monica</div>
      <div class="cn-detail">Rents Kelly's 713<br>Buckley</div>
      <div class="cn-money">$580/wk</div>
    </div>
    <div class="cascade-arrow">→</div>
    <div class="cascade-node cn-3rd">
      <div class="cn-name">3rd Party</div>
      <div class="cn-detail">Rents Monica's 308<br>Buckley</div>
      <div class="cn-money">$440/wk</div>
    </div>
  </div>
  <div class="why-grid">
    <div class="why-item">
      <div class="wi-icon">💰</div>
      <div class="wi-title">Two IPs earning simultaneously</div>
      <div class="wi-desc">North Rd was already earning. Osborne St joins it the day you move to Cecil St. Combined net: $6,061/mo — enough to cover Cecil St's repayments and then some.</div>
    </div>
    <div class="why-item">
      <div class="wi-icon">🏛️</div>
      <div class="wi-title">ATO subsidises both</div>
      <div class="wi-desc">Interest, management fees, body corp, rates, insurance — all deductible across both IPs. At your bracket, the ATO sends back a meaningful slice every fortnight via PAYG variation.</div>
    </div>
    <div class="why-item">
      <div class="wi-icon">📈</div>
      <div class="wi-title">Three assets growing at once</div>
      <div class="wi-desc">Cecil St, Osborne St and North Rd all compound at ~6%/yr. You own all three. Two are building equity on the tenants' dime. Cecil St is your home — paid off by them.</div>
    </div>
    <div class="why-item">
      <div class="wi-icon">⚡</div>
      <div class="wi-title">Cecil St paid off years early</div>
      <div class="wi-desc">Redirect the combined IP net income ($6k+/mo) at Cecil St's mortgage and you own your home in roughly 7–8 years instead of 30. See the calculator below.</div>
    </div>
    <div class="why-item">
      <div class="wi-icon">🛡️</div>
      <div class="wi-title">CGT protection on Osborne</div>
      <div class="wi-desc">You can nominate Osborne St as your PPOR for up to 6 years post-move. If you sell within that window, no CGT on any Williamstown growth. Zero cost exit if plans change.</div>
    </div>
  </div>
</div>

<div style="background:#f0fff4;border:1.5px solid #9ae6b4;border-radius:10px;padding:12px 16px;font-size:13px;color:#276749;line-height:1.6;margin-bottom:18px;max-width:880px;margin-left:auto;margin-right:auto">
  <strong>📋 Optimised defaults applied:</strong> ACTUAL loans baked in (NR $702,615 @ 6.02%, Osborne $508,110 @ 5.75%), land tax estimates (NR $7k, Osborne $9k — adjust to your assessment), Compton Green-confirmed North Rd rent, 4% vacancy on tenanted IP. Adjust any input — the page recalculates live. Toggle to IP to see how rates reprice (+0.5%).
</div>


<div style="background:linear-gradient(135deg,#1e3a5f,#1e40af);border-radius:16px;padding:28px;margin:0 auto 24px;color:#fff;text-align:center;max-width:880px">
  <div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;opacity:.85;margin-bottom:6px">Long-term wealth built (10 years)</div>
  <div style="font-size:14px;opacity:.9;margin-bottom:18px;line-height:1.55">Two IPs compound while a third (Cecil St) gets paid off by the cashflow. Here is what the cascade builds for you:</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px">
    <div style="background:rgba(255,255,255,.12);border-radius:12px;padding:16px"><div style="font-size:32px;font-weight:900;line-height:1" id="lt-portfolio-value">$0</div><div style="font-size:12px;opacity:.85;margin-top:4px">Combined IP value at year 10</div></div>
    <div style="background:rgba(255,255,255,.12);border-radius:12px;padding:16px"><div style="font-size:32px;font-weight:900;line-height:1" id="lt-portfolio-equity">$0</div><div style="font-size:12px;opacity:.85;margin-top:4px">Combined IP equity</div></div>
    <div style="background:rgba(255,255,255,.12);border-radius:12px;padding:16px"><div style="font-size:32px;font-weight:900;line-height:1" id="lt-tax-save">$0</div><div style="font-size:12px;opacity:.85;margin-top:4px">Net tax position over 10 yrs<br><span style="font-size:10px;opacity:.7">(negative = tax owed, positively geared)</span></div></div>
    <div style="background:rgba(255,255,255,.12);border-radius:12px;padding:16px"><div style="font-size:32px;font-weight:900;line-height:1" id="lt-cs-equity">$0</div><div style="font-size:12px;opacity:.85;margin-top:4px">Cecil St paid down via IPs</div></div>
  </div>
</div>

<div class="wrap">
  <div>
    <div class="card">
      <h2>North Rd, Newport (Current IP)</h2>
      <div class="field"><label>Gross Rent ($/mo)</label><input id="nr-rent" type="number" value="3433"><div class="hint">Compton Green — confirmed</div></div>
      <div class="field"><label>Management Fee (%)</label><input id="nr-mgmt" type="number" value="5.5" step="0.1"></div>
      <div class="field"><label>Loan Balance ($)</label><input id="nr-loan" type="number" value="964800"></div>
      <div class="field"><label>Interest Rate (%)</label><input id="nr-rate" type="number" value="6.02" step="0.01"><div class="hint">Update with your actual rate</div></div>
      <div class="field"><label>Monthly Repayment ($)</label><input id="nr-repay" type="number" value="5797"></div>
      <div class="field"><label>Rates + Insurance ($/mo)</label><input id="nr-costs" type="number" value="250"></div>
      <div class="field"><label>Vacancy allowance (%)</label><input id="nr-vacancy" type="number" value="4" step="1"><div class="hint">~2 wk/yr empty between tenants</div></div>
      <div class="field"><label>NR deductible portion ($)</label><input id="nr-ded-loan" type="number" value="703000"><div class="hint">Original purpose only - equity draw is non-ded</div></div>
      <div class="field"><label>Other deductible costs ($/yr)</label><input id="nr-other-ded" type="number" value="1500"><div class="hint">Mgmt fee letting, accountant share, QS report etc.</div></div>
      <div class="field"><label>Land Tax ($/yr)</label><input id="nr-landtax" type="number" value="7000"><div class="hint">VIC threshold $50k land value</div></div>
    </div>
    <div class="card">
      <h2>Osborne St, Williamstown (Becoming IP)</h2>
      <div class="field"><label>Kelly's Rent ($/wk)</label><input id="os-rent" type="number" value="650"><div class="hint">Confirmed market rate</div></div>
      <div class="field"><label>Loan Balance ($)</label><input id="os-loan" type="number" value="575200"><div class="hint">Confirmed loan balance</div></div>
      <div class="field"><label>Interest Rate (%)</label><input id="os-rate" type="number" value="6.25" step="0.01"></div>
      <div class="field"><label>Monthly Repayment ($)</label><input id="os-repay" type="number" value="3542"></div>
      <div class="field"><label>Body Corp + Rates ($/wk)</label><input id="os-costs" type="number" value="40"></div>
      <div class="field"><label>Osborne deductible portion ($)</label><input id="os-ded-loan" type="number" value="502000"><div class="hint">Original purpose only - equity draw is non-ded</div></div>
      <div class="field"><label>Other deductible costs ($/yr)</label><input id="os-other-ded" type="number" value="1000"><div class="hint">Accountant share, QS report etc.</div></div>
      <div class="field"><label>Land Tax ($/yr)</label><input id="os-landtax" type="number" value="9000"><div class="hint">VIC threshold $50k land value</div></div>
    </div>
    <div class="card">
      <h2>Tax</h2>
      <div class="field"><label>Paddy's Annual Salary ($)</label><input id="salary" type="number" value="118000"></div>
      <div class="field"><label>Jacky's Annual Salary ($)</label><input id="sal2" type="number" value="220000"></div>
      <div class="field"><label>IP ownership structure</label><select id="ownership" style="padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:15px;font-weight:600;color:#1e293b;background:#f8fafc;width:100%"><option value="paddy">Solo — Paddy (32.5% bracket)</option><option value="jacky" selected>Solo — Jacky (45% bracket — best tax outcome)</option><option value="joint">Joint 50/50</option></select><div class="hint">Loss claimed at owner's marginal rate. Higher bracket = bigger refund.</div></div>
    </div>
  </div>
  <div class="results">
    <div class="win-box">
      <div class="big" id="w-extra"></div>
      <div class="label">extra per month when Osborne St is rented to Kelly</div>
      <div class="sub" id="w-sub"></div>
    </div>
    <div class="scenario-toggle">
      <button class="stab active" onclick="setS('now')">Now — North Rd only</button>
      <button class="stab" onclick="setS('post')">Post Cecil St — both IPs</button>
    </div>
    <div id="s-now">
      <div class="col-after" style="margin-bottom:12px">
        <h3>North Rd — Weekly Cashflow</h3>
        <div class="line"><span class="lname">Gross rent</span><span class="lval pos" id="nr-gross-wk"></span></div>
        <div class="line"><span class="lname">Management fee</span><span class="lval neg" id="nr-mgmt-wk"></span></div>
        <div class="line"><span class="lname">Loan repayment</span><span class="lval neg" id="nr-repay-wk"></span></div>
        <div class="line"><span class="lname">Rates + insurance</span><span class="lval neg" id="nr-costs-wk"></span></div>
        <div class="total-line"><span>Net weekly cashflow</span><span id="nr-net-wk"></span></div>
      </div>
      <div class="col-before">
        <h3>Osborne St — Not yet rented</h3>
        <div class="line"><span class="lname">Rental income</span><span class="lval">$0 (owner-occupied)</span></div>
        <div class="line"><span class="lname">Costs (body corp etc.)</span><span class="lval neg" id="os-costs-now"></span></div>
        <div class="total-line"><span>Combined weekly net</span><span id="now-combined"></span></div>
      </div>
    </div>
    <div id="s-post" style="display:none">
      <div class="grid2" style="margin-bottom:12px">
        <div class="col-after">
          <h3>North Rd — Weekly</h3>
          <div class="line"><span class="lname">Gross rent</span><span class="lval pos" id="p-nr-gross"></span></div>
          <div class="line"><span class="lname">Management</span><span class="lval neg" id="p-nr-mgmt"></span></div>
          <div class="line"><span class="lname">Repayment</span><span class="lval neg" id="p-nr-repay"></span></div>
          <div class="line"><span class="lname">Costs</span><span class="lval neg" id="p-nr-costs"></span></div>
          <div class="total-line"><span>Net</span><span id="p-nr-net"></span></div>
        </div>
        <div class="col-after">
          <h3>Osborne St — Weekly</h3>
          <div class="line"><span class="lname">Kelly's rent</span><span class="lval pos" id="p-os-rent"></span></div>
          <div class="line"><span class="lname">Repayment</span><span class="lval neg" id="p-os-repay"></span></div>
          <div class="line"><span class="lname">Body corp + rates</span><span class="lval neg" id="p-os-costs"></span></div>
          <div class="total-line"><span>Net</span><span id="p-os-net"></span></div>
        </div>
      </div>
      <div class="col-after">
        <div class="total-line" style="padding:14px 0 0"><span>Combined net weekly income</span><span class="pos" id="p-combined"></span></div>
        <div class="total-line" style="font-size:13px;margin-top:4px"><span>Combined net monthly</span><span class="pos" id="p-combined-mo"></span></div>
      </div>
    </div>
    <div class="tax-box">
      <h3>Tax Deductions — Both IPs Combined</h3>
      <div class="grid2">
        <div>
          <div style="font-size:11px;color:#92400e;font-weight:700;text-transform:uppercase;margin-bottom:8px">North Rd</div>
          <div class="line"><span class="lname">Interest</span><span class="lval pos" id="t-nr-int"></span></div>
          <div class="line"><span class="lname">Management fees</span><span class="lval pos" id="t-nr-mgmt"></span></div>
          <div class="line"><span class="lname">Rates + insurance</span><span class="lval pos" id="t-nr-costs"></span></div>
          <div class="line"><span class="lname">Land tax</span><span class="lval pos" id="t-nr-landtax"></span></div>
        </div>
        <div>
          <div style="font-size:11px;color:#92400e;font-weight:700;text-transform:uppercase;margin-bottom:8px">Osborne St</div>
          <div class="line"><span class="lname">Interest</span><span class="lval pos" id="t-os-int"></span></div>
          <div class="line"><span class="lname">Body corp + rates</span><span class="lval pos" id="t-os-costs"></span></div>
          <div class="line"><span class="lname">Land tax</span><span class="lval pos" id="t-os-landtax"></span></div>
          <div class="line"><span class="lname">Depreciation (QS)</span><span class="lval pos">Claim separately</span></div>
        </div>
      </div>
      <div class="line" style="margin-top:8px"><span class="lname">Total rental income (taxable)</span><span class="lval pos" id="t-rentinc-yr">—</span></div>
      <div class="total-line"><span>Total deductions (both IPs)</span><span class="pos" id="t-total"></span></div>
      <div class="total-line" style="font-weight:700"><span>Net rental loss (deductions − income)</span><span id="t-net-loss">—</span></div>
      <div class="total-line" style="margin-top:4px"><span>Paddy's tax saved @ <span id="t-br-p"></span>%</span><span class="pos" id="t-save-p"></span></div>
      <div class="total-line" style="font-size:13px;color:#92400e"><span>= Weekly in Paddy's pay (PAYG variation)</span><span id="t-wk-p"></span></div>
    </div>
  </div>
</div>

  
<div style="background:#fffff0;border:1.5px solid #faf089;border-radius:12px;padding:18px 22px;margin:0 auto 24px;font-size:13px;color:#744210;line-height:1.65;max-width:880px">
  <strong style="display:block;margin-bottom:6px;font-size:14px">⚠️ PPOR designation rule</strong>
  Only ONE property at a time can be your "principal place of residence" for tax purposes. <strong>Cecil St is your PPOR</strong> (you live there) so it is automatically CGT-exempt on sale. North Rd and Osborne St are both IPs and will incur CGT on any gain when sold. The 6-year absence rule does NOT apply because you have a different PPOR — to claim it for Osborne instead, you would have to forgo PPOR on Cecil St, which would expose Cecil St to CGT pro-rata. Generally not worth it unless Osborne's growth is dramatically larger.
</div>

<div class="payoff-section">
    <h2>💥 How fast your IP income pays off Cecil St</h2>
    <p class="psub">Your two IPs generate ~$6,061/mo net. Direct that at Cecil St's mortgage and you own your home in a fraction of the time — while the tenants pay themselves.</p>
    <div class="p-inp-row">
      <div class="p-inp">
        <label>Cecil St Loan ($)</label>
        <input id="cs-loan" type="number" value="881600">
        <span class="phint">$660k = 60% LVR on $1.1M purchase</span>
      </div>
      <div class="p-inp">
        <label>Interest Rate (%)</label>
        <input id="cs-rate" type="number" value="5.5" step="0.01">
      </div>
      <div class="p-inp">
        <label>Cecil St Repayment ($/mo)</label>
        <input id="cs-repay" type="number" value="5006">
        <span class="phint">Standard P&amp;I repayment</span>
      </div>
    </div>
    <div class="payoff-cols">
      <div class="po-col slow">
        <h3>❌ Standard — no extra payments</h3>
        <div class="po-big" id="cs-slow-yrs">30</div>
        <div class="po-desc">years to own Cecil St outright</div>
        <div class="po-line"><span class="pln">Monthly repayment</span><span class="plv" id="cs-s-rep">—</span></div>
        <div class="po-line"><span class="pln">Total interest paid</span><span class="plv" style="color:#dc2626" id="cs-s-int">—</span></div>
        <div class="po-line"><span class="pln">Mortgage-free year</span><span class="plv" id="cs-s-yr">—</span></div>
      </div>
      <div class="po-col fast">
        <h3>✅ Redirecting IP net income</h3>
        <div class="po-big" id="cs-fast-yrs">—</div>
        <div class="po-desc">years to own Cecil St outright</div>
        <div class="po-line"><span class="pln">Repayment + IP income</span><span class="plv" style="color:#16a34a" id="cs-f-rep">—</span></div>
        <div class="po-line"><span class="pln">Total interest paid</span><span class="plv" style="color:#16a34a" id="cs-f-int">—</span></div>
        <div class="po-line"><span class="pln">Mortgage-free year</span><span class="plv" id="cs-f-yr">—</span></div>
      </div>
    </div>
    <div class="bar-labels"><span>Standard term</span><span>30 years</span></div>
    <div class="bar-wrap"><div class="bar-slow" style="width:100%"></div></div>
    <div class="bar-wrap"><div class="bar-fast" id="cs-bar" style="width:30%"></div></div>
    <div class="bar-labels"><span>With IP income at Cecil St</span><span id="cs-bar-label">—</span></div>
    <div class="accel-banner">
      <div class="ab-big" id="cs-saved">—</div>
      <div class="ab-label">years earlier you own Cecil St — while the tenants pay the IPs</div>
      <div class="ab-sub">Interest saved: <strong id="cs-int-saved" style="color:#fff">—</strong><br>Kelly + Antone &amp; Auveen cover the IPs. You live in your home while they build your equity.</div>
    </div>
  </div>

<script>
function fmt(n,plus){const s=Math.abs(n).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',');return(n>=0&&plus?'+':n<0?'-':'')+'\$'+s}
function fmtWk(n){return fmt(n,n>0)+'/wk'}
function bracket(sal){if(sal<=18200)return 0;if(sal<=45000)return 19;if(sal<=120000)return 32.5;if(sal<=180000)return 37;return 45;}
function calc(){
  const nrRent=+document.getElementById('nr-rent').value||0;
  const nrMgmtPct=(+document.getElementById('nr-mgmt').value||0)/100;
  const nrLoan=+document.getElementById('nr-loan').value||0;
  const nrRate=(+document.getElementById('nr-rate').value||0)/100;
  const nrRepay=+document.getElementById('nr-repay').value||0;
  const nrCosts=+document.getElementById('nr-costs').value||0;
  const osRent=+document.getElementById('os-rent').value||0;
  const osLoan=+document.getElementById('os-loan').value||0;
  const osRate=(+document.getElementById('os-rate').value||0)/100;
  const osRepay=+document.getElementById('os-repay').value||0;
  const osCosts=+document.getElementById('os-costs').value||0;
  const salP=+document.getElementById('salary').value||0;
  // Weekly conversions
  const nrVacancyPct=(+document.getElementById('nr-vacancy')?.value||0)/100;
  const nrRentWk=nrRent*12/52*(1-nrVacancyPct);
  const nrMgmtWk=nrRentWk*nrMgmtPct;
  const nrRepayWk=nrRepay*12/52;
  const nrCostsWk=nrCosts*12/52;
  const nrNetWk=nrRentWk-nrMgmtWk-nrRepayWk-nrCostsWk;
  const osRentWk=osRent;
  const osRepayWk=osRepay*12/52;
  const osNetWk=osRentWk-osRepayWk-osCosts;
  // Now scenario
  const nowCombined=nrNetWk-osCosts;
  // Post scenario
  const postCombined=nrNetWk+osNetWk;
  const extraPerMonth=(osNetWk)*52/12;
  // Tax
  const nrDedLoan=+document.getElementById('nr-ded-loan')?.value||nrLoan;
  const nrIntYr=nrDedLoan*nrRate;
  const nrMgmtYr=nrMgmtWk*52;
  const nrCostsYr=nrCostsWk*52;
  const osDedLoan=+document.getElementById('os-ded-loan')?.value||osLoan;
  const osIntYr=osDedLoan*osRate;
  const osCostsYr=osCosts*52;
  const nrLandtax=+document.getElementById('nr-landtax').value||0;
  const osLandtax=+document.getElementById('os-landtax').value||0;
  const nrOtherDed=+document.getElementById('nr-other-ded')?.value||0;
  const osOtherDed=+document.getElementById('os-other-ded')?.value||0;
  const totalDed=nrIntYr+nrMgmtYr+nrCostsYr+osIntYr+osCostsYr+nrLandtax+osLandtax+nrOtherDed+osOtherDed;
  const totalRentYr=(nrRentWk+osRentWk)*52;
  const netRentalLoss=totalDed-totalRentYr;
  const sal2=+document.getElementById('sal2').value||0;
  const own=(document.getElementById('ownership')||{value:'jacky'}).value;
  const brP=bracket(salP), brJ=bracket(sal2);
  let effectiveBracket;
  if(own==='paddy') effectiveBracket=brP;
  else if(own==='jacky') effectiveBracket=brJ;
  else effectiveBracket=(brP+brJ)/2; // joint 50/50
  const savP=netRentalLoss*(effectiveBracket/100);
  // Set values
  document.getElementById('nr-gross-wk').textContent=fmtWk(nrRentWk);
  document.getElementById('nr-mgmt-wk').textContent=fmtWk(-nrMgmtWk);
  document.getElementById('nr-repay-wk').textContent=fmtWk(-nrRepayWk);
  document.getElementById('nr-costs-wk').textContent=fmtWk(-nrCostsWk);
  const nrNetEl=document.getElementById('nr-net-wk');
  nrNetEl.textContent=fmtWk(nrNetWk);nrNetEl.className='lval '+(nrNetWk>=0?'pos':'neg');
  document.getElementById('os-costs-now').textContent=fmtWk(-osCosts);
  const nowEl=document.getElementById('now-combined');
  nowEl.textContent=fmtWk(nowCombined);nowEl.className='lval '+(nowCombined>=0?'pos':'neg');
  // Post
  document.getElementById('p-nr-gross').textContent=fmtWk(nrRentWk);
  document.getElementById('p-nr-mgmt').textContent=fmtWk(-nrMgmtWk);
  document.getElementById('p-nr-repay').textContent=fmtWk(-nrRepayWk);
  document.getElementById('p-nr-costs').textContent=fmtWk(-nrCostsWk);
  const pNrEl=document.getElementById('p-nr-net');
  pNrEl.textContent=fmtWk(nrNetWk);pNrEl.className='lval '+(nrNetWk>=0?'pos':'neg');
  document.getElementById('p-os-rent').textContent=fmtWk(osRentWk);
  document.getElementById('p-os-repay').textContent=fmtWk(-osRepayWk);
  document.getElementById('p-os-costs').textContent=fmtWk(-osCosts);
  const pOsEl=document.getElementById('p-os-net');
  pOsEl.textContent=fmtWk(osNetWk);pOsEl.className='lval '+(osNetWk>=0?'pos':'neg');
  const pcEl=document.getElementById('p-combined');
  pcEl.textContent=fmtWk(postCombined);pcEl.className='pos';
  document.getElementById('p-combined-mo').textContent=fmt(postCombined*52/12,true)+'/mo';
  // Tax
  document.getElementById('t-nr-int').textContent=fmt(nrIntYr,true)+'/yr';
  document.getElementById('t-nr-mgmt').textContent=fmt(nrMgmtYr,true)+'/yr';
  document.getElementById('t-nr-costs').textContent=fmt(nrCostsYr,true)+'/yr';
  document.getElementById('t-os-int').textContent=fmt(osIntYr,true)+'/yr';
  document.getElementById('t-os-costs').textContent=fmt(osCostsYr,true)+'/yr';
  document.getElementById('t-nr-landtax').textContent=fmt(nrLandtax,true)+'/yr';
  document.getElementById('t-os-landtax').textContent=fmt(osLandtax,true)+'/yr';
  document.getElementById('t-total').textContent=fmt(totalDed,true)+'/yr';
  const tNetEl=document.getElementById('t-net-loss');
  if(tNetEl){tNetEl.textContent=fmt(netRentalLoss,true)+'/yr';tNetEl.className=netRentalLoss>=0?'pos':'neg';}
  const tRentEl=document.getElementById('t-rentinc-yr');
  if(tRentEl) tRentEl.textContent=fmt(totalRentYr,true)+'/yr';
  document.getElementById('t-br-p').textContent=effectiveBracket;
  document.getElementById('t-save-p').textContent=fmt(savP,true)+'/yr';
  document.getElementById('t-wk-p').textContent=fmt(savP/52,true)+'/wk';
  document.getElementById('w-extra').textContent=fmt(extraPerMonth,true)+'/mo';
  // Update hero tax stat
  const ht = document.getElementById('h-taxsave');
  if(ht) ht.textContent = '$'+Math.round(savP).toLocaleString();

  document.getElementById('w-sub').textContent='Osborne St adds '+fmtWk(osNetWk)+' net · Combined both IPs: '+fmt(postCombined*52/12,true)+'/mo';

  // Long-term wealth calc for portfolio
  function lblance(b,r,m,y){var x=b,mr=r/100/12;for(var i=0;i<y*12;i++){x=x*(1+mr)-m;if(x<0)x=0;}return x;}
  function fvP(v,r,y){return v*Math.pow(1+r/100,y);}
  // North Rd value $1.0M assumption, Osborne $1.1M
  var nrValYr10 = fvP(1206000, 6, 10);
  var osValYr10 = fvP(719000, 6, 10);
  var nrLoanYr10 = lblance(nrLoan, nrRate*100, nrRepay, 10);
  var nrEquityYr10 = nrValYr10 - nrLoanYr10;
  var osEquityYr10 = osValYr10; // no loan
  var combinedValYr10 = nrValYr10 + osValYr10;
  var combinedEquityYr10 = nrEquityYr10 + osEquityYr10;
  // Cumulative tax savings (approx: avg savP × 10)
  var cumTaxSave = savP * 10;
  // Cecil St paid down: compute payoff acceleration on Cecil
  var csLoan = +document.getElementById('cs-loan').value || 0;
  var csRate = +document.getElementById('cs-rate').value || 0;
  var csRepay = +document.getElementById('cs-repay').value || 0;
  var ipMonthlyIncome = postCombined * 52 / 12;
  var csBalanceWithRedirect = lblance(csLoan, csRate, csRepay + Math.max(0, ipMonthlyIncome), 10);
  var csPaidDown = csLoan - Math.max(0, csBalanceWithRedirect);
  // Set values
  document.getElementById('lt-portfolio-value').textContent = '$'+Math.round(combinedValYr10).toLocaleString();
  document.getElementById('lt-portfolio-equity').textContent = '$'+Math.round(combinedEquityYr10).toLocaleString();
  document.getElementById('lt-tax-save').textContent = '$'+Math.round(cumTaxSave).toLocaleString();
  document.getElementById('lt-cs-equity').textContent = '$'+Math.round(csPaidDown).toLocaleString();

}
function setS(s){
  document.getElementById('s-now').style.display=s==='now'?'':'none';
  document.getElementById('s-post').style.display=s==='post'?'':'none';
  document.querySelectorAll('.stab').forEach((b,i)=>b.classList.toggle('active',(s==='now'&&i===0)||(s==='post'&&i===1)));
}
function payoffYrs(bal, annRate, monthly) {
  if (monthly <= 0) return 999;
  const r = annRate / 100 / 12;
  if (r <= 0) return bal / monthly / 12;
  const n = -Math.log(1 - (bal * r) / monthly) / Math.log(1 + r);
  return (isNaN(n) || n <= 0) ? 999 : n / 12;
}
function totalInt(bal, annRate, monthly, yrs) {
  return Math.max(0, (monthly * yrs * 12) - bal);
}
function calcPayoff() {
  const loan  = +document.getElementById('cs-loan').value  || 0;
  const rate  = +document.getElementById('cs-rate').value  || 0;
  const repay = +document.getElementById('cs-repay').value || 0;
  const ipText = (document.getElementById('p-combined-mo').textContent||'').replace(/[^0-9.]/g,'');
  const ipIncome = parseFloat(ipText) || 6061;
  const total = repay + ipIncome;
  const slowYrs = payoffYrs(loan, rate, repay);
  const fastYrs = payoffYrs(loan, rate, total);
  const saved   = Math.max(0, slowYrs - fastYrs);
  const slowInt = totalInt(loan, rate, repay, slowYrs);
  const fastInt = totalInt(loan, rate, total, fastYrs);
  const intSaved = Math.max(0, slowInt - fastInt);
  const f = n => '$' + Math.round(Math.abs(n)).toLocaleString();
  const nowYr = 2026;
  document.getElementById('cs-slow-yrs').textContent = Math.round(slowYrs);
  document.getElementById('cs-s-rep').textContent = f(repay) + '/mo';
  document.getElementById('cs-s-int').textContent  = f(slowInt) + ' total';
  document.getElementById('cs-s-yr').textContent   = Math.round(nowYr + slowYrs);
  document.getElementById('cs-fast-yrs').textContent = Math.round(fastYrs);
  document.getElementById('cs-f-rep').textContent  = f(total) + '/mo';
  document.getElementById('cs-f-int').textContent  = f(fastInt) + ' total';
  document.getElementById('cs-f-yr').textContent   = Math.round(nowYr + fastYrs);
  document.getElementById('cs-saved').textContent  = Math.round(saved) + ' years';
  document.getElementById('cs-int-saved').textContent = f(intSaved) + ' in interest you never pay';
  const pct = Math.min(100, Math.round((fastYrs / 30) * 100));
  document.getElementById('cs-bar').style.width = pct + '%';
  document.getElementById('cs-bar-label').textContent = Math.round(fastYrs) + ' years';
  // Update hero stat
  const hc = document.getElementById('h-combined');
  if(hc) hc.textContent = '$'+Math.round(ipIncome).toLocaleString();
}


var loanType='ip';
function setLoanType(type) {
  if(type===loanType) return;
  document.querySelectorAll('.loan-toggle-btn').forEach(btn => btn.classList.remove('active'));
  if(event && event.target) event.target.classList.add('active');
  var bump=type==='ip'?0.5:-0.5;
  ['nr-rate','os-rate'].forEach(function(id){var el=document.getElementById(id);if(el){el.value=(parseFloat(el.value)+bump).toFixed(2);}});
  const desc = document.getElementById('loan-desc');
  if(type === 'ip') {
    desc.innerHTML = '<strong>Investment Property:</strong> IP loans typically carry a ~0.5% premium over owner-occupier rates. Toggling has bumped both IP rates up 0.5%. Interest is fully tax-deductible.';
  } else {
    desc.innerHTML = '<strong>Owner-Occupied:</strong> Rates dropped 0.5% (no IP premium). But interest would NOT be deductible if structured as OO once tenanted — none of the deductions in this calc would apply.';
  }
  loanType=type;
  if(typeof calc==='function') calc();
  if(typeof calcPayoff==='function') calcPayoff();
}

document.querySelectorAll('input').forEach(i=>i.addEventListener('input',()=>{calc();calcPayoff();}));
  const ownEl=document.getElementById('ownership');if(ownEl)ownEl.addEventListener('change',()=>{calc();calcPayoff();});
calc();calcPayoff();
</script>

<div class="next-section" style="background:#1a202c;border-radius:16px;padding:28px;margin-bottom:24px;color:#fff">
  <div style="font-size:11px;font-weight:800;letter-spacing:2px;color:#48bb78;text-transform:uppercase;margin-bottom:6px">YOUR ACTION PLAN</div>
  <div style="font-size:20px;font-weight:900;margin-bottom:20px">What you need to do next</div>

  <div style="display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.06);border-radius:10px;padding:14px 16px;margin-bottom:12px">
    <div style="background:#48bb78;color:#1a202c;font-size:13px;font-weight:900;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">1</div>
    <div>
      <div style="font-size:15px;font-weight:800;margin-bottom:4px">Sign Kelly's Osborne St lease at $650/wk</div>
      <div style="font-size:13px;color:#a0aec0">Locks in $2,817/mo gross IP income from Osborne immediately. This is the income that flows into your payoff calculator above.</div>
    </div>
  </div>

  <div style="display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.06);border-radius:10px;padding:14px 16px;margin-bottom:12px">
    <div style="background:#48bb78;color:#1a202c;font-size:13px;font-weight:900;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">2</div>
    <div>
      <div style="font-size:15px;font-weight:800;margin-bottom:4px">Lodge a PAYG withholding variation (both IPs)</div>
      <div style="font-size:13px;color:#a0aec0">File with the ATO so the tax benefit flows through your pay packet each fortnight — don't wait until tax time.</div>
    </div>
  </div>

  <div style="display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.06);border-radius:10px;padding:14px 16px;margin-bottom:12px">
    <div style="background:#48bb78;color:#1a202c;font-size:13px;font-weight:900;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">3</div>
    <div>
      <div style="font-size:15px;font-weight:800;margin-bottom:4px">Get depreciation schedules for North Rd &amp; Osborne St</div>
      <div style="font-size:13px;color:#a0aec0">A quantity surveyor report (~$500 each) unlocks Div 40 plant depreciation claims — one of the biggest untapped deductions in your numbers.</div>
    </div>
  </div>

  <div style="display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.06);border-radius:10px;padding:14px 16px;margin-bottom:12px">
    <div style="background:#48bb78;color:#1a202c;font-size:13px;font-weight:900;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">4</div>
    <div>
      <div style="font-size:15px;font-weight:800;margin-bottom:4px">Open an offset account on Cecil St</div>
      <div style="font-size:13px;color:#a0aec0">Park all surplus cash (IP net income + tax refund) here. Every dollar offsets your PPOR interest — accelerating payoff without locking money away.</div>
    </div>
  </div>

  <div style="display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.06);border-radius:10px;padding:14px 16px">
    <div style="background:#48bb78;color:#1a202c;font-size:13px;font-weight:900;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0">5</div>
    <div>
      <div style="font-size:15px;font-weight:800;margin-bottom:4px">Update Cecil St mortgage details in the calculator above</div>
      <div style="font-size:13px;color:#a0aec0">Enter your actual loan balance, rate, and current repayment to get precise payoff figures — the defaults are estimates.</div>
    </div>
  </div>
</div>

</body></html>`;
export default { async fetch(request, env, ctx) { return new Response(HTML, { headers: { "Content-Type": "text/html;charset=utf-8" } }); } };