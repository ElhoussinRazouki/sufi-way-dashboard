import { useFormikContext } from 'formik';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';

type ButtonProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

export default function SubmitButton({
  title,
  children,
  className,
  ...rest
}: ButtonProps) {
  // access the formik context
  const formik = useFormikContext();
  // TODO: change the loading spinner based on the dark/light mode
  return (
    <Button type="submit" className={className} {...rest}>
      {formik.isSubmitting ? (
        <Loader color="#FFF" className="animate-spin" size={12} />
      ) : (
        title || children
      )}
    </Button>
  );
}
