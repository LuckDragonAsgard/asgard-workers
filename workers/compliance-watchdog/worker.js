// compliance-watchdog v0.1.0
// Continuous legal/compliance monitor across all LuckDragon domains.
// Cron-driven probes write to D1 compliance-db, dashboard at legal.luckdragon.io.

const PIN_HEADER = "X-Pin";

const PROBE_PATHS = [
  { path: "/", probe: "homepage" },
  { path: "/privacy", probe: "privacy_policy" },
  { path: "/privacy.html", probe: "privacy_policy_html" },
  { path: "/terms", probe: "terms_of_service" },
  { path: "/terms.html", probe: "terms_of_service_html" },
  { path: "/legal", probe: "legal_landing" },
  { path: "/cookies", probe: "cookies_policy" },
  { path: "/robots.txt", probe: "robots_txt" },
];

const SECURITY_HEADERS = [
  "strict-transport-security",
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
];

async function probeDomain(domain) {
  const results = [];
  for (const { path, probe } of PROBE_PATHS) {
    const url = `https://${domain}${path}`;
    try {
      const r = await fetch(url, {
        method: "GET",
        redirect: "manual",
        cf: { cacheTtl: 0 },
      });
      const body = path === "/terms" || path === "/terms.html"
        ? (await r.text()).slice(0, 5000)
        : "";
      const draftFlag = body && /\bdraft\b/i.test(body) ? "DRAFT_DETECTED" : "";
      const evidence = JSON.stringify({
        url,
        status: r.status,
        location: r.headers.get("location") || null,
        last_modified: r.headers.get("last-modified") || null,
        content_type: r.headers.get("content-type") || null,
        flag: draftFlag || null,
      });
      results.push({
        probe_type: probe,
        status: r.status >= 200 && r.status < 400 ? (draftFlag ? "draft" : "ok") : "missing",
        http_code: r.status,
        evidence,
      });
    } catch (e) {
      results.push({
        probe_type: probe,
        status: "error",
        http_code: 0,
        evidence: JSON.stringify({ url, error: String(e).slice(0, 300) }),
      });
    }
  }

  // Security headers probe (root only)
  try {
    const r = await fetch(`https://${domain}/`, { method: "HEAD" });
    const present = SECURITY_HEADERS.filter((h) => r.headers.get(h));
    const missing = SECURITY_HEADERS.filter((h) => !r.headers.get(h));
    results.push({
      probe_type: "security_headers",
      status: missing.length === 0 ? "ok" : missing.length <= 2 ? "partial" : "missing",
      http_code: r.status,
      evidence: JSON.stringify({ present, missing }),
    });
  } catch (e) {
    results.push({
      probe_type: "security_headers",
      status: "error",
      http_code: 0,
      evidence: JSON.stringify({ error: String(e).slice(0, 300) }),
    });
  }
  return results;
}

async function runScan(env, trigger = "cron") {
  const now = new Date().toISOString();
  const runRes = await env.DB.prepare(
    "INSERT INTO scan_runs (started_at, trigger) VALUES (?, ?) RETURNING id"
  ).bind(now, trigger).first();
  const runId = runRes.id;

  const { results: domains } = await env.DB.prepare(
    "SELECT name FROM domains WHERE status = 'active'"
  ).all();

  let probes = 0;
  let errors = 0;
  for (const d of domains) {
    const probeResults = await probeDomain(d.name);
    for (const p of probeResults) {
      try {
        await env.DB.prepare(`
          INSERT INTO domain_probes (domain, probe_type, status, http_code, evidence, last_run_iso)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(domain, probe_type) DO UPDATE SET
            status = excluded.status,
            http_code = excluded.http_code,
            evidence = excluded.evidence,
            last_run_iso = excluded.last_run_iso
        `).bind(d.name, p.probe_type, p.status, p.http_code, p.evidence, now).run();
        probes++;
      } catch (e) {
        errors++;
      }
    }
  }
  await env.DB.prepare(
    "UPDATE scan_runs SET finished_at = ?, domains_scanned = ?, checks_run = ?, errors = ? WHERE id = ?"
  ).bind(new Date().toISOString(), domains.length, probes, errors, runId).run();
  return { runId, domains: domains.length, probes, errors };
}

