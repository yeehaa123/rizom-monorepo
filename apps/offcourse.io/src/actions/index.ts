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
      repository: z.string().optional(),
      authProvider: z.string(),
      state: z.string()
    }),
    handler: async (args) => {
      return { ...args, repository: args.repository || "https://offcourse-io-git-preview-offcourses-projects.vercel.app/offcourse" }
    }
  })
}
