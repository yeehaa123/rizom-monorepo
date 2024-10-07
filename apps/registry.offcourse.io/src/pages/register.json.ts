export const prerender = false;
import type { APIRoute } from 'astro';
import { curator, auth } from "../schema";
import { db } from "../db";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { HASH_KEY } from "astro:env/server"

function generateSafeHash(string1: string, string2: string, secretKey: string) {
  const data = string1 + string2;
  return crypto.createHmac('sha256', secretKey)
    .update(data)
    .digest('hex');
}

export function deflattenKey(flatKey: string) {
  return flatKey.replace(/\\n/g, '\n');
}
export function flattenKey(unflatKey: string) { 
  return unflatKey.replace(/\r\n|\r|\n/g, '\\n');
}


function generatePublicKeyFromPrivateKeyString(privateKeyString) {
  try {
    // Create a KeyObject from the private key string
    const privateKeyObject = crypto.createPrivateKey({
      key: privateKeyString,
      format: 'pem',
      type: 'pkcs8'
    });

    // Generate the public key
    const publicKey = crypto.createPublicKey(privateKeyObject)
      .export({ type: 'spki', format: 'pem' });

    return publicKey;
  } catch (error) {
    console.error('Error generating public key:', error.message);
    return null;
  }
}
export const POST: APIRoute = async ({ request }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const data = await request.json();
    const privateKey = deflattenKey(HASH_KEY);
    const { publicKey, userName, repository, login, authProvider } = data
    const keyId = generateSafeHash(userName, repository, privateKey);
    const rk = generatePublicKeyFromPrivateKeyString(privateKey);
    try {


      // 1. HandShake
      const { ok}  = await fetch(`${repository}/handshake.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Encoding": "application/json",
        },
        body: JSON.stringify({ publicKey, registryKey: flattenKey(rk) })
      });

      if (!ok) { throw ("INVALID PUBLIC KEY") }

      // 2. Save to DB
      
      // await db.batch([
      //   db.insert(curator).values({ userName, repository }),
      //   db.insert(auth).values({ login, provider: authProvider, userName })
      // ]);

      // 3. Generate JWT
      //
      const payload = {
        userName,
        publicKey,
        repository
      }
      console.log(repository);
      
      const authToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7d'
      });
      console.log("TOKEN", authToken);

      // 4. Respond
      //
      return new Response(JSON.stringify({authToken, userName, repository }), { status: 200 })
    }
    catch (e) {
      console.log(e)
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
}
