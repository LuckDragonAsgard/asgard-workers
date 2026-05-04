// falkor-tools v2.1.0 — Asgard-style project hub with Finance, sorting, all info per project
const PROJECTS_API = 'https://falkor-dashboard.luckdragon.io/api/projects';
const VERIFY_API   = 'https://falkor-push.luckdragon.io/user/verify';
const CHAT_API     = '/api/chat';
const UPSTREAM_CHAT = 'https://asgard-ai.luckdragon.io/chat/smart';

const HTML = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Asgard — Project Hub</title>
<style>
:root{--bg:#0a0e14;--panel:#11161f;--panel2:#161c27;--border:#222936;--text:#e6edf6;--muted:#8b95a7;--accent:#ff6b35;--accent2:#ffa94d;--green:#22c55e;--amber:#f59e0b;--red:#ef4444;--purple:#a855f7;}
*{box-sizing:border-box}
html,body{margin:0;padding:0;height:100%;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text)}
.layout{display:grid;grid-template-columns:220px 1fr 360px;height:100vh;overflow:hidden}
@media(max-width:1100px){.layout{grid-template-columns:200px 1fr}.chat-pane{display:none}}
@media(max-width:720px){.layout{grid-template-columns:1fr}.sidebar{display:none}}
.sidebar{background:var(--panel);border-right:1px solid var(--border);padding:14px 12px;display:flex;flex-direction:column;gap:6px;overflow-y:auto}
.brand{padding:10px 8px 14px;border-bottom:1px solid var(--border);margin-bottom:10px}
.brand-name{font-size:18px;font-weight:800;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.brand-sub{font-size:11px;color:var(--muted);margin-top:2px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;color:var(--muted);font-size:14px;border:1px solid transparent}
.nav-item:hover{background:var(--panel2);color:var(--text)}
.nav-item.active{background:var(--panel2);color:var(--text);border-color:var(--border)}
.sidebar-foot{margin-top:auto;padding-top:10px;border-top:1px solid var(--border)}
.user-pill{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;background:var(--panel2);font-size:12px}
.user-pill button{margin-left:auto;background:none;border:none;color:var(--muted);cursor:pointer;font-size:11px}
.main{overflow-y:auto;display:flex;flex-direction:column;min-width:0}
.topbar{padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:var(--bg);position:sticky;top:0;z-index:5}
.topbar h1{margin:0;font-size:18px;font-weight:700}
.stats{display:flex;gap:14px;font-size:12px;color:var(--muted);margin-left:auto;flex-wrap:wrap}
.stat strong{color:var(--text);font-size:14px;margin-right:4px}
.controls{padding:14px 20px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;border-bottom:1px solid var(--border)}
input,select,button{background:var(--panel);color:var(--text);border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:14px;font-family:inherit}
input:focus,select:focus{outline:none;border-color:var(--accent)}
.controls input{flex:1;min-width:180px}
button{cursor:pointer}
button:hover{background:var(--panel2);border-color:var(--accent)}
button.primary{background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;color:#fff;font-weight:600}
.grid{padding:18px 20px;display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));align-content:start}
.tile{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px;cursor:pointer;display:flex;flex-direction:column;gap:8px;min-height:130px}
.tile:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 4px 16px rgba(255,107,53,.12)}
.tile-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
.tile-name{font-size:14px;font-weight:700}
.tile-cat{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-top:2px}
.badge{font-size:10px;padding:3px 8px;border-radius:99px;font-weight:600;text-transform:uppercase;letter-spacing:.3px;white-space:nowrap}
.badge.live,.badge.active{background:rgba(34,197,94,.15);color:var(--green)}
.badge.dev,.badge.building{background:rgba(245,158,11,.15);color:var(--amber)}
.badge.archived,.badge.dormant{background:rgba(139,149,167,.15);color:var(--muted)}
.badge.idea,.badge.planned{background:rgba(168,85,247,.15);color:var(--purple)}
.tile-desc{font-size:12px;color:var(--muted);line-height:1.4;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.tile-foot{display:flex;gap:4px;flex-wrap:wrap;font-size:10px;color:var(--muted)}
.tile-foot span{background:var(--panel2);padding:2px 6px;border-radius:4px}
.tile-foot .cost{background:rgba(255,107,53,.15);color:var(--accent);font-weight:600}
.chat-pane{background:var(--panel);border-left:1px solid var(--border);display:flex;flex-direction:column;min-width:0}
.chat-head{padding:14px;border-bottom:1px solid var(--border);font-weight:700;font-size:14px;display:flex;align-items:center;gap:8px}
.chat-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
.msg{padding:10px 12px;border-radius:10px;max-width:90%;font-size:13px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
.msg.user{align-self:flex-end;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff}
.msg.assistant{align-self:flex-start;background:var(--panel2);border:1px solid var(--border)}
.msg.system{align-self:center;font-size:11px;color:var(--muted);background:none;padding:4px}
.chat-form{padding:12px;border-top:1px solid var(--border);display:flex;gap:8px}
.chat-form input{flex:1}
.chat-empty{color:var(--muted);font-size:12px;text-align:center;padding:30px 20px}
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.login-card{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:32px;max-width:340px;width:100%}
.login-title{font-size:24px;font-weight:800;text-align:center;margin:0 0 6px;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.login-sub{text-align:center;color:var(--muted);font-size:13px;margin-bottom:20px}
.login-card input{width:100%;margin-bottom:10px;text-align:center;font-size:18px;letter-spacing:4px}
.login-card button{width:100%}
.err{color:var(--red);font-size:12px;text-align:center;margin-top:8px;min-height:16px}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100;display:flex;align-items:center;justify-content:center;padding:16px}
.modal{background:var(--panel);border:1px solid var(--border);border-radius:16px;max-width:680px;width:100%;max-height:90vh;overflow:auto;padding:24px;position:relative}
.modal-close{position:absolute;top:12px;right:12px;background:none;border:none;color:var(--muted);font-size:24px;cursor:pointer}
.modal h2{margin:0 0 6px;font-size:22px}
.cat-line{color:var(--muted);font-size:13px;margin-bottom:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.actions-row{display:flex;gap:8px;flex-wrap:wrap;margin:4px 0 16px}
.actions-row a,.actions-row button{padding:8px 14px;border-radius:8px;font-size:13px;text-decoration:none;font-family:inherit;cursor:pointer;border:1px solid var(--border);background:var(--panel2);color:var(--text);display:inline-block}
.actions-row .primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-weight:600;border:none}
.row{display:grid;grid-template-columns:110px 1fr;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px}
.row:last-child{border-bottom:none}
.row strong{color:var(--muted);font-weight:500}
.row a{color:var(--accent2);text-decoration:none;word-break:break-all}
.desc{margin:14px 0;line-height:1.6;font-size:14px}
.features{background:var(--panel2);border-radius:8px;padding:12px 14px;margin:10px 0;font-size:13px;color:var(--muted);line-height:1.6;white-space:pre-wrap}
.empty{padding:60px 20px;text-align:center;color:var(--muted)}
.fcard{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px}
.fcard-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px}
.fcard-val{font-size:22px;font-weight:700;margin-top:4px}
.fcard-sub{font-size:11px;color:var(--muted);margin-top:2px}
.fee-row{display:grid;grid-template-columns:1fr 100px 90px;gap:10px;padding:10px 12px;background:var(--panel);border:1px solid var(--border);border-radius:8px;font-size:13px;cursor:pointer;align-items:center}
.fee-row:hover{border-color:var(--accent)}
.placeholder{padding:40px 30px;color:var(--muted);text-align:center;line-height:1.6}
/* Falkor mascot — individual pose PNGs uploaded to /asset/fk-* */
.fk{display:inline-block;background-repeat:no-repeat;background-size:contain;background-position:center;background-color:transparent;border-radius:12px}
.fk-think     {background-image:url(/asset/fk-think)}
.fk-thumbsup  {background-image:url(/asset/fk-thumbsup)}
.fk-wave      {background-image:url(/asset/fk-wave)}
.fk-hi        {background-image:url(/asset/fk-hi)}
.fk-cheer     {background-image:url(/asset/fk-cheer)}
.fk-run       {background-image:url(/asset/fk-run)}
.fk-smile     {background-image:url(/asset/fk-smile)}
.fk-point     {background-image:url(/asset/fk-point)}
.fk-confused  {background-image:url(/asset/fk-confused)}
.fk-pray      {background-image:url(/asset/fk-pray)}
.fk-laugh     {background-image:url(/asset/fk-laugh)}
.fk-wait      {background-image:url(/asset/fk-wait)}
.fk-xl{width:160px;height:160px}
.fk-lg{width:96px;height:96px}
.fk-md{width:48px;height:48px}
.fk-sm{width:32px;height:32px}
.fk-xs{width:24px;height:24px}
</style></head>
<body><div id="app"></div>
<script>
const VERIFY_API="https://falkor-push.luckdragon.io/user/verify",PROJECTS_API="/api/projects",CHAT_API="/api/chat";
const $=(s,r=document)=>r.querySelector(s);
const el=(tag,attrs={},...kids)=>{const n=document.createElement(tag);for(const[k,v]of Object.entries(attrs)){if(k==="class")n.className=v;else if(k==="onclick")n.addEventListener("click",v);else if(k==="html")n.innerHTML=v;else n.setAttribute(k,v)}for(const k of kids){if(k==null||k===false)continue;if(typeof k==="string"||typeof k==="number")n.appendChild(document.createTextNode(String(k)));else if(k && k.nodeType)n.appendChild(k);else n.appendChild(document.createTextNode(String(k)))}return n};
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const parseCost=c=>{if(!c)return 0;const m=String(c).match(/[0-9.]+/);return m?parseFloat(m[0]):0};

const STATE={user:null,agentPin:null,projects:[],q:"",cat:"all",status:"active-only",sort:"priority",view:"projects",chat:[],chatContext:null};

function loadAuth(){try{return JSON.parse(localStorage.getItem("asgard.user")||"null")}catch{return null}}
function saveAuth(u){localStorage.setItem("asgard.user",JSON.stringify(u))}
function clearAuth(){localStorage.removeItem("asgard.user")}

function render(){
 const app=$("#app");app.innerHTML="";
 if(!STATE.user){renderLogin(app);return}
 app.appendChild(renderShell());
 if(STATE.view==="projects")refreshGrid();
}

function renderLogin(app){
 const wrap=el("div",{class:"login-wrap"}),card=el("div",{class:"login-card"});
 card.appendChild(el("div",{html:'<div class="fk fk-wave fk-xl"></div>',style:"text-align:center;margin-bottom:10px;display:flex;justify-content:center"}));
 card.appendChild(el("h1",{class:"login-title"},"Asgard"));
 card.appendChild(el("div",{class:"login-sub"},"Project Hub"));
 const inp=el("input",{type:"password",inputmode:"numeric",placeholder:"PIN",autofocus:"true"});
 card.appendChild(inp);
 const err=el("div",{class:"err"}),btn=el("button",{class:"primary"},"Sign in");
 btn.addEventListener("click",async()=>{
  err.textContent="";btn.disabled=true;btn.textContent="Checking\u2026";
  try{
   const r=await fetch(VERIFY_API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:"paddy",pin:inp.value})});
   const d=await r.json();
   if(d.success){saveAuth({user:d.user,pin:inp.value,agentPin:d.agentPin});STATE.user=d.user;STATE.agentPin=d.agentPin;await loadProjects();render()}
   else{err.textContent="Wrong PIN.";inp.value=""}
  }catch(e){err.textContent="Connection error."}
  btn.disabled=false;btn.textContent="Sign in";
 });
 inp.addEventListener("keydown",e=>{if(e.key==="Enter")btn.click()});
 card.appendChild(btn);card.appendChild(err);wrap.appendChild(card);app.appendChild(wrap);
 setTimeout(()=>inp.focus(),50);
}

