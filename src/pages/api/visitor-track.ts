export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { city, country, browser, device, ip } = body;

    const fromEmail = import.meta.env.EMAIL_FROM || "onboarding@resend.dev";
    const toEmail = import.meta.env.EMAIL_TO || "delivered@resend.dev";

    const { data, error } = await resend.emails.send({
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
    });

    if (error) {
      console.error("Resend Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Tracking Error:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
