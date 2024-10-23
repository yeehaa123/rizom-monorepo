import type { CourseCardState } from "../types";
import type { Note } from "@offcourse/schema";
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  NotionLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons'
import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import {
  CardChrome,
  Checkpoint,
  NoteForm,
  OffcourseInfo,
  Tags,
  Logo
} from "./";
import { CardModes } from "../types";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";


const iconClasses = "mr-3 h-6 w-6 text-secondary group-hover:text-white"
const cardContentClasses = "absolute top-0 space-y-6 flex flex-col h-full w-full justify-between invisible opacity-0"

export default function CourseCard(courseCardState: CourseCardState) {
  const { course, actions, cardState } = courseCardState;
  const { goal,
    tags,
    description,
    courseId,
    checkpoints,
  } = course;

  const {
    hideOverlay,
    hideCheckpointOverlay,
    signIn,
    signOut,
    addNote,
    toggleCheckpoint,
    showCheckpointOverlay,
  } = actions

  const {
    userName,
    selectedCheckpoint,
    cardMode,
    notes,
  } = cardState

  return (
    <CardChrome className="overflow-hidden" {...courseCardState}>
      <CardContent className={cn("space-y-8 mt-4 invisible opacity-0 transition-all",
        { "visible opacity-100": cardMode === CardModes.NORMAL })}>
        <CardTitle onClick={() => hideOverlay({ courseId })}>{goal}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Tags tags={tags} />
        <ul className="flex flex-col gap-2">
          {checkpoints.map((cp) => (
            <Checkpoint key={cp.checkpointId}
              {...cp}
              isCompleted={!!cardState.completed.find(id => id === cp.checkpointId)}
              onClick={() => showCheckpointOverlay({
                courseId,
                checkpointId: cp.checkpointId
              })}
              toggleComplete={() => toggleCheckpoint({ courseId, checkpointId: cp.checkpointId })}
            />
          ))}
        </ul>
      </CardContent>
      <CardContent className={cn(cardContentClasses,
        { "visible opacity-100": cardMode === CardModes.CHECKPOINT })}>
        {selectedCheckpoint && <>
          <div className="space-y-8">
            <Checkpoint goal={goal} key={selectedCheckpoint.checkpointId}
              {...selectedCheckpoint}
              isCompleted={
                !!cardState.completed.find(id => id === selectedCheckpoint.checkpointId)
              }
              onClick={
                () => hideCheckpointOverlay({ courseId })
              }
              toggleComplete={
                () => toggleCheckpoint({ courseId, checkpointId: selectedCheckpoint.checkpointId })
              } />
            <CardDescription>{selectedCheckpoint.description}</CardDescription>
            <Tags tags={selectedCheckpoint.tags} />
            <a href={selectedCheckpoint.href}
              onClick={() => hideOverlay({ courseId })}
              className="flex text-xs items-center text-left text-gray-900 dark:text-gray-100">
              <ExternalLinkIcon className="mr-2 w-5 h-5" />
              <span className="break-words max-w-[70%]">{selectedCheckpoint.href}</span></a>
          </div>
          <Button onClick={() => { hideOverlay({ courseId }) }}
            variant="outline"
            className="w-full">Close</Button>
        </>}
      </CardContent>

      <CardContent className={cn(cardContentClasses,
        { "visible opacity-100": cardMode === CardModes.SHARE })}>
        <div className="flex flex-col flex-1 justify-center space-y-4">
          <Button onClick={() => signIn({ courseId })} variant="outline" className="group w-full">
            <LinkedInLogoIcon className={iconClasses} />
            Share on LinkedIn
          </Button>
          <Button onClick={() => signIn({ courseId })} variant="outline" className="group w-full">
            <NotionLogoIcon className={iconClasses} />
            Share on Notion
          </Button>
          <Button onClick={() => signIn({ courseId })}
            variant="outline" className="group w-full">
            <InstagramLogoIcon className={iconClasses} />
            Share on Instagram
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-muted-foreground">Or</span>
          <Separator className="flex-1" />
        </div>
        <form className="grid w-full max-w-sm items-center gap-3">
          <div className="space-y-4 my-8">
            <Input required id="repository"
              placeholder="Your friend's repository url" name="repository" />
            <Button type="submit"
              form={`${courseId}-note`}
              className="group w-full bg-gray-700 hover:bg-secondary dark:hover:bg-secondary">
              <Logo className={cn(iconClasses, "dark:fill-black fill-white bg-black dark:bg-white group-hover:bg-secondary")} />
              Share with Offcourse</Button>
          </div>
        </form>
        <Button onClick={() => { hideOverlay({ courseId }) }}
          variant="outline"
          className="w-full">Close</Button>
      </CardContent>

      <CardContent className={cn(cardContentClasses,
        { "visible opacity-100": cardMode === CardModes.NOTES })}>
        <div className="my-8 space-y-4">
          {notes.map(({ note, annotatedAt }) =>
            <CardDescription key={annotatedAt.toString()}>
              {annotatedAt.getTime()} // {note}
            </CardDescription>)
          }
        </div>
        <div className="space-y-4">
          <NoteForm noteId={`${courseId}-note`}
            onConfirm={(note: Note) => addNote({ ...note, courseId })} />
          <div className="space-y-2">
            <Button type="submit"
              form={`${courseId}-note`}
              className="w-full hover:bg-secondary">Save Note</Button>
            <Button
              variant="outline"
              onClick={() => { hideOverlay({ courseId }) }} className="w-full">Close</Button>
          </div>
        </div>
      </CardContent>

      <CardContent className={cn(cardContentClasses,
        { "visible opacity-100": cardMode === CardModes.AUTH })}>
        <CardTitle onClick={() => hideOverlay({ courseId })}>Offcourse</CardTitle>
        <OffcourseInfo />
        <div className="space-y-2">
          <Button
            onClick={() => signIn({ courseId })} className="w-full hover:bg-secondary">
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            Authenticate With Github
          </Button>
          <Button
            variant="outline"
            onClick={() => { hideOverlay({ courseId }) }} className="w-full">Close</Button>
        </div>
      </CardContent>

      <CardContent className={cn(cardContentClasses,
        { "visible opacity-100": cardMode === CardModes.USER })}>
        <CardTitle className="capitalize"
          onClick={() => hideOverlay({ courseId })}>{userName}</CardTitle>
        <OffcourseInfo />
        <div className="space-y-2">
          <Button onClick={signOut} className="w-full hover:bg-secondary">
            Sign Out
          </Button>
          <Button
            variant="outline"
            onClick={() => { hideOverlay({ courseId }) }} className="w-full">Close</Button>
        </div>
      </CardContent>
    </CardChrome >)
}

