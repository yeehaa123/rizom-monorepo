export const prerender = false;
import { authState, AuthProvider, QueryType, ResponseType, registryEntry } from "@offcourse/schema"
import { z } from 'zod';
import { APIRoute } from "astro";
import dotenv from 'dotenv';
import { handleQuery } from '@offcourse/db/query';
import { generateAuthToken, } from "@offcourse/crypto";

dotenv.config();
const { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID } = process.env

export const GET: APIRoute = async ({ url, redirect }) => {
  const urlSearchParams = url.searchParams
  const { state, code } = Object.fromEntries(urlSearchParams.entries());

  if (!state || !code) {
    return redirect("/", 307);
  }

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

  const { type, payload } = await handleQuery({
    type: QueryType.enum.GET_REGISTRY_FROM_OAUTH,
    payload: { authProvider, login }
  }, false);


  if (type === ResponseType.enum.RETRIEVED_REGISTRY_ENTRY) {
    const { userName, repository } = registryEntry.parse(payload);
    const authToken = generateAuthToken({ userName, repository })
    const authData = authState.parse({
      authToken,
      repository,
      userName
    })
    const newParams = new URLSearchParams(authData);
    const redirectURL = `${stateUrl.origin}${stateUrl.pathname}?${newParams}`
    return redirect(redirectURL, 307);
  }

  if (type === ResponseType.enum.REGISTRY_ENTRY_NOT_FOUND) {
    const authData = { authProvider, token_type, access_token, login, state }
    const newParams = new URLSearchParams(authData);
    const signupURL = `/signup/?${newParams}`
    return redirect(signupURL, 307);
  }

  return redirect("/", 307);
}
