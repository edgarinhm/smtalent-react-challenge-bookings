import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: ModalProps): JSX.Element => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-center justify-center p-4 ">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

const Header = ({ title }: { title?: string }): JSX.Element => {
  return (
    <>
      {title && (
        <DialogTitle as="h3" className="text-base/7 font-medium text-black">
          {title}
        </DialogTitle>
      )}
    </>
  );
};

const Footer = ({
  submitText = 'Save',
  onSubmit,
}: {
  submitText?: string;
  onSubmit?: () => void;
}): JSX.Element => {
  return (
    <div className="mt-4 flex justify-end">
      {submitText && (
        <Button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-700"
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      )}
    </div>
  );
};

Modal.Header = Header;
Modal.Footer = Footer;

export default Modal;
