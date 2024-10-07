export const prerender = false;
import type { APIRoute } from 'astro';
import { handleCommand } from '@offcourse/db/command';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { REGISTRY_KEY } = process.env;


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
    console.log(authToken)
    try {
      const decoded = jwt.verify(authToken, "http://localhost:8765/offcourse");
      console.log(decoded);
    } catch (e) {
      console.log(e)
    }
    const data = await handleCommand(body);
    return new Response(JSON.stringify(
      data
    ), {
      headers: {
        "Access-Control-Allow-Origin": origin,
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      },
      status: 200
    })
  }
  return new Response(null, { status: 400 });
}

export const GET: APIRoute = async () => {
  return new Response("HELLO", { status: 200 });
}
