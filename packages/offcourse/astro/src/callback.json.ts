export const prerender = false;
import { authState, AuthProvider } from "@offcourse/schema"
import { z } from 'zod';
import { APIRoute } from "astro";

import dotenv from 'dotenv';
dotenv.config();
const { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID } = process.env


export const GET: APIRoute = async ({ url, redirect }) => {
  const urlSearchParams = url.searchParams
  const { state, code } = Object.fromEntries(urlSearchParams.entries());

  if (!state || !code) {
    return redirect("/", 307);
  }
  console.log("CODE", code)

  const stateUrl = new URL(state)

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

  const oauthData = await auth_response.json();

  const { token_type, access_token } = z.object({
    token_type: z.string(),
    access_token: z.string()
  }).parse(oauthData)

  const user_response = await fetch("https://api.github.com/user", {
    headers: {
      "Authorization": `${token_type} ${access_token}`
    },
  });

  const userData = await user_response.json();

  const authProvider = AuthProvider.GITHUB;
  const { login } = z.object({ login: z.string() }).parse(userData);
  const { userName, repository } = await getUser({ authProvider, login });

  if (!repository) {
    const authData = { authProvider, token_type, access_token, login, state }
    const newParams = new URLSearchParams(authData);
    const redirectURL = `/signup/?${newParams}`
    console.log(redirectURL);
    return redirect(redirectURL, 307);
  }

  const authToken = "BLALALABAL";

  const authData = authState.parse({
    authToken,
    userName,
    repository
  })

  const newParams = new URLSearchParams(authData);
  const redirectURL = `${stateUrl.origin}${stateUrl.pathname}?${newParams}`
  return redirect(redirectURL, 307);

}

async function getUser({ login }: { authProvider: string, login: string }) {
  // const authEntries= await db.select({
  //   userName: auth.userName,
  //   repository: curator.repository
  // }).
  //   from(auth)
  //   .where(
  //     and(
  //       eq(auth.login, login),
  //       eq(auth.provider, authProvider)
  //     )
  //   )
  //   .leftJoin(
  //     curator, eq(auth.userName, curator.userName)
  //   );
  // console.log("Registered User", authEntries);
  return { userName: login, repository: undefined }
}
