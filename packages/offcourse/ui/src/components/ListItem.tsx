import { ReactNode } from "react";

export default function ListItem({ children }: { children: ReactNode | ReactNode[] }) {
  return <li className="group flex align-middle bg-gray-100 dark:bg-gray-900 
                dark:text-white hover:bg-gray-900 dark:hover:bg-gray-100 
                hover:text-white dark:hover:text-black p-3 flex items-center">
    {children}
  </li>
}
