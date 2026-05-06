(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // worker.js
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  var ALLOWED_ORIGINS = [
    "https://schoolsportportal.com.au",
    "https://www.schoolsportportal.com.au"
  ];
  var SSP_PRICE_ID = "price_1TTcFlAm8bVflPN0biv8zblH";
  var SSP_SUCCESS_URL = "https://schoolsportportal.com.au/thanks";
  var SSP_CANCEL_URL = "https://schoolsportportal.com.au/#pricing";
  function slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\b(school|primary|ps|ss|college|academy|state|the|and|of|at|st|saint)\b/g, "").replace(/\s+/g, "").slice(0, 40) || "school";
  }
  __name(slugify, "slugify");
  async function handleRequest(request) {
    const origin = request.headers.get("Origin") || "";
    const allowed = ALLOWED_ORIGINS.includes(origin);
    const cors = {
      "Access-Control-Allow-Origin": allowed ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
    if (origin && !allowed) {
      return new Response(
        JSON.stringify({ ok: false, error: "Forbidden" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid JSON" }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }
    const { name, email, school, role, students, message, website } = body;
    if (website) {
      return new Response(
        JSON.stringify({ ok: true }),
        { headers: { ...cors, "Content-Type": "application/json" } }
      );
    }
    if (!name || !email || !school) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing required fields" }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid email address" }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }
    const clean = /* @__PURE__ */ __name((s, max) => String(s || "").trim().slice(0, max), "clean");
    const safeName = clean(name, 100);
    const safeEmail = clean(email, 200);
    const safeSchool = clean(school, 200);
    const safeRole = clean(role, 100);
    const safeStudents = clean(students, 20);
    const safeMessage = clean(message, 1e3);
    const studentCount = parseInt(safeStudents) || 0;
    const schoolId = slugify(safeSchool);
    let checkoutUrl = null;
    if (typeof STRIPE_SECRET_KEY !== "undefined" && STRIPE_SECRET_KEY && studentCount > 0) {
      try {
        const stripeBody = new URLSearchParams({
          "mode": "payment",
          "success_url": SSP_SUCCESS_URL,
          "cancel_url": SSP_CANCEL_URL,
          "customer_email": safeEmail,
          "line_items[0][price]": SSP_PRICE_ID,
          "line_items[0][quantity]": String(studentCount),
          "metadata[school_id]": schoolId,
          "metadata[school_name]": safeSchool,
          "metadata[school_email]": safeEmail,
          "metadata[student_count]": String(studentCount)
        });
        const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + STRIPE_SECRET_KEY,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: stripeBody.toString()
        });
        if (stripeRes.ok) {
          const session = await stripeRes.json();
          checkoutUrl = session.url;
        } else {
          const stripeErr = await stripeRes.text();
          console.error("Stripe error:", stripeErr);
        }
      } catch (stripeEx) {
        console.error("Stripe exception:", stripeEx);
      }
    }
    const internalBody = [
      "New demo request \u2014 School Sport Portal",
      "",
      "Name:     " + safeName,
      "Email:    " + safeEmail,
      "School:   " + safeSchool,
      "School ID: " + schoolId,
      "Role:     " + (safeRole || "\u2014"),
      "Students: " + (safeStudents || "\u2014"),
      "Message:  " + (safeMessage || "\u2014"),
      "",
      checkoutUrl ? "Checkout URL: " + checkoutUrl : "(no checkout \u2014 student count missing or Stripe not configured)",
      "",
      "Sent from schoolsportportal.com.au"
    ].join("\n");
    const notifyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + RESEND_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "School Sport Portal <noreply@luckdragon.io>",
        to: ["info@schoolsportportal.com.au"],
        reply_to: safeEmail,
        subject: "Demo request \u2014 " + safeSchool,
        text: internalBody
      })
    });
    if (!notifyRes.ok) {
      const err = await notifyRes.text();
      console.error("Resend notify error:", err);
      return new Response(
        JSON.stringify({ ok: false, error: "Email send failed" }),
        { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }
    const nextStepsHtml = checkoutUrl ? "<p>Ready to get started? Your school has <strong>" + studentCount + " students</strong> \u2014 that's <strong>$" + studentCount + ' for the full year</strong> (just $1/student).</p><p style="text-align:center;margin:24px 0"><a href="' + checkoutUrl + `" style="background:#00a86b;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:1rem">Pay Now &amp; Get Started \u2192</a></p><p style="color:#64748b;font-size:.9rem">If the button doesn't work: <a href="` + checkoutUrl + '" style="color:#1d4ed8">' + checkoutUrl + "</a></p>" : "<p>We'll be in touch shortly with your personalised setup link and payment details.</p>";
    const autoReplyHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:32px 20px;color:#1e293b"><div style="text-align:center;padding:24px 0 32px"><div style="font-size:2rem">\u{1F3EB}</div><h1 style="font-size:1.4rem;color:#1e3a8a;margin:8px 0 4px">School Sport Portal</h1><p style="color:#64748b;font-size:.9rem;margin:0">schoolsportportal.com.au</p></div><p>Hi ' + safeName + ",</p><p>Thanks for your interest in School Sport Portal! We've received your request for <strong>" + safeSchool + "</strong>.</p>" + nextStepsHtml + '<p>In the meantime, feel free to explore:</p><ul style="color:#475569;padding-left:20px;line-height:2"><li><a href="https://schoolsportportal.com.au/help" style="color:#1d4ed8">Getting Started guide</a></li><li><a href="https://carnivaltiming.com" style="color:#1d4ed8">Carnival Timing</a> (included with your portal)</li></ul><p>Any questions? Just reply to this email.</p><p>Cheers,<br><strong>Paddy</strong><br>Luck Dragon Pty Ltd</p><hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0 16px"><p style="font-size:.75rem;color:#94a3b8;text-align:center">School Sport Portal \xB7 <a href="https://schoolsportportal.com.au/privacy" style="color:#94a3b8">Privacy Policy</a></p></body></html>';
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + RESEND_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Paddy at School Sport Portal <noreply@luckdragon.io>",
        reply_to: "info@schoolsportportal.com.au",
        to: [safeEmail],
        subject: "Got your demo request \u2014 School Sport Portal",
        html: autoReplyHtml
      })
    }).catch((e) => console.error("Auto-reply failed:", e));
    return new Response(
      JSON.stringify({ ok: true, checkoutUrl }),
      { headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
  __name(handleRequest, "handleRequest");
})();
//# sourceMappingURL=worker.js.map
