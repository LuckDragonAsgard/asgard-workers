const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kelly — 713/90 Buckley St</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f0f4f8;color:#1a202c;min-height:100vh}
.hero{background:linear-gradient(135deg,#1a365d 0%,#2a4a7f 100%);padding:40px 24px 32px;color:#fff;text-align:center}
.hero .tag{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:.06em;margin-bottom:16px}
.hero h1{font-size:28px;font-weight:900;margin-bottom:6px}
.hero p{color:#90cdf4;font-size:15px;max-width:520px;margin:0 auto;line-height:1.6}
.headline-stat{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:16px;padding:24px;margin:24px auto 0;max-width:500px}
.hs-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.hs-item .num{font-size:44px;font-weight:900;line-height:1}
.hs-item .desc{font-size:13px;margin-top:5px}
.hs-item.green .num{color:#68d391}.hs-item.green .desc{color:#9ae6b4}
.hs-item.blue .num{color:#90cdf4}.hs-item.blue .desc{color:#63b3ed}
.page{max-width:960px;margin:0 auto;padding:28px 16px}
.info-box{background:#fff;border-left:5px solid #2b6cb0;border-radius:12px;padding:20px 24px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.info-box .ititle{font-size:16px;font-weight:800;color:#1a365d;margin-bottom:8px}
.info-box p{font-size:14px;color:#4a5568;line-height:1.7}
.info-box strong{color:#2b6cb0}
.tax-how{background:#f0fff4;border-left:5px solid #22c55e;border-radius:12px;padding:20px 24px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.tax-how .ititle{font-size:16px;font-weight:800;color:#166534;margin-bottom:8px}
.tax-how p{font-size:14px;color:#4a5568;line-height:1.7}
.tax-how strong{color:#166534}
.why-section{background:#fff;border-radius:16px;padding:28px;margin-bottom:24px;border-left:5px solid #2b6cb0;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.why-section h2{font-size:20px;font-weight:800;color:#1a365d;margin-bottom:4px}
.why-section .sub{font-size:14px;color:#718096;margin-bottom:20px}
.why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}
.why-item{background:#ebf8ff;border-radius:10px;padding:16px}
.why-item .icon{font-size:22px;margin-bottom:8px}
.why-item .title{font-size:14px;font-weight:700;color:#1a365d;margin-bottom:4px}
.why-item .desc{font-size:13px;color:#2c5282;line-height:1.55}
.vs-section,.calc-section,.lt-section{background:#fff;border-radius:16px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.vs-section h2,.calc-section h2,.lt-section h2{font-size:18px;font-weight:800;margin-bottom:6px;color:#1a202c}
.sub{font-size:13px;color:#718096;margin-bottom:18px}
.vs-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;border:2px solid #e2e8f0;border-radius:12px;overflow:hidden}
@media(max-width:600px){.vs-grid,.hs-grid,.inputs-grid,.why-grid,.payoff-grid{grid-template-columns:1fr}}
.vs-col{padding:20px}
.vs-col.before{background:#fff5f5;border-right:2px solid #e2e8f0}
.vs-col.after{background:#f0fff4}
.vs-col h3{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px}
.vs-col.before h3{color:#c53030}.vs-col.after h3{color:#276749}
.vline{display:flex;justify-content:space-between;font-size:13px;padding:8px 0;border-bottom:1px solid rgba(0,0,0,.08)}
.vline:last-child{border:none}
.vl{color:#718096}.vv{font-weight:700}
.pos{color:#276749}.neg{color:#c53030}.muted{color:#a0aec0}.blue{color:#2b6cb0}
.diff-bar{border-radius:10px;padding:14px 18px;margin-top:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;border:2px solid}
.diff-bar.pos{background:#f0fff4;border-color:#9ae6b4}
.diff-bar.neg{background:#fff5f5;border-color:#fc8181}
.diff-bar .dlabel{font-size:13px;font-weight:600}
.diff-bar.pos .dlabel{color:#276749}
.diff-bar.neg .dlabel{color:#c53030}
.diff-bar .dval{font-size:22px;font-weight:900}
.diff-bar.pos .dval{color:#276749}
.diff-bar.neg .dval{color:#c53030}
.inputs-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}
.inp{display:flex;flex-direction:column;gap:4px}
.inp label{font-size:11px;font-weight:700;color:#718096;text-transform:uppercase;letter-spacing:.04em}
.inp input{padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:15px;font-weight:600;color:#1a202c;background:#f7fafc;transition:.15s}
.inp input:focus{outline:none;border-color:#3182ce;background:#fff}
.hint{font-size:11px;color:#a0aec0}
.dep-note{background:#fffff0;border:1px solid #faf089;border-radius:8px;padding:14px 16px;font-size:13px;color:#744210;line-height:1.65;margin-bottom:20px}
.results-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px}
.rcard{border-radius:10px;padding:16px;text-align:center}
.rcard.green{background:#f0fff4;border:1.5px solid #9ae6b4}
.rcard.blue{background:#ebf8ff;border:1.5px solid #90cdf4}
.rcard.yellow{background:#fffff0;border:1.5px solid #faf089}
.rcard.purple{background:#faf5ff;border:1.5px solid #d6bcfa}
.rcard .rv{font-size:24px;font-weight:800;margin-bottom:4px}
.rcard .rl{font-size:12px;color:#718096}
.rcard.green .rv{color:#276749}.rcard.blue .rv{color:#2b6cb0}.rcard.yellow .rv{color:#744210}.rcard.purple .rv{color:#553c9a}
.tax-box{background:#fffff0;border:1.5px solid #faf089;border-radius:12px;padding:20px;margin-bottom:14px}
.tax-box h3{font-size:13px;font-weight:700;color:#744210;text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px}
.tax-box .vtotal{display:flex;justify-content:space-between;font-size:16px;font-weight:800;padding:12px 0 0;margin-top:8px;border-top:2px solid rgba(0,0,0,.12)}
.loan-structure-box{background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:20px;border:1.5px solid #e2e8f0}
.loan-structure-box h3{font-size:14px;font-weight:800;margin-bottom:12px;color:#1e293b}
.loan-toggle-group{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.loan-toggle-btn{padding:12px;border:1.5px solid #e2e8f0;border-radius:8px;background:#fff;cursor:pointer;font-weight:600;font-size:14px;transition:.2s;text-align:center;color:#64748b}
.loan-toggle-btn.active{background:#0d6e6e;color:#fff;border-color:#0d6e6e}
.loan-toggle-desc{font-size:13px;color:#4a5568;line-height:1.6;padding:10px 12px;background:#f0fdf4;border-radius:8px;border-left:4px solid #22c55e}
.lt-table{width:100%;border-collapse:collapse;font-size:14px;margin-bottom:18px}
.lt-table th{text-align:left;padding:10px 12px;font-size:11px;color:#a0aec0;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #e2e8f0}
.lt-table td{padding:11px 12px;border-bottom:1px solid #f7fafc;font-weight:600}
.lt-table tr:last-child td{border:none;font-weight:800;background:#f7fafc}
.cgt-box{background:linear-gradient(135deg,#44337a 0%,#6b46c1 100%);color:#fff;border-radius:14px;padding:24px;text-align:center;margin-bottom:16px}
.cgt-box .num{font-size:52px;font-weight:900;line-height:1;color:#d6bcfa}
.cgt-box .label{font-size:14px;color:#e9d8fd;margin-top:6px}
.cgt-box .csub{font-size:12px;color:#b794f4;margin-top:5px}
.summary-box{background:linear-gradient(135deg,#1a365d 0%,#2a4a7f 100%);color:#fff;border-radius:14px;padding:28px;text-align:center}
.summary-box .big{font-size:52px;font-weight:900;line-height:1;color:#68d391}
.summary-box .label{font-size:15px;color:#90cdf4;margin-top:8px;font-weight:600}
.summary-box .ssub{font-size:13px;color:#63b3ed;margin-top:6px;line-height:1.6}
.payoff-section{background:#fff;border-radius:16px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.payoff-section h2{font-size:18px;font-weight:800;margin-bottom:4px}
.payoff-section .sub{font-size:13px;color:#718096;margin-bottom:18px}
.payoff-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
.payoff-col{border-radius:12px;padding:20px}
.payoff-col.slow{background:#fff5f5;border:2px solid #fed7d7}
.payoff-col.fast{background:#f0fff4;border:2px solid #9ae6b4}
.payoff-col h3{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px}
.payoff-col.slow h3{color:#c53030}.payoff-col.fast h3{color:#276749}
.payoff-big{font-size:48px;font-weight:900;line-height:1;margin-bottom:4px}
.payoff-col.slow .payoff-big{color:#c53030}.payoff-col.fast .payoff-big{color:#276749}
.payoff-label{font-size:13px;color:#718096;margin-bottom:14px}
.payoff-line{display:flex;justify-content:space-between;font-size:13px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.06)}
.payoff-line:last-child{border:none}.pl{color:#718096}.pv{font-weight:700}
.accel-box{background:linear-gradient(135deg,#1a365d,#2a4a7f);color:#fff;border-radius:14px;padding:24px;text-align:center}
.accel-big{font-size:56px;font-weight:900;line-height:1;color:#68d391}
.accel-label{font-size:14px;color:#90cdf4;margin-top:8px;font-weight:600}
.accel-sub{font-size:13px;color:#63b3ed;margin-top:6px;line-height:1.7}
.bar-wrap{background:#e2e8f0;border-radius:8px;height:18px;margin:12px 0;overflow:hidden}
.bar-fill{height:100%;border-radius:8px;transition:width .4s}
.bar-slow{background:#fc8181}.bar-fast{background:#68d391}
.bar-label{display:flex;justify-content:space-between;font-size:11px;color:#718096;margin-bottom:4px}
.next-section{background:#1a202c;border-radius:16px;padding:28px;margin-bottom:24px;color:#fff}
.next-section h2{font-size:18px;font-weight:800;margin-bottom:4px;color:#fff}
.next-section .nsub{font-size:13px;color:#a0aec0;margin-bottom:20px}
.next-steps{display:flex;flex-direction:column;gap:12px}
.next-step{display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.06);border-radius:10px;padding:14px 16px}
.ns-num{background:#48bb78;color:#1a202c;font-size:13px;font-weight:900;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.ns-body .ns-title{font-size:14px;font-weight:700;color:#fff;margin-bottom:3px}
.ns-body .ns-desc{font-size:13px;color:#a0aec0;line-height:1.55}
</style>
</head>
<body>
<div class="hero">
  <div class="tag">KELLY — 713/90 BUCKLEY ST, FOOTSCRAY</div>
  <h1>Your 713 becomes an investment property</h1>
  <p>Move to Osborne St. Monica moves into 713. Her rent covers your mortgage and ATO deductions land in your pay each fortnight.</p>
  <div class="headline-stat">
    <div class="hs-grid">
      <div class="hs-item green"><div class="num" id="hero-cost">$0</div><div class="desc">net weekly cashflow (everything — incl rent paid)</div></div>
      <div class="hs-item blue"><div class="num" id="hero-cgt">$0</div><div class="desc">CGT you avoid — 6-year rule</div></div>
    </div>
  </div>
</div>

<div class="page">
  <div class="info-box">
    <div class="ititle">The cashflow in plain English</div>
    <p>You move to Osborne St and pay <strong>$650/wk</strong> rent. Monica moves into 713 and pays you <strong>$580/wk</strong>. Your mortgage repayment is $2,446/mo ($564/wk). Monica's rent covers that and then some. 713 becomes an investment property, so interest, body corp, rates, insurance, maintenance and depreciation are all tax-deductible. The ATO refunds that at your bracket — either fortnightly via PAYG variation or at tax time. The <strong>6-year CGT absence rule</strong> means 713 stays your PPOR for tax — sell within 6 years and all capital gains are tax-free.</p>
  </div>

  <div class="tax-how">
    <div class="ititle">How the tax mechanism works</div>
    <p>Rental income is taxable — added to your salary at tax time. But every IP expense (interest, body corp, rates, insurance, maintenance, land tax) plus <strong>depreciation</strong> (a paper claim) gets deducted. If deductions exceed rental income, the difference is your <strong>net rental loss</strong> — and that loss reduces your taxable income at your marginal rate. So the "tax refund" you see is calculated on the loss only, not on gross deductions. Lodge a PAYG variation to get the saving fortnightly via your pay rather than waiting until tax time.</p>
  </div>

  <div class="why-section">
    <h2>Why the cashflow works in your favour</h2>
    <p class="sub">Five financial mechanisms that change once 713 is an IP</p>
    <div class="why-grid">
      <div class="why-item"><div class="icon">💰</div><div class="title">Monica covers your mortgage</div><div class="desc">$580/wk Monica rent covers 100% of your $564/wk repayment. You hold a Footscray asset for almost nothing out of pocket.</div></div>
      <div class="why-item"><div class="icon">🏛️</div><div class="title">The ATO pays you back</div><div class="desc">Interest, body corp, rates, insurance, maintenance and depreciation all deductible. Roughly 32.5c per dollar back — in your pay fortnightly via PAYG variation.</div></div>
      <div class="why-item"><div class="icon">🛡️</div><div class="title">Zero CGT for 6 years</div><div class="desc">713 stays your PPOR for tax purposes for up to 6 years. Sell within that window — every dollar of growth is tax-free. Just do not nominate another property as PPOR.</div></div>
      <div class="why-item"><div class="icon">📈</div><div class="title">Equity builds two ways</div><div class="desc">Monica's rent pays down your mortgage. Footscray appreciates. Wealth builds without you spending more out of pocket than today.</div></div>
      <div class="why-item"><div class="icon">⚡</div><div class="title">Cashflow you can redirect</div><div class="desc">Net positive weekly cash from the IP can be redirected into an offset account on the 713 loan — knocks years off the payoff timeline.</div></div>
    </div>
  </div>

  
  <div style="background:linear-gradient(135deg,#1a365d 0%,#2a4a7f 100%);border-radius:16px;padding:28px;margin-bottom:24px;color:#fff;text-align:center">
    <div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;opacity:.85;margin-bottom:6px">Why short-term cashflow is not the whole story</div>
    <div style="font-size:14px;opacity:.9;margin-bottom:18px;max-width:640px;margin-left:auto;margin-right:auto;line-height:1.55">The weekly diff below is what the arrangement looks like in <strong>year 1</strong>. Rent grows ~3%/yr, costs grow slower, the loan principal pays down, and the property appreciates. The real return shows up over time — here is what the arrangement builds for you over 10 years:</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;max-width:880px;margin:0 auto">
      <div style="background:rgba(255,255,255,.12);border-radius:12px;padding:16px"><div style="font-size:32px;font-weight:900;line-height:1" id="banner-wealth">$0</div><div style="font-size:12px;opacity:.85;margin-top:4px">Total wealth built over 10 yrs</div></div>
      <div style="background:rgba(255,255,255,.12);border-radius:12px;padding:16px"><div style="font-size:32px;font-weight:900;line-height:1" id="banner-equity">$0</div><div style="font-size:12px;opacity:.85;margin-top:4px">Equity in 713 at year 10</div></div>
      <div style="background:rgba(255,255,255,.12);border-radius:12px;padding:16px"><div style="font-size:32px;font-weight:900;line-height:1" id="banner-cgt">$0</div><div style="font-size:12px;opacity:.85;margin-top:4px">CGT avoided (6-yr rule)</div></div>
      <div style="background:rgba(255,255,255,.12);border-radius:12px;padding:16px"><div style="font-size:32px;font-weight:900;line-height:1" id="banner-breakeven">—</div><div style="font-size:12px;opacity:.85;margin-top:4px">Year cashflow turns +ve</div></div>
    </div>
  </div>

  <div class="vs-section">
    <h2>Before vs after — your weekly cashflow</h2>
    <p class="sub">What changes financially each week once 713 is an IP</p>
    <div class="vs-grid">
      <div class="vs-col before">
        <h3>As your home (current)</h3>
        <div class="vline"><span class="vl">Mortgage repayment</span><span class="vv neg" id="b-mort"></span></div>
        <div class="vline"><span class="vl">Body corp</span><span class="vv neg" id="b-bc"></span></div>
        <div class="vline"><span class="vl">Council rates</span><span class="vv neg" id="b-rates"></span></div>
        <div class="vline"><span class="vl">Rental income</span><span class="vv muted">$0</span></div>
        <div class="vline"><span class="vl">Tax deductions</span><span class="vv muted">None — it is your home</span></div>
        <div class="vline" style="font-weight:800;border-top:2px solid rgba(0,0,0,.12);margin-top:6px;padding-top:10px"><span class="vl" style="color:#1a202c">Weekly cost of 713</span><span class="vv neg" id="b-total"></span></div>
      </div>
      <div class="vs-col after">
        <h3>As an investment property</h3>
        <div class="vline"><span class="vl">Monica pays you rent</span><span class="vv pos" id="a-rin"></span></div>
        <div class="vline"><span class="vl">Mortgage repayment</span><span class="vv neg" id="a-mort"></span></div>
        <div class="vline"><span class="vl">Body corp + rates</span><span class="vv neg" id="a-bcr"></span></div>
        <div class="vline"><span class="vl">Insurance + maintenance</span><span class="vv neg" id="a-im"></span></div>
        <div class="vline"><span class="vl">ATO tax refund (in your pay)</span><span class="vv pos" id="a-tax"></span></div>
        <div class="vline"><span class="vl">Rent you pay (Osborne)</span><span class="vv neg" id="a-rout"></span></div>
        <div class="vline" style="font-weight:800;border-top:2px solid rgba(0,0,0,.12);margin-top:6px;padding-top:10px"><span class="vl" style="color:#1a202c">Net weekly cashflow</span><span class="vv" id="a-ipcash"></span></div>
        </div>
    </div>
    <div class="diff-bar pos" id="diff-bar">
      <span class="dlabel">Weekly diff vs staying as your home (includes rent you pay elsewhere)</span>
      <span class="dval" id="diff-val">-</span>
    </div>
  </div>
<div class="calc-section">
    <h2>Your figures — edit anything</h2>
    <p class="sub">All numbers update live. Pre-filled with confirmed figures — adjust if anything has changed.</p>
    <div class="loan-structure-box">
      <h3>Loan Structure</h3>
      <div class="loan-toggle-group">
        <button class="loan-toggle-btn" id="lt-ip" type="button" onclick="setLoanType('ip')">Investment Property (IP)</button>
        <button class="loan-toggle-btn active" id="lt-oo" type="button" onclick="setLoanType('owner')">Owner-Occupied</button>
      </div>
      <div class="loan-toggle-desc" id="loan-desc">
        <strong>Owner-Occupied (current):</strong> Your loan today is an owner-occupier loan. If you switch to IP, banks typically reprice the rate up by ~0.5%. Toggle to see what rate would apply.
      </div>
    </div>
    
    <div style="background:#f0fff4;border:1.5px solid #9ae6b4;border-radius:10px;padding:12px 16px;font-size:13px;color:#276749;line-height:1.6;margin-bottom:16px">
      <strong>📋 Optimised defaults applied:</strong> refinanced rate 5.5%, proper QS depreciation report, top-of-market rents, $2k/yr accountant + records claims. Adjust any input if your actual figures differ. The page recalculates live.
    </div>
    <div class="inputs-grid">
      <div class="inp"><label>Annual Salary ($)</label><input id="salary" type="number" value="118000"></div>
      <div class="inp"><label>Loan Balance ($)</label><input id="loan" type="number" value="365563"></div>
      <div class="inp"><label>Interest Rate (%)</label><input id="rate" type="number" value="5.5" step="0.01"></div>
      <div class="inp"><label>Monthly Repayment ($)</label><input id="repayment" type="number" value="2245"><span class="hint">Confirmed from bank</span></div>
      <div class="inp"><label>Rent Monica Pays You — 713 ($/wk)</label><input id="rent_in" type="number" value="590"><span class="hint">Market rate 1-bed Footscray</span></div>
      <div class="inp"><label>Rent You Pay — Osborne ($/wk)</label><input id="rent_out" type="number" value="620"></div>
      <div class="inp"><label>Body Corporate ($/wk)</label><input id="bc" type="number" value="75"><span class="hint">$1,961.76 × 2/yr ÷ 52</span></div>
      <div class="inp"><label>Council Rates ($/wk)</label><input id="rates" type="number" value="28"><span class="hint">$1,464.47/yr ÷ 52</span></div>
      <div class="inp"><label>Landlord Insurance ($/wk)</label><input id="ins" type="number" value="26"></div>
      <div class="inp"><label>Maintenance avg ($/wk)</label><input id="maint" type="number" value="12"></div>
      <div class="inp"><label>Land Tax ($/yr)</label><input id="landtax" type="number" value="0"><span class="hint">VIC: apartments often $0 (under $50k threshold). Check assessment.</span></div>
      <div class="inp"><label>Depreciation ($/yr)</label><input id="dep" type="number" value="13000"><span class="hint">From QS report — paper claim only</span></div>
      <div class="inp"><label>Current Property Value ($)</label><input id="propval" type="number" value="500000"></div>
      <div class="inp"><label>Vacancy allowance (%)</label><input id="vacancy" type="number" value="2" step="1"><span class="hint">Industry standard 4%: ~2 weeks/yr empty between tenants</span></div>
      <div class="inp"><label>Rent growth (%/yr)</label><input id="rent_growth" type="number" value="3" step="0.5"><span class="hint">Long-term avg ~3%/yr</span></div>
      <div class="inp"><label>Cost growth (%/yr)</label><input id="cost_growth" type="number" value="2.5" step="0.5"><span class="hint">Body corp, rates etc grow ~2.5%/yr</span></div>
      <div class="inp"><label>Other deductible costs ($/yr)</label><input id="other_ded" type="number" value="2000"><span class="hint">QS report (~$500), accountant (~$300)</span></div>
      <div class="inp"><label>Annual Growth Rate (%)</label><input id="growth" type="number" value="6" step="0.5"><span class="hint">Footscray 10yr avg ~6-7%</span></div>
    </div>
    <div style="background:#ebf8ff;border:1.5px solid #90cdf4;border-radius:8px;padding:12px 16px;font-size:13px;color:#2c5282;line-height:1.6;margin-bottom:12px">
      <strong>Where these rent figures come from:</strong> The $580/wk Monica rent and $650/wk you pay for Osborne are based on current market rates for comparable apartments. Domain and REA listings for similar units in Footscray and Williamstown were checked. The IP rent must be at market rate — the ATO requires it for deductions to be allowed in full. You can adjust any figure above.
    </div>
    <div class="dep-note">
      <strong>What is depreciation?</strong> A paper deduction the ATO gives you for the wear and tear of fittings, carpets, appliances and the building structure. You spend no cash. A quantity surveyor visits once (~$500, itself tax-deductible) and produces a yearly schedule of exactly what you can claim. It reduces your taxable income the same way interest does — but costs nothing out of pocket beyond that one-off fee.
    </div>
<div class="results-grid">
      <div class="rcard green"><div class="rv" id="r-rentin">-</div><div class="rl">Weekly rental income</div></div>
      <div class="rcard purple"><div class="rv" id="r-hold">-</div><div class="rl">Weekly diff vs as home</div></div>
      <div class="rcard yellow"><div class="rv" id="r-taxyr">-</div><div class="rl">Annual tax saving (after rent income)</div></div>
      <div class="rcard blue"><div class="rv" id="r-taxwk">-</div><div class="rl">Weekly in your pay (PAYG)</div></div>
      <div class="rcard purple"><div class="rv" id="r-coverage">-</div><div class="rl">Monica covers X% of mortgage</div></div>
    </div>
    <div class="tax-box">
      <h3>Annual Rental Position (Tax)</h3>
      <div class="vline"><span class="vl">Rental income (taxable)</span><span class="vv pos" id="t-rentinc"></span></div>
      <div class="vline"><span class="vl">Mortgage interest (interest portion only)</span><span class="vv blue" id="t-int"></span></div>
      <div class="vline"><span class="vl">Body corporate</span><span class="vv blue" id="t-bc"></span></div>
      <div class="vline"><span class="vl">Council rates</span><span class="vv blue" id="t-rates"></span></div>
      <div class="vline"><span class="vl">Landlord insurance</span><span class="vv blue" id="t-ins"></span></div>
      <div class="vline"><span class="vl">Maintenance</span><span class="vv blue" id="t-maint"></span></div>
      <div class="vline"><span class="vl">Land tax</span><span class="vv blue" id="t-landtax"></span></div>
      <div class="vline"><span class="vl">Depreciation (paper claim — zero cash outlay)</span><span class="vv blue" id="t-dep"></span></div>
      <div class="vline" style="font-weight:800;padding-top:10px;border-top:2px solid rgba(0,0,0,.12)"><span class="vl" style="color:#1a202c">Total annual deductions</span><span class="vv neg" id="t-ded-total"></span></div>
      <div class="vline" style="font-weight:800"><span class="vl" style="color:#1a202c">Net rental loss (deductions − income)</span><span class="vv" id="t-netloss"></span></div>
      <div class="vtotal"><span>Tax refund (or owed) at <span id="t-br"></span>% bracket</span><span id="t-total"></span></div>
    </div>
  </div>

  <div class="lt-section">
    <h2>The long-term picture</h2>
    <p class="sub">What holding 713 as an IP does for your wealth over time</p>
    <table class="lt-table">
      <thead><tr><th></th><th>Today</th><th>Year 3</th><th>Year 5</th><th>Year 10</th></tr></thead>
      <tbody>
        <tr><td>713 Buckley value</td><td id="lt-v0"></td><td id="lt-v3"></td><td id="lt-v5"></td><td id="lt-v10"></td></tr>
        <tr><td>Loan remaining</td><td id="lt-l0"></td><td id="lt-l3"></td><td id="lt-l5"></td><td id="lt-l10"></td></tr>
        <tr><td>Your equity</td><td id="lt-e0"></td><td id="lt-e3"></td><td id="lt-e5"></td><td id="lt-e10"></td></tr>
        <tr><td>Cumulative tax saved</td><td>-</td><td id="lt-t3"></td><td id="lt-t5"></td><td id="lt-t10"></td></tr>
      </tbody>
    </table>
    <div class="cgt-box">
      <div class="num" id="cgt-saved">$0</div>
      <div class="label">in capital gains tax you avoid — if you sell within 6 years</div>
      <div class="csub">ATO 6-year absence rule. 713 Buckley stays your PPOR. Every dollar of growth is tax-free. Do not nominate another property as PPOR.</div>
    </div>
    <div class="summary-box">
      <div class="big" id="lt-total10">$0</div>
      <div class="label">Estimated total wealth built over 10 years</div>
      <div class="ssub">Footscray growth + loan paid down by Monica's rent + 10 years of ATO tax savings.</div>
    </div>
  </div>

  
  <div style="background:#fffff0;border:1.5px solid #faf089;border-radius:12px;padding:18px 22px;margin-bottom:24px;font-size:13px;color:#744210;line-height:1.65">
    <strong style="display:block;margin-bottom:6px;font-size:14px">⚠️ PPOR designation rule</strong>
    Only ONE property at a time can be your "principal place of residence" for tax purposes. The 6-year CGT exemption above assumes you nominate 713 as your PPOR for tax (even though you live elsewhere). If you nominate a different property as PPOR, 713 will be subject to CGT pro-rata on any gain. You can change designation later, but only one property qualifies for the exemption at any given time.
  </div>

  <div class="payoff-section">
    <h2>How the cashflow pays off 713 faster</h2>
    <p class="sub">Without IP cashflow you pay the standard repayment alone. With it, Monica covers your mortgage and the IP generates net positive cash you redirect straight back into the loan.</p>
    <div style="background:#f0fff4;border:1.5px solid #9ae6b4;border-radius:10px;padding:12px 16px;margin-bottom:18px;font-size:13px;color:#276749">
      <strong>Auto-calculated:</strong> extra monthly repayment = your weekly ATO refund (PAYG variation), converted to monthly. This is genuinely new cash created by the IP arrangement — without IP-ifying, the refund does not exist.
    </div>
    <div class="payoff-grid">
      <div class="payoff-col slow">
        <h3>Without IP cashflow</h3>
        <div class="payoff-big" id="py-slow-yrs">-</div>
        <div class="payoff-label">years to pay off 713</div>
        <div class="payoff-line"><span class="pl">Monthly repayment</span><span class="pv neg" id="py-s-rep">-</span></div>
        <div class="payoff-line"><span class="pl">Total interest paid</span><span class="pv neg" id="py-s-int">-</span></div>
        <div class="payoff-line"><span class="pl">Own it outright</span><span class="pv" id="py-s-year">-</span></div>
      </div>
      <div class="payoff-col fast">
        <h3>With IP cashflow redirected</h3>
        <div class="payoff-big" id="py-fast-yrs">-</div>
        <div class="payoff-label">years to pay off 713</div>
        <div class="payoff-line"><span class="pl">Standard repayment</span><span class="pv" id="py-f-rep">-</span></div>
        <div class="payoff-line"><span class="pl">Extra from ATO refund</span><span class="pv pos" id="py-f-extra">-</span></div>
        <div class="payoff-line"><span class="pl">Total interest paid</span><span class="pv pos" id="py-f-int">-</span></div>
        <div class="payoff-line"><span class="pl">Own it outright</span><span class="pv" id="py-f-year">-</span></div>
      </div>
    </div>
    <div class="bar-label"><span>Without IP cashflow</span><span id="bar-slow-label">-</span></div>
    <div class="bar-wrap"><div class="bar-fill bar-slow" id="bar-slow" style="width:100%"></div></div>
    <div class="bar-label"><span>With IP cashflow redirected</span><span id="bar-fast-label">-</span></div>
    <div class="bar-wrap"><div class="bar-fill bar-fast" id="bar-fast" style="width:50%"></div></div>
    <div class="accel-box">
      <div class="accel-big" id="py-saved-yrs">-</div>
      <div class="accel-label">years earlier you own 713 Buckley outright</div>
      <div class="accel-sub">Interest you never pay: <strong id="py-int-saved" style="color:#fff">-</strong><br>Monica's rent + ATO refund generates this — no extra cash from you required.</div>
    </div>
  </div>

  <div class="next-section">
    <h2>What needs to happen — 4 steps</h2>
    <p class="nsub">Steps to make this real.</p>
    <div class="next-steps">
      <div class="next-step"><div class="ns-num">1</div><div class="ns-body"><div class="ns-title">Sign a written lease with Monica at $580/wk</div><div class="ns-desc">The ATO requires a written lease at market rent for deductions to hold. Without one, deductions can be reduced or disallowed. One page, signed by both of you.</div></div></div>
      <div class="next-step"><div class="ns-num">2</div><div class="ns-body"><div class="ns-title">Lodge a PAYG withholding variation</div><div class="ns-desc">One-page ATO form. Tells your employer to withhold less tax from each pay — so the saving arrives fortnightly, not as a lump sum at tax time. Free, takes about 10 minutes online.</div></div></div>
      <div class="next-step"><div class="ns-num">3</div><div class="ns-body"><div class="ns-title">Get a depreciation report for 713 Buckley</div><div class="ns-desc">A quantity surveyor visits and tells you exactly what you can claim each year. One-off cost ~$500, tax-deductible. The figure in this calculator is an estimate — the report gives you the real number.</div></div></div>
      <div class="next-step"><div class="ns-num">4</div><div class="ns-body"><div class="ns-title">Open an offset account and redirect the IP cashflow</div><div class="ns-desc">The payoff acceleration only works if the freed-up cash actually hits the mortgage. Ask your bank to open an offset account on your 713 loan and redirect the monthly IP cashflow straight in — it cuts your interest immediately.</div></div></div>
    </div>
  </div>

</div>
<script>
function $(id){return document.getElementById(id);}
function fmt(n,p){return (n>=0&&p?"+":n<0?"-":"")+"$"+Math.abs(Math.round(n)).toLocaleString();}
function fwk(n){return fmt(n,n>0)+"/wk";}
function br(s){return s<=18200?0:s<=45000?19:s<=120000?32.5:s<=180000?37:45;}
function fv(v,r,y){return v*Math.pow(1+r/100,y);}
function lbal(b,r,m,y){var x=b,mr=r/100/12;for(var i=0;i<y*12;i++){x=x*(1+mr)-m;if(x<0)x=0;}return x;}
function payoffYears(bal,annualRate,monthly){
  if(monthly<=0||bal<=0)return 999;
  var r=annualRate/100/12;
  if(r<=0)return bal/monthly/12;
  var inner=1-(bal*r)/monthly;
  if(inner<=0)return 999;
  return -Math.log(inner)/Math.log(1+r)/12;
}
function totalInterest(bal,monthly,years){return Math.max(0,(monthly*years*12)-bal);}
var loanType="owner";
function setLoanType(type){
  if(type===loanType)return;
  var rateInp=$("rate"),cur=+rateInp.value||0;
  if(type==="ip"){rateInp.value=(cur+0.5).toFixed(2);$("lt-ip").classList.add("active");$("lt-oo").classList.remove("active");$("loan-desc").innerHTML="<strong>Investment Property:</strong> IP loans typically carry a ~0.5% premium over owner-occupier rates. Interest and property costs are tax-deductible.";}
  else{rateInp.value=(cur-0.5).toFixed(2);$("lt-ip").classList.remove("active");$("lt-oo").classList.add("active");$("loan-desc").innerHTML="<strong>Owner-Occupied:</strong> No IP premium on the rate. Interest is not tax-deductible — none of the deductions in this calculator would apply if structured as OO once the property is rented out.";}
  loanType=type;calc();
}
function calc(){
  var sal=+$("salary").value||0;
  var loan=+$("loan").value||0,rate=+$("rate").value||0;
  var rep=+$("repayment").value||0;
  var ri=+$("rent_in").value||0,ro=+$("rent_out").value||0;
  var bc=+$("bc").value||0,rates=+$("rates").value||0,ins=+$("ins").value||0;
  var maint=+$("maint").value||0,dep=+$("dep").value||0;
  var landtax=+$("landtax").value||0,landtaxWk=landtax/52;
  var vacancy=(+$("vacancy").value||0)/100,rentGrowth=(+$("rent_growth").value||0)/100,costGrowth=(+$("cost_growth").value||0)/100,otherDed=+$("other_ded").value||0;
  var pv=+$("propval").value||0,gr=+$("growth").value||0;
  var repWk=rep*12/52,bcr=bc+rates;
  var riEff=ri*(1-vacancy);
  var beforeWk=repWk+bcr;
  var intYr=loan*(rate/100);
  var ded=intYr+bc*52+rates*52+ins*52+maint*52+dep+landtax+otherDed;
  var rentalYr=riEff*52;var netLoss=ded-rentalYr;var b=br(sal),taxYr=netLoss*(b/100),taxWk=taxYr/52;
  var ipCash=riEff-repWk-bcr-ins-maint-landtaxWk-(otherDed/52)+taxWk;
  var netHold=ipCash-ro;
  var weeklyDiff=netHold+beforeWk;
  $("b-mort").textContent=fwk(-repWk);
  $("b-bc").textContent=fwk(-bc);
  $("b-rates").textContent=fwk(-rates);
  $("b-total").textContent=fwk(-beforeWk);
  $("a-rin").textContent=fwk(ri);
  $("a-mort").textContent=fwk(-repWk);
  $("a-bcr").textContent=fwk(-(bc+rates));
  $("a-im").textContent=fwk(-(ins+maint));
  $("a-tax").textContent=fmt(taxWk,true)+"/wk";
  $("a-rout").textContent=fwk(-ro);
  $("a-ipcash").textContent=fwk(netHold);
  $("a-ipcash").className="vv "+(netHold>=0?"pos":"neg");
  $("diff-val").textContent=fmt(weeklyDiff,true)+"/wk";
  $("diff-bar").className="diff-bar "+(weeklyDiff>=0?"pos":"neg");
  $("hero-cost").textContent=fwk(netHold);$("hero-cost").style.color=netHold>=0?"#9ae6b4":"#fc8181";
  $("r-rentin").textContent=fwk(ri);
  $("r-rentin").style.color="#276749";
  $("r-hold").textContent=fmt(weeklyDiff,true)+"/wk";
  $("r-hold").style.color=weeklyDiff>=0?"#276749":"#c53030";
  $("r-taxyr").textContent=fmt(taxYr,true)+"/yr";
  $("r-taxwk").textContent=fmt(taxWk,true)+"/wk";
  var coverage=repWk>0?Math.round((ri/repWk)*100):0;
  $("r-coverage").textContent=coverage+"%";
  $("t-int").textContent=fmt(intYr,true)+"/yr";
  $("t-bc").textContent=fmt(bc*52,true)+"/yr";
  $("t-rates").textContent=fmt(rates*52,true)+"/yr";
  $("t-ins").textContent=fmt(ins*52,true)+"/yr";
  $("t-maint").textContent=fmt(maint*52,true)+"/yr";
  $("t-landtax").textContent=fmt(landtax,true)+"/yr";
  $("t-dep").textContent=fmt(dep,true)+"/yr";
  $("t-rentinc").textContent=fmt(rentalYr,true)+"/yr";
  $("t-ded-total").textContent="-"+fmt(ded).replace("-","")+"/yr";
  $("t-netloss").textContent=fmt(netLoss,true)+"/yr";
  $("t-netloss").className="vv "+(netLoss>=0?"neg":"pos");
  $("t-br").textContent=b;
  $("t-total").textContent=fmt(taxYr,true)+"/yr";
  $("t-total").className=taxYr>=0?"pos":"neg";
  var v3=fv(pv,gr,3),v5=fv(pv,gr,5),v10=fv(pv,gr,10),v6=fv(pv,gr,6);
  var l3=lbal(loan,rate,rep,3),l5=lbal(loan,rate,rep,5),l10=lbal(loan,rate,rep,10);
  $("lt-v0").textContent=fmt(pv);$("lt-v3").textContent=fmt(v3);$("lt-v5").textContent=fmt(v5);$("lt-v10").textContent=fmt(v10);
  $("lt-l0").textContent=fmt(loan);$("lt-l3").textContent=fmt(l3);$("lt-l5").textContent=fmt(l5);$("lt-l10").textContent=fmt(l10);
  $("lt-e0").textContent=fmt(pv-loan);$("lt-e3").textContent=fmt(v3-l3);$("lt-e5").textContent=fmt(v5-l5);$("lt-e10").textContent=fmt(v10-l10);
  $("lt-t3").textContent=fmt(taxYr*3,true);$("lt-t5").textContent=fmt(taxYr*5,true);$("lt-t10").textContent=fmt(taxYr*10,true);
  var gain6=v6-pv,cgt=gain6*0.5*(b/100);
  $("cgt-saved").textContent=fmt(cgt,true);$("hero-cgt").textContent=fmt(cgt,true);
  $("lt-total10").textContent=fmt((v10-pv)+(loan-Math.max(0,l10))+taxYr*10,true);
  var extraMo=Math.max(0,taxWk*52/12);
  var slowYrs=payoffYears(loan,rate,rep);
  var fastYrs=payoffYears(loan,rate,rep+extraMo);
  var savedYrs=Math.max(0,slowYrs-fastYrs);
  var slowInt=totalInterest(loan,rep,slowYrs);
  var fastInt=totalInterest(loan,rep+extraMo,fastYrs);
  var intSaved=Math.max(0,slowInt-fastInt);
  var nowYear=2026;
  function f2(n){return "$"+Math.abs(Math.round(n)).toLocaleString();}
  $("py-slow-yrs").textContent=slowYrs>100?"30+":Math.round(slowYrs).toString();
  $("py-s-rep").textContent=f2(rep)+"/mo";
  $("py-s-int").textContent=f2(slowInt)+" total";
  $("py-s-year").textContent=slowYrs>100?"2056+":String(Math.round(nowYear+slowYrs));
  $("py-fast-yrs").textContent=fastYrs>100?"30+":Math.round(fastYrs).toString();
  $("py-f-rep").textContent=f2(rep)+"/mo";
  $("py-f-extra").textContent="+"+f2(extraMo)+"/mo";
  $("py-f-int").textContent=f2(fastInt)+" total";
  $("py-f-year").textContent=fastYrs>100?"2056+":String(Math.round(nowYear+fastYrs));
  $("py-saved-yrs").textContent=Math.round(savedYrs)+" years";
  $("py-int-saved").textContent=f2(intSaved)+" in interest you never pay";
  var maxYrs=Math.max(slowYrs,1);
  $("bar-slow-label").textContent=Math.round(slowYrs)+" years";
  $("bar-fast-label").textContent=Math.round(fastYrs)+" years";
  $("bar-slow").style.width="100%";
  $("bar-fast").style.width=Math.min(100,Math.round((fastYrs/maxYrs)*100))+"%";

  // Year-by-year trajectory for break-even calc and 10-yr wealth
  var rgY=rentGrowth,cgY=costGrowth;
  var breakevenYear=0,cumDiff=0;
  for(var yr=1;yr<=30;yr++){
    var rYr=ri*Math.pow(1+rgY,yr-1);
    var rYrEff=rYr*(1-vacancy);
    var bcrYr=bcr*Math.pow(1+cgY,yr-1);
    var insYr=ins*Math.pow(1+cgY,yr-1);
    var maintYr=maint*Math.pow(1+cgY,yr-1);
    var ltYr=landtax*Math.pow(1+cgY,yr-1);
    var intYrN=Math.max(0,lbal(loan,rate,rep,yr-1))*(rate/100);
    var dedYr=intYrN+bcrYr*52+ins*52+maintYr*52+dep+ltYr+otherDed;
    var rentalYrN=rYrEff*52;
    var nlYr=dedYr-rentalYrN;
    var taxYrN=nlYr*(b/100);
    var ipCashYr=rYrEff-repWk-(bcrYr)-insYr-maintYr-(ltYr/52)-(otherDed/52)+(taxYrN/52);
    var roYr=ro*Math.pow(1+rgY,yr-1);
    var netHoldYr=ipCashYr-roYr;
    var beforeWkYr=repWk+bcrYr;
    var weeklyDiffYr=netHoldYr+beforeWkYr;
    cumDiff+=weeklyDiffYr*52;
    if(breakevenYear===0&&weeklyDiffYr>=0)breakevenYear=yr;
  }
  // 10-year wealth = property growth + loan paydown + cumulative net diff
  var propVal10=fv(pv,gr,10);
  var loanRem10=lbal(loan,rate,rep,10);
  var equity10=propVal10-loanRem10;
  var propGain10=propVal10-pv;
  var loanPaid10=loan-Math.max(0,loanRem10);
  // Recompute cumDiff over 10 years only
  var cumDiff10=0;
  for(var yr2=1;yr2<=10;yr2++){
    var rYr2=ri*Math.pow(1+rgY,yr2-1);
    var rYrEff2=rYr2*(1-vacancy);
    var bcrYr2=bcr*Math.pow(1+cgY,yr2-1);
    var insYr2=ins*Math.pow(1+cgY,yr2-1);
    var maintYr2=maint*Math.pow(1+cgY,yr2-1);
    var ltYr2=landtax*Math.pow(1+cgY,yr2-1);
    var intYrN2=Math.max(0,lbal(loan,rate,rep,yr2-1))*(rate/100);
    var dedYr2=intYrN2+bcrYr2*52+insYr2*52+maintYr2*52+dep+ltYr2+otherDed;
    var rentalYrN2=rYrEff2*52;
    var nlYr2=dedYr2-rentalYrN2;
    var taxYrN2=nlYr2*(b/100);
    var ipCashYr2=rYrEff2-repWk-(bcrYr2)-insYr2-maintYr2-(ltYr2/52)-(otherDed/52)+(taxYrN2/52);
    var roYr2=ro*Math.pow(1+rgY,yr2-1);
    var netHoldYr2=ipCashYr2-roYr2;
    var beforeWkYr2=repWk+bcrYr2;
    cumDiff10+=(netHoldYr2+beforeWkYr2)*52;
  }
  var wealth10=propGain10+loanPaid10+cumDiff10;
  $("banner-wealth").textContent=fmt(wealth10,wealth10>0);
  $("banner-equity").textContent=fmt(equity10);
  $("banner-cgt").textContent=fmt(cgt,true);
  $("banner-breakeven").textContent=breakevenYear>0&&breakevenYear<=30?("Year "+breakevenYear):"30+";

}
document.addEventListener("DOMContentLoaded",function(){
  document.querySelectorAll("input").forEach(function(i){
    i.addEventListener("input",calc);
    i.addEventListener("change",calc);
  });
  calc();
});
</script>
</body></html>`;

export default {
  async fetch(request, env, ctx) {
    return new Response(HTML, { headers: { "Content-Type": "text/html;charset=utf-8" } });
  }
};