export const prerender = false;
import type { APIRoute } from 'astro';
import { handleCommand } from '@offcourse/db/command';
import { generateSafeHash, validatePublicKey, deflattenKey } from "@offcourse/crypto";
import { ActionType } from '@offcourse/schema';

import dotenv from 'dotenv';
dotenv.config();

const { AUTH_URL, REPOSITORY_KEY } = process.env;

export const POST: APIRoute = async ({ request }) => {
  console.log(request);
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const { publicKey: pk, registryKey } = await request.json();

      // TODO: if (origin !== AUTH_URL) {
      //   throw ("INVALID ORIGIN")
      // }
      //

      if (!REPOSITORY_KEY || !AUTH_URL) {
        throw ("env vars REPOSITORY_KEY and AUTH_URL need to be set")
      }

      // 1. CHECK REPOSITORY PUBLIC KEY AGAINST PRIVATE KEY

      const privateKey = deflattenKey(REPOSITORY_KEY);
      const publicKey = deflattenKey(pk);
      const isValid = validatePublicKey(privateKey, publicKey);
      if (!isValid) { throw (isValid) }

      const payload = {
        keyId: generateSafeHash("auth", AUTH_URL, privateKey),
        publicKey: `${registryKey}`
      }

      // 2. STORE AUTH PUBLIC KEY IN DB

      await handleCommand({ type: ActionType.REGISTER_REPOSITORY, payload });


      // 3. RESPOND

      return new Response(JSON.stringify({ status: "hands shaken" }), { status: 200 })
    }
    catch (e) {
      console.log(e);
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
}
