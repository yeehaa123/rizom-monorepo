export const prerender = false;
import type { APIRoute } from 'astro';
import { curator, auth } from "../schema";
import { db } from "../db";

export const OPTIONS: APIRoute = async () => {
  return new Response("ok", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  });
}

export const POST: APIRoute = async ({ request }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const data = await request.json();
    const { userName, repository, login, authProvider } = data
    try {
      await db.batch([
        db.insert(curator).values({ userName, repository }),
        db.insert(auth).values({ login, provider: authProvider, userName })
      ]);
      return new Response(JSON.stringify(data), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        status: 200
      })
    }
    catch (e) {
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
}
