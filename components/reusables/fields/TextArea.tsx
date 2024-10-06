import { cn } from '@/lib/utils';
import { ErrorMessage, useField } from 'formik';
import { TextareaHTMLAttributes } from 'react';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import FormError from '../FormError';
import Help from '../Help';

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label?: string;
  help?: string | React.ReactNode;
  className?: string;
  containerClassName?: string;
  required?: boolean;
};

export default function TextArea({
  name,
  label,
  help,
  containerClassName,
  className,
  required = false,
  ...props
}: TextareaFieldProps) {
  // Use Formik's useField hook to access field properties and helpers
  const [field] = useField<string>(name);

  return (
    <div
      key={name}
      className={cn(
        `mb-2 flex flex-col gap-1 text-primary ${containerClassName}`
      )}
    >
      {label && (
        <Label htmlFor={name} className="mb-2">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      )}
      <Textarea {...props} {...field} className={cn('min-h-32', className)} />
      {help && <Help>{help}</Help>}
      <ErrorMessage name={name} component={FormError} />
    </div>
  );
}
