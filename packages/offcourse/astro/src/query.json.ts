export const prerender = false;
import type { APIRoute } from 'astro';
import { querySchema } from '@offcourse/schema';
import { handleQuery } from '@offcourse/db/query';
import { getKeyStoreEntry } from '@offcourse/db/keystore';
import { generateSafeHash, verifyAuthToken } from "@offcourse/crypto";
import dotenv from 'dotenv';

dotenv.config();
const { AUTH_URL } = process.env;

export const OPTIONS: APIRoute = async ({ request }) => {
  const origin = request.headers.get("Origin");
  if (origin) {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      }
    });
  }
  return new Response(null, { status: 400 });
}

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get("Origin");
  if (origin && request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const authToken = request.headers.get("Authorization");
    const authURL = AUTH_URL || 'https://offcourse-io.vercel.app';
    const keyId = generateSafeHash("auth", authURL);
    const publicKey = await getKeyStoreEntry(keyId);
    if (publicKey) {
      const isValid = verifyAuthToken(authToken, publicKey);
      if (isValid) {
        const query = querySchema.parse(body);
        const data = await handleQuery(query);
        return new Response(JSON.stringify(
          data
        ), {
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
          },
          status: 200
        })
      }
    }
  }
  return new Response(null, { status: 400 });
}
