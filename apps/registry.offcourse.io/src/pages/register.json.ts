export const prerender = false;
import type { APIRoute } from 'astro';
import { curator, auth, keystore } from "../schema";
import { REPOSITORY_KEY } from "astro:env/server"
import { db } from "../db";
import {
  deflattenKey,
  flattenKey,
  generateSafeHash,
  generatePublicKeyFromPrivateKey,
  generateAuthToken,
} from "@offcourse/crypto";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const data = await request.json();
    const { publicKey, userName, repository, login, authProvider } = data
    const privateKey = deflattenKey(REPOSITORY_KEY)
    try {

      // 1. HANDSHAKE

      const rk = generatePublicKeyFromPrivateKey(privateKey);
      if (!rk) { throw ("INVALID REPOSITORY_KEY") }
      const { ok } = await fetch(`${repository}/handshake.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Encoding": "application/json",
        },
        body: JSON.stringify({ publicKey, registryKey: flattenKey(rk) })
      });

      if (!ok) {
        return new Response(null, { status: 404 })
      }

      // 2. SAVE TO DB

      const keyId = generateSafeHash(userName, repository, privateKey);

      await db.batch([
        db.insert(keystore).values({ keyId, publicKey }),
        db.insert(curator).values({ userName, repository }),
        db.insert(auth).values({ login, provider: authProvider, userName })
      ]);

      // 3. GENERATE JWT

      const authToken = generateAuthToken({ userName, privateKey, publicKey, repository })

      // 4. RESPOND

      return new Response(JSON.stringify({ authToken, userName, repository }), { status: 200 })
    }
    catch (e) {
      console.log(e)
      return new Response(null, { status: 404 });
    }
  }
  return new Response(null, { status: 400 });
}
