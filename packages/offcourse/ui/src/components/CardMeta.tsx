import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardDescription } from "@/components/ui/card"
import { AvatarImage } from "./";
import { CourseCardState } from "./CourseCard";
import {
  StarIcon,
  StarFilledIcon,
  Crosshair2Icon,
  Share1Icon,
  Pencil1Icon,
} from '@radix-ui/react-icons'

const iconStyles = "h-6 w-6 text-gray-300 hover:text-secondary"
export default function CardMeta(courseCardState: CourseCardState) {
  const { course, cardState, actions } = courseCardState;
  const { affordances, isBookmarked } = cardState;
  const { curator, habitat, courseId } = course;
  const { repository, alias } = curator;
  const {
    canBookmark,
    canAnnotate,
  } = affordances;
  const {
    toggleBookmark,
    showInfoOverlay,
    showNotesOverlay,
  } = actions;
  const BookmarkIcon = isBookmarked
    ? StarFilledIcon
    : StarIcon
  return (
    <div className="flex align-middle py-4 items-center justify-between">
      <a href={repository} className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage userName={alias} saturation={100} lightness={100} />
          <AvatarFallback className="bg-secondary text-white">YH</AvatarFallback>
        </Avatar>
        <CardDescription className="capitalize">{alias}</CardDescription>
      </a>
      <div className="flex w-full justify-end gap-x-3">
        {habitat && <a href={`/posts/${habitat.slug}`} className={cn("invisible", { "visible": habitat })}>
          <Crosshair2Icon className={iconStyles} />
        </a>}
        <Share1Icon onClick={() => showNotesOverlay({ courseId })}
          className={cn(iconStyles, { "hidden": false })} />
        <BookmarkIcon onClick={() =>
          canBookmark ? toggleBookmark({ courseId }) : showInfoOverlay({ courseId })
        }
          className={cn(iconStyles, { "hidden": false })} />
      </div>
    </div>
  )
}
