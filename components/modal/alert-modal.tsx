'use client';

import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import LoadingSection from '../reusables/LoadingSection';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    onClose();
  }, [onClose, onConfirm]);

  return (
    <Modal title="" description="" isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col">
        <h2 className="text-xl font-semibold">هل أنت متأكد؟</h2>
        <p>لا يمكن التراجع عن هذا الإجراء.</p>
        <div className="flex w-full justify-end gap-2 pt-6">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            {isLoading ? <LoadingSection /> : 'متابعة'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
