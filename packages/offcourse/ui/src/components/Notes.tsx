import { Checkpoint, Course, Note as NoteType } from "@offcourse/schema";
import Note from "./Note";

export default function Notes({ course, notes, selectedCheckpoint }:
  { course: Course, notes: NoteType[], selectedCheckpoint: Checkpoint | undefined }) {
  const selection = selectedCheckpoint
    ? notes.filter(({ checkpointId }) => selectedCheckpoint.checkpointId === checkpointId)
    : notes
  return <div className="my-8 space-y-1 overflow-y-auto">
    {selection.map((note: NoteType) => {
      const checkpoint = course.checkpoints.find(cp => cp.checkpointId === note.checkpointId)
      return < Note
        key={note.annotatedAt.toString()}
        note={note}
        task={checkpoint?.task} />
    }
    )}
  </div>
}
