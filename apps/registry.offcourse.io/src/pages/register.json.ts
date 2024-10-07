export const prerender = false;
import type { APIRoute } from 'astro';
import { curator, auth } from "../schema";
import { db } from "../db";
import crypto from 'crypto';
import { HASH_KEY } from "astro:env/server"

function generateSafeHash(string1: string, string2: string, secretKey: string) {
  const data = string1 + string2;
  return crypto.createHmac('sha256', secretKey)
    .update(data)
    .digest('hex');
}

export const POST: APIRoute = async ({ request }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const data = await request.json();
    const { publicKey, userName, repository, login, authProvider } = data
    const key_id = generateSafeHash(userName, repository, HASH_KEY);
    console.log("WWWW", repository);
    try {
      const auth_response = await fetch(`${repository}/handshake.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Encoding": "application/json",
        },
        body: JSON.stringify({ publicKey })
      });
      console.log("YYYY", auth_response);

      // 1. HandShake

      // 2. Save to DB
      // await db.batch([
      //   db.insert(curator).values({ userName, repository }),
      //   db.insert(auth).values({ login, provider: authProvider, userName })
      // ]);

      // 3. Generate JWT

      // 4. Respond
      //
      return new Response(JSON.stringify(data), { status: 200 })
    }
    catch (e) {
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
}
