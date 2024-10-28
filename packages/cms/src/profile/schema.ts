import { curatorProfileSchema, curatorSchema } from '@offcourse/schema/primitives';
import * as m from "../meta/schema"
import * as as from "../association"
import { z } from 'zod';

export type Profile =
  | BaseProfile
  | AnalyzedProfile
  | AssociatedProfile
  | FinalProfile


export const profileDataSchema = curatorProfileSchema.extend({
  courses: z.array(z.string()),
  articles: z.array(z.string()),
})

export const initSchema = z.object({
  author: z.string(),
  repositoryURL: z.string(),
  profile: curatorProfileSchema.partial()
})

export const analysisSchema = z.object({
  bio: z.string(),
  tags: z.array(z.string()),
  profile: curatorProfileSchema
})

const associationsSchema = z.object({
  courses: z.array(as.schema),
  articles: z.array(as.schema),
})

export const augmentationsSchema = z.object({
  checksum: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  blurb: z.string(),
  profileImageURL: z.string(),
})

export const outputSchema = profileDataSchema
  .merge(analysisSchema)
  .merge(augmentationsSchema).
  extend({ title: z.string() })

export const baseSchema = z.object({
  meta: m.schema,
  profile: curatorProfileSchema,
})

export const analyzedSchema = baseSchema.extend({
  analysis: analysisSchema
})

export const associatedSchema = analyzedSchema.extend({
  associations: associationsSchema
})

export const finalSchema = associatedSchema.extend({
  augmentations: augmentationsSchema
})

export type InitProfile = z.infer<typeof initSchema>
export type BaseProfile = z.infer<typeof baseSchema>
export type AnalyzedProfile = z.infer<typeof analyzedSchema>
export type AssociatedProfile = z.infer<typeof associatedSchema>
export type FinalProfile = z.infer<typeof finalSchema>
