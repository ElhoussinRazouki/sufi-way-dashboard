import { cn } from "@/lib/utils"
import { ReactNode, useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export type ModalBoxProps = {
  title?: string
  description?: string
  children?: ReactNode
  // control the trigger buttons
  trigger?: ReactNode
  closeButtonText?: string
  // classnames
  headerClassName?: string
  triggerClassName?: string
  contentClassName?: string
  footerClassName?: string
  // footer flag
  disabledFooter?: boolean
  // Modal props
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export default function ModalBox({
  title,
  description,
  children,
  // control the trigger buttons
  trigger,
  closeButtonText = "Close",
  // classnames
  headerClassName,
  triggerClassName,
  contentClassName,
  footerClassName,
  // footer flag
  disabledFooter = false,
  // Modal props
  isOpen = false,
  onOpenChange,
}: ModalBoxProps) {
  const [_isOpen, setIsOpen] = useState(!!isOpen)

  return (
    <Dialog
      open={_isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen)
        onOpenChange?.(isOpen)
      }}
    >
      {trigger && (
        <DialogTrigger asChild className={triggerClassName}>
          {trigger}
        </DialogTrigger>
      )}

      <DialogContent className={cn("sm:max-w-md", contentClassName)}>
        <DialogHeader className={headerClassName}>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        {!disabledFooter && (
          <DialogFooter className={cn("sm:justify-end", footerClassName)}>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {closeButtonText}
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
