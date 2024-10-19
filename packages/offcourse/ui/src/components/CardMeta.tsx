import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardDescription } from "@/components/ui/card"
import { AvatarImage, Toolbar } from "./";
import { CourseCardState } from "./CourseCard";

export default function CardMeta(courseCardState: CourseCardState) {
  const { course } = courseCardState;
  const { repository, alias } = course.curator;
  return (
    <div className="flex align-middle py-4 items-center justify-between">
      <a href={repository} className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage userName={alias} saturation={100} lightness={100} />
          <AvatarFallback className="bg-secondary text-white">YH</AvatarFallback>
        </Avatar>
        <CardDescription className="capitalize">{alias}</CardDescription>
      </a>
      <Toolbar {...courseCardState} />
    </div>
  )
}
