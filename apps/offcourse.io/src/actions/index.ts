import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

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
    handler: async ({ userName, login, authProvider, repository, ...args }) => {
      return { ...args, repository, userName, login, authProvider }
    }
  })
}
