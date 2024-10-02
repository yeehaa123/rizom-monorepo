import { defineAction } from 'astro:actions';
import { db, AuthLookup, Curator } from 'astro:db';
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
      await db.batch([
        db.insert(Curator).values(
          { userName, repository },
        ),
        db.insert(AuthLookup).values(
          { userName, login, provider: authProvider },
        )
      ])
      return { ...args, repository, userName, login, authProvider }
    }
  })
}
