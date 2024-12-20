import { minidenticon } from 'minidenticons'
import {
  AvatarImage,
} from "./ui/avatar"
import { useMemo } from 'react'
import { cn } from "../lib/utils"

export default function GeneratedAvatarImage({ userName, saturation, lightness, className }:
  { userName: string, saturation: number, lightness: number, className?: string }) {
  const svgURI = useMemo(
    () =>
      'data:image/svg+xml;utf8,' + encodeURIComponent(
        minidenticon(userName, saturation, lightness)),
    [userName, saturation, lightness]
  )
  return <AvatarImage src={svgURI} alt={userName}
    className={cn("bg-secondary-light text-white", className)} />
}
