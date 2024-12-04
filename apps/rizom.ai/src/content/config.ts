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

const baseSection = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  cta: z.string().optional(),
})

const section = baseSection.extend({
  sections: z.array(baseSection).optional()
})


const content = defineCollection({
  type: 'data',
  schema: section.extend({
    sections: z.array(section)
  })
})

export const collections = {
  Decks: presentations,
  Pages: pages,
  PageContent: content
};
