import { ReactNode } from "react"

type HelpProps = {
  children: ReactNode | string
}

export default function Help({ children }: HelpProps) {
  return <div className="text-xs text-gray-500 dark:text-gray-200">{children}</div>
}
