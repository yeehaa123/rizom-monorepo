import { z } from 'zod';

export const courseQuery = z.object({
  courseId: z.string()
})

export const coursesQuery = z.object({
  courseIds: z.array(z.string())
})

export const checkpointQuery = z.object({
  courseId: z.string(),
  checkpointId: z.string()
})

export const oauthQuery = z.object({
  authProvider: z.string(),
  login: z.string()
})

export type CourseQuery = z.infer<typeof courseQuery>
export type CoursesQuery = z.infer<typeof coursesQuery>
export type CheckpointQuery = z.infer<typeof checkpointQuery>
export type OAuthQuery = z.infer<typeof oauthQuery>
