import { Checkbox as CB } from "./ui/checkbox"
import { cn } from "../lib/utils"
import { SyntheticEvent } from "react";

type Props = {
  id: string,
  disabled: boolean,
  checked: boolean,
  onClick: (e: SyntheticEvent) => void;
  className?: string
}

export default function Checkbox({ id, checked, disabled, onClick, className }: Props) {
  return <CB
    id={id}
    className={cn(
      "bg-gray-50 dark:bg-gray-950 h-7 w-7 border-none rounded-none data-[state=checked]:bg-secondary dark:data-[state=checked]:bg-secondary ",

      className, { "bg-gray-50": disabled, "bg-gray-800": checked })
    }
    checked={checked}
    onClick={onClick} />
}
