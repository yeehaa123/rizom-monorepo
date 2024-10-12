export const prerender = false;
import type { APIRoute } from 'astro';
import { handleCommand } from '@offcourse/db/command';
import { generateSafeHash, validatePublicKey, deflattenKey } from "@offcourse/crypto";
import { ActionType } from '@offcourse/schema';
import dotenv from 'dotenv';

dotenv.config();
const { AUTH_URL, REPOSITORY_KEY } = process.env;

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      if (!REPOSITORY_KEY) {
        throw ("env vars REPOSITORY_KEY need to be set")
      }
      const { publicKey: pk, registryKey } = await request.json();
      const authURL = AUTH_URL || 'https://offcourse-io.vercel.app';

      // 1. CHECK REPOSITORY PUBLIC KEY AGAINST PRIVATE KEY

      const privateKey = deflattenKey(REPOSITORY_KEY);
      const publicKey = deflattenKey(pk);
      const isValid = validatePublicKey(privateKey, publicKey);

      if (!isValid) { throw ("INVALID PUBLIC KEY") }

      // 2. STORE AUTH PUBLIC KEY IN DB

      const keyId = generateSafeHash("auth", authURL, privateKey);

      await handleCommand({
        type: ActionType.REGISTER_REPOSITORY,
        payload: { keyId, publicKey: registryKey }
      })

      // 3. RESPOND

      return new Response(JSON.stringify({ status: "hands shaken" }), { status: 200 })
    }
    catch (e) {
      console.log("HANDSHAKE_ERROR", e);
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
}