async function loadProjects(){try{const r=await fetch(PROJECTS_API);const d=await r.json();STATE.projects=d.projects||(Array.isArray(d)?d:[])}catch(e){STATE.projects=[]}}

function renderShell(){const l=el("div",{class:"layout"});l.appendChild(renderSidebar());l.appendChild(renderMain());l.appendChild(renderChatPane());return l}

function renderSidebar(){
 const sb=el("div",{class:"sidebar"});
 const brand=el("div",{class:"brand"});
 const bnRow=el("div",{class:"brand-name",style:"display:flex;align-items:center;gap:8px"});bnRow.appendChild(el("div",{class:"fk fk-smile fk-sm"}));bnRow.appendChild(el("span",{},"Asgard"));brand.appendChild(bnRow);
 brand.appendChild(el("div",{class:"brand-sub"},"Project hub \u00b7 luckdragon.io"));
 sb.appendChild(brand);
 const navItem=(id,icon,label)=>{const it=el("div",{class:"nav-item"+(STATE.view===id?" active":"")});it.appendChild(el("span",{style:"width:18px;text-align:center"},icon));it.appendChild(el("span",{},label));it.addEventListener("click",()=>{STATE.view=id;render()});return it};
 sb.appendChild(navItem("projects","\uD83D\uDCCB","Projects"));
 sb.appendChild(navItem("recent","\uD83D\uDD52","Recent"));
 sb.appendChild(navItem("finance","\uD83D\uDCB0","Finance"));
 sb.appendChild(navItem("revenue","\uD83D\uDCC8","Revenue"));
 sb.appendChild(navItem("tools","\uD83D\uDEE0","Tools"));
 sb.appendChild(navItem("chat","\uD83D\uDCAC","Chat"));
 sb.appendChild(navItem("system","\u2699","System"));
 const foot=el("div",{class:"sidebar-foot"});
 const pill=el("div",{class:"user-pill"});
 pill.appendChild(el("span",{},"\uD83D\uDC64 "+(STATE.user&&STATE.user.name||"Paddy")));
 const out=el("button",{},"Sign out");
 out.addEventListener("click",()=>{clearAuth();STATE.user=null;STATE.agentPin=null;render()});
 pill.appendChild(out);foot.appendChild(pill);sb.appendChild(foot);
 return sb;
}

function renderMain(){
 const m=el("div",{class:"main"});
 if(STATE.view==="projects")return renderProjects(m);
 if(STATE.view==="recent")return renderRecent(m);
 if(STATE.view==="finance")return renderFinance(m);
 if(STATE.view==="revenue")return renderRevenue(m);
 if(STATE.view==="tools")return renderTools(m);
 if(STATE.view==="chat")return renderChatMain(m);
 if(STATE.view==="system")return renderSystem(m);
 return m;
}

function renderProjects(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Projects"));
 const total=STATE.projects.length;
 const live=STATE.projects.filter(p=>["live","active"].includes((p.status||"").toLowerCase())).length;
 const building=STATE.projects.filter(p=>["dev","building"].includes((p.status||"").toLowerCase())).length;
 const archived=STATE.projects.filter(p=>["archived","dormant"].includes((p.status||"").toLowerCase())).length;
 const stats=el("div",{class:"stats"});
 [[total,"total"],[live,"live"],[building,"building"],[archived,"archived"]].forEach(([n,l])=>stats.appendChild(el("div",{class:"stat"},el("strong",{},String(n)),l)));
 top.appendChild(stats);m.appendChild(top);
 const ctrl=el("div",{class:"controls"});
 const search=el("input",{type:"text",placeholder:"Search projects\u2026",value:STATE.q});
 search.addEventListener("input",()=>{STATE.q=search.value;refreshGrid()});
 ctrl.appendChild(search);
 const cats=Array.from(new Set(STATE.projects.map(p=>(p.category||"").toLowerCase()).filter(Boolean))).sort();
 const catSel=el("select");
 catSel.appendChild(el("option",{value:"all"},"All categories"));
 cats.forEach(c=>catSel.appendChild(el("option",{value:c},c)));
 catSel.value=STATE.cat;
 catSel.addEventListener("change",()=>{STATE.cat=catSel.value;refreshGrid()});
 ctrl.appendChild(catSel);
 const ssel=el("select");
 [["active-only","Active only"],["all","All statuses"],["live","Live"],["active","Active"],["dev","Dev"],["building","Building"],["planned","Planned"],["idea","Idea"],["merged","Merged"],["archived","Archived"],["dormant","Dormant"]].forEach(([v,l])=>ssel.appendChild(el("option",{value:v},l)));
 ssel.value=STATE.status;
 ssel.addEventListener("change",()=>{STATE.status=ssel.value;refreshGrid()});
 ctrl.appendChild(ssel);
 const sortSel=el("select");
 [["priority","Sort: Priority"],["cost","Sort: Cost"],["name","Sort: Name"],["last_updated","Sort: Updated"],["status","Sort: Status"]].forEach(([v,l])=>sortSel.appendChild(el("option",{value:v},l)));
 sortSel.value=STATE.sort;
 sortSel.addEventListener("change",()=>{STATE.sort=sortSel.value;refreshGrid()});
 ctrl.appendChild(sortSel);
 const reload=el("button",{},"\u21bb");
 reload.addEventListener("click",async()=>{reload.textContent="\u2026";await loadProjects();refreshGrid();reload.textContent="\u21bb"});
 ctrl.appendChild(reload);m.appendChild(ctrl);
 const grid=el("div",{class:"grid",id:"grid"});m.appendChild(grid);
 return m;
}

