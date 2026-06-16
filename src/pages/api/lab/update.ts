import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals, url }) => {
  const runtime = (locals as any).runtime;
  
  if (!runtime) {
    return new Response(JSON.stringify({ error: 'Runtime not found. Ensure you are running on Cloudflare.' }), { status: 500 });
  }

  const { env } = runtime;
  const authHeader = request.headers.get('Authorization');
  const secretKey = env.LAB_SECRET_KEY;
  const kv = env.LAB_STORE;

  // 1. Validate Secret Key
  if (!authHeader || authHeader !== `Bearer ${secretKey}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  // 2. Identify Job Type
  const type = url.searchParams.get('type');
  if (!type) {
    return new Response(JSON.stringify({ error: 'Missing type parameter' }), { status: 400 });
  }

  try {
    const newData = await request.json();
    
    // 3. Set "Last Run" timestamp if not provided in payload
    if (!newData.lastRun) {
      newData.lastRun = new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      });
    }

    // 4. Fetch existing data to handle history
    const existingRaw = await kv.get(`lab:${type}`);
    let finalData: any = {};

    if (existingRaw) {
      const existing = JSON.parse(existingRaw);
      // Shift latest to previous
      finalData = {
        ...existing,
        previous: existing.latest || null,
        latest: newData
      };
    } else {
      // First time run
      finalData = {
        latest: newData,
        previous: null
      };
    }

    // 5. Store in Cloudflare KV
    await kv.put(`lab:${type}`, JSON.stringify(finalData));

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully updated ${type}` 
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), { status: 400 });
  }
};
