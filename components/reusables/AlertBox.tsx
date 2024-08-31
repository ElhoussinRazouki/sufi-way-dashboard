import { cn } from "@/lib/utils"
import { CheckCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import { AlertDescription, AlertTitle } from "../ui/alert"

import { IconProps } from "@radix-ui/react-icons/dist/types"

type AlertType = {
  title: string
  icon: React.ComponentType<IconProps>
  containerClassName: string
}

type AlertTypes = {
  info: AlertType
  warning: AlertType
  error: AlertType
  success: AlertType
}

const alertTypes: AlertTypes = {
  info: {
    title: "Info",
    icon: InfoCircledIcon,
    containerClassName: "text-blue-700 border-none bg-blue-100",
  },
  warning: {
    title: "Warning",
    icon: ExclamationTriangleIcon,
    containerClassName: "text-yellow-700 border-none bg-yellow-100",
  },
  error: {
    title: "Error",
    icon: ExclamationTriangleIcon,
    containerClassName: "text-red-700 border-none bg-red-100",
  },
  success: {
    title: "Success",
    icon: CheckCircledIcon,
    containerClassName: "text-green-700 border-none bg-green-100",
  },
}

type AlertBoxProps = {
  type?: "info" | "warning" | "error" | "success"
  title?: string
  description?: string
  className?: string
}

export default function AlertBox({ type = "info", title, description, className }: AlertBoxProps) {
  const alert = alertTypes[type]

  return (
    <div
      className={cn(
        `border p-4 rounded-md flex items-center ${alert.containerClassName} ${className}`,
      )}
    >
      <div className="mr-3">
        <alert.icon className="h-5 w-5" />
      </div>
      <div>
        {title && (
          <AlertTitle className={`font-bold ${!description && "p-0 m-0"}`}>{title}</AlertTitle>
        )}
        {description && <AlertDescription>{description}</AlertDescription>}
      </div>
    </div>
  )
}
