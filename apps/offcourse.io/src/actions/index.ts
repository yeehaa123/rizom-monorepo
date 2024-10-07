import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { AUTH_URL } from "astro:env/server"

export const server = {
  signup: defineAction({
    accept: 'form',
    input: z.object({
      userName: z.string(),
      login: z.string(),
      publicKey: z.string(),
      accessToken: z.string(),
      tokenType: z.string(),
      repository: z.string(),
      authProvider: z.string(),
      state: z.string()
    }),
    handler: async ({ state, publicKey: rawKey, ...args }) => {
      console.log(AUTH_URL);
      const publicKey = rawKey.replace(/\r\n|\r|\n/g, '\\n');
      const payload = { ...args, publicKey }
      console.log(payload);
      const auth_response = await fetch(`${AUTH_URL}/register.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Encoding": "application/json",
        },
        body: JSON.stringify({ ...args, publicKey })
      });
      const data = await auth_response.json()
      return { ...data, state }
    }
  })
}