function refreshGrid(){
 const grid=$("#grid");if(!grid)return;
 grid.innerHTML="";
 const ql=STATE.q.toLowerCase();
 let filtered=STATE.projects.filter(p=>{
  if(STATE.cat!=="all"&&(p.category||"").toLowerCase()!==STATE.cat)return false;
  if(STATE.status==="active-only"){const s=(p.status||"").toLowerCase();if(["merged","archived","dormant"].includes(s))return false}else if(STATE.status!=="all"&&(p.status||"").toLowerCase()!==STATE.status)return false;
  if(!ql)return true;
  return ["name","desc","features","tech","domains","category","url"].some(k=>String(p[k]||"").toLowerCase().includes(ql));
 });
 const s=STATE.sort;
 filtered.sort((a,b)=>{
  if(s==="priority")return (a.priority||999)-(b.priority||999);
  if(s==="cost")return parseCost(b.cost)-parseCost(a.cost);
  if(s==="name")return (a.name||"").localeCompare(b.name||"");
  if(s==="last_updated")return (b.last_updated||"").localeCompare(a.last_updated||"");
  if(s==="status")return (a.status||"").localeCompare(b.status||"");
  return 0;
 });
 if(filtered.length===0){grid.appendChild(el("div",{class:"empty"},"No projects match."));return}
 for(const p of filtered){
  const tile=el("div",{class:"tile"});
  tile.addEventListener("click",()=>openModal(p));
  const head=el("div",{class:"tile-head"});
  const tb=el("div");
  tb.appendChild(el("div",{class:"tile-name"},p.name||"Untitled"));
  if(p.category)tb.appendChild(el("div",{class:"tile-cat"},p.category));
  head.appendChild(tb);
  const status=(p.status||"").toLowerCase();
  if(status)head.appendChild(el("div",{class:"badge "+status},p.status));
  tile.appendChild(head);
  if(p.desc)tile.appendChild(el("div",{class:"tile-desc"},p.desc));
  const foot=el("div",{class:"tile-foot"});
  if(p.tech)p.tech.split(",").slice(0,3).forEach(t=>foot.appendChild(el("span",{},t.trim())));
  if(p.cost)foot.appendChild(el("span",{class:"cost"},"\uD83D\uDCB0 "+p.cost));
  if(foot.children.length)tile.appendChild(foot);
  grid.appendChild(tile);
 }
}

function openModal(p){
 const bg=el("div",{class:"modal-bg"});
 bg.addEventListener("click",e=>{if(e.target===bg)bg.remove()});
 const m=el("div",{class:"modal"});
 const close=el("button",{class:"modal-close"},"\u00d7");
 close.addEventListener("click",()=>bg.remove());
 m.appendChild(close);
 m.appendChild(el("h2",{},p.name||"Untitled"));
 const cl=el("div",{class:"cat-line"});
 if(p.category)cl.appendChild(el("span",{},p.category));
 if(p.status)cl.appendChild(el("span",{class:"badge "+(p.status||"").toLowerCase()},p.status));
 if(p.priority)cl.appendChild(el("span",{},"Priority "+p.priority));
 if(p.cost)cl.appendChild(el("span",{style:"color:var(--accent)"},"\uD83D\uDCB0 "+p.cost));
 m.appendChild(cl);
 const actions=el("div",{class:"actions-row"});
 if(p.url)actions.appendChild(el("a",{href:p.url,target:"_blank",rel:"noopener",class:"primary"},"\uD83C\uDF10 Open live"));
 if(p.github){
  actions.appendChild(el("a",{href:p.github,target:"_blank",rel:"noopener"},"\uD83D\uDCE6 GitHub"));
  const editUrl=p.github.replace("github.com","github.dev");
  actions.appendChild(el("a",{href:editUrl,target:"_blank",rel:"noopener"},"\u270F Edit code"));
 }
 const cBtn=el("button",{},"\uD83D\uDCAC Chat about this");
 cBtn.addEventListener("click",()=>{STATE.chatContext=p;STATE.chat.push({role:"system",content:"\u2014 Now talking about "+(p.name||"project")+" \u2014"});bg.remove();render();});
 actions.appendChild(cBtn);m.appendChild(actions);
 if(p.desc)m.appendChild(el("div",{class:"desc"},p.desc));
 const rows=[
  ["URL",p.url?'<a href="'+esc(p.url)+'" target="_blank" rel="noopener">'+esc(p.url)+"</a>":null],
  ["GitHub",p.github?'<a href="'+esc(p.github)+'" target="_blank" rel="noopener">'+esc(p.github)+"</a>":null],
  ["Domain",p.domains],
  ["Tech",p.tech],
  ["Status",p.status],
  ["Priority",p.priority],
  ["Cost",p.cost],
  ["Cost notes",p.cost_notes],
  ["Progress",p.progress?p.progress+"%":null],
  ["Y1 / Y2 / Y3",[p.y1,p.y2,p.y3].filter(Boolean).join(" / ")||null],
  ["Scale",p.scale],
  ["Detail",p.detail],
  ["Updated",p.last_updated],
  ["Next",p.next],
  ["Notes",p.notes]
 ];
 for(const [k,v] of rows){
  if(!v&&v!==0)continue;
  const row=el("div",{class:"row"});
  row.appendChild(el("strong",{},k));
  row.appendChild(el("div",{html:typeof v==="string"&&/<a /.test(v)?v:esc(String(v))}));
  m.appendChild(row);
 }
 if(p.features){
  m.appendChild(el("div",{style:"margin-top:14px;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px"},"Features"));
  m.appendChild(el("div",{class:"features"},p.features));
 }
 bg.appendChild(m);document.body.appendChild(bg);
}

function renderChatPane(){
 const p=el("div",{class:"chat-pane"});
 const head=el("div",{class:"chat-head"});
 head.appendChild(el("span",{},"\uD83D\uDCAC Chat"));
 if(STATE.chatContext){
  head.appendChild(el("span",{style:"margin-left:8px;font-size:11px;color:var(--accent);background:rgba(255,107,53,0.1);padding:3px 8px;border-radius:99px"},"\u2192 "+(STATE.chatContext.name||"project")));
  const clr=el("button",{style:"margin-left:auto;background:none;border:none;color:var(--muted);cursor:pointer;font-size:11px"},"clear");
  clr.addEventListener("click",()=>{STATE.chatContext=null;STATE.chat.push({role:"system",content:"\u2014 general chat \u2014"});render()});
  head.appendChild(clr);
 }
 p.appendChild(head);
 const msgs=el("div",{class:"chat-msgs",id:"chat-msgs"});
 if(STATE.chat.length===0)msgs.appendChild(el("div",{class:"chat-empty"},"Click any tile then \u201cChat about this\u201d to scope the AI."));
 for(const m of STATE.chat)msgs.appendChild(el("div",{class:"msg "+m.role},m.content));
 p.appendChild(msgs);
 const form=el("form",{class:"chat-form"});
 const inp=el("input",{type:"text",placeholder:STATE.chatContext?("Ask about "+(STATE.chatContext.name||"this project")+"\u2026"):"Type a message\u2026"});
 const btn=el("button",{class:"primary",type:"submit"},"\u2192");
 form.appendChild(inp);form.appendChild(btn);
 form.addEventListener("submit",async(e)=>{
  e.preventDefault();
  const text=inp.value.trim();if(!text)return;
  STATE.chat.push({role:"user",content:text});inp.value="";refreshChat();
  btn.disabled=true;
  try{
   // Always route through agent-chat — has full toolset (web/D1/CF/browser/etc.)
   const r=await fetch("/api/agent-chat",{method:"POST",headers:{"Content-Type":"application/json","X-Pin":STATE.agentPin||""},body:JSON.stringify({message:text,project:STATE.chatContext||null})});
   const d=await r.json();
   let reply=d.reply||d.error||"No response";
   if(d.tool_calls&&d.tool_calls.length){
    const summary=d.tool_calls.map(t=>{
     const o=t.output||{};
     if(t.tool==="write_file"&&o.ok)return "Edited "+o.path+" (commit "+o.commit+")";
     if(t.tool==="write_file"&&o.error)return "Edit FAILED: "+o.error;
     if(t.tool==="read_file"&&!o.error)return "Read "+t.input.path;
     if(t.tool==="list_files"&&!o.error)return "Listed "+(t.input.path||"/");
     if(t.tool==="run_d1_query"&&!o.error)return "SQL ("+(o.total||0)+" rows)";
     if(t.tool==="web_fetch"&&!o.error)return "Fetched "+(t.input.url||"").substring(0,50);
     if(t.tool==="web_search"&&!o.error)return "Searched: "+(t.input.query||"");
     if(t.tool==="vault_get"&&!o.error)return "Got secret "+t.input.key;
     if(t.tool==="cf_deploy_worker"&&o.ok)return "Deployed "+o.worker;
     if(t.tool==="list_workers"&&!o.error)return "Listed workers";
     if(t.tool&&t.tool.startsWith("browser_"))return t.tool.replace("browser_","")+(o.error?" FAILED: "+o.error:" ok");
     if(t.tool==="update_project_metadata"&&o.ok)return "Updated "+(t.input?Object.keys(t.input).join(","):"")+" fields";
     return t.tool+" -> "+(o.error?"err: "+o.error:"ok");
    }).join(" \u00b7 ");
    reply=reply+String.fromCharCode(10,10)+"["+summary+"]";
   }
   STATE.chat.push({role:"assistant",content:reply});
  }catch(err){STATE.chat.push({role:"assistant",content:"Error: "+err.message})}
  btn.disabled=false;refreshChat();inp.focus();
 });
 p.appendChild(form);return p;
}

