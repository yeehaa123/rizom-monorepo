import type { Checkpoint } from "@offcourse/schema";

import { Label } from "@/components/ui/label"
import { Checkbox, ListItem } from "./"
import { cn } from "@/lib/utils";


interface Props extends Checkpoint {
  isCompleted: boolean,
  toggleComplete: () => void,
  onClick: () => void,
}

export default function Checkpoint({
  checkpointId,
  task,
  isCompleted,
  toggleComplete,
  onClick
}: Props) {
  return (
    <ListItem>
      <Checkbox
        disabled={false}
        checked={isCompleted}
        id={checkpointId}
        onClick={toggleComplete} />
      <Label htmlFor={checkpointId}
        className={cn("px-3 py-1")}
        onClick={onClick}>
        {task}
      </Label>
    </ListItem>
  )
}
