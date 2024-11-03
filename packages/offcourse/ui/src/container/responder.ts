import type { Dispatch } from "react";
import type { Action, Response } from "@offcourse/schema";
import { ActionType, responseSchema, ResponseType } from "@offcourse/schema";

export function responder(dispatch: Dispatch<Action>) {
  return (response: Response) => {
    const { type, payload } = responseSchema.parse(response);
    switch (type) {
      case ResponseType.enum.AUTHENTICATED_EXISTING_USER: {
        dispatch({ type: ActionType.ADD_AUTH_DATA, payload })
        break;
      }
      case ResponseType.enum.LOGGED_OUT: {
        dispatch({ type: ActionType.LOG_OUT, payload })
        break;
      }
      case ResponseType.enum.RETRIEVED_REPOSITORY_METADATA: {
        dispatch({ type: ActionType.ADD_REPOSITORY_METADATA, payload })
        break;
      }
      case ResponseType.enum.FETCHED_USER_RECORDS: {
        dispatch({ type: ActionType.ADD_USER_DATA, payload })
        break;
      }
      case ResponseType.enum.NO_OP: {
        console.log(type, "NOTHING TO DO");
        break;
      }
    }
  }
}
