import type { OffcourseState, StoreCardState } from "./store";
import type { Dispatch } from "react";
import type { Action } from "@offcourse/schema";
import type { Query, CourseQuery, CheckpointQuery } from "@offcourse/schema";
import { ActionType, QueryType, actionSchema } from "@offcourse/schema";
import { getAuthData } from "./auth";


export function findCard(state: OffcourseState, payload: CourseQuery) {
  return state.cards.find((({ courseId }) =>
    courseId === payload.courseId
  ));
}

export function getCheckpoint(card: StoreCardState, payload: CheckpointQuery) {
  return card.course.checkpoints.find(cp => cp.checkpointId === payload.checkpointId);
}

export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function query(query: Query) {
  const { type, payload } = query;
  switch (type) {
    case (QueryType.enum.GET_REGISTRY_METADATA): {
      const { repository } = payload;
      return sendPublicQuery(repository, query);
    }
    default: {
      return sendAuthenticatedQuery(query);
    }
  }
}

export function command({ auth }: OffcourseState, dispatch: Dispatch<Action>) {
  return (action: Action) => {
    try {
      const parsedAction = actionSchema.parse(action);
      if (auth && parsedAction.type !== ActionType.LOG_OUT) {
        sendAuthenticatedCommand(parsedAction);
      }
      return dispatch(parsedAction);
    }
    catch (error) {
      console.log(error)
      return
    }
  }
}

export async function sendAuthenticatedCommand(action: Action) {
  const authData = getAuthData();
  if (!authData) {
    throw (`${action.type} UNAUTHORIZED USE`)
  }
  const { authToken, repository } = authData;
  const url = `${repository}/command`;
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(action)
    });
    return await response.json();
  }
  catch (error) {
    console.log(error)
    return
  }
}

export async function sendPublicQuery(repository: string, query: Query) {
  const url = `${repository}/query`;
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query)
    });
    return await response.json();
  }
  catch (error) {
    console.log(error)
    return
  }
}
export async function sendAuthenticatedQuery(query: Query) {
  const authData = getAuthData();
  if (!authData) {
    throw ("UNAUTHORIZED USE")
  }
  const { authToken, repository } = authData;
  const url = `${repository}/query`;
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ` ${authToken}`,
      },
      body: JSON.stringify(query)
    });
    return await response.json();
  }
  catch (error) {
    console.log(error)
    return
  }
}
