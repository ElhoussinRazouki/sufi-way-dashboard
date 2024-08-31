import { Prettify } from "@/types"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

type SheetSideType = "bottom" | "top" | "right" | "left"

type SheetBoxProps = Prettify<
  React.ComponentProps<typeof Sheet> & {
    trigger: ReactNode
    children?: ReactNode
    title?: string
    subTitle?: string
    side?: SheetSideType
    className?: string

    closeButtonText?: string
    // Footer content
    footer?: ReactNode
    disableFooter?: boolean
  }
>

export default function SheetBox({
  trigger,
  children,
  title,
  subTitle,
  side = "right",
  className,

  closeButtonText = "Close",
  // Footer content
  disableFooter = true,
  footer,
  ...sheetProps
}: SheetBoxProps) {
  return (
    <Sheet {...sheetProps}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} className={className}>
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {subTitle && <SheetDescription className="pb-2">{subTitle}</SheetDescription>}
        </SheetHeader>

        {children}

        {!disableFooter && (
          <SheetFooter>
            {footer ? (
              footer
            ) : (
              <SheetClose asChild>
                <Button type="button">{closeButtonText}</Button>
              </SheetClose>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
