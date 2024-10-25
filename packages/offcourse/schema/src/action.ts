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
  TOGGLE_BOOKMARK = "TOGGLE_BOOKMARK",
  TOGGLE_CHECKPOINT = "TOGGLE_CHECKPOINT",
  ADD_NOTE = "ADD_NOTE",
  SHOW_CHECKPOINT_OVERLAY = "SHOW_CHECKPOINT_OVERLAY",
  SHOW_AUTH_OVERLAY = "SHOW_AUTH_OVERLAY",
  SHOW_CURATOR_OVERLAY = "SHOW_CURATOR_OVERLAY",
  SHOW_USER_OVERLAY = "SHOW_USER_OVERLAY",
  SHOW_NOTES_OVERLAY = "SHOW_NOTES_OVERLAY",
  SHOW_SHARE_OVERLAY = "SHOW_SHARE_OVERLAY",
  HIDE_OVERLAY = "HIDE_OVERLAY",
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
    type: z.literal(ActionType.TOGGLE_BOOKMARK),
    payload: courseSchema
  }),
  z.object({
    type: z.literal(ActionType.TOGGLE_CHECKPOINT),
    payload: courseSchema.extend({ checkpointId: z.string() })
  }),
  z.object({
    type: z.literal(ActionType.ADD_NOTE),
    payload: noteSchema.extend({ courseId: z.string(), checkpointId: z.string().optional() })
  }),
  z.object({
    type: z.literal(ActionType.SHOW_SHARE_OVERLAY),
    payload: courseQuery
  }),
  z.object({
    type: z.literal(ActionType.SHOW_CHECKPOINT_OVERLAY),
    payload: checkpointQuery
  }),
  z.object({
    type: z.literal(ActionType.SHOW_AUTH_OVERLAY),
    payload: courseQuery
  }),
  z.object({
    type: z.literal(ActionType.SHOW_USER_OVERLAY),
    payload: courseQuery
  }),
  z.object({
    type: z.literal(ActionType.SHOW_CURATOR_OVERLAY),
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
