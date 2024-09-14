import type { Course } from "@offcourse/schema";
import { CourseCollection } from "../components/"
import { useOffcourse } from "./store";

export type Options = {
  githubClientId: string
}

export type ContainerProps = {
  data: Course | Course[],
  options: Options
}


export function Offcourse({ data, options }: ContainerProps) {
  const { state, actions } = useOffcourse(data, options);
  return <CourseCollection cards={state.cards} actions={actions} />
}
