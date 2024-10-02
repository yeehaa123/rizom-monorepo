import { AuthState, AuthProvider, authState, ResponseType, responseSchema, CourseQuery } from "@offcourse/schema"

export async function authenticate() {
  const authData = getAuthData() || await setAuthData();
  if (authData) {
    return responseSchema.parse({
      type: ResponseType.AUTHENTICATED,
      payload: authData
    })
  }
}

export async function setAuthData() {
  const { origin, search, pathname } = window.location;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log(params);
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
    type: ResponseType.lOGGED_OUT,
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

export function redirectToGitHub({ courseId }: CourseQuery) {
  const previewId = "Ov23liwToysyXGsLxgk2";
  // const localId = "Ov23li51nX1AYgHxF6bl";
  const githubClientId = previewId;
  const authProvider = AuthProvider.GITHUB;
  const { origin, pathname, search } = window.location;
  const redirect_uri = `https://offcourse-io-git-preview-offcourses-projects.vercel.app/auth/${authProvider}/`;
  // const redirect_uri = `http://localhost:8765/auth/${authProvider}/`;
  const searchParams = new URLSearchParams(search);
  searchParams.delete("code");
  searchParams.append("courseId", courseId);
  const current_uri = `${origin}${pathname}?${searchParams}`;
  const scope = "read:user";
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirect_uri}&scope=${scope}&state=${current_uri}`;
  window.location.href = authUrl;
}

