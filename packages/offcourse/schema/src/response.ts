import { z } from 'zod';
import { authState, userRecord, courseSchema, registryEntry, repositoryMetaDatasSchema } from "./primitives";

export enum ResponseType {
  AUTHENTICATED = "AUTHENTICATED_EXISTING_USER",
  lOGGED_OUT = "LOGGED_OUT",
  FETCHED_USER_RECORDS = "FETCHED_USER_RECORDS",
  FETCHED_USER_COURSES = "FETCHED_USER_COURSES",
  RETRIEVED_REGISTRY_ENTRY = "RETRIEVED_REGISTRY_ENTRY",
  RETRIEVED_REPOSITORY_METADATA = "RETRIEVED_REPOSITORY_METADATA",
  REGISTRY_ENTRY_NOT_FOUND = "REGISTRY_ENTRY_NOT_FOUND",
  NO_OP = "NO_OP"
}

export const responseSchema = z.union([
  z.object({ type: z.literal(ResponseType.AUTHENTICATED), payload: authState }),
  z.object({ type: z.literal(ResponseType.RETRIEVED_REGISTRY_ENTRY), payload: registryEntry }),
  z.object({
    type: z.literal(ResponseType.RETRIEVED_REPOSITORY_METADATA),
    payload: repositoryMetaDatasSchema
  }),
  z.object({ type: z.literal(ResponseType.lOGGED_OUT), payload: z.undefined() }),
  z.object({ type: z.literal(ResponseType.FETCHED_USER_RECORDS), payload: z.array(userRecord) }),
  z.object({ type: z.literal(ResponseType.FETCHED_USER_COURSES), payload: z.array(courseSchema) }),
  z.object({ type: z.literal(ResponseType.REGISTRY_ENTRY_NOT_FOUND), payload: z.undefined() }),
  z.object({ type: z.literal(ResponseType.NO_OP), payload: z.undefined() }),
])

export type Response = z.infer<typeof responseSchema>
