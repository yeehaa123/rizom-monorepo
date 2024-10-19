import type { Checkpoint, CheckpointQuery, CourseQuery } from "@offcourse/schema";

import { Label } from "@/components/ui/label"
import Checkbox from "./Checkbox"
import { cn } from "@/lib/utils";


interface Props extends Checkpoint {
  courseId: string,
  isCompleted: boolean,
  canCheckComplete: boolean | undefined,
  toggleComplete: (arg: CheckpointQuery) => void,
  showCheckpoint: (arg: CheckpointQuery) => void,
  showInfoOverlay: (arg: CourseQuery) => void
}

export default function Checkpoint({
  task,
  courseId,
  checkpointId,
  isCompleted,
  showInfoOverlay,
  toggleComplete,
  showCheckpoint,
  canCheckComplete
}: Props) {
  const taskId = `${courseId}-${task}`
  return (
    <li className="group flex align-middle bg-gray-100 dark:bg-gray-900 dark:text-white
    hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-black p-3 flex items-center">
      <Checkbox
        checked={!!isCompleted}
        disabled={!canCheckComplete}
        id={`${courseId}-${task}`}
        onClick={canCheckComplete
          ? () => toggleComplete({ courseId, checkpointId })
          : () => showInfoOverlay({ courseId })} />
      <Label
        htmlFor={taskId}
        className={cn("px-2 py-1", { "px-4": canCheckComplete })}>
        <button onClick={() => showCheckpoint({ courseId, checkpointId })}>{task}</button>
      </Label>
    </li>
  )
}
