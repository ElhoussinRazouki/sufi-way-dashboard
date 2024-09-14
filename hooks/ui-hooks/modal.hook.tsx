import App from '@/components';
import ModalBox, { ModalBoxProps } from '@/components/reusables/ModalBox';
import { ReactElement, ReactNode, useCallback, useState } from 'react';

type componentProps =
  | ReactNode
  | (({
      isOpen,
      open,
      close,
      toggle
    }: {
      isOpen: boolean;
      open: () => void;
      close: () => void;
      toggle: () => void;
    }) => ReactNode);

export function useBasicModal(
  component?: componentProps,
  options?: ModalBoxProps
) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const Modal: React.FC<ModalBoxProps> = useCallback(
    ({ children, ...props }) => {
      return (
        <ModalBox
          isOpen={isOpen}
          onOpenChange={(isOpen) => setIsOpen(isOpen)}
          {...props}
          {...options}
        >
          <App.Suspense>
            {children ||
              (typeof component === 'function'
                ? component({ isOpen, open, close, toggle })
                : component)}
          </App.Suspense>
        </ModalBox>
      );
    },
    [isOpen, component, options]
  );

  return {
    Modal,
    open,
    close,
    toggle
  };
}

export type ModalProps = {
  open?: () => void;
  isOpen?: boolean;
  close: () => void;
  toggle?: () => void;
};

export function useModal() {
  const [baseModel, setBaseModel] =
    useState<(props: ModalProps) => ReactElement>();
  const [onClose, setOnClose] = useState<() => void>();

  const { Modal, open, close, ...rest } = useBasicModal(
    (props) => {
      return !!baseModel ? baseModel({ ...props, close: closeModal }) : <></>;
    },
    { disabledFooter: true }
  );

  // for each opening of the modal, set the decision handler and the pop up react component
  const OpenModal = useCallback(
    ({
      modal,
      onClose
    }: {
      modal: (props: ModalProps) => ReactElement;
      onClose?: () => void;
    }) => {
      if (modal) setBaseModel(() => modal);
      if (!!onClose) setOnClose(() => onClose);

      if (!!modal) open();
    },
    [setBaseModel, setOnClose, open]
  );

  const closeModal = useCallback(() => {
    if (onClose) onClose();
    close();
  }, [onClose, close]);

  return { Modal, ...rest, open: OpenModal, close: closeModal };
}
