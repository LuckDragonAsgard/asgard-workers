addEventListener('fetch', event => { event.respondWith(handleRequest(event.request)); });

async function handleRequest(request) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Pin',
  };
  if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (request.headers.get('X-Pin') !== '535554') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  const url = new URL(request.url);
  const project = url.searchParams.get('project') || '';
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);

  const prefix = project ? (project + ':') : '';
  const list = await EMAIL_INBOX.list({ prefix, limit });

  const emails = (await Promise.all(list.keys.map(k => EMAIL_INBOX.get(k.name, 'json')))).filter(Boolean);
  emails.sort((a, b) => new Date(b.date) - new Date(a.date));

  return new Response(JSON.stringify({ emails, total: emails.length }), {
    headers: { ...cors, 'Content-Type': 'application/json' }
  });
}