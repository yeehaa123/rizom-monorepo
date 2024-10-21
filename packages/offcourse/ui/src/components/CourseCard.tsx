import type { CourseCardState } from "../types";
import type { Note } from "@offcourse/schema";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  Pencil1Icon,
  Crosshair2Icon,
  Share1Icon,
  StarIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons'
import {
  CardContent,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  AvatarImage,
  Checkpoint,
  NoteForm,
  Logo,
  OffcourseInfo,
  Tags
} from "./";
import { CardModes } from "../types";

export default function CourseCard(courseCardState: CourseCardState) {
  const { course, actions, cardState } = courseCardState;
  const {
    courseId,
    checkpoints,
    curator,
  } = course;

  const {
    hideOverlay,
    signIn,
    signOut,
    addNote,
    toggleCheckpoint,
    showCheckpointOverlay,
    showInfoOverlay,
    showNotesOverlay,
    toggleBookmark,
  } = actions

  const {
    selectedCheckpoint,
    cardMode,
    notes,
    userName,
    isBookmarked,
    affordances,
  } = cardState

  const { canFollow } = affordances;

  const BookmarkIcon = isBookmarked ? StarFilledIcon : StarIcon
  const iconStyles = "h-6 w-6 text-gray-300 hover:text-secondary"

  return (
    <Card className={cn("relative flex flex-col select-none max-w-[360px] rounded-none")}>
      <CardHeader className="space-y-4">
        <CardTitle>{course.goal}</CardTitle>
        <div className="flex align-middle py-4 items-center justify-between">
          <a href={curator.repository} className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage userName={curator.alias} saturation={100} lightness={100} />
              <AvatarFallback className="bg-secondary text-white">YH</AvatarFallback>
            </Avatar>
            <CardDescription className="capitalize">{curator.alias}</CardDescription>
          </a>
          <div className="flex w-full justify-end gap-x-3">
            {course.habitat && <a href={`/posts/${course.habitat.slug}`}
              className={cn("invisible", { "visible": course.habitat })}>
              <Crosshair2Icon className={iconStyles} />
            </a>
            }
            <Pencil1Icon onClick={() => showNotesOverlay({ courseId })}
              className={cn(iconStyles, { "hidden": false })} />
            <Share1Icon onClick={() => showNotesOverlay({ courseId })}
              className={cn(iconStyles, { "hidden": false })} />
            <BookmarkIcon onClick={() => affordances.canBookmark
              ? toggleBookmark({ courseId })
              : showInfoOverlay({ courseId })
            } className={cn(iconStyles, { "hidden": false })} />
          </div>
        </div>
      </CardHeader>

      {cardMode === CardModes.NORMAL &&
        <CardContent className="space-y-6">
          <CardDescription>{course.description}</CardDescription>
          <Tags tags={course.tags} />
          <ul className="flex flex-col gap-2">
            {checkpoints.map((cp) => (
              <Checkpoint key={cp.checkpointId}
                {...cp}
                isCompleted={!!cardState.completed.find(id => id === cp.checkpointId)}
                selectCheckpoint={() => showCheckpointOverlay({
                  courseId,
                  checkpointId: cp.checkpointId
                })}
                toggleComplete={canFollow
                  ? () => toggleCheckpoint({ courseId, checkpointId: cp.checkpointId })
                  : () => showInfoOverlay({ courseId })} />
            ))}
          </ul>
        </CardContent>
      }

      {cardMode === CardModes.CHECKPOINT && selectedCheckpoint &&
        <CardContent className="space-y-6">
          <Checkpoint key={selectedCheckpoint.checkpointId}
            {...selectedCheckpoint}
            isCompleted={!!cardState.completed.find(id => id === selectedCheckpoint.checkpointId)}
            selectCheckpoint={() => showCheckpointOverlay({
              courseId,
              checkpointId: selectedCheckpoint.checkpointId
            })}
            toggleComplete={canFollow
              ? () => toggleCheckpoint({ courseId, checkpointId: selectedCheckpoint.checkpointId })
              : () => showInfoOverlay({ courseId })} />
          <Tags tags={selectedCheckpoint.tags} />
          <CardDescription>{selectedCheckpoint.description}</CardDescription>
          <a href={selectedCheckpoint.href}
            onClick={() => hideOverlay({ courseId })}
            className="flex text-xs items-center text-left text-gray-900 dark:text-gray-100">
            <ExternalLinkIcon className="mr-2 w-5 h-5" />
            <span className="break-words max-w-[70%]">{selectedCheckpoint.href}</span></a>
          <Button onClick={() => { hideOverlay({ courseId }) }} className="w-full">Close</Button>
        </CardContent>
      }

      {cardMode === CardModes.INFO &&
        <CardContent className="space-y-6">
          {!canFollow &&
            <>
              <OffcourseInfo />
              <Button onClick={() => signIn({ courseId })} variant="outline" className="w-full">
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                Authenticate With Github
              </Button>
            </>
          }
          {canFollow &&
            <>
              <OffcourseInfo />
              <Button onClick={signOut} variant="outline" className="w-full">
                Sign Out
              </Button>
            </>}

          <Button onClick={() => { hideOverlay({ courseId }) }} className="w-full">Close</Button>
        </CardContent>
      }

      {cardMode === CardModes.NOTES &&
        <CardContent className="space-y-6">
          {notes.map(({ note, annotatedAt }) =>
            <CardDescription key={annotatedAt.toString()}>
              {annotatedAt.getTime()} // {note}
            </CardDescription>)
          }
          <NoteForm noteId={`${courseId}-note`}
            onConfirm={(note: Note) => addNote({ ...note, courseId })} />
          <Button type="submit" form={`${courseId}-note`} className="w-full">Save Note</Button>
          <Button onClick={() => { hideOverlay({ courseId }) }} className="w-full">Close</Button>
        </CardContent >
      }

      <CardFooter className="flex justify-end">
        <Logo onClick={() => showInfoOverlay({ courseId })}
          className={cn(
            "h-5 w-5 fill-gray-300 dark:fill-gray-300 hover:fill-secondary",
            { "hidden": false })} />
      </CardFooter>
    </Card >
  )
}
