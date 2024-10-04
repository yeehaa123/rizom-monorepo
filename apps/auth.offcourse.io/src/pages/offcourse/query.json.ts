export const prerender = false;

import { handleQuery } from '@offcourse/db/query';
import type { APIRoute } from 'astro';

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
    const body = await request.json();
    const data = await handleQuery(body);
    return new Response(JSON.stringify(
      data
    ), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      status: 200
    })
  }
  return new Response(null, { status: 400 });
}
