import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { AUTH_URL } from "astro:env/server"

export const server = {
  signup: defineAction({
    accept: 'form',
    input: z.object({
      userName: z.string(),
      login: z.string(),
      accessToken: z.string(),
      tokenType: z.string(),
      repository: z.string(),
      authProvider: z.string(),
      state: z.string()
    }),
    handler: async ({ state, ...args }) => {
      const auth_response = await fetch(`${AUTH_URL}/register.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Encoding": "application/json",
        },
        body: JSON.stringify(args)
      });
      const data = await auth_response.json()
      return { ...data, state }
    }
  })
}
