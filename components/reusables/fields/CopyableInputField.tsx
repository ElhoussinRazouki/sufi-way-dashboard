"use client"

import { Button } from "@/components/ui/button"
import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ErrorMessage, useField } from "formik"
import { Check, Clipboard } from "lucide-react"
import { forwardRef, useRef, useState } from "react"
import FormError from "../FormError"
import Help from "../Help"

type CopyableFieldProps = InputProps & {
  name: string
  label?: string
  className?: string
  InputClassName?: string
  required?: boolean
  help?: string | React.ReactNode
}

const CopyableField = forwardRef<HTMLInputElement, CopyableFieldProps>(
  ({ name, label, InputClassName = "", className = "", required = false, help, ...props }, ref) => {
    const [field] = useField<string>(name)

    const inputRef = useRef<HTMLInputElement>(null)
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyInputValue = () => {
      if (inputRef.current) {
        navigator.clipboard.writeText(inputRef.current.value)

        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      }
    }

    return (
      <div key={name} className={cn(`flex flex-col text-primary mb-2 gap-1 ${className}`)}>
        {label && (
          <Label htmlFor={name} className="mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        <div className="relative">
          <Input className={cn("pr-10 z-0", className)} ref={inputRef} {...field} {...props} />
          {!isCopied ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 z-10 py-2 hover:cursor-pointer hover:bg-transparent"
              onClick={() => handleCopyInputValue()}
              disabled={props.disabled}
            >
              <Clipboard className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 z-10 py-2 hover:cursor-pointer hover:bg-transparent"
              onClick={() => setIsCopied(false)}
              disabled={props.disabled}
            >
              <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
              <span className="text-green-500 font-semibold transition-all">copied</span>
            </Button>
          )}
        </div>
        {help && <Help>{help}</Help>}
        <ErrorMessage name={name} component={FormError} />
      </div>
    )
  },
)

CopyableField.displayName = "CopyableField"

export default CopyableField
