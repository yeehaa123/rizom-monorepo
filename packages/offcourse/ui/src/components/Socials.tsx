import { cn } from "../lib/utils";
import type { CuratorProfile } from "@offcourse/schema";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon
} from '@radix-ui/react-icons'

enum SocialProviders {
  LINKEDIN = "linkedin",
  GITHUB = "github",
  INSTAGRAM = "instagram"
}
export function Socials({ socials, className }: { socials: CuratorProfile['socials'], className?: string }) {
  const icons = {
    [SocialProviders.LINKEDIN]: LinkedInLogoIcon,
    [SocialProviders.GITHUB]: GitHubLogoIcon,
    [SocialProviders.INSTAGRAM]: InstagramLogoIcon,
  }
  return <div className={cn("flex items-center space-x-3", className)}>
    {Object.entries(socials).map(([key, value]) => {
      const Comp = icons[key as SocialProviders];
      return value && <a key={key} href={value}>
        <Comp className="h-7 w-7 text-gray-300 hover:text-secondary" /></a>
    })}
  </div>
}
