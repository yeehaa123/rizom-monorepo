import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';

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
    handler: async ({ state, publicKey: rawKey, ...args }, { request }) => {
      const publicKey = rawKey.replace(/\r\n|\r|\n/g, '\\n');
      const payload = { ...args, publicKey }
      try {
        const apiUrl = new URL('/offcourse/register', request.url);

        const auth_response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Encoding": "application/json",
          },
          body: JSON.stringify(payload)
        });
        const data = await auth_response.json()
        return { ...data, state }
      } catch (e) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "invalid public key"
        })
      }
    }
  })
}