function score(probes) {
  // Returns red/amber/green for a project's probe set
  const has = (t) => probes.some((p) => p.probe_type === t && p.status === "ok");
  const draft = probes.some((p) => p.status === "draft");
  if (!has("privacy_policy") && !has("privacy_policy_html")) return "red";
  if (!has("terms_of_service") && !has("terms_of_service_html")) return "red";
  if (draft) return "red";
  const sec = probes.find((p) => p.probe_type === "security_headers");
  if (sec && sec.status === "missing") return "amber";
  return "green";
}

const css = `
  :root { --bg:#0b0d11; --fg:#e8eaed; --muted:#9aa0a6; --green:#34a853; --amber:#fbbc04; --red:#ea4335; --card:#161a21; --border:#1f242c; }
  * { box-sizing: border-box; }
  body { margin:0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:var(--bg); color:var(--fg); }
  header { padding:24px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
  header h1 { margin:0; font-size:22px; font-weight:600; }
  header .meta { color:var(--muted); font-size:13px; }
  main { max-width:1400px; margin:0 auto; padding:24px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(360px,1fr)); gap:16px; }
  .card { background:var(--card); border:1px solid var(--border); border-radius:8px; padding:16px; }
  .card h3 { margin:0 0 4px 0; font-size:15px; }
  .card .domain { color:var(--muted); font-size:12px; margin-bottom:10px; }
  .card .sector { display:inline-block; padding:2px 8px; border-radius:10px; background:#1f2937; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; }
  .pill { padding:2px 8px; border-radius:10px; font-size:11px; font-weight:600; }
  .pill.green { background:rgba(52,168,83,0.18); color:#7ee696; }
  .pill.amber { background:rgba(251,188,4,0.18); color:#ffd966; }
  .pill.red { background:rgba(234,67,53,0.18); color:#ff8a80; }
  .pill.gray { background:#1f242c; color:var(--muted); }
  .checks { margin-top:12px; display:flex; flex-wrap:wrap; gap:6px; }
  .check { font-size:11px; padding:2px 6px; border-radius:4px; background:#0f1318; }
  .check.ok { color:#7ee696; }
  .check.missing { color:#ff8a80; }
  .check.draft { color:#ffd966; }
  .summary { display:flex; gap:16px; margin-bottom:20px; flex-wrap:wrap; }
  .summary .box { padding:12px 16px; background:var(--card); border:1px solid var(--border); border-radius:8px; min-width:120px; }
  .summary .box .n { font-size:24px; font-weight:600; }
  .summary .box .l { color:var(--muted); font-size:12px; }
  a { color:#8ab4f8; text-decoration:none; }
  a:hover { text-decoration: underline; }
  details { margin-top:8px; }
  summary { cursor:pointer; color:var(--muted); font-size:12px; }
  .req-list { margin:6px 0 0 0; padding-left:18px; font-size:12px; }
  .req-list li { margin-bottom:2px; }
`;

