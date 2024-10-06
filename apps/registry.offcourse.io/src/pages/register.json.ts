export const prerender = false;
import type { APIRoute } from 'astro';
import { curator, auth } from "../schema";
import { db } from "../db";

export const POST: APIRoute = async ({ request }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const data = await request.json();
    const { userName, repository, login, authProvider } = data
    try {
      await db.batch([
        db.insert(curator).values({ userName, repository }),
        db.insert(auth).values({ login, provider: authProvider, userName })
      ]);
      return new Response(JSON.stringify(data), { status: 200 })
    }
    catch (e) {
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
}
