import type { CourseCardState } from "../types";
import type { Note as NoteType } from "@offcourse/schema";
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
} from "./ui/card"
import {
  CardChrome,
  Checkpoint,
  NoteForm,
  OffcourseInfo,
  Tags,
  Logo,
  Notes
} from "./";
import { CardModes } from "../types";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { Label } from "./ui/label";


const iconClasses = "mr-3 h-6 w-6 text-secondary group-hover:text-white"
const cardContentClasses = "absolute pt-2 pb-6 top-0 space-y-6 flex flex-col h-full w-full justify-between invisible opacity-0"

export default function CourseCard(courseCardState: CourseCardState) {
  const { course, actions, cardState, auth, repository } = courseCardState;
  const {
    goal,
    tags,
    description,
    courseId,
    checkpoints,
  } = course;

  const {
    hideOverlay,
    signIn,
    signOut,
    addNote,
    toggleCheckpoint,
    showCheckpointOverlay,
  } = actions

  const {
    selectedCheckpoint,
    cardMode,
    notes,
  } = cardState

  return (
    <CardChrome className="overflow-hidden bg-white" {...courseCardState}>
      <CardContent className={cn("space-y-8 pt-2 pb-6 invisible opacity-0 transition-all",
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
              onClick={() => hideOverlay({ courseId })}
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

      {repository && <CardContent className={cn(cardContentClasses,
        { "visible opacity-100": cardMode === CardModes.CURATOR })}>
        <div className="space-y-8">
          <CardTitle onClick={() => hideOverlay({ courseId })}>{repository.curator}</CardTitle>
          <CardDescription>{repository.description}</CardDescription>
        </div>
        <div>
          <Label>Courses Curated:</Label>
          <ul>
            {repository.coursesCurated.map(({ courseId, goal }) => (
              <li key={courseId}><a href={`${repository.repository}/${courseId}`}>{goal}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <Label>Courses Followed:</Label>
          <ul>
            {repository.coursesFollowed.map(({ courseId, goal }) => (
              <li key={courseId}><a href={`${repository.repository}/${courseId}`}>{goal}</a></li>
            ))}
          </ul>
        </div>
        <Button onClick={() => { hideOverlay({ courseId }) }}
          variant="outline"
          className="w-full">Close</Button>
      </CardContent>}

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
        {selectedCheckpoint ?
          <div className="space-y-8">
            <Checkpoint goal={goal} key={selectedCheckpoint.checkpointId}
              {...selectedCheckpoint}
              isCompleted={
                !!cardState.completed.find(id => id === selectedCheckpoint.checkpointId)
              }
              onClick={() => hideOverlay({ courseId })}
              toggleComplete={
                () => toggleCheckpoint({ courseId, checkpointId: selectedCheckpoint.checkpointId })
              } />
          </div>
          :
          <CardTitle onClick={() => hideOverlay({ courseId })}>{goal}</CardTitle>}
        <Notes notes={notes} course={course} selectedCheckpoint={selectedCheckpoint} />
        <div className="space-y-4">
          <NoteForm noteId={`${courseId}-note`}
            onConfirm={(note: Pick<NoteType, "note" | "annotatedAt">) => addNote({
              ...note,
              courseId,
              checkpointId: selectedCheckpoint?.checkpointId
            })} />
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

      {auth &&
        <CardContent className={cn(cardContentClasses,
          { "visible opacity-100": cardMode === CardModes.USER })}>
          <CardTitle className="capitalize"
            onClick={() => hideOverlay({ courseId })}>{auth.userName}</CardTitle>
          <OffcourseInfo />
          <div className="space-y-2">
            <Button onClick={signOut} className="w-full hover:bg-secondary">
              Sign Out
            </Button>
            <Button
              variant="outline"
              onClick={() => { hideOverlay({ courseId }) }} className="w-full">Close</Button>
          </div>
        </CardContent>}
    </CardChrome >)
}

