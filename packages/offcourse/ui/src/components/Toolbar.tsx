import { cn } from "@/lib/utils"
import type { CourseCardState } from "./CourseCard"
import {
  StarIcon,
  StarFilledIcon,
  Crosshair2Icon,
  Share1Icon,
  Pencil1Icon,
} from '@radix-ui/react-icons'

export default function Toolbar({
  course,
  cardState,
  actions,
}: CourseCardState) {
  const { affordances, isBookmarked } = cardState;
  const { habitat, courseId } = course;
  const {

    canBookmark,
    canAnnotate,
  } = affordances;
  const {
    toggleBookmark,
    showInfoOverlay,
    showNotesOverlay,
  } = actions;
  const iconStyles = "h-6 w-6 text-gray-300 hover:text-secondary"
  const BookmarkIcon = isBookmarked
    ? StarFilledIcon
    : StarIcon
  return (
    <div className="flex w-full justify-end gap-x-3">
      {habitat && <a href={`/posts/${habitat.slug}`} className={cn("invisible", { "visible": habitat })}>
        <Crosshair2Icon className={iconStyles} />
      </a>}
      <Pencil1Icon onClick={() => showNotesOverlay({ courseId })}
        className={cn(iconStyles, { "hidden": !canAnnotate })} />
      <Share1Icon onClick={() => showNotesOverlay({ courseId })}
        className={cn(iconStyles, { "hidden": false })} />
      <BookmarkIcon onClick={() =>
        canBookmark ? toggleBookmark({ courseId }) : showInfoOverlay({ courseId })
      }
        className={cn(iconStyles, { "hidden": false })} />
    </div>
  )
}
