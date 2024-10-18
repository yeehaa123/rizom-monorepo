export const prerender = false;
import { handleCommand } from '@offcourse/db/command';
import type { APIRoute } from 'astro';
import { ActionType, repositoryRegistrationSchema } from '@offcourse/schema';
import {
  deflattenKey,
  flattenKey,
  generatePublicKeyFromPrivateKey,
  generateAuthToken,
} from "@offcourse/crypto";
import dotenv from 'dotenv';

dotenv.config();
const { REPOSITORY_KEY } = process.env;

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      if (!REPOSITORY_KEY) {
        throw ("env vars REPOSITORY_KEY needs to be set")
      }
      const data = await request.json()

      const {
        publicKey,
        userName,
        repository,
        login,
        authProvider
      } = repositoryRegistrationSchema.parse(data);

      const privateKey = deflattenKey(REPOSITORY_KEY)

      // 1. HANDSHAKE

      const rk = generatePublicKeyFromPrivateKey(privateKey);
      if (!rk) { throw ("INVALID REPOSITORY_KEY") }

      const { ok } = await fetch(`${repository}/handshake`, {
        method: "POST", headers: {
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

      const payload = {
        publicKey,
        userName,
        repository,
        login,
        authProvider
      }

      await handleCommand({
        type: ActionType.REGISTER_REPOSITORY,
        payload
      })

      // 3. GENERATE JWT

      const authToken = generateAuthToken({ userName, repository })

      // 4. RESPOND

      return new Response(JSON.stringify({ authToken, userName, repository }), { status: 200 })
    }
    catch (e) {
      console.log("REGISTER_ERROR", e);
      return new Response(null, { status: 404 });
    }
  }
  return new Response(null, { status: 400 });
}
