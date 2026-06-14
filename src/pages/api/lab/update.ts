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
    const data = await request.json();
    
    // 3. Store in Cloudflare KV
    // Key format: lab:[type] (e.g., lab:newsletter-digest)
    await kv.put(`lab:${type}`, JSON.stringify(data));

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully updated ${type}` 
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), { status: 400 });
  }
};
