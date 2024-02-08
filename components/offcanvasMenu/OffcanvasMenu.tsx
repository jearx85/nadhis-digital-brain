import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronsLeft } from 'lucide-react';

export default function Example() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <ChevronsLeft
        className="h-6 w-6 z-50"
        onClick={handleToggle}
      />

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={handleToggle}
        >
          <div className="fixed inset-0 overflow-hidden flex justify-end z-50">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-64 bg-white h-full shadow-xl">
                {/* Contenido del offcanvas */}
                <div className="p-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Offcanvas</h2>
                  <p>Contenido del offcanvas...</p>
                  <button
                    type="button"
                    className="text-gray-700 hover:text-gray-900"
                    onClick={handleToggle}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="opacity-75 transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="opacity-75 transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
