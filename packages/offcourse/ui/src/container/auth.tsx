import { RESPONSE_TYPE, responseSchema } from "../response";
import { AuthProvider } from "@offcourse/schema";
import type { AuthState } from "@offcourse/schema";

export async function authenticate() {
  const authData = getAuthData() || await fetchAuthData();
  if (authData) {
    sessionStorage.setItem("auth", JSON.stringify(authData));
    const response = responseSchema.parse({
      type: RESPONSE_TYPE.AUTHENTICATED,
      payload: authData
    })
    return response;
  }
}


export async function fetchAuthData() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const provider = AuthProvider.GITHUB;
  if (code) {
    try {
      const response = await fetch("https://offcourse-io-git-preview-offcourses-projects.vercel.app/auth.json", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, provider })
      });
      const data = await response.json();
      console.log(data);
      return data;
    }
    catch (error) {
      console.log(error)
      return
    }
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
