import { RESPONSE_TYPE, responseSchema } from "../response";
import { AuthState, AuthProvider, authState } from "@offcourse/schema"

export async function authenticate() {
  const authData = getAuthData() || await setAuthData();
  if (authData) {
    sessionStorage.setItem("auth", JSON.stringify(authData));
    const response = responseSchema.parse({
      type: RESPONSE_TYPE.AUTHENTICATED,
      payload: authData
    })
    return response;
  }
}

export async function setAuthData() {
  const { origin, search, pathname } = window.location;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());
  try {
    const parsedAuthState = authState.parse(params);
    sessionStorage.setItem("auth", JSON.stringify(parsedAuthState));
    window.location.href = `${origin}${pathname}`;
  } catch {
    return
  }
}

export async function logout() {
  sessionStorage.removeItem("auth");
  const response = responseSchema.parse({
    type: RESPONSE_TYPE.lOGGED_OUT,
    payload: undefined
  })
  return response;
}

export function getAuthData() {
  const data = sessionStorage.getItem("auth");
  if (data) {
    return JSON.parse(data) as AuthState
  }
  return undefined;
}

export function redirectToGitHub() {
  const githubClientId = "Ov23liwToysyXGsLxgk2";
  // const githubClientId = "Ov23li51nX1AYgHxF6bl";
  const provider = AuthProvider.GITHUB;
  const { origin, pathname, search } = window.location;
  const redirect_uri = `https://offcourse-io-git-preview-offcourses-projects.vercel.app/auth`;
  // const redirect_uri = `http://localhost:8765/auth`;
  const searchParams = new URLSearchParams(search);
  searchParams.delete("code");
  searchParams.append("provider", provider);
  const current_uri = `${origin}${pathname}?${searchParams}`;
  const scope = "read:user";
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirect_uri}&scope=${scope}&state=${current_uri}`;
  window.location.href = authUrl;
}

