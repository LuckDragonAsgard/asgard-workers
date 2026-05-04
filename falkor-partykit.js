// falkor-partykit v1 — live multiplayer KBT trivia rooms via Durable Objects
const CORS = { 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Methods':'GET,POST,OPTIONS', 'Access-Control-Allow-Headers':'Content-Type, X-Pin' };

export class TriviaRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sockets = [];
  }

  async fetch(req) {
    const url = new URL(req.url);
    const sub = url.pathname.split('/').pop();

    // WebSocket upgrade
    if (req.headers.get('Upgrade') === 'websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      server.accept();
      this.sockets.push(server);
      const room = (await this.state.storage.get('room')) || {};
      server.send(JSON.stringify({ type:'state', room }));
      server.addEventListener('message', async ev => {
        try {
          const m = JSON.parse(ev.data);
          if (m.type === 'join') {
            const r = (await this.state.storage.get('room')) || {};
            r.players = r.players || [];
            if (!r.players.includes(m.player)) r.players.push(m.player);
            await this.state.storage.put('room', r);
            this.broadcast({ type:'players', players: r.players });
          }
        } catch(e){}
      });
      server.addEventListener('close', () => {
        this.sockets = this.sockets.filter(s => s !== server);
      });
      return new Response(null, { status: 101, webSocket: client });
    }

    // POST /init — initialize room
    if (sub === 'init' && req.method === 'POST') {
      const body = await req.json().catch(()=>({}));
      const room = { code: body.code, theme: body.theme || 'general', host: body.host || '', players: [], current_question: null, scores: {}, state: 'lobby', created_at: Date.now() };
      await this.state.storage.put('room', room);
      return Response.json({ ok:true, room });
    }

    // POST /start
    if (sub === 'start' && req.method === 'POST') {
      const room = (await this.state.storage.get('room')) || {};
      room.state = 'playing';
      room.current_question = { id: 1, q: 'What is the capital of Australia?', options: ['Sydney','Canberra','Melbourne','Brisbane'], a: 'Canberra' };
      await this.state.storage.put('room', room);
      this.broadcast({ type:'question', question: { id: room.current_question.id, q: room.current_question.q, options: room.current_question.options } });
      return Response.json({ ok:true });
    }

    // POST /answer
    if (sub === 'answer' && req.method === 'POST') {
      const body = await req.json();
      const room = (await this.state.storage.get('room')) || {};
      room.scores = room.scores || {};
      const correct = body.answer === room.current_question?.a;
      if (correct) room.scores[body.player] = (room.scores[body.player] || 0) + 10;
      await this.state.storage.put('room', room);
      this.broadcast({ type:'answer', player: body.player, correct, scores: room.scores });
      return Response.json({ ok:true, correct });
    }

    // GET /state (default)
    const room = (await this.state.storage.get('room')) || null;
    if (!room) return Response.json({ ok:false, error: 'room not initialized' }, { status: 404 });
    return Response.json({ ok:true, room });
  }

  broadcast(msg) {
    const json = JSON.stringify(msg);
    this.sockets.forEach(s => { try { s.send(json); } catch(e){} });
  }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });

    if (url.pathname === '/health') {
      return Response.json({ ok:true, worker:'falkor-partykit', version:'1.0.0' }, { headers: CORS });
    }

    // POST /room/create body={code,theme,host}
    if (url.pathname === '/room/create' && req.method === 'POST') {
      const body = await req.json();
      if (!body.code) return Response.json({ error:'code required' }, { status: 400, headers: CORS });
      const id = env.TRIVIA_ROOM.idFromName(body.code);
      const stub = env.TRIVIA_ROOM.get(id);
      const r = await stub.fetch('https://internal/init', { method:'POST', body: JSON.stringify(body), headers: {'Content-Type':'application/json'} });
      const out = await r.json();
      return new Response(JSON.stringify(out), { status: r.status, headers: { ...CORS, 'Content-Type':'application/json' } });
    }

    // /room/:code/(state|start|answer|ws)
    const m = url.pathname.match(/^\/room\/([^/]+)(?:\/([a-z]+))?$/i);
    if (m) {
      const code = m[1], action = m[2] || 'state';
      const id = env.TRIVIA_ROOM.idFromName(code);
      const stub = env.TRIVIA_ROOM.get(id);
      // Pass through to DO with action as last path segment
      const url2 = 'https://internal/' + action;
      const init = { method: req.method, headers: req.headers };
      if (req.method === 'POST') {
        init.body = await req.text();
        init.headers = { ...Object.fromEntries(req.headers), 'Content-Type':'application/json' };
      }
      // For WS, forward upgrade headers
      if (req.headers.get('Upgrade') === 'websocket') {
        return stub.fetch(new Request(url2, { headers: req.headers }));
      }
      return stub.fetch(url2, init);
    }

    return Response.json({ error:'not found', path: url.pathname }, { status: 404, headers: CORS });
  }
};
