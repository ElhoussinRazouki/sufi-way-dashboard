import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ErrorMessage, useField } from 'formik';
import { CalendarIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { Calendar } from '../../ui/calendar';
import { Label } from '../../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import FormError from '../FormError';
import Help from '../Help';

type DatePickerFieldProps = {
  name: string;
  label?: string;
  help?: string | React.ReactNode;
  required?: boolean;
  className?: string;
  placeholder?: string;
  disableFn?: (date: Date) => boolean;
};

export default function DatePickerField({
  name,
  label,
  help,
  required = false,
  className,
  placeholder = 'Pick a date',
  disableFn,
  ...props
}: DatePickerFieldProps) {
  const [field, meta, helpers] = useField<Date | string>(name);

  return (
    <div
      key={name}
      className={cn(`mb-2 flex flex-col gap-1 text-primary ${className}`)}
    >
      {label && (
        <Label htmlFor={name} className="mb-2">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? (
              format(new Date(field.value), 'PPP')
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex w-auto flex-col space-y-2 p-0">
          <Calendar
            mode="single"
            selected={new Date(field.value)}
            onSelect={(date) => {
              helpers.setValue(date ? date.toISOString() : '');
            }}
            disabled={disableFn}
            required={required}
            {...field}
            {...props}
          />
        </PopoverContent>
      </Popover>
      {help && <Help>{help}</Help>}
      <ErrorMessage name={name} component={FormError} />
    </div>
  );
}
