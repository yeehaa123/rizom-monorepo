import { RESPONSE_TYPE, responseSchema } from "../response";
import { authState } from "@offcourse/schema"
import type { AuthState } from "@offcourse/schema";

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
