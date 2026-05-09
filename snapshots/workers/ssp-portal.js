--8036075cefc8e3f8fcc6d8c95d9d47afd2824671fa7ba1cc652ba5b96804
Content-Disposition: form-data; name="ssp-portal-clean.js"

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ssp-portal-clean.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __defProp22 = Object.defineProperty;
var __name22 = /* @__PURE__ */ __name2((target, value) => __defProp22(target, "name", { value, configurable: true }), "__name");
var __defProp222 = Object.defineProperty;
var __name222 = /* @__PURE__ */ __name22((target, value) => __defProp222(target, "name", { value, configurable: true }), "__name");
var ADMIN_SEC_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains"
};
async function hashPassword(password) {
  const enc = new TextEncoder();
  const keyMat = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 1e3, hash: "SHA-256" }, keyMat, 256);
  const toHex = /* @__PURE__ */ __name222((b) => Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join(""), "toHex");
  return `pbkdf2:${toHex(salt)}:${toHex(new Uint8Array(bits))}`;
}
__name(hashPassword, "hashPassword");
__name2(hashPassword, "hashPassword");
__name22(hashPassword, "hashPassword");
__name222(hashPassword, "hashPassword");
async function verifyPassword(password, stored) {
  try {
    const [, saltHex, hashHex] = stored.split(":");
    const salt = new Uint8Array(saltHex.match(/.{2}/g).map((b) => parseInt(b, 16)));
    const enc = new TextEncoder();
    const keyMat = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 1e3, hash: "SHA-256" }, keyMat, 256);
    const computed = Array.from(new Uint8Array(bits)).map((x) => x.toString(16).padStart(2, "0")).join("");
    return computed === hashHex;
  } catch {
    return false;
  }
}
__name(verifyPassword, "verifyPassword");
__name2(verifyPassword, "verifyPassword");
__name22(verifyPassword, "verifyPassword");
__name222(verifyPassword, "verifyPassword");
async function createSession(db, schoolId) {
  const token = crypto.randomUUID() + "-" + crypto.randomUUID();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString();
  await db.prepare("INSERT INTO sessions (token, school_id, expires_at) VALUES (?, ?, ?)").bind(token, schoolId, expires).run();
  await db.prepare("DELETE FROM sessions WHERE expires_at < datetime('now')").run();
  return token;
}
__name(createSession, "createSession");
__name2(createSession, "createSession");
__name22(createSession, "createSession");
__name222(createSession, "createSession");
async function getSession(db, req) {
  const cookie = req.headers.get("Cookie") || "";
  const match = cookie.match(/ssp_session=([^;]+)/);
  if (!match) return null;
  const token = match[1];
  const row = await db.prepare("SELECT school_id FROM sessions WHERE token = ? AND expires_at > datetime('now')").bind(token).first();
  if (!row) return null;
  return { token, schoolId: row.school_id };
}
__name(getSession, "getSession");
__name2(getSession, "getSession");
__name22(getSession, "getSession");
__name222(getSession, "getSession");
async function getSchool(db, schoolId) {
  return db.prepare("SELECT * FROM schools WHERE id = ?").bind(schoolId).first();
}
__name(getSchool, "getSchool");
__name2(getSchool, "getSchool");
__name22(getSchool, "getSchool");
__name222(getSchool, "getSchool");
async function sendSetupEmail(resendKey, school, setupToken) {
  const setupUrl = `https://schoolsportportal.com.au/setup?token=${setupToken}`;
  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1e293b;max-width:600px;margin:0 auto;padding:24px">
<div style="text-align:center;padding:24px 0 32px">
  <div style="font-size:2rem">\u{1F3EB}</div>
  <h1 style="font-size:1.4rem;color:#1e3a8a;margin:8px 0 4px">School Sport Portal</h1>
</div>
<p>Hi ${school.name},</p>
<p>Your School Sport Portal account is ready. Click the button below to set your password and log in for the first time.</p>
<div style="text-align:center;margin:32px 0">
  <a href="${setupUrl}" style="background:#1d4ed8;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:1rem">Set Up My Account \u2192</a>
</div>
<p style="color:#64748b;font-size:.85rem">This link expires in 48 hours. If you didn't request this, ignore it.</p>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0 16px">
<p style="font-size:.75rem;color:#94a3b8;text-align:center">School Sport Portal \xB7 Luck Dragon Pty Ltd ABN 64 697 434 898</p>
</body></html>`;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Paddy at School Sport Portal <noreply@luckdragon.io>",
      reply_to: "info@schoolsportportal.com.au",
      to: [school.email],
      subject: "Set up your School Sport Portal account",
      html
    })
  });
}
__name(sendSetupEmail, "sendSetupEmail");
__name2(sendSetupEmail, "sendSetupEmail");
__name22(sendSetupEmail, "sendSetupEmail");
__name222(sendSetupEmail, "sendSetupEmail");
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_"));
  return lines.slice(1).map((line) => {
    const vals = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const row = {};
    headers.forEach((h, i) => row[h] = vals[i] || "");
    return row;
  }).filter((r) => r[headers[0]]);
}
__name(parseCSV, "parseCSV");
__name2(parseCSV, "parseCSV");
__name22(parseCSV, "parseCSV");
__name222(parseCSV, "parseCSV");
function normaliseStudent(row, schoolId) {
  const get = /* @__PURE__ */ __name222((...keys) => {
    for (const k of keys) if (row[k]) return row[k];
    return "";
  }, "get");
  const firstName = get("first_name", "firstname", "first", "given_name", "givenname");
  const lastInitial = get("last_initial", "lastinitial", "surname_initial", "last_name_initial").slice(0, 1).toUpperCase();
  const yearLevel = get("year_level", "yearlevel", "year", "grade").replace(/^[Yy]ear\s*/, "").trim();
  const house = get("house", "house_name", "team");
  const dob = get("dob", "date_of_birth", "dateofbirth", "birthdate");
  const gender = get("gender", "sex").slice(0, 1).toUpperCase();
  if (!firstName) return null;
  return { id: crypto.randomUUID(), school_id: schoolId, first_name: firstName, last_name_initial: lastInitial, year_level: yearLevel, house, dob, gender: ["M", "F", "X"].includes(gender) ? gender : "" };
}
__name(normaliseStudent, "normaliseStudent");
__name2(normaliseStudent, "normaliseStudent");
__name22(normaliseStudent, "normaliseStudent");
__name222(normaliseStudent, "normaliseStudent");
var STYLE = `
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#1e293b;min-height:100vh}
.topbar{background:#0d1b3e;color:#fff;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between}
.topbar h1{font-size:1rem;font-weight:700;color:#fcd34d}
.topbar nav a{color:#94a3b8;text-decoration:none;font-size:.85rem;margin-left:20px}
.topbar nav a:hover,.topbar nav a.active{color:#fff}
.container{max-width:1000px;margin:0 auto;padding:32px 16px}
.card{background:#fff;border-radius:12px;border:1px solid #e2e8f0;padding:24px;margin-bottom:20px}
.card h2{font-size:1.1rem;font-weight:700;color:#0d1b3e;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #f1f5f9}
.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:20px}
.stat{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:16px;text-align:center}
.stat .num{font-size:2rem;font-weight:800;color:#1d4ed8}
.stat .lbl{font-size:.8rem;color:#64748b;margin-top:4px}
btn,button,.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;border:none;text-decoration:none;transition:opacity .15s}
.btn-primary{background:#1d4ed8;color:#fff}.btn-primary:hover{opacity:.9}
.btn-secondary{background:#f1f5f9;color:#374151;border:1px solid #e2e8f0}.btn-secondary:hover{background:#e2e8f0}
.btn-danger{background:#ef4444;color:#fff}.btn-danger:hover{opacity:.9}
.btn-success{background:#16a34a;color:#fff}.btn-success:hover{opacity:.9}
input,select{width:100%;padding:10px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:.95rem;color:#1e293b;background:#fff}
input:focus,select:focus{outline:2px solid #1d4ed8;border-color:transparent}
label{display:block;font-size:.85rem;font-weight:600;color:#374151;margin-bottom:6px}
.form-group{margin-bottom:16px}
.alert{padding:12px 16px;border-radius:8px;font-size:.9rem;margin-bottom:16px}
.alert-error{background:#fef2f2;border:1px solid #fecaca;color:#dc2626}
.alert-success{background:#f0fdf4;border:1px solid #bbf7d0;color:#16a34a}
.alert-info{background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8}
table{width:100%;border-collapse:collapse;font-size:.9rem}
th{background:#f8fafc;text-align:left;padding:10px 12px;font-weight:600;color:#475569;border-bottom:2px solid #e2e8f0}
td{padding:10px 12px;border-bottom:1px solid #f1f5f9;color:#374151}
tr:hover td{background:#f8fafc}
.badge{display:inline-block;padding:2px 10px;border-radius:999px;font-size:.75rem;font-weight:600}
.badge-m{background:#dbeafe;color:#1d4ed8}
.badge-f{background:#fce7f3;color:#be185d}
.badge-x{background:#f3e8ff;color:#7c3aed}
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0d1b3e,#1a3a6e)}
.login-box{background:#fff;border-radius:16px;padding:40px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.login-logo{text-align:center;margin-bottom:28px}
.login-logo h1{font-size:1.3rem;color:#0d1b3e;margin-top:8px}
.login-logo .emoji{font-size:2.5rem}
</style>`;
function loginPage(error = "") {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Login \u2014 School Sport Portal</title>${STYLE}</head>
<body>
<div class="login-wrap">
  <div class="login-box">
    <div class="login-logo"><div class="emoji">\u{1F3EB}</div><h1>School Sport Portal</h1><p style="color:#64748b;font-size:.85rem;margin-top:4px">School admin login</p></div>
    ${error ? `<div class="alert alert-error">${error}</div>` : ""}
    <form method="POST" action="/login">
      <div class="form-group"><label>School email address</label><input type="email" name="email" required autofocus placeholder="admin@yourschool.edu.au"></div>
      <div class="form-group"><label>Password</label><input type="password" name="password" required placeholder="Your password"></div>
      <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:12px">Log In \u2192</button>
    </form>
    <p style="text-align:center;margin-top:20px;font-size:.8rem;color:#94a3b8">Forgot your password? Email <a href="mailto:info@schoolsportportal.com.au" style="color:#1d4ed8">info@schoolsportportal.com.au</a></p>
  </div>
</div>
</body></html>`;
}
__name(loginPage, "loginPage");
__name2(loginPage, "loginPage");
__name22(loginPage, "loginPage");
__name222(loginPage, "loginPage");
function accountPickerPage(email, password, accounts, error = "") {
  const cards = accounts.map((s) => {
    const icon = s.account_type === "district" ? "\u{1F3EB}" : s.account_type === "division" ? "\u{1F3E2}" : s.account_type === "region" ? "\u{1F5FA}\uFE0F" : "\u{1F3EB}";
    const typLabel = s.account_type === "district" ? "District" : s.account_type === "division" ? "Division" : s.account_type === "region" ? "Region" : "School";
    return `<button type="submit" name="school_id" value="${s.id}" class="btn btn-primary" style="width:100%;justify-content:flex-start;gap:12px;padding:14px 18px;margin-bottom:10px;font-size:1rem">
      <span style="font-size:1.4rem">${icon}</span>
      <span>
        <strong style="display:block">${s.name}</strong>
        <span style="font-size:0.8rem;opacity:0.8">${typLabel}</span>
      </span>
    </button>`;
  }).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Choose Account \u2014 School Sport Portal</title>${STYLE}</head>
<body>
<div class="login-wrap">
  <div class="login-box">
    <div class="login-logo"><div class="emoji">\u{1F464}</div><h1>Choose account</h1><p style="color:#64748b;font-size:.85rem;margin-top:4px">Multiple accounts found for ${email}</p></div>
    ${error ? `<div class="alert alert-error">${error}</div>` : ""}
    <form method="POST" action="/login">
      <input type="hidden" name="email" value="${email}">
      <input type="hidden" name="password" value="${password}">
      ${cards}
    </form>
    <p style="text-align:center;margin-top:16px"><a href="/login" style="color:#94a3b8;font-size:.8rem">\u2190 Back to login</a></p>
  </div>
</div>
</body></html>`;
}
__name(accountPickerPage, "accountPickerPage");
__name2(accountPickerPage, "accountPickerPage");
__name22(accountPickerPage, "accountPickerPage");
__name222(accountPickerPage, "accountPickerPage");
function setupPage(token, error = "") {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Set Up Account \u2014 School Sport Portal</title>${STYLE}</head>
<body>
<div class="login-wrap">
  <div class="login-box">
    <div class="login-logo"><div class="emoji">\u{1F511}</div><h1>Set your password</h1><p style="color:#64748b;font-size:.85rem;margin-top:4px">School Sport Portal account setup</p></div>
    ${error ? `<div class="alert alert-error">${error}</div>` : ""}
    <div class="alert alert-info" style="margin-bottom:20px">Choose a strong password \u2014 you'll use this every time you log in to manage your school's student data.</div>
    <form method="POST" action="/setup">
      <input type="hidden" name="token" value="${token}">
      <div class="form-group"><label>New password (8+ characters)</label><input type="password" name="password" required minlength="8" placeholder="Choose a strong password"></div>
      <div class="form-group"><label>Confirm password</label><input type="password" name="password2" required minlength="8" placeholder="Repeat your password"></div>
      <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:12px">Set Password & Log In \u2192</button>
    </form>
  </div>
</div>
</body></html>`;
}
__name(setupPage, "setupPage");
__name2(setupPage, "setupPage");
__name22(setupPage, "setupPage");
__name222(setupPage, "setupPage");
function topbar(school, activePage = "") {
  const nav = [
    ["/", "Dashboard"],
    ["/students", "Students"],
    ["/carnivals", "Carnivals"],
    ["/export", "Export"]
  ].map(([path, label]) => `<a href="/admin${path}" class="${activePage === label ? "active" : ""}">${label}</a>`).join("");
  return `<div class="topbar">
    <h1>\u{1F3EB} ${school.name}</h1>
    <nav>${nav}<a href="/logout" style="color:#ef4444;margin-left:24px">Log out</a></nav>
  </div>`;
}
__name(topbar, "topbar");
__name2(topbar, "topbar");
__name22(topbar, "topbar");
__name222(topbar, "topbar");
function dashboardPage(school, stats) {
  const portalUrl = `https://schoolsportportal.com.au/${school.id}`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dashboard \u2014 ${school.name}</title>${STYLE}</head>
<body>
${topbar(school, "Dashboard")}
<div class="container">
  <div class="stat-grid">
    <div class="stat"><div class="num">${stats.students}</div><div class="lbl">Students</div></div>
    <div class="stat"><div class="num">${stats.carnivals}</div><div class="lbl">Carnivals</div></div>
    <div class="stat"><div class="num">${stats.qualifiers}</div><div class="lbl">District Qualifiers</div></div>
  </div>

  <div class="card">
    <h2>Your School Portal</h2>
    <p style="color:#64748b;margin-bottom:16px">Your live portal is published at:</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
      <a href="${portalUrl}" target="_blank" style="color:#1d4ed8;font-weight:600">${portalUrl}</a>
      <a href="${portalUrl}" target="_blank" class="btn btn-secondary" style="white-space:nowrap;font-size:.8rem">View \u2192</a>
    </div>
  </div>

  <div class="card">
    <h2>Quick Actions</h2>
    <div style="display:flex;flex-wrap:wrap;gap:10px">
      <a href="/admin/students" class="btn btn-primary">\u{1F4CB} Manage Students</a>
      <a href="/admin/students/upload" class="btn btn-success">\u2B06\uFE0F Upload CSV</a>
      <a href="/admin/export" class="btn btn-secondary">\u{1F4E5} Export District Entries</a>
      <a href="/admin/carnivals" class="btn btn-secondary">\u{1F3C3} Carnivals</a>
    </div>
  </div>

  <div class="card">
    <h2>Getting Started</h2>
    <ol style="padding-left:20px;line-height:2.2;color:#475569">
      <li>Upload your <strong>student roster</strong> as a CSV (Students \u2192 Upload CSV)</li>
      <li>Create a <strong>carnival</strong> (e.g. Cross Country 2026) and enter results</li>
      <li>Mark district <strong>qualifiers</strong> \u2014 they'll appear on the Export page</li>
      <li>Share your <strong>portal link</strong> above with parents and district</li>
    </ol>
  </div>
</div>
</body></html>`;
}
__name(dashboardPage, "dashboardPage");
__name2(dashboardPage, "dashboardPage");
__name22(dashboardPage, "dashboardPage");
__name222(dashboardPage, "dashboardPage");
function studentsPage(school, students, msg = "") {
  const rows = students.map((s) => `<tr>
    <td>${s.first_name} ${s.last_name_initial ? s.last_name_initial + "." : ""}</td>
    <td>${s.year_level || "\u2014"}</td>
    <td>${s.house || "\u2014"}</td>
    <td>${s.gender ? `<span class="badge badge-${s.gender.toLowerCase()}">${s.gender}</span>` : "\u2014"}</td>
    <td>${s.dob || "\u2014"}</td>
  </tr>`).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Students \u2014 ${school.name}</title>${STYLE}</head>
<body>
${topbar(school, "Students")}
<div class="container">
  ${msg ? `<div class="alert alert-success">${msg}</div>` : ""}
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
    <h2 style="font-size:1.1rem;font-weight:700;color:#0d1b3e">${students.length} Students</h2>
    <div style="display:flex;gap:8px">
      <a href="/admin/students/download" class="btn btn-secondary">\u2B07\uFE0F Download CSV</a>
      <a href="/admin/students/upload" class="btn btn-primary">\u2B06\uFE0F Upload CSV</a>
    </div>
  </div>
  ${students.length === 0 ? `
    <div class="card" style="text-align:center;padding:48px">
      <div style="font-size:3rem;margin-bottom:12px">\u{1F4CB}</div>
      <h3 style="margin-bottom:8px;color:#0d1b3e">No students yet</h3>
      <p style="color:#64748b;margin-bottom:20px">Upload your student roster as a CSV to get started.</p>
      <a href="/admin/students/upload" class="btn btn-primary">Upload Student CSV</a>
    </div>` : `
  <div class="card" style="padding:0;overflow:hidden">
    <table>
      <thead><tr><th>Name</th><th>Year</th><th>House</th><th>Gender</th><th>DOB</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`}
</div>
</body></html>`;
}
__name(studentsPage, "studentsPage");
__name2(studentsPage, "studentsPage");
__name22(studentsPage, "studentsPage");
__name222(studentsPage, "studentsPage");
function uploadPage(school, error = "") {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Upload Students \u2014 ${school.name}</title>${STYLE}</head>
<body>
${topbar(school, "Students")}
<div class="container">
  <div class="card">
    <h2>Upload Student CSV</h2>
    ${error ? `<div class="alert alert-error">${error}</div>` : ""}
    <div class="alert alert-info" style="margin-bottom:20px">
      <strong>CSV format:</strong> Your file should have columns for <code>first_name</code>, <code>last_name_initial</code>, <code>year_level</code>, <code>house</code>, <code>gender</code> (M/F/X), <code>dob</code> (YYYY-MM-DD).<br><br>
      Uploading a new CSV will <strong>replace</strong> your existing student list. Download your current list first if you want to keep it.
    </div>
    <form method="POST" action="/admin/students/upload" enctype="multipart/form-data">
      <div class="form-group">
        <label>Choose CSV file</label>
        <input type="file" name="csv" accept=".csv,text/csv" required style="padding:8px">
      </div>
      <div style="display:flex;gap:10px">
        <button type="submit" class="btn btn-primary">\u2B06\uFE0F Upload & Replace Students</button>
        <a href="/admin/students" class="btn btn-secondary">Cancel</a>
      </div>
    </form>
  </div>

  <div class="card">
    <h2>Example CSV format</h2>
    <pre style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:.82rem;overflow-x:auto">first_name,last_name_initial,year_level,house,gender,dob
Emma,J,5,Wattle,F,2014-03-12
Liam,S,4,Banksia,M,2015-07-08
Riley,K,6,Grevillea,X,2013-11-22
Noah,P,3,Wattle,M,2016-01-05</pre>
  </div>
</div>
</body></html>`;
}
__name(uploadPage, "uploadPage");
__name2(uploadPage, "uploadPage");
__name22(uploadPage, "uploadPage");
__name222(uploadPage, "uploadPage");
function carnivalsPage(school, carnivals, msg = "") {
  const typeLabel = { cross_country: "Cross Country", swimming: "Swimming", athletics: "Athletics", other: "Other" };
  const statusBadge = { upcoming: "#dbeafe:#1d4ed8", active: "#dcfce7:#16a34a", complete: "#f1f5f9:#64748b" };
  const rows = carnivals.map((c) => {
    const [bg, col] = (statusBadge[c.status] || "#f1f5f9:#64748b").split(":");
    return `<tr>
      <td><strong>${c.name}</strong></td>
      <td>${typeLabel[c.type] || c.type || "\u2014"}</td>
      <td>${c.date || "\u2014"}</td>
      <td><span class="badge" style="background:${bg};color:${col}">${c.status}</span></td>
      <td><a href="/admin/carnivals/${c.id}/results" class="btn btn-secondary" style="font-size:.8rem;padding:5px 10px">Results</a></td>
    </tr>`;
  }).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Carnivals \u2014 ${school.name}</title>${STYLE}</head>
<body>
${topbar(school, "Carnivals")}
<div class="container">
  ${msg ? `<div class="alert alert-success">${msg}</div>` : ""}
  <div class="card">
    <h2>Create New Carnival</h2>
    <form method="POST" action="/admin/carnivals">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:12px;align-items:end">
        <div class="form-group" style="margin:0"><label>Carnival Name</label><input type="text" name="name" required placeholder="Cross Country 2026"></div>
        <div class="form-group" style="margin:0"><label>Type</label>
          <select name="type"><option value="cross_country">Cross Country</option><option value="swimming">Swimming</option><option value="athletics">Athletics</option><option value="other">Other</option></select>
        </div>
        <div class="form-group" style="margin:0"><label>Date</label><input type="date" name="date"></div>
        <button type="submit" class="btn btn-primary">Add</button>
      </div>
    </form>
  </div>

  ${carnivals.length > 0 ? `
  <div class="card" style="padding:0;overflow:hidden">
    <table>
      <thead><tr><th>Name</th><th>Type</th><th>Date</th><th>Status</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>` : `<div class="card" style="text-align:center;padding:40px"><p style="color:#64748b">No carnivals yet \u2014 create one above.</p></div>`}
</div>
</body></html>`;
}
__name(carnivalsPage, "carnivalsPage");
__name2(carnivalsPage, "carnivalsPage");
__name22(carnivalsPage, "carnivalsPage");
__name222(carnivalsPage, "carnivalsPage");
function exportPage(school, qualifiers) {
  const rows = qualifiers.map((q) => `<tr>
    <td>${q.first_name} ${q.last_name_initial ? q.last_name_initial + "." : ""}</td>
    <td>${q.year_level || "\u2014"}</td>
    <td>${q.gender || "\u2014"}</td>
    <td>${q.dob || "\u2014"}</td>
    <td>${q.event || "\u2014"}</td>
    <td>${q.carnival_name}</td>
    <td>${q.place || "\u2014"}</td>
  </tr>`).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Export \u2014 ${school.name}</title>${STYLE}</head>
<body>
${topbar(school, "Export")}
<div class="container">
  <div class="card">
    <h2>District Entries Export</h2>
    <p style="color:#64748b;margin-bottom:16px">All students marked as district qualifiers across all carnivals.</p>
    <div style="display:flex;gap:10px;margin-bottom:20px">
      <a href="/admin/export/csv" class="btn btn-primary">\u2B07\uFE0F Download CSV</a>
      <a href="/admin/export/carnivaltiming" class="btn btn-secondary">\u{1F4E4} Export to Carnival Timing</a>
    </div>
    ${qualifiers.length === 0 ? `
      <div style="text-align:center;padding:32px;color:#64748b">
        <p>No qualifiers yet. Enter carnival results and mark students as qualified.</p>
      </div>` : `
    <div style="overflow-x:auto">
    <table>
      <thead><tr><th>Name</th><th>Year</th><th>Gender</th><th>DOB</th><th>Event</th><th>Carnival</th><th>Place</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    </div>`}
  </div>
</div>
</body></html>`;
}
__name(exportPage, "exportPage");
__name2(exportPage, "exportPage");
__name22(exportPage, "exportPage");
__name222(exportPage, "exportPage");
function orgTopbar(school, orgType, activePage) {
  const typeLabels = { district: "\u{1F3EB} District", division: "\u{1F3DF}\uFE0F Division", region: "\u{1F5FA}\uFE0F Region", state: "\u{1F1E6}\u{1F1FA} State" };
  const typeLabel = typeLabels[orgType] || "Admin";
  const nav = `<a href="/admin" style="color:${activePage === "Dashboard" ? "#fff" : "#94a3b8"}">Dashboard</a>
    <a href="https://carnivaltiming.com" target="_blank" style="color:#fcd34d;margin-left:20px">\u{1F3C1} Carnival Timing \u2197</a>
    <a href="/logout" style="color:#ef4444;margin-left:24px">Log out</a>`;
  return `<div class="topbar" style="background:#1e293b;padding:16px 24px;display:flex;justify-content:space-between;align-items:center"><h1 style="color:#fff;margin:0;font-size:1.1rem">${typeLabel}: ${school.name}</h1><nav style="display:flex;align-items:center;gap:8px">${nav}</nav></div>`;
}
__name(orgTopbar, "orgTopbar");
__name2(orgTopbar, "orgTopbar");
function districtDashboardPage(school, distSchools) {
  const allActive = distSchools.length > 0 && distSchools.every((s) => s.active);
  const schoolRows = distSchools.length === 0 ? '<tr><td colspan="4" style="color:#64748b;padding:16px">No schools linked to this district yet.</td></tr>' : distSchools.map((s) => `<tr>
        <td style="padding:12px 16px;border-bottom:1px solid #334155">${s.name}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #334155">${s.subscription_type || "free"}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #334155">${s.student_count || 0}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #334155"><span style="background:${s.active ? "#16a34a" : "#dc2626"};color:#fff;padding:2px 8px;border-radius:9999px;font-size:0.75rem">${s.active ? "Active" : "Inactive"}</span></td>
      </tr>`).join("");
  const featureBanner = allActive ? `<div style="background:#166534;color:#bbf7d0;padding:12px 16px;border-radius:8px;margin-bottom:20px">\u2705 All schools active \u2014 district features unlocked</div>` : `<div style="background:#7c2d12;color:#fed7aa;padding:12px 16px;border-radius:8px;margin-bottom:20px">\u26A0\uFE0F District features unlock when all schools have active subscriptions (${distSchools.filter((s) => s.active).length}/${distSchools.length} active)</div>`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>District Dashboard \u2014 ${school.name}</title>
  <style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0}
  .content{padding:24px;max-width:960px;margin:0 auto}
  table{width:100%;border-collapse:collapse;background:#1e293b;border-radius:8px;overflow:hidden}
  th{background:#334155;padding:12px 16px;text-align:left;font-size:0.8rem;text-transform:uppercase;color:#94a3b8}
  a{color:#60a5fa;text-decoration:none}</style></head><body>
  ${orgTopbar(school, "district", "Dashboard")}
  <div class="content">
    <h2 style="color:#fff;margin:0 0 16px">District Dashboard</h2>
    ${featureBanner}
    <table><thead><tr><th>School</th><th>Plan</th><th>Students</th><th>Status</th></tr></thead>
    <tbody>${schoolRows}</tbody></table>
    <div style="margin-top:24px;padding:16px;background:#1e293b;border-radius:8px">
      <h3 style="margin:0 0 8px;color:#fff">\u{1F3C1} Carnival Timing</h3>
      <p style="margin:0;color:#94a3b8">Manage your carnival timing across all district schools at <a href="https://carnivaltiming.com" target="_blank">carnivaltiming.com</a></p>
    </div>
  </div></body></html>`;
}
__name(districtDashboardPage, "districtDashboardPage");
__name2(districtDashboardPage, "districtDashboardPage");
function divisionDashboardPage(school, districts) {
  const districtRows = districts.length === 0 ? '<tr><td colspan="3" style="color:#64748b;padding:16px">No districts found in this division.</td></tr>' : districts.map((d) => `<tr>
        <td style="padding:12px 16px;border-bottom:1px solid #334155">${d.name}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #334155">${d.school_count || 0} schools active</td>
        <td style="padding:12px 16px;border-bottom:1px solid #334155"><span style="background:${d.active ? "#16a34a" : "#475569"};color:#fff;padding:2px 8px;border-radius:9999px;font-size:0.75rem">${d.active ? "Active" : "Pending"}</span></td>
      </tr>`).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Division Dashboard \u2014 ${school.name}</title>
  <style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0}
  .content{padding:24px;max-width:960px;margin:0 auto}
  table{width:100%;border-collapse:collapse;background:#1e293b;border-radius:8px;overflow:hidden}
  th{background:#334155;padding:12px 16px;text-align:left;font-size:0.8rem;text-transform:uppercase;color:#94a3b8}
  a{color:#60a5fa;text-decoration:none}</style></head><body>
  ${orgTopbar(school, "division", "Dashboard")}
  <div class="content">
    <h2 style="color:#fff;margin:0 0 16px">Division Dashboard</h2>
    <table><thead><tr><th>District</th><th>Schools</th><th>Status</th></tr></thead>
    <tbody>${districtRows}</tbody></table>
    <div style="margin-top:24px;padding:16px;background:#1e293b;border-radius:8px">
      <h3 style="margin:0 0 8px;color:#fff">\u{1F3C1} Carnival Timing</h3>
      <p style="margin:0;color:#94a3b8">Division-wide carnival management at <a href="https://carnivaltiming.com" target="_blank">carnivaltiming.com</a></p>
    </div>
  </div></body></html>`;
}
__name(divisionDashboardPage, "divisionDashboardPage");
__name2(divisionDashboardPage, "divisionDashboardPage");
function regionDashboardPage(school, divisions) {
  const divisionRows = divisions.length === 0 ? '<tr><td colspan="3" style="color:#64748b;padding:16px">No divisions found in this region.</td></tr>' : divisions.map((d) => `<tr>
        <td style="padding:12px 16px;border-bottom:1px solid #334155">${d.name}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #334155">${d.div_count || 0} divisions</td>
        <td style="padding:12px 16px;border-bottom:1px solid #334155"><span style="background:${d.active ? "#16a34a" : "#475569"};color:#fff;padding:2px 8px;border-radius:9999px;font-size:0.75rem">${d.active ? "Active" : "Pending"}</span></td>
      </tr>`).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Region Dashboard \u2014 ${school.name}</title>
  <style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0}
  .content{padding:24px;max-width:960px;margin:0 auto}
  table{width:100%;border-collapse:collapse;background:#1e293b;border-radius:8px;overflow:hidden}
  th{background:#334155;padding:12px 16px;text-align:left;font-size:0.8rem;text-transform:uppercase;color:#94a3b8}
  a{color:#60a5fa;text-decoration:none}</style></head><body>
  ${orgTopbar(school, "region", "Dashboard")}
  <div class="content">
    <h2 style="color:#fff;margin:0 0 16px">Region Dashboard</h2>
    <table><thead><tr><th>Division</th><th>Structure</th><th>Status</th></tr></thead>
    <tbody>${divisionRows}</tbody></table>
    <div style="margin-top:24px;padding:16px;background:#1e293b;border-radius:8px">
      <h3 style="margin:0 0 8px;color:#fff">\u{1F3C1} Carnival Timing</h3>
      <p style="margin:0;color:#94a3b8">Region-wide carnival management at <a href="https://carnivaltiming.com" target="_blank">carnivaltiming.com</a></p>
    </div>
  </div></body></html>`;
}
__name(regionDashboardPage, "regionDashboardPage");
__name2(regionDashboardPage, "regionDashboardPage");
async function _adminFetch(request, env) {
  const url = new URL(request.url);
  let path = url.pathname;
  const method = request.method;
  const respond = /* @__PURE__ */ __name222((body, status = 200, extra = {}) => new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", ...ADMIN_SEC_HEADERS, ...extra }
  }), "respond");
  const redirect = /* @__PURE__ */ __name222((loc) => new Response(null, { status: 302, headers: { Location: loc, ...ADMIN_SEC_HEADERS } }), "redirect");
  const setCookieRedirect = /* @__PURE__ */ __name222((loc, token) => new Response(null, {
    status: 302,
    headers: {
      Location: loc,
      "Set-Cookie": `ssp_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 3600}`,
      ...ADMIN_SEC_HEADERS
    }
  }), "setCookieRedirect");
  const clearCookieRedirect = /* @__PURE__ */ __name222((loc) => new Response(null, {
    status: 302,
    headers: {
      Location: loc,
      "Set-Cookie": "ssp_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
      ...ADMIN_SEC_HEADERS
    }
  }), "clearCookieRedirect");
  if (path === "/login") {
    if (method === "GET") return respond(loginPage());
    if (method === "POST") {
      const form = await request.formData();
      const email = (form.get("email") || "").toLowerCase().trim();
      const password = form.get("password") || "";
      if (!email || !password) return respond(loginPage("Please enter your email and password."));
      const rateLimitOk = await checkLoginRateLimit(env, email);
      if (!rateLimitOk) return respond(loginPage("Too many login attempts. Please try again in an hour."));
      const schoolId = (form.get("school_id") || "").trim();
      const { results: allSchools } = await env.DB.prepare("SELECT * FROM schools WHERE email = ? AND active = 1").bind(email).all();
      if (!allSchools || allSchools.length === 0) return respond(loginPage("Invalid email or password."));
      let validAccounts;
      if (schoolId) {
        const target = allSchools.find((s) => s.id === schoolId);
        if (!target || !target.password_hash) return respond(loginPage("Invalid email or password."));
        const ok = await verifyPassword(password, target.password_hash);
        if (!ok) return respond(loginPage("Invalid email or password."));
        validAccounts = [target];
      } else {
        validAccounts = [];
        for (const s of allSchools) {
          if (s.password_hash && await verifyPassword(password, s.password_hash)) validAccounts.push(s);
        }
        if (validAccounts.length === 0) return respond(loginPage("Invalid email or password."));
      }
      if (validAccounts.length === 1) {
        const token = await createSession(env.DB, validAccounts[0].id);
        return setCookieRedirect("/" + validAccounts[0].id + "/admin", token);
      }
      return respond(accountPickerPage(email, password, validAccounts));
    }
  }
  if (path === "/logout") {
    const sess = await getSession(env.DB, request);
    if (sess) await env.DB.prepare("DELETE FROM sessions WHERE token = ?").bind(sess.token).run();
    return clearCookieRedirect("/login");
  }
  if (path === "/setup") {
    const token = url.searchParams.get("token") || "";
    if (method === "GET") {
      if (!token) return redirect("/login");
      const school = await env.DB.prepare("SELECT id FROM schools WHERE setup_token = ? AND setup_token_expires > datetime('now')").bind(token).first();
      if (!school) return respond(setupPage("", "This setup link has expired or is invalid. Email info@schoolsportportal.com.au for a new one."));
      return respond(setupPage(token));
    }
    if (method === "POST") {
      const form = await request.formData();
      const tok = form.get("token") || "";
      const pw = form.get("password") || "";
      const pw2 = form.get("password2") || "";
      if (pw.length < 8) return respond(setupPage(tok, "Password must be at least 8 characters."));
      if (pw !== pw2) return respond(setupPage(tok, "Passwords do not match."));
      const school = await env.DB.prepare("SELECT * FROM schools WHERE setup_token = ? AND setup_token_expires > datetime('now')").bind(tok).first();
      if (!school) return respond(setupPage(tok, "This setup link has expired. Email info@schoolsportportal.com.au for a new one."));
      const hash = await hashPassword(pw);
      await env.DB.prepare("UPDATE schools SET password_hash = ?, setup_token = NULL, setup_token_expires = NULL, updated_at = datetime('now') WHERE id = ?").bind(hash, school.id).run();
      const sessionToken = await createSession(env.DB, school.id);
      return setCookieRedirect("/" + school.id + "/admin", sessionToken);
    }
  }
  if (path === "/admin/api/provision" && method === "POST") {
    const pin = request.headers.get("X-Pin");
    if (pin !== env.AGENT_PIN) return new Response(JSON.stringify({ ok: false, error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
    let body2;
    try {
      body2 = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Bad JSON" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const { id: sid, name: sname, email: semail } = body2;
    if (!sid || !sname || !semail) return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
    const setupToken2 = crypto.randomUUID();
    const setupExpires2 = new Date(Date.now() + 48 * 60 * 60 * 1e3).toISOString();
    await env.DB.prepare("INSERT OR REPLACE INTO schools (id, name, email, setup_token, setup_token_expires, active) VALUES (?, ?, ?, ?, ?, 1)").bind(sid, sname, semail, setupToken2, setupExpires2).run();
    if (env.RESEND_API_KEY) {
      const sc = { id: sid, name: sname, email: semail };
      await sendSetupEmail(env.RESEND_API_KEY, sc, setupToken2);
    }
    const setupUrl2 = `https://schoolsportportal.com.au/setup?token=${setupToken2}`;
    return new Response(JSON.stringify({ ok: true, setupToken: setupToken2, setupUrl: setupUrl2 }), { headers: { "Content-Type": "application/json" } });
  }
  if (path.startsWith("/admin/api/school/") && method === "GET") {
    const pin = request.headers.get("X-Pin");
    if (pin !== env.AGENT_PIN) return new Response("{}", { status: 403 });
    const schoolId2 = path.split("/").pop();
    const schoolData2 = await env.DB.prepare("SELECT id, name, suburb, state, student_count FROM schools WHERE id = ? AND active = 1").bind(schoolId2).first();
    if (!schoolData2) return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
    const { results: stu2 } = await env.DB.prepare("SELECT first_name, last_name_initial, year_level, house, gender FROM students WHERE school_id = ? AND active = 1 ORDER BY year_level, first_name").bind(schoolId2).all();
    return new Response(JSON.stringify({ school: schoolData2, students: stu2 }), { headers: { "Content-Type": "application/json" } });
  }
  if (path === "/stripe-webhook" && method === "POST") {
    const rawBody = await request.text();
    const sig = request.headers.get("Stripe-Signature") || "";
    const valid = await verifyStripeSignature(rawBody, sig, env.STRIPE_WEBHOOK_SECRET || "");
    if (!valid) return new Response("Unauthorized", { status: 401 });
    let stripeEvent;
    try {
      stripeEvent = JSON.parse(rawBody);
    } catch (e) {
      return new Response("Bad Request", { status: 400 });
    }
    if (stripeEvent.type === "checkout.session.completed") {
      const stripeSess = stripeEvent.data.object;
      const meta = stripeSess.metadata || {};
      const sId = meta.school_id;
      const sName = meta.school_name;
      const sEmail = meta.school_email;
      const sCount = parseInt(meta.student_count || "0");
      if (sId && sEmail) {
        const tok = crypto.randomUUID();
        const exp = new Date(Date.now() + 48 * 60 * 60 * 1e3).toISOString();
        try {
          await env.DB.prepare(
            "INSERT OR REPLACE INTO schools (id, name, email, setup_token, setup_token_expires, student_count, subscription_type, active, created_at) VALUES (?, ?, ?, ?, ?, ?, 'paid', 1, datetime('now'))"
          ).bind(sId, sName || sId, sEmail, tok, exp, sCount).run();
          if (env.RESEND_API_KEY) {
            const setupUrl = "https://schoolsportportal.com.au/setup?token=" + tok;
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: { "Authorization": "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
              body: JSON.stringify({
                from: "Paddy at School Sport Portal <hello@schoolsportportal.com.au>",
                to: [sEmail],
                subject: "Your School Sport Portal is ready \u2014 set your password",
                html: '<p>Hi,</p><p>Payment confirmed! Set your password to get started:</p><p><a href="' + setupUrl + '">' + setupUrl + "</a></p><p>This link expires in 48 hours.</p><p>\u2014 Paddy, School Sport Portal</p>"
              })
            });
          }
        } catch (provErr) {
          console.error("stripe provision error:", provErr);
        }
      }
    }
    return new Response("OK");
  }
  if (path === "/thanks") {
    const thanksHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Thanks \u2014 School Sport Portal</title><style>body{font-family:sans-serif;max-width:600px;margin:80px auto;text-align:center;color:#1a3a4a;padding:0 20px}h1{color:#00a86b;font-size:2.5em}p{font-size:1.1em;line-height:1.6}a{color:#00a86b;font-weight:bold}</style></head><body><h1>Payment confirmed!</h1><p>Your School Sport Portal is being set up.</p><p>Check your email for a link to set your password and get started.</p><p><a href="/">\u2190 Back to home</a></p></body></html>';
    return new Response(thanksHtml, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
  const _orgAdminMatch = path.match(/^\/[a-z0-9][a-z0-9-]*(\/admin(?:\/.*)?$)/);
  if (_orgAdminMatch) path = _orgAdminMatch[1];
  if (path.startsWith("/admin")) {
    const sess = await getSession(env.DB, request);
    if (!sess) return redirect("/login");
    const school = await getSchool(env.DB, sess.schoolId);
    if (!school) return redirect("/login");
    if (path === "/admin" || path === "/admin/") {
      if (school.account_type === "district" && school.is_admin) {
        const { results: distSchools } = await env.DB.prepare(
          "SELECT id, name, subscription_type, active, student_count FROM schools WHERE district_id = ? ORDER BY name"
        ).bind(school.id).all();
        return respond(districtDashboardPage(school, distSchools));
      }
      if (school.account_type === "division" && school.is_admin) {
        const org = await env.DB.prepare("SELECT * FROM organisations WHERE id = ?").bind(school.id).first();
        const parentId = org ? org.id : school.id;
        const { results: districts } = await env.DB.prepare(
          "SELECT o.*, (SELECT COUNT(*) FROM schools s WHERE s.district_id = o.id AND s.active = 1) as school_count FROM organisations o WHERE o.parent_id = ? ORDER BY o.name"
        ).bind(parentId).all();
        return respond(divisionDashboardPage(school, districts));
      }
      if (school.account_type === "region" && school.is_admin) {
        const org = await env.DB.prepare("SELECT * FROM organisations WHERE id = ?").bind(school.id).first();
        const parentId = org ? org.id : school.id;
        const { results: divisions } = await env.DB.prepare(
          "SELECT o.*, (SELECT COUNT(*) FROM organisations d WHERE d.parent_id = o.id) as div_count FROM organisations o WHERE o.parent_id = ? ORDER BY o.name"
        ).bind(parentId).all();
        return respond(regionDashboardPage(school, divisions));
      }
      const [stuRow, carRow, qualRow] = await Promise.all([
        env.DB.prepare("SELECT COUNT(*) as n FROM students WHERE school_id = ? AND active = 1").bind(school.id).first(),
        env.DB.prepare("SELECT COUNT(*) as n FROM carnivals WHERE school_id = ?").bind(school.id).first(),
        env.DB.prepare("SELECT COUNT(*) as n FROM results r JOIN carnivals c ON r.carnival_id = c.id WHERE c.school_id = ? AND r.qualified = 1").bind(school.id).first()
      ]);
      return respond(dashboardPage(school, { students: stuRow?.n || 0, carnivals: carRow?.n || 0, qualifiers: qualRow?.n || 0 }));
    }
    if (path === "/admin/students" && method === "GET") {
      const { results: students } = await env.DB.prepare("SELECT * FROM students WHERE school_id = ? AND active = 1 ORDER BY year_level, first_name").bind(school.id).all();
      return respond(studentsPage(school, students, url.searchParams.get("msg") || ""));
    }
    if (path === "/admin/students/upload" && method === "GET") {
      return respond(uploadPage(school));
    }
    if (path === "/admin/students/upload" && method === "POST") {
      try {
        const form = await request.formData();
        const file = form.get("csv");
        if (!file) return respond(uploadPage(school, "No file selected."));
        const text = await file.text();
        const rows = parseCSV(text);
        if (rows.length === 0) return respond(uploadPage(school, "CSV appears empty or invalid. Check the format."));
        const students = rows.map((r) => normaliseStudent(r, school.id)).filter(Boolean);
        if (students.length === 0) return respond(uploadPage(school, "Could not find a first_name column. Check the CSV headers."));
        await env.DB.prepare("UPDATE students SET active = 0 WHERE school_id = ?").bind(school.id).run();
        const stmt = env.DB.prepare("INSERT INTO students (id, school_id, first_name, last_name_initial, year_level, house, dob, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        const batch = students.map((s) => stmt.bind(s.id, s.school_id, s.first_name, s.last_name_initial, s.year_level, s.house, s.dob, s.gender));
        await env.DB.batch(batch);
        await env.DB.prepare("UPDATE schools SET student_count = ?, updated_at = datetime('now') WHERE id = ?").bind(students.length, school.id).run();
        return redirect(`/admin/students?msg=\u2705 Uploaded ${students.length} students successfully`);
      } catch (e) {
        return respond(uploadPage(school, `Upload failed: ${e.message}`));
      }
    }
    if (path === "/admin/students/download") {
      const { results: students } = await env.DB.prepare("SELECT * FROM students WHERE school_id = ? AND active = 1 ORDER BY year_level, first_name").bind(school.id).all();
      const header = "first_name,last_name_initial,year_level,house,gender,dob\n";
      const csv = header + students.map((s) => [s.first_name, s.last_name_initial, s.year_level, s.house, s.gender, s.dob].join(",")).join("\n");
      return new Response(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="${school.id}-students.csv"`, ...ADMIN_SEC_HEADERS } });
    }
    if (path === "/admin/carnivals" && method === "GET") {
      const { results: carnivals } = await env.DB.prepare("SELECT * FROM carnivals WHERE school_id = ? ORDER BY date DESC").bind(school.id).all();
      return respond(carnivalsPage(school, carnivals, url.searchParams.get("msg") || ""));
    }
    if (path === "/admin/carnivals" && method === "POST") {
      const form = await request.formData();
      const name = (form.get("name") || "").trim();
      const type = form.get("type") || "other";
      const date = form.get("date") || "";
      if (!name) return redirect("/admin/carnivals");
      const id = crypto.randomUUID();
      await env.DB.prepare("INSERT INTO carnivals (id, school_id, name, type, date) VALUES (?, ?, ?, ?, ?)").bind(id, school.id, name, type, date).run();
      return redirect(`/admin/carnivals?msg=\u2705 Carnival "${name}" created`);
    }
    if (path === "/admin/export" && method === "GET") {
      const { results: qualifiers } = await env.DB.prepare(`
          SELECT s.first_name, s.last_name_initial, s.year_level, s.gender, s.dob,
                 r.event, r.place, c.name as carnival_name
          FROM results r
          JOIN students s ON r.student_id = s.id
          JOIN carnivals c ON r.carnival_id = c.id
          WHERE c.school_id = ? AND r.qualified = 1
          ORDER BY c.date DESC, r.event, r.place
        `).bind(school.id).all();
      return respond(exportPage(school, qualifiers));
    }
    if (path === "/admin/export/csv") {
      const { results: qualifiers } = await env.DB.prepare(`
          SELECT s.first_name, s.last_name_initial, s.year_level, s.gender, s.dob,
                 r.event, r.place, c.name as carnival_name, c.date as carnival_date
          FROM results r
          JOIN students s ON r.student_id = s.id
          JOIN carnivals c ON r.carnival_id = c.id
          WHERE c.school_id = ? AND r.qualified = 1
          ORDER BY c.date DESC, r.event, r.place
        `).bind(school.id).all();
      const header = "school,first_name,last_name_initial,year_level,gender,dob,event,place,carnival,carnival_date\n";
      const csv = header + qualifiers.map((q) => [school.name, q.first_name, q.last_name_initial, q.year_level, q.gender, q.dob, q.event, q.place, q.carnival_name, q.carnival_date].join(",")).join("\n");
      return new Response(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="${school.id}-district-entries.csv"`, ...ADMIN_SEC_HEADERS } });
    }
    return respond("<h1>Not found</h1>", 404);
  }
  return redirect("/login");
  return new Response("<h1>Not found</h1>", { status: 404 });
}
__name(_adminFetch, "_adminFetch");
__name2(_adminFetch, "_adminFetch");
__name22(_adminFetch, "_adminFetch");
__name222(_adminFetch, "_adminFetch");
var LEGAL_PAGES = { "cookies": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cookie Policy \u2014 Luck Dragon</title>
<meta name="description" content="How we use cookies and similar technologies.">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
table{margin-top:6px}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>Cookie Policy</h1>
<p>How we use cookies and similar technologies.</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>Short version:</strong> We use one essential session cookie when you sign in to a private school portal. No advertising cookies, no third-party tracking, no analytics cookies. You don't need to consent to anything to use our public pages.</div>
<div class="section"><h2>1. What is a cookie?</h2><div class="card"><p>A cookie is a small text file stored on your browser by a website. Cookies can remember preferences, keep you signed in, or track you across the web. We only use one type \u2014 an essential session cookie.</p></div></div>
<div class="section"><h2>2. Cookies we use</h2><div class="card"><table style="width:100%;font-size:14px;border-collapse:collapse"><thead><tr style="border-bottom:2px solid #e2e8f0"><th style="text-align:left;padding:8px 4px;font-weight:700;color:#0d1b3e">Cookie</th><th style="text-align:left;padding:8px 4px;font-weight:700;color:#0d1b3e">Purpose</th><th style="text-align:left;padding:8px 4px;font-weight:700;color:#0d1b3e">Lifetime</th><th style="text-align:left;padding:8px 4px;font-weight:700;color:#0d1b3e">Type</th></tr></thead><tbody><tr style="border-bottom:1px solid #f1f5f9"><td style="padding:8px 4px"><code>ssp_session</code></td><td style="padding:8px 4px">Keeps you signed in to your school portal. HMAC-signed bearer token.</td><td style="padding:8px 4px">7 days</td><td style="padding:8px 4px">Strictly necessary</td></tr></tbody></table></div></div>
<div class="section"><h2>3. Cookies we do NOT use</h2><div class="card"><ul><li><strong>Advertising cookies</strong> \u2014 none. We never sell data and never run ads.</li><li><strong>Cross-site tracking</strong> \u2014 none.</li><li><strong>Google Analytics, Meta Pixel, etc.</strong> \u2014 none.</li><li><strong>Heatmap or session-replay tools</strong> \u2014 none.</li></ul></div></div>
<div class="section"><h2>4. Local storage</h2><div class="card"><p>When you sign in to a private staff portal, we store a session token in your browser's localStorage (not a cookie). This expires after 7 days or when you log out. Clearing your browser data removes it.</p></div></div>
<div class="section"><h2>5. Third-party services</h2><div class="card"><p>Some pages link to third-party services that may set their own cookies (Stripe Checkout for payments; Resend for email). We don't control those. Both Stripe and Resend are GDPR / SOC 2 compliant and don't track you back to us. See the <a href="/subprocessors">Subprocessors</a> page.</p></div></div>
<div class="section"><h2>6. Your choices</h2><div class="card"><p>You can block all cookies in your browser settings. Our public pages will continue to work; the private staff portals require the session cookie to keep you signed in.</p></div></div>
<div class="section"><h2>7. Changes</h2><div class="card"><p>If we add any new cookie or tracking technology, we'll update this page and notify active subscribers by email at least 14 days in advance.</p></div></div>
<div class="section"><h2>8. Questions</h2><div class="card"><p>Email <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a>.</p></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>`, "subprocessors": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Subprocessors \u2014 Luck Dragon</title>
<meta name="description" content="Third parties we use to deliver our service.">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
table{margin-top:6px}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>Subprocessors</h1>
<p>Third parties we use to deliver our service.</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>Short version:</strong> We use four sub-processors. All are SOC 2 Type II or ISO 27001 certified. Customer student data stays in Australia (Cloudflare Sydney region).</div>
<div class="section"><h2>Current sub-processors</h2><div class="card"><table style="width:100%;font-size:13px;border-collapse:collapse"><thead><tr style="border-bottom:2px solid #e2e8f0;background:#f8fafc"><th style="text-align:left;padding:10px 6px;font-weight:700;color:#0d1b3e">Sub-processor</th><th style="text-align:left;padding:10px 6px;font-weight:700;color:#0d1b3e">Service</th><th style="text-align:left;padding:10px 6px;font-weight:700;color:#0d1b3e">Data residency</th><th style="text-align:left;padding:10px 6px;font-weight:700;color:#0d1b3e">Compliance</th></tr></thead><tbody>
<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 6px"><strong>Cloudflare Inc.</strong></td><td style="padding:10px 6px">Hosting, D1 database, KV storage, R2 file storage, CDN, DDoS protection</td><td style="padding:10px 6px">Sydney AU (primary). Replication to AU regions only.</td><td style="padding:10px 6px">SOC 2 Type II, ISO 27001, GDPR DPA, FedRAMP, PCI DSS</td></tr>
<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 6px"><strong>Stripe Australia Pty Ltd</strong></td><td style="padding:10px 6px">Payment processing for Carnival Timing access codes and School Sport Portal subscriptions</td><td style="padding:10px 6px">Australia + USA redundancy</td><td style="padding:10px 6px">PCI DSS Level 1, SOC 2 Type II, GDPR DPA</td></tr>
<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:10px 6px"><strong>Resend Inc.</strong></td><td style="padding:10px 6px">Transactional email delivery (login links, welcome emails, password resets, race-day reminders). <em>Adult email addresses only \u2014 never student data.</em></td><td style="padding:10px 6px">USA (Tokyo region for our outbound)</td><td style="padding:10px 6px">SOC 2 Type II, GDPR DPA</td></tr>
<tr><td style="padding:10px 6px"><strong>GitHub Inc. (Microsoft)</strong></td><td style="padding:10px 6px">Source code repository \u2014 <em>no customer data</em>. Used to store our software, not your data.</td><td style="padding:10px 6px">USA</td><td style="padding:10px 6px">SOC 2 Type II, ISO 27001</td></tr>
</tbody></table></div></div>
<div class="section"><h2>Notification of changes</h2><div class="card"><p>If we add or replace a sub-processor, we'll notify all active subscribers by email at least <strong>30 days</strong> in advance. Schools may terminate without penalty within that window if they reasonably object.</p></div></div>
<div class="section"><h2>Sub-processor evidence on request</h2><div class="card"><p>Most schools' privacy reviews ask for sub-processor SOC 2 / ISO 27001 reports. Email <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> and we'll forward Cloudflare's, Stripe's, and Resend's compliance reports under NDA.</p></div></div>
<div class="section"><h2>Last reviewed</h2><div class="card"><p>This list was last reviewed on 5 May 2026. Subscribe to changes by emailing <a href="mailto:info@schoolsportportal.com.au?subject=Subscribe%20to%20subprocessor%20changes">info@schoolsportportal.com.au</a>.</p></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>`, "security": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Security overview \u2014 Luck Dragon</title>
<meta name="description" content="How we protect your school's data.">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
table{margin-top:6px}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>Security overview</h1>
<p>How we protect your school's data.</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>Short version:</strong> Australian-hosted, encrypted at rest and in transit, MFA-protected admin access, SOC 2 sub-processors, daily backups, 72-hour breach notification.</div>
<div class="section"><h2>1. Data residency</h2><div class="card"><p>All student data is stored in <strong>Cloudflare's Sydney region</strong> on D1 (database) and KV (session storage). Replication is restricted to Australian regions. No student data leaves Australia.</p></div></div>
<div class="section"><h2>2. Encryption</h2><div class="card"><ul><li><strong>At rest:</strong> All Cloudflare D1, KV, and R2 storage is encrypted by default with AES-256.</li><li><strong>In transit:</strong> TLS 1.2 minimum on all our domains. HSTS enforced. HTTPS only.</li><li><strong>Passwords:</strong> Hashed with PBKDF2-SHA256, 100,000 iterations, per-user 16-byte salt. Verified with constant-time comparison.</li></ul></div></div>
<div class="section"><h2>3. Authentication</h2><div class="card"><ul><li><strong>School staff sign-in:</strong> Email + password (8+ characters minimum).</li><li><strong>Rate limiting:</strong> 10 login attempts per IP per 5 minutes; account lockout after 5 failed attempts in 15 minutes.</li><li><strong>Self-serve password reset:</strong> Single-use token via email, 15-minute expiry.</li><li><strong>Sessions:</strong> HMAC-signed bearer tokens with 7-day expiry. Stored in browser localStorage, never as third-party-readable cookies.</li><li><strong>Admin access:</strong> All Luck Dragon operational accounts (Cloudflare, Stripe, Resend, GitHub) protected by MFA.</li></ul></div></div>
<div class="section"><h2>4. Operational security</h2><div class="card"><ul><li>Audit log of admin actions, 90-day retention.</li><li>Public API rate limiting (60 requests / minute / IP).</li><li>Content Security Policy, X-Frame-Options, X-Content-Type-Options headers on all pages.</li><li>Daily automated backup of source code to GitHub.</li><li>D1 point-in-time recovery (Cloudflare-managed, 30-day window).</li><li>Worker source code auto-snapshotted nightly to a private GitHub repo.</li></ul></div></div>
<div class="section"><h2>5. Sub-processors</h2><div class="card"><p>Cloudflare (SOC 2 Type II), Stripe (PCI DSS Level 1), Resend (SOC 2 Type II), GitHub (SOC 2 Type II). Full list at <a href="/subprocessors">/subprocessors</a>.</p></div></div>
<div class="section"><h2>6. Incident response</h2><div class="card"><p>If a confirmed or reasonably suspected unauthorised access to school data occurs:</p><ol style="line-height:1.8"><li>The school's nominated privacy contact is notified within <strong>72 hours</strong>.</li><li>The notification includes nature, scope, likely consequences, and measures taken.</li><li>We cooperate with the school's NDB scheme assessment.</li><li>Logs and forensic artefacts are preserved for at least 12 months.</li></ol></div></div>
<div class="section"><h2>7. Insurance</h2><div class="card"><p>Cyber Liability $1,000,000 + Professional Indemnity $2,000,000 + Public Liability $20,000,000 (BizCover). Certificate of currency available on request.</p></div></div>
<div class="section"><h2>8. Audit access</h2><div class="card"><p>School business managers may audit our compliance once per 12 months on 30 days' notice. We typically meet this with copies of our sub-processors' SOC 2 / ISO 27001 reports.</p></div></div>
<div class="section"><h2>9. Vulnerability disclosure</h2><div class="card"><p>If you discover a security issue, please email <a href="mailto:security@schoolsportportal.com.au">security@schoolsportportal.com.au</a> (or <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a>). We'll respond within 48 hours, fix critical issues within 7 days, and credit responsible disclosers in our changelog.</p></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>`, "sla": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Service Level Agreement (SLA) \u2014 Luck Dragon</title>
<meta name="description" content="Our uptime commitment to paying customers.">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
table{margin-top:6px}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>Service Level Agreement (SLA)</h1>
<p>Our uptime commitment to paying customers.</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>Short version:</strong> 99.5% monthly uptime target. If we miss it, you get a pro-rata service credit. Race-day windows are explicitly monitored.</div>
<div class="section"><h2>1. Uptime commitment</h2><div class="card"><p>Luck Dragon Pty Ltd commits to a <strong>99.5% monthly availability target</strong> for paid services (School Sport Portal subscriptions and Carnival Timing access codes).</p><p>Availability is measured on the public service status endpoints over a calendar month, excluding scheduled maintenance windows.</p></div></div>
<div class="section"><h2>2. Scheduled maintenance</h2><div class="card"><p>We may perform scheduled maintenance with at least <strong>24 hours advance notice</strong>, communicated by email and on the status page. Scheduled maintenance is excluded from uptime calculations and typically lasts under 30 minutes.</p><p>We never schedule maintenance during the school day (8am\u20134pm AEST/AEDT, weekdays during school terms) or within 48 hours of an upcoming carnival you've notified us about.</p></div></div>
<div class="section"><h2>3. Race-day priority</h2><div class="card"><p>Carnivals are time-critical events. If you let us know your carnival date <strong>at least 7 days in advance</strong> (via the platform or email), we'll:</p><ul><li>Pre-flight your carnival code 24 hours before.</li><li>Have a tech on standby reachable by phone during the carnival window.</li><li>Hold all non-critical deploys for 48 hours either side of your event.</li></ul></div></div>
<div class="section"><h2>4. Service credits</h2><div class="card"><p>If we miss the 99.5% uptime target in a month, eligible paid customers receive a <strong>pro-rata service credit</strong>:</p><ul><li>99.0% \u2013 99.49% uptime: 5% of monthly fee credited next invoice.</li><li>95.0% \u2013 98.99% uptime: 10% credit.</li><li>Below 95.0% uptime: 25% credit.</li></ul><p>Credits are capped at 100% of the monthly fee. Service credits must be requested within 30 days of the affected month by emailing <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> with your school name.</p></div></div>
<div class="section"><h2>5. Race-day-specific guarantee</h2><div class="card"><p>If a paid Carnival Timing service is unavailable on the day of your scheduled carnival due to our error, we will issue a <strong>full refund of that carnival's access code</strong> (or, for annual subscribers, a one-month service credit). Email <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> within 7 days of the affected carnival.</p></div></div>
<div class="section"><h2>6. What's excluded</h2><div class="card"><p>Service credits do not apply to outages caused by:</p><ul><li>Scheduled maintenance announced in advance.</li><li>Customer error (wrong access code, account misconfiguration).</li><li>Issues with the customer's internet connection or device.</li><li>Force majeure (natural disasters, ISP-wide outages, internet backbone events).</li></ul></div></div>
<div class="section"><h2>7. Status page</h2><div class="card"><p>Live status: <a href="https://asgard-status.pgallivan.workers.dev/">https://asgard-status.pgallivan.workers.dev/</a>. Updates every 60 seconds. Subscribe by emailing <a href="mailto:info@schoolsportportal.com.au?subject=Subscribe%20to%20status%20alerts">info@schoolsportportal.com.au</a>.</p></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>`, "accessibility": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Accessibility Statement \u2014 Luck Dragon</title>
<meta name="description" content="Our commitment to making School Sport Portal usable by everyone.">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
table{margin-top:6px}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>Accessibility Statement</h1>
<p>Our commitment to making School Sport Portal usable by everyone.</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>Short version:</strong> We target WCAG 2.1 Level AA across all our products. We're not perfect \u2014 please tell us where we fall short.</div>
<div class="section"><h2>1. Standards we follow</h2><div class="card"><p>We design and build to <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> as the minimum baseline. This is the standard required by the Australian Government's Digital Service Standard and by most state education departments.</p></div></div>
<div class="section"><h2>2. What's accessible today</h2><div class="card"><ul><li>All text content meets WCAG 2.1 AA contrast ratios (4.5:1 minimum).</li><li>All interactive elements are keyboard-operable.</li><li>Form fields have associated labels for screen readers.</li><li>The Carnival Timing app works on any device \u2014 desktop, tablet, or phone.</li><li>Public results pages are machine-readable for assistive technology.</li><li>No reliance on colour alone to convey information.</li></ul></div></div>
<div class="section"><h2>3. Where we have gaps</h2><div class="card"><p>We're a small team and we don't have a full third-party accessibility audit yet. Areas we're actively improving:</p><ul><li>Screen-reader live announcements during race-day timing flows.</li><li>Some legacy inline SVG icons may lack <code>aria-label</code> attributes.</li><li>Mobile-only views may need refinement for users with motor impairments.</li></ul></div></div>
<div class="section"><h2>4. Tell us if it doesn't work for you</h2><div class="card"><p>If any part of our products doesn't work with your assistive technology, please email <a href="mailto:accessibility@schoolsportportal.com.au">accessibility@schoolsportportal.com.au</a> (or <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a>) describing:</p><ul><li>What you were trying to do.</li><li>What happened (or didn't happen).</li><li>Your assistive technology and browser.</li></ul><p>We'll respond within 5 business days and prioritise the fix in our next release.</p></div></div>
<div class="section"><h2>5. Alternative formats</h2><div class="card"><p>If you need a result, report or document in an alternative format (large print, braille, plain text), email us and we'll provide it within 10 business days at no charge.</p></div></div>
<div class="section"><h2>6. Continuous improvement</h2><div class="card"><p>We commit to a third-party WCAG 2.1 AA audit within the next 12 months. Findings will be published on this page along with our remediation timeline.</p></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>`, "child-safety": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Child Safety Statement \u2014 Luck Dragon</title>
<meta name="description" content="Our commitment to keeping children safe online.">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
table{margin-top:6px}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>Child Safety Statement</h1>
<p>Our commitment to keeping children safe online.</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>Short version:</strong> Our platforms are designed for school staff, not children. Students never create accounts and never directly interact with us. We support schools in meeting the Victorian Child Safe Standards and equivalent requirements in other states.</div>
<div class="section"><h2>1. Our role</h2><div class="card"><p>School Sport Portal, Carnival Timing, and SportCarnival are tools for <strong>authorised school staff</strong> \u2014 PE coordinators, teachers, sport administrators. Students do not create accounts. Students do not log in. Students do not message anyone through our platforms.</p><p>All student data is entered by school staff under the school's data-controller responsibilities.</p></div></div>
<div class="section"><h2>2. What students see</h2><div class="card"><p>The only place students might see our software is on a public results page (e.g., a carnival results page projected on a screen during the event, or shown to a parent later). On those public pages:</p><ul><li>Default display is <strong>"first name + surname-initial"</strong> (e.g., "Henry F").</li><li>Full surname is <strong>opt-in</strong> by school + parent for representative-level results only.</li><li>No date of birth is shown publicly.</li><li>No address, parent contact, or photograph is shown publicly.</li><li>No comment, message, or chat function exists for students or anyone else.</li></ul></div></div>
<div class="section"><h2>3. Compliance with the Victorian Child Safe Standards</h2><div class="card"><p>The Victorian <em>Child Safe Standards</em> (effective from 1 July 2022) apply to organisations that work with children. While our software is operated by school staff and students don't directly interact with us, we recognise our role in supporting our school customers' child-safety responsibilities. Our commitments:</p><ul><li><strong>Standard 1 (Child safety culture):</strong> Our team treats child safety as paramount and explicitly designs against features that could enable abuse (no direct messaging, no public photos, no location sharing).</li><li><strong>Standard 2 (Roles & responsibilities):</strong> The director (Patrick Gallivan) holds ultimate accountability for child safety in the platform's design.</li><li><strong>Standard 6 (Recruitment):</strong> Anyone with administrative access to student data is required to hold a current Working with Children Check (WWC).</li><li><strong>Standard 7 (Complaints):</strong> Any concern can be raised at <a href="mailto:childsafety@schoolsportportal.com.au">childsafety@schoolsportportal.com.au</a>. We commit to acknowledge within 24 hours.</li><li><strong>Standard 9 (Online safety):</strong> Public-facing content is designed to minimise identifying information (first name + initial only by default).</li></ul></div></div>
<div class="section"><h2>4. Other Australian states</h2><div class="card"><ul><li><strong>NSW:</strong> Office of the Children's Guardian Child Safe Standards (compulsory for organisations from 1 February 2022).</li><li><strong>QLD:</strong> Blue Card system + Working with Children Check applies to anyone with administrative access.</li><li><strong>WA, SA, TAS, ACT, NT:</strong> Equivalent state-based child-safety requirements followed through the lens of National Principles for Child Safe Organisations.</li></ul></div></div>
<div class="section"><h2>5. Reportable Conduct Scheme (Victoria)</h2><div class="card"><p>The Reportable Conduct Scheme requires certain organisations to notify the Commission for Children and Young People of any allegation of reportable conduct by their workers. While our software is not itself an "in-scope organisation", we cooperate with school customers in any investigation involving the school's use of our platform.</p></div></div>
<div class="section"><h2>6. Reporting a concern</h2><div class="card"><p>If you are concerned that the use of our platform has resulted in harm to a child:</p><ol style="line-height:1.8"><li><strong>Contact us immediately:</strong> <a href="mailto:childsafety@schoolsportportal.com.au">childsafety@schoolsportportal.com.au</a> or <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a>.</li><li><strong>If a child is in immediate danger:</strong> call 000.</li><li><strong>For non-urgent concerns about a child:</strong> in Victoria, contact the Child Protection Crisis Line on 13 12 78. In other states, refer to your local equivalent.</li><li><strong>Anonymous tip-offs:</strong> Crime Stoppers on 1800 333 000.</li></ol></div></div>
<div class="section"><h2>7. Our team</h2><div class="card"><p>The platform is operated by <strong>Patrick Gallivan</strong>, a registered Victorian primary school teacher with a current Working with Children Check (WWC card holder). Direct any child-safety enquiry to <a href="mailto:childsafety@schoolsportportal.com.au">childsafety@schoolsportportal.com.au</a>.</p></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>`, "404": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Page not found \u2014 Luck Dragon</title>
<meta name="description" content="We couldn't find the page you were looking for.">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
table{margin-top:6px}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>Page not found</h1>
<p>We couldn't find the page you were looking for.</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>404 \u2014 Page not found.</strong></div>
<div class="section"><div class="card"><p>The page you tried to load doesn't exist on this site. This might be because:</p><ul><li>The link you followed has a typo.</li><li>The page was moved or renamed.</li><li>You mistyped a URL by hand.</li></ul><p>Try the homepage or use one of the links below:</p><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><a href="/" style="background:#1a56db;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-size:.9rem">Home</a><a href="/help" style="border:1.5px solid #cbd5e1;color:#0f172a;padding:9px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem">Help</a><a href="https://schoolsportportal.com.au" style="border:1.5px solid #cbd5e1;color:#0f172a;padding:9px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem">School Sport Portal</a><a href="https://carnivaltiming.com" style="border:1.5px solid #cbd5e1;color:#0f172a;padding:9px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem">Carnival Timing</a></div></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>`, "about": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About \u2014 Luck Dragon</title>
<meta name="description" content="Built by a PE teacher, for PE teachers.">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
.changelog-entry{border-left:3px solid #1a56db;padding-left:14px;margin-bottom:18px}
.changelog-date{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.changelog-title{font-size:15px;font-weight:700;color:#0d1b3e;margin-bottom:6px}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>About</h1>
<p>Built by a PE teacher, for PE teachers.</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>Short version:</strong> School Sport Portal is built by Patrick Gallivan, a Victorian primary-school PE teacher who got tired of doing carnival admin in spreadsheets.</div>
<div class="section"><h2>Who we are</h2><div class="card"><p><strong>Luck Dragon Pty Ltd</strong> is an Australian Pty Ltd company (ABN 64 697 434 898), based in Williamstown VIC. We make software for school sport \u2014 that's it. Three products: School Sport Portal (schools' roster + calendar), Carnival Timing (race-day timing), and SportCarnival (public results).</p><p>We are <strong>not</strong> a venture-backed startup. We are not building toward an exit. We are building a platform that we ourselves use every term, run by a PE teacher who needed it to exist.</p></div></div>
<div class="section"><h2>Patrick Gallivan \u2014 founder</h2><div class="card"><p>Paddy is a registered Victorian primary-school teacher with a current Working with Children Check. He runs the PE program at Williamstown Primary School and convenes carnival sport for the Williamstown District. He built the first version of Carnival Timing on a phone at McIvor Reserve during the 2024 cross-country, because the existing options were terrible.</p><p>If you sign up to School Sport Portal, you will email Paddy directly. He answers. There's no sales team, no support tier, no escalation path \u2014 just one PE teacher who built a thing and looks after it.</p></div></div>
<div class="section"><h2>Why we exist</h2><div class="card"><p>Australian primary-school PE coordinators do their carnival admin in spreadsheets. Every sport, every term, every year \u2014 re-key students into a fresh sheet, hand-time on a stopwatch, transcribe results into a PDF that nobody reads. We thought we could do better.</p><p>School Sport Portal is the answer to: what if you entered student data once and the platform handled every sport for the rest of the year?</p></div></div>
<div class="section"><h2>How we work</h2><div class="card"><ul><li><strong>Australian-only.</strong> Hosted in Australia (Cloudflare Sydney). Designed against AU privacy law and child-safety standards.</li><li><strong>Schools' interests first.</strong> No advertising. No data sales. No tracking. Schools own their data and can take it with them anytime.</li><li><strong>Quiet, useful, fair pricing.</strong> $1 per student per year (inc GST) for the full School Sport Portal. $49 per carnival or $149/yr for Carnival Timing alone. No hidden fees.</li><li><strong>Built where it's used.</strong> Every feature has been tested at a real Williamstown carnival. If it didn't work on the day, it doesn't ship.</li></ul></div></div>
<div class="section"><h2>Get in touch</h2><div class="card"><p>Email <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \u2014 that's Paddy. Phone (during school terms): 0466 651 720.</p><p>Williamstown Primary School and Williamstown District Sport are real customers and we're happy to put you in touch with them as a reference.</p></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/about">About</a> \xB7 <a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 <a href="/changelog">Changelog</a> \xB7 <a href="/modern-slavery">Modern Slavery</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>`, "changelog": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Changelog \u2014 Luck Dragon</title>
<meta name="description" content="What we've shipped lately.">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
.changelog-entry{border-left:3px solid #1a56db;padding-left:14px;margin-bottom:18px}
.changelog-date{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.changelog-title{font-size:15px;font-weight:700;color:#0d1b3e;margin-bottom:6px}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>Changelog</h1>
<p>What we've shipped lately.</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>What this is:</strong> Plain-English release notes for School Sport Portal, Carnival Timing, and SportCarnival. Latest at the top.</div>

<div class="section"><h2>2026</h2>

<div class="changelog-entry">
<div class="changelog-date">5 May 2026 \xB7 Compliance + trust</div>
<div class="changelog-title">Six new policy + trust pages live across all sites</div>
<p>Cookie Policy, Subprocessor list, Security Overview, Service Level Agreement, Accessibility Statement, and Child Safety Statement now live on schoolsportportal.com.au, carnivaltiming.com, and sportcarnival.com.au. Branded 404 page replaces the previous silent fall-through. SSP sitemap expanded to 14 URLs.</p>
</div>

<div class="changelog-entry">
<div class="changelog-date">5 May 2026 \xB7 Auth</div>
<div class="changelog-title">Email + password sign-in replaces magic link</div>
<p>School coordinators sign in with an email + password (PBKDF2-SHA256, salted). Self-serve forgot/reset flow with a 15-minute single-use token. Rate limit 10 attempts per 5 min per IP, account lockout after 5 failed attempts.</p>
</div>

<div class="changelog-entry">
<div class="changelog-date">5 May 2026 \xB7 CT timing app</div>
<div class="changelog-title">Per-carnival rules + roster CSV import</div>
<p>Carnival setup now lets you set max events per student, allow/block relays, gate manual time edits, and enforce strict age groups. Paste your roster from Compass/Sentral as CSV and the platform builds the bib lookup automatically.</p>
</div>

<div class="changelog-entry">
<div class="changelog-date">5 May 2026 \xB7 Pricing</div>
<div class="changelog-title">GST registration + tax invoices</div>
<p>Luck Dragon Pty Ltd is now registered for GST. All prices show inc-GST split (e.g. $1/student = $0.91 ex + $0.09 GST). Stripe issues a compliant tax invoice with our ABN automatically on payment.</p>
</div>

<div class="changelog-entry">
<div class="changelog-date">4 May 2026 \xB7 CT timing app</div>
<div class="changelog-title">XC Marshal name picker (no-bibs fallback)</div>
<p>If physical bibs are missing, marshals can tap a "Pick" button to open a full-screen name list filtered to runners in the active race. Tap a name to record the finish.</p>
</div>

<div class="changelog-entry">
<div class="changelog-date">4 May 2026 \xB7 Infrastructure</div>
<div class="changelog-title">Firebase \u2192 Cloudflare D1 migration complete</div>
<p>All four sites now run on Cloudflare D1 (Sydney region). No more Firebase reads. Carnival timing data archives directly to D1 on publish. Faster, cheaper, fully Australian-hosted.</p>
</div>

<div class="changelog-entry">
<div class="changelog-date">3 May 2026 \xB7 Onboarding</div>
<div class="changelog-title">Welcome email after Stripe checkout</div>
<p>School Sport Portal subscribers and Carnival Timing buyers now get a branded welcome email immediately after payment with their access code, getting-started link, and direct contact for questions.</p>
</div>

</div>
<div class="section"><div class="card"><p>Want to be notified of new features? Email <a href="mailto:info@schoolsportportal.com.au?subject=Subscribe%20to%20release%20notes">info@schoolsportportal.com.au</a> with subject "subscribe to release notes".</p></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/about">About</a> \xB7 <a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 <a href="/changelog">Changelog</a> \xB7 <a href="/modern-slavery">Modern Slavery</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>`, "modern-slavery": `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Modern Slavery Statement \u2014 Luck Dragon</title>
<meta name="description" content="Our commitment under the Modern Slavery Act 2018 (Cth).">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:48px 24px 64px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:"";position:absolute;bottom:-1px;left:0;right:0;height:32px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(24px,4.5vw,36px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:560px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:32px}
.section h2{font-size:17px;font-weight:800;color:#0d1b3e;margin-bottom:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
.section h3{font-size:14px;font-weight:700;color:#0f172a;margin:14px 0 6px}
.section p{font-size:14px;color:#334155;margin-bottom:10px}
.section ul, .section ol{font-size:14px;color:#334155;padding-left:22px;margin-bottom:10px}
.section ul li, .section ol li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:20px 24px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:14px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.updated{font-size:12px;color:#94a3b8;margin-bottom:24px;text-align:center}
code{background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:.92em}
.changelog-entry{border-left:3px solid #1a56db;padding-left:14px;margin-bottom:18px}
.changelog-date{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.changelog-title{font-size:15px;font-weight:700;color:#0d1b3e;margin-bottom:6px}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}footer a:hover{color:#fff}
</style>
</head>
<body>
<div class="hero">
<div class="badge">Legal</div>
<h1>Modern Slavery Statement</h1>
<p>Our commitment under the Modern Slavery Act 2018 (Cth).</p>
</div>
<div class="container">
<p class="updated">Last updated: 5 May 2026 \xB7 Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>
<div class="highlight"><strong>Voluntary statement.</strong> Luck Dragon Pty Ltd is below the $100M annual revenue threshold that makes a Modern Slavery Statement compulsory under the <em>Modern Slavery Act 2018</em> (Cth). We're publishing this voluntarily to be transparent about our supply chain.</div>
<div class="section"><h2>Our business</h2><div class="card"><p>Luck Dragon Pty Ltd is an Australian software company (ABN 64 697 434 898) based in Victoria. We sell SaaS subscriptions to Australian schools. Our revenue is well below the $100M threshold for compulsory reporting under the Modern Slavery Act 2018. We currently operate as a sole-director company with no employees other than the director.</p></div></div>
<div class="section"><h2>Supply chain risk assessment</h2><div class="card"><p>Our supply chain is short and almost entirely software-based:</p><ul><li><strong>Cloudflare Inc.</strong> \u2014 hosting (USA, ASX-listed parent). Publishes a Modern Slavery Statement.</li><li><strong>Stripe Australia Pty Ltd</strong> \u2014 payment processing (Australia / Ireland parent). Publishes a Modern Slavery Statement.</li><li><strong>Resend Inc.</strong> \u2014 email delivery (USA). Small US-based startup; we'll review their position annually.</li><li><strong>GitHub (Microsoft)</strong> \u2014 source code only (USA). Microsoft publishes a Modern Slavery Statement.</li></ul><p>None of our suppliers operate in industries identified as high-risk for modern slavery (we have no manufacturing, agriculture, mining, hospitality, or construction supply chain). We assess our overall modern slavery risk as <strong>low</strong>.</p></div></div>
<div class="section"><h2>Actions we take</h2><div class="card"><ul><li>Choose suppliers that publish Modern Slavery Statements where revenue thresholds apply.</li><li>Keep our own supply chain as short as practical (currently 4 sub-processors, fully cloud-based).</li><li>Pay all suppliers commercial market rates.</li><li>If we ever hire, we will commit to fair-work-compliant employment contracts and Working with Children Checks for anyone with access to school data.</li></ul></div></div>
<div class="section"><h2>Reporting concerns</h2><div class="card"><p>If you are aware of any modern slavery, child labour, forced labour, or human trafficking issue in our supply chain or business, please email <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> immediately. We commit to investigate any concern in good faith and report to the Australian Federal Police where appropriate.</p></div></div>
<div class="section"><h2>Review cycle</h2><div class="card"><p>This statement will be reviewed and republished annually. If we cross the $100M revenue threshold or hire any employees, we will move to a compulsory reporting position under the Act.</p><p>This statement was approved by Patrick Gallivan, Director, on 5 May 2026.</p></div></div>
</div>
<footer>
&copy; 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 
<a href="/about">About</a> \xB7 <a href="/privacy">Privacy</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/cookies">Cookies</a> \xB7 <a href="/subprocessors">Subprocessors</a> \xB7 <a href="/security">Security</a> \xB7 <a href="/sla">SLA</a> \xB7 <a href="/accessibility">Accessibility</a> \xB7 <a href="/child-safety">Child Safety</a> \xB7 <a href="/changelog">Changelog</a> \xB7 <a href="/modern-slavery">Modern Slavery</a> \xB7 
<a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> \xB7 
<a href="https://asgard-status.pgallivan.workers.dev/">Status</a>
<br><span style="margin-top:8px;display:inline-block">Also by Luck Dragon: <a href="https://sportcarnival.com.au" target="_blank" rel="noopener">SportCarnival</a> \xB7 <a href="https://carnivaltiming.com" target="_blank" rel="noopener">Carnival Timing</a></span>
</footer>
</body>
</html>` };
var INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>School Sport Portal \u2014 School sport, all in one place</title>
<meta name="description" content="The all-in-one school sport platform. Live carnival timing, house points, results, event programs and district qualifiers \u2014 for $1 per student per year.">
<meta property="og:title" content="School Sport Portal \u2014 School sport, all in one place">
<meta property="og:description" content="Live carnival timing, house points, results, event programs and district qualifiers \u2014 for $1 per student per year.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://schoolsportportal.com.au">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://schoolsportportal.com.au">
<meta property="og:image" content="https://schoolsportportal.com.au/og-image.svg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="theme-color" content="#0d1b3e">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"School Sport Portal","description":"Cloud-based school sport platform for Australian primary and secondary schools.","operatingSystem":"Web","applicationCategory":"BusinessApplication","offers":{"@type":"Offer","price":"1.00","priceCurrency":"AUD","description":"Per student per year inc GST"},"countriesSupported":"AU","provider":{"@type":"Organization","name":"Luck Dragon Pty Ltd","taxID":"64 697 434 898","address":{"@type":"PostalAddress","addressRegion":"VIC","addressCountry":"AU"}}}<\/script>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0d1b3e;
    --blue: #1a56db;
    --gold: #f59e0b;
    --gold-dark: #d97706;
    --text: #0f172a;
    --muted: #475569;
    --bg: #f8fafc;
    --card-bg: #ffffff;
    --border: #e2e8f0;
    --radius: 12px;
  }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
  a { color: inherit; text-decoration: none; }

  /* HEADER / HERO */
  .hero {
    background: linear-gradient(135deg, var(--navy) 0%, #1a3a6e 60%, var(--blue) 100%);
    color: #fff; padding: 64px 24px 88px; text-align: center; position: relative; overflow: hidden;
  }
  .hero::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
    height: 40px; background: var(--bg); clip-path: ellipse(55% 100% at 50% 100%);
  }
  .hero-badge {
    display: inline-block; background: rgba(245,158,11,.18); border: 1px solid rgba(245,158,11,.4);
    color: #fcd34d; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;
    letter-spacing: .4px; margin-bottom: 20px;
  }
  .hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; line-height: 1.15; margin-bottom: 20px; }
  .hero p { font-size: 1.1rem; color: rgba(255,255,255,.8); max-width: 560px; margin: 0 auto 32px; }
  .trust-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 20px; margin-bottom: 36px; }
  .trust-pill {
    display: flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(255,255,255,.75);
  }
  .trust-pill::before { content: '\u2713'; color: #34d399; font-weight: 700; }
  .cta-row { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
  .btn-primary {
    background: var(--gold); color: var(--navy); padding: 14px 28px; border-radius: 8px;
    font-size: 1rem; font-weight: 700; transition: background .2s; display: inline-block;
  }
  .btn-primary:hover { background: var(--gold-dark); }
  .btn-ghost {
    border: 1.5px solid rgba(255,255,255,.35); color: #fff; padding: 13px 26px; border-radius: 8px;
    font-size: 1rem; font-weight: 600; transition: border-color .2s; display: inline-block;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,.7); }

  /* NAV */
  .top-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 24px; background: var(--navy); position: sticky; top: 0; z-index: 100;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  .nav-logo { color: #fff; font-weight: 800; font-size: 1.1rem; display: flex; align-items: center; gap: 8px; }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 20px; }
  .nav-links a { color: rgba(255,255,255,.75); font-size: 14px; font-weight: 500; }
  .nav-links a:hover { color: #fff; }
  .nav-cta { background: var(--gold); color: var(--navy); padding: 8px 18px; border-radius: 6px; font-size: 14px; font-weight: 700; }

  /* SECTIONS */
  section { padding: 64px 24px; }
  .section-inner { max-width: 1060px; margin: 0 auto; }
  .section-tag { font-size: 13px; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .section-h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; margin-bottom: 12px; }
  .section-lead { color: var(--muted); font-size: 1.05rem; max-width: 580px; margin-bottom: 40px; }

  /* FEATURES GRID */
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .feat-card {
    background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 24px; transition: box-shadow .2s;
  }
  .feat-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,.08); }
  .feat-icon { width:52px; height:52px; display:flex; align-items:center; justify-content:center; background:var(--blue-light,#e8f0fe); border-radius:14px; margin-bottom:16px; color:var(--blue,#1a56db); flex-shrink:0; }
  .feat-title { font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
  .feat-desc { font-size: .92rem; color: var(--muted); }
  .badge-new { background: #dcfce7; color: #15803d; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 10px; text-transform: uppercase; letter-spacing: .5px; }

  /* DEMO */
  .demo-bg { background: var(--navy); color: #fff; }
  .demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
  .demo-card {
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
    border-radius: var(--radius); padding: 20px; text-align: center; transition: background .2s;
  }
  .demo-card:hover { background: rgba(255,255,255,.1); }
  .demo-card .demo-label { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.45); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .demo-card .demo-name { font-size: 1rem; font-weight: 700; margin-bottom: 6px; }
  .demo-card .demo-desc { font-size: .85rem; color: rgba(255,255,255,.6); margin-bottom: 14px; }
  .demo-link { background: rgba(245,158,11,.9); color: var(--navy); padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 700; display: inline-block; }
  .demo-link:hover { background: var(--gold); }

  /* HOW IT WORKS */
  .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 28px; counter-reset: steps; }
  .step { counter-increment: steps; position: relative; padding-top: 48px; }
  .step::before {
    content: counter(steps); position: absolute; top: 0; left: 0;
    width: 40px; height: 40px; background: var(--blue); color: #fff;
    border-radius: 50%; font-size: 1.1rem; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
  }
  .step h3 { font-size: 1rem; font-weight: 700; margin-bottom: 6px; }
  .step p { font-size: .92rem; color: var(--muted); }

  /* PRICING */
  #pricing { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); }
  .pricing-card {
    background: var(--card-bg); border: 2px solid var(--blue); border-radius: 16px;
    max-width: 520px; margin: 0 auto; padding: 40px; box-shadow: 0 12px 40px rgba(26,86,219,.12);
  }
  .price-tag { font-size: 3rem; font-weight: 900; color: var(--blue); line-height: 1; }
  .price-tag small { font-size: 1rem; font-weight: 500; color: var(--muted); }
  .price-desc { color: var(--muted); font-size: .95rem; margin: 8px 0 24px; }
  .feature-list { list-style: none; margin-bottom: 28px; }
  .feature-list li { padding: 7px 0; font-size: .95rem; display: flex; align-items: flex-start; gap: 10px; border-bottom: 1px solid var(--border); }
  .feature-list li:last-child { border: none; }
  .feature-list li::before { content: '\u2713'; color: #16a34a; font-weight: 800; flex-shrink: 0; margin-top: 2px; }
  .pricing-cta {
    display: block; text-align: center; background: var(--blue); color: #fff;
    padding: 15px; border-radius: 8px; font-size: 1rem; font-weight: 700; margin-bottom: 12px;
    transition: background .2s;
  }
  .pricing-cta:hover { background: #1e40af; }
  .pricing-note { text-align: center; font-size: .85rem; color: var(--muted); }

  /* TOOLS */
  .tools-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
  .tool-card {
    border: 1px solid var(--border); border-radius: var(--radius); padding: 24px;
    background: var(--card-bg); transition: box-shadow .2s;
  }
  .tool-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.07); }
  .tool-name { font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; }
  .tool-desc { font-size: .9rem; color: var(--muted); margin-bottom: 14px; }
  .tool-link { font-size: .9rem; font-weight: 600; color: var(--blue); }

  /* FOOTER */
  footer { background: var(--navy); color: rgba(255,255,255,.6); padding: 40px 24px; text-align: center; font-size: .88rem; }
  footer a { color: rgba(255,255,255,.6); }
  footer a:hover { color: #fff; }
  .footer-links { display: flex; flex-wrap: wrap; gap: 16px 24px; justify-content: center; margin-bottom: 16px; }

  /* RESPONSIVE */
  @media (max-width: 600px) {
    .top-nav .nav-links { display: none; }
    .hero h1 { font-size: 1.9rem; }
  }
</style>
</head>
<body>

<nav class="top-nav">
  <div class="nav-logo">School Sport <span>Portal</span></div>
  <div class="nav-links">
    <a href="#features">Features</a>
    <a href="#demo">Demo</a>
    <a href="#pricing">Pricing</a>
    <a href="https://carnivaltiming.com">Timing</a>
  </div>
  <a href="#pricing" class="nav-cta">Get started</a>
</nav>

<section class="hero">
  <div class="hero-badge">\u{1F3C5} Built for Australian PE teachers</div>
  <h1>School sport,<br>all in one place</h1>
  <p>Live carnival timing, house points, event programs, results and district qualifiers \u2014 for the price of a can of Milo per student.</p>
  <div class="trust-row">
    <span class="trust-pill">Privacy Act compliant</span>
    <span class="trust-pill">No app install needed</span>
    <span class="trust-pill">Works on any device</span>
    <span class="trust-pill">$1 per student per year</span>
  </div>
  <div class="cta-row">
    <a href="#pricing" class="btn-primary">Get your school set up \u2192</a>
    <a href="#demo" class="btn-ghost">See a demo first</a>
  </div>
</section>

<section id="features">
  <div class="section-inner">
    <div class="section-tag">Features</div>
    <h2 class="section-h2">Everything a PE teacher needs</h2>
    <p class="section-lead">One platform from the starting gun to the trophy presentation. No spreadsheet juggling, no paper forms.</p>
    <div class="features-grid">
      <div class="feat-card">
        <div class="feat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9.5 2.5h5"/><path d="M12 2.5V5"/></svg></div>
        <div class="feat-title">Live Carnival Timing</div>
        <p class="feat-desc">Record results heat by heat from any phone or tablet. Parents and staff see live updates the moment you hit Save.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></div>
        <div class="feat-title">Results &amp; Records</div>
        <p class="feat-desc">Every result is stored and searchable. School records update automatically. Export to PDF in seconds.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
        <div class="feat-title">House Points <span class="badge-new">New</span></div>
        <p class="feat-desc">Points awarded automatically per place (8\u20136\u20135\u20134\u20133\u20132\u20131). Live standings visible to all on the day.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
        <div class="feat-title">District Qualifiers</div>
        <p class="feat-desc">Automatic qualifier tracking based on your district cutoff standards. No manual cross-referencing.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg></div>
        <div class="feat-title">Event Program Builder <span class="badge-new">New</span></div>
        <p class="feat-desc">Build your carnival program before the day. The Next Event button auto-fills age group, gender and event \u2014 keeping things moving.</p>
      </div>
      <div class="feat-card">
        <div class="feat-icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></div>
        <div class="feat-title">School &amp; District Pages</div>
        <p class="feat-desc">Public-facing pages for your school, district, division and region. Share results with parents and other schools instantly.</p>
      </div>
    </div>
  </div>
</section>

<section id="demo" class="demo-bg">
  <div class="section-inner">
    <div class="section-tag" style="color:#93c5fd">See it in action</div>
    <h2 class="section-h2" style="color:#fff">Live demos \u2014 explore now</h2>
    <p class="section-lead" style="color:rgba(255,255,255,.7);margin-bottom:36px">Tap any demo to see exactly what parents, teachers and administrators see.</p>
    <div class="demo-grid">
      <div class="demo-card">
        <div class="demo-label">School View</div>
        <div class="demo-name">Williamstown Primary</div>
        <div class="demo-desc">Results, house standings, qualifier lists</div>
        <a href="https://schoolsportportal.com.au/demo-school" class="demo-link">Open demo \u2192</a>
      </div>
      <div class="demo-card">
        <div class="demo-label">District View</div>
        <div class="demo-name">Altona District</div>
        <div class="demo-desc">District carnival results and records</div>
        <a href="https://schoolsportportal.com.au/demo-district" class="demo-link">Open demo \u2192</a>
      </div>
      <div class="demo-card">
        <div class="demo-label">Division View</div>
        <div class="demo-name">Hobsons Bay Division</div>
        <div class="demo-desc">Division-level results and qualifier tracking</div>
        <a href="https://schoolsportportal.com.au/demo-division" class="demo-link">Open demo \u2192</a>
      </div>
      <div class="demo-card">
        <div class="demo-label">Region View</div>
        <div class="demo-name">Metropolitan Region</div>
        <div class="demo-desc">Regional competition results and standings</div>
        <a href="https://schoolsportportal.com.au/demo-region" class="demo-link">Open demo \u2192</a>
      </div>
    </div>
  </div>
</section>


<section id="flow-demo" style="background:#0d1117;padding:64px 0 80px;border-top:1px solid #21262d">
  <div class="section-inner" style="max-width:960px">
    <div class="section-tag" style="color:#14b8a6">See the connection</div>
    <h2 class="section-h2" style="color:#f0f6fc">Timing flows straight to the school page</h2>
    <p class="section-lead" style="color:rgba(255,255,255,.65);margin-bottom:48px">
      Record a finish in Carnival Timing \u2014 it appears on the school results board in real time. No exports, no copy-paste, no delays.
    </p>

    <!-- Split screen demo -->
    <div id="flow-container" style="display:flex;gap:0;align-items:stretch;border-radius:16px;overflow:hidden;box-shadow:0 0 0 1px #30363d,0 24px 64px rgba(0,0,0,.6)">

      <!-- LEFT: CT Phone -->
      <div style="flex:1;background:#161b22;padding:0;display:flex;flex-direction:column">
        <div style="background:#21262d;padding:12px 16px;border-bottom:1px solid #30363d;display:flex;align-items:center;gap:10px">
          <div style="width:8px;height:8px;border-radius:50%;background:#3fb950"></div>
          <span style="color:#8b949e;font-size:11px;font-family:monospace">carnivaltiming.com</span>
          <span style="margin-left:auto;background:#14b8a6;color:#000;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px">LIVE</span>
        </div>
        <div style="padding:20px;flex:1">
          <div style="color:#8b949e;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Race Control</div>
          <div style="color:#f0f6fc;font-size:15px;font-weight:700;margin-bottom:2px" id="fd-event">100m Sprint \u2014 Year 5/6 Girls</div>
          <div style="color:#8b949e;font-size:11px;margin-bottom:16px">Heat 1 of 2</div>

          <!-- Timer display -->
          <div style="background:#0d1117;border-radius:10px;padding:16px;margin-bottom:16px;text-align:center;border:1px solid #30363d">
            <div style="color:#8b949e;font-size:10px;margin-bottom:4px">ELAPSED</div>
            <div id="fd-timer" style="font-size:36px;font-weight:900;font-family:monospace;color:#14b8a6;letter-spacing:.05em">00:00.00</div>
            <div id="fd-status" style="color:#8b949e;font-size:11px;margin-top:4px">Waiting to arm\u2026</div>
          </div>

          <!-- Results being recorded -->
          <div style="color:#8b949e;font-size:10px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Finishers</div>
          <div id="fd-finishers" style="display:flex;flex-direction:column;gap:6px;min-height:120px">
            <div style="color:#30363d;font-size:12px;text-align:center;padding:20px 0">No finishers yet</div>
          </div>
        </div>
      </div>

      <!-- MIDDLE: Arrow -->
      <div style="width:56px;background:#0d1117;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;flex-shrink:0;border-left:1px solid #21262d;border-right:1px solid #21262d">
        <div id="fd-pulse" style="width:32px;height:32px;border-radius:50%;background:#21262d;display:flex;align-items:center;justify-content:center;transition:all .3s">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#30363d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div id="fd-sync-label" style="color:#30363d;font-size:8px;text-transform:uppercase;letter-spacing:.05em;writing-mode:vertical-rl;text-orientation:mixed">syncing</div>
      </div>

      <!-- RIGHT: School results page -->
      <div style="flex:1;background:#fff;display:flex;flex-direction:column">
        <div style="background:#1e3a5f;padding:12px 16px;display:flex;align-items:center;gap:10px">
          <span style="color:rgba(255,255,255,.5);font-size:11px;font-family:monospace">schoolsportportal.com.au/demo-school</span>
        </div>
        <div style="padding:20px;flex:1">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
            <div style="width:28px;height:28px;background:#1e3a5f;border-radius:6px;display:flex;align-items:center;justify-content:center">
              <span style="font-size:14px">\u{1F3EB}</span>
            </div>
            <div>
              <div style="font-size:13px;font-weight:700;color:#1e3a5f">Williamstown Primary</div>
              <div style="font-size:10px;color:#6b7280">Athletics Carnival 2026</div>
            </div>
          </div>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 12px;margin-bottom:12px;display:flex;align-items:center;gap:8px">
            <div style="width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0" id="fd-live-dot"></div>
            <span style="font-size:11px;color:#166534;font-weight:600">Live \u2014 results updating now</span>
          </div>

          <div style="font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px" id="fd-school-event">100m Sprint \u2014 Yr 5/6 Girls</div>

          <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
            <div style="display:grid;grid-template-columns:32px 1fr 72px;background:#f9fafb;padding:6px 10px;border-bottom:1px solid #e5e7eb">
              <span style="font-size:9px;font-weight:700;color:#9ca3af">#</span>
              <span style="font-size:9px;font-weight:700;color:#9ca3af">ATHLETE</span>
              <span style="font-size:9px;font-weight:700;color:#9ca3af;text-align:right">TIME</span>
            </div>
            <div id="fd-results" style="min-height:120px">
              <div style="padding:20px;text-align:center;color:#d1d5db;font-size:12px">Waiting for results\u2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-top:32px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="https://schoolsportportal.com.au/demo-school" target="_blank"
         style="display:inline-flex;align-items:center;gap:8px;background:#1e3a5f;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
        View full school demo page \u2192
      </a>
      <a href="https://carnivaltiming.com" target="_blank"
         style="display:inline-flex;align-items:center;gap:8px;background:#14b8a6;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">
        Try Carnival Timing \u2192
      </a>
    </div>
  </div>
</section>

<script>
(function() {
  // Demo sequence
  const athletes = [
    { name: 'Mia Chen', house: 'Blue', time: '14.82' },
    { name: 'Zara Patel', house: 'Red', time: '15.14' },
    { name: 'Isla Murray', house: 'Green', time: '15.39' },
    { name: 'Sophie Tran', house: 'Yellow', time: '15.71' },
    { name: 'Ava Williams', house: 'Blue', time: '16.05' },
  ];
  const houseColors = { Blue: '#3b82f6', Red: '#ef4444', Green: '#22c55e', Yellow: '#eab308' };

  const timerEl = document.getElementById('fd-timer');
  const statusEl = document.getElementById('fd-status');
  const finishersEl = document.getElementById('fd-finishers');
  const resultsEl = document.getElementById('fd-results');
  const pulseEl = document.getElementById('fd-pulse');
  const syncLabel = document.getElementById('fd-sync-label');
  const liveDot = document.getElementById('fd-live-dot');

  let running = false, startMs = 0, rafId = null, phase = 0, recorded = [], seqTimeout = null;

  function fmtTime(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const cents = Math.floor((ms % 1000) / 10);
    return \`\${String(m).padStart(2,'0')}:\${String(s % 60).padStart(2,'0')}.\${String(cents).padStart(2,'0')}\`;
  }

  function tick() {
    if (!running) return;
    timerEl.textContent = fmtTime(Date.now() - startMs);
    rafId = requestAnimationFrame(tick);
  }

  function addFinisher(athlete, time) {
    const place = recorded.length + 1;
    recorded.push({ ...athlete, time, place });

    // CT side
    if (finishersEl.querySelector('[style*="color:#30363d"]')) finishersEl.innerHTML = '';
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:8px;background:#0d1117;border-radius:6px;padding:8px 10px;opacity:0;transition:opacity .4s,transform .4s;transform:translateY(8px)';
    row.innerHTML = \`
      <span style="color:#f0f6fc;font-size:12px;font-weight:700;width:18px">\${place}</span>
      <span style="color:#f0f6fc;font-size:12px;flex:1">\${athlete.name}</span>
      <span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:10px;background:\${houseColors[athlete.house]}22;color:\${houseColors[athlete.house]}">\${athlete.house}</span>
      <span style="color:#14b8a6;font-size:13px;font-weight:700;font-family:monospace">\${time}s</span>
    \`;
    finishersEl.appendChild(row);
    setTimeout(() => { row.style.opacity = '1'; row.style.transform = 'none'; }, 30);

    // Pulse the sync arrow
    pulseEl.style.background = '#14b8a6';
    pulseEl.style.transform = 'scale(1.2)';
    pulseEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    syncLabel.style.color = '#14b8a6';
    setTimeout(() => {
      pulseEl.style.background = '#21262d';
      pulseEl.style.transform = 'none';
      pulseEl.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#30363d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      syncLabel.style.color = '#30363d';
    }, 600);

    // School side \u2014 add result 400ms later (simulating network)
    setTimeout(() => {
      if (resultsEl.querySelector('[style*="color:#d1d5db"]')) resultsEl.innerHTML = '';
      const sRow = document.createElement('div');
      sRow.style.cssText = \`display:grid;grid-template-columns:32px 1fr 72px;padding:8px 10px;border-bottom:1px solid #f3f4f6;align-items:center;background:\${place === 1 ? '#fefce8' : '#fff'};opacity:0;transition:opacity .4s,background 1s\`;
      sRow.innerHTML = \`
        <span style="font-size:12px;font-weight:700;color:\${place === 1 ? '#92400e' : '#6b7280'}">\${place}</span>
        <div>
          <div style="font-size:12px;font-weight:600;color:#111827">\${athlete.name}</div>
          <div style="font-size:9px;color:\${houseColors[athlete.house]};font-weight:700">\${athlete.house} House</div>
        </div>
        <span style="font-size:13px;font-weight:700;color:#1e3a5f;text-align:right;font-family:monospace">\${time}s</span>
      \`;
      resultsEl.appendChild(sRow);
      setTimeout(() => { sRow.style.opacity = '1'; }, 30);
      setTimeout(() => { if (place===1) sRow.style.background = '#fff'; }, 1200);

      // Pulse live dot
      liveDot.style.transform = 'scale(1.6)';
      setTimeout(() => { liveDot.style.transform = 'none'; }, 400);
    }, 400);
  }

  function resetDemo() {
    recorded = [];
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    if (seqTimeout) clearTimeout(seqTimeout);
    timerEl.textContent = '00:00.00';
    statusEl.textContent = 'Waiting to arm\u2026';
    finishersEl.innerHTML = '<div style="color:#30363d;font-size:12px;text-align:center;padding:20px 0">No finishers yet</div>';
    resultsEl.innerHTML = '<div style="padding:20px;text-align:center;color:#d1d5db;font-size:12px">Waiting for results\u2026</div>';
  }

  function runSequence() {
    resetDemo();

    // Phase 1: ARM
    setTimeout(() => {
      statusEl.textContent = '\u{1F534} Armed \u2014 race about to start';
      statusEl.style.color = '#ef4444';
    }, 1200);

    // Phase 2: GO
    setTimeout(() => {
      statusEl.textContent = '\u{1F7E2} GO! Race running\u2026';
      statusEl.style.color = '#3fb950';
      running = true;
      startMs = Date.now();
      tick();
    }, 2800);

    // Phase 3\u20137: athletes finish one by one
    const finishTimes = [14820, 15140, 15390, 15710, 16050]; // ms after GO
    athletes.forEach((a, i) => {
      setTimeout(() => {
        addFinisher(a, a.time);
        if (i === athletes.length - 1) {
          setTimeout(() => {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            timerEl.textContent = a.time + '.00';
            statusEl.textContent = '\u2705 Race complete \u2014 results published';
            statusEl.style.color = '#3fb950';
            // Restart after pause
            seqTimeout = setTimeout(runSequence, 5000);
          }, 800);
        }
      }, 2800 + finishTimes[i]);
    });
  }

  // Start when section scrolls into view
  const section = document.getElementById('flow-demo');
  if (!section) return;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      setTimeout(runSequence, 600);
    }
  }, { threshold: 0.3 });
  obs.observe(section);
})();
<\/script>


<section id="how">
  <div class="section-inner">
    <div class="section-tag">How it works</div>
    <h2 class="section-h2">Up and running in minutes</h2>
    <p class="section-lead">No IT department required. If you can use a smartphone, you can run a carnival with Portal.</p>
    <div class="steps">
      <div class="step">
        <h3>Contact us</h3>
        <p>Email or fill out the form below. We'll set up your school's account \u2014 usually within 24 hours.</p>
      </div>
      <div class="step">
        <h3>Configure your carnival</h3>
        <p>Enter your houses, build your event program and set your district qualifier standards.</p>
      </div>
      <div class="step">
        <h3>Run your carnival</h3>
        <p>Record results heat by heat from your phone. Live updates appear instantly for parents and staff.</p>
      </div>
      <div class="step">
        <h3>Share the results</h3>
        <p>Results are permanently stored at your school's page. Share the link \u2014 no login needed to view.</p>
      </div>
    </div>
  </div>
</section>

<section id="contact" style="background:#f0f9ff;border-top:1px solid #e0f2fe;border-bottom:1px solid #e0f2fe">
  <div class="section-inner" style="max-width:680px">
    <div class="section-tag" style="text-align:center">Get in touch</div>
    <h2 class="section-h2" style="text-align:center">Tell us about your school</h2>
    <p class="section-lead" style="text-align:center;margin-left:auto;margin-right:auto;margin-bottom:32px">Fill in the form, we'll be back within one school day with your portal walkthrough.</p>
    <form id="ssp-contact-form" style="background:#fff;border-radius:14px;padding:32px;box-shadow:0 6px 24px rgba(13,27,62,.06);display:grid;gap:16px" onsubmit="return submitContactForm(event)">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <label style="display:flex;flex-direction:column;gap:6px;font-size:.86rem;font-weight:600;color:#0f172a">Your name<input name="name" required type="text" placeholder="e.g. Patrick Gallivan" style="padding:11px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:.95rem;font-family:inherit"></label>
        <label style="display:flex;flex-direction:column;gap:6px;font-size:.86rem;font-weight:600;color:#0f172a">School name<input name="school" required type="text" placeholder="e.g. Williamstown Primary" style="padding:11px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:.95rem;font-family:inherit"></label>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <label style="display:flex;flex-direction:column;gap:6px;font-size:.86rem;font-weight:600;color:#0f172a">Email<input name="email" required type="email" placeholder="you@school.edu.au" style="padding:11px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:.95rem;font-family:inherit"></label>
        <label style="display:flex;flex-direction:column;gap:6px;font-size:.86rem;font-weight:600;color:#0f172a">Role<input name="role" type="text" placeholder="PE coordinator" style="padding:11px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:.95rem;font-family:inherit"></label>
      </div>
      <label style="display:flex;flex-direction:column;gap:6px;font-size:.86rem;font-weight:600;color:#0f172a">Number of students<input name="students" type="text" placeholder="e.g. 440" style="padding:11px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:.95rem;font-family:inherit"></label>
      <label style="display:flex;flex-direction:column;gap:6px;font-size:.86rem;font-weight:600;color:#0f172a">Anything else? (optional)<textarea name="message" rows="3" placeholder="What carnivals do you run? Anything we should know?" style="padding:11px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:.95rem;font-family:inherit;resize:vertical"></textarea></label>
      <input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
      <button type="submit" id="ssp-submit-btn" style="background:#1a56db;color:#fff;padding:14px 24px;border:none;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;font-family:inherit">Send my school's details \u2192</button>
      <p id="ssp-form-msg" style="display:none;font-size:.9rem;line-height:1.5;padding:12px;border-radius:8px"></p>
      <p style="font-size:.78rem;color:#64748b;text-align:center;margin:0">Or just email <a href="mailto:info@schoolsportportal.com.au" style="color:#1a56db;font-weight:600">info@schoolsportportal.com.au</a> \u2014 same person on the other end.</p>
    </form>
  </div>
</section>

<section id="pricing">
  <div class="section-inner">
    <div class="section-tag" style="text-align:center">Pricing</div>
    <h2 class="section-h2" style="text-align:center">Straightforward pricing</h2>
    <p class="section-lead" style="text-align:center;margin-left:auto;margin-right:auto">One school, one price. No hidden fees, no per-feature add-ons.</p>
    <div class="pricing-card">
      <div class="price-tag">$1 <small>/ student / year <span style="font-size:.65rem;color:#94a3b8;font-weight:400">(inc GST)</span></small></div>
      <p class="price-desc">A 400-student school pays <strong>$400/year inc GST</strong> ($364 ex GST + $36 GST) \u2014 less than $1.10 per day. Tax invoice with GST issued by Stripe on payment.</p>
      <ul class="feature-list">
        <li>Unlimited carnivals \u2014 athletics, swimming, cross country</li>
        <li>Live carnival timing with real-time parent updates</li>
        <li>Automatic house points tally (1\u20137 place scoring)</li>
        <li>Event program builder with one-tap Next Event</li>
        <li>DNS / DNF / DQ status tracking per athlete</li>
        <li>District qualifier automatic flagging</li>
        <li>School, district, division &amp; region public pages</li>
        <li>All results stored and searchable forever</li>
        <li>Privacy Act compliant \u2014 no student data sold or shared</li>
        <li>Works on any device \u2014 no app install</li>
      </ul>
      <a href="mailto:info@schoolsportportal.com.au?subject=School%20Sport%20Portal%20signup&amp;body=Hi%20Paddy%2C%0A%0AWe%27d%20love%20to%20set%20up%20School%20Sport%20Portal%20for%20our%20school.%0A%0ASchool%20name%3A%20%0ANumber%20of%20students%3A%20%0AContact%20name%3A%20%0A%0AThanks" class="pricing-cta">
        Get your school set up \u2192
      </a>
      
    </div>
    <div style="max-width:520px;margin:24px auto 0;padding:18px 24px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;text-align:center">
      <p style="font-size:.85rem;color:#64748b;margin:0 0 12px"><strong style="color:#0f172a">Just want to try one carnival first?</strong> Buy a Carnival Timing access code \u2014 self-serve, instant code email.</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <a href="https://buy.stripe.com/8x26oGgux9IT3wQckm9IQ05" target="_blank" style="background:#1a56db;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:.85rem">Single Carnival \u2014 $49</a>
        <a href="https://buy.stripe.com/7sY3cu3HL8EP4AUesu9IQ06" target="_blank" style="background:#16a34a;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:.85rem">Annual Pass \u2014 $149</a>
      </div>
      <p style="font-size:.72rem;color:#94a3b8;margin:10px 0 0">Both inc GST. Tax invoice issued by Stripe with our ABN.</p>
    </div>
  </div>
</section>

<section id="tools">
  <div class="section-inner">
    <div class="section-tag">The full toolkit</div>
    <h2 class="section-h2">More tools for sport administrators</h2>
    <p class="section-lead">School Sport Portal is part of a family of tools built specifically for Australian school sport.</p>
    <div class="tools-grid">
      <div class="tool-card">
        <div class="tool-name">\u{1F3C1} Carnival Timing</div>
        <div class="tool-desc">Standalone timing app for carnivals. Works with or without Portal. Free to use at carnivaltiming.com.</div>
        <a href="https://carnivaltiming.com" class="tool-link">carnivaltiming.com \u2192</a>
      </div>
      <div class="tool-card">
        <div class="tool-name">\u{1F5D3}\uFE0F Carnival Planner</div>
        <div class="tool-desc">Plan your draw, heat sheets and timetable before carnival day. Integrates directly with Carnival Timing.</div>
        <a href="https://sportcarnival.com.au" class="tool-link">sportcarnival.com.au \u2192</a>
      </div>
      <div class="tool-card">
        <div class="tool-name">\u{1F4CA} School Sport Portal</div>
        <div class="tool-desc">The complete package \u2014 everything above plus persistent records, public pages and district integration.</div>
        <a href="#pricing" class="tool-link">See pricing above \u2192</a>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="footer-links">
    <a href="/privacy">Privacy Policy</a> &nbsp;&middot;&nbsp; <a href="/terms" style="color:rgba(255,255,255,.7);text-decoration:none;font-size:.8rem">Terms of Service</a>
    <a href="https://carnivaltiming.com">Carnival Timing</a>
    <a href="https://sportcarnival.com.au">Carnival Planner</a>
    <a href="mailto:info@schoolsportportal.com.au">Contact</a>
  </div>
  <p>\xA9 2026 Luck Dragon Pty Ltd &nbsp;\xB7&nbsp; ABN 64 697 434 898 &nbsp;\xB7&nbsp; schoolsportportal.com.au</p>
  <p style="margin-top:6px;font-size:.8rem">Student data is stored securely in Australia and never sold or shared. <a href="/privacy">Privacy Policy</a> &nbsp;&middot;&nbsp; <a href="/terms" style="color:rgba(255,255,255,.7);text-decoration:none;font-size:.8rem">Terms of Service</a> &nbsp;&middot;&nbsp; </p>
</footer>

<script>
async function submitContactForm(e){e.preventDefault();const form=document.getElementById('ssp-contact-form');const btn=document.getElementById('ssp-submit-btn');const msg=document.getElementById('ssp-form-msg');const data=Object.fromEntries(new FormData(form));btn.disabled=true;btn.textContent='Sending\u2026';msg.style.display='none';try{const r=await fetch('https://ssp-contact.pgallivan.workers.dev/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await r.json();if(j.ok){msg.style.display='block';msg.style.background='#dcfce7';msg.style.color='#15803d';msg.style.border='1px solid #86efac';msg.textContent='\u2713 Got it. We'll be in touch within one school day. Check your email \u2014 you've got a confirmation on the way.';form.reset();btn.style.display='none';}else{throw new Error(j.error||'Send failed');}}catch(err){msg.style.display='block';msg.style.background='#fef2f2';msg.style.color='#991b1b';msg.style.border='1px solid #fecaca';msg.textContent='\u26A0 Couldn't send right now \u2014 please email info@schoolsportportal.com.au directly. Sorry about that.';btn.disabled=false;btn.textContent='Send my school's details \u2192';}return false;}
<\/script>
<script>(function(){if(localStorage.getItem("ssp_cookies_ack")==="1")return;var d=document.createElement("div");d.id="ssp-cookie-banner";d.style.cssText="position:fixed;bottom:0;left:0;right:0;background:#0d1b3e;color:#fff;padding:14px 18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:center;z-index:9999;font-family:-apple-system,sans-serif;font-size:13px;box-shadow:0 -4px 20px rgba(0,0,0,.2)";d.innerHTML='<span>We use one essential session cookie when you sign in to a private staff portal. No tracking, no advertising. <a href=\\"/cookies\\" style=\\"color:#fcd34d;text-decoration:underline\\">Cookie Policy</a>.</span><button onclick=\\"localStorage.setItem(&quot;ssp_cookies_ack&quot;,&quot;1&quot;);document.getElementById(&quot;ssp-cookie-banner&quot;).remove()\\" style=\\"background:#f59e0b;color:#0d1b3e;border:none;padding:8px 16px;border-radius:6px;font-weight:700;cursor:pointer;font-size:13px\\">OK, got it</button>';document.body.appendChild(d);})();<\/script>
</body>
</html>
`;
var DEMO_SCHOOL = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Riverside Primary School \u2014 School Sport Portal</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4f8; color: #0f172a; }

  .site-header {
    background: linear-gradient(135deg, #0d1b3e 0%, #1a3a6e 60%, #1a56db 100%);
    color: #fff;
    padding: 52px 24px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .site-header::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 32px;
    background: #f0f4f8;
    clip-path: ellipse(55% 100% at 50% 100%);
  }
  .header-badge {
    display: inline-block;
    background: rgba(245,158,11,.15);
    border: 1px solid rgba(245,158,11,.4);
    color: #f59e0b;
    font-size: 11px; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase;
    padding: 4px 12px; border-radius: 20px; margin-bottom: 14px;
  }
  .site-header h1 { font-size: clamp(24px, 5vw, 38px); font-weight: 900; letter-spacing: -.02em; margin-bottom: 8px; }
  .site-header p { font-size: 14px; opacity: .72; max-width: 480px; margin: 0 auto; line-height: 1.6; }

  .container { max-width: 880px; margin: 0 auto; padding: 0 20px; }

  .section { margin: 44px 0; }
  .section-title {
    font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
    color: #64748b; margin-bottom: 14px; padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
  }

  /* Sport cards */
  .sport-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
  .sport-card {
    background: #fff; border-radius: 14px; padding: 20px 16px;
    text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,.07);
    transition: transform .15s;
  }
  .sport-card:hover { transform: translateY(-2px); }
  .sport-chip { font-size:11px;font-weight:800;letter-spacing:.06em;color:#1a56db;background:#eff6ff;padding:5px 10px;border-radius:8px;display:inline-block;margin-bottom:8px; }
  .sport-card .sport-emoji { margin-bottom:8px;display:flex;align-items:center;justify-content:center; }
  .sport-card .sport-name { font-size: 13px; font-weight: 700; }
  .sport-card .sport-detail { font-size: 11px; color: #94a3b8; margin-top: 3px; }

  /* Highlight card */
  .highlight-card {
    background: linear-gradient(135deg, #0d1b3e, #1a3a6e);
    color: #fff;
    border-radius: 16px;
    padding: 28px 32px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 4px 20px rgba(13,27,62,.25);
  }
  .highlight-card .hc-icon { font-size:44px; flex-shrink:0; display:flex; align-items:center; justify-content:center; color:#60a5fa; }
  .highlight-card h3 { font-size: 18px; font-weight: 800; margin-bottom: 6px; }
  .highlight-card p { font-size: 13px; opacity: .75; line-height: 1.6; }

  /* Info cards */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }
  .info-card {
    background: #fff;
    border-radius: 14px;
    padding: 22px 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,.07);
  }
  .info-card h3 { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
  .info-card p { font-size: 13px; color: #64748b; line-height: 1.6; }

  /* Connected sites */
  .sites-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }
  .site-link {
    background: #fff; border-radius: 12px; padding: 16px 20px;
    display: flex; align-items: center; gap: 12px;
    text-decoration: none; color: #0f172a;
    box-shadow: 0 2px 8px rgba(0,0,0,.06);
    border: 2px solid transparent;
    transition: border-color .15s, transform .15s;
  }
  .site-link:hover { border-color: #1a56db; transform: translateY(-2px); }
  .site-link .site-icon { flex-shrink:0; display:flex; align-items:center; justify-content:center; color:#64748b; }
  .site-link .site-label { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #94a3b8; margin-bottom: 2px; }
  .site-link .site-name { font-size: 13px; font-weight: 700; }
  .site-link .site-arrow { margin-left: auto; color: #94a3b8; font-size: 14px; flex-shrink: 0; }

  .notice {
    background: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px;
    padding: 16px 20px; font-size: 13px; color: #92400e;
    display: flex; gap: 10px; align-items: flex-start;
  }

  .site-footer {
    background: #0d1b3e; color: rgba(255,255,255,.45);
    text-align: center; padding: 24px; font-size: 12px; margin-top: 60px;
  }

  @media (max-width: 500px) {
    .highlight-card { flex-direction: column; text-align: center; }
  }
</style>
</head>
<body>
<div style="background:#f59e0b;color:#0d1b3e;text-align:center;padding:10px 16px;font-size:13px;font-weight:700;">
  \u26A0 DEMO PAGE \u2014 fictional data. Real school pages are unlisted, visible only to logged-in staff. <a href="/" style="color:#0d1b3e;text-decoration:underline;">\u2190 Back to portal</a>
</div>

<!-- Shared nav auto-injects here -->
<script data-site="demo-school" src="https://schoolsportportal.com.au/schoolsportportal-nav.js"><\/script>

<header class="site-header">
  <div class="header-badge">Riverside District</div>
  <h1>Riverside Primary School</h1>
  <p>School sport news, team selections, and competition information for Riverside Primary School students.</p>
</header>

<main class="container">

  <div class="section">
    <div class="highlight-card">
      <span class="hc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="6"/><path d="M9 3h6l2 5H7z"/></svg></span>
      <div>
        <h3>Sport at Riverside Primary</h3>
        <p>Our students compete across a full range of school sports at district, division, and regional level throughout the year. Check this page for updates on carnivals, team selections, and results.</p>
      </div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Notice</p>
    <div class="notice">
      <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></span>
      <span>Welcome to the Riverside Primary sport page. Upcoming events, team lists, and results will be posted here throughout the year.</span>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Sports We Compete In</p>
    <div class="sport-grid">
      <div class="sport-card"><div class="sport-chip">ATH</div><div class="sport-name">Athletics</div><div class="sport-detail">District Carnival</div></div>
      <div class="sport-card"><div class="sport-chip">SWIM</div><div class="sport-name">Swimming</div><div class="sport-detail">District Carnival</div></div>
      <div class="sport-card"><div class="sport-chip">XC</div><div class="sport-name">Cross Country</div><div class="sport-detail">District Carnival</div></div>
      <div class="sport-card"><div class="sport-chip">FOOTY</div><div class="sport-name">Football</div><div class="sport-detail">District Comp</div></div>
      <div class="sport-card"><div class="sport-chip">BBALL</div><div class="sport-name">Basketball</div><div class="sport-detail">District Comp</div></div>
      <div class="sport-card"><div class="sport-chip">TEN</div><div class="sport-name">Tennis</div><div class="sport-detail">District Comp</div></div>
      <div class="sport-card"><div class="sport-chip">HOCK</div><div class="sport-name">Hockey</div><div class="sport-detail">District Comp</div></div>
      <div class="sport-card"><div class="sport-chip">VB</div><div class="sport-name">Volleyball</div><div class="sport-detail">District Comp</div></div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Carnivals</p>
    <div class="sites-row">
      <a class="site-link" href="https://sportcarnival.com.au/demo-school/athletics">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
        <div>
          <div class="site-label">SportCarnival \xB7 Athletics</div>
          <div class="site-name">Athletics Carnival</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">Term 2 2026</div>
        </div>
        <span class="site-arrow">\u2192</span>
      </a>
      <a class="site-link" href="https://sportcarnival.com.au/demo-school/swimming">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 17c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 7c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/></svg></span>
        <div>
          <div class="site-label">SportCarnival \xB7 Swimming</div>
          <div class="site-name">Swimming Carnival</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">Term 1 2026</div>
        </div>
        <span class="site-arrow">\u2192</span>
      </a>
      <a class="site-link" href="https://sportcarnival.com.au/demo-school/crosscountry">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 20v-8l-5-8-5 8v8"/><path d="M5 20h14"/><path d="M12 4v16"/></svg></span>
        <div>
          <div class="site-label">SportCarnival \xB7 Cross Country</div>
          <div class="site-name">Cross Country</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">Term 2 2026</div>
        </div>
        <span class="site-arrow">\u2192</span>
      </a>
    </div>
  </div>

  <div class="section">
    <p class="section-title">School Sport Information</p>
    <div class="info-grid">
      <div class="info-card">
        <h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Upcoming Events</h3>
        <p>Carnival and competition dates will be posted here each term. Keep an eye on this page and school newsletters.</p>
      </div>
      <div class="info-card">
        <h3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="6"/><path d="M9 3h6l2 5H7z"/></svg> Selection &amp; Trials</h3>
        <p>Students selected for district or division representative teams will be notified via school. Details here when available.</p>
      </div>
      <div class="info-card">
        <h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.38 2 2 0 0 1 3.62 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Contact</h3>
        <p>For school sport enquiries, speak with the PE teacher or school sport coordinator at Riverside Primary School.</p>
      </div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Connected Sites</p>
    <div class="sites-row">
      <a class="site-link" href="/demo-district">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <div><div class="site-label">District (Parent)</div><div class="site-name">Riverside District</div></div>
        <span class="site-arrow">\u2192</span>
      </a>
      <a class="site-link" href="/demo-division">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 3 4 11"/><polyline points="16 3 20 3 20 11"/><path d="M4 11a8 8 0 0 0 16 0"/><path d="M12 19v3"/><path d="M8 22h8"/></svg></span>
        <div><div class="site-label">Division</div><div class="site-name">Eastbay Division</div></div>
        <span class="site-arrow">\u2192</span>
      </a>
      <a class="site-link" href="/demo-region">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>
        <div><div class="site-label">Region</div><div class="site-name">Western Metro Region</div></div>
        <span class="site-arrow">\u2192</span>
      </a>
    </div>
  </div>

</main>

<footer class="site-footer">
  <p>schoolsportportal.com.au/demo-school &nbsp;\xB7&nbsp; Riverside District &nbsp;\xB7&nbsp; Eastbay Division</p>
</footer>

</body>
</html>

`;
var DEMO_DISTRICT = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Riverside District \u2014 School Sport Portal</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4f8; color: #0f172a; line-height: 1.5; }
  .demo-banner { background: #f59e0b; color: #0d1b3e; text-align: center; padding: 10px 16px; font-size: 13px; font-weight: 700; }
  .demo-banner a { color: #0d1b3e; text-decoration: underline; }
  .site-header { background: linear-gradient(135deg, #0d1b3e, #1a3a6e 60%, #1a56db); color: #fff; padding: 40px 24px 48px; text-align: center; position: relative; overflow: hidden; }
  .site-header::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:32px; background:#f0f4f8; clip-path:ellipse(55% 100% at 50% 100%); }
  .header-badge { display: inline-block; background: rgba(245,158,11,.15); border: 1px solid rgba(245,158,11,.4); color: #f59e0b; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
  .site-header h1 { font-size: clamp(22px, 5vw, 34px); font-weight: 900; letter-spacing: -.02em; }
  .site-header p { font-size: 14px; opacity: .78; max-width: 520px; margin: 8px auto 0; }
  .container { max-width: 960px; margin: 0 auto; padding: 0 20px; }
  .section { margin: 36px 0; }
  .section-title { font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #64748b; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #e2e8f0; }
  .card { background: #fff; border-radius: 14px; padding: 20px 22px; box-shadow: 0 2px 10px rgba(0,0,0,.07); margin-bottom: 14px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
  .stat { background: #fff; padding: 18px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
  .stat .num { font-size: 28px; font-weight: 900; color: #1a56db; }
  .stat .lab { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .08em; margin-top: 4px; }
  .school-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
  .school-tile { background: #fff; border-radius: 12px; padding: 16px 18px; box-shadow: 0 2px 8px rgba(0,0,0,.06); display: flex; gap: 12px; align-items: center; }
  .school-tile .ic { flex-shrink:0; display:flex; align-items:center; justify-content:center; color:#64748b; }
  .school-tile .nm { font-size: 13px; font-weight: 700; }
  .school-tile .en { font-size: 11px; color: #94a3b8; margin-top: 2px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 10px 8px; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; border-bottom: 2px solid #e2e8f0; }
  td { padding: 10px 8px; border-bottom: 1px solid #f1f5f9; }
  tr:hover td { background: #f8fafc; }
  .date-pill { background: #dbeafe; color: #1d4ed8; padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; }
  .status-pill { padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; display: inline-block; }
  .st-done { background: #d1fae5; color: #047857; }
  .st-now { background: #fef3c7; color: #a16207; }
  .st-next { background: #e5e7eb; color: #475569; }
  .connected { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
  .conn { background: #fff; border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 10px; text-decoration: none; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,.06); border: 2px solid transparent; transition: border-color .15s, transform .15s; }
  .conn:hover { border-color: #1a56db; transform: translateY(-2px); }
  .conn .ic { display:flex; align-items:center; justify-content:center; color:#64748b; }
  .conn .lab { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #94a3b8; }
  .conn .nm { font-size: 13px; font-weight: 700; }
  .site-footer { background: #0d1b3e; color: rgba(255,255,255,.45); text-align: center; padding: 22px; font-size: 12px; margin-top: 50px; }
</style>
</head>
<body>
<div class="demo-banner">\u26A0 DEMO PAGE \u2014 fictional data. Real district pages are unlisted, visible only to logged-in coordinators. <a href="/">\u2190 Back to portal</a></div>

<header class="site-header">
  <div class="header-badge">Eastbay Division</div>
  <h1>Riverside District</h1>
  <p>School sport fixtures, carnival results and representative teams across the Riverside District.</p>
</header>

<main class="container">

  <div class="section">
    <p class="section-title">District at a Glance</p>
    <div class="stats">
      <div class="stat"><div class="num">6</div><div class="lab">Member schools</div></div>
      <div class="stat"><div class="num">1,820</div><div class="lab">Students</div></div>
      <div class="stat"><div class="num">3</div><div class="lab">District carnivals /yr</div></div>
      <div class="stat"><div class="num">72</div><div class="lab">Division reps selected</div></div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Member Schools</p>
    <div class="school-grid">
      <div class="school-tile"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span><div><div class="nm">Riverside Primary School</div><div class="en">420 students</div></div></div>
      <div class="school-tile"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span><div><div class="nm">Bayside Park PS</div><div class="en">380 students</div></div></div>
      <div class="school-tile"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span><div><div class="nm">Greenlawn PS</div><div class="en">310 students</div></div></div>
      <div class="school-tile"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span><div><div class="nm">Meadowbrook PS</div><div class="en">290 students</div></div></div>
      <div class="school-tile"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span><div><div class="nm">Harbour Heights PS</div><div class="en">250 students</div></div></div>
      <div class="school-tile"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span><div><div class="nm">Oak Valley PS</div><div class="en">170 students</div></div></div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">2026 District Carnival Calendar</p>
    <div class="card">
      <table>
        <thead><tr><th>Carnival</th><th>Date</th><th>Venue</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td><span style="vertical-align:middle;margin-right:6px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 17c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 7c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/></svg></span>District Swimming</td><td><span class="date-pill">Fri 6 Mar 2026</span></td><td>Aquadome Pool</td><td><span class="status-pill st-done">Completed</span></td></tr>
          <tr><td><span style="vertical-align:middle;margin-right:6px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 20v-8l-5-8-5 8v8"/><path d="M5 20h14"/><path d="M12 4v16"/></svg></span>District Cross Country</td><td><span class="date-pill">Thu 15 May 2026</span></td><td>Riverside Reserve</td><td><span class="status-pill st-now">This week</span></td></tr>
          <tr><td><span style="vertical-align:middle;margin-right:6px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>District Athletics</td><td><span class="date-pill">Wed 26 Aug 2026</span></td><td>Newport Athletics Track</td><td><span class="status-pill st-next">Upcoming</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="section">
    <p class="section-title">District Team \u2014 Swimming 2026 (Progressing to Division)</p>
    <div class="card">
      <table>
        <thead><tr><th>Event</th><th>Swimmer</th><th>Time</th></tr></thead>
        <tbody>
          <tr><td>Girls 11 50m Free</td><td>Ruby C. \xB7 Riverside Primary</td><td>32.84</td></tr>
          <tr><td>Girls 11 50m Free</td><td>Mia L. \xB7 Bayside Park PS</td><td>33.12</td></tr>
          <tr><td>Girls 11 50m Free</td><td>Willow S. \xB7 Riverside Primary</td><td>33.92</td></tr>
          <tr><td>Boys 11 50m Free</td><td>Leo P. \xB7 Greenlawn PS</td><td>31.02</td></tr>
          <tr><td>Boys 11 50m Free</td><td>Max J. \xB7 Riverside Primary</td><td>31.58</td></tr>
          <tr><td>Boys 12 50m Breast</td><td>Jasper D. \xB7 Riverside Primary</td><td>41.17</td></tr>
          <tr><td>Girls 12 50m Back</td><td>Ivy R. \xB7 Meadowbrook PS</td><td>38.44</td></tr>
          <tr><td>Boys 10 50m Fly</td><td>Finn B. \xB7 Harbour Heights PS</td><td>45.22</td></tr>
        </tbody>
      </table>
      <p style="font-size:12px;color:#64748b;margin-top:10px;">Top performers auto-roll from each school's carnival into the district team. Public view: first name + last initial + school. Full names stored securely, visible only to signed-in coordinators.</p>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Connected Sites</p>
    <div class="connected">
      <a class="conn" href="/demo-division"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span><div><div class="lab">Division (parent)</div><div class="nm">Eastbay Division \u2192</div></div></a>
      <a class="conn" href="/demo-school"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span><div><div class="lab">Member school</div><div class="nm">Riverside Primary \u2192</div></div></a>
      <a class="conn" href="https://sportcarnival.com.au"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 3 4 11"/><polyline points="16 3 20 3 20 11"/><path d="M4 11a8 8 0 0 0 16 0"/><path d="M12 19v3"/><path d="M8 22h8"/></svg></span><div><div class="lab">Carnival tool</div><div class="nm">SportCarnival \u2192</div></div></a>
    </div>
  </div>
</main>

<footer class="site-footer">schoolsportportal.com.au/demo-district \xB7 Riverside District \xB7 Eastbay Division \xB7 fictional data</footer>
</body>
</html>
`;
var DEMO_DIVISION = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Eastbay Division \u2014 School Sport Portal</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4f8; color: #0f172a; line-height: 1.5; }
  .demo-banner { background: #f59e0b; color: #0d1b3e; text-align: center; padding: 10px 16px; font-size: 13px; font-weight: 700; }
  .demo-banner a { color: #0d1b3e; text-decoration: underline; }
  .site-header { background: linear-gradient(135deg, #064e3b, #047857 60%, #10b981); color: #fff; padding: 40px 24px 48px; text-align: center; }
  .header-badge { display: inline-block; background: rgba(16,185,129,.2); border: 1px solid rgba(16,185,129,.4); color: #d1fae5; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
  .site-header h1 { font-size: clamp(22px, 5vw, 34px); font-weight: 900; letter-spacing: -.02em; }
  .site-header p { font-size: 14px; opacity: .82; max-width: 520px; margin: 8px auto 0; }
  .container { max-width: 960px; margin: 0 auto; padding: 0 20px; }
  .section { margin: 36px 0; }
  .section-title { font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #64748b; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #e2e8f0; }
  .card { background: #fff; border-radius: 14px; padding: 20px 22px; box-shadow: 0 2px 10px rgba(0,0,0,.07); margin-bottom: 14px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
  .stat { background: #fff; padding: 18px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
  .stat .num { font-size: 28px; font-weight: 900; color: #047857; }
  .stat .lab { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .08em; margin-top: 4px; }
  .district-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
  .district-tile { background: #fff; border-radius: 12px; padding: 16px 18px; box-shadow: 0 2px 8px rgba(0,0,0,.06); text-decoration: none; color: #0f172a; display: block; border: 2px solid transparent; transition: border-color .15s, transform .15s; }
  .district-tile:hover { border-color: #10b981; transform: translateY(-2px); }
  .district-tile .ic { display:flex; align-items:center; justify-content:center; color:#64748b; }
  .district-tile .nm { font-size: 14px; font-weight: 700; margin-top: 6px; }
  .district-tile .en { font-size: 12px; color: #64748b; margin-top: 3px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 10px 8px; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; border-bottom: 2px solid #e2e8f0; }
  td { padding: 10px 8px; border-bottom: 1px solid #f1f5f9; }
  .date-pill { background: #d1fae5; color: #047857; padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; }
  .status-pill { padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; }
  .st-done { background: #dbeafe; color: #1d4ed8; }
  .st-next { background: #e5e7eb; color: #475569; }
  .st-now { background: #fef3c7; color: #a16207; }
  .connected { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
  .conn { background: #fff; border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 10px; text-decoration: none; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,.06); border: 2px solid transparent; transition: border-color .15s, transform .15s; }
  .conn:hover { border-color: #10b981; transform: translateY(-2px); }
  .conn .ic { display:flex; align-items:center; justify-content:center; color:#64748b; }
  .conn .lab { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #94a3b8; }
  .conn .nm { font-size: 13px; font-weight: 700; }
  .site-footer { background: #0d1b3e; color: rgba(255,255,255,.45); text-align: center; padding: 22px; font-size: 12px; margin-top: 50px; }
</style>
</head>
<body>
<div class="demo-banner">\u26A0 DEMO PAGE \u2014 fictional data. Real division pages are unlisted, visible only to logged-in coordinators. <a href="/">\u2190 Back to portal</a></div>

<header class="site-header">
  <div class="header-badge">Central Coast Region</div>
  <h1>Eastbay Division</h1>
  <p>Coordinating school sport competition across all districts within the Eastbay Division.</p>
</header>

<main class="container">

  <div class="section">
    <p class="section-title">Division at a Glance</p>
    <div class="stats">
      <div class="stat"><div class="num">3</div><div class="lab">Districts</div></div>
      <div class="stat"><div class="num">17</div><div class="lab">Schools</div></div>
      <div class="stat"><div class="num">5,240</div><div class="lab">Students</div></div>
      <div class="stat"><div class="num">3</div><div class="lab">Division carnivals /yr</div></div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Districts in Eastbay Division</p>
    <div class="district-grid">
      <a class="district-tile" href="/demo-district">
        <span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <div class="nm">Riverside District</div>
        <div class="en">6 schools \xB7 1,820 students</div>
      </a>
      <div class="district-tile" style="opacity:.7;">
        <span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <div class="nm">Harbourside District</div>
        <div class="en">6 schools \xB7 1,740 students</div>
      </div>
      <div class="district-tile" style="opacity:.7;">
        <span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <div class="nm">Lighthouse District</div>
        <div class="en">5 schools \xB7 1,680 students</div>
      </div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">2026 Division Carnival Calendar</p>
    <div class="card">
      <table>
        <thead><tr><th>Carnival</th><th>Date</th><th>Venue</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td><span style="vertical-align:middle;margin-right:6px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 17c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 7c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/></svg></span>Division Swimming</td><td><span class="date-pill">Tue 24 Mar 2026</span></td><td>Aquadome Regional Pool</td><td><span class="status-pill st-done">Completed</span></td></tr>
          <tr><td><span style="vertical-align:middle;margin-right:6px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 20v-8l-5-8-5 8v8"/><path d="M5 20h14"/><path d="M12 4v16"/></svg></span>Division Cross Country</td><td><span class="date-pill">Tue 2 Jun 2026</span></td><td>Eastbay Parklands</td><td><span class="status-pill st-next">Upcoming</span></td></tr>
          <tr><td><span style="vertical-align:middle;margin-right:6px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>Division Athletics</td><td><span class="date-pill">Wed 9 Sep 2026</span></td><td>Regional Athletics Centre</td><td><span class="status-pill st-next">Upcoming</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Division Team \u2014 Swimming 2026 (Progressing to Region)</p>
    <div class="card">
      <table>
        <thead><tr><th>Event</th><th>Swimmer</th><th>Time</th><th>District</th></tr></thead>
        <tbody>
          <tr><td>Girls 11 50m Free</td><td>Ruby C. \xB7 Riverside Primary</td><td>32.84</td><td>Riverside</td></tr>
          <tr><td>Girls 11 50m Free</td><td>Charlotte M. \xB7 Harbour Academy</td><td>32.91</td><td>Harbourside</td></tr>
          <tr><td>Boys 11 50m Free</td><td>Hugo V. \xB7 Cape Primary</td><td>30.44</td><td>Lighthouse</td></tr>
          <tr><td>Boys 11 50m Free</td><td>Leo P. \xB7 Greenlawn PS</td><td>31.02</td><td>Riverside</td></tr>
          <tr><td>Girls 12 50m Back</td><td>Lola T. \xB7 Tidewater PS</td><td>37.88</td><td>Harbourside</td></tr>
          <tr><td>Boys 12 50m Breast</td><td>Jasper D. \xB7 Riverside Primary</td><td>41.17</td><td>Riverside</td></tr>
        </tbody>
      </table>
      <p style="font-size:12px;color:#64748b;margin-top:10px;">Public view: first name + last initial + school + district. Full names stored securely, visible only to signed-in coordinators.</p>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Connected Sites</p>
    <div class="connected">
      <a class="conn" href="/demo-region"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg></span><div><div class="lab">Region (parent)</div><div class="nm">Central Coast Region \u2192</div></div></a>
      <a class="conn" href="/demo-district"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span><div><div class="lab">Member district</div><div class="nm">Riverside District \u2192</div></div></a>
      <a class="conn" href="https://sportcarnival.com.au"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 3 4 11"/><polyline points="16 3 20 3 20 11"/><path d="M4 11a8 8 0 0 0 16 0"/><path d="M12 19v3"/><path d="M8 22h8"/></svg></span><div><div class="lab">Carnival tool</div><div class="nm">SportCarnival \u2192</div></div></a>
    </div>
  </div>
</main>

<footer class="site-footer">schoolsportportal.com.au/demo-division \xB7 Eastbay Division \xB7 Central Coast Region \xB7 fictional data</footer>
</body>
</html>
`;
var DEMO_REGION = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Central Coast Region \u2014 School Sport Portal</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4f8; color: #0f172a; line-height: 1.5; }
  .demo-banner { background: #f59e0b; color: #0d1b3e; text-align: center; padding: 10px 16px; font-size: 13px; font-weight: 700; }
  .demo-banner a { color: #0d1b3e; text-decoration: underline; }
  .site-header { background: linear-gradient(135deg, #3b0764, #7c3aed 60%, #a855f7); color: #fff; padding: 40px 24px 48px; text-align: center; }
  .header-badge { display: inline-block; background: rgba(168,85,247,.2); border: 1px solid rgba(168,85,247,.4); color: #ede9fe; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
  .site-header h1 { font-size: clamp(22px, 5vw, 34px); font-weight: 900; letter-spacing: -.02em; }
  .site-header p { font-size: 14px; opacity: .85; max-width: 520px; margin: 8px auto 0; }
  .container { max-width: 960px; margin: 0 auto; padding: 0 20px; }
  .section { margin: 36px 0; }
  .section-title { font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #64748b; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #e2e8f0; }
  .card { background: #fff; border-radius: 14px; padding: 20px 22px; box-shadow: 0 2px 10px rgba(0,0,0,.07); margin-bottom: 14px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
  .stat { background: #fff; padding: 18px; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
  .stat .num { font-size: 28px; font-weight: 900; color: #7c3aed; }
  .stat .lab { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .08em; margin-top: 4px; }
  .pathway { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; }
  .pw-step { background: #fff; border-radius: 12px; padding: 16px 14px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,.06); border-top: 4px solid #a855f7; }
  .pw-step .n { font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #7c3aed; }
  .pw-step .t { font-size: 14px; font-weight: 700; margin-top: 4px; }
  .pw-step .s { font-size: 11px; color: #64748b; margin-top: 4px; }
  .division-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
  .division-tile { background: #fff; border-radius: 12px; padding: 16px 18px; box-shadow: 0 2px 8px rgba(0,0,0,.06); text-decoration: none; color: #0f172a; display: block; border: 2px solid transparent; transition: border-color .15s, transform .15s; }
  .division-tile:hover { border-color: #a855f7; transform: translateY(-2px); }
  .division-tile .ic { display:flex; align-items:center; justify-content:center; color:#64748b; }
  .division-tile .nm { font-size: 14px; font-weight: 700; margin-top: 6px; }
  .division-tile .en { font-size: 12px; color: #64748b; margin-top: 3px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 10px 8px; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; border-bottom: 2px solid #e2e8f0; }
  td { padding: 10px 8px; border-bottom: 1px solid #f1f5f9; }
  .date-pill { background: #ede9fe; color: #6d28d9; padding: 3px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; }
  .connected { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
  .conn { background: #fff; border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 10px; text-decoration: none; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,.06); border: 2px solid transparent; transition: border-color .15s, transform .15s; }
  .conn:hover { border-color: #a855f7; transform: translateY(-2px); }
  .conn .ic { display:flex; align-items:center; justify-content:center; color:#64748b; }
  .conn .lab { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #94a3b8; }
  .conn .nm { font-size: 13px; font-weight: 700; }
  .site-footer { background: #0d1b3e; color: rgba(255,255,255,.45); text-align: center; padding: 22px; font-size: 12px; margin-top: 50px; }
</style>
</head>
<body>
<div class="demo-banner">\u26A0 DEMO PAGE \u2014 fictional data. Real region pages are unlisted, visible only to logged-in coordinators. <a href="/">\u2190 Back to portal</a></div>

<header class="site-header">
  <div class="header-badge">State Sport Pathway</div>
  <h1>Central Coast Region</h1>
  <p>The home of school sport for the Central Coast Region \u2014 connecting divisions, districts, and schools across the coast.</p>
</header>

<main class="container">

  <div class="section">
    <p class="section-title">Region at a Glance</p>
    <div class="stats">
      <div class="stat"><div class="num">2</div><div class="lab">Divisions</div></div>
      <div class="stat"><div class="num">5</div><div class="lab">Districts</div></div>
      <div class="stat"><div class="num">28</div><div class="lab">Schools</div></div>
      <div class="stat"><div class="num">8,650</div><div class="lab">Students</div></div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">The Sport Pathway</p>
    <div class="card">
      <div class="pathway">
        <div class="pw-step"><div class="n">Step 1</div><div class="t"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> School</div><div class="s">House carnival</div></div>
        <div class="pw-step"><div class="n">Step 2</div><div class="t"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> District</div><div class="s">Top athletes from each school</div></div>
        <div class="pw-step"><div class="n">Step 3</div><div class="t"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> Division</div><div class="s">Top athletes from each district</div></div>
        <div class="pw-step"><div class="n">Step 4</div><div class="t"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg> Region</div><div class="s">This level</div></div>
        <div class="pw-step"><div class="n">Step 5</div><div class="t"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 3 4 11"/><polyline points="16 3 20 3 20 11"/><path d="M4 11a8 8 0 0 0 16 0"/><path d="M12 19v3"/><path d="M8 22h8"/></svg> State</div><div class="s">State finals</div></div>
      </div>
      <p style="font-size:13px;color:#64748b;margin-top:14px;">Every result from every school carnival auto-rolls up through the pathway. No re-entering data, no chasing schools for PDFs \u2014 the top performers surface at each level automatically.</p>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Divisions in Central Coast Region</p>
    <div class="division-grid">
      <a class="division-tile" href="/demo-division">
        <span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>
        <div class="nm">Eastbay Division</div>
        <div class="en">3 districts \xB7 17 schools \xB7 5,240 students</div>
      </a>
      <div class="division-tile" style="opacity:.7;">
        <span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>
        <div class="nm">Seaside Division</div>
        <div class="en">2 districts \xB7 11 schools \xB7 3,410 students</div>
      </div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">2026 Regional Carnival Calendar</p>
    <div class="card">
      <table>
        <thead><tr><th>Carnival</th><th>Date</th><th>Venue</th></tr></thead>
        <tbody>
          <tr><td><span style="vertical-align:middle;margin-right:6px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 17c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 7c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/></svg></span>Region Swimming</td><td><span class="date-pill">Wed 15 Apr 2026</span></td><td>State Aquatic Centre</td></tr>
          <tr><td><span style="vertical-align:middle;margin-right:6px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 20v-8l-5-8-5 8v8"/><path d="M5 20h14"/><path d="M12 4v16"/></svg></span>Region Cross Country</td><td><span class="date-pill">Thu 25 Jun 2026</span></td><td>Coastal Park</td></tr>
          <tr><td><span style="vertical-align:middle;margin-right:6px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>Region Athletics</td><td><span class="date-pill">Tue 22 Sep 2026</span></td><td>State Athletics Stadium</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Connected Sites</p>
    <div class="connected">
      <a class="conn" href="/demo-division"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span><div><div class="lab">Division</div><div class="nm">Eastbay Division \u2192</div></div></a>
      <a class="conn" href="/demo-district"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span><div><div class="lab">District</div><div class="nm">Riverside District \u2192</div></div></a>
      <a class="conn" href="/demo-school"><span class="ic"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span><div><div class="lab">School</div><div class="nm">Riverside Primary \u2192</div></div></a>
    </div>
  </div>
</main>

<footer class="site-footer">schoolsportportal.com.au/demo-region \xB7 Central Coast Region \xB7 fictional data</footer>
</body>
</html>
`;
var WPS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Williamstown Primary School \u2014 School Sport Portal</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4f8; color: #0f172a; }

  .site-header {
    background: linear-gradient(135deg, #0d1b3e 0%, #1a3a6e 60%, #1a56db 100%);
    color: #fff;
    padding: 52px 24px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .site-header::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 32px;
    background: #f0f4f8;
    clip-path: ellipse(55% 100% at 50% 100%);
  }
  .header-badge {
    display: inline-block;
    background: rgba(245,158,11,.15);
    border: 1px solid rgba(245,158,11,.4);
    color: #f59e0b;
    font-size: 11px; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase;
    padding: 4px 12px; border-radius: 20px; margin-bottom: 14px;
  }
  .site-header h1 { font-size: clamp(24px, 5vw, 38px); font-weight: 900; letter-spacing: -.02em; margin-bottom: 8px; }
  .site-header p { font-size: 14px; opacity: .72; max-width: 480px; margin: 0 auto; line-height: 1.6; }

  .container { max-width: 880px; margin: 0 auto; padding: 0 20px; }

  .section { margin: 44px 0; }
  .section-title {
    font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
    color: #64748b; margin-bottom: 14px; padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
  }

  /* Sport cards */
  .sport-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
  .sport-card {
    background: #fff; border-radius: 14px; padding: 20px 16px;
    text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,.07);
    transition: transform .15s;
  }
  .sport-card:hover { transform: translateY(-2px); }
  .sport-chip { font-size:11px;font-weight:800;letter-spacing:.06em;color:#1a56db;background:#eff6ff;padding:5px 10px;border-radius:8px;display:inline-block;margin-bottom:8px; }
  .sport-card .sport-emoji { margin-bottom:8px;display:flex;align-items:center;justify-content:center; }
  .sport-card .sport-name { font-size: 13px; font-weight: 700; }
  .sport-card .sport-detail { font-size: 11px; color: #94a3b8; margin-top: 3px; }

  /* Highlight card */
  .highlight-card {
    background: linear-gradient(135deg, #0d1b3e, #1a3a6e);
    color: #fff;
    border-radius: 16px;
    padding: 28px 32px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 4px 20px rgba(13,27,62,.25);
  }
  .highlight-card .hc-icon { flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#60a5fa; }
  .highlight-card h3 { font-size: 18px; font-weight: 800; margin-bottom: 6px; }
  .highlight-card p { font-size: 13px; opacity: .75; line-height: 1.6; }

  /* Info cards */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }
  .info-card {
    background: #fff;
    border-radius: 14px;
    padding: 22px 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,.07);
  }
  .info-card h3 { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
  .info-card p { font-size: 13px; color: #64748b; line-height: 1.6; }

  /* Connected sites */
  .sites-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }
  .site-link {
    background: #fff; border-radius: 12px; padding: 16px 20px;
    display: flex; align-items: center; gap: 12px;
    text-decoration: none; color: #0f172a;
    box-shadow: 0 2px 8px rgba(0,0,0,.06);
    border: 2px solid transparent;
    transition: border-color .15s, transform .15s;
  }
  .site-link:hover { border-color: #1a56db; transform: translateY(-2px); }
  .site-link .site-icon { flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#64748b; }
  .site-link .site-label { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #94a3b8; margin-bottom: 2px; }
  .site-link .site-name { font-size: 13px; font-weight: 700; }
  .site-link .site-arrow { margin-left: auto; color: #94a3b8; font-size: 14px; flex-shrink: 0; }

  .notice {
    background: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px;
    padding: 16px 20px; font-size: 13px; color: #92400e;
    display: flex; gap: 10px; align-items: flex-start;
  }

  .site-footer {
    background: #0d1b3e; color: rgba(255,255,255,.45);
    text-align: center; padding: 24px; font-size: 12px; margin-top: 60px;
  }

  @media (max-width: 500px) {
    .highlight-card { flex-direction: column; text-align: center; }
  }
</style>
</head>
<body>

<!-- Shared nav auto-injects here -->
<script data-site="williamstownps" src="https://schoolsportportal.com.au/schoolsportportal-nav.js"><\/script>

<header class="site-header">
  <div class="header-badge">Williamstown District</div>
  <h1>Williamstown Primary School</h1>
  <p>School sport news, team selections, and competition information for Williamstown Primary School students.</p>
</header>

<main class="container">

  <div class="section">
    <div class="highlight-card">
      <span class="hc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="6"/><path d="M9 3h6l2 5H7z"/></svg></span>
      <div>
        <h3>Sport at Williamstown PS</h3>
        <p>Our students compete across a full range of school sports at district, division, and regional level throughout the year. Check this page for updates on carnivals, team selections, and results.</p>
      </div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Notice</p>
    <div class="notice">
      <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></span>
      <span>Welcome to the Williamstown PS sport page. Upcoming events, team lists, and results will be posted here throughout the year.</span>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Sports We Compete In</p>
    <div class="sport-grid">
      <div class="sport-card"><div class="sport-chip">ATH</div><div class="sport-name">Athletics</div><div class="sport-detail">District Carnival</div></div>
      <div class="sport-card"><div class="sport-chip">SWIM</div><div class="sport-name">Swimming</div><div class="sport-detail">District Carnival</div></div>
      <div class="sport-card"><div class="sport-chip">XC</div><div class="sport-name">Cross Country</div><div class="sport-detail">District Carnival</div></div>
      <div class="sport-card"><div class="sport-chip">FOOTY</div><div class="sport-name">Football</div><div class="sport-detail">District Comp</div></div>
      <div class="sport-card"><div class="sport-chip">BBALL</div><div class="sport-name">Basketball</div><div class="sport-detail">District Comp</div></div>
      <div class="sport-card"><div class="sport-chip">TEN</div><div class="sport-name">Tennis</div><div class="sport-detail">District Comp</div></div>
      <div class="sport-card"><div class="sport-chip">HOCK</div><div class="sport-name">Hockey</div><div class="sport-detail">District Comp</div></div>
      <div class="sport-card"><div class="sport-chip">VB</div><div class="sport-name">Volleyball</div><div class="sport-detail">District Comp</div></div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Carnivals</p>
    <div class="sites-row">
      <a class="site-link" href="https://sportcarnival.com.au/williamstownps/athletics">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
        <div>
          <div class="site-label">SportCarnival \xB7 Athletics</div>
          <div class="site-name">Athletics Carnival</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">Term 2 2026</div>
        </div>
        <span class="site-arrow">\u2192</span>
      </a>
      <a class="site-link" href="https://sportcarnival.com.au/williamstownps/swimming">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 17c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/><path d="M2 7c1.4-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/></svg></span>
        <div>
          <div class="site-label">SportCarnival \xB7 Swimming</div>
          <div class="site-name">Swimming Carnival</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">Term 1 2026</div>
        </div>
        <span class="site-arrow">\u2192</span>
      </a>
      <a class="site-link" href="https://sportcarnival.com.au/williamstownps/crosscountry">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 20v-8l-5-8-5 8v8"/><path d="M5 20h14"/><path d="M12 4v16"/></svg></span>
        <div>
          <div class="site-label">SportCarnival \xB7 Cross Country</div>
          <div class="site-name">Cross Country</div>
          <div style="font-size:11px; color:#94a3b8; margin-top:2px;">Term 2 2026</div>
        </div>
        <span class="site-arrow">\u2192</span>
      </a>
    </div>
  </div>

  <div class="section">
    <p class="section-title">School Sport Information</p>
    <div class="info-grid">
      <div class="info-card">
        <h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Upcoming Events</h3>
        <p>Carnival and competition dates will be posted here each term. Keep an eye on this page and school newsletters.</p>
      </div>
      <div class="info-card">
        <h3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="6"/><path d="M9 3h6l2 5H7z"/></svg> Selection &amp; Trials</h3>
        <p>Students selected for district or division representative teams will be notified via school. Details here when available.</p>
      </div>
      <div class="info-card">
        <h3><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.38 2 2 0 0 1 3.62 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Contact</h3>
        <p>For school sport enquiries, speak with the PE teacher or school sport coordinator at Williamstown Primary School.</p>
      </div>
    </div>
  </div>

  <div class="section">
    <p class="section-title">Connected Sites</p>
    <div class="sites-row">
      <a class="site-link" href="/williamstowndistrict">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <div><div class="site-label">District (Parent)</div><div class="site-name">Williamstown District</div></div>
        <span class="site-arrow">\u2192</span>
      </a>
      <a class="site-link" href="/hobsonsbaydivision">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 3 4 11"/><polyline points="16 3 20 3 20 11"/><path d="M4 11a8 8 0 0 0 16 0"/><path d="M12 19v3"/><path d="M8 22h8"/></svg></span>
        <div><div class="site-label">Division</div><div class="site-name">Hobsons Bay Division</div></div>
        <span class="site-arrow">\u2192</span>
      </a>
      <a class="site-link" href="/wmr">
        <span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>
        <div><div class="site-label">Region</div><div class="site-name">Western Metro Region</div></div>
        <span class="site-arrow">\u2192</span>
      </a>
    </div>
  </div>

</main>

<footer class="site-footer">
  <p>schoolsportportal.com.au/williamstownps &nbsp;\xB7&nbsp; Williamstown District &nbsp;\xB7&nbsp; Hobsons Bay Division</p>
</footer>


<div class="section" id="xc-results-section">
    <p class="section-title">District Cross Country 2026 \xE2\u20AC\u201D Live Results</p>
    <div id="xc-status" class="notice" style="margin-bottom:12px">
      <span>\xE2\x8F\xB3</span><span id="xc-status-text">Loading results\xE2\u20AC\xA6</span>
    </div>
    <div id="xc-races"></div>
  </div>

  <script>
  (function(){
    const API = 'https://carnival-results.pgallivan.workers.dev';
    const CODE = 'WD26';
    const WPS_SC = 'wps';
    const RACE_LABELS = {'10-girls':'9/10 Girls','10-boys':'9/10 Boys','11-girls':'11 Girls','11-boys':'11 Boys','12-girls':'12/13 Girls','12-boys':'12/13 Boys'};
    const RACE_ORDER = ['10-girls','10-boys','11-girls','11-boys','12-girls','12-boys'];

    function fmtMs(ms){if(!ms)return'\xE2\u20AC\u201D';const s=Math.floor(ms/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}

    async function load(){
      try{
        const r=await fetch(API+'/api/results/'+CODE);
        const d=await r.json();
        const results=d.results||{};
        const keys=Object.keys(results);
        const statusEl=document.getElementById('xc-status-text');
        const racesEl=document.getElementById('xc-races');

        if(!keys.length){
          statusEl.textContent='No results published yet \xE2\u20AC\u201D check back during the carnival (Thu 7 May).';
          return;
        }

        document.getElementById('xc-status').style.background='#f0fdf4';
        document.getElementById('xc-status').style.borderColor='#bbf7d0';
        statusEl.textContent='Results updating live as races are published.';

        let html='';
        for(const key of RACE_ORDER){
          const data=results[key];
          if(!data)continue;
          const places=data.places||[];
          const wpsPlaces=places.filter(p=>{
            // match by bib range: wps bibs are 29-32,61-64,93-96,125-128,157-160,189-192
            const b=parseInt(p.bib);
            return (b>=29&&b<=32)||(b>=61&&b<=64)||(b>=93&&b<=96)||(b>=125&&b<=128)||(b>=157&&b<=160)||(b>=189&&b<=192);
          });
          const pub=data.publishedAt?new Date(data.publishedAt).toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit'}):'';
          html+=\`<div style="margin-bottom:16px;background:#fff;border-radius:12px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.08)">
            <div style="font-weight:700;font-size:.95rem;margin-bottom:8px;color:#f57f17">\${RACE_LABELS[key]||key} <span style="font-weight:400;color:#94a3b8;font-size:.78rem">\${pub?'Published '+pub:''}</span></div>\`;
          if(!wpsPlaces.length){
            html+=\`<div style="color:#94a3b8;font-size:.85rem">No WPS finishers recorded yet.</div>\`;
          }else{
            html+=\`<table style="width:100%;border-collapse:collapse;font-size:.85rem">
              <thead><tr style="color:#64748b;font-size:.78rem"><th style="text-align:left;padding:4px 6px">Place</th><th style="text-align:left;padding:4px 6px">Name</th><th style="text-align:left;padding:4px 6px">Time</th><th style="text-align:left;padding:4px 6px">Qual</th></tr></thead><tbody>\`;
            for(const p of wpsPlaces){
              const q=p.place<=10?'<span style="color:#16a34a;font-weight:700">\xE2\u0153\u201C Div</span>':'';
              html+=\`<tr style="border-top:1px solid #f1f5f9"><td style="padding:5px 6px;font-weight:700">\${p.place}</td><td style="padding:5px 6px">\${p.name||'Bib '+p.bib}</td><td style="padding:5px 6px;color:#64748b">\${fmtMs(p.elapsedMs)}</td><td style="padding:5px 6px">\${q}</td></tr>\`;
            }
            html+=\`</tbody></table>\`;
          }
          html+=\`</div>\`;
        }
        racesEl.innerHTML=html||'<p style="color:#94a3b8">No results yet.</p>';
      }catch(e){
        document.getElementById('xc-status-text').textContent='Unable to load results. Try refreshing.';
      }
    }

    load();
    setInterval(load, 30000); // refresh every 30s
  })();
  <\/script>
</body>
</html>

`;
var HOBSONS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hobsons Bay Division \u2014 School Sport Portal</title>
<meta name="description" content="Hobsons Bay Division school sport \u2014 winter sport district winners, live cross-country, athletics and swimming results.">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f0f4f8; color: #0f172a; }
  .site-header {
    background: linear-gradient(135deg, #0d1b3e 0%, #1a3a6e 60%, #1a56db 100%);
    color: #fff; padding: 52px 24px 60px; text-align: center;
    position: relative; overflow: hidden;
  }
  .site-header::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
    height: 32px; background: #f0f4f8;
    clip-path: ellipse(55% 100% at 50% 100%);
  }
  .header-badge {
    display: inline-block; background: rgba(245,158,11,.15);
    border: 1px solid rgba(245,158,11,.4); color: #f59e0b;
    font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
    padding: 4px 12px; border-radius: 20px; margin-bottom: 14px;
  }
  .site-header h1 { font-size: clamp(24px,5vw,38px); font-weight: 900; letter-spacing: -.02em; margin-bottom: 8px; }
  .site-header p { font-size: 14px; opacity: .72; max-width: 480px; margin: 0 auto; line-height: 1.6; }
  .container { max-width: 880px; margin: 0 auto; padding: 0 20px; }
  .section { margin: 44px 0; }
  .section-title {
    font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
    color: #64748b; margin-bottom: 14px; padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
    display: flex; align-items: center; justify-content: space-between;
  }
  .live-dot { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700; color: #16a34a; letter-spacing: .06em; }
  .live-dot::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: #16a34a; animation: pulse 1.8s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)} }
  .stats-bar { display: grid; grid-template-columns: repeat(auto-fit,minmax(130px,1fr)); gap: 12px; }
  .stat-card { background: #fff; border-radius: 14px; padding: 20px 16px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,.07); }
  .stat-card .stat-number { font-size: 32px; font-weight: 900; color: #1a56db; }
  .stat-card .stat-label { font-size: 12px; color: #64748b; margin-top: 4px; font-weight: 600; }
  .sport-block { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.07); margin-bottom: 14px; }
  .sport-header { display: flex; align-items: center; gap: 10px; padding: 14px 20px; background: linear-gradient(90deg,#f8fafc,#f1f5f9); border-bottom: 1px solid #e2e8f0; }
  .sport-emoji { font-size: 20px; }
  .sport-name { font-size: 15px; font-weight: 800; color: #0f172a; }
  .gender-row { display: grid; grid-template-columns: 140px 1fr 1fr 1fr 1fr; align-items: center; padding: 12px 20px; border-bottom: 1px solid #f1f5f9; gap: 8px; }
  .gender-row:last-child { border-bottom: none; }
  .gender-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #64748b; }
  .district-winner-cell { display: flex; flex-direction: column; align-items: center; padding: 6px 8px; border-radius: 10px; min-height: 52px; justify-content: center; text-align: center; }
  .district-winner-cell.has-winner { background: linear-gradient(135deg,#f0fdf4,#dcfce7); border: 1px solid #86efac; }
  .district-winner-cell.pending { background: #f8fafc; border: 1px dashed #cbd5e1; }
  .district-name-label { font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #94a3b8; margin-bottom: 3px; }
  .winner-school { font-size: 12px; font-weight: 800; color: #16a34a; line-height: 1.2; }
  .runner-up-label { font-size: 10px; color: #64748b; margin-top: 2px; }
  .pending-label { font-size: 11px; color: #94a3b8; font-style: italic; }
  .trophy-icon { font-size: 14px; margin-bottom: 2px; }
  @media(max-width:600px){ .gender-row{grid-template-columns:1fr 1fr;grid-template-rows:auto auto} .gender-label{grid-column:1/-1;margin-bottom:4px} }
  .district-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(280px,1fr)); gap: 14px; }
  .district-card { background: #fff; border-radius: 14px; padding: 22px 24px; display: flex; align-items: center; gap: 16px; text-decoration: none; color: #0f172a; box-shadow: 0 2px 10px rgba(0,0,0,.07); border: 2px solid transparent; transition: border-color .15s,transform .15s; }
  .district-card:hover { border-color: #1a56db; transform: translateY(-2px); }
  .district-card .dc-icon { font-size: 28px; flex-shrink: 0; }
  .district-card .dc-label { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #64748b; margin-bottom: 2px; }
  .district-card .dc-name { font-size: 16px; font-weight: 700; }
  .district-card .dc-url { font-size: 11px; color: #94a3b8; margin-top: 2px; }
  .district-card .dc-arrow { margin-left: auto; color: #94a3b8; font-size: 18px; flex-shrink: 0; }
  .info-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 14px; }
  .info-card { background: #fff; border-radius: 14px; padding: 22px 24px; box-shadow: 0 2px 10px rgba(0,0,0,.07); }
  .info-card h3 { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
  .info-card p { font-size: 13px; color: #64748b; line-height: 1.6; }
  .sites-row { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 12px; }
  .site-link { background: #fff; border-radius: 12px; padding: 16px 20px; display: flex; align-items: center; gap: 12px; text-decoration: none; color: #0f172a; box-shadow: 0 2px 8px rgba(0,0,0,.06); border: 2px solid transparent; transition: border-color .15s,transform .15s; }
  .site-link:hover { border-color: #1a56db; transform: translateY(-2px); }
  .site-link .site-icon { display:flex;align-items:center;justify-content:center;color:#64748b; flex-shrink: 0; }
  .site-link .site-label { font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #94a3b8; margin-bottom: 2px; }
  .site-link .site-name { font-size: 13px; font-weight: 700; }
  .site-link .site-arrow { margin-left: auto; color: #94a3b8; font-size: 14px; flex-shrink: 0; }
  .loading-state { text-align: center; padding: 40px 20px; color: #94a3b8; font-size: 13px; }
  .loading-spinner { width: 28px; height: 28px; border: 3px solid #e2e8f0; border-top-color: #1a56db; border-radius: 50%; animation: spin .7s linear infinite; margin: 0 auto 10px; }
  @keyframes spin { to{transform:rotate(360deg)} }
  .site-footer { background: #0d1b3e; color: rgba(255,255,255,.45); text-align: center; padding: 24px; font-size: 12px; margin-top: 60px; }
  .last-updated { font-size: 11px; color: #94a3b8; margin-top: 6px; font-style: italic; }
</style>
</head>
<body>
<script data-site="hobsonsbaydivision" src="https://schoolsportportal.com.au/schoolsportportal-nav.js"><\/script>
<header class="site-header">
  <div class="header-badge">Western Metro Region</div>
  <h1>Hobsons Bay Division</h1>
  <p>District competition results \u2014 winners automatically appear as scores are finalised.</p>
</header>
<main class="container">
  <div class="section">
    <p class="section-title">Division at a Glance</p>
    <div class="stats-bar">
      <div class="stat-card"><div class="stat-number">4</div><div class="stat-label">Districts</div></div>
      <div class="stat-card"><div class="stat-number" id="stat-confirmed">0</div><div class="stat-label">Confirmed Winners</div></div>
      <div class="stat-card"><div class="stat-number">T2</div><div class="stat-label">Current Term</div></div>
      <div class="stat-card"><div class="stat-number">5</div><div class="stat-label">Winter Sports</div></div>
    </div>
  </div>
  <div class="section">
    <p class="section-title">
      Winter Sport \u2014 District Winners
      <span class="live-dot">LIVE</span>
    </p>
    <div id="winners-board">
      <div class="loading-state">
        <div class="loading-spinner"></div>
        Connecting to live results\u2026
      </div>
    </div>
    <p class="last-updated" id="last-updated"></p>
  </div>
  <div class="section">
    <p class="section-title">Districts in this Division</p>
    <div class="district-grid">
      <a class="district-card" href="/williamstowndistrict">
        <span class="dc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <div>
          <div class="dc-label">District</div>
          <div class="dc-name">Williamstown District</div>
          <div class="dc-url">schoolsportportal.com.au/williamstowndistrict</div>
        </div>
        <span class="dc-arrow">\u2192</span>
      </a>
      <div class="district-card" style="opacity:.45;cursor:default">
        <span class="dc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <div><div class="dc-label">District</div><div class="dc-name">Altona District</div><div class="dc-url">Coming soon</div></div>
      </div>
      <div class="district-card" style="opacity:.45;cursor:default">
        <span class="dc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <div><div class="dc-label">District</div><div class="dc-name">Laverton District</div><div class="dc-url">Coming soon</div></div>
      </div>
      <div class="district-card" style="opacity:.45;cursor:default">
        <span class="dc-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
        <div><div class="dc-label">District</div><div class="dc-name">Point Cook District</div><div class="dc-url">Coming soon</div></div>
      </div>
    </div>
  </div>
  <div class="section">
    <p class="section-title">Connected Sites</p>
    <div class="sites-row">
      <a class="site-link" href="/wmr"><span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span><div><div class="site-label">Region (Parent)</div><div class="site-name">Western Metro Region</div></div><span class="site-arrow">\u2192</span></a>
      <a class="site-link" href="/wyndhamdivision"><span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 3 4 11"/><polyline points="16 3 20 3 20 11"/><path d="M4 11a8 8 0 0 0 16 0"/><path d="M12 19v3"/><path d="M8 22h8"/></svg></span><div><div class="site-label">Sibling Division</div><div class="site-name">Wyndham Division</div></div><span class="site-arrow">\u2192</span></a>
      <a class="site-link" href="/williamstowndistrict"><span class="site-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span><div><div class="site-label">District (Child)</div><div class="site-name">Williamstown District</div></div><span class="site-arrow">\u2192</span></a>
    </div>
  </div>
</main>
<footer class="site-footer">
  <p>schoolsportportal.com.au/hobsonsbaydivision &nbsp;\xB7&nbsp; Western Metropolitan Region School Sport</p>
</footer>
<script>
const HB_DISTRICTS=[{key:'williamstown',label:'Williamstown',live:true},{key:'altona',label:'Altona',live:false},{key:'laverton',label:'Laverton',live:false},{key:'pointcook',label:'Point Cook',live:false}];
const WINTER_SPORTS=[{key:'AFL',label:'AFL',emoji:''},{key:'Soccer',label:'Soccer',emoji:''},{key:'Netball',label:'Netball',emoji:''},{key:'Hockey',label:'Hockey',emoji:''},{key:'Softball',label:'Softball',emoji:''}];
const GENDERS=['Girls','Boys/Mixed'];
let divisionData={};
async function loadWinners(){try{const r=await fetch('https://carnival-results.pgallivan.workers.dev/api/winners?division=hobsonsbay&year=2026');const j=await r.json();divisionData=j.data||{};renderWinnersBoard();}catch(e){const el=document.getElementById('winners-board');if(el) el.innerHTML='<div class="loading-state">Unable to connect to live data.</div>';}}
function getWinner(sport,gender,district){const key=sport+'__'+gender.replace(/\\//g,'_');return divisionData?.[key]?.districts?.[district]||null;}
function renderWinnersBoard(){const board=document.getElementById('winners-board');let confirmed=0,html='';WINTER_SPORTS.forEach(sport=>{html+=\`<div class=\\"sport-block\\"><div class=\\"sport-header\\"><span class=\\"sport-emoji\\">\${sport.emoji}</span><span class=\\"sport-name\\">\${sport.label}</span></div><div class=\\"sport-body\\">\`;GENDERS.forEach(gender=>{html+=\`<div class=\\"gender-row\\"><span class=\\"gender-label\\">\${gender}</span>\`;HB_DISTRICTS.forEach(dist=>{const w=getWinner(sport.key,gender,dist.key);if(w&&w.winner){confirmed++;html+=\`<div class=\\"district-winner-cell has-winner\\"><div class=\\"district-name-label\\">\${dist.label}</div><div class=\\"trophy-icon\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><polyline points=\\"8 3 4 3 4 11\\"/><polyline points=\\"16 3 20 3 20 11\\"/><path d=\\"M4 11a8 8 0 0 0 16 0\\"/><path d=\\"M12 19v3\\"/><path d=\\"M8 22h8\\"/></svg></div><div class=\\"winner-school\\">\${w.winner}</div>\${w.runnerUp?\`<div class=\\"runner-up-label\\">2nd: \${w.runnerUp}</div>\`:''}</div>\`;}else if(!dist.live){html+=\`<div class=\\"district-winner-cell pending\\"><div class=\\"district-name-label\\">\${dist.label}</div><div class=\\"pending-label\\">\\u2013</div></div>\`;}else{html+=\`<div class=\\"district-winner-cell pending\\"><div class=\\"district-name-label\\">\${dist.label}</div><div class=\\"pending-label\\">In progress\\u2026</div></div>\`;}});html+=\`</div>\`;});html+=\`</div></div>\`;});board.innerHTML=html;document.getElementById('stat-confirmed').textContent=confirmed;document.getElementById('last-updated').textContent='Last updated: '+new Date().toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit'});}\\n
function init(){loadWinners();setInterval(loadWinners,30000);}init();</scrip`;
var PRIVACY_HTML_SSP = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Privacy Policy \u2014 Luck Dragon</title>
<meta name="robots" content="index, follow">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:56px 24px 72px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:36px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(26px,5vw,40px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:520px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:40px}
h2{font-size:18px;font-weight:800;color:#0d1b3e;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
h3{font-size:14px;font-weight:700;color:#0f172a;margin:18px 0 6px}
p{font-size:14px;color:#334155;margin-bottom:10px}
ul{font-size:14px;color:#334155;padding-left:20px;margin-bottom:10px}
ul li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:22px 26px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:16px}
.highlight{background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;font-size:13px;color:#1e40af;margin:16px 0}
.products{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin:12px 0}
.product{background:#f1f5f9;border-radius:10px;padding:14px 16px}
.product .name{font-size:13px;font-weight:700;color:#0f172a;margin-bottom:4px}
.product .desc{font-size:12px;color:#64748b}
.updated{font-size:12px;color:#94a3b8;margin-bottom:32px}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}
</style>
</head>
<body>
<div class="hero">
  <div class="badge">Legal</div>
  <h1>Privacy Policy</h1>
  <p>How Luck Dragon collects, uses, and protects your information across all our school sport products.</p>
</div>
<div class="container">
  <p class="updated">Last updated: 1 May 2026 &nbsp;\xB7&nbsp; Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>

  <div class="highlight">
    <strong>The short version:</strong> We collect only what we need to run school sport. Student data is stored securely in Australia and never sold, shared with advertisers, or used for any purpose outside school sport coordination.
  </div>

  <div class="section">
    <h2>1. Who We Are</h2>
    <div class="card">
      <p>Luck Dragon Pty Ltd (ABN 64 697 434 898) operates three school sport products:</p>
      <div class="products">
        <div class="product"><div class="name">School Sport Portal</div><div class="desc">schoolsportportal.com.au \u2014 school, district &amp; division portals</div></div>
        <div class="product"><div class="name">Carnival Timing</div><div class="desc">carnivaltiming.com \u2014 live race timing for carnivals</div></div>
        <div class="product"><div class="name">SportCarnival</div><div class="desc">sportcarnival.com.au \u2014 carnival results and draw management</div></div>
      </div>
      <p>This Privacy Policy applies to all three products. For questions, contact us at <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a>.</p>
    </div>
  </div>

  <div class="section">
    <h2>2. What Data We Collect</h2>
    <div class="card">
      <h3>Student Performance Data (Carnival Timing &amp; School Sport Portal)</h3>
      <p>When a school coordinator uses our timing tools, we store:</p>
      <ul>
        <li>First name and last initial (never full surnames publicly)</li>
        <li>Age group and gender category</li>
        <li>Race/event times and placing</li>
        <li>School name and district</li>
        <li>House group (where entered)</li>
      </ul>
      <p>Full names are only visible to signed-in coordinators. Public result views show first name + last initial + school only.</p>

      <h3>Coordinator Account Data</h3>
      <ul>
        <li>Email address (for account access and notifications)</li>
        <li>School name and role</li>
        <li>Access code and subscription status (Carnival Timing)</li>
      </ul>

      <h3>Contact Form Submissions (School Sport Portal)</h3>
      <ul>
        <li>Name, email address, school, and message content</li>
        <li>Used only to respond to your enquiry</li>
      </ul>

      <h3>Technical Data</h3>
      <ul>
        <li>Browser type and device (Cloudflare analytics only \u2014 no cookies placed)</li>
        <li>Pages visited and time on site (aggregate, not individual tracking)</li>
        <li>IP address (retained by Cloudflare per their standard policy, not accessed by us)</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>3. How We Use Your Data</h2>
    <div class="card">
      <p>We use data only for the following purposes:</p>
      <ul>
        <li><strong>Displaying carnival results</strong> \u2014 showing times and placings to school staff and parents</li>
        <li><strong>Selecting representative teams</strong> \u2014 surfacing top performers at district, division and region level</li>
        <li><strong>Account management</strong> \u2014 validating access codes and processing subscriptions</li>
        <li><strong>Responding to enquiries</strong> \u2014 replying to contact form submissions</li>
        <li><strong>Improving our products</strong> \u2014 fixing bugs, improving reliability, adding features</li>
      </ul>
      <p>We do <strong>not</strong> use data for advertising, profiling, or any purpose unrelated to school sport.</p>
    </div>
  </div>

  <div class="section">
    <h2>4. Data Storage &amp; Security</h2>
    <div class="card">
      <p>All data is stored in Australia using the following services:</p>
      <ul>
        <li><strong>Cloudflare Workers &amp; KV</strong> \u2014 edge infrastructure with Australian data residency</li>
        <li><strong>Google Firebase Realtime Database</strong> \u2014 Australian region (australia-southeast1)</li>
      </ul>
      <p>Access to student data requires coordinator authentication. Public-facing result pages display only anonymised data (first name + last initial). We use HTTPS across all services. No passwords are stored \u2014 access is managed via Cloudflare Access and single-use codes.</p>
    </div>
  </div>

  <div class="section">
    <h2>5. Data Retention</h2>
    <div class="card">
      <p>Carnival result data is retained for a maximum of 3 years to support historical team selection records. Contact form submissions are retained for 12 months. You may request deletion of any data we hold about your school at any time by emailing <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a>.</p>
    </div>
  </div>

  <div class="section">
    <h2>6. Sharing of Data</h2>
    <div class="card">
      <p>We do not sell, rent, or share personal data with third parties, except:</p>
      <ul>
        <li><strong>Stripe</strong> \u2014 payment processing for Carnival Timing subscriptions. Stripe handles card data directly; we never see or store payment card numbers.</li>
        <li><strong>Resend</strong> \u2014 transactional email delivery for contact form replies and access code emails.</li>
        <li><strong>Cloudflare</strong> \u2014 infrastructure provider. Cloudflare processes request data per their own Privacy Policy.</li>
      </ul>
      <p>All third-party providers are bound by data processing agreements and applicable privacy law.</p>
    </div>
  </div>

  <div class="section">
    <h2>7. Australian Privacy Act Compliance</h2>
    <div class="card">
      <p>Luck Dragon Pty Ltd is committed to compliance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs). In particular:</p>
      <ul>
        <li><strong>APP 1</strong> \u2014 This policy is publicly available and describes our data practices</li>
        <li><strong>APP 3</strong> \u2014 We collect only information reasonably necessary for our school sport functions</li>
        <li><strong>APP 6</strong> \u2014 Data is used only for the primary purpose of collection</li>
        <li><strong>APP 8</strong> \u2014 Cross-border disclosures are limited to service providers with equivalent protections</li>
        <li><strong>APP 11</strong> \u2014 We take reasonable steps to protect data from misuse, loss, and unauthorised access</li>
        <li><strong>APP 12/13</strong> \u2014 Individuals and schools may access and correct data held about them on request</li>
      </ul>
      <p>As our products are used in Victorian government school settings, we also have regard to the <em>Privacy and Data Protection Act 2014</em> (Vic) and Department of Education guidelines for school data management.</p>
    </div>
  </div>

  <div class="section">
    <h2>8. Children's Privacy</h2>
    <div class="card">
      <p>Our products are designed for use by school sport coordinators and PE teachers, not directly by children. Students do not create accounts or directly interact with our platforms. Student data is entered by authorised school staff only. Public result views are limited to non-identifying information (first name, last initial, school, time).</p>
      <p>Schools are responsible for obtaining any required parental consents in accordance with their own privacy policies and department requirements before entering student data.</p>
    </div>
  </div>

  <div class="section">
    <h2>9. Your Rights</h2>
    <div class="card">
      <p>You (or your school) may at any time:</p>
      <ul>
        <li>Request a copy of data we hold about your school</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your school's data</li>
        <li>Opt out of any communications from us</li>
      </ul>
      <p>To exercise any of these rights, email <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a>. We will respond within 30 days.</p>
    </div>
  </div>

  <div class="section">
    <h2>10. Changes to This Policy</h2>
    <div class="card">
      <p>We may update this Privacy Policy from time to time. Material changes will be notified to active subscribers by email. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of our products after changes constitutes acceptance of the updated policy.</p>
    </div>
  </div>

  <div class="section">
    <h2>11. Contact &amp; Complaints</h2>
    <div class="card">
      <p>For privacy enquiries or complaints:</p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a></li>
        <li><strong>Company:</strong> Luck Dragon Pty Ltd, ABN 64 697 434 898</li>
        <li><strong>Location:</strong> Victoria, Australia</li>
      </ul>
      <p>If you are not satisfied with our response to a complaint, you may contact the <a href="https://www.oaic.gov.au" target="_blank" rel="noopener">Office of the Australian Information Commissioner (OAIC)</a>.</p>
    </div>
  </div>
</div>
<footer>
  &copy; 2026 Luck Dragon Pty Ltd &nbsp;&middot;&nbsp; ABN 64 697 434 898 &nbsp;&middot;&nbsp;
  <a href="/privacy">Privacy Policy</a> &nbsp;&middot;&nbsp; <a href="/terms">Terms of Service</a> &nbsp;&middot;&nbsp;
  <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> &nbsp;&middot;&nbsp; <a href="https://sportportal.com.au" target="_blank" rel="noopener">sportportal.com.au</a>
</footer></body>
</html>`;
var TERMS_HTML_SSP = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Terms of Service \u2014 Luck Dragon</title>
<meta name="robots" content="index, follow">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#0f172a;line-height:1.7}
a{color:#1a56db;text-decoration:none}a:hover{text-decoration:underline}
.hero{background:linear-gradient(135deg,#0d1b3e 0%,#1a3a6e 60%,#1a56db 100%);color:#fff;padding:56px 24px 72px;text-align:center;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:36px;background:#f8fafc;clip-path:ellipse(55% 100% at 50% 100%)}
.badge{display:inline-block;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.4);color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 14px;border-radius:20px;margin-bottom:14px}
.hero h1{font-size:clamp(26px,5vw,40px);font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
.hero p{font-size:14px;opacity:.78;max-width:520px;margin:0 auto}
.container{max-width:760px;margin:0 auto;padding:48px 24px 80px}
.section{margin-bottom:40px}
h2{font-size:18px;font-weight:800;color:#0d1b3e;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
h3{font-size:14px;font-weight:700;color:#0f172a;margin:18px 0 6px}
p{font-size:14px;color:#334155;margin-bottom:10px}
ul{font-size:14px;color:#334155;padding-left:20px;margin-bottom:10px}
ul li{margin-bottom:5px}
.card{background:#fff;border-radius:14px;padding:22px 26px;box-shadow:0 2px 10px rgba(0,0,0,.07);margin-bottom:16px}
.highlight{background:#fef3c7;border:1px solid #fcd34d;border-radius:10px;padding:14px 18px;font-size:13px;color:#92400e;margin:16px 0}
.pricing{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin:12px 0}
.price-card{background:#f1f5f9;border-radius:10px;padding:16px;text-align:center}
.price-card .plan{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#64748b;margin-bottom:4px}
.price-card .amount{font-size:24px;font-weight:900;color:#0d1b3e}
.price-card .period{font-size:11px;color:#94a3b8;margin-top:2px}
.updated{font-size:12px;color:#94a3b8;margin-bottom:32px}
footer{background:#0d1b3e;color:rgba(255,255,255,.5);text-align:center;padding:24px;font-size:12px}
footer a{color:rgba(255,255,255,.7)}
</style>
</head>
<body>
<div class="hero">
  <div class="badge">Legal</div>
  <h1>Terms of Service</h1>
  <p>The terms that govern your use of School Sport Portal, Carnival Timing, and SportCarnival.</p>
</div>
<div class="container">
  <p class="updated">Last updated: 1 May 2026 &nbsp;\xB7&nbsp; Luck Dragon Pty Ltd (ABN 64 697 434 898)</p>

  <div class="highlight">
    By using any Luck Dragon product, you agree to these terms. If you are using our products on behalf of a school, you confirm you have authority to bind the school to these terms.
  </div>

  <div class="section">
    <h2>1. Our Products</h2>
    <div class="card">
      <p>Luck Dragon Pty Ltd (ABN 64 697 434 898) provides three school sport software products:</p>
      <ul>
        <li><strong>School Sport Portal</strong> (schoolsportportal.com.au) \u2014 school, district, and division sport information portals for Australian primary schools</li>
        <li><strong>Carnival Timing</strong> (carnivaltiming.com) \u2014 real-time race timing and results management for school athletics, swimming, and cross country carnivals</li>
        <li><strong>SportCarnival</strong> (sportcarnival.com.au) \u2014 carnival draw and results management tools</li>
      </ul>
      <p>These Terms of Service apply to all three products and any associated services.</p>
    </div>
  </div>

  <div class="section">
    <h2>2. Eligibility &amp; Account Access</h2>
    <div class="card">
      <p>Our products are intended for use by:</p>
      <ul>
        <li>PE teachers, sport coordinators, and school administrators at Australian primary and secondary schools</li>
        <li>District, division, and regional sport coordinators</li>
        <li>Parents and community members viewing published results (read-only)</li>
      </ul>
      <p>You must be 18 years or older to create an account or purchase a subscription. Students do not create accounts and do not directly use our platforms \u2014 all student data is entered by authorised school staff.</p>
    </div>
  </div>

  <div class="section">
    <h2>3. Carnival Timing \u2014 Pricing &amp; Subscriptions</h2>
    <div class="card">
      <p>Carnival Timing is a paid product. Current pricing:</p>
      <div class="pricing">
        <div class="price-card"><div class="plan">Per Carnival</div><div class="amount">$49</div><div class="period">One-time, per event</div></div>
        <div class="price-card"><div class="plan">Annual</div><div class="amount">$149</div><div class="period">Per year, unlimited carnivals</div></div>
      </div>
      <h3>Payment</h3>
      <p>Payments are processed securely by Stripe. We do not store card details. All prices are in AUD and include 10% GST. Luck Dragon Pty Ltd is registered for GST (effective 23 April 2026). Stripe issues a tax invoice on payment showing the GST split.</p>
      <h3>Access Codes</h3>
      <p>On successful payment, you receive an access code by email. This code is linked to your school and grants access to the Carnival Timing app for the purchased period. Access codes are non-transferable.</p>
      <h3>Refunds</h3>
      <p>Per-carnival purchases ($49): if you experience a technical failure that prevents you from running your carnival and we are unable to resolve it, we will issue a full refund. Change-of-mind refunds are not available once an access code has been used to enter athlete data.</p>
      <p>Annual subscriptions ($149): a full refund is available within 14 days of purchase if no carnival data has been entered. After 14 days or after use, no refund is available.</p>
      <p>To request a refund, email <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> with your access code and reason.</p>
    </div>
  </div>

  <div class="section">
    <h2>4. School Sport Portal \u2014 Pricing</h2>
    <div class="card">
      <p>School Sport Portal is priced at <strong>$1 per student per year inc GST</strong> ($0.91 ex GST + $0.09 GST) for schools with a managed portal. District and division portals are priced separately \u2014 contact us for a quote. A free demo portal is available at <a href="https://schoolsportportal.com.au/demo-school">schoolsportportal.com.au/demo-school</a>.</p>
      <p>SportCarnival is currently free to use. Future paid features will be announced with at least 30 days notice to existing users.</p>
    </div>
  </div>

  <div class="section">
    <h2>5. Acceptable Use</h2>
    <div class="card">
      <p>You agree not to:</p>
      <ul>
        <li>Enter false or fabricated student data, results, or times</li>
        <li>Share access codes with schools or individuals not covered by your subscription</li>
        <li>Attempt to reverse-engineer, copy, or reproduce our software or designs</li>
        <li>Use our products for any purpose other than legitimate school sport coordination</li>
        <li>Scrape, bulk-download, or systematically extract data from our platforms</li>
        <li>Attempt to access accounts or data belonging to other schools</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>6. Student Data Responsibility</h2>
    <div class="card">
      <p>Schools are responsible for:</p>
      <ul>
        <li>Ensuring they have appropriate authority to enter student data into our systems</li>
        <li>Complying with their own school and departmental privacy policies when using our products</li>
        <li>Notifying us promptly if student data needs to be corrected or removed</li>
        <li>Keeping their access credentials secure</li>
      </ul>
      <p>We act as a data processor on behalf of schools for student performance data. Schools remain the data controller under the <em>Privacy Act 1988</em> (Cth) and relevant state legislation.</p>
    </div>
  </div>

  <div class="section">
    <h2>7. Accuracy of Results</h2>
    <div class="card">
      <p>Carnival Timing is a software tool designed to assist with manual race timing. We make no guarantee that recorded times are officially accurate for purposes beyond school sport carnivals. Results recorded by our system should be verified by a qualified official before being used for any formal selection, record-keeping, or competitive purpose beyond the school carnival level.</p>
      <p>Luck Dragon Pty Ltd accepts no liability for decisions made by schools, districts, divisions, or regions based on timing data recorded using our products.</p>
    </div>
  </div>

  <div class="section">
    <h2>8. Service Availability</h2>
    <div class="card">
      <p>We aim for high availability but do not guarantee uninterrupted access. Our products run on Cloudflare's global network, which has strong uptime guarantees, but maintenance, updates, or unexpected outages may occur. We are not liable for losses arising from service unavailability.</p>
      <p>If a paid service is unavailable on the day of your carnival due to our error, we will provide a refund as described in Section 3.</p>
    </div>
  </div>

  <div class="section">
    <h2>9. Intellectual Property</h2>
    <div class="card">
      <p>All software, designs, text, and branding on our platforms are owned by Luck Dragon Pty Ltd. You may not copy, reproduce, or create derivative works from any part of our products without prior written consent. Student performance data entered by schools remains the property of the relevant school.</p>
    </div>
  </div>

  <div class="section">
    <h2>10. Limitation of Liability</h2>
    <div class="card">
      <p>To the maximum extent permitted by Australian law, Luck Dragon Pty Ltd's total liability to you for any claim arising from your use of our products is limited to the amount you paid us in the 12 months preceding the claim (or $100 if you have not paid us anything).</p>
      <p>We are not liable for indirect, incidental, or consequential losses including lost data, missed carnival events, or decisions made based on our results.</p>
      <p>Nothing in these terms excludes rights you have under Australian consumer law that cannot be excluded by contract.</p>
    </div>
  </div>

  <div class="section">
    <h2>11. Governing Law</h2>
    <div class="card">
      <p>These Terms of Service are governed by the laws of Victoria, Australia. Any disputes will be subject to the non-exclusive jurisdiction of the courts of Victoria.</p>
    </div>
  </div>

  <div class="section">
    <h2>12. Changes to These Terms</h2>
    <div class="card">
      <p>We may update these terms from time to time. Active subscribers will be notified of material changes by email at least 14 days before they take effect. Continued use of our products after that date constitutes acceptance of the updated terms.</p>
    </div>
  </div>

  <div class="section">
    <h2>13. Contact</h2>
    <div class="card">
      <ul>
        <li><strong>Email:</strong> <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a></li>
        <li><strong>Company:</strong> Luck Dragon Pty Ltd</li>
        <li><strong>ABN:</strong> 64 697 434 898</li>
        <li><strong>Location:</strong> Victoria, Australia</li>
      </ul>
    </div>
  </div>
</div>
<footer>
  &copy; 2026 Luck Dragon Pty Ltd &nbsp;&middot;&nbsp; ABN 64 697 434 898 &nbsp;&middot;&nbsp;
  <a href="/privacy">Privacy Policy</a> &nbsp;&middot;&nbsp; <a href="/terms">Terms of Service</a> &nbsp;&middot;&nbsp;
  <a href="mailto:info@schoolsportportal.com.au">info@schoolsportportal.com.au</a> &nbsp;&middot;&nbsp; <a href="https://sportportal.com.au" target="_blank" rel="noopener">sportportal.com.au</a>
</footer></body>
</html>`;
var SSP_NAV_JS = `// School Sport Portal \u2014 shared top nav
// Auto-injects a header with breadcrumb + footer with Privacy/Terms/Help links
(function() {
  const scriptTag = document.currentScript;
  const site = scriptTag ? (scriptTag.getAttribute('data-site') || '') : '';

  const NAV_HTML = \`
<style>
  .ssp-topbar {
    position: sticky; top: 0; z-index: 100;
    background: #0d1b3e; color: #fff;
    padding: 8px 16px; display: flex; align-items: center; justify-content: space-between;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px; box-shadow: 0 1px 4px rgba(0,0,0,.2);
  }
  .ssp-topbar a { color: #fff; text-decoration: none; opacity: .8; transition: opacity .15s; }
  .ssp-topbar a:hover { opacity: 1; }
  .ssp-topbar .ssp-brand { font-weight: 800; letter-spacing: -.01em; }
  .ssp-topbar .ssp-links { display: flex; gap: 16px; font-size: 12px; }
  .ssp-bottombar {
    background: #0f172a; color: rgba(255,255,255,.55);
    text-align: center; padding: 18px 16px; font-size: 12px;
    margin-top: 60px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .ssp-bottombar a { color: rgba(255,255,255,.7); text-decoration: none; margin: 0 10px; }
  .ssp-bottombar a:hover { color: #fff; }
  .ssp-bottombar .ssp-foot-meta { font-size: 11px; margin-top: 6px; opacity: .6; }
\`+ '@media (max-width: 480px) { .ssp-topbar .ssp-links { gap: 10px; font-size: 11px; } }' +
\`</style>
<div class="ssp-topbar">
  <div class="ssp-brand"><a href="/">School Sport Portal</a></div>
  <div class="ssp-links">
    <a href="/help">Help</a>
    <a href="https://carnivaltiming.com">Carnival Timing</a>
    <a href="https://sportcarnival.com.au">Sport Carnival</a>
  </div>
</div>
\`;

  const FOOT_HTML = \`
<div class="ssp-bottombar">
  <a href="/">Home</a>
  <a href="/help">Help</a>
  <a href="/privacy">Privacy Policy</a>
  <a href="/terms">Terms of Service</a>
  <a href="mailto:info@schoolsportportal.com.au">Contact</a>
  <div class="ssp-foot-meta">
    schoolsportportal.com.au &middot; Luck Dragon Pty Ltd &middot; \` + new Date().getFullYear() + \`
  </div>
</div>
\`;

  // Inject top nav at start of body
  function inject() {
    if (!document.body) return;
    if (document.querySelector('.ssp-topbar')) return; // already injected
    const top = document.createElement('div');
    top.innerHTML = NAV_HTML;
    document.body.insertBefore(top.firstElementChild, document.body.firstChild);
    // Also pull style block
    const styleNode = top.querySelector('style');
    if (styleNode) document.head.appendChild(styleNode);

    // Footer
    const foot = document.createElement('div');
    foot.innerHTML = FOOT_HTML;
    document.body.appendChild(foot.firstElementChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
`;
var _SEC_HEADERS = {
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: wss: data: blob:; frame-ancestors 'self';"
};
var SSP_HELP_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Getting Started \u2014 School Sport Portal</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8faff;color:#1e293b;line-height:1.6}
nav{background:#1e3a8a;padding:14px 24px;display:flex;align-items:center;gap:16px}
nav a{color:rgba(255,255,255,0.7);text-decoration:none;font-size:.9rem}
nav a:hover{color:#fff}
nav .logo{font-weight:700;color:#fff;margin-right:auto;font-size:1.05rem}
.hero{background:linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 100%);padding:52px 24px 40px;text-align:center;color:#fff}
.hero h1{font-size:2.1rem;font-weight:800;margin-bottom:10px}
.hero p{color:rgba(255,255,255,0.75);font-size:1.05rem;max-width:520px;margin:0 auto}
.container{max-width:820px;margin:0 auto;padding:48px 24px 80px}
h2{font-size:1.3rem;font-weight:700;color:#1e3a8a;margin:44px 0 16px;display:flex;align-items:center;gap:10px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
p{color:#475569;margin-bottom:12px}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.05)}
.card h3{color:#1e293b;font-size:1rem;margin-bottom:6px}
.card p{font-size:.9rem;color:#64748b;margin:0}
.tip{background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin:16px 0;font-size:.9rem;color:#1e40af}
.tip strong{font-weight:700}
.steps .step{display:flex;gap:16px;margin-bottom:20px;align-items:flex-start}
.step-num{background:#1d4ed8;color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;flex-shrink:0;margin-top:2px}
.step-body h3{color:#1e293b;font-size:.95rem;margin-bottom:4px}
.step-body p{font-size:.875rem;color:#64748b;margin:0}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin:16px 0}
.grid-item{background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:16px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.grid-item h4{color:#1e293b;font-size:.95rem;margin-bottom:6px}
.grid-item p{font-size:.82rem;color:#64748b;margin:0}
.badge{display:inline-block;background:#059669;color:#fff;font-size:.75rem;font-weight:700;padding:2px 8px;border-radius:4px;margin-left:8px}
.cta{background:linear-gradient(135deg,#1d4ed8,#7c3aed);border-radius:12px;padding:28px;text-align:center;margin-top:40px;color:#fff}
.cta h3{font-size:1.2rem;margin-bottom:8px}
.cta p{color:rgba(255,255,255,0.75);margin-bottom:18px}
.cta a{display:inline-block;background:#fff;color:#1d4ed8;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none}
footer{text-align:center;padding:24px;border-top:1px solid #e2e8f0;font-size:.85rem;color:#94a3b8}
footer a{color:#94a3b8;text-decoration:none}
</style>
</head>
<body>
<nav>
  <span class="logo">\u{1F3EB} School Sport Portal</span>
  <a href="/">Home</a>
  <a href="/privacy">Privacy</a>
  <a href="/terms">Terms</a>
</nav>
<div class="hero">
  <h1>Getting Started</h1>
  <p>Set up your school sport portal in minutes. Enter student data once \u2014 use it everywhere.</p>
</div>
<div class="container">

  <h2>What Is School Sport Portal?</h2>
  <p>School Sport Portal (SSP) is a single place to manage all of your school's sport carnivals. One student roster feeds your cross country draw, swimming carnival, athletics program, and district entries \u2014 no re-keying, no wrong age groups, no double-handling.</p>
  <p><strong>Pricing: $1 per student per year.</strong> A school with 400 students pays $400/year. That's it.</p>

  <h2>Step 1: Book a Demo or Sign Up</h2>
  <p>We set up every school personally to make sure the configuration is right for your setup.</p>
  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <h3>Fill in the demo request form at schoolsportportal.com.au</h3>
        <p>Takes 2 minutes. Tell us your school name, rough student count, and which carnivals you run.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <h3>We'll reach out within 1 school day</h3>
        <p>We'll confirm your school's configuration and send a payment link.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <h3>Pay securely via Stripe</h3>
        <p>Card payment, no lock-in contract. Annual subscription renews each year \u2014 cancel any time.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">4</div>
      <div class="step-body">
        <h3>Your portal goes live</h3>
        <p>You get a unique URL for your school (e.g. sportcarnival.com.au/yourschool) and login credentials.</p>
      </div>
    </div>
  </div>

  <h2>Step 2: Upload Your Student Roster</h2>
  <p>Your student roster is the foundation. Upload once at the start of the year and it powers everything.</p>
  <div class="card">
    <h3>CSV Upload (Recommended)</h3>
    <p>Export from your school system (Compass, Sentral, CASES21) \u2014 first name, last initial, year level. We handle the rest.</p>
  </div>
  <div class="card">
    <h3>Manual Entry</h3>
    <p>Add students one by one via the portal interface. Good for small schools or mid-year additions.</p>
  </div>
  <div class="tip"><strong>Privacy note:</strong> We only store first name + last initial. No DOBs, no addresses. Data is stored in Australia and never shared.</div>

  <h2>Step 3: Run Your Carnivals</h2>
  <p>Once your roster is loaded, running a carnival is simple.</p>
  <div class="grid">
    <div class="grid-item">
      <h4>\u{1F3C3} Cross Country</h4>
      <p>Auto-generates the age group draw with bib numbers. Export to PDF for printing.</p>
    </div>
    <div class="grid-item">
      <h4>\u{1F3CA} Swimming</h4>
      <p>Build heat sheets by age group and stroke. House points tallied automatically.</p>
    </div>
    <div class="grid-item">
      <h4>\u{1F3C3}\u200D\u2642\uFE0F Athletics</h4>
      <p>Track and field event management. Results published live for parents to follow.</p>
    </div>
    <div class="grid-item">
      <h4>\u{1F4CB} District Entry</h4>
      <p>Select your qualifiers \u2014 their bib numbers and times are pre-filled from your results.</p>
    </div>
  </div>

  <h2>Step 4: Live Timing with Carnival Timing</h2>
  <p>SSP connects directly with <a href="https://carnivaltiming.com" style="color:#1d4ed8">Carnival Timing</a> for live results on the day.</p>
  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <h3>SSP subscribers get a free Carnival Timing code <span class="badge">Included</span></h3>
        <p>No separate purchase needed \u2014 it's bundled with your portal subscription.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <h3>Open carnivaltiming.com on your phone at the carnival</h3>
        <p>Enter your school-specific code. Your student roster pre-loads automatically.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <h3>Results publish live to your school page</h3>
        <p>Parents can follow along at sportcarnival.com.au/yourschool in real time.</p>
      </div>
    </div>
  </div>

  <h2>Frequently Asked Questions</h2>
  <div class="card">
    <h3>Does it work on a Chromebook?</h3>
    <p>Yes \u2014 SSP and Carnival Timing both run in any modern browser. No installs, no apps.</p>
  </div>
  <div class="card">
    <h3>What if I don't have good internet at the oval?</h3>
    <p>Carnival Timing works offline for timing \u2014 results sync when you reconnect. The live spectator board needs internet but that's optional.</p>
  </div>
  <div class="card">
    <h3>Can I use it just for one carnival?</h3>
    <p>Carnival Timing is available as a standalone $49 single-carnival purchase. SSP is an annual subscription \u2014 it's designed for schools running multiple carnivals per year.</p>
  </div>
  <div class="card">
    <h3>Is student data safe?</h3>
    <p>Yes. We store first name + last initial only, all data is in Australia, TLS 1.2+ encrypted, and we never share or sell data. See our <a href="/privacy" style="color:#1d4ed8">Privacy Policy</a> for full details.</p>
  </div>
  <div class="card">
    <h3>How do I get help on the day?</h3>
    <p>Email info@schoolsportportal.com.au \u2014 we respond same day during school term. For urgent issues on carnival day, there's a phone number in your welcome email.</p>
  </div>

  <div class="cta">
    <h3>Ready to simplify your school's sport?</h3>
    <p>Book a free demo and we'll have you set up before your next carnival.</p>
    <a href="/#contact">Book a Demo \u2192</a>
  </div>
</div>
<footer>
  <a href="/">School Sport Portal</a> &nbsp;\xB7&nbsp; <a href="/privacy">Privacy Policy</a> &nbsp;\xB7&nbsp; <a href="/terms">Terms of Service</a> &nbsp;\xB7&nbsp; <a href="https://sportportal.com.au" target="_blank" rel="noopener">Sport Portal</a><br>
  <span style="margin-top:6px;display:block">\xA9 2026 Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898</span>
</footer></body>
</html>`;
var SSP_SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://schoolsportportal.com.au/</loc><priority>1.0</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://schoolsportportal.com.au/help</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://schoolsportportal.com.au/demo-school</loc><priority>0.7</priority></url>
  <url><loc>https://schoolsportportal.com.au/demo-district</loc><priority>0.7</priority></url>
  <url><loc>https://schoolsportportal.com.au/demo-division</loc><priority>0.7</priority></url>
  <url><loc>https://schoolsportportal.com.au/demo-region</loc><priority>0.7</priority></url>
  <url><loc>https://schoolsportportal.com.au/privacy</loc><priority>0.4</priority></url>
  <url><loc>https://schoolsportportal.com.au/terms</loc><priority>0.4</priority></url>
  <url><loc>https://schoolsportportal.com.au/cookies</loc><priority>0.3</priority></url>
  <url><loc>https://schoolsportportal.com.au/subprocessors</loc><priority>0.3</priority></url>
  <url><loc>https://schoolsportportal.com.au/security</loc><priority>0.4</priority></url>
  <url><loc>https://schoolsportportal.com.au/sla</loc><priority>0.4</priority></url>
  <url><loc>https://schoolsportportal.com.au/accessibility</loc><priority>0.3</priority></url>
  <url><loc>https://schoolsportportal.com.au/child-safety</loc><priority>0.4</priority></url>
</urlset>`;
var SSP_ROBOTS_TXT = `User-agent: *
Allow: /
Sitemap: https://schoolsportportal.com.au/sitemap.xml`;
function renderSchoolPortal(school, students, carnivals, qualifierCount) {
  const byYear = {};
  for (const s of students) {
    const yr = s.year_level || "Unknown";
    if (!byYear[yr]) byYear[yr] = [];
    byYear[yr].push(s);
  }
  const yearOrder = ["Prep", "Foundation", "1", "2", "3", "4", "5", "6"];
  const sortedYears = Object.keys(byYear).sort((a, b) => {
    const ai = yearOrder.indexOf(a), bi = yearOrder.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  const houses = [...new Set(students.map((s) => s.house).filter(Boolean))].sort();
  const houseCounts = {};
  for (const h of houses) houseCounts[h] = students.filter((s) => s.house === h).length;
  const yearRows = sortedYears.map((yr) => {
    const stu = byYear[yr];
    const names = stu.map((s) => `${s.first_name}${s.last_name_initial ? " " + s.last_name_initial + "." : ""}`).join(", ");
    return `<tr><td style="padding:10px 14px;font-weight:600;color:#1e3a8a;white-space:nowrap">Year ${yr}</td><td style="padding:10px 14px;color:#475569">${stu.length} students</td><td style="padding:10px 14px;color:#64748b;font-size:.9rem">${names}</td></tr>`;
  }).join("");
  const houseCards = houses.map((h) => `
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:16px;text-align:center;min-width:100px">
      <div style="font-size:1.6rem;font-weight:800;color:#1d4ed8">${houseCounts[h]}</div>
      <div style="font-size:.85rem;color:#64748b;margin-top:4px">${h}</div>
    </div>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${school.name} \u2014 School Sport Portal</title>
<meta name="robots" content="noindex">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;color:#1e293b}
.hero{background:linear-gradient(135deg,#0d1b3e,#1a3a6e);color:#fff;padding:40px 24px;text-align:center}
.hero h1{font-size:1.8rem;font-weight:800;margin-bottom:8px}
.hero p{color:#94a3b8;font-size:.95rem}
.badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);padding:4px 14px;border-radius:999px;font-size:.8rem;margin-top:12px}
.container{max-width:900px;margin:0 auto;padding:28px 16px}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:20px}
.card-head{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}
.card-head h2{font-size:1rem;font-weight:700;color:#0d1b3e}
.stat{font-size:.85rem;color:#64748b}
table{width:100%;border-collapse:collapse}
th{background:#f8fafc;text-align:left;padding:10px 14px;font-size:.82rem;font-weight:600;color:#64748b;border-bottom:1px solid #e2e8f0}
td{border-bottom:1px solid #f8fafc}
tr:last-child td{border:none}
.footer{text-align:center;padding:32px 16px;color:#94a3b8;font-size:.8rem}
.footer a{color:#64748b;text-decoration:none}
</style>
</head>
<body>
<div class="hero">
  <div style="font-size:2rem;margin-bottom:12px">\u{1F3EB}</div>
  <h1>${school.name}</h1>
  <p>School Sport Portal${school.suburb ? " \xB7 " + school.suburb + (school.state ? ", " + school.state : "") : ""}</p>
  <span class="badge">\u{1F512} School-only view</span>
</div>

<div class="container">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin-bottom:20px">
    <div class="card" style="padding:16px;text-align:center"><div style="font-size:1.8rem;font-weight:800;color:#1d4ed8">${students.length}</div><div style="font-size:.82rem;color:#64748b;margin-top:4px">Students</div></div>
    <div class="card" style="padding:16px;text-align:center"><div style="font-size:1.8rem;font-weight:800;color:#1d4ed8">${sortedYears.length}</div><div style="font-size:.82rem;color:#64748b;margin-top:4px">Year Levels</div></div>
    <div class="card" style="padding:16px;text-align:center"><div style="font-size:1.8rem;font-weight:800;color:#1d4ed8">${houses.length}</div><div style="font-size:.82rem;color:#64748b;margin-top:4px">Houses</div></div>
    <div class="card" style="padding:16px;text-align:center"><div style="font-size:1.8rem;font-weight:800;color:#059669">${qualifierCount}</div><div style="font-size:.82rem;color:#64748b;margin-top:4px">Qualifiers</div></div>
  </div>

  ${houses.length > 0 ? `
  <div class="card">
    <div class="card-head"><h2>Houses</h2></div>
    <div style="padding:16px;display:flex;flex-wrap:wrap;gap:10px">${houseCards}</div>
  </div>` : ""}

  ${students.length > 0 ? `
  <div class="card">
    <div class="card-head"><h2>Students by Year Level</h2><span class="stat">${students.length} total</span></div>
    <table>
      <thead><tr><th>Year</th><th>Count</th><th>Students</th></tr></thead>
      <tbody>${yearRows}</tbody>
    </table>
  </div>` : `
  <div class="card" style="padding:40px;text-align:center;color:#64748b">
    <p style="font-size:1rem">Student roster not yet uploaded.</p>
    <p style="font-size:.85rem;margin-top:8px">Log in to your <a href="/admin" style="color:#1d4ed8">admin dashboard</a> to upload your CSV.</p>
  </div>`}

  ${carnivals.length > 0 ? `
  <div class="card">
    <div class="card-head"><h2>Carnivals</h2></div>
    <div style="padding:16px;display:flex;flex-wrap:wrap;gap:8px">
      ${carnivals.map((c) => `<span style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;padding:6px 14px;font-size:.85rem;color:#374151">\u{1F3C3} ${c.name}${c.date ? " \u2014 " + c.date : ""}</span>`).join("")}
    </div>
  </div>` : ""}
</div>

<div class="footer">
  <p><a href="https://schoolsportportal.com.au">School Sport Portal</a> \xB7 <a href="https://carnivaltiming.com">Carnival Timing</a> \xB7 <a href="/admin">Admin</a></p>
  <p style="margin-top:8px">Powered by Luck Dragon Pty Ltd \xB7 <a href="/privacy">Privacy</a></p>
</div>
</body></html>`;
}
__name(renderSchoolPortal, "renderSchoolPortal");
__name2(renderSchoolPortal, "renderSchoolPortal");
__name22(renderSchoolPortal, "renderSchoolPortal");
__name222(renderSchoolPortal, "renderSchoolPortal");
async function _innerFetch(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === "/login" || path === "/logout" || path === "/setup" || path === "/thanks" || path === "/stripe-webhook" || path.startsWith("/admin")) {
    return _adminFetch(request, env);
  }
  if (path === "/" || path === "/index.html") {
    return new Response(INDEX_HTML, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=300",
        "X-Robots-Tag": "index, follow",
        "X-Source": "embedded-v2"
      }
    });
  }
  if (path === "/api/roster") {
    const schoolId = url.searchParams.get("id") || "";
    const token = url.searchParams.get("token") || "";
    if (!schoolId) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing id" }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    if (!env.DB) {
      return new Response(
        JSON.stringify({ ok: false, error: "DB unavailable" }),
        { status: 503, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    const school = await env.DB.prepare("SELECT id, name, api_token FROM schools WHERE id = ? AND active = 1").bind(schoolId).first();
    if (!school) {
      return new Response(
        JSON.stringify({ ok: false, error: "School not found" }),
        { status: 404, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    if (school.api_token && token !== school.api_token) {
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    const students = await env.DB.prepare(
      "SELECT first_name, last_name_initial, year_level, gender, bib_number FROM students WHERE school_id = ? AND active = 1 AND bib_number IS NOT NULL ORDER BY bib_number ASC"
    ).bind(schoolId).all();
    const bibs = {};
    const list = students.results || [];
    for (const s of list) {
      const displayName = s.first_name + (s.last_name_initial ? " " + s.last_name_initial : "");
      bibs[String(s.bib_number)] = { n: displayName, s: school.name, y: s.year_level || "", g: s.gender || "" };
    }
    return new Response(
      JSON.stringify({ ok: true, school: school.name, count: list.length, bibs }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Cache-Control": "no-cache" } }
    );
  }
  const GH_BASE = "https://raw.githubusercontent.com/LuckDragonAsgard/schoolsportportal/main";
  const ghPages = ["/williamstowndistrict.html", "/hobsonsbaydivision.html"];
  let normPath = path;
  if (!normPath.includes(".") && normPath !== "/") {
    normPath = normPath + ".html";
  }
  if (ghPages.includes(normPath)) {
    const ghResponse = await fetch(GH_BASE + normPath + "?_cb=" + Date.now() + "_" + Math.random().toString(36).slice(2), { cf: { cacheTtl: 0, cacheEverything: false } });
    const html = await ghResponse.text();
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, must-revalidate",
        "X-Robots-Tag": "index, follow",
        "X-Source": "github-latest"
      }
    });
  }
  if (path.startsWith("/primarydistrict/")) {
    const GH_PD = "https://raw.githubusercontent.com/LuckDragonAsgard/schoolsportportal/main";
    let pdPath = path;
    if (!pdPath.endsWith(".html")) pdPath = pdPath + ".html";
    const pdResponse = await fetch(GH_PD + pdPath + "?_cb=" + Date.now() + "_" + Math.random().toString(36).slice(2), { cf: { cacheTtl: 0, cacheEverything: false } });
    if (pdResponse.ok) {
      const html = await pdResponse.text();
      return new Response(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache, must-revalidate",
          "X-Robots-Tag": "index, follow",
          "X-Source": "github-primarydistrict"
        }
      });
    }
    return new Response(LEGAL_PAGES["404"], { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
  if (path === "/demo-school" || normPath === "/demo-school.html") {
    return new Response(injectDemoBanner(DEMO_SCHOOL, "school"), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300", "X-Source": "embedded-demo" } });
  }
  if (path === "/demo-district" || normPath === "/demo-district.html") {
    return new Response(injectDemoBanner(DEMO_DISTRICT, "district"), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300", "X-Source": "embedded-demo" } });
  }
  if (path === "/demo-division" || normPath === "/demo-division.html") {
    return new Response(injectDemoBanner(DEMO_DIVISION, "division"), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300", "X-Source": "embedded-demo" } });
  }
  if (path === "/demo-region" || normPath === "/demo-region.html") {
    return new Response(injectDemoBanner(DEMO_REGION, "region"), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300", "X-Source": "embedded-demo" } });
  }
  {
    const slug = path.slice(1).split("/")[0].replace(/\.html$/, "");
    if (slug && !slug.includes(".") && env.DB) {
      const schoolRec = await env.DB.prepare("SELECT * FROM schools WHERE id = ? AND active = 1").bind(slug).first();
      if (schoolRec) {
        const [{ results: stuList }, { results: carnivalList }, qualRow] = await Promise.all([
          env.DB.prepare("SELECT * FROM students WHERE school_id = ? AND active = 1 ORDER BY year_level, first_name").bind(slug).all(),
          env.DB.prepare("SELECT * FROM carnivals WHERE school_id = ? ORDER BY date DESC").bind(slug).all(),
          env.DB.prepare("SELECT COUNT(*) as n FROM results r JOIN carnivals c ON r.carnival_id = c.id WHERE c.school_id = ? AND r.qualified = 1").bind(slug).first()
        ]);
        return new Response(renderSchoolPortal(schoolRec, stuList, carnivalList, qualRow?.n || 0), {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache", "X-Source": "embedded-d1" }
        });
      }
    }
  }
  if (path === "/williamstownprimary" || normPath === "/williamstownprimary.html" || normPath === "/williamstownps.html") {
    return new Response(WPS_HTML, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300", "X-Source": "embedded-wps" } });
  }
  if (path === "/hobsonsbay" || path === "/hobsonsbaydivision" || normPath === "/hobsonsbaydivision.html" || normPath === "/hobsonsbay.html") {
    return new Response(HOBSONS_HTML, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300", "X-Source": "embedded-hobsons" } });
  }
  if (path === "/help") {
    return new Response(SSP_HELP_HTML, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600", "X-Source": "embedded-help" } });
  }
  if (path === "/schoolsportportal-nav.js") {
    return new Response(SSP_NAV_JS, { status: 200, headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "public, max-age=600", "Access-Control-Allow-Origin": "*", "X-Source": "embedded-nav" } });
  }
  if (path === "/og-image.svg") {
    return new Response('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d1b3e"/><stop offset=".6" stop-color="#1a3a6e"/><stop offset="1" stop-color="#1a56db"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><text x="600" y="220" font-family="sans-serif" font-size="86" font-weight="900" fill="#fff" text-anchor="middle">School Sport Portal</text><text x="600" y="295" font-family="sans-serif" font-size="36" font-weight="500" fill="#fcd34d" text-anchor="middle">Live carnival timing for AU primary schools</text><text x="600" y="430" font-family="sans-serif" font-size="34" font-weight="700" fill="#fcd34d" text-anchor="middle">$1 per student per year inc GST</text></svg>', { status: 200, headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" } });
  }
  if (path === "/favicon.svg" || path === "/favicon.ico") {
    return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#0d1b3e"/><path d="M28 14 c2-1 5-1 7 0 1 1 1 3 0 4 -2 1 -5 1 -7 0 -1-1-1-3 0-4z" fill="#f59e0b"/><path d="M22 24 l8-2 6 4 4 8 -3 6 -8-3 -2-6 -5-3 z" fill="#f59e0b"/><path d="M28 36 l-3 10 5 0 2-7" fill="#f59e0b"/><path d="M36 36 l5 8 4-3 -3-8" fill="#f59e0b"/></svg>`, { status: 200, headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" } });
  }
  if (path === "/.well-known/security.txt" || path === "/security.txt") {
    return new Response("Contact: mailto:security@schoolsportportal.com.au\nContact: mailto:info@schoolsportportal.com.au\nExpires: 2027-05-05T00:00:00.000Z\nEncryption: https://schoolsportportal.com.au/.well-known/pgp-key.txt\nAcknowledgments: https://schoolsportportal.com.au/changelog\nPreferred-Languages: en\nCanonical: https://schoolsportportal.com.au/.well-known/security.txt\nPolicy: https://schoolsportportal.com.au/security\nHiring: https://schoolsportportal.com.au/about\n\n# Vulnerability disclosure for School Sport Portal, Carnival Timing, and SportCarnival.\n# Please email security@schoolsportportal.com.au with details.\n# We respond within 48 hours and aim to fix critical issues within 7 days.\n# Responsible discloseres are credited in the changelog.\n", { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" } });
  }
  if (path === "/sitemap.xml") {
    return new Response(SSP_SITEMAP_XML, { status: 200, headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=86400" } });
  }
  if (path === "/robots.txt") {
    return new Response(SSP_ROBOTS_TXT, { status: 200, headers: { "Content-Type": "text/plain", "Cache-Control": "public, max-age=86400" } });
  }
  if (["/cookies", "/subprocessors", "/security", "/sla", "/accessibility", "/child-safety", "/about", "/changelog", "/modern-slavery"].includes(path)) {
    const slug = path.slice(1);
    const html = LEGAL_PAGES[slug];
    if (html) return new Response(html, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600", "X-Source": "embedded-legal" } });
  }
  if (path === "/privacy") {
    return new Response(PRIVACY_HTML_SSP, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600", "X-Source": "embedded-policy" } });
  }
  if (path === "/terms") {
    return new Response(TERMS_HTML_SSP, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600", "X-Source": "embedded-policy" } });
  }
  return new Response(LEGAL_PAGES["404"], { status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Source": "embedded-404" } });
}
__name(_innerFetch, "_innerFetch");
__name2(_innerFetch, "_innerFetch");
__name22(_innerFetch, "_innerFetch");
__name222(_innerFetch, "_innerFetch");
function injectDemoBanner(html, kind) {
  const banner = `
<div style="background:linear-gradient(90deg,#f59e0b,#f97316);color:#fff;text-align:center;padding:14px 18px;margin:0 0 0 0;display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<span style="font-size:.95rem;font-weight:600">\u2728 Demo ${kind} \u2014 fictional data</span>
<a href="https://sportcarnival.com.au" target="_blank" style="background:#fff;color:#b45309;padding:6px 16px;border-radius:8px;text-decoration:none;font-weight:700;font-size:.85rem;white-space:nowrap">\u25B6 See live integration demo</a>
<a href="https://schoolsportportal.com.au/#contact" style="background:rgba(255,255,255,.18);color:#fff;border:1px solid rgba(255,255,255,.3);padding:6px 16px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.85rem;white-space:nowrap">Set up your school \u2192</a>
</div>`;
  return html.replace(/<body[^>]*>/, (m) => m + banner);
}
__name(injectDemoBanner, "injectDemoBanner");
__name2(injectDemoBanner, "injectDemoBanner");
__name22(injectDemoBanner, "injectDemoBanner");
__name222(injectDemoBanner, "injectDemoBanner");
async function verifyStripeSignature(body, sigHeader, secret) {
  if (!sigHeader || !secret) return false;
  const parts = sigHeader.split(",");
  const ts = parts.find((p) => p.startsWith("t="))?.slice(2);
  const v1 = parts.find((p) => p.startsWith("v1="))?.slice(3);
  if (!ts || !v1) return false;
  const payload = ts + "." + body;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const expected = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return expected === v1;
}
__name(verifyStripeSignature, "verifyStripeSignature");
__name2(verifyStripeSignature, "verifyStripeSignature");
__name22(verifyStripeSignature, "verifyStripeSignature");
__name222(verifyStripeSignature, "verifyStripeSignature");
async function checkLoginRateLimit(env, email) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1e3;
  const limit = 5;
  try {
    await env.DB.prepare("DELETE FROM login_attempts WHERE ts < ?").bind(now - windowMs).run();
    const row = await env.DB.prepare("SELECT COUNT(*) as c FROM login_attempts WHERE email = ? AND ts > ?").bind(email, now - windowMs).first();
    if (row && row.c >= limit) return false;
    await env.DB.prepare("INSERT INTO login_attempts (email, ts) VALUES (?, ?)").bind(email, now).run();
    return true;
  } catch (e) {
    return true;
  }
}
__name(checkLoginRateLimit, "checkLoginRateLimit");
__name2(checkLoginRateLimit, "checkLoginRateLimit");
__name22(checkLoginRateLimit, "checkLoginRateLimit");
__name222(checkLoginRateLimit, "checkLoginRateLimit");
var worker_default = {
  async fetch(request, env, ctx) {
    const _r = await _innerFetch(request, env, ctx);
    const _ct = _r.headers.get("Content-Type") || "";
    if (_ct.includes("text/html") && _r.status < 400) {
      try {
        const _txt = await _r.text();
        let _outBody = _txt;
        if (!_txt.includes('href="/security"') && _txt.includes("</body>")) {
          _outBody = _txt.replace("</body>", `<div style="background:#f1f5f9;border-top:1px solid #e2e8f0;padding:14px 16px;font-size:11px;color:#94a3b8;text-align:center;font-family:-apple-system,sans-serif;line-height:1.7"><strong style="color:#64748b">Luck Dragon Pty Ltd \xB7 ABN 64 697 434 898 \xB7 </strong><a href="/about" style="color:#64748b;margin:0 4px">About</a> \xB7 <a href="/privacy" style="color:#64748b;margin:0 4px">Privacy</a> \xB7 <a href="/terms" style="color:#64748b;margin:0 4px">Terms</a> \xB7 <a href="/cookies" style="color:#64748b;margin:0 4px">Cookies</a> \xB7 <a href="/subprocessors" style="color:#64748b;margin:0 4px">Subprocessors</a> \xB7 <a href="/security" style="color:#64748b;margin:0 4px">Security</a> \xB7 <a href="/sla" style="color:#64748b;margin:0 4px">SLA</a> \xB7 <a href="/accessibility" style="color:#64748b;margin:0 4px">Accessibility</a> \xB7 <a href="/child-safety" style="color:#64748b;margin:0 4px">Child Safety</a> \xB7 <a href="/changelog" style="color:#64748b;margin:0 4px">Changelog</a> \xB7 <a href="https://asgard-status.pgallivan.workers.dev/" style="color:#64748b;margin:0 4px">Status</a></div></body>`);
        }
        const _newHeaders = new Headers(_r.headers);
        _newHeaders.delete("Content-Length");
        const _n2 = new Response(_outBody, { status: _r.status, statusText: _r.statusText, headers: _newHeaders });
        Object.entries(_SEC_HEADERS).forEach(([k, v]) => _n2.headers.set(k, v));
        return _n2;
      } catch (e) {
        return new Response("Internal error", { status: 500, headers: { "Content-Type": "text/plain" } });
      }
    }
    const _n = new Response(_r.body, _r);
    Object.entries(_SEC_HEADERS).forEach(([k, v]) => _n.headers.set(k, v));
    return _n;
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=ssp-portal-clean.js.map

--8036075cefc8e3f8fcc6d8c95d9d47afd2824671fa7ba1cc652ba5b96804--
