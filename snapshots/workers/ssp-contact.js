// SSP Demo Request Contact Worker — v2 (auto-reply added)
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const ALLOWED_ORIGINS = [
  'https://schoolsportportal.com.au',
  'https://www.schoolsportportal.com.au'
];

async function handleRequest(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin);

  const cors = {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };

  if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  if (origin && !allowed) {
    return new Response(JSON.stringify({ ok: false, error: 'Forbidden' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  let body;
  try { body = await request.json(); }
  catch(e) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }),
      { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  const { name, email, school, role, students, message, website } = body;

  if (website) {
    return new Response(JSON.stringify({ ok: true }),
      { headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  if (!name || !email || !school) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }),
      { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid email address' }),
      { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  const clean = (s, max) => String(s || '').trim().slice(0, max);
  const safeName     = clean(name, 100);
  const safeEmail    = clean(email, 200);
  const safeSchool   = clean(school, 200);
  const safeRole     = clean(role, 100);
  const safeStudents = clean(students, 20);
  const safeMessage  = clean(message, 1000);

  // --- Internal notification to Paddy ---
  const internalBody = [
    'New demo request — School Sport Portal',
    '',
    'Name:     ' + safeName,
    'Email:    ' + safeEmail,
    'School:   ' + safeSchool,
    'Role:     ' + (safeRole || '—'),
    'Students: ' + (safeStudents || '—'),
    'Message:  ' + (safeMessage || '—'),
    '',
    'Sent from schoolsportportal.com.au'
  ].join('\n');

  const notifyRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + RESEND_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'School Sport Portal <noreply@luckdragon.io>',
      to: ['info@schoolsportportal.com.au'],
      reply_to: safeEmail,
      subject: 'Demo request — ' + safeSchool,
      text: internalBody,
    }),
  });

  if (!notifyRes.ok) {
    const err = await notifyRes.text();
    console.error('Resend notify error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Email send failed' }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  // --- Auto-reply to the enquirer ---
  const autoReplyHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1e293b;max-width:600px;margin:0 auto;padding:24px">
<div style="text-align:center;padding:24px 0 32px">
  <div style="font-size:2rem">🏫</div>
  <h1 style="font-size:1.4rem;color:#1e3a8a;margin:8px 0 4px">School Sport Portal</h1>
  <p style="color:#64748b;font-size:.9rem;margin:0">schoolsportportal.com.au</p>
</div>
<p>Hi ${safeName},</p>
<p>Thanks for your interest in School Sport Portal! We've received your demo request for <strong>${safeSchool}</strong> and we'll be in touch within 1 school day.</p>
<p>Here's what happens next:</p>
<ol style="color:#475569;padding-left:20px;line-height:2">
  <li>We'll confirm your school's configuration (student count, carnivals you run)</li>
  <li>We'll send you a payment link — $1 per student per year</li>
  <li>Once payment is confirmed, your portal goes live immediately</li>
</ol>
<p>In the meantime, feel free to explore:</p>
<ul style="color:#475569;padding-left:20px;line-height:2">
  <li><a href="https://schoolsportportal.com.au/help" style="color:#1d4ed8">Getting Started guide</a></li>
  <li><a href="https://carnivaltiming.com" style="color:#1d4ed8">Carnival Timing</a> (included with your subscription)</li>
</ul>
<p>Any questions before then? Just reply to this email.</p>
<p>Cheers,<br><strong>Paddy</strong><br>Luck Dragon Pty Ltd<br><span style="color:#64748b;font-size:.85rem">hello@schoolsportportal.com.au</span></p>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0 16px">
<p style="font-size:.75rem;color:#94a3b8;text-align:center">School Sport Portal · <a href="https://schoolsportportal.com.au/privacy" style="color:#94a3b8">Privacy Policy</a> · Luck Dragon Pty Ltd ABN 64 697 434 898</p>
</body></html>`;

  // Fire auto-reply (non-blocking — don't fail the request if this fails)
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + RESEND_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Paddy at School Sport Portal <hello@schoolsportportal.com.au>',
      to: [safeEmail],
      subject: 'Got your demo request — School Sport Portal',
      html: autoReplyHtml,
    }),
  }).catch(e => console.error('Auto-reply failed:', e));

  return new Response(JSON.stringify({ ok: true }),
    { headers: { ...cors, 'Content-Type': 'application/json' } });
}
