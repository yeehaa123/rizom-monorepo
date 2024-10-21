import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Tags({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1">
    {tags.map(tag => <a
      href={`/tags/${tag}`}
      className={cn(
        badgeVariants({ variant: "outline" }),
        "text-sm rounded-none text-gray-800 font-normal hover:bg-black hover:text-white")}
      key={tag}>
      {tag}
    </a>)}
  </div>
}
