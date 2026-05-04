
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
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
      return new Response(JSON.stringify({ok:true,worker:'carnival-results',version:'1.1.0'}), {headers:{...cors,'Content-Type':'application/json'}});
    }

    return new Response('Not found', {status:404});
  }
};