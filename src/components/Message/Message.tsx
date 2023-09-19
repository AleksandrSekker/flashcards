import { type FunctionComponent } from 'react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

type Props = {
  show: boolean;
  message: string;
  removeError: () => void;
};

const ErrorMessage: FunctionComponent<Props> = ({
  show,
  message,
  removeError,
}) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
        role="alert"
      >
        <span className="block sm:inline">{message}</span>
        <span className="absolute bottom-0 right-0 top-0 px-4 py-3">
          <button
            type="button"
            className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={removeError}
          >
            <span className="sr-only">Close</span>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </span>
      </div>
    </Transition>
  );
};

export default ErrorMessage;
