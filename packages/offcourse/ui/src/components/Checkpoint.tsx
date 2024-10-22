import type { Checkpoint } from "@offcourse/schema";

import { Label } from "@/components/ui/label"
import { Checkbox, ListItem } from "./"
import { cn } from "@/lib/utils";


interface Props extends Checkpoint {
  isCompleted: boolean,
  goal?: string,
  toggleComplete: () => void,
  onClick: () => void,
}

export default function Checkpoint({
  checkpointId,
  task,
  goal,
  isCompleted,
  toggleComplete,
  onClick
}: Props) {
  if (goal) {
    return (
      <ListItem className="pt-2">
        <Label className="px-4 pb-0 text-gray-500 dark:text-gray-300">{goal}</Label>
        <div className="align-middle flex items-center">
          <Checkbox
            disabled={false}
            checked={isCompleted}
            id={checkpointId}
            className="m-4 mt-1 dark:bg-black mr-1"
            onClick={e => {
              e.preventDefault()
              toggleComplete()
            }} />
          <Label htmlFor={checkpointId}
            className={cn("text-xl m-3 mt-1 py-1 w-full")}
            onClick={(e) => {
              e.preventDefault()
              onClick()
            }}>
            {task}
          </Label>
        </div>
      </ListItem>
    )
  }
  return (
    <ListItem className="align-middle flex items-center">
      <Checkbox
        disabled={false}
        checked={isCompleted}
        id={checkpointId}
        className="m-4 mr-2"
        onClick={e => {
          e.preventDefault()
          toggleComplete()
        }} />
      <Label htmlFor={checkpointId}
        className={cn("text-base m-3 py-1 w-full")}
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}>
        {task}
      </Label>
    </ListItem>
  )
}
