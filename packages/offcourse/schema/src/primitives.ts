import { z } from 'zod';

export const curatorSchema = z.object({
  name: z.string(),
  repository: z.string(),
  alias: z.string(),
  socials: z.object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    instagram: z.string().optional()
  }),
  bio: z.string()
})


export const habitatSchema = z.object({
  slug: z.string()
})

export const analysisSchema = z.object({
  excerpt: z.string(),
  summary: z.string(),
  tags: z.array(z.string())
})

export const checkpointSchema = z.object({
  task: z.string(),
  href: z.string(),
  checkpointId: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
})

export const courseSchema = z.object({
  courseId: z.string(),
  goal: z.string(),
  curator: curatorSchema,
  description: z.string(),
  habitat: habitatSchema.optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date().optional(),
  tags: z.array(z.string()),
  checkpoints: z.array(checkpointSchema)
})

export const noteSchema = z.object({
  note: z.string(),
  annotatedAt: z.coerce.date(),
})

export const repositoryRegistrationSchema = z.object({
  userName: z.string(),
  login: z.string(),
  publicKey: z.string(),
  repository: z.string(),
  authProvider: z.string(),
})
export enum AuthProvider {
  GITHUB = "GITHUB"
}

export enum AuthTokenType {
  BEARER = "bearer"
}

export const authState = z.object({
  userName: z.string(),
  authToken: z.string(),
  repository: z.string()
})

export const registryEntry = z.object({
  userName: z.string(),
  repository: z.string()
})


export const userRecord = z.object({
  courseId: z.string(),
  isBookmarked: z.boolean(),
  isFollowed: z.boolean(),
  completed: z.array(z.string()),
  notes: z.array(noteSchema)
});

export const keystoreEntry = z.object({
  keyId: z.string(),
  publicKey: z.string()
})

export const repositoryEntry = z.object({
  publicKey: z.string(),
  userName: z.string(),
  repository: z.string(),
  login: z.string(),
  authProvider: z.string(),
})

export type Note = z.infer<typeof noteSchema>
export type AuthState = z.infer<typeof authState>
export type Analysis = z.infer<typeof analysisSchema>
export type Course = z.infer<typeof courseSchema>
export type Checkpoint = z.infer<typeof checkpointSchema>
export type UserRecord = z.infer<typeof userRecord>
export type Habitat = z.infer<typeof habitatSchema>
export type Curator = z.infer<typeof curatorSchema>
export type KeyStoreEntry = z.infer<typeof keystoreEntry>
export type RepositoryEntry = z.infer<typeof repositoryEntry>
export type RepositoryRegistration = z.infer<typeof repositoryRegistrationSchema>
