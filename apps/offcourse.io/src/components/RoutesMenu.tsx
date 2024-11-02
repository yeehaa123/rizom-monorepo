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
  value: string
}

export function RoutesMenu({ links, className, value }: Props) {
  return <NavigationMenu value={value} className={className}>
    <NavigationMenuList>
      <NavigationMenuItem>
        {links.sort((a, b) => a.title.localeCompare(b.title)).map(({ title, href }) =>
          <NavigationMenuLink key={href}
            active={title === value}
            className={cn(navigationMenuTriggerStyle())}
            href={href}>{title}</NavigationMenuLink>)}
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
}
