// falkor-email v1.0.0 — CF Email Routing worker for hello@luckdragon.io
// Receives inbound email, stores to D1 via falkor-tools API, and forwards to Paddy

export default {
  async email(message, env, ctx) {
    const from = message.from || '';
    const to = message.to || '';
    const subject = message.headers.get('Subject') || message.headers.get('subject') || '(no subject)';
    const receivedAt = new Date().toISOString();

    // Read raw email text
    let body = '';
    try {
      const rawText = await new Response(message.raw).text();
      // Extract plain text body from MIME
      // Try Content-Type: text/plain section first
      const plainMatch = rawText.match(/Content-Type:\s*text\/plain[^\r\n]*\r?\n(?:[^\r\n]+:\s*[^\r\n]*\r?\n)*\r?\n([\s\S]*?)(?:\r?\n--|\s*$)/i);
      if (plainMatch) {
        body = plainMatch[1].trim();
      } else {
        // Fallback: strip headers, take first 3000 chars of body
        const headerEnd = rawText.indexOf('\r\n\r\n');
        body = headerEnd >= 0 ? rawText.substring(headerEnd + 4, headerEnd + 4 + 3000).trim() : rawText.substring(0, 3000);
      }
    } catch (e) {
      body = '[could not read email body: ' + String(e).substring(0, 100) + ']';
    }

    // Store via falkor-tools API
    try {
      await fetch('https://falkor.luckdragon.io/api/email/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Pin': env.AGENT_PIN || ''
        },
        body: JSON.stringify({
          from_addr: from.substring(0, 200),
          to_addr: to.substring(0, 200),
          subject: subject.substring(0, 500),
          body: body.substring(0, 15000),
          received_at: receivedAt
        }),
        signal: AbortSignal.timeout(10000)
      });
    } catch (e) {
      // Non-fatal — don't block the forward
      console.error('falkor-email: store failed:', String(e));
    }

    // Forward to Paddy's personal inbox too
    try {
      await message.forward('paddy@luckdragon.io');
    } catch (e) {
      // If forward fails, we still stored it in D1 — not critical
      console.error('falkor-email: forward failed:', String(e));
    }
  }
};
