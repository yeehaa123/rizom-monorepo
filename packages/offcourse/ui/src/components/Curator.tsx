import type { Curator } from "@offcourse/schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardDescription } from "@/components/ui/card"
import { AvatarImage } from "./";

export default function Curator({ alias, repository }: Curator) {
  return (
    <a href={repository} className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage userName={alias} saturation={100} lightness={100} />
        <AvatarFallback className="bg-secondary text-white">YH</AvatarFallback>
      </Avatar>
      <CardDescription className="capitalize">{alias}</CardDescription>
    </a>
  )
}
