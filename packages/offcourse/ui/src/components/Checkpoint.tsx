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
        className="m-3"
        onClick={toggleComplete} />
      <Label htmlFor={checkpointId}
        className={cn("m-3 py-1 w-full")}
        onClick={onClick}>
        {task}
      </Label>
    </ListItem>
  )
}
