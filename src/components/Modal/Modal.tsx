import { Fragment, type ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type ModalProps = {
  title: string;
  children?: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

const Modal = ({ title, children, isOpen, closeModal }: ModalProps) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto "
      onClose={closeModal}
    >
      <div className="min-h-screen px-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        </Transition.Child>

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
            >
              {title}
            </Dialog.Title>
            <div className="mt-2">{children}</div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);

export default Modal;
