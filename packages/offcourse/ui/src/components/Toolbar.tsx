import { cn } from "@/lib/utils"
import type { CourseCardState } from "./CourseCard"
import {
  Pencil1Icon,
  ExitIcon,
  CopyIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons'

const iconStyles = "h-5 w-5 text-gray-300 hover:text-secondary"
export default function Toolbar({
  course,
  cardState,
  actions,
}: CourseCardState) {
  const { affordances } = cardState;
  const { courseId } = course;
  const {
    canAnnotate,
  } = affordances;
  const {
    signOut,
    showNotesOverlay,
  } = actions;
  return (
    <div className="flex w-full justify-between gap-x-3">
      <ExitIcon onClick={signOut}
        className={cn(iconStyles, { "hidden": !canAnnotate })} />
      <CopyIcon onClick={() => showNotesOverlay({ courseId })}
        className={cn(iconStyles, { "hidden": !canAnnotate })} />
      <Pencil2Icon onClick={() => showNotesOverlay({ courseId })}
        className={cn(iconStyles, { "hidden": !canAnnotate })} />
    </div>
  )
}
