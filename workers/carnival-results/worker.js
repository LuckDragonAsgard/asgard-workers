
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const origin = request.headers.get('origin') || '';
    const allowedOrigins = ['https://schoolsportportal.com.au', 'https://www.schoolsportportal.com.au', 'https://sportcarnival.com.au'];
    const corsOrigin = allowedOrigins.includes(origin) ? origin : '*';
    const cors = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    };
    if (request.method === 'OPTIONS') return new Response(null, {headers: cors});

    // GET /api/results/:code
    if (request.method === 'GET' && path.startsWith('/api/results/')) {
      const code = path.split('/')[3];
      if (!code) return new Response('Missing code', {status:400});
      const carnival = await env.DB.prepare('SELECT * FROM carnivals WHERE code = ?').bind(code).first();
      if (!carnival) return new Response(JSON.stringify({error:'Not found'}), {status:404, headers:{...cors,'Content-Type':'application/json'}});
      const rows = await env.DB.prepare('SELECT race_key, data FROM results WHERE code = ? ORDER BY published_at ASC').bind(code).all();
      const results = {};
      for (const row of rows.results) results[row.race_key] = JSON.parse(row.data);
      return new Response(JSON.stringify({code, meta:{school:carnival.school,sport:carnival.sport,name:carnival.name}, results}), {headers:{...cors,'Content-Type':'application/json'}});
    }

    // GET /api/list?school=X&sport=Y
    if (request.method === 'GET' && path === '/api/list') {
      const school = url.searchParams.get('school') || '';
      const sport = url.searchParams.get('sport') || '';
      let q = 'SELECT code,school,sport,name,published_at FROM carnivals WHERE 1=1';
      const p = [];
      if (school) { q += ' AND LOWER(school) LIKE ?'; p.push('%'+school.toLowerCase()+'%'); }
      if (sport) { q += ' AND LOWER(sport) LIKE ?'; p.push('%'+sport.toLowerCase()+'%'); }
      q += ' ORDER BY published_at DESC LIMIT 50';
      const stmt = env.DB.prepare(q);
      const rows = await (p.length ? stmt.bind(...p) : stmt).all();
      return new Response(JSON.stringify(rows.results), {headers:{...cors,'Content-Type':'application/json'}});
    }

    // POST /api/results/:code
    if (request.method === 'POST' && path.startsWith('/api/results/')) {
      const code = path.split('/')[3];
      if (!code) return new Response('Missing code', {status:400});
      const body = await request.json();
      const {meta, results} = body;
      const now = Date.now();
      await env.DB.prepare('INSERT INTO carnivals (code,school,sport,name,published_at) VALUES (?,?,?,?,?) ON CONFLICT(code) DO UPDATE SET school=excluded.school,sport=excluded.sport,name=excluded.name,published_at=excluded.published_at')
        .bind(code, meta?.school||'', meta?.sport||'', meta?.name||'', now).run();
      if (results && typeof results === 'object') {
        for (const [raceKey, raceData] of Object.entries(results)) {
          await env.DB.prepare('INSERT INTO results (code,race_key,event_name,heat_name,published_at,data) VALUES (?,?,?,?,?,?) ON CONFLICT(code,race_key) DO UPDATE SET data=excluded.data,published_at=excluded.published_at')
            .bind(code, raceKey, raceData.eventName||'', raceData.heatName||'', now, JSON.stringify(raceData)).run();
        }
      }
      return new Response(JSON.stringify({success:true}), {headers:{...cors,'Content-Type':'application/json'}});
    }


    // GET /api/winners?division=X&year=Y
    if (request.method === 'GET' && path === '/api/winners') {
      const division = url.searchParams.get('division') || '';
      const year = parseInt(url.searchParams.get('year') || '0', 10);
      if (!division || !year) return new Response(JSON.stringify({error:'Missing division or year'}), {status:400, headers:{...cors,'Content-Type':'application/json'}});
      const rows = await env.DB.prepare('SELECT sport, gender, district, winner, runner_up, updated_at FROM division_winners WHERE division=? AND year=?').bind(division, year).all();
      // Group into { "sport__gender": { districts: { district: {winner, runnerUp} } } }
      const out = {};
      let lastUpdated = 0;
      for (const r of (rows.results || [])) {
        const key = r.sport + '__' + r.gender.replace(/\//g,'_');
        if (!out[key]) out[key] = { districts: {} };
        out[key].districts[r.district] = { winner: r.winner, runnerUp: r.runner_up };
        if (r.updated_at > lastUpdated) lastUpdated = r.updated_at;
      }
      return new Response(JSON.stringify({division, year, data: out, lastUpdated}), {headers:{...cors,'Content-Type':'application/json','Cache-Control':'public, max-age=30'}});
    }

    // POST /api/winners — body: {division, year, sport, gender, district, winner, runnerUp?}
    if (request.method === 'POST' && path === '/api/winners') {
      const b = await request.json();
      if (!b.division || !b.year || !b.sport || !b.gender || !b.district) return new Response(JSON.stringify({error:'Missing required fields'}), {status:400, headers:{...cors,'Content-Type':'application/json'}});
      const now = Date.now();
      await env.DB.prepare('INSERT INTO division_winners (division,year,sport,gender,district,winner,runner_up,updated_at) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(division,year,sport,gender,district) DO UPDATE SET winner=excluded.winner,runner_up=excluded.runner_up,updated_at=excluded.updated_at').bind(b.division, b.year, b.sport, b.gender, b.district, b.winner||'', b.runnerUp||'', now).run();
      return new Response(JSON.stringify({success:true}), {headers:{...cors,'Content-Type':'application/json'}});
    }

    // GET /health
    if (request.method === 'GET' && path === '/health') {
      return new Response(JSON.stringify({ok:true,worker:'carnival-results',version:'1.2.0'}), {headers:{...cors,'Content-Type':'application/json'}});
    }


    // ─── AUTH HELPERS ─────────────────────────────────────────────────
    const enc = new TextEncoder();
    async function hmac(secret, data) {
      const key = await crypto.subtle.importKey('raw', enc.encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['sign']);
      const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
      return Array.from(new Uint8Array(sig)).map(b=>b.toString(16).padStart(2,'0')).join('');
    }
    function parseCookie(req, name) {
      const c = req.headers.get('cookie') || '';
      const m = c.split(';').map(s=>s.trim()).find(s=>s.startsWith(name+'='));
      return m ? decodeURIComponent(m.slice(name.length+1)) : null;
    }
    async function getCurrentUser(req, env) {
      const auth = req.headers.get('authorization') || '';
      let token = '';
      if (auth.startsWith('Bearer ')) token = auth.slice(7);
      if (!token) token = parseCookie(req, 'ssp_session') || '';
      if (!token) return null;
      const [email, expiry, sig] = token.split('|');
      if (!email || !expiry || !sig) return null;
      if (parseInt(expiry,10) < Date.now()) return null;
      const expected = await hmac(env.SESSION_SECRET, email + '|' + expiry);
      if (sig !== expected) return null;
      const u = await env.DB.prepare('SELECT * FROM users WHERE email=?').bind(email).first();
      return u || null;
    }

    // ─── POST /auth/login ─ {email} → email magic link ───────────────
    if (request.method === 'POST' && path === '/auth/login') {
      const {email} = await request.json();
      if (!email) return new Response(JSON.stringify({error:'Missing email'}), {status:400, headers:{...cors,'Content-Type':'application/json'}});
      const user = await env.DB.prepare('SELECT email,role FROM users WHERE LOWER(email)=LOWER(?)').bind(email).first();
      if (!user) return new Response(JSON.stringify({error:'Email not authorised. Ask the admin to add you.'}), {status:403, headers:{...cors,'Content-Type':'application/json'}});
      const token = crypto.randomUUID().replace(/-/g,'') + crypto.randomUUID().replace(/-/g,'');
      const now = Date.now();
      const expiresAt = now + 15*60*1000; // 15 min
      await env.DB.prepare('INSERT INTO auth_tokens (token,email,created_at,expires_at) VALUES (?,?,?,?)').bind(token, user.email, now, expiresAt).run();
      const link = 'https://schoolsportportal.com.au/auth/verify?token=' + token;
      // Send via Resend
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {'Authorization':'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},
          body: JSON.stringify({
            from: 'School Sport Portal <noreply@luckdragon.io>',
            to: user.email,
            subject: 'Your School Sport Portal login link',
            html: `<p>Hi,</p><p>Click here to sign in to the School Sport Portal:</p><p><a href="${link}">${link}</a></p><p>Link expires in 15 minutes.</p>`
          })
        });
      } catch(e) {}
      return new Response(JSON.stringify({sent:true, email: user.email}), {headers:{...cors,'Content-Type':'application/json'}});
    }

    // ─── GET /auth/verify?token=X ─ → set cookie, redirect ────────────
    if (request.method === 'GET' && path === '/auth/verify') {
      const token = url.searchParams.get('token');
      if (!token) return new Response('Missing token', {status:400});
      const row = await env.DB.prepare('SELECT * FROM auth_tokens WHERE token=?').bind(token).first();
      if (!row) return new Response('Invalid token', {status:401});
      if (row.used_at) return new Response('Token already used', {status:401});
      if (row.expires_at < Date.now()) return new Response('Token expired', {status:401});
      await env.DB.prepare('UPDATE auth_tokens SET used_at=? WHERE token=?').bind(Date.now(), token).run();
      await env.DB.prepare('UPDATE users SET last_login=? WHERE email=?').bind(Date.now(), row.email).run();
      const expiry = Date.now() + 24*60*60*1000;
      const sig = await hmac(env.SESSION_SECRET, row.email + '|' + expiry);
      const sessionToken = row.email + '|' + expiry + '|' + sig;
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Signing you in…</title><style>body{font-family:system-ui;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}.box{text-align:center}</style></head><body><div class="box"><h1>Signing you in…</h1><p id="msg">Please wait.</p></div><script>localStorage.setItem('ssp_session',${JSON.stringify(sessionToken)});location.replace('https://schoolsportportal.com.au/williamstowndistrict');</script></body></html>`;
      return new Response(html, {status:200, headers:{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store'}});
    }

    // ─── POST /auth/logout ────────────────────────────────────────────
    if (request.method === 'POST' && path === '/auth/logout') {
      return new Response(JSON.stringify({ok:true}), {headers:{...cors,'Content-Type':'application/json','Set-Cookie':'ssp_session=; Path=/; Max-Age=0; Domain=schoolsportportal.com.au'}});
    }

    // ─── GET /auth/me ─────────────────────────────────────────────────
    if (request.method === 'GET' && path === '/auth/me') {
      const u = await getCurrentUser(request, env);
      return new Response(JSON.stringify(u || {anonymous:true}), {headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store'}});
    }

    // ─── GET /api/scores?district=X ───────────────────────────────────
    if (request.method === 'GET' && path === '/api/scores') {
      const district = url.searchParams.get('district') || '';
      const season = parseInt(url.searchParams.get('season') || new Date().getFullYear(), 10);
      let q = 'SELECT * FROM scores WHERE season=?';
      const p = [season];
      if (district) { q += ' AND LOWER(district)=LOWER(?)'; p.push(district); }
      q += ' ORDER BY sport, gender, place';
      const rows = await env.DB.prepare(q).bind(...p).all();
      return new Response(JSON.stringify(rows.results || []), {headers:{...cors,'Content-Type':'application/json','Cache-Control':'public, max-age=30'}});
    }

    // ─── POST /api/scores (auth: coach for own district, admin for any) ──
    if (request.method === 'POST' && path === '/api/scores') {
      const u = await getCurrentUser(request, env);
      if (!u) return new Response(JSON.stringify({error:'Not authenticated'}), {status:401, headers:{...cors,'Content-Type':'application/json'}});
      const b = await request.json();
      if (!b.district || !b.sport || !b.gender || !b.school) return new Response(JSON.stringify({error:'Missing required fields'}), {status:400, headers:{...cors,'Content-Type':'application/json'}});
      const id = b.id || (b.district + '_' + b.sport + '_' + b.gender + '_' + b.school + '_' + (b.season || new Date().getFullYear())).toLowerCase().replace(/[^a-z0-9_]/g,'-');
      const now = Date.now();
      await env.DB.prepare('INSERT INTO scores (id,district,sport,gender,school,points,place,season,created_by,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET points=excluded.points, place=excluded.place, updated_at=excluded.updated_at').bind(id, b.district, b.sport, b.gender, b.school, b.points || 0, b.place || 0, b.season || new Date().getFullYear(), u.email, now, now).run();
      return new Response(JSON.stringify({ok:true,id}), {headers:{...cors,'Content-Type':'application/json'}});
    }

    // ─── DELETE /api/scores/:id (admin only) ──────────────────────────
    if (request.method === 'DELETE' && path.startsWith('/api/scores/')) {
      const u = await getCurrentUser(request, env);
      if (!u || u.role !== 'admin') return new Response(JSON.stringify({error:'Admin only'}), {status:403, headers:{...cors,'Content-Type':'application/json'}});
      const id = decodeURIComponent(path.slice('/api/scores/'.length));
      await env.DB.prepare('DELETE FROM scores WHERE id=?').bind(id).run();
      return new Response(JSON.stringify({deleted:id}), {headers:{...cors,'Content-Type':'application/json'}});
    }

    // ─── GET /api/users (admin only) ──────────────────────────────────
    if (request.method === 'GET' && path === '/api/users') {
      const u = await getCurrentUser(request, env);
      if (!u || u.role !== 'admin') return new Response(JSON.stringify({error:'Admin only'}), {status:403, headers:{...cors,'Content-Type':'application/json'}});
      const rows = await env.DB.prepare('SELECT email,display_name,role,created_at,last_login FROM users ORDER BY created_at DESC').all();
      return new Response(JSON.stringify(rows.results || []), {headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store'}});
    }

    // ─── POST /api/users (admin only — create coach) ───────────────────
    if (request.method === 'POST' && path === '/api/users') {
      const u = await getCurrentUser(request, env);
      if (!u || u.role !== 'admin') return new Response(JSON.stringify({error:'Admin only'}), {status:403, headers:{...cors,'Content-Type':'application/json'}});
      const b = await request.json();
      if (!b.email) return new Response(JSON.stringify({error:'Missing email'}), {status:400, headers:{...cors,'Content-Type':'application/json'}});
      await env.DB.prepare('INSERT INTO users (email,display_name,role,created_at) VALUES (?,?,?,?) ON CONFLICT(email) DO UPDATE SET display_name=excluded.display_name, role=excluded.role').bind(b.email, b.displayName||'', b.role||'coach', Date.now()).run();
      return new Response(JSON.stringify({ok:true,email:b.email}), {headers:{...cors,'Content-Type':'application/json'}});
    }

    // ─── DELETE /api/users/:email (admin only) ─────────────────────────
    if (request.method === 'DELETE' && path.startsWith('/api/users/')) {
      const u = await getCurrentUser(request, env);
      if (!u || u.role !== 'admin') return new Response(JSON.stringify({error:'Admin only'}), {status:403, headers:{...cors,'Content-Type':'application/json'}});
      const email = decodeURIComponent(path.slice('/api/users/'.length));
      if (email === u.email) return new Response(JSON.stringify({error:"Can't delete self"}), {status:400, headers:{...cors,'Content-Type':'application/json'}});
      await env.DB.prepare('DELETE FROM users WHERE email=?').bind(email).run();
      return new Response(JSON.stringify({deleted:email}), {headers:{...cors,'Content-Type':'application/json'}});
    }

    return new Response('Not found', {status:404});
  }
};