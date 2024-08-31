import { cn } from "@/lib/utils"
import { ErrorMessage, useField } from "formik"
import { Label } from "../../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import FormError from "../FormError"
import Help from "../Help"

export type SelectOptions<T> = {
  readonly label: string
  readonly value: T
}

export type SelectFieldProps<T extends string | number | null> = {
  name: string
  options: SelectOptions<T>[]
  label?: string
  required?: boolean
  className?: string
  optionLabel?: string
  placeholder?: string
  nullable?: boolean
  help?: string | React.ReactNode
} & Omit<React.ComponentProps<typeof Select>, "onValueChange" | "defaultValue">

export default function SelectField<T extends string | number | null>({
  name,
  label,
  required = false,
  className,
  options,
  optionLabel,
  placeholder = "Select an option...",
  help,
  ...props
}: SelectFieldProps<T>) {
  const [field, meta, helpers] = useField<T>(name)
  return (
    <div className={cn(`flex flex-col text-primary mb-2 gap-1 ${className}`)}>
      {label && (
        <Label htmlFor={name} className="mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Select
        onValueChange={(value) => {
          if (typeof field.value === "number") {
            return helpers.setValue(parseInt(value) as T) // T always a number
          }

          helpers.setValue(value as T) // T always a string
        }}
        defaultValue={`${field.value}`}
        {...props}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionLabel && <SelectLabel>{optionLabel}</SelectLabel>}
            {options.map((item) => (
              <SelectItem key={item.value} value={`${item.value === "" ? "-" : item.value}`}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {help && <Help>{help}</Help>}
      <ErrorMessage name={name} component={FormError} />
    </div>
  )
}
