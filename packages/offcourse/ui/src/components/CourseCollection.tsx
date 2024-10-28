import type { CourseCardState, CardActions } from "@/types"
import { CourseCard } from "."
import { AuthState } from "@offcourse/schema"

export type Props = {
  cards: Omit<CourseCardState, "actions" | "auth">[],
  actions: CardActions
  auth: AuthState | undefined
}

export default function CourseCollection({ cards, actions, auth }: Props) {
  return (
    <div
      className="grid justify-center items-start gap-8 
      grid-cols-[repeat(auto-fit,minmax(360px,400px))]">
      {cards.map(card => (
        <CourseCard {...card} auth={auth} key={card.course.courseId} actions={actions} />)
      )}
    </div>)
}
