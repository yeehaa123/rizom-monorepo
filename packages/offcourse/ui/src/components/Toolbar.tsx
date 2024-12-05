import { cn } from "../lib/utils"
import type { CourseCardState } from "@/types"
import {
  Pencil1Icon,
  Crosshair2Icon,
  Share1Icon,
  StarIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons'

export default function Toolbar({
  course,
  cardState,
  actions,
}: CourseCardState) {
  const { isBookmarked } = cardState;
  const { courseId, habitat } = course;
  const {
    showShareOverlay,
    toggleBookmark,
    showNotesOverlay,
  } = actions;
  const BookmarkIcon = isBookmarked ? StarFilledIcon : StarIcon
  const iconStyles = "h-6 w-6 text-gray-300 hover:text-secondary"
  return (
    <div className="flex w-full justify-end gap-x-3">
      {habitat && <a href={`/posts/${habitat.slug}`}
        className={cn("invisible", { "visible": habitat })}>
        <Crosshair2Icon className={iconStyles} />
      </a>
      }
      <Pencil1Icon onClick={() => showNotesOverlay({ courseId })}
        className={cn(iconStyles, { "hidden": false })} />
      <Share1Icon onClick={() => showShareOverlay({ courseId })}
        className={cn(iconStyles, { "hidden": false })} />
      <BookmarkIcon onClick={() => toggleBookmark({ courseId })}
        className={cn(iconStyles, { "hidden": false })} />
    </div>
  )
}
