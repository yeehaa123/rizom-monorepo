import { z } from 'zod';
import { coursesQuery, oauthQuery } from "./queries";

export enum QueryType {
  GET_REGISTRY_METADATA = "GET_REGISTRY_METADATA",
  GET_REGISTRY_FROM_OAUTH = "GET_REGISTRY_FROM_OAUTH",
  FETCH_USER_RECORDS = "FETCH_USER_RECORDS",
  GET_CURATED_COURSES = "GET_CURATED_COURSES",
  GET_BOOKMARKED_COURSES = "GET_BOOKMARKED_COURSES",
  GET_FOLLOWED_COURSES = "GET_FOLLOWED_COURSES",
  GET_ALL_COURSES = "GET_ALL_COURSES",
}

export const querySchema = z.union([
  z.object({
    type: z.literal(QueryType.GET_REGISTRY_METADATA), payload:
      z.object({ repository: z.string() })
  }),
  z.object({ type: z.literal(QueryType.FETCH_USER_RECORDS), payload: coursesQuery }),
  z.object({ type: z.literal(QueryType.GET_CURATED_COURSES), payload: coursesQuery.or(z.undefined()) }),
  z.object({ type: z.literal(QueryType.GET_BOOKMARKED_COURSES), payload: coursesQuery.or(z.undefined()) }),
  z.object({ type: z.literal(QueryType.GET_FOLLOWED_COURSES), payload: coursesQuery.or(z.undefined()) }),
  z.object({ type: z.literal(QueryType.GET_ALL_COURSES), payload: coursesQuery.or(z.undefined()) }),
  z.object({ type: z.literal(QueryType.GET_REGISTRY_FROM_OAUTH), payload: oauthQuery })
])

export type Query = z.infer<typeof querySchema>
