import { defineCollection, z } from "astro:content";

const presentations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    date: z.date().optional(),
    draft: z.boolean().optional().default(false),
  })
})

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string()
  })
})

export const collections = {
  Decks: presentations,
  Pages: pages
};
