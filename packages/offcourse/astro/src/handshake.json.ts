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
      const remote_uri = 'https://offcourse-io.vercel.app'
      const authURL = AUTH_URL || remote_uri;

      // TODO: if (origin !== AUTH_URL) {
      //   throw ("INVALID ORIGIN")
      // }
      //


      // 1. CHECK REPOSITORY PUBLIC KEY AGAINST PRIVATE KEY

      const privateKey = deflattenKey(REPOSITORY_KEY);
      const publicKey = deflattenKey(pk);
      const isValid = validatePublicKey(privateKey, publicKey);
      if (!isValid) { throw (isValid) }

      const payload = {
        keyId: generateSafeHash("auth", authURL, privateKey),
        publicKey: `${registryKey}`
      }

      // 2. STORE AUTH PUBLIC KEY IN DB

      await handleCommand({ type: ActionType.REGISTER_REPOSITORY, payload });


      // 3. RESPOND

      return new Response(JSON.stringify({ status: "hands shaken" }), { status: 200 })
    }
    catch (e) {
      console.log("HANDSHAKE", e);
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
}
