import { z } from 'zod';
import { courseQuery, checkpointQuery } from "./queries";
import {
  authState,
  courseSchema,
  userRecord,
  repositoryEntry,
  keystoreEntry,
  noteSchema
} from "./primitives"

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
  REGISTER_REPOSITORY = "REGISTER_REPOSITORY",
  REGISTER_AUTH_SERVICE = "REGISTER_AUTH_SERVICE"
}

export const actionSchema = z.union([
  z.object({
    type: z.literal(ActionType.ADD_AUTH_DATA),
    payload: authState
  }),
  z.object({
    type: z.literal(ActionType.ADD_BOOKMARK),
    payload: courseQuery.extend({
      course: courseSchema,
    })
  }),
  z.object({
    type: z.literal(ActionType.REMOVE_BOOKMARK),
    payload: courseQuery
  }),
  z.object({
    type: z.literal(ActionType.COMPLETE_CHECKPOINT),
    payload: checkpointQuery.extend({ course: courseSchema })
  }),
  z.object({
    type: z.literal(ActionType.ADD_NOTE),
    payload: noteSchema.extend({ courseId: z.string() })
  }),
  z.object({
    type: z.literal(ActionType.UNCOMPLETE_CHECKPOINT),
    payload: checkpointQuery
  }),
  z.object({
    type: z.literal(ActionType.SHOW_CHECKPOINT_OVERLAY),
    payload: checkpointQuery
  }),
  z.object({
    type: z.literal(ActionType.SHOW_INFO_OVERLAY),
    payload: courseQuery
  }),
  z.object({
    type: z.literal(ActionType.SHOW_NOTES_OVERLAY),
    payload: courseQuery
  }),
  z.object({
    type: z.literal(ActionType.HIDE_OVERLAY),
    payload: courseQuery
  }),
  z.object({
    type: z.literal(ActionType.UNSELECT_CHECKPOINT),
    payload: courseQuery
  }),
  z.object({
    type: z.literal(ActionType.LOG_OUT),
    payload: z.undefined()
  }),
  z.object({
    type: z.literal(ActionType.ADD_USER_DATA),
    payload: z.array(userRecord)
  }),
  z.object({
    type: z.literal(ActionType.REGISTER_AUTH_SERVICE),
    payload: keystoreEntry
  }),
  z.object({
    type: z.literal(ActionType.REGISTER_REPOSITORY),
    payload: repositoryEntry
  }),
])

export type Action = z.infer<typeof actionSchema>
