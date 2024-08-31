import { cn } from "@/lib/utils"
import { ErrorMessage, useField } from "formik"
import { TextareaHTMLAttributes } from "react"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import FormError from "../FormError"
import Help from "../Help"

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label?: string
  help?: string | React.ReactNode
  className?: string
  TextAreaClassName?: string
  required?: boolean
}

export default function TextArea({
  name,
  label,
  help,
  TextAreaClassName,
  className,
  required = false,
  ...props
}: TextareaFieldProps) {
  // Use Formik's useField hook to access field properties and helpers
  const [field] = useField<string>(name)

  return (
    <div key={name} className={cn(`flex flex-col text-primary mb-2 gap-1 ${className}`)}>
      {label && (
        <Label htmlFor={name} className="mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Textarea {...props} {...field} className={TextAreaClassName} />
      {help && <Help>{help}</Help>}
      <ErrorMessage name={name} component={FormError} />
    </div>
  )
}
