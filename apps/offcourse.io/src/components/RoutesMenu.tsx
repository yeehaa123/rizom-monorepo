import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"

type Props = {
  links: { title: string, href: string }[],
  className?: string,
  currentRoute: string
}

export function RoutesMenu({ links, className, currentRoute }: Props) {
  return <NavigationMenu value={currentRoute} className={className}>
    <NavigationMenuList>
      <NavigationMenuItem>
        {links.sort((a, b) => a.title.localeCompare(b.title)).map(({ title, href }) =>
          <NavigationMenuLink key={href}
            active={title === currentRoute}
            className={cn(navigationMenuTriggerStyle())}
            href={href}>{title}</NavigationMenuLink>)}
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
}
