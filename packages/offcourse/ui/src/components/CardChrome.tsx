import type { ReactNode } from "react"
import { Card, CardHeader, CardFooter } from "./ui/card"
import { cn } from "@/lib/utils"
import { CourseCardState } from "@/types"
import {
  Curator,
  Logo,
  Toolbar,
} from "./";

export default function CardChrome({ className, children, ...courseCardState }:
  CourseCardState & { children: ReactNode | ReactNode[], className?: string }) {
  const { course, actions, cardState } = courseCardState
  const {
    courseId,
    curator,
  } = course;

  const {
    showCuratorOverlay,
    showUserOverlay,
  } = actions

  const {
  } = cardState;

  return (
    <Card className={cn(
      "flex flex-col select-none min-w-[360px] max-w-[420px]",
      className)}>
      <CardHeader>
        <Curator showDetails={() => showCuratorOverlay({ courseId })} {...curator} />
      </CardHeader>
      <div className="relative">
        {children}
      </div>
      <CardFooter className="flex w-full justify-between">
        <Logo
          onClick={() => showUserOverlay({ courseId })}
          className={cn(
            "h-5 w-5 fill-gray-300 dark:fill-gray-300 dark:hover:fill-secondary hover:fill-secondary", { "hidden": false })} />
        <Toolbar {...courseCardState} />
      </CardFooter>
    </Card >)
}