function refreshChat(){
 const msgs=$("#chat-msgs");if(!msgs)return;
 msgs.innerHTML="";
 if(STATE.chat.length===0)msgs.appendChild(el("div",{class:"chat-empty"},"Click any tile then \u201cChat about this\u201d to scope the AI."));
 for(const m of STATE.chat)msgs.appendChild(el("div",{class:"msg "+m.role},m.content));
 msgs.scrollTop=msgs.scrollHeight;
}

function renderChatMain(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Chat"));m.appendChild(top);
 m.appendChild(el("div",{class:"placeholder"},
  el("h2",{style:"color:var(--text);margin:0 0 10px"},"Chat panel is on the right \u2192"),
  el("span",{},"On wide screens chat sits in the sidebar. Click any project then \u201cChat about this\u201d to scope the AI."),
 ));
 return m;
}

function renderFinance(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Finance"));m.appendChild(top);
 const list=STATE.projects.map(p=>({...p,_cost:parseCost(p.cost)})).sort((a,b)=>b._cost-a._cost);
 const total=list.reduce((s,p)=>s+p._cost,0);
 const monthly=list.filter(p=>{const c=String(p.cost||"").toLowerCase();return c.indexOf("month")>=0||c.indexOf("/mo")>=0||c.indexOf("/m")>=0});
 const monthlyTotal=monthly.reduce((s,p)=>s+p._cost,0);
 const wrap=el("div",{style:"padding:20px;display:grid;gap:14px"});
 const cards=el("div",{style:"display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px"});
 const card=(label,val,sub)=>{const c=el("div",{class:"fcard"});c.appendChild(el("div",{class:"fcard-label"},label));c.appendChild(el("div",{class:"fcard-val"},val));if(sub)c.appendChild(el("div",{class:"fcard-sub"},sub));return c};
 cards.appendChild(card("Total spend","$"+total.toFixed(2), list.length+" projects"));
 cards.appendChild(card("Monthly recurring","$"+monthlyTotal.toFixed(2)+"/mo", monthly.length+" projects"));
 cards.appendChild(card("Avg per project","$"+(list.length?total/list.length:0).toFixed(2),""));
 wrap.appendChild(cards);
 wrap.appendChild(el("div",{style:"font-size:12px;color:var(--muted);margin-top:10px"},"Highest cost first \u2014 click any row for full project info."));
 const tbl=el("div",{style:"display:grid;gap:4px"});
 list.forEach(p=>{
  const row=el("div",{class:"fee-row"});
  row.addEventListener("click",()=>openModal(p));
  const left=el("div");
  left.appendChild(el("div",{style:"font-weight:600"},p.name||"\u2014"));
  if(p.cost_notes||p.tech)left.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-top:2px"},p.cost_notes||p.tech||""));
  row.appendChild(left);
  row.appendChild(el("div",{style:"color:var(--accent);font-weight:600;text-align:right"},p.cost||"\u2014"));
  row.appendChild(el("span",{class:"badge "+(p.status||"").toLowerCase(),style:"text-align:center"},p.status||"\u2014"));
  tbl.appendChild(row);
 });
 wrap.appendChild(tbl);
 m.appendChild(wrap);return m;
}

