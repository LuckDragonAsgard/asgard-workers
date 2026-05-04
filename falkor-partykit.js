export class TriviaRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.clients = new Set();
  }

  async fetch(req) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (req.method === 'GET' && url.pathname === '/state') {
      const data = await this.state.storage.get('room') || { code, theme: 'general', host: '', players: [], current_question: null, scores: {}, state: 'lobby' };
      return Response.json(data);
    }

    if (req.method === 'POST' && url.pathname === '/start') {
      const room = await this.state.storage.get('room') || {};
      room.state = 'playing';
      room.current_question = { id: 1, text: 'What is the capital of Australia?', options: ['Sydney', 'Canberra', 'Melbourne', 'Brisbane'], answer: 'Canberra' };
      await this.state.storage.put('room', room);
      this.broadcast({ type: 'game_started', question: room.current_question });
      return Response.json({ ok: true });
    }

    if (req.method === 'POST' && url.pathname === '/answer') {
      const body = await req.json();
      const room = await this.state.storage.get('room') || {};
      if (!room.scores) room.scores = {};
      if (body.answer === room.current_question?.answer) {
        room.scores[body.player] = (room.scores[body.player] || 0) + 10;
      }
      await this.state.storage.put('room', room);
      this.broadcast({ type: 'answer_submitted', player: body.player, scores: room.scores });
      return Response.json({ ok: true });
    }

    if (req.headers.get('upgrade') === 'websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      this.clients.add(server);
      server.accept();
      server.addEventListener('message', (msg) => {
        this.broadcast(JSON.parse(msg.data));
      });
      server.addEventListener('close', () => this.clients.delete(server));
      return new Response(null, { status: 101, webSocket: client });
    }

    return Response.json({ error: 'not found' }, { status: 404 });
  }

  broadcast(msg) {
    const data = JSON.stringify(msg);
    for (const client of this.clients) {
      try { client.send(data); } catch (e) { this.clients.delete(client); }
    }
  }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    if (url.pathname === '/health') {
      return Response.json({ ok: true, worker: 'falkor-partykit', rooms_live: 0 });
    }

    const match = url.pathname.match(/^\/room\/([a-z0-9]+)(?:\/(\w+))?$/);
    if (!match) return Response.json({ error: 'not found' }, { status: 404 });

    const [, code, action] = match;

    if (req.method === 'POST' && action === 'create') {
      const body = await req.json();
      const room = env.TRIVIA_ROOM.get(env.TRIVIA_ROOM.idFromName(code));
      const data = { code, theme: body.theme || 'general', host: body.host || '', players: [], current_question: null, scores: {}, state: 'lobby' };
      await room.state.storage.put('room', data);
      return Response.json({ ok: true, code });
    }

    const room = env.TRIVIA_ROOM.get(env.TRIVIA_ROOM.idFromName(code));

    if (action === 'state') {
      return room.fetch(new Request(url.href + '?code=' + code, req));
    }
    if (action === 'start') {
      return room.fetch(new Request(url.href + '?code=' + code, { method: 'POST' }));
    }
    if (action === 'answer') {
      return room.fetch(new Request(url.href + '?code=' + code, { method: 'POST', body: req.body }));
    }
    if (action === 'ws') {
      return room.fetch(new Request(url.href + '?code=' + code, { headers: req.headers }));
    }

    return Response.json({ error: 'not found' }, { status: 404 });
  }
};
