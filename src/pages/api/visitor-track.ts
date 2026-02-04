export const prerender = false;

import type { APIRoute } from "astro";

// @ts-ignore
export const POST: APIRoute = async ({ request, locals }) => {
  // Access environment variables from Cloudflare context (runtime)
  // or fallback to import.meta.env (dev/build)
  const runtimeEnv = (locals as any)?.runtime?.env;
  const env = runtimeEnv || import.meta.env;
  const apiKey = env.RESEND_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const { city, country, browser, device, ip } = body;

    const fromEmail = env.EMAIL_FROM || "onboarding@resend.dev";
    const toEmail = env.EMAIL_TO || "delivered@resend.dev";

    // Use raw fetch instead of Resend SDK to avoid Node.js compatibility issues
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: `New Visitor from ${city}, ${country}`,
        html: `
          <h1>New Visitor Detected</h1>
          <p><strong>Location:</strong> ${city}, ${country}</p>
          <p><strong>IP:</strong> ${ip || "Unknown"}</p>
          <p><strong>Browser:</strong> ${browser}</p>
          <p><strong>Device:</strong> ${device}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: data, status: res.status }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: "Internal Server Error", details: e?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
