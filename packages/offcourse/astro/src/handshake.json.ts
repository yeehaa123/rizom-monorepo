export const prerender = false;
import type { APIRoute } from 'astro';
import { validatePublicKey } from "./tokenUtils";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { publicKey, registryKey } = await request.json();
    console.log("RK!",registryKey);
    try {
      const isValid = validatePublicKey(publicKey);
      if (!isValid) { throw (isValid) }
      return new Response(JSON.stringify({ status: "hands shaken"}), { status: 200 })
    }
    catch (e) {
      console.log(e);
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
}
