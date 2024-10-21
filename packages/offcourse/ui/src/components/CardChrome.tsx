import type { ReactNode } from "react"
import { Card, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CourseCardState } from "@/types"
import {
  Logo,
  Toolbar,
} from "./";

export default function CardChrome({ className, children, ...courseCardState }:
  CourseCardState & { children: ReactNode | ReactNode[], className?: string }) {
  const { course, actions, cardState } = courseCardState
  const {
    courseId,
  } = course;

  const {
    showAuthOverlay,
    showUserOverlay
  } = actions

  const {
    userName
  } = cardState;

  return (
    <Card className={cn(
      "flex flex-col select-none max-w-[360px] rounded-none transition-height duration-500",
      className)}>
      {children}
      <CardFooter className="flex w-full justify-between">
        <Logo
          onClick={userName
            ? () => showUserOverlay({ courseId })
            : () => showAuthOverlay({ courseId })
          }
          className={cn(
            "h-5 w-5 fill-gray-300 dark:fill-gray-300 hover:fill-secondary",
            { "hidden": false })} />
        <Toolbar {...courseCardState} />
      </CardFooter>
    </Card >)
}
