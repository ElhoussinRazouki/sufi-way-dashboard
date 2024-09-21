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
      <div className="flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-full bg-red-100 p-1 text-red-500">
        <CircleAlert size={52} />
      </div>
      <span className="mt-2 text-center text-lg font-medium">
        {title ? title : 'Are you sure you want to delete?'}
      </span>
      <p className="text-center text-sm">
        {description
          ? description
          : 'if you confirm the delete action you will not have a chance to undo it.'}
      </p>
      <div className="mt-2 flex w-full gap-6">
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleCancelAction}
        >
          Cancel
        </Button>
        <Button
          variant={'destructive'}
          type="button"
          className="w-full"
          onClick={handleConfirmAction}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
