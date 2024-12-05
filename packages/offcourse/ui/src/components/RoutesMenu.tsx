import { cn } from "../lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"

type Props = {
  links: { title: string, href: string }[],
  className?: string,
  currentRoute: string | undefined
}

export function RoutesMenu({ links, className, currentRoute }: Props) {
  return <NavigationMenu className={cn("px-0", className)}>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>{currentRoute}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul>
            {links.sort((a, b) => a.title.localeCompare(b.title)).map(({ title, href }) =>
              <li key={href}>
                <NavigationMenuLink
                  active={title === currentRoute}
                  className={cn(navigationMenuTriggerStyle())}
                  href={href}>
                  {title}
                </NavigationMenuLink>
              </li>)}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu >
}
