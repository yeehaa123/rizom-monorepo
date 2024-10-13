import { z } from 'zod';
import { coursesQuery } from "./queries";

export enum QueryType {
  FETCH_USER_RECORDS = "FETCH_USER_RECORDS",
  FETCH_USER_COURSES = "FETCH_USER_COURSES"
}

export const querySchema = z.union([
  z.object({ type: z.literal(QueryType.FETCH_USER_RECORDS), payload: coursesQuery }),
  z.object({ type: z.literal(QueryType.FETCH_USER_COURSES), payload: coursesQuery })
])

export type Query = z.infer<typeof querySchema>
