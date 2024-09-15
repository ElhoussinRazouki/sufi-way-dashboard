import { ModalProps } from '@/hooks/ui-hooks/modal.hook';
import { CircleAlert } from 'lucide-react';
import { Button } from '../ui/button';

type DeleteValidationProps = ModalProps & {
  decisionHandler: (decision: boolean) => void;
  title?: string;
  description?: string;
};

export default function DeleteValidationModal({
  close,
  decisionHandler,
  title,
  description
}: DeleteValidationProps) {
  const handleConfirmAction = () => {
    close();
    decisionHandler(true);
  };

  const handleCancelAction = () => {
    close();
    decisionHandler(false);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className="mt-2 text-center text-lg font-medium">
        {title ? title : 'Are you sure?'}
      </span>
      <p className="text-center text-sm">This action cannot be undone.</p>
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button variant="outline" onClick={handleCancelAction}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleConfirmAction}>
          Continue
        </Button>
      </div>
    </div>
  );
}
