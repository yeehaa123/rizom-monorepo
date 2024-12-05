import { cn } from "../lib/utils";
import { ReactNode } from "react";

export default function ListItem({ children, className }: { className?: string, children: ReactNode | ReactNode[] }) {
  return <li className={
    cn("bg-gray-100 dark:bg-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 list-none", className)}>
    {children}
  </li>
}
