export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const data = await request.json();
    console.log("XXXX", data);
    try {

      //  1. Deflatten public key
      // 2. verify public key
      // 3. respond ok

      return new Response(JSON.stringify(data), { status: 200 })
    }
    catch (e) {
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
}
