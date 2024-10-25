import type { Action } from '@offcourse/schema';
import { insertCommand } from "./queries"
import { toggleBookmark, } from "./models/bookmark"
import { insertKeyStoreEntry } from "./models/keystore"
import { toggleCompletion } from "./models/completion";
import { insertNote } from "./models/note";
import { ActionType } from '@offcourse/schema';
import { insertRepositoryEntry } from './models/repository';

export async function handleCommand(action: Action) {
  const id = await insertCommand(action);
  const { type, payload } = action;
  switch (type) {
    case ActionType.ADD_NOTE: {
      insertNote(payload);
      break;
    }
    case ActionType.TOGGLE_CHECKPOINT: {
      toggleCompletion(payload);
      break;
    }
    case ActionType.TOGGLE_BOOKMARK: {
      toggleBookmark(payload);
      break;
    }
    case ActionType.REGISTER_AUTH_SERVICE: {
      insertKeyStoreEntry(payload);
      break;
    }
    case ActionType.REGISTER_REPOSITORY: {
      insertRepositoryEntry(payload);
      break;
    }
    default: {
      console.log(`${type}: IGNORED`);
    }
  }
  return id;
}
