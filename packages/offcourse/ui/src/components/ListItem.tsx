import { ReactNode } from "react";

export default function ListItem({ children }: { children: ReactNode | ReactNode[] }) {
  return <li className="group flex align-middle bg-gray-100 dark:bg-gray-900 
                dark:text-white hover:bg-secondary dark:hover:bg-secondary
                hover:text-white dark:hover:text-black p-3 flex items-center">
    {children}
  </li>
}
