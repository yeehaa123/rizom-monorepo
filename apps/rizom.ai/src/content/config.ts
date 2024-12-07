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
  subtitle: z.string(),
  description: z.string(),
})

const section = baseSection.extend({
  sections: z.array(baseSection).optional()
})


const content = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    sections: z.array(z.object({
      title: z.string(),
      description: z.string(),
      sections: z.array(section)
    })),
    call_to_action: z.object({
      title: z.string(),
      description: z.string(),
      cta: z.string()
    })
  })
})

export const collections = {
  Decks: presentations,
  Pages: pages,
  PageContent: content
};