function renderRecent(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Recent"));m.appendChild(top);
 const list=STATE.projects.slice().sort((a,b)=>(b.last_updated||"").localeCompare(a.last_updated||"")).slice(0,30);
 const wrap=el("div",{style:"padding:18px 20px;display:grid;gap:8px"});
 wrap.appendChild(el("div",{style:"font-size:12px;color:var(--muted);margin-bottom:6px"},"Last 30 projects by update date \u2014 click to open."));
 list.forEach(p=>{
  const row=el("div",{style:"display:grid;grid-template-columns:140px 1fr auto;gap:14px;padding:12px 14px;background:var(--panel);border:1px solid var(--border);border-radius:8px;cursor:pointer;align-items:center"});
  row.addEventListener("click",()=>openModal(p));
  row.appendChild(el("div",{style:"font-size:11px;color:var(--muted);font-family:ui-monospace,monospace"},p.last_updated||"\u2014"));
  const mid=el("div");
  mid.appendChild(el("div",{style:"font-weight:600;font-size:14px"},p.name||"\u2014"));
  if(p.next)mid.appendChild(el("div",{style:"font-size:12px;color:var(--muted);margin-top:2px"},"Next: "+p.next));
  row.appendChild(mid);
  row.appendChild(el("span",{class:"badge "+(p.status||"").toLowerCase()},p.status||"\u2014"));
  wrap.appendChild(row);
 });
 m.appendChild(wrap);return m;
}
function renderTools(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Tools"));m.appendChild(top);
 const wrap=el("div",{style:"padding:20px;display:grid;gap:14px"});
 wrap.appendChild(el("div",{style:"color:var(--muted);font-size:12px"},"Direct links to your operator infrastructure. Open in new tab."));
 const groups=[
  {title:"Cloudflare",items:[
   ["CF Dashboard","https://dash.cloudflare.com/a6f47c17811ee2f8b6caeb8f38768c20","\u2601 All workers, DNS, R2, D1, KV"],
   ["Workers list","https://dash.cloudflare.com/a6f47c17811ee2f8b6caeb8f38768c20/workers/overview","Worker fleet"],
   ["DNS (luckdragon.io)","https://dash.cloudflare.com/a6f47c17811ee2f8b6caeb8f38768c20/luckdragon.io/dns","DNS records"],
   ["AI Gateway","https://dash.cloudflare.com/a6f47c17811ee2f8b6caeb8f38768c20/ai/ai-gateway","AI usage + caching"],
  ]},
  {title:"GitHub",items:[
   ["Repos (LuckDragonAsgard)","https://github.com/LuckDragonAsgard","\uD83D\uDCE6 Source repos"],
   ["asgard-workers","https://github.com/LuckDragonAsgard/asgard-workers","Main worker repo"],
   ["asgard-source","https://github.com/LuckDragonAsgard/asgard-source","Legacy source"],
  ]},
  {title:"Services",items:[
   ["Stripe Dashboard","https://dashboard.stripe.com","\uD83D\uDCB3 Payments"],
   ["Vercel Dashboard","https://vercel.com/dashboard","\u25B2 Vercel deploys"],
   ["Supabase","https://supabase.com/dashboard/projects","\uD83D\uDDC4 Postgres"],
   ["Google Drive","https://drive.google.com","\uD83D\uDCC1 Drive"],
   ["Asgard Vault","https://asgard-vault.pgallivan.workers.dev/secrets","\uD83D\uDD11 Secrets (PIN required)"],
  ]},
  {title:"Falkor APIs",items:[
   ["Projects API","https://falkor-dashboard.luckdragon.io/api/projects","48 projects JSON"],
   ["Asgard AI chat","https://asgard-ai.luckdragon.io/health","AI router"],
   ["Falkor Brain","https://falkor-brain.luckdragon.io/health","Vectorize RAG"],
  ]},
 ];
 groups.forEach(g=>{
  wrap.appendChild(el("div",{style:"font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-top:14px"},g.title));
  const grid=el("div",{style:"display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px"});
  g.items.forEach(([label,url,desc])=>{
   const card=el("a",{href:url,target:"_blank",rel:"noopener",style:"background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:12px 14px;text-decoration:none;color:var(--text);transition:all 0.1s;display:block"});
   card.appendChild(el("div",{style:"font-weight:600;font-size:13px"},label));
   if(desc)card.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-top:2px"},desc));
   grid.appendChild(card);
  });
  wrap.appendChild(grid);
 });
 m.appendChild(wrap);return m;
}
function renderRevenue(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"Revenue (projected)"));m.appendChild(top);
 const isMerged = p => ["merged","archived","dormant"].includes((p.status||"").toLowerCase());
 const list = STATE.projects.filter(p=>!isMerged(p)).map(p=>{
  const y1=Number(p.y1||p.revenue_y1||0);
  const y2=Number(p.y2||p.revenue_y2||0);
  const y3=Number(p.y3||p.revenue_y3||0);
  return {...p,_y1:y1,_y2:y2,_y3:y3,_total:y1+y2+y3};
 }).sort((a,b)=>b._total-a._total);
 const t1=list.reduce((s,p)=>s+p._y1,0);
 const t2=list.reduce((s,p)=>s+p._y2,0);
 const t3=list.reduce((s,p)=>s+p._y3,0);
 const wrap=el("div",{style:"padding:20px;display:grid;gap:14px"});
 const cards=el("div",{style:"display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px"});
 const fmt=n=>"$"+(n>=1e6?(n/1e6).toFixed(2)+"M":n>=1e3?(n/1e3).toFixed(1)+"k":n.toFixed(0));
 const card=(label,val,sub)=>{const c=el("div",{class:"fcard"});c.appendChild(el("div",{class:"fcard-label"},label));c.appendChild(el("div",{class:"fcard-val"},val));if(sub)c.appendChild(el("div",{class:"fcard-sub"},sub));return c};
 cards.appendChild(card("Year 1 projected",fmt(t1), list.length+" projects"));
 cards.appendChild(card("Year 2 projected",fmt(t2),""));
 cards.appendChild(card("Year 3 projected",fmt(t3),""));
 cards.appendChild(card("3-year total",fmt(t1+t2+t3),""));
 wrap.appendChild(cards);
 wrap.appendChild(el("div",{style:"font-size:12px;color:var(--muted);margin-top:10px"},"Top revenue projects (by 3-year total). Click a row for full detail."));
 const tbl=el("div",{style:"display:grid;gap:4px"});
 list.forEach(p=>{
  if(p._total===0)return;
  const row=el("div",{style:"display:grid;grid-template-columns:1fr 80px 80px 80px 90px 90px;gap:10px;padding:10px 12px;background:var(--panel);border:1px solid var(--border);border-radius:8px;font-size:13px;cursor:pointer;align-items:center"});
  row.addEventListener("click",()=>openModal(p));
  const left=el("div");
  left.appendChild(el("div",{style:"font-weight:600"},p.name||"\u2014"));
  if(p.url)left.appendChild(el("div",{style:"font-size:11px;color:var(--muted);margin-top:2px"},p.url));
  row.appendChild(left);
  row.appendChild(el("div",{style:"text-align:right;color:var(--muted)"},fmt(p._y1)));
  row.appendChild(el("div",{style:"text-align:right;color:var(--muted)"},fmt(p._y2)));
  row.appendChild(el("div",{style:"text-align:right;color:var(--muted)"},fmt(p._y3)));
  row.appendChild(el("div",{style:"color:var(--accent);font-weight:600;text-align:right"},fmt(p._total)));
  row.appendChild(el("span",{class:"badge "+(p.status||"").toLowerCase(),style:"text-align:center"},p.status||"\u2014"));
  tbl.appendChild(row);
 });
 // header row
 const hdr=el("div",{style:"display:grid;grid-template-columns:1fr 80px 80px 80px 90px 90px;gap:10px;padding:6px 12px;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px"});
 ["Project","Y1","Y2","Y3","3yr total","Status"].forEach((h,i)=>hdr.appendChild(el("div",{style:i>0&&i<5?"text-align:right":""},h)));
 wrap.appendChild(hdr);
 wrap.appendChild(tbl);
 m.appendChild(wrap);return m;
}
function renderSystem(m){
 const top=el("div",{class:"topbar"});top.appendChild(el("h1",{},"System"));m.appendChild(top);
 const wrap=el("div",{style:"padding:20px;display:grid;gap:10px"});
 wrap.appendChild(el("div",{style:"color:var(--muted);font-size:12px"},"Cloudflare worker fleet (live):"));
 const list=el("div",{style:"display:grid;gap:6px"});wrap.appendChild(list);m.appendChild(wrap);
 const workers=["falkor-agent","falkor-kbt","falkor-workflows","falkor-school","falkor-sport","falkor-telegram","asgard-ai","falkor-brain","falkor-web","falkor-code","falkor-push","falkor-dashboard","falkor-widget","falkor-tools"];
 workers.forEach(w=>{
  const row=el("div",{style:"display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--panel);border:1px solid var(--border);border-radius:8px;font-size:13px"});
  row.appendChild(el("span",{style:"flex:1"},w));
  const ver=el("span",{style:"color:var(--muted);font-size:11px;font-family:ui-monospace,monospace"},"\u2026");
  const dot=el("span",{style:"width:8px;height:8px;border-radius:50%;background:var(--muted)"});
  row.appendChild(ver);row.appendChild(dot);list.appendChild(row);
  fetch("https://"+w+".luckdragon.io/health").then(r=>r.json()).then(d=>{ver.textContent=d.version||d.status||"ok";dot.style.background="var(--green)"}).catch(()=>{ver.textContent="down";dot.style.background="var(--red)"});
 });
 return m;
}

