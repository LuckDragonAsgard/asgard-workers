const PAGES = {
  "/PJ_Net_Worth.html": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Net Worth Tracker - PJ Finance</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0f1d2d 0%,#1a2f4b 100%);color:#fff;min-height:100vh;padding:24px 20px}
.wrap{max-width:1100px;margin:0 auto}
.topnav{display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap}
.topnav a.back{color:#4ecdc4;text-decoration:none;font-size:13px;font-weight:600;padding:6px 12px;background:rgba(78,205,196,.1);border-radius:8px;border:1px solid rgba(78,205,196,.3)}
.topnav a.back:hover{background:rgba(78,205,196,.2)}
.topnav .nav-pill{color:#b0c4d4;text-decoration:none;font-size:12px;padding:6px 10px;border-radius:6px}
.topnav .nav-pill:hover{color:#fff;background:rgba(255,255,255,.05)}
.topnav .nav-pill.active{color:#4ecdc4;background:rgba(78,205,196,.1)}
h1{font-size:30px;font-weight:800;color:#4ecdc4;margin-bottom:4px;letter-spacing:-0.01em}
.sub{font-size:13px;color:#b0c4d4;margin-bottom:24px}
.section{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px;margin-bottom:18px}
.section h2{font-size:16px;font-weight:700;color:#fff;margin-bottom:14px}
.row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px}
.row:last-child{border-bottom:none}
.row .lbl{color:#b0c4d4}
.row .val{font-weight:700;color:#fff}
.row.total{border-top:2px solid rgba(255,255,255,.15);margin-top:8px;padding-top:14px;font-size:16px;font-weight:800}
.row.total .val{color:#4ecdc4;font-size:18px}
.row.total .val.neg{color:#ef4444}
.row.total .val.pos{color:#10b981}
.input-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;font-size:13px;gap:12px}
.input-row label{color:#b0c4d4;flex:1}
.input-row input{padding:7px 10px;border:1px solid rgba(255,255,255,.15);border-radius:6px;font-size:13px;font-weight:600;color:#fff;background:rgba(255,255,255,.05);width:140px;text-align:right;font-family:inherit}
.input-row input:focus{outline:none;border-color:#4ecdc4}
.tile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:18px}
.tile{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:18px;text-align:center}
.tile .num{font-size:28px;font-weight:900;color:#4ecdc4;line-height:1}
.tile .lab{font-size:11px;color:#b0c4d4;margin-top:6px;text-transform:uppercase;letter-spacing:0.05em}
.tile.green .num{color:#10b981}
.tile.amber .num{color:#fbbf24}
.tile.red .num{color:#ef4444}
.tile.purple .num{color:#a78bfa}
table.kpi{width:100%;border-collapse:collapse;font-size:13px}
table.kpi th{text-align:left;padding:10px 12px;font-size:11px;color:#7a94a8;text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid rgba(255,255,255,.1)}
table.kpi td{padding:11px 12px;border-bottom:1px solid rgba(255,255,255,.05);font-weight:600}
table.kpi td.num{text-align:right;color:#4ecdc4}
table.kpi td.muted{color:#7a94a8;font-weight:400}
.note{background:rgba(78,205,196,.08);border:1px solid rgba(78,205,196,.2);border-radius:10px;padding:14px 16px;font-size:13px;color:#b0c4d4;line-height:1.55;margin-top:14px}
.note strong{color:#4ecdc4}
.toggle-group{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.toggle-btn{padding:10px 18px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:rgba(255,255,255,.04);cursor:pointer;font-weight:600;font-size:13px;color:#b0c4d4;transition:.15s;font-family:inherit}
.toggle-btn.active{background:rgba(78,205,196,.15);color:#4ecdc4;border-color:rgba(78,205,196,.4)}
@media(max-width:600px){.tile-grid{grid-template-columns:1fr 1fr}.input-row input{width:110px}}</style></head><body><div class="wrap"><div class="topnav"><a class="back" href="/">← PJ Finance Hub</a><a class="nav-pill active" href="/PJ_Net_Worth.html">Net Worth</a><a class="nav-pill" href="/PJ_Dashboard.html">Dashboard</a><a class="nav-pill" href="/PJ_Affordability.html">Affordability</a><a class="nav-pill" href="/PJ_Scorecard.html">Scorecard</a><a class="nav-pill" href="/PJ_Budget_Monitor.html">Accounts</a><a class="nav-pill" href="/PJ_Advice.html">Advice</a><a class="nav-pill" href="/PJ_Claims.html">Claims</a></div><h1>Net Worth Tracker</h1>
<p class="sub">Assets, liabilities, and equity. Toggle between current state and post-Cecil-purchase.</p>
<div class="toggle-group">
  <button class="toggle-btn active" onclick="setScenario('now')" id="t-now">Now (current)</button>
  <button class="toggle-btn" onclick="setScenario('post')" id="t-post">Post-Cecil purchase</button>
</div>
<div class="tile-grid">
  <div class="tile"><div class="num" id="tile-assets">$0</div><div class="lab">Total assets</div></div>
  <div class="tile red"><div class="num" id="tile-liab">$0</div><div class="lab">Total liabilities</div></div>
  <div class="tile green"><div class="num" id="tile-net">$0</div><div class="lab">Net worth</div></div>
  <div class="tile purple"><div class="num" id="tile-lvr">0%</div><div class="lab">Portfolio LVR</div></div>
</div>
<div class="section"><h2>Property assets</h2>
  <div class="input-row"><label>North Rd, Newport (estimated value)</label><input id="nrv" type="number" value="1206000"></div>
  <div class="input-row"><label>Osborne St, Williamstown (estimated value)</label><input id="osv" type="number" value="719000"></div>
  <div class="input-row" id="csv-row" style="display:none"><label>Cecil St (purchase price)</label><input id="csv" type="number" value="1102000"></div>
  <div class="row total"><span>Property total</span><span class="val" id="prop-total">$0</span></div>
</div>
<div class="section"><h2>Other assets</h2>
  <div class="input-row"><label>Cash (banks)</label><input id="cash" type="number" value="170000"></div>
  <div class="input-row"><label>Superannuation (combined)</label><input id="super" type="number" value="450000"></div>
  <div class="input-row"><label>Vehicles</label><input id="vehicles" type="number" value="50000"></div>
  <div class="input-row"><label>Other (shares, business)</label><input id="other" type="number" value="20000"></div>
  <div class="row total"><span>Other assets total</span><span class="val" id="other-total">$0</span></div>
</div>
<div class="section"><h2>Liabilities</h2>
  <div class="input-row"><label>North Rd loan</label><input id="nrl" type="number" value="964800"></div>
  <div class="input-row"><label>Osborne loan</label><input id="osl" type="number" value="575200"></div>
  <div class="input-row" id="csl-row" style="display:none"><label>Cecil St loan</label><input id="csl" type="number" value="881600"></div>
  <div class="row total"><span>Liabilities total</span><span class="val neg" id="liab-total">$0</span></div>
</div>
<div class="section"><h2>Equity by property</h2>
  <table class="kpi">
    <thead><tr><th>Property</th><th style="text-align:right">Value</th><th style="text-align:right">Loan</th><th style="text-align:right">Equity</th><th style="text-align:right">LVR</th></tr></thead>
    <tbody>
      <tr><td>North Rd, Newport</td><td class="num" id="nr-val">-</td><td class="num" id="nr-debt">-</td><td class="num" id="nr-eq">-</td><td class="num" id="nr-lvr">-</td></tr>
      <tr><td>Osborne St, Williamstown</td><td class="num" id="os-val">-</td><td class="num" id="os-debt">-</td><td class="num" id="os-eq">-</td><td class="num" id="os-lvr">-</td></tr>
      <tr id="cs-equity-row" style="display:none"><td>Cecil St (PPOR)</td><td class="num" id="cs-val">-</td><td class="num" id="cs-debt">-</td><td class="num" id="cs-eq">-</td><td class="num" id="cs-lvr">-</td></tr>
    </tbody>
  </table>
</div>
<div class="note"><strong>Notes:</strong> Property values are estimates pending broker valuations (refi plan submitted to Matt 2026-05-04). Update them above to refine. Post-Cecil view assumes the refi-and-purchase has settled.</div>
<script>
function setScenario(s){
  var post=s==="post";
  document.getElementById("csv-row").style.display=post?"flex":"none";
  document.getElementById("csl-row").style.display=post?"flex":"none";
  document.getElementById("cs-equity-row").style.display=post?"table-row":"none";
  document.getElementById("t-now").classList.toggle("active",!post);
  document.getElementById("t-post").classList.toggle("active",post);
  calc();
}
function calc(){
  var post=document.getElementById("t-post").classList.contains("active");
  var nrv=+document.getElementById("nrv").value||0;
  var osv=+document.getElementById("osv").value||0;
  var csv=post?(+document.getElementById("csv").value||0):0;
  var nrl=+document.getElementById("nrl").value||0;
  var osl=+document.getElementById("osl").value||0;
  var csl=post?(+document.getElementById("csl").value||0):0;
  var cash=+document.getElementById("cash").value||0;
  var sup=+document.getElementById("super").value||0;
  var veh=+document.getElementById("vehicles").value||0;
  var other=+document.getElementById("other").value||0;
  var propTotal=nrv+osv+csv;
  var otherTotal=cash+sup+veh+other;
  var assets=propTotal+otherTotal;
  var liab=nrl+osl+csl;
  var net=assets-liab;
  var lvr=propTotal>0?(liab/propTotal*100):0;
  document.getElementById("prop-total").textContent="$"+propTotal.toLocaleString();
  document.getElementById("other-total").textContent="$"+otherTotal.toLocaleString();
  document.getElementById("liab-total").textContent="-$"+liab.toLocaleString();
  document.getElementById("tile-assets").textContent="$"+(assets/1000).toFixed(0)+"k";
  document.getElementById("tile-liab").textContent="-$"+(liab/1000).toFixed(0)+"k";
  document.getElementById("tile-net").textContent="$"+(net/1000).toFixed(0)+"k";
  document.getElementById("tile-lvr").textContent=lvr.toFixed(0)+"%";
  function setRow(prefix,val,debt){
    var eq=val-debt;
    var pct=val>0?(debt/val*100):0;
    document.getElementById(prefix+"-val").textContent="$"+val.toLocaleString();
    document.getElementById(prefix+"-debt").textContent="$"+debt.toLocaleString();
    document.getElementById(prefix+"-eq").textContent="$"+eq.toLocaleString();
    document.getElementById(prefix+"-lvr").textContent=pct.toFixed(0)+"%";
  }
  setRow("nr",nrv,nrl);
  setRow("os",osv,osl);
  if(post)setRow("cs",csv,csl);
}
document.querySelectorAll("input").forEach(function(i){i.addEventListener("input",calc);});
calc();
</script></div></body></html>`,
  "/PJ_Dashboard.html": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Budget Dashboard - PJ Finance</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0f1d2d 0%,#1a2f4b 100%);color:#fff;min-height:100vh;padding:24px 20px}
.wrap{max-width:1100px;margin:0 auto}
.topnav{display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap}
.topnav a.back{color:#4ecdc4;text-decoration:none;font-size:13px;font-weight:600;padding:6px 12px;background:rgba(78,205,196,.1);border-radius:8px;border:1px solid rgba(78,205,196,.3)}
.topnav a.back:hover{background:rgba(78,205,196,.2)}
.topnav .nav-pill{color:#b0c4d4;text-decoration:none;font-size:12px;padding:6px 10px;border-radius:6px}
.topnav .nav-pill:hover{color:#fff;background:rgba(255,255,255,.05)}
.topnav .nav-pill.active{color:#4ecdc4;background:rgba(78,205,196,.1)}
h1{font-size:30px;font-weight:800;color:#4ecdc4;margin-bottom:4px;letter-spacing:-0.01em}
.sub{font-size:13px;color:#b0c4d4;margin-bottom:24px}
.section{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px;margin-bottom:18px}
.section h2{font-size:16px;font-weight:700;color:#fff;margin-bottom:14px}
.row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px}
.row:last-child{border-bottom:none}
.row .lbl{color:#b0c4d4}
.row .val{font-weight:700;color:#fff}
.row.total{border-top:2px solid rgba(255,255,255,.15);margin-top:8px;padding-top:14px;font-size:16px;font-weight:800}
.row.total .val{color:#4ecdc4;font-size:18px}
.row.total .val.neg{color:#ef4444}
.row.total .val.pos{color:#10b981}
.input-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;font-size:13px;gap:12px}
.input-row label{color:#b0c4d4;flex:1}
.input-row input{padding:7px 10px;border:1px solid rgba(255,255,255,.15);border-radius:6px;font-size:13px;font-weight:600;color:#fff;background:rgba(255,255,255,.05);width:140px;text-align:right;font-family:inherit}
.input-row input:focus{outline:none;border-color:#4ecdc4}
.tile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:18px}
.tile{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:18px;text-align:center}
.tile .num{font-size:28px;font-weight:900;color:#4ecdc4;line-height:1}
.tile .lab{font-size:11px;color:#b0c4d4;margin-top:6px;text-transform:uppercase;letter-spacing:0.05em}
.tile.green .num{color:#10b981}
.tile.amber .num{color:#fbbf24}
.tile.red .num{color:#ef4444}
.tile.purple .num{color:#a78bfa}
table.kpi{width:100%;border-collapse:collapse;font-size:13px}
table.kpi th{text-align:left;padding:10px 12px;font-size:11px;color:#7a94a8;text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid rgba(255,255,255,.1)}
table.kpi td{padding:11px 12px;border-bottom:1px solid rgba(255,255,255,.05);font-weight:600}
table.kpi td.num{text-align:right;color:#4ecdc4}
table.kpi td.muted{color:#7a94a8;font-weight:400}
.note{background:rgba(78,205,196,.08);border:1px solid rgba(78,205,196,.2);border-radius:10px;padding:14px 16px;font-size:13px;color:#b0c4d4;line-height:1.55;margin-top:14px}
.note strong{color:#4ecdc4}
.toggle-group{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.toggle-btn{padding:10px 18px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:rgba(255,255,255,.04);cursor:pointer;font-weight:600;font-size:13px;color:#b0c4d4;transition:.15s;font-family:inherit}
.toggle-btn.active{background:rgba(78,205,196,.15);color:#4ecdc4;border-color:rgba(78,205,196,.4)}
@media(max-width:600px){.tile-grid{grid-template-columns:1fr 1fr}.input-row input{width:110px}}</style></head><body><div class="wrap"><div class="topnav"><a class="back" href="/">← PJ Finance Hub</a><a class="nav-pill" href="/PJ_Net_Worth.html">Net Worth</a><a class="nav-pill active" href="/PJ_Dashboard.html">Dashboard</a><a class="nav-pill" href="/PJ_Affordability.html">Affordability</a><a class="nav-pill" href="/PJ_Scorecard.html">Scorecard</a><a class="nav-pill" href="/PJ_Budget_Monitor.html">Accounts</a><a class="nav-pill" href="/PJ_Advice.html">Advice</a><a class="nav-pill" href="/PJ_Claims.html">Claims</a></div><h1>Budget Dashboard</h1>
<p class="sub">Weekly cashflow - incomes vs expenses, including IPs.</p>
<div class="toggle-group">
  <button class="toggle-btn active" onclick="setMode('now')" id="m-now">Now (live in Osborne)</button>
  <button class="toggle-btn" onclick="setMode('post')" id="m-post">Post-Cecil move</button>
</div>
<div class="tile-grid">
  <div class="tile green"><div class="num" id="tile-in">$0</div><div class="lab">Weekly income</div></div>
  <div class="tile red"><div class="num" id="tile-out">$0</div><div class="lab">Weekly outgoings</div></div>
  <div class="tile" id="tile-savings-wrap"><div class="num" id="tile-savings">$0</div><div class="lab">Weekly surplus / deficit</div></div>
  <div class="tile purple"><div class="num" id="tile-saverate">0%</div><div class="lab">Savings rate</div></div>
</div>
<div class="section"><h2>Income (weekly)</h2>
  <div class="input-row"><label>Paddy net pay (after tax)</label><input id="pad-net" type="number" value="1700"></div>
  <div class="input-row"><label>Jacky net pay (after tax)</label><input id="jac-net" type="number" value="2900"></div>
  <div class="input-row"><label>North Rd rent</label><input id="nr-rent" type="number" value="792"></div>
  <div class="input-row" id="osr-row" style="display:none"><label>Osborne rent (post-move)</label><input id="os-rent" type="number" value="650"></div>
  <div class="input-row"><label>ATO PAYG refund (negative gearing)</label><input id="ato" type="number" value="50"></div>
  <div class="row total"><span>Total income</span><span class="val pos" id="inc-total">$0/wk</span></div>
</div>
<div class="section"><h2>Property outgoings (weekly)</h2>
  <div class="input-row"><label>North Rd repayment</label><input id="nrr" type="number" value="1338"></div>
  <div class="input-row" id="osr-now-row"><label>Osborne repayment (you live there)</label><input id="osr-now" type="number" value="685"></div>
  <div class="input-row" id="osr-post-row" style="display:none"><label>Osborne repayment (now IP)</label><input id="osr-post" type="number" value="817"></div>
  <div class="input-row" id="csr-row" style="display:none"><label>Cecil St mortgage</label><input id="csr" type="number" value="1155"></div>
  <div class="input-row"><label>NR mgmt + costs</label><input id="nrcost" type="number" value="80"></div>
  <div class="input-row"><label>Osborne body corp / rates</label><input id="oscost" type="number" value="40"></div>
  <div class="input-row"><label>NR + Osborne land tax (weekly avg)</label><input id="lt" type="number" value="307"></div>
  <div class="row total"><span>Property outgoings</span><span class="val neg" id="prop-out">$0/wk</span></div>
</div>
<div class="section"><h2>Living costs (weekly)</h2>
  <div class="input-row"><label>Groceries / food</label><input id="food" type="number" value="350"></div>
  <div class="input-row"><label>Utilities (gas, elec, water, internet)</label><input id="util" type="number" value="120"></div>
  <div class="input-row"><label>Transport (fuel, rego, services)</label><input id="trans" type="number" value="180"></div>
  <div class="input-row"><label>Insurance (health, car, contents)</label><input id="ins" type="number" value="120"></div>
  <div class="input-row"><label>Subscriptions / phones</label><input id="subs" type="number" value="60"></div>
  <div class="input-row"><label>Discretionary (dining, hobbies, gifts)</label><input id="disc" type="number" value="450"></div>
  <div class="input-row"><label>Kids / family (school, activities)</label><input id="kids" type="number" value="200"></div>
  <div class="row total"><span>Living costs</span><span class="val neg" id="live-out">$0/wk</span></div>
</div>
<div class="note"><strong>Salary defaults are estimates</strong> based on $118k Paddy / $220k Jacky after tax. Plug your real net-pay numbers for accuracy.</div>
<script>
function setMode(m){
  var post=m==="post";
  document.getElementById("osr-row").style.display=post?"flex":"none";
  document.getElementById("osr-now-row").style.display=post?"none":"flex";
  document.getElementById("osr-post-row").style.display=post?"flex":"none";
  document.getElementById("csr-row").style.display=post?"flex":"none";
  document.getElementById("m-now").classList.toggle("active",!post);
  document.getElementById("m-post").classList.toggle("active",post);
  calc();
}
function calc(){
  var post=document.getElementById("m-post").classList.contains("active");
  var pad=+document.getElementById("pad-net").value||0;
  var jac=+document.getElementById("jac-net").value||0;
  var nrR=+document.getElementById("nr-rent").value||0;
  var osR=post?(+document.getElementById("os-rent").value||0):0;
  var ato=+document.getElementById("ato").value||0;
  var inc=pad+jac+nrR+osR+ato;
  var nrr=+document.getElementById("nrr").value||0;
  var osrNow=post?0:(+document.getElementById("osr-now").value||0);
  var osrPost=post?(+document.getElementById("osr-post").value||0):0;
  var csr=post?(+document.getElementById("csr").value||0):0;
  var nrc=+document.getElementById("nrcost").value||0;
  var osc=+document.getElementById("oscost").value||0;
  var lt=+document.getElementById("lt").value||0;
  var propOut=nrr+osrNow+osrPost+csr+nrc+osc+lt;
  var food=+document.getElementById("food").value||0;
  var util=+document.getElementById("util").value||0;
  var trans=+document.getElementById("trans").value||0;
  var ins=+document.getElementById("ins").value||0;
  var subs=+document.getElementById("subs").value||0;
  var disc=+document.getElementById("disc").value||0;
  var kids=+document.getElementById("kids").value||0;
  var liveOut=food+util+trans+ins+subs+disc+kids;
  var totalOut=propOut+liveOut;
  var savings=inc-totalOut;
  var saveRate=inc>0?(savings/inc*100):0;
  function fmt(n,suf){return (n<0?"-":"")+"$"+Math.round(Math.abs(n)).toLocaleString()+(suf||"");}
  document.getElementById("inc-total").textContent=fmt(inc,"/wk");
  document.getElementById("prop-out").textContent=fmt(-propOut,"/wk");
  document.getElementById("live-out").textContent=fmt(-liveOut,"/wk");
  document.getElementById("tile-in").textContent=fmt(inc);
  document.getElementById("tile-out").textContent=fmt(-totalOut);
  document.getElementById("tile-savings").textContent=fmt(savings);
  document.getElementById("tile-savings-wrap").className="tile "+(savings>=0?"green":"red");
  document.getElementById("tile-saverate").textContent=saveRate.toFixed(0)+"%";
}
document.querySelectorAll("input").forEach(function(i){i.addEventListener("input",calc);});
calc();
</script></div></body></html>`,
  "/PJ_Affordability.html": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Affordability - PJ Finance</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0f1d2d 0%,#1a2f4b 100%);color:#fff;min-height:100vh;padding:24px 20px}
.wrap{max-width:1100px;margin:0 auto}
.topnav{display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap}
.topnav a.back{color:#4ecdc4;text-decoration:none;font-size:13px;font-weight:600;padding:6px 12px;background:rgba(78,205,196,.1);border-radius:8px;border:1px solid rgba(78,205,196,.3)}
.topnav a.back:hover{background:rgba(78,205,196,.2)}
.topnav .nav-pill{color:#b0c4d4;text-decoration:none;font-size:12px;padding:6px 10px;border-radius:6px}
.topnav .nav-pill:hover{color:#fff;background:rgba(255,255,255,.05)}
.topnav .nav-pill.active{color:#4ecdc4;background:rgba(78,205,196,.1)}
h1{font-size:30px;font-weight:800;color:#4ecdc4;margin-bottom:4px;letter-spacing:-0.01em}
.sub{font-size:13px;color:#b0c4d4;margin-bottom:24px}
.section{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px;margin-bottom:18px}
.section h2{font-size:16px;font-weight:700;color:#fff;margin-bottom:14px}
.row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px}
.row:last-child{border-bottom:none}
.row .lbl{color:#b0c4d4}
.row .val{font-weight:700;color:#fff}
.row.total{border-top:2px solid rgba(255,255,255,.15);margin-top:8px;padding-top:14px;font-size:16px;font-weight:800}
.row.total .val{color:#4ecdc4;font-size:18px}
.row.total .val.neg{color:#ef4444}
.row.total .val.pos{color:#10b981}
.input-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;font-size:13px;gap:12px}
.input-row label{color:#b0c4d4;flex:1}
.input-row input{padding:7px 10px;border:1px solid rgba(255,255,255,.15);border-radius:6px;font-size:13px;font-weight:600;color:#fff;background:rgba(255,255,255,.05);width:140px;text-align:right;font-family:inherit}
.input-row input:focus{outline:none;border-color:#4ecdc4}
.tile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:18px}
.tile{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:18px;text-align:center}
.tile .num{font-size:28px;font-weight:900;color:#4ecdc4;line-height:1}
.tile .lab{font-size:11px;color:#b0c4d4;margin-top:6px;text-transform:uppercase;letter-spacing:0.05em}
.tile.green .num{color:#10b981}
.tile.amber .num{color:#fbbf24}
.tile.red .num{color:#ef4444}
.tile.purple .num{color:#a78bfa}
table.kpi{width:100%;border-collapse:collapse;font-size:13px}
table.kpi th{text-align:left;padding:10px 12px;font-size:11px;color:#7a94a8;text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid rgba(255,255,255,.1)}
table.kpi td{padding:11px 12px;border-bottom:1px solid rgba(255,255,255,.05);font-weight:600}
table.kpi td.num{text-align:right;color:#4ecdc4}
table.kpi td.muted{color:#7a94a8;font-weight:400}
.note{background:rgba(78,205,196,.08);border:1px solid rgba(78,205,196,.2);border-radius:10px;padding:14px 16px;font-size:13px;color:#b0c4d4;line-height:1.55;margin-top:14px}
.note strong{color:#4ecdc4}
.toggle-group{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.toggle-btn{padding:10px 18px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:rgba(255,255,255,.04);cursor:pointer;font-weight:600;font-size:13px;color:#b0c4d4;transition:.15s;font-family:inherit}
.toggle-btn.active{background:rgba(78,205,196,.15);color:#4ecdc4;border-color:rgba(78,205,196,.4)}
@media(max-width:600px){.tile-grid{grid-template-columns:1fr 1fr}.input-row input{width:110px}}</style></head><body><div class="wrap"><div class="topnav"><a class="back" href="/">← PJ Finance Hub</a><a class="nav-pill" href="/PJ_Net_Worth.html">Net Worth</a><a class="nav-pill" href="/PJ_Dashboard.html">Dashboard</a><a class="nav-pill active" href="/PJ_Affordability.html">Affordability</a><a class="nav-pill" href="/PJ_Scorecard.html">Scorecard</a><a class="nav-pill" href="/PJ_Budget_Monitor.html">Accounts</a><a class="nav-pill" href="/PJ_Advice.html">Advice</a><a class="nav-pill" href="/PJ_Claims.html">Claims</a></div><h1>Affordability</h1>
<p class="sub">Stress-tested borrowing capacity given your portfolio + Cecil St plan.</p>
<div class="tile-grid">
  <div class="tile"><div class="num" id="tile-current">$0</div><div class="lab">Current total debt</div></div>
  <div class="tile amber"><div class="num" id="tile-post">$0</div><div class="lab">Post-Cecil debt</div></div>
  <div class="tile green"><div class="num" id="tile-buffer">$0</div><div class="lab">Annual rate-rise impact (+2%)</div></div>
  <div class="tile purple"><div class="num" id="tile-comfort">$0</div><div class="lab">Comfortable max purchase</div></div>
</div>
<div class="section"><h2>Servicing assumptions</h2>
  <div class="input-row"><label>Combined gross household income</label><input id="hh" type="number" value="338000"></div>
  <div class="input-row"><label>Bank-assumed living costs (HEM)</label><input id="hem" type="number" value="65000"></div>
  <div class="input-row"><label>Stress-test rate (assessment)</label><input id="srate" type="number" value="8.5" step="0.1"></div>
  <div class="input-row"><label>Rental income inclusion (banks discount 20%)</label><input id="rentinc" type="number" value="60000"></div>
</div>
<div class="section"><h2>Stress test - current rates +2%</h2>
  <table class="kpi">
    <thead><tr><th>Property</th><th style="text-align:right">Loan</th><th style="text-align:right">Current</th><th style="text-align:right">Stress +2%</th><th style="text-align:right">Repayment</th></tr></thead>
    <tbody>
      <tr><td>North Rd</td><td class="num">$964,800</td><td class="num">6.02%</td><td class="num">8.02%</td><td class="num" id="ss-nr">-</td></tr>
      <tr><td>Osborne</td><td class="num">$575,200</td><td class="num">5.75%</td><td class="num">7.75%</td><td class="num" id="ss-os">-</td></tr>
      <tr><td>Cecil St (planned)</td><td class="num">$660,000</td><td class="num">5.5%</td><td class="num">7.5%</td><td class="num" id="ss-cs">-</td></tr>
    </tbody>
  </table>
</div>
<div class="note"><strong>Calc method:</strong> Banks assess at +2-3% above your actual rate. Your borrowing capacity above is at 8.5% (typical APRA buffer). Rental income is included at 80% (banks discount 20% for vacancy/management).</div>
<script>
var NR_L=964800,NR_R=6.02,OS_L=575200,OS_R=6.25,CS_L=881600,CS_R=5.5;
function pi(loan,rate,years){
  var r=rate/100/12,n=years*12;
  return loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
}
function calc(){
  var hh=+document.getElementById("hh").value||0;
  var hem=+document.getElementById("hem").value||0;
  var srate=+document.getElementById("srate").value||0;
  var ri=+document.getElementById("rentinc").value||0;
  var nrSS=pi(NR_L,NR_R+2,30);
  var osSS=pi(OS_L,OS_R+2,30);
  var csSS=pi(CS_L,CS_R+2,30);
  document.getElementById("ss-nr").textContent="$"+Math.round(nrSS).toLocaleString()+"/mo";
  document.getElementById("ss-os").textContent="$"+Math.round(osSS).toLocaleString()+"/mo";
  document.getElementById("ss-cs").textContent="$"+Math.round(csSS).toLocaleString()+"/mo";
  var current=NR_L+OS_L;
  var post=NR_L+OS_L+CS_L;
  document.getElementById("tile-current").textContent="$"+(current/1000).toFixed(0)+"k";
  document.getElementById("tile-post").textContent="$"+(post/1000).toFixed(0)+"k";
  var nrCur=pi(NR_L,NR_R,30);
  var osCur=pi(OS_L,OS_R,30);
  var csCur=pi(CS_L,CS_R,30);
  var diff=(nrSS-nrCur+osSS-osCur+csSS-csCur)*12;
  document.getElementById("tile-buffer").textContent="$"+(diff/1000).toFixed(0)+"k";
  var availYr=hh-hem-(nrSS+osSS+csSS)*12+ri*0.8;
  var maxMo=availYr/12;
  var mr=srate/100/12;
  var maxLoan=maxMo*(Math.pow(1+mr,360)-1)/(mr*Math.pow(1+mr,360));
  document.getElementById("tile-comfort").textContent="$"+(Math.max(0,maxLoan)/1000000).toFixed(2)+"M";
}
document.querySelectorAll("input").forEach(function(i){i.addEventListener("input",calc);});
calc();
</script></div></body></html>`,
  "/PJ_Scorecard.html": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Financial Scorecard - PJ Finance</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0f1d2d 0%,#1a2f4b 100%);color:#fff;min-height:100vh;padding:24px 20px}
.wrap{max-width:1100px;margin:0 auto}
.topnav{display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap}
.topnav a.back{color:#4ecdc4;text-decoration:none;font-size:13px;font-weight:600;padding:6px 12px;background:rgba(78,205,196,.1);border-radius:8px;border:1px solid rgba(78,205,196,.3)}
.topnav a.back:hover{background:rgba(78,205,196,.2)}
.topnav .nav-pill{color:#b0c4d4;text-decoration:none;font-size:12px;padding:6px 10px;border-radius:6px}
.topnav .nav-pill:hover{color:#fff;background:rgba(255,255,255,.05)}
.topnav .nav-pill.active{color:#4ecdc4;background:rgba(78,205,196,.1)}
h1{font-size:30px;font-weight:800;color:#4ecdc4;margin-bottom:4px;letter-spacing:-0.01em}
.sub{font-size:13px;color:#b0c4d4;margin-bottom:24px}
.section{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px;margin-bottom:18px}
.section h2{font-size:16px;font-weight:700;color:#fff;margin-bottom:14px}
.row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px}
.row:last-child{border-bottom:none}
.row .lbl{color:#b0c4d4}
.row .val{font-weight:700;color:#fff}
.row.total{border-top:2px solid rgba(255,255,255,.15);margin-top:8px;padding-top:14px;font-size:16px;font-weight:800}
.row.total .val{color:#4ecdc4;font-size:18px}
.row.total .val.neg{color:#ef4444}
.row.total .val.pos{color:#10b981}
.input-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;font-size:13px;gap:12px}
.input-row label{color:#b0c4d4;flex:1}
.input-row input{padding:7px 10px;border:1px solid rgba(255,255,255,.15);border-radius:6px;font-size:13px;font-weight:600;color:#fff;background:rgba(255,255,255,.05);width:140px;text-align:right;font-family:inherit}
.input-row input:focus{outline:none;border-color:#4ecdc4}
.tile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:18px}
.tile{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:18px;text-align:center}
.tile .num{font-size:28px;font-weight:900;color:#4ecdc4;line-height:1}
.tile .lab{font-size:11px;color:#b0c4d4;margin-top:6px;text-transform:uppercase;letter-spacing:0.05em}
.tile.green .num{color:#10b981}
.tile.amber .num{color:#fbbf24}
.tile.red .num{color:#ef4444}
.tile.purple .num{color:#a78bfa}
table.kpi{width:100%;border-collapse:collapse;font-size:13px}
table.kpi th{text-align:left;padding:10px 12px;font-size:11px;color:#7a94a8;text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid rgba(255,255,255,.1)}
table.kpi td{padding:11px 12px;border-bottom:1px solid rgba(255,255,255,.05);font-weight:600}
table.kpi td.num{text-align:right;color:#4ecdc4}
table.kpi td.muted{color:#7a94a8;font-weight:400}
.note{background:rgba(78,205,196,.08);border:1px solid rgba(78,205,196,.2);border-radius:10px;padding:14px 16px;font-size:13px;color:#b0c4d4;line-height:1.55;margin-top:14px}
.note strong{color:#4ecdc4}
.toggle-group{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap}
.toggle-btn{padding:10px 18px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:rgba(255,255,255,.04);cursor:pointer;font-weight:600;font-size:13px;color:#b0c4d4;transition:.15s;font-family:inherit}
.toggle-btn.active{background:rgba(78,205,196,.15);color:#4ecdc4;border-color:rgba(78,205,196,.4)}
@media(max-width:600px){.tile-grid{grid-template-columns:1fr 1fr}.input-row input{width:110px}}</style></head><body><div class="wrap"><div class="topnav"><a class="back" href="/">← PJ Finance Hub</a><a class="nav-pill" href="/PJ_Net_Worth.html">Net Worth</a><a class="nav-pill" href="/PJ_Dashboard.html">Dashboard</a><a class="nav-pill" href="/PJ_Affordability.html">Affordability</a><a class="nav-pill active" href="/PJ_Scorecard.html">Scorecard</a><a class="nav-pill" href="/PJ_Budget_Monitor.html">Accounts</a><a class="nav-pill" href="/PJ_Advice.html">Advice</a><a class="nav-pill" href="/PJ_Claims.html">Claims</a></div><h1>Financial Scorecard</h1>
<p class="sub">Health KPIs across savings, debt, diversification and tax efficiency.</p>
<div class="tile-grid">
  <div class="tile green"><div class="num" id="kpi-savings">0%</div><div class="lab">Savings rate</div></div>
  <div class="tile"><div class="num" id="kpi-dti">0x</div><div class="lab">Debt-to-income</div></div>
  <div class="tile amber"><div class="num" id="kpi-lvr">0%</div><div class="lab">Portfolio LVR</div></div>
  <div class="tile purple"><div class="num" id="kpi-prop">0%</div><div class="lab">Wealth in property</div></div>
</div>
<div class="section"><h2>KPI breakdown</h2>
  <table class="kpi">
    <thead><tr><th>Metric</th><th style="text-align:right">Your value</th><th style="text-align:right">Benchmark</th><th style="text-align:right">Status</th></tr></thead>
    <tbody>
      <tr><td>Savings rate (target 20%+)</td><td class="num" id="m-sav">-</td><td class="muted">20%</td><td class="num" id="s-sav">-</td></tr>
      <tr><td>Debt-to-income (sub 6x healthy)</td><td class="num" id="m-dti">-</td><td class="muted">6x</td><td class="num" id="s-dti">-</td></tr>
      <tr><td>Portfolio LVR (sub 70% safe)</td><td class="num" id="m-lvr">-</td><td class="muted">70%</td><td class="num" id="s-lvr">-</td></tr>
      <tr><td>Liquid emergency fund (3+ months)</td><td class="num" id="m-em">-</td><td class="muted">3 mo</td><td class="num" id="s-em">-</td></tr>
      <tr><td>Property concentration (under 80%)</td><td class="num" id="m-pc">-</td><td class="muted">80%</td><td class="num" id="s-pc">-</td></tr>
      <tr><td>Tax-deductible debt ratio (max it)</td><td class="num" id="m-td">-</td><td class="muted">>50%</td><td class="num" id="s-td">-</td></tr>
    </tbody>
  </table>
</div>
<div class="note"><strong>What these mean:</strong> Savings rate is what % of household gross income you keep. DTI is total debt divided by gross income. LVR is loan/value across all property. Emergency fund in months of total weekly outgoings. Tax-deductible debt ratio matters because IP debt costs you ~65c after tax vs $1 of PPOR debt at full sticker.</div>
<script>
function pct(n){return (n*100).toFixed(0)+"%";}
function calc(){
  var hh=338000;
  var saveYr=30000;
  var totalDebt=964800+575200+881600;
  var propVal=1206000+719000+1102000;
  var totalAssets=propVal+170000+450000+50000+20000;
  var liquidCash=170000;
  var weeklyOut=4500;
  var dedDebt=703000+502000;
  var savRate=saveYr/hh;
  var dti=totalDebt/hh;
  var lvr=totalDebt/propVal;
  var emergency=liquidCash/(weeklyOut*4.33);
  var propConc=propVal/totalAssets;
  var tdRatio=dedDebt/totalDebt;
  function setMetric(id,fmt){document.getElementById("m-"+id).textContent=fmt;}
  function setStatus(id,ok){var el=document.getElementById("s-"+id);el.textContent=ok?"OK":"WARN";el.style.color=ok?"#10b981":"#fbbf24";}
  setMetric("sav",pct(savRate));
  setMetric("dti",dti.toFixed(1)+"x");
  setMetric("lvr",pct(lvr));
  setMetric("em",emergency.toFixed(1)+" mo");
  setMetric("pc",pct(propConc));
  setMetric("td",pct(tdRatio));
  setStatus("sav",savRate>=0.20);
  setStatus("dti",dti<=6);
  setStatus("lvr",lvr<=0.70);
  setStatus("em",emergency>=3);
  setStatus("pc",propConc<=0.80);
  setStatus("td",tdRatio>=0.50);
  document.getElementById("kpi-savings").textContent=pct(savRate);
  document.getElementById("kpi-dti").textContent=dti.toFixed(1)+"x";
  document.getElementById("kpi-lvr").textContent=pct(lvr);
  document.getElementById("kpi-prop").textContent=pct(propConc);
}
calc();
</script></div></body></html>`,
  "/PJ_Budget_Monitor.html": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Account Monitor - PJ Finance</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0f1d2d 0%,#1a2f4b 100%);color:#fff;min-height:100vh;padding:24px 20px}
.wrap{max-width:1100px;margin:0 auto}
.topnav{display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap}
.topnav a.back{color:#4ecdc4;text-decoration:none;font-size:13px;font-weight:600;padding:6px 12px;background:rgba(78,205,196,.1);border-radius:8px;border:1px solid rgba(78,205,196,.3)}
.topnav a.back:hover{background:rgba(78,205,196,.2)}
.topnav .nav-pill{color:#b0c4d4;text-decoration:none;font-size:12px;padding:6px 10px;border-radius:6px}
.topnav .nav-pill:hover{color:#fff;background:rgba(255,255,255,.05)}
.topnav .nav-pill.active{color:#4ecdc4;background:rgba(78,205,196,.1)}
h1{font-size:30px;font-weight:800;color:#4ecdc4;margin-bottom:4px;letter-spacing:-0.01em}
.sub{font-size:13px;color:#b0c4d4;margin-bottom:24px}
.section{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px;margin-bottom:18px}
.section h2{font-size:16px;font-weight:700;color:#fff;margin-bottom:14px}
.row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px}
.row:last-child{border-bottom:none}
.row .lbl{color:#b0c4d4}
.row .val{font-weight:700;color:#fff}
.row.total{border-top:2px solid rgba(255,255,255,.15);margin-top:8px;padding-top:14px;font-size:16px;font-weight:800}
.row.total .val{color:#4ecdc4;font-size:18px}
.tile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:18px}
.tile{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:18px;text-align:center}
.tile .num{font-size:28px;font-weight:900;color:#4ecdc4;line-height:1}
.tile .lab{font-size:11px;color:#b0c4d4;margin-top:6px;text-transform:uppercase;letter-spacing:0.05em}
.tile.green .num{color:#10b981}
.tile.amber .num{color:#fbbf24}
.tile.red .num{color:#ef4444}
.tile.purple .num{color:#a78bfa}
.note{background:rgba(78,205,196,.08);border:1px solid rgba(78,205,196,.2);border-radius:10px;padding:14px 16px;font-size:13px;color:#b0c4d4;line-height:1.55;margin-top:14px}
.note strong{color:#4ecdc4}
@media(max-width:600px){.tile-grid{grid-template-columns:1fr 1fr}}

.account-list,.claim-list{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
.account-card,.claim-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px}
.account-card .acct-name,.claim-card .claim-name{flex:1;font-weight:600;font-size:14px}
.account-card .acct-bal,.claim-card .claim-amt{font-weight:800;font-size:16px;color:#4ecdc4;text-align:right;min-width:120px}
.account-card .acct-bal.low{color:#ef4444}
.account-card .acct-bal.watch{color:#fbbf24}
.account-card .acct-bal.ok{color:#10b981}
.account-card .status-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.status-dot.low{background:#ef4444}.status-dot.watch{background:#fbbf24}.status-dot.ok{background:#10b981}
.btn-row{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.btn{padding:8px 14px;border:1px solid rgba(78,205,196,.4);border-radius:8px;background:rgba(78,205,196,.1);color:#4ecdc4;cursor:pointer;font-weight:600;font-size:13px;font-family:inherit}
.btn:hover{background:rgba(78,205,196,.2)}
.btn.danger{border-color:rgba(239,68,68,.4);background:rgba(239,68,68,.1);color:#ef4444}
.btn.danger:hover{background:rgba(239,68,68,.2)}
.btn-mini{padding:4px 10px;font-size:11px}
.add-form{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px;margin-bottom:14px}
.add-form label{font-size:11px;color:#7a94a8;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px}
.add-form input,.add-form select{width:100%;padding:8px 10px;border:1px solid rgba(255,255,255,.15);border-radius:6px;font-size:13px;color:#fff;background:rgba(255,255,255,.05);font-family:inherit;margin-bottom:10px}
.add-form input:focus,.add-form select:focus{outline:none;border-color:#4ecdc4}
.advice-list{display:flex;flex-direction:column;gap:14px}
.advice-card{background:rgba(255,255,255,.04);border-left:4px solid #4ecdc4;border-radius:10px;padding:16px 18px}
.advice-card.high{border-left-color:#10b981}
.advice-card.med{border-left-color:#fbbf24}
.advice-card.low{border-left-color:#7a94a8}
.advice-card .advice-title{font-weight:700;font-size:15px;margin-bottom:6px}
.advice-card .advice-body{font-size:13px;color:#b0c4d4;line-height:1.6}
.advice-card .advice-impact{font-size:12px;color:#4ecdc4;margin-top:8px;font-weight:600}
</style></head><body><div class="wrap"><div class="topnav"><a class="back" href="/">← PJ Finance Hub</a><a class="nav-pill" href="/PJ_Net_Worth.html">Net Worth</a><a class="nav-pill" href="/PJ_Dashboard.html">Dashboard</a><a class="nav-pill" href="/PJ_Affordability.html">Affordability</a><a class="nav-pill" href="/PJ_Scorecard.html">Scorecard</a><a class="nav-pill active" href="/PJ_Budget_Monitor.html">Accounts</a><a class="nav-pill" href="/PJ_Advice.html">Advice</a><a class="nav-pill" href="/PJ_Claims.html">Claims</a></div><h1>Account Monitor</h1>
<p class="sub">Track all your bank accounts, balances and threshold alerts. Saved locally to your browser.</p>

<div class="tile-grid">
  <div class="tile"><div class="num" id="t-count">0</div><div class="lab">Accounts tracked</div></div>
  <div class="tile green"><div class="num" id="t-total">$0</div><div class="lab">Total balance</div></div>
  <div class="tile amber"><div class="num" id="t-watch">0</div><div class="lab">Watch</div></div>
  <div class="tile red"><div class="num" id="t-low">0</div><div class="lab">Low</div></div>
</div>

<div class="section">
  <h2>Add new account</h2>
  <div class="add-form">
    <label>Bank / nickname</label><input id="new-name" placeholder="e.g. CBA Everyday" />
    <label>Current balance ($)</label><input id="new-bal" type="number" placeholder="0" />
    <label>Watch threshold (alert if below this)</label><input id="new-watch" type="number" placeholder="e.g. 5000" />
    <label>Low threshold (urgent alert)</label><input id="new-low" type="number" placeholder="e.g. 1000" />
    <label>Type</label>
    <select id="new-type">
      <option>Everyday</option><option>Savings</option><option>Offset</option>
      <option>Credit card</option><option>Joint</option><option>Business</option>
    </select>
    <button class="btn" onclick="addAccount()">+ Add account</button>
  </div>
</div>

<div class="section">
  <h2>Accounts</h2>
  <div class="account-list" id="list"></div>
  <div class="btn-row">
    <button class="btn" onclick="exportData()">Export JSON</button>
    <button class="btn" onclick="importData()">Import JSON</button>
    <button class="btn danger" onclick="clearAll()">Clear all</button>
  </div>
</div>

<div class="note">
  <strong>How thresholds work:</strong> A balance below the watch threshold flips the dot to amber, below low threshold to red. Useful for spotting accounts drifting toward overdraft or savings goals slipping. All data lives in your browser local storage - nothing leaves this device.
</div>

<script>
var KEY = "pj_accounts_v1";
function getAccounts(){
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch(e) { return []; }
}
function saveAccounts(a){ localStorage.setItem(KEY, JSON.stringify(a)); render(); }
function addAccount(){
  var name = document.getElementById("new-name").value.trim();
  var bal = +document.getElementById("new-bal").value || 0;
  var watch = +document.getElementById("new-watch").value || 0;
  var low = +document.getElementById("new-low").value || 0;
  var type = document.getElementById("new-type").value;
  if (!name) { alert("Account name required"); return; }
  var a = getAccounts();
  a.push({id: Date.now(), name: name, balance: bal, watch: watch, low: low, type: type});
  saveAccounts(a);
  document.getElementById("new-name").value = "";
  document.getElementById("new-bal").value = "";
  document.getElementById("new-watch").value = "";
  document.getElementById("new-low").value = "";
}
function deleteAccount(id){
  if (!confirm("Delete this account?")) return;
  saveAccounts(getAccounts().filter(function(x){return x.id !== id;}));
}
function updateBalance(id, val){
  var a = getAccounts();
  var ix = a.findIndex(function(x){return x.id === id;});
  if (ix >= 0) { a[ix].balance = +val || 0; saveAccounts(a); }
}
function getStatus(a){
  if (a.balance <= a.low) return "low";
  if (a.balance <= a.watch) return "watch";
  return "ok";
}
function render(){
  var accs = getAccounts();
  var list = document.getElementById("list");
  if (accs.length === 0) {
    list.innerHTML = "<div style=\\"text-align:center;color:#7a94a8;padding:30px;font-size:14px\\">No accounts yet. Add one above to get started.</div>";
    document.getElementById("t-count").textContent = "0";
    document.getElementById("t-total").textContent = "$0";
    document.getElementById("t-watch").textContent = "0";
    document.getElementById("t-low").textContent = "0";
    return;
  }
  var total = 0, watch = 0, low = 0;
  list.innerHTML = accs.map(function(a){
    var status = getStatus(a);
    total += a.balance;
    if (status === "watch") watch++;
    if (status === "low") low++;
    return '<div class="account-card">' +
      '<div class="status-dot ' + status + '"></div>' +
      '<div class="acct-name">' + escapeHtml(a.name) + '<div style="font-size:11px;color:#7a94a8;font-weight:400;margin-top:2px">' + a.type + ' &middot; watch $' + a.watch.toLocaleString() + ' / low $' + a.low.toLocaleString() + '</div></div>' +
      '<input type="number" value="' + a.balance + '" onchange="updateBalance(' + a.id + ', this.value)" style="width:120px;padding:6px 8px;border:1px solid rgba(255,255,255,.15);border-radius:6px;background:rgba(255,255,255,.05);color:#fff;text-align:right;font-weight:700">' +
      '<button class="btn btn-mini danger" onclick="deleteAccount(' + a.id + ')">Delete</button>' +
      '</div>';
  }).join("");
  document.getElementById("t-count").textContent = accs.length;
  document.getElementById("t-total").textContent = "$" + total.toLocaleString();
  document.getElementById("t-watch").textContent = watch;
  document.getElementById("t-low").textContent = low;
}
function escapeHtml(s){ var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
function exportData(){
  var data = JSON.stringify(getAccounts(), null, 2);
  var b = new Blob([data], {type: "application/json"});
  var url = URL.createObjectURL(b);
  var a = document.createElement("a");
  a.href = url; a.download = "pj_accounts.json"; a.click();
  URL.revokeObjectURL(url);
}
function importData(){
  var i = document.createElement("input");
  i.type = "file"; i.accept = ".json";
  i.onchange = function(e){
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function(){
      try {
        var d = JSON.parse(r.result);
        if (Array.isArray(d)) { saveAccounts(d); }
      } catch(err) { alert("Bad JSON"); }
    };
    r.readAsText(f);
  };
  i.click();
}
function clearAll(){
  if (confirm("Delete ALL accounts? This cannot be undone.")) { localStorage.removeItem(KEY); render(); }
}
render();
</script></div></body></html>`,
  "/PJ_Advice.html": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Advice - PJ Finance</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0f1d2d 0%,#1a2f4b 100%);color:#fff;min-height:100vh;padding:24px 20px}
.wrap{max-width:1100px;margin:0 auto}
.topnav{display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap}
.topnav a.back{color:#4ecdc4;text-decoration:none;font-size:13px;font-weight:600;padding:6px 12px;background:rgba(78,205,196,.1);border-radius:8px;border:1px solid rgba(78,205,196,.3)}
.topnav a.back:hover{background:rgba(78,205,196,.2)}
.topnav .nav-pill{color:#b0c4d4;text-decoration:none;font-size:12px;padding:6px 10px;border-radius:6px}
.topnav .nav-pill:hover{color:#fff;background:rgba(255,255,255,.05)}
.topnav .nav-pill.active{color:#4ecdc4;background:rgba(78,205,196,.1)}
h1{font-size:30px;font-weight:800;color:#4ecdc4;margin-bottom:4px;letter-spacing:-0.01em}
.sub{font-size:13px;color:#b0c4d4;margin-bottom:24px}
.section{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px;margin-bottom:18px}
.section h2{font-size:16px;font-weight:700;color:#fff;margin-bottom:14px}
.row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px}
.row:last-child{border-bottom:none}
.row .lbl{color:#b0c4d4}
.row .val{font-weight:700;color:#fff}
.row.total{border-top:2px solid rgba(255,255,255,.15);margin-top:8px;padding-top:14px;font-size:16px;font-weight:800}
.row.total .val{color:#4ecdc4;font-size:18px}
.tile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:18px}
.tile{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:18px;text-align:center}
.tile .num{font-size:28px;font-weight:900;color:#4ecdc4;line-height:1}
.tile .lab{font-size:11px;color:#b0c4d4;margin-top:6px;text-transform:uppercase;letter-spacing:0.05em}
.tile.green .num{color:#10b981}
.tile.amber .num{color:#fbbf24}
.tile.red .num{color:#ef4444}
.tile.purple .num{color:#a78bfa}
.note{background:rgba(78,205,196,.08);border:1px solid rgba(78,205,196,.2);border-radius:10px;padding:14px 16px;font-size:13px;color:#b0c4d4;line-height:1.55;margin-top:14px}
.note strong{color:#4ecdc4}
@media(max-width:600px){.tile-grid{grid-template-columns:1fr 1fr}}

.account-list,.claim-list{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
.account-card,.claim-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px}
.account-card .acct-name,.claim-card .claim-name{flex:1;font-weight:600;font-size:14px}
.account-card .acct-bal,.claim-card .claim-amt{font-weight:800;font-size:16px;color:#4ecdc4;text-align:right;min-width:120px}
.account-card .acct-bal.low{color:#ef4444}
.account-card .acct-bal.watch{color:#fbbf24}
.account-card .acct-bal.ok{color:#10b981}
.account-card .status-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.status-dot.low{background:#ef4444}.status-dot.watch{background:#fbbf24}.status-dot.ok{background:#10b981}
.btn-row{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.btn{padding:8px 14px;border:1px solid rgba(78,205,196,.4);border-radius:8px;background:rgba(78,205,196,.1);color:#4ecdc4;cursor:pointer;font-weight:600;font-size:13px;font-family:inherit}
.btn:hover{background:rgba(78,205,196,.2)}
.btn.danger{border-color:rgba(239,68,68,.4);background:rgba(239,68,68,.1);color:#ef4444}
.btn.danger:hover{background:rgba(239,68,68,.2)}
.btn-mini{padding:4px 10px;font-size:11px}
.add-form{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px;margin-bottom:14px}
.add-form label{font-size:11px;color:#7a94a8;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px}
.add-form input,.add-form select{width:100%;padding:8px 10px;border:1px solid rgba(255,255,255,.15);border-radius:6px;font-size:13px;color:#fff;background:rgba(255,255,255,.05);font-family:inherit;margin-bottom:10px}
.add-form input:focus,.add-form select:focus{outline:none;border-color:#4ecdc4}
.advice-list{display:flex;flex-direction:column;gap:14px}
.advice-card{background:rgba(255,255,255,.04);border-left:4px solid #4ecdc4;border-radius:10px;padding:16px 18px}
.advice-card.high{border-left-color:#10b981}
.advice-card.med{border-left-color:#fbbf24}
.advice-card.low{border-left-color:#7a94a8}
.advice-card .advice-title{font-weight:700;font-size:15px;margin-bottom:6px}
.advice-card .advice-body{font-size:13px;color:#b0c4d4;line-height:1.6}
.advice-card .advice-impact{font-size:12px;color:#4ecdc4;margin-top:8px;font-weight:600}
</style></head><body><div class="wrap"><div class="topnav"><a class="back" href="/">← PJ Finance Hub</a><a class="nav-pill" href="/PJ_Net_Worth.html">Net Worth</a><a class="nav-pill" href="/PJ_Dashboard.html">Dashboard</a><a class="nav-pill" href="/PJ_Affordability.html">Affordability</a><a class="nav-pill" href="/PJ_Scorecard.html">Scorecard</a><a class="nav-pill" href="/PJ_Budget_Monitor.html">Accounts</a><a class="nav-pill active" href="/PJ_Advice.html">Advice</a><a class="nav-pill" href="/PJ_Claims.html">Claims</a></div><h1>Advice & opportunities</h1>
<p class="sub">Auto-generated suggestions based on your current financial position.</p>

<div class="tile-grid">
  <div class="tile green"><div class="num" id="t-high">0</div><div class="lab">High-impact opportunities</div></div>
  <div class="tile amber"><div class="num" id="t-med">0</div><div class="lab">Medium-impact</div></div>
  <div class="tile"><div class="num" id="t-low">0</div><div class="lab">Worth knowing</div></div>
</div>

<div class="section">
  <h2>Suggestions</h2>
  <div class="advice-list" id="advice-list"></div>
</div>

<script>
// Hardcoded advice based on real Paddy & Jacky position - May 2026 refi plan
var ADVICE = [
  {
    impact: "high",
    title: "Get split-loan structure when refinancing",
    body: "When you draw equity from NR/Osborne for the Cecil St deposit, the ATO purpose test means that drawn equity is NOT tax-deductible (used for PPOR). Your broker should set up split loans so the IP-purpose portion (deductible) is cleanly separated from the Cecil-deposit portion (non-deductible). Otherwise the ATO can disallow the lot.",
    metric: "Tax saving at risk: roughly $4-7k/yr if not structured properly"
  },
  {
    impact: "high",
    title: "Order Quantity Surveyor depreciation reports for both IPs",
    body: "Currently using estimates ($8,500-13,000/yr per page). A proper QS report on 1990s+ apartments and houses commonly finds 30-50% more in Div 40/43 depreciation. Cost is $500-700 per report (itself tax-deductible). Pays for itself in year one.",
    metric: "Estimated extra deduction: $5,000-15,000/yr combined across both IPs at Jacky's 45% bracket"
  },
  {
    impact: "high",
    title: "Hold IPs in Jacky's name (or skewed weighting if joint)",
    body: "Jacky is in the 45% bracket vs Paddy's 32.5%. Each $1 of net rental loss saves Jacky 45c in tax vs Paddy 32.5c. With current loss of about $24k/yr that is a $3k/yr difference. If properties are joint already, look at title transfer (stamp duty implications) or concentrate any new IPs in Jacky.",
    metric: "Additional tax saving: ~$3,000/yr at current loss levels"
  },
  {
    impact: "med",
    title: "Lodge a PAYG withholding variation",
    body: "Negative gearing throws off about $10,764/yr in tax savings. Without a PAYG variation, that lands as a refund at tax time. With it, the saving comes through Jacky's pay each fortnight - about $414 extra in net pay per fortnight. Free, takes ten minutes online.",
    metric: "Cashflow improvement: $207/wk arriving fortnightly instead of annually"
  },
  {
    impact: "med",
    title: "Set up offset account on Cecil St mortgage",
    body: "Cecil St interest is non-deductible (PPOR), so every dollar in offset saves you 5.5% guaranteed and tax-free. Compare to a savings account at 4.5% taxed at Jacky's 45% bracket = 2.5% net. The offset is over twice as valuable. Park your $170k cash plus surplus cashflow there.",
    metric: "Compound interest saved over 10 years: $80,000+ on $170k offset"
  },
  {
    impact: "med",
    title: "Designate Cecil St as PPOR for CGT",
    body: "Cecil St is your home so it is automatically CGT-exempt. The 6-year absence rule does NOT apply to NR or Osborne while Cecil is your PPOR. NR and Osborne will both incur CGT on any gain when sold. Plan exit timing accordingly - or hold for the long term and let appreciation compound.",
    metric: "Future CGT exposure on $400k portfolio gain: roughly $90,000 if sold mid-bracket"
  },
  {
    impact: "med",
    title: "Stress-test against rate rises",
    body: "Combined IP + Cecil debt post-refi will be ~$2.2M. A 2% rate rise adds $44,000/yr in repayments. Make sure you have either fixed-rate cover on a portion or 6+ months of cash buffer for rate shocks. RBA cycles can swing 200bp in 18 months as recently as 2022-23.",
    metric: "Rate-rise buffer needed: $44k/yr on +2% scenario"
  },
  {
    impact: "low",
    title: "Renew Compton Green lease at top-of-market",
    body: "Current Compton Green rent $3,433/mo. Newport house rents in 2026 likely supporting $3,600-3,800. Even a $150/mo increase = $1,800/yr gross, about $1,000/yr net after tax. Worth raising at next renewal.",
    metric: "Annual cashflow: +$1,000-1,500 net"
  },
  {
    impact: "low",
    title: "Consider land tax minimisation across ownership",
    body: "If both IPs end up in Jacky's name, the aggregated land value pushes higher tier rates. Holding one in each name resets the threshold and can save $1-3k/yr in land tax. Trade-off: the lower-bracket spouse gets less tax saving on negative gearing. Run the numbers.",
    metric: "Potential land tax saving: $1,000-3,000/yr depending on splits"
  },
  {
    impact: "low",
    title: "Track tax deductible receipts year-round",
    body: "Use the Claims page to log receipts as they happen - QS report fees, accountant fees, repairs, mileage, advertising for tenants, bank fees. Easy to forget small claims that add up to $1-2k/yr in deductions if logged consistently.",
    metric: "Recoverable deductions typically missed: $500-2,000/yr"
  },
  {
    impact: "high",
    title: "Income protection insurance for Jacky",
    body: "Jacky earns 65% of household income ($220k of $338k). If she's off work for 6+ months due to illness/injury, the whole structure (3 mortgages, 2 IPs, Cecil PPOR) wobbles fast. Income protection covers up to 75% of salary while she can't work. Premium is ~1-2% of insured income, fully tax-deductible at 45%. For her, $200-330/mo deductible = $110-180/mo after tax.",
    metric: "Insurance peace of mind: $165k+/yr replacement income if she's off work"
  },
  {
    impact: "high",
    title: "Life insurance review (both)",
    body: "With $2.4M of debt across three properties post-settlement, both Paddy and Jacky need adequate life cover. Generally aim for cover that pays off all loans + provides 5-10 years of household expenses. ~$2.5-3M each is a starting point. Often cheapest through super (premiums come out of super balance, not cashflow). Compare standalone retail vs super-held.",
    metric: "Adequate cover for surviving spouse: $2.5-3M each, premiums via super"
  },
  {
    impact: "high",
    title: "Cecil St home & contents insurance",
    body: "Day-one essential. Sum insured needs to cover full rebuild cost (not market value - typically $3,500-4,500/m2 for Williamstown rebuild quality) plus contents. Get quotes from RACV, NRMA, Allianz, AAMI before settlement so the policy is active settlement day. Bundle home + contents for ~10-15% discount. Budget $2-3k/yr.",
    metric: "Settlement-day essential: ~$2,500/yr premium"
  }
];
function render(){
  var list = document.getElementById("advice-list");
  list.innerHTML = ADVICE.map(function(a){
    return '<div class="advice-card ' + a.impact + '">' +
      '<div class="advice-title">' + a.title + '</div>' +
      '<div class="advice-body">' + a.body + '</div>' +
      '<div class="advice-impact">' + a.metric + '</div>' +
    '</div>';
  }).join("");
  var counts = {high: 0, med: 0, low: 0};
  ADVICE.forEach(function(a){counts[a.impact]++;});
  document.getElementById("t-high").textContent = counts.high;
  document.getElementById("t-med").textContent = counts.med;
  document.getElementById("t-low").textContent = counts.low;
}
render();
</script></div></body></html>`,
  "/PJ_Claims.html": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Claims - PJ Finance</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#0f1d2d 0%,#1a2f4b 100%);color:#fff;min-height:100vh;padding:24px 20px}
.wrap{max-width:1100px;margin:0 auto}
.topnav{display:flex;align-items:center;gap:14px;margin-bottom:24px;flex-wrap:wrap}
.topnav a.back{color:#4ecdc4;text-decoration:none;font-size:13px;font-weight:600;padding:6px 12px;background:rgba(78,205,196,.1);border-radius:8px;border:1px solid rgba(78,205,196,.3)}
.topnav a.back:hover{background:rgba(78,205,196,.2)}
.topnav .nav-pill{color:#b0c4d4;text-decoration:none;font-size:12px;padding:6px 10px;border-radius:6px}
.topnav .nav-pill:hover{color:#fff;background:rgba(255,255,255,.05)}
.topnav .nav-pill.active{color:#4ecdc4;background:rgba(78,205,196,.1)}
h1{font-size:30px;font-weight:800;color:#4ecdc4;margin-bottom:4px;letter-spacing:-0.01em}
.sub{font-size:13px;color:#b0c4d4;margin-bottom:24px}
.section{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:24px;margin-bottom:18px}
.section h2{font-size:16px;font-weight:700;color:#fff;margin-bottom:14px}
.row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px}
.row:last-child{border-bottom:none}
.row .lbl{color:#b0c4d4}
.row .val{font-weight:700;color:#fff}
.row.total{border-top:2px solid rgba(255,255,255,.15);margin-top:8px;padding-top:14px;font-size:16px;font-weight:800}
.row.total .val{color:#4ecdc4;font-size:18px}
.tile-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:18px}
.tile{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:18px;text-align:center}
.tile .num{font-size:28px;font-weight:900;color:#4ecdc4;line-height:1}
.tile .lab{font-size:11px;color:#b0c4d4;margin-top:6px;text-transform:uppercase;letter-spacing:0.05em}
.tile.green .num{color:#10b981}
.tile.amber .num{color:#fbbf24}
.tile.red .num{color:#ef4444}
.tile.purple .num{color:#a78bfa}
.note{background:rgba(78,205,196,.08);border:1px solid rgba(78,205,196,.2);border-radius:10px;padding:14px 16px;font-size:13px;color:#b0c4d4;line-height:1.55;margin-top:14px}
.note strong{color:#4ecdc4}
@media(max-width:600px){.tile-grid{grid-template-columns:1fr 1fr}}

.account-list,.claim-list{display:flex;flex-direction:column;gap:10px;margin-bottom:14px}
.account-card,.claim-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px}
.account-card .acct-name,.claim-card .claim-name{flex:1;font-weight:600;font-size:14px}
.account-card .acct-bal,.claim-card .claim-amt{font-weight:800;font-size:16px;color:#4ecdc4;text-align:right;min-width:120px}
.account-card .acct-bal.low{color:#ef4444}
.account-card .acct-bal.watch{color:#fbbf24}
.account-card .acct-bal.ok{color:#10b981}
.account-card .status-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.status-dot.low{background:#ef4444}.status-dot.watch{background:#fbbf24}.status-dot.ok{background:#10b981}
.btn-row{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.btn{padding:8px 14px;border:1px solid rgba(78,205,196,.4);border-radius:8px;background:rgba(78,205,196,.1);color:#4ecdc4;cursor:pointer;font-weight:600;font-size:13px;font-family:inherit}
.btn:hover{background:rgba(78,205,196,.2)}
.btn.danger{border-color:rgba(239,68,68,.4);background:rgba(239,68,68,.1);color:#ef4444}
.btn.danger:hover{background:rgba(239,68,68,.2)}
.btn-mini{padding:4px 10px;font-size:11px}
.add-form{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px;margin-bottom:14px}
.add-form label{font-size:11px;color:#7a94a8;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px}
.add-form input,.add-form select{width:100%;padding:8px 10px;border:1px solid rgba(255,255,255,.15);border-radius:6px;font-size:13px;color:#fff;background:rgba(255,255,255,.05);font-family:inherit;margin-bottom:10px}
.add-form input:focus,.add-form select:focus{outline:none;border-color:#4ecdc4}
.advice-list{display:flex;flex-direction:column;gap:14px}
.advice-card{background:rgba(255,255,255,.04);border-left:4px solid #4ecdc4;border-radius:10px;padding:16px 18px}
.advice-card.high{border-left-color:#10b981}
.advice-card.med{border-left-color:#fbbf24}
.advice-card.low{border-left-color:#7a94a8}
.advice-card .advice-title{font-weight:700;font-size:15px;margin-bottom:6px}
.advice-card .advice-body{font-size:13px;color:#b0c4d4;line-height:1.6}
.advice-card .advice-impact{font-size:12px;color:#4ecdc4;margin-top:8px;font-weight:600}
</style></head><body><div class="wrap"><div class="topnav"><a class="back" href="/">← PJ Finance Hub</a><a class="nav-pill" href="/PJ_Net_Worth.html">Net Worth</a><a class="nav-pill" href="/PJ_Dashboard.html">Dashboard</a><a class="nav-pill" href="/PJ_Affordability.html">Affordability</a><a class="nav-pill" href="/PJ_Scorecard.html">Scorecard</a><a class="nav-pill" href="/PJ_Budget_Monitor.html">Accounts</a><a class="nav-pill" href="/PJ_Advice.html">Advice</a><a class="nav-pill active" href="/PJ_Claims.html">Claims</a></div><h1>Claims & deductions log</h1>
<p class="sub">Track tax-deductible expenses as they happen. Saved locally. Export at tax time for your accountant.</p>

<div class="tile-grid">
  <div class="tile green"><div class="num" id="t-total">$0</div><div class="lab">Total claims this FY</div></div>
  <div class="tile"><div class="num" id="t-count">0</div><div class="lab">Receipts logged</div></div>
  <div class="tile amber"><div class="num" id="t-tax">$0</div><div class="lab">Estimated tax saving (45%)</div></div>
  <div class="tile purple"><div class="num" id="t-cat">0</div><div class="lab">Categories used</div></div>
</div>

<div class="section">
  <h2>Add new claim</h2>
  <div class="add-form">
    <label>Description</label><input id="new-desc" placeholder="e.g. QS depreciation report for North Rd" />
    <label>Amount ($)</label><input id="new-amt" type="number" placeholder="0" />
    <label>Date</label><input id="new-date" type="date" />
    <label>Property</label>
    <select id="new-prop">
      <option>North Rd</option><option>Osborne St</option><option>Both / shared</option>
      <option>Cecil St (PPOR)</option><option>Other</option>
    </select>
    <label>Category</label>
    <select id="new-cat">
      <option>Interest (mortgage)</option>
      <option>Body corp / strata</option>
      <option>Council rates</option>
      <option>Land tax</option>
      <option>Insurance (landlord/building)</option>
      <option>Repairs &amp; maintenance</option>
      <option>Property management fees</option>
      <option>Depreciation (QS report fee)</option>
      <option>Accountant fees</option>
      <option>Bank fees (IP loan)</option>
      <option>Travel to inspect</option>
      <option>Advertising for tenants</option>
      <option>Cleaning / gardening</option>
      <option>Other deductible</option>
    </select>
    <button class="btn" onclick="addClaim()">+ Add claim</button>
  </div>
</div>

<div class="section">
  <h2>Claims by category</h2>
  <table class="kpi" id="cat-table" style="width:100%;border-collapse:collapse">
    <thead><tr><th>Category</th><th style="text-align:right">Count</th><th style="text-align:right">Total</th></tr></thead>
    <tbody id="cat-body"></tbody>
  </table>
</div>

<div class="section">
  <h2>All claims</h2>
  <div class="claim-list" id="list"></div>
  <div class="btn-row">
    <button class="btn" onclick="exportData()">Export CSV (for accountant)</button>
    <button class="btn" onclick="exportJson()">Export JSON</button>
    <button class="btn" onclick="importData()">Import JSON</button>
    <button class="btn danger" onclick="clearAll()">Clear all</button>
  </div>
</div>

<div class="note">
  <strong>Workflow:</strong> Photograph or save receipts in Drive/iCloud. Log the dollar amount and category here. At tax time, hit "Export CSV" and email the file to your accountant. CSV columns: Date, Property, Category, Description, Amount.
</div>

<script>
var KEY = "pj_claims_v1";
function getClaims(){
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch(e) { return []; }
}
function saveClaims(c){ localStorage.setItem(KEY, JSON.stringify(c)); render(); }
function addClaim(){
  var desc = document.getElementById("new-desc").value.trim();
  var amt = +document.getElementById("new-amt").value || 0;
  var date = document.getElementById("new-date").value || new Date().toISOString().slice(0,10);
  var prop = document.getElementById("new-prop").value;
  var cat = document.getElementById("new-cat").value;
  if (!desc || amt <= 0) { alert("Description and amount required"); return; }
  var c = getClaims();
  c.push({id: Date.now(), desc: desc, amount: amt, date: date, property: prop, category: cat});
  saveClaims(c);
  document.getElementById("new-desc").value = "";
  document.getElementById("new-amt").value = "";
}
function deleteClaim(id){
  if (!confirm("Delete this claim?")) return;
  saveClaims(getClaims().filter(function(x){return x.id !== id;}));
}
function escapeHtml(s){ var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
function render(){
  var c = getClaims();
  // Sort newest first
  c.sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
  var list = document.getElementById("list");
  var total = 0;
  var byCat = {};
  c.forEach(function(x){
    total += x.amount;
    if (!byCat[x.category]) byCat[x.category] = {count: 0, total: 0};
    byCat[x.category].count++;
    byCat[x.category].total += x.amount;
  });
  if (c.length === 0) {
    list.innerHTML = "<div style=\\"text-align:center;color:#7a94a8;padding:30px;font-size:14px\\">No claims logged yet. Add one above as receipts come in.</div>";
  } else {
    list.innerHTML = c.map(function(x){
      return '<div class="claim-card">' +
        '<div class="claim-name">' + escapeHtml(x.desc) +
          '<div style="font-size:11px;color:#7a94a8;font-weight:400;margin-top:2px">' + x.date + ' &middot; ' + x.property + ' &middot; ' + x.category + '</div>' +
        '</div>' +
        '<div class="claim-amt">$' + x.amount.toLocaleString() + '</div>' +
        '<button class="btn btn-mini danger" onclick="deleteClaim(' + x.id + ')">x</button>' +
      '</div>';
    }).join("");
  }
  document.getElementById("t-total").textContent = "$" + total.toLocaleString();
  document.getElementById("t-count").textContent = c.length;
  document.getElementById("t-tax").textContent = "$" + Math.round(total * 0.45).toLocaleString();
  document.getElementById("t-cat").textContent = Object.keys(byCat).length;
  // Category breakdown
  var rows = Object.keys(byCat).sort().map(function(k){
    return '<tr><td>' + k + '</td><td class="num">' + byCat[k].count + '</td><td class="num">$' + byCat[k].total.toLocaleString() + '</td></tr>';
  }).join("");
  document.getElementById("cat-body").innerHTML = rows || '<tr><td colspan="3" class="muted" style="text-align:center;color:#7a94a8;padding:20px">No claims yet</td></tr>';
}
function exportData(){
  var c = getClaims();
  var rows = [["Date","Property","Category","Description","Amount"]];
  c.forEach(function(x){
    rows.push([x.date, x.property, x.category, '"' + (x.desc||"").replace(/"/g, '""') + '"', x.amount]);
  });
  var csv = rows.map(function(r){return r.join(",");}).join("\\n");
  var b = new Blob([csv], {type: "text/csv"});
  var url = URL.createObjectURL(b);
  var a = document.createElement("a");
  a.href = url; a.download = "pj_claims_" + new Date().toISOString().slice(0,10) + ".csv"; a.click();
  URL.revokeObjectURL(url);
}
function exportJson(){
  var data = JSON.stringify(getClaims(), null, 2);
  var b = new Blob([data], {type: "application/json"});
  var url = URL.createObjectURL(b);
  var a = document.createElement("a");
  a.href = url; a.download = "pj_claims.json"; a.click();
  URL.revokeObjectURL(url);
}
function importData(){
  var i = document.createElement("input");
  i.type = "file"; i.accept = ".json";
  i.onchange = function(e){
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function(){
      try { var d = JSON.parse(r.result); if (Array.isArray(d)) saveClaims(d); }
      catch(err) { alert("Bad JSON"); }
    };
    r.readAsText(f);
  };
  i.click();
}
function clearAll(){
  if (confirm("Delete ALL claims? This cannot be undone.")) { localStorage.removeItem(KEY); render(); }
}
document.getElementById("new-date").value = new Date().toISOString().slice(0,10);
render();
</script></div></body></html>`,
  "/": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="manifest" href="manifest.json">
  <link rel="apple-touch-icon" href="icon-192.png">
  <meta name="theme-color" content="#4ecdc4">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="PJ Finance">
    <title>PJ Finance Hub</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f1d2d 0%, #1a2f4b 100%);
            color: #fff; min-height: 100vh;
            display: flex; flex-direction: column; align-items: center;
            padding: 40px 20px 24px;
        }
        .logo { font-size: 44px; margin-bottom: 10px; }
        h1 { font-size: 30px; font-weight: 800; color: #4ecdc4; margin-bottom: 4px; letter-spacing: -0.01em; }
        .sub { font-size: 13px; color: #b0c4d4; margin-bottom: 34px; }

        .section-label {
            font-size: 11px; font-weight: 700; color: #7a94a8;
            text-transform: uppercase; letter-spacing: 0.08em;
            margin: 8px 0 14px; align-self: flex-start;
            max-width: 1100px; width: 100%; padding: 0 4px;
        }

        .cards {
            display: grid; gap: 18px;
            max-width: 1100px; width: 100%;
            margin-bottom: 24px;
        }
        .cards.primary { grid-template-columns: repeat(4, 1fr); }
        .cards.secondary { grid-template-columns: repeat(3, 1fr); }

        .card {
            background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px; padding: 22px 20px; text-align: center; text-decoration: none;
            transition: all 0.25s; display: block; position: relative; overflow: hidden;
        }
        .card::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
        }
        .card.teal::before   { background: #20a39e; }
        .card.green::before  { background: #10b981; }
        .card.purple::before { background: #8b5cf6; }
        .card.amber::before  { background: #f59e0b; }
        .card.blue::before   { background: #3b82f6; }
        .card.pink::before   { background: #ec4899; }
        .card.slate::before  { background: #64748b; }
        .card:hover { transform: translateY(-3px); border-color: rgba(78,205,196,0.4); }

        .card-icon { font-size: 30px; margin-bottom: 10px; }
        .card-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 5px; }
        .card-desc { font-size: 11.5px; color: #b0c4d4; line-height: 1.45; margin-bottom: 10px; min-height: 34px; }
        .card-stat { font-size: 18px; font-weight: 800; }
        .card-substat { font-size: 10.5px; color: #b0c4d4; margin-top: 2px; }

        .stat-teal   { color: #4ecdc4; }
        .stat-green  { color: #10b981; }
        .stat-purple { color: #a78bfa; }
        .stat-amber  { color: #fbbf24; }
        .stat-blue   { color: #60a5fa; }
        .stat-pink   { color: #f472b6; }
        .stat-slate  { color: #94a3b8; }

        .stats-row {
            display: flex; gap: 36px; justify-content: center; flex-wrap: wrap;
            margin: 22px 0 18px;
        }
        .stat-item { text-align: center; }
        .stat-label { font-size: 10.5px; color: #7a94a8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .stat-value { font-size: 19px; font-weight: 700; color: #4ecdc4; }

        footer {
            margin-top: 20px; font-size: 11.5px; color: #5a7a8a;
            text-align: center; max-width: 900px;
        }
        footer .refresh {
            color: #7a94a8; font-size: 11px; margin-top: 4px;
        }

        @media (max-width: 900px) {
            .cards.primary { grid-template-columns: repeat(2, 1fr); }
            .cards.secondary { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
            .cards.primary, .cards.secondary { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 440px) {
            .cards.primary, .cards.secondary { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="logo">💰</div>
    <h1>PJ Finance Hub</h1>
    <div class="sub">Paddy &amp; Jacky · Personal Finance Dashboard</div>

    <div class="section-label">Core</div>
    <div class="cards primary">
        <a class="card teal" href="PJ_Dashboard.html">
            <div class="card-icon">📊</div>
            <div class="card-title">Budget Dashboard</div>
            <div class="card-desc">Cash flow, income vs expenses, property portfolio &amp; auto transfers</div>
            <div class="card-stat stat-teal">$170,287</div>
            <div class="card-substat">Total cash · 16 accounts</div>
        </a>

        <a class="card green" href="PJ_Net_Worth.html">
            <div class="card-icon">📈</div>
            <div class="card-title">Net Worth Tracker</div>
            <div class="card-desc">Total wealth, property equity, 5-year projections &amp; LVR milestones</div>
            <div class="card-stat stat-green">$1,153,827</div>
            <div class="card-substat">Current net worth</div>
        </a>

        <a class="card amber" href="PJ_Affordability.html">
            <div class="card-icon">🏠</div>
            <div class="card-title">Affordability</div>
            <div class="card-desc">Live cashflow impact · VIC stamp duty · comfort / stretch scenarios</div>
            <div class="card-stat stat-amber">Up to $1.12M</div>
            <div class="card-substat">Max comfortable price</div>
        </a>

        <a class="card purple" href="PJ_Budget_Monitor.html">
            <div class="card-icon">🔔</div>
            <div class="card-title">Account Monitor</div>
            <div class="card-desc">Per-account alerts, LOW/WATCH/OK status &amp; threshold tracking</div>
            <div class="card-stat stat-purple">16 Accounts</div>
            <div class="card-substat">1 low · 2 watch · 13 ok</div>
        </a>
    </div>

    
    <div class="section-label">Family IP cascade</div>
    <div class="cards secondary">
        <a class="card teal" href="https://paddy-finance.pgallivan.workers.dev" target="_blank">
            <div class="card-icon">🏘️</div>
            <div class="card-title">Paddy &amp; Jacky</div>
            <div class="card-desc">3-property portfolio. Cecil St PPOR, North Rd + Osborne IPs feeding the cashflow.</div>
            <div class="card-stat stat-teal">$3.76M</div>
            <div class="card-substat">combined IP value · year 10</div>
        </a>
        <a class="card purple" href="https://kelly-finance.pgallivan.workers.dev" target="_blank">
            <div class="card-icon">🏢</div>
            <div class="card-title">Kelly — 713 Buckley</div>
            <div class="card-desc">713 becomes IP, Monica is tenant. Move to Osborne. Cashflow + tax + 6-yr CGT.</div>
            <div class="card-stat stat-purple">+$441k</div>
            <div class="card-substat">wealth built · 10 years</div>
        </a>
        <a class="card pink" href="https://monica-finance.pgallivan.workers.dev" target="_blank">
            <div class="card-icon">🏠</div>
            <div class="card-title">Monica — 308 Buckley</div>
            <div class="card-desc">308 becomes IP, random tenant. Move to 713. Same cashflow + tax + 6-yr CGT framework.</div>
            <div class="card-stat stat-pink">+$368k</div>
            <div class="card-substat">wealth built · 10 years</div>
        </a>
    </div>

    <div class="section-label">Advisory &amp; insights</div>
    <div class="cards secondary">
        <a class="card blue" href="PJ_Advice.html">
            <div class="card-icon">💡</div>
            <div class="card-title">Advice</div>
            <div class="card-desc">Tailored suggestions, priorities &amp; opportunity flags</div>
            <div class="card-stat stat-blue">Advice</div>
            <div class="card-substat">Decisions &amp; next steps</div>
        </a>

        <a class="card pink" href="PJ_Claims.html">
            <div class="card-icon">🧾</div>
            <div class="card-title">Claims</div>
            <div class="card-desc">Deductions, receipts &amp; tax-time claim tracking</div>
            <div class="card-stat stat-pink">Claims</div>
            <div class="card-substat">Tax &amp; reimbursements</div>
        </a>

        <a class="card slate" href="PJ_Scorecard.html">
            <div class="card-icon">🏁</div>
            <div class="card-title">Scorecard</div>
            <div class="card-desc">Financial health snapshot across key ratios &amp; goals</div>
            <div class="card-stat stat-slate">Scorecard</div>
            <div class="card-substat">Overall health</div>
        </a>
    </div>

    <div class="stats-row">
        <div class="stat-item">
            <div class="stat-label">Weekly Surplus</div>
            <div class="stat-value">+$2,005</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Property Equity</div>
            <div class="stat-value">$983,540</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Annual Surplus</div>
            <div class="stat-value">$104,260</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Total Debt</div>
            <div class="stat-value" style="color:#ef4444;">$1,216,460</div>
        </div>
    </div>

    <footer>
        PJ Finance · Built by Paddy &amp; Claude
        <div class="refresh">Data last refreshed: 16 April 2026</div>
    </footer>
</body>
</html>
`,
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const html = PAGES[path] || PAGES["/"];
    return new Response(html, { headers: { "Content-Type": "text/html;charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" } });
  }
};