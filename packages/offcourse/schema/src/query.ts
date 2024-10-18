import { z } from 'zod';
import { coursesQuery, oauthQuery } from "./queries";

export enum QueryType {
  GET_REGISTRY_FROM_OAUTH = "GET_REGISTRY_FROM_OAUTH",
  FETCH_USER_RECORDS = "FETCH_USER_RECORDS",
  FETCH_USER_COURSES = "FETCH_USER_COURSES"
}

export const querySchema = z.union([
  z.object({ type: z.literal(QueryType.FETCH_USER_RECORDS), payload: coursesQuery }),
  z.object({ type: z.literal(QueryType.FETCH_USER_COURSES), payload: coursesQuery }),
  z.object({ type: z.literal(QueryType.GET_REGISTRY_FROM_OAUTH), payload: oauthQuery })
])

export type Query = z.infer<typeof querySchema>
