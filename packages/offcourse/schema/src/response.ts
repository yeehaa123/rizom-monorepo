import { z } from 'zod';
import {
  authState,
  userRecord,
  courseSchema,
  registryEntry,
  repositoryMetaDatasSchema
} from "./primitives";

export const ResponseType = z.enum([
  "AUTHENTICATED_EXISTING_USER",
  "LOGGED_OUT",
  "FETCHED_USER_RECORDS",
  "RENDERED_COURSE_IMAGE",
  "RETRIEVED_COURSES",
  "RETRIEVED_REGISTRY_ENTRY",
  "RETRIEVED_REPOSITORY_METADATA",
  "REGISTRY_ENTRY_NOT_FOUND",
  "NO_OP"
])

export const responseSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(ResponseType.enum.AUTHENTICATED_EXISTING_USER),
    payload: authState
  }),
  z.object({
    type: z.literal(ResponseType.enum.RENDERED_COURSE_IMAGE),
    payload: z.any()
  }),
  z.object({
    type: z.literal(ResponseType.enum.RETRIEVED_REGISTRY_ENTRY),
    payload: registryEntry
  }),
  z.object({
    type: z.literal(ResponseType.enum.RETRIEVED_REPOSITORY_METADATA),
    payload: repositoryMetaDatasSchema
  }),
  z.object({
    type: z.literal(ResponseType.enum.LOGGED_OUT),
    payload: z.undefined()
  }),
  z.object({
    type: z.literal(ResponseType.enum.FETCHED_USER_RECORDS),
    payload: z.array(userRecord)
  }),
  z.object({
    type: z.literal(ResponseType.enum.RETRIEVED_COURSES),
    payload: z.array(courseSchema)
  }),
  z.object({
    type: z.literal(ResponseType.enum.REGISTRY_ENTRY_NOT_FOUND),
    payload: z.undefined()
  }),
  z.object({
    type: z.literal(ResponseType.enum.NO_OP),
    payload: z.undefined()
  }),
])

export type Response = z.infer<typeof responseSchema>
