import type { ReactNode } from "react"
import { Card, CardHeader, CardFooter } from "./ui/card"
import { cn } from "../lib/utils"
import { CourseCardState } from "@/types"
import {
  Curator,
  Logo,
  Toolbar,
} from "./";

type Props =
  CourseCardState & { children: ReactNode | ReactNode[], className?: string }

export default function CardChrome({ className, children, ...courseCardState }: Props) {
  const { course, actions } = courseCardState
  const { courseId, curator, } = course;

  const {
    showCuratorOverlay,
    showUserOverlay,
  } = actions

  return (
    <Card className={cn(
      "flex flex-col select-none min-w-[360px] max-w-[420px]",
      className)}>
      <CardHeader className="flex flex-row space-y-0 align-middle items-center justify-between">
        <Curator showDetails={() => showCuratorOverlay({ courseId })} {...curator} />
        <Toolbar {...courseCardState} />
      </CardHeader>
      <div className="relative">
        {children}
      </div>
      <CardFooter className="flex w-full justify-between">
        <Logo
          onClick={() => showUserOverlay({ courseId })}
          className={cn(
            "h-5 w-5 fill-gray-300 dark:fill-gray-300 dark:hover:fill-secondary hover:fill-secondary", { "hidden": false })} />
      </CardFooter>
    </Card >)
}
