import type { Action } from '@offcourse/schema';
import { insertCommand } from "./queries"
import { deleteBookmark, insertBookmark, } from "./models/bookmark"
import { insertCourse } from "./models/course"
import { insertKeyStoreEntry } from "./models/keystore"
import { deleteCompletion, insertCompletion } from "./models/completion";
import { insertNote } from "./models/note";
import { actionSchema, ActionType } from '@offcourse/schema';

export async function handleCommand(body: Action) {
  const action = actionSchema.parse(body)
  const id = await insertCommand(action);
  const { type, payload } = action;
  switch (type) {
    case ActionType.ADD_NOTE: {
      insertNote(payload);
      break;
    }
    case ActionType.COMPLETE_CHECKPOINT: {
      insertCompletion(payload);
      insertCourse(payload);
      break;
    }
    case ActionType.UNCOMPLETE_CHECKPOINT: {
      deleteCompletion(payload);
      break;
    }
    case ActionType.REMOVE_BOOKMARK: {
      deleteBookmark(payload);
      break;
    }
    case ActionType.ADD_BOOKMARK: {
      insertBookmark(payload);
      insertCourse(payload);
      break;
    }
    case ActionType.REMOVE_BOOKMARK: {
      deleteBookmark(payload);
      break;
    }
    case ActionType.REGISTER_REPOSITORY: {
      insertKeyStoreEntry(payload);
      break;
    }
    default: {
      console.log(`${type}: IGNORED`);
    }
  }
  return id;
}
