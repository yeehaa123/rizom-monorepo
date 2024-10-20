import type { CourseCardState } from "../types";
import { Overlay } from "./Overlay"
import CardChrome from "./CardChrome";
import { cn } from "@/lib/utils"
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Checkpoint,
  Curator,
  Toolbar,
  Tags,
  Logo
} from "./";

export default function CourseCard(courseCardState: CourseCardState) {
  const { course, actions, cardState } = courseCardState;
  const {
    courseId,
    goal,
    curator,
    checkpoints,
    description,
    tags,
  } = course;

  const {
    showInfoOverlay,
    toggleCheckpoint,
    showCheckpointOverlay
  } = actions

  const { affordances, completed } = cardState
  const { canFollow } = affordances

  return (
    <div className="grid *:col-start-1 *:row-start-1 overflow-hidden" >
      <Overlay {...courseCardState} />
      <CardChrome>
        <CardHeader className="space-y-4">
          <CardTitle className="flex w-full justify-between space-x-5 ">
            {goal}
          </CardTitle>
          <div className="flex align-middle py-4 items-center justify-between">
            <Curator {...curator} />
            <Toolbar {...courseCardState} />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          <CardDescription onClick={console.log}>
            {description}
          </CardDescription>
          <Tags tags={tags} />
          <ul className="flex flex-col gap-2">
            {checkpoints.map((({ checkpointId, ...cp }, index) => (
              <Checkpoint
                key={index}
                isCompleted={!!completed.find(id => id === checkpointId)}
                courseId={courseId}
                canCheckComplete={canFollow}
                showInfoOverlay={showInfoOverlay}
                toggleComplete={toggleCheckpoint}
                showCheckpoint={() => showCheckpointOverlay({ courseId, checkpointId })}
                checkpointId={checkpointId}
                {...cp} />)))
            }
          </ul>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Logo onClick={() => showInfoOverlay({ courseId })}
            className={cn("h-5 w-5 fill-gray-300 dark:fill-gray-300 hover:fill-secondary",
              { "hidden": false })} />
        </CardFooter>
      </CardChrome >
    </div >)
}