async function renderDashboard(env) {
  const { results: projects } = await env.DB.prepare(`
    SELECT p.id, p.name, p.sector, p.description, p.primary_domain, p.status, p.repo
    FROM projects p
    ORDER BY p.sector, p.name
  `).all();

  const { results: domains } = await env.DB.prepare("SELECT * FROM domains").all();
  const domainsByProject = {};
  for (const d of domains) {
    domainsByProject[d.project_id] = domainsByProject[d.project_id] || [];
    domainsByProject[d.project_id].push(d);
  }

  const { results: probes } = await env.DB.prepare("SELECT * FROM domain_probes").all();
  const probesByDomain = {};
  for (const p of probes) {
    probesByDomain[p.domain] = probesByDomain[p.domain] || [];
    probesByDomain[p.domain].push(p);
  }

  const { results: zones } = await env.DB.prepare("SELECT * FROM regulatory_zones").all();
  const zonesByProject = {};
  for (const z of zones) {
    zonesByProject[z.project_id] = zonesByProject[z.project_id] || [];
    zonesByProject[z.project_id].push(z);
  }

  let counts = { red: 0, amber: 0, green: 0, gray: 0 };
  const cards = projects.map((p) => {
    const pds = domainsByProject[p.id] || [];
    const allProbes = pds.flatMap((d) => probesByDomain[d.name] || []);
    let stat = "gray";
    if (allProbes.length) stat = score(allProbes);
    counts[stat]++;
    const probeBadges = allProbes
      .filter((x) => ["privacy_policy", "terms_of_service", "security_headers"].includes(x.probe_type))
      .map((x) => `<span class="check ${x.status === "ok" ? "ok" : x.status === "draft" ? "draft" : "missing"}">${x.probe_type.replace("_", " ")}: ${x.status} (${x.http_code || "-"})</span>`)
      .join("");
    const reqs = (zonesByProject[p.id] || []).map((z) => `<li>${z.zone_code}${z.notes ? ` — ${z.notes}` : ""}</li>`).join("");
    return `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">
          <div>
            <h3>${p.name}</h3>
            <div class="domain">${p.primary_domain || "—"}${p.repo ? ` · <a href="https://github.com/${p.repo}" target="_blank">${p.repo.split("/")[1]}</a>` : ""}</div>
          </div>
          <span class="pill ${stat}">${stat.toUpperCase()}</span>
        </div>
        <span class="sector">${p.sector}</span>
        <span class="pill gray" style="margin-left:6px;">${p.status}</span>
        <div class="checks">${probeBadges || '<span class="check">no scan yet</span>'}</div>
        ${reqs ? `<details><summary>Regulatory zones (${(zonesByProject[p.id] || []).length})</summary><ul class="req-list">${reqs}</ul></details>` : ""}
      </div>`;
  }).join("");

  const lastScan = await env.DB.prepare("SELECT * FROM scan_runs ORDER BY id DESC LIMIT 1").first();
  const lastScanText = lastScan ? `Last scan: ${lastScan.started_at} (${lastScan.domains_scanned} domains, ${lastScan.checks_run} probes${lastScan.errors ? `, ${lastScan.errors} errors` : ""})` : "No scans yet — run /api/scan-all";

  return `<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Compliance Watchdog — Luck Dragon</title>
  <style>${css}</style>
</head><body>
  <header>
    <h1>⚖️  Compliance Watchdog</h1>
    <div class="meta">${lastScanText}</div>
  </header>
  <main>
    <div class="summary">
      <div class="box"><div class="n" style="color:#ff8a80">${counts.red}</div><div class="l">RED</div></div>
      <div class="box"><div class="n" style="color:#ffd966">${counts.amber}</div><div class="l">AMBER</div></div>
      <div class="box"><div class="n" style="color:#7ee696">${counts.green}</div><div class="l">GREEN</div></div>
      <div class="box"><div class="n" style="color:#9aa0a6">${counts.gray}</div><div class="l">UNSCANNED</div></div>
      <div class="box"><div class="n">${projects.length}</div><div class="l">PROJECTS</div></div>
      <div class="box"><div class="n">${domains.length}</div><div class="l">DOMAINS</div></div>
    </div>
    <div class="grid">${cards}</div>
  </main>
</body></html>`;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      const html = await renderDashboard(env);
      return new Response(html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-cache, no-store, must-revalidate",
          "x-content-type-options": "nosniff",
          "strict-transport-security": "max-age=31536000; includeSubDomains",
          "referrer-policy": "no-referrer",
        },
      });
    }

    if (url.pathname === "/api/projects") {
      const r = await env.DB.prepare("SELECT * FROM projects ORDER BY sector, name").all();
      return Response.json(r.results);
    }
    if (url.pathname === "/api/probes") {
      const r = await env.DB.prepare("SELECT * FROM domain_probes ORDER BY domain, probe_type").all();
      return Response.json(r.results);
    }
    if (url.pathname === "/api/zones") {
      const r = await env.DB.prepare("SELECT * FROM regulatory_zones").all();
      return Response.json(r.results);
    }
    if (url.pathname === "/api/requirements") {
      const r = await env.DB.prepare("SELECT * FROM requirements").all();
      return Response.json(r.results);
    }
    if (url.pathname === "/api/scan-all" && req.method === "POST") {
      if (req.headers.get(PIN_HEADER) !== env.WATCHDOG_PIN) return new Response("forbidden", { status: 403 });
      const r = await runScan(env, "manual");
      return Response.json(r);
    }
    if (url.pathname === "/api/scan-runs") {
      const r = await env.DB.prepare("SELECT * FROM scan_runs ORDER BY id DESC LIMIT 50").all();
      return Response.json(r.results);
    }
    if (url.pathname === "/health") {
      return Response.json({ ok: true, version: "0.1.0", service: "compliance-watchdog" });
    }
    return new Response("not found", { status: 404 });
  },

  async scheduled(event, env) {
    await runScan(env, `cron:${event.cron}`);
  },
};
