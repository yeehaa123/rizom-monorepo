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

export const courseQuery = courseSchema.pick({
  courseId: true
})

export const coursesQuery = z.object({
  courseIds: z.array(z.string())
})

export const checkpointQuery = courseQuery.merge(checkpointSchema).pick({
  courseId: true,
  checkpointId: true
})

export enum AuthProvider {
  GITHUB = "GITHUB"
}

export enum AuthTokenType {
  BEARER = "bearer"
}

export const authState = z.object({
  userName: z.string(),
  authProvider: z.nativeEnum(AuthProvider),
  tokenType: z.nativeEnum(AuthTokenType),
  accessToken: z.string(),
  repository: z.string()
})

export const userRecord = z.object({
  courseId: z.string(),
  isBookmarked: z.boolean(),
  isFollowed: z.boolean(),
  completed: z.array(z.string()),
  notes: z.array(noteSchema)
});

export enum ActionType {
  ADD_AUTH_DATA = "AUTHENTICATE",
  ADD_BOOKMARK = "ADD_BOOKMARK",
  REMOVE_BOOKMARK = "REMOVE_BOOKMARK",
  COMPLETE_CHECKPOINT = "COMPLETE_CHECKPOINT",
  UNCOMPLETE_CHECKPOINT = "UNCOMPLETE_CHECKPOINT",
  ADD_NOTE = "ADD_NOTE",
  SHOW_CHECKPOINT_OVERLAY = "SHOW_CHECKPOINT_OVERLAY",
  SHOW_INFO_OVERLAY = "SHOW_INFO_OVERLAY",
  SHOW_NOTES_OVERLAY = "SHOW_NOTES_OVERLAY",
  HIDE_OVERLAY = "HIDE_OVERLAY",
  UNSELECT_CHECKPOINT = "UNSELECT_CHECKPOINT",
  ADD_USER_DATA = "ADD_USER_DATA",
  LOG_OUT = "LOG_OUT",
}

export const actionSchema = z.union([
  z.object({ type: z.literal(ActionType.ADD_AUTH_DATA), payload: authState }),
  z.object({
    type: z.literal(ActionType.ADD_BOOKMARK), payload: courseQuery.extend({
      course: courseSchema,
    })
  }),
  z.object({ type: z.literal(ActionType.REMOVE_BOOKMARK), payload: courseQuery }),
  z.object({
    type: z.literal(ActionType.COMPLETE_CHECKPOINT), payload: checkpointQuery.extend({
      course: courseSchema,
    })
  }),
  z.object({
    type: z.literal(ActionType.ADD_NOTE), payload: courseQuery.merge(noteSchema)
  }),
  z.object({ type: z.literal(ActionType.UNCOMPLETE_CHECKPOINT), payload: checkpointQuery }),
  z.object({ type: z.literal(ActionType.SHOW_CHECKPOINT_OVERLAY), payload: checkpointQuery }),
  z.object({ type: z.literal(ActionType.SHOW_INFO_OVERLAY), payload: courseQuery }),
  z.object({ type: z.literal(ActionType.SHOW_NOTES_OVERLAY), payload: courseQuery }),
  z.object({ type: z.literal(ActionType.HIDE_OVERLAY), payload: courseQuery }),
  z.object({ type: z.literal(ActionType.UNSELECT_CHECKPOINT), payload: courseQuery }),
  z.object({ type: z.literal(ActionType.LOG_OUT), payload: z.undefined() }),
  z.object({ type: z.literal(ActionType.ADD_USER_DATA), payload: z.array(userRecord) }),
])

export enum QueryType {
  FETCH_USER_RECORDS = "FETCH_USER_RECORDS",
  FETCH_USER_COURSES = "FETCH_USER_COURSES"
}

export const querySchema = z.union([
  z.object({ type: z.literal(QueryType.FETCH_USER_RECORDS), payload: coursesQuery }),
  z.object({ type: z.literal(QueryType.FETCH_USER_COURSES), payload: coursesQuery })
])

export enum ResponseType {
  AUTHENTICATED = "AUTHENTICATED_EXISTING_USER",
  lOGGED_OUT = "LOGGED_OUT",
  FETCHED_USER_RECORDS = "FETCHED_USER_RECORDS",
  FETCHED_USER_COURSES = "FETCHED_USER_COURSES",
  NO_OP = "NO_OP"
}

export const responseSchema = z.union([
  z.object({ type: z.literal(ResponseType.AUTHENTICATED), payload: authState }),
  z.object({ type: z.literal(ResponseType.lOGGED_OUT), payload: z.undefined() }),
  z.object({ type: z.literal(ResponseType.FETCHED_USER_RECORDS), payload: z.array(userRecord) }),
  z.object({ type: z.literal(ResponseType.FETCHED_USER_COURSES), payload: z.array(courseSchema) }),
  z.object({ type: z.literal(ResponseType.NO_OP), payload: z.undefined() }),
])

export type Response = z.infer<typeof responseSchema>
export type Query = z.infer<typeof querySchema>
export type Action = z.infer<typeof actionSchema>
export type Note = z.infer<typeof noteSchema>
export type AuthState = z.infer<typeof authState>
export type Analysis = z.infer<typeof analysisSchema>
export type Course = z.infer<typeof courseSchema>
export type Checkpoint = z.infer<typeof checkpointSchema>
export type UserRecord = z.infer<typeof userRecord>
export type Habitat = z.infer<typeof habitatSchema>
export type Curator = z.infer<typeof curatorSchema>
export type CourseQuery = z.infer<typeof courseQuery>
export type CoursesQuery = z.infer<typeof coursesQuery>
export type CheckpointQuery = z.infer<typeof checkpointQuery>
