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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CardChrome,
  Checkpoint,
  NoteForm,
  OffcourseInfo,
  Curator,
  Tags,
  Logo
} from "./";
import { CardModes } from "../types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function CourseCard(courseCardState: CourseCardState) {
  const { course, actions, cardState } = courseCardState;
  const {
    goal,
    courseId,
    checkpoints,
    curator,
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
    selectedCheckpoint,
    cardMode,
    userName,
    notes,
  } = cardState

  switch (cardMode) {
    case CardModes.NORMAL: {
      return (
        <CardChrome {...courseCardState}>
          <CardHeader className="space-y-8">
            <CardTitle>{course.goal}</CardTitle>
            <Curator {...curator} />
          </CardHeader>
          <CardContent className="space-y-8">
            <CardDescription>{course.description}</CardDescription>
            <Tags tags={course.tags} />
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
        </CardChrome>)
    }

    case CardModes.CHECKPOINT: {
      return selectedCheckpoint &&
        <CardChrome {...courseCardState}>
          <CardHeader className="space-y-8">
            <CardTitle onClick={() => hideCheckpointOverlay({ courseId })}>{course.goal}</CardTitle>
            <Curator {...curator} />
          </CardHeader>
          <CardContent className="space-y-8">
            <Checkpoint key={selectedCheckpoint.checkpointId}
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
            <Button onClick={() => { hideOverlay({ courseId }) }}
              variant="outline"
              className="w-full">Close</Button>
          </CardContent>
        </CardChrome>
    }

    case CardModes.SHARE: {
      const iconClasses = "mr-3 h-6 w-6 text-gray-300 group-hover:text-secondary fill-gray-300 group-hover:fill-gray-300"
      return (
        <CardChrome {...courseCardState}>
          <CardHeader className="space-y-8">
            <CardTitle onClick={() => hideOverlay({ courseId })}>{goal}</CardTitle>
            <Curator {...curator} />
          </CardHeader>
          <CardContent className="mt-4 space-y-8">
            <div className="space-y-4">
              <Button onClick={() => signIn({ courseId })} variant="outline" className="group w-full">
                <LinkedInLogoIcon className={iconClasses} />
                Share on LinkedIn
              </Button>
              <Button onClick={() => signIn({ courseId })} variant="outline" className="group w-full">
                <NotionLogoIcon className={iconClasses} />
                Share on Notion
              </Button>
              <Button onClick={() => signIn({ courseId })} variant="outline" className="group w-full">
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
              <Input required id="repository"
                placeholder="Your friend's repository url" name="repository" />
              <Button type="submit"
                form={`${courseId}-note`}
                className="w-full group hover:bg-secondary dark:hover:bg-secondary">
                <Logo className={iconClasses} />
                Share with Offcourse</Button>
            </form>
            <Button onClick={() => { hideOverlay({ courseId }) }}
              variant="outline"
              className="w-full">Close</Button>
          </CardContent>
        </CardChrome >
      )
    }


    case CardModes.NOTES: {
      return (
        <CardChrome {...courseCardState}>
          <CardHeader className="space-y-8">
            <CardTitle onClick={() => hideOverlay({ courseId })}>{goal}</CardTitle>
            <Curator {...curator} />
          </CardHeader>
          <CardContent className="space-y-8">
            {notes.map(({ note, annotatedAt }) =>
              <CardDescription key={annotatedAt.toString()}>
                {annotatedAt.getTime()} // {note}
              </CardDescription>)
            }
            <NoteForm noteId={`${courseId}-note`}
              onConfirm={(note: Note) => addNote({ ...note, courseId })} />
            <div className="space-y-2">
              <Button type="submit" form={`${courseId}-note`} className="w-full hover:bg-secondary">Save Note</Button>
              <Button
                variant="outline"
                onClick={() => { hideOverlay({ courseId }) }} className="w-full">Close</Button>
            </div>
          </CardContent>
        </CardChrome >
      )
    }

    case CardModes.AUTH: {
      return (
        <CardChrome className="bg-gray-100 dark:bg-gray-900" {...courseCardState}>
          <CardHeader>
            <CardTitle className="mb-6">Offcourse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
        </CardChrome >
      )
    }

    case CardModes.USER: {
      return (
        <CardChrome className="bg-gray-100 dark:bg-gray-900" {...courseCardState}>
          <CardHeader>
            <CardTitle className="capitalize mb-6">{userName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
        </CardChrome >
      )
    }

  }
}

