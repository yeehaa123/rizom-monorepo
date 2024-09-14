export const prerender = false;
import type { APIRoute } from 'astro';
import { AuthProvider, authState } from "@offcourse/schema"

import { GITHUB_CLIENT_ID } from "astro:env/client"
import { GITHUB_CLIENT_SECRET } from "astro:env/server"

async function getUser({ provider, login }: { provider: AuthProvider.GITHUB, login: string }) {
  console.log(provider);
  return {
    userName: login,
    repository: "https://yeehaa.io/offcourse"
  }
}

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
    const { code, provider } = body;
    if (code && provider === AuthProvider.GITHUB) {
      try {
        const auth_response = await fetch("https://github.com/login/oauth/access_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Encoding": "application/json",
          },
          body: JSON.stringify({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code
          })
        });

        const { token_type, access_token } = await auth_response.json();
        const user_response = await fetch("https://api.github.com/user", {
          headers: {
            "Authorization": `${token_type} ${access_token}`
          },
        });

        const { login } = await user_response.json();
        const { userName, repository } = await getUser({ provider, login });

        const authData = authState.parse({
          provider,
          tokenType: token_type,
          accessToken: access_token,
          userName,
          repository
        })

        return new Response(JSON.stringify(
          authData
        ),
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            status: 201
          })

      } catch (e) {
        console.log(e);
        return new Response(null, { status: 400 });
      }
    }
  }
  return new Response(null, { status: 400 });
}
