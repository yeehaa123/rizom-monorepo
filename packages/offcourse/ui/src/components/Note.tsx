import type { Note as NoteType, Course } from "@offcourse/schema";
import { formatDistanceToNow } from "date-fns";
import { Card, CardDescription } from "./ui/card";


export default function Note({ note, task }: { note: NoteType, task: string | undefined }) {
  const { annotatedAt, note: message } = note;
  return <div className="flex flex-col p-4 space-y-2 space-between">
    <CardDescription>
      {task && <span className="capitalize">Task: {task}</span>}
    </CardDescription>
    {message}
    <CardDescription className="flex justify-end capitalize ">
      {formatDistanceToNow(annotatedAt, { addSuffix: true })}
    </CardDescription>
  </div>
}
