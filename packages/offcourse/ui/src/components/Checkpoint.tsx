import type { Checkpoint } from "@offcourse/schema";

import { Label } from "@/components/ui/label"
import { Checkbox, ListItem } from "./"
import { cn } from "@/lib/utils";


interface Props extends Checkpoint {
  isCompleted: boolean,
  toggleComplete: () => void,
  selectCheckpoint: () => void,
}

export default function Checkpoint({
  checkpointId,
  task,
  isCompleted,
  toggleComplete,
  selectCheckpoint,
}: Props) {
  return (
    <ListItem>
      <Checkbox
        disabled={false}
        checked={isCompleted}
        id={checkpointId}
        onClick={toggleComplete} />
      <Label htmlFor={checkpointId}
        className={cn("px-2 py-1")}>
        <button onClick={selectCheckpoint}>
          {task}
        </button>
      </Label>
    </ListItem>
  )
}