(async function init(){const a=loadAuth();if(a){STATE.user=a.user;STATE.agentPin=a.agentPin;try{await loadProjects()}catch(e){}}render()})();
</script></body></html>`;

const CORS={
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Pin',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};
const NOCACHE={
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export default {
  async fetch(request, env) {
    const url=new URL(request.url);
    if(request.method==='OPTIONS')return new Response(null,{headers:CORS});
    if(url.pathname==='/health')return Response.json({ok:true,worker:'falkor-tools',version:'2.7.0',mode:'asgard-hub-unified-agent'},{headers:{...CORS,...NOCACHE}});
    if(url.pathname==='/api/projects'){
      try {
        const sql = "SELECT id, project_name AS name, category, status, live_url AS url, github_url AS github, tech_stack AS tech, description AS desc, key_features AS features, next_action AS next, progress_pct AS progress, scale_notes AS scale, detail_md AS detail, notes, last_updated, sort_order, domains, revenue_y1 AS y1, revenue_y2 AS y2, revenue_y3 AS y3, revenue_category, income_priority AS priority, cost_monthly AS cost, cost_notes FROM products ORDER BY sort_order, id";
        const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
          method:'POST',
          headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
          body: JSON.stringify({ sql }),
        });
        const d = await r.json();
        if (!d.success) return Response.json({ projects:[], error: d.errors }, { headers:{...CORS,...NOCACHE} });
        // Format cost as a string for tile display ($1.58 -> "$1.58/mo")
        const projects = (d.result?.[0]?.results || []).map(p => ({
          ...p,
          cost: p.cost > 0 ? '$'+p.cost.toFixed(2)+'/mo' : (p.cost === 0 ? '' : p.cost),
        }));
        return Response.json({ projects }, { headers:{...CORS,...NOCACHE} });
      } catch(e) {
        return Response.json({ error:'D1 query failed', detail: String(e).substring(0,300) }, { status:500, headers:{...CORS,...NOCACHE} });
      }
    }
    if(url.pathname==='/browser/ping'){
      const pin = request.headers.get('X-Pin') || '';
      // simple auth: any of agent pin, dashboard pin, or paddy pin via vault verify
      if (!pin) return new Response('Unauthorized',{status:401,headers:CORS});
      // check via falkor-push verify (same as login)
      try {
        const r = await fetch('https://falkor-push.luckdragon.io/user/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:'paddy',pin})});
        const d = await r.json();
        if (d && d.success) return Response.json({ok:true},{headers:{...CORS,...NOCACHE}});
      } catch(e){}
      // fallback: agent pin
      if (pin === env.AGENT_PIN) return Response.json({ok:true},{headers:{...CORS,...NOCACHE}});
      return new Response('Unauthorized',{status:401,headers:CORS});
    }
    if(url.pathname==='/browser/poll'){
      const pin = request.headers.get('X-Pin') || '';
      if (!pin || (pin !== env.AGENT_PIN && pin !== '2967')) {
        // verify against push
        let ok=false;
        try { const r=await fetch('https://falkor-push.luckdragon.io/user/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:'paddy',pin})}); const d=await r.json(); ok=!!(d&&d.success);}catch(e){}
        if(!ok) return new Response('Unauthorized',{status:401,headers:CORS});
      }
      // pop next pending command from KV
      const queue = await env.ASSETS.get('browser:queue', { type:'json' }) || [];
      if (queue.length === 0) return new Response('',{status:204,headers:{...CORS,...NOCACHE}});
      const cmd = queue.shift();
      await env.ASSETS.put('browser:queue', JSON.stringify(queue));
      return Response.json(cmd, {headers:{...CORS,...NOCACHE}});
    }
    if(url.pathname==='/browser/result'&&request.method==='POST'){
      const pin = request.headers.get('X-Pin') || '';
      if (!pin) return new Response('Unauthorized',{status:401,headers:CORS});
      const body = await request.json();
      if (!body.id) return Response.json({error:'id required'},{status:400,headers:CORS});
      // store result keyed by command id, expires 5 min
      await env.ASSETS.put('browser:result:'+body.id, JSON.stringify(body.output||{}), { expirationTtl: 300 });
      return Response.json({ok:true},{headers:{...CORS,...NOCACHE}});
    }
    if(url.pathname==='/upload'&&request.method==='GET'){
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Upload mascot</title>
<style>body{background:#0a0e14;color:#e6edf6;font-family:system-ui;padding:40px;max-width:600px;margin:auto}
h1{color:#ff6b35}
.drop{border:2px dashed #444;border-radius:12px;padding:60px;text-align:center;cursor:pointer;margin:20px 0}
.drop:hover{border-color:#ff6b35}
.row{display:flex;gap:10px;align-items:center;margin:8px 0;padding:10px;background:#11161f;border-radius:8px}
.row input{flex:1;background:#161c27;color:#e6edf6;border:1px solid #222;border-radius:6px;padding:8px}
.row button{background:linear-gradient(135deg,#ff6b35,#ffa94d);color:#fff;border:none;border-radius:6px;padding:8px 16px;cursor:pointer}
.thumb{width:80px;height:80px;object-fit:cover;border-radius:6px;background:#222}
.log{background:#11161f;border-radius:8px;padding:12px;margin-top:20px;font-family:ui-monospace,monospace;font-size:12px;white-space:pre-wrap;color:#8b95a7}
</style></head><body>
<h1>Upload Falkor mascots</h1>
<p>Drop the 3 PNGs here. Each will be saved with the key falkor1, falkor2, falkor3 (or use the file's name).</p>
<div class="drop" id="drop">Drag &amp; drop PNG/JPG files here, or click to pick</div>
<input type="file" id="fp" accept="image/*" multiple style="display:none">
<div id="rows"></div>
<button id="up" style="background:linear-gradient(135deg,#ff6b35,#ffa94d);color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:15px;cursor:pointer;margin-top:10px;display:none">Upload all</button>
<div class="log" id="log"></div>
<script>
const drop=document.getElementById('drop'),fp=document.getElementById('fp'),rows=document.getElementById('rows'),logEl=document.getElementById('log'),upBtn=document.getElementById('up');
const queue=[];
const log=m=>{logEl.textContent+=m+String.fromCharCode(10);logEl.scrollTop=logEl.scrollHeight};
drop.onclick=()=>fp.click();
drop.ondragover=e=>{e.preventDefault();drop.style.borderColor='#ff6b35'};
drop.ondragleave=()=>drop.style.borderColor='#444';
drop.ondrop=e=>{e.preventDefault();drop.style.borderColor='#444';add(e.dataTransfer.files)};
fp.onchange=()=>add(fp.files);
function add(files){
 for(const f of files){
  if(!f.type.startsWith('image/')){log('skip non-image: '+f.name);continue}
  const slug=(f.name.replace(/\.[^.]+$/,'').toLowerCase().replace(/[^a-z0-9]+/g,'-')).replace(/^-+|-+$/g,'')||('asset'+Date.now());
  const item={file:f,slug,size:f.size};queue.push(item);
  const reader=new FileReader();
  reader.onload=()=>{
   const row=document.createElement('div');row.className='row';
   const img=document.createElement('img');img.className='thumb';img.src=reader.result;row.appendChild(img);
   const info=document.createElement('div');info.style.flex='1';info.innerHTML='<div style="font-weight:600">'+f.name+'</div><div style="font-size:11px;color:#888">'+(f.size/1024).toFixed(1)+' KB</div>';row.appendChild(info);
   const inp=document.createElement('input');inp.value=slug;inp.oninput=()=>{item.slug=inp.value};row.appendChild(inp);
   rows.appendChild(row);
   item.dataUrl=reader.result;
   upBtn.style.display='block';
  };
  reader.readAsDataURL(f);
 }
}
upBtn.onclick=async()=>{
 upBtn.disabled=true;upBtn.textContent='Uploading...';
 for(const it of queue){
  if(!it.dataUrl){log('not ready: '+it.file.name);continue}
  log('uploading '+it.slug+' ('+(it.size/1024).toFixed(1)+' KB)...');
  const base64=it.dataUrl.split(',')[1];
  const ct=it.dataUrl.split(';')[0].split(':')[1];
  const r=await fetch('/upload',{method:'POST',headers:{'Content-Type':'application/json','X-Pin':localStorage.getItem('asgard.pin')||'2967'},body:JSON.stringify({slug:it.slug,base64,content_type:ct})});
  const d=await r.json();
  if(d.ok){log(' \u2713 '+it.slug+' -> /asset/'+it.slug+' ('+d.bytes+' bytes)')}
  else{log(' \u2717 '+it.slug+': '+(d.error||'failed'))}
 }
 upBtn.disabled=false;upBtn.textContent='Upload all';
 log('done. View: /asset/<slug>');
};
</script></body></html>`;
      return new Response(html, { headers:{'Content-Type':'text/html; charset=utf-8',...NOCACHE,...CORS} });
    }
    if(url.pathname==='/upload'&&request.method==='POST'){
      try{
        const pin = request.headers.get('X-Pin') || '';
        if (!pin) return Response.json({error:'PIN required'},{status:401,headers:{...CORS,...NOCACHE}});
        const body = await request.json();
        const slug = (body.slug||'').replace(/[^a-zA-Z0-9._-]/g,'').substring(0,80);
        const ct = body.content_type || 'application/octet-stream';
        const base64 = body.base64 || '';
        if (!slug || !base64) return Response.json({error:'slug + base64 required'},{status:400,headers:{...CORS,...NOCACHE}});
        // store base64 + content_type in KV
        await env.ASSETS.put('asset:'+slug, base64, { metadata: { content_type: ct } });
        const bin = atob(base64);
        return Response.json({ok:true, slug, bytes: bin.length, content_type: ct},{headers:{...CORS,...NOCACHE}});
      }catch(e){
        return Response.json({error:'upload failed', detail: String(e).substring(0,300)},{status:500,headers:{...CORS,...NOCACHE}});
      }
    }
    if(url.pathname.startsWith('/asset/')){
      const slug = url.pathname.replace('/asset/','').replace(/[^a-zA-Z0-9._-]/g,'').substring(0,80);
      if (!slug) return new Response('Not found',{status:404,headers:CORS});
      const obj = await env.ASSETS.getWithMetadata('asset:'+slug);
      if (!obj || !obj.value) return new Response('Not found',{status:404,headers:CORS});
      const ct = obj.metadata?.content_type || 'application/octet-stream';
      const bin = Uint8Array.from(atob(obj.value), c => c.charCodeAt(0));
      return new Response(bin, {headers:{'Content-Type':ct,'Cache-Control':'public, max-age=31536000, immutable',...CORS}});
    }
    if(url.pathname==='/api/chat'&&request.method==='POST'){
      // Server-side proxy to dodge browser CORS issues with asgard-ai
      const pin = request.headers.get('X-Pin') || '';
      const body = await request.text();
      const upstream = await fetch(UPSTREAM_CHAT, {
        method:'POST',
        headers:{'Content-Type':'application/json','X-Pin':pin},
        body,
      });
      const text = await upstream.text();
      return new Response(text, {
        status: upstream.status,
        headers:{'Content-Type':'application/json',...CORS,...NOCACHE},
      });
    }
    if(url.pathname==='/api/chat'){
      return new Response('Method Not Allowed',{status:405,headers:CORS});
    }
    if(url.pathname==='/api/agent-chat'&&request.method==='POST'){
      try {
        const body = await request.json();
        const userMsg = body.message || '';
        const project = body.project || null;
        const history = Array.isArray(body.history) ? body.history : [];

        // Parse owner/repo from project.github URL
        let owner=null, repo=null, defaultBranch='main';
        if (project && project.github) {
          const m = project.github.match(/github\.com\/([^/]+)\/([^/?#]+)/);
          if (m) { owner=m[1]; repo=m[2].replace(/\.git$/,''); }
        }

        const tools = [
          { name:'list_files', description:'List files in the project repo at a given path. Returns names + types (file/dir).',
            input_schema:{ type:'object', properties:{ path:{ type:'string', description:'Path within repo, empty string for root' } }, required:[] } },
          { name:'read_file', description:'Read a file from the project repo.',
            input_schema:{ type:'object', properties:{ path:{ type:'string', description:'Path to file in repo' } }, required:['path'] } },
          { name:'write_file', description:'Write/overwrite a file in the project repo and commit. Use after the user confirms a change.',
            input_schema:{ type:'object', properties:{ path:{ type:'string' }, content:{ type:'string' }, message:{ type:'string', description:'Commit message' } }, required:['path','content','message'] } },
          { name:'update_project_metadata', description:"Update this project metadata in the Asgard D1 products table. Use to fix URL, status, dates, costs, revenue projections, descriptions. Auto-stamps last_updated.",
            input_schema:{ type:'object', properties:{
              live_url:{type:'string'},
              github_url:{type:'string'},
              status:{type:'string',description:'live | active | dev | building | idea | merged | archived | dormant'},
              description:{type:'string'},
              cost_monthly:{type:'number'},
              cost_notes:{type:'string'},
              revenue_y1:{type:'number'},
              revenue_y2:{type:'number'},
              revenue_y3:{type:'number'},
              next_action:{type:'string'},
              progress_pct:{type:'number'},
              notes:{type:'string'},
            }, required:[] } },
          { name:'web_fetch', description:"Fetch a URL over HTTP. Returns response status, headers, and body (truncated to 30KB). Use for reading docs, JSON APIs, etc.",
            input_schema:{ type:'object', properties:{ url:{type:'string'}, method:{type:'string',description:'GET/POST/etc, default GET'}, body:{type:'string'}, headers:{type:'object'} }, required:['url'] } },
          { name:'web_search', description:"Search the web via DuckDuckGo. Returns top 5 results with title + snippet + URL.",
            input_schema:{ type:'object', properties:{ query:{type:'string'} }, required:['query'] } },
          { name:'run_d1_query', description:"Run a SQL query against the Asgard D1 products database. Tables: products (50 projects), spend_log, deployments, audit_log, conversations, messages, etc. Use SELECT for reads, UPDATE for changes (be careful). Use ? params to avoid SQL injection.",
            input_schema:{ type:'object', properties:{ sql:{type:'string'}, params:{type:'array', items:{}} }, required:['sql'] } },
          { name:'vault_get', description:"Fetch a secret value from asgard-vault by key name. Use for tokens/credentials. Available keys: ANTHROPIC_API_KEY, GITHUB_TOKEN, CF_API_TOKEN, RESEND_API_KEY, STRIPE_SECRET_KEY, SUPABASE_*, etc.",
            input_schema:{ type:'object', properties:{ key:{type:'string'} }, required:['key'] } },
          { name:'cf_deploy_worker', description:"Re-deploy a Cloudflare worker from the latest source in LuckDragonAsgard/asgard-workers GitHub repo. Use after editing a worker file via write_file. Existing bindings are preserved.",
            input_schema:{ type:'object', properties:{ name:{type:'string',description:'Worker name e.g. falkor-tools, falkor-agent'} }, required:['name'] } },
          { name:'list_workers', description:"List all Cloudflare workers in the account with their last-modified time. Use to see the fleet.",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'browser_navigate', description:"Navigate the user's Chrome browser to a URL (active tab). Requires the Falkor Browser Bridge extension to be installed and connected.",
            input_schema:{ type:'object', properties:{ url:{type:'string'}, tabId:{type:'number'} }, required:['url'] } },
          { name:'browser_screenshot', description:"Capture a screenshot of the user's current browser viewport as PNG. Returns base64.",
            input_schema:{ type:'object', properties:{ tabId:{type:'number'} }, required:[] } },
          { name:'browser_click', description:"Click an element in the user's browser. Provide either CSS selector or x,y coordinates.",
            input_schema:{ type:'object', properties:{ selector:{type:'string'}, x:{type:'number'}, y:{type:'number'}, tabId:{type:'number'} }, required:[] } },
          { name:'browser_type', description:"Type text into an input/textarea in the user's browser. Provide selector to target element.",
            input_schema:{ type:'object', properties:{ selector:{type:'string'}, text:{type:'string'}, tabId:{type:'number'} }, required:['text'] } },
          { name:'browser_press_key', description:"Press a key in the user's browser (Enter, Tab, Escape, etc.).",
            input_schema:{ type:'object', properties:{ key:{type:'string'}, tabId:{type:'number'} }, required:['key'] } },
          { name:'browser_extract', description:"Extract text from the user's browser. Without selector returns full page text. With selector returns matching element details.",
            input_schema:{ type:'object', properties:{ selector:{type:'string'}, tabId:{type:'number'} }, required:[] } },
          { name:'browser_get_html', description:"Get the HTML of the user's browser page or a specific element.",
            input_schema:{ type:'object', properties:{ selector:{type:'string'}, tabId:{type:'number'} }, required:[] } },
          { name:'browser_eval', description:"Run arbitrary JavaScript in the user's browser page context. Returns the value of the last expression.",
            input_schema:{ type:'object', properties:{ code:{type:'string'}, tabId:{type:'number'} }, required:['code'] } },
          { name:'browser_tabs', description:"List all open tabs in the user's browser.",
            input_schema:{ type:'object', properties:{}, required:[] } },
          { name:'browser_new_tab', description:"Open a new tab in the user's browser.",
            input_schema:{ type:'object', properties:{ url:{type:'string'} }, required:[] } },
          { name:'browser_close_tab', description:"Close a tab in the user's browser by tabId.",
            input_schema:{ type:'object', properties:{ tabId:{type:'number'} }, required:[] } },
          { name:'browser_scroll', description:"Scroll the user's browser page by x,y pixels. Set absolute=true to scroll to position instead of by delta.",
            input_schema:{ type:'object', properties:{ x:{type:'number'}, y:{type:'number'}, absolute:{type:'boolean'} }, required:[] } },
        ];

        const ghHeaders = { 'Authorization': 'token '+env.GITHUB_TOKEN, 'User-Agent':'falkor-tools-agent', 'Accept':'application/vnd.github+json' };

        async function execTool(name, input) {
          const needRepo = ['list_files','read_file','write_file','cf_deploy_worker'].includes(name);
          if (needRepo && !owner && name !== 'cf_deploy_worker') {
            // cf_deploy_worker pulls from a fixed repo, others need project repo
            return { error:'No GitHub repo bound to this project — cannot run '+name+'.' };
          }
          if (name === 'list_files') {
            const p = (input.path||'').replace(/^\//,'');
            const r = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{headers:ghHeaders});
            if (!r.ok) return { error:'list_files HTTP '+r.status };
            const d = await r.json();
            if (!Array.isArray(d)) return { error:'Path is a file, not a directory' };
            return { files: d.map(f => ({ name:f.name, type:f.type, size:f.size })) };
          }
          if (name === 'read_file') {
            const p = (input.path||'').replace(/^\//,'');
            const r = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{headers:ghHeaders});
            if (!r.ok) return { error:'read_file HTTP '+r.status };
            const d = await r.json();
            if (!d.content) return { error:'No content (might be a directory)' };
            const decoded = atob(d.content.replace(/\n/g,''));
            return { path:p, sha:d.sha, content: decoded.length>40000 ? decoded.substring(0,40000)+String.fromCharCode(10)+"[truncated]" : decoded };
          }
          if (name === 'update_project_metadata') {
            if (!project || !project.id) return { error:'No project id; cannot update metadata.' };
            const allowed = ['live_url','github_url','status','description','cost_monthly','cost_notes','revenue_y1','revenue_y2','revenue_y3','next_action','progress_pct','notes'];
            const sets = []; const params = [];
            for (const k of allowed) {
              if (input[k] !== undefined) { sets.push(k+' = ?'); params.push(input[k]); }
            }
            if (sets.length === 0) return { error:'No fields to update' };
            sets.push("last_updated = datetime('now')");
            params.push(project.id);
            const sql = "UPDATE products SET "+sets.join(', ')+" WHERE id = ?";
            const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
              method:'POST',
              headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
              body: JSON.stringify({ sql, params }),
            });
            const d = await r.json();
            if (!d.success) return { error:'D1 update failed', detail: JSON.stringify(d.errors||[]).substring(0,300) };
            return { ok:true, updated_fields: Object.keys(input), changes: d.result?.[0]?.meta?.changes };
          }
          if (name === 'web_fetch') {
            try {
              const r = await fetch(input.url, { method: input.method||'GET', headers: input.headers||{}, body: input.body });
              const text = await r.text();
              return { status: r.status, headers: Object.fromEntries(r.headers.entries()), body: text.length>30000 ? text.substring(0,30000)+'...[truncated]' : text };
            } catch(e) { return { error: 'fetch failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'web_search') {
            try {
              const u = 'https://html.duckduckgo.com/html/?q='+encodeURIComponent(input.query||'');
              const r = await fetch(u, { headers: { 'User-Agent':'Mozilla/5.0' } });
              const html = await r.text();
              // crude extraction of result-link blocks
              const results = [];
              const re = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>[\s\S]*?class="result__snippet"[^>]*>(.*?)<\/a>/g;
              let m;
              while((m = re.exec(html)) && results.length < 5) {
                const strip = s => s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'");
                let url = m[1]; const um = url.match(/uddg=([^&]+)/); if(um) url = decodeURIComponent(um[1]);
                results.push({ title: strip(m[2]).trim(), url, snippet: strip(m[3]).trim() });
              }
              return { query: input.query, results };
            } catch(e) { return { error: 'search failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'run_d1_query') {
            try {
              const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/d1/database/'+env.D1_DB_ID+'/query', {
                method:'POST',
                headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'application/json' },
                body: JSON.stringify({ sql: input.sql, params: input.params||[] }),
              });
              const d = await r.json();
              if (!d.success) return { error: 'D1 error', detail: JSON.stringify(d.errors||[]).substring(0,400) };
              const rows = d.result?.[0]?.results || [];
              const meta = d.result?.[0]?.meta || {};
              return { rows: rows.length>50 ? rows.slice(0,50) : rows, total: rows.length, meta };
            } catch(e) { return { error: 'query failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'vault_get') {
            try {
              const r = await fetch(env.VAULT_URL+'/secret/'+encodeURIComponent(input.key||''), { headers: { 'X-Pin': env.VAULT_PIN } });
              if (!r.ok) return { error: 'vault HTTP '+r.status };
              const text = await r.text();
              if (text.startsWith('{') && text.includes('"error"')) return { error: text.substring(0,200) };
              return { key: input.key, value: text };
            } catch(e) { return { error: 'vault fetch failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'cf_deploy_worker') {
            try {
              const wname = (input.name||'').replace(/[^a-zA-Z0-9-]/g,'');
              if (!wname) return { error: 'worker name required' };
              // Pull source from GitHub
              const ghr = await fetch('https://api.github.com/repos/LuckDragonAsgard/asgard-workers/contents/'+wname+'.js', { headers: ghHeaders });
              if (!ghr.ok) return { error: 'worker source not found in repo: '+wname+'.js (HTTP '+ghr.status+')' };
              const ghd = await ghr.json();
              const code = atob(ghd.content.replace(/\n/g,''));
              // Deploy via CF API multipart
              const metadata = { main_module:'worker.js', compatibility_date:'2024-09-30', bindings:[], keep_bindings:['secret_text','kv_namespace','durable_object_namespace','d1_database'] };
              const boundary = '----b42deploy'+Date.now();
              const body = new TextEncoder().encode(
                '--'+boundary+'\r\nContent-Disposition: form-data; name="metadata"\r\nContent-Type: application/json\r\n\r\n'+JSON.stringify(metadata)+'\r\n'+
                '--'+boundary+'\r\nContent-Disposition: form-data; name="worker.js"; filename="worker.js"\r\nContent-Type: application/javascript+module\r\n\r\n'+
                code+'\r\n--'+boundary+'--\r\n'
              );
              const dr = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/workers/scripts/'+wname, {
                method:'PUT',
                headers:{ 'Authorization':'Bearer '+env.CF_API_TOKEN, 'Content-Type':'multipart/form-data; boundary='+boundary },
                body,
              });
              const dd = await dr.json();
              if (!dd.success) return { error: 'deploy failed', detail: JSON.stringify(dd.errors||[]).substring(0,400) };
              return { ok:true, worker: wname, deployment_id: dd.result?.deployment_id, source_sha: ghd.sha };
            } catch(e) { return { error: 'deploy failed: '+String(e).substring(0,200) }; }
          }
          // Helper to dispatch browser commands via Chrome extension bridge
          async function browserDispatch(action, input) {
            const cmdId = 'b_' + Date.now() + '_' + Math.random().toString(36).slice(2,8);
            // append to queue
            const queue = await env.ASSETS.get('browser:queue', { type:'json' }) || [];
            queue.push({ id: cmdId, action, input });
            await env.ASSETS.put('browser:queue', JSON.stringify(queue));
            // poll for result up to 25s
            const deadline = Date.now() + 45000;
            while (Date.now() < deadline) {
              await new Promise(r => setTimeout(r, 400));
              const res = await env.ASSETS.get('browser:result:'+cmdId);
              if (res) {
                await env.ASSETS.delete('browser:result:'+cmdId);
                try { return JSON.parse(res); } catch(e) { return { error:'bad result' }; }
              }
            }
            return { error: 'browser timeout — is the Falkor Bridge extension installed and connected?' };
          }
          if (name && name.startsWith('browser_')) {
            const action = name.replace('browser_','');
            return await browserDispatch(action, input);
          }
          if (name === 'list_workers') {
            try {
              const r = await fetch('https://api.cloudflare.com/client/v4/accounts/'+env.CF_ACCOUNT_ID+'/workers/scripts', { headers: { 'Authorization':'Bearer '+env.CF_API_TOKEN } });
              const d = await r.json();
              if (!d.success) return { error: 'list failed' };
              return { workers: d.result.map(w => ({ name: w.id, modified: w.modified_on })) };
            } catch(e) { return { error: 'list failed: '+String(e).substring(0,200) }; }
          }
          if (name === 'write_file') {
            const p = (input.path||'').replace(/^\//,'');
            // get sha if exists
            let sha=null;
            try {
              const r0 = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{headers:ghHeaders});
              if (r0.ok) { const d0 = await r0.json(); sha = d0.sha; }
            } catch(e){}
            const payload = { message: input.message || 'edit via Falkor agent', content: btoa(unescape(encodeURIComponent(input.content||''))), branch: defaultBranch };
            if (sha) payload.sha = sha;
            const r = await fetch("https://api.github.com/repos/"+owner+"/"+repo+"/contents/"+p,{method:'PUT',headers:{...ghHeaders,'Content-Type':'application/json'},body:JSON.stringify(payload)});
            const d = await r.json();
            if (!r.ok) return { error:'write_file HTTP '+r.status, detail: d.message || JSON.stringify(d).substring(0,300) };
            return { ok:true, commit: d.commit?.sha?.substring(0,7), html_url: d.commit?.html_url, path: p };
          }
          return { error:'Unknown tool: '+name };
        }

        // System prompt with project context
        let system = "You are a coding agent embedded in Paddy's Asgard project hub. You can read and edit files in the project's GitHub repo via tools.";
        if (project) {
          const ctx = ['Project: '+(project.name||'')];
          if (project.url) ctx.push('Live URL: '+project.url);
          if (project.github) ctx.push('GitHub: '+project.github);
          if (project.tech) ctx.push('Tech: '+project.tech);
          if (project.status) ctx.push('Status: '+project.status);
          if (project.desc) ctx.push('Description: '+project.desc);
          if (project.features) ctx.push('Features: '+project.features);
          system += String.fromCharCode(10,10) + ctx.join(String.fromCharCode(10));
        }
        system += String.fromCharCode(10,10) + "When the user asks for a change, ALWAYS read the relevant files first to understand the current state, then propose the change clearly, then call write_file to commit. Use concise commit messages. If you do not have enough info, list_files first. Be terse - this is a chat, not a report.";

        // Anthropic tool-use loop
        const messages = [...history, { role:'user', content: userMsg }];
        const toolResults = [];
        let iterations = 0;
        const maxIter = 8;
        let finalText = '';

        while (iterations < maxIter) {
          iterations++;
          const aReq = await fetch('https://api.anthropic.com/v1/messages', {
            method:'POST',
            headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version':'2023-06-01', 'content-type':'application/json' },
            body: JSON.stringify({
              model: 'claude-haiku-4-5-20251001',
              max_tokens: 4096,
              system,
              tools,
              messages,
            }),
          });
          if (!aReq.ok) {
            const err = await aReq.text();
            return Response.json({ error:'Anthropic API '+aReq.status, detail: err.substring(0,500) }, { status:500, headers:{...CORS,...NOCACHE} });
          }
          const a = await aReq.json();
          // Append assistant message
          messages.push({ role:'assistant', content: a.content });

          if (a.stop_reason === 'tool_use') {
            const toolUses = a.content.filter(c => c.type === 'tool_use');
            const results = [];
            for (const tu of toolUses) {
              const out = await execTool(tu.name, tu.input);
              toolResults.push({ tool: tu.name, input: tu.input, output: out });
              results.push({ type:'tool_result', tool_use_id: tu.id, content: JSON.stringify(out).substring(0, 50000) });
            }
            messages.push({ role:'user', content: results });
            continue;
          }

          // end
          for (const c of a.content) if (c.type === 'text') finalText += c.text;
          break;
        }

        return Response.json({
          ok:true,
          reply: finalText || '(no text response)',
          tool_calls: toolResults,
          iterations,
        }, { headers:{...CORS,...NOCACHE} });

      } catch (e) {
        return Response.json({ error:'Agent failure', detail: String(e).substring(0,500) }, { status:500, headers:{...CORS,...NOCACHE} });
      }
    }

    return new Response(HTML,{headers:{'Content-Type':'text/html; charset=utf-8',...NOCACHE,...CORS}});
  },
};
