import type { Curator } from "@offcourse/schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardDescription } from "@/components/ui/card"
import { Socials } from "./Socials";
import { AvatarImage } from "./";

export default function Curator({ alias, socials, showDetails }: Curator & {
  showDetails: () => void
}) {
  return (
    <div onClick={showDetails} className="flex align-middle items-center justify-between">
      <div className="flex align-middle items-center space-x-2">
        <Avatar className="h-10 w-10">
          <AvatarImage userName={alias} saturation={100} lightness={100} />
          <AvatarFallback className="bg-secondary text-white">YH</AvatarFallback>
        </Avatar>
        <CardDescription className="text-base capitalize align-middle">{alias}</CardDescription>
      </div>
      <Socials socials={socials} />
    </div>
  )
}
