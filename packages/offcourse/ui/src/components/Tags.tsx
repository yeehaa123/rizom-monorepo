import { badgeVariants } from "./ui/badge"
import { cn } from "@/lib/utils"

export default function Tags({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1">
    {tags.map(tag => <a
      href={`/tags/${tag}`}
      className={cn(
        badgeVariants({ variant: "outline" }))}
      key={tag}>
      {tag}
    </a>)}
  </div>
}
