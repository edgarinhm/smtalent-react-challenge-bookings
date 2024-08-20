import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
} from '@headlessui/react';
import { CreateHotel } from '../../../common/services/hotel-service';
import { HotelModel } from '../../../common/models/hotel-model';
import { useState } from 'react';

interface HotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateGrid: () => void;
}

const HotelModal = ({ isOpen, onClose, updateGrid }: HotelModalProps) => {
  const submit = (hotel: Partial<HotelModel>) => {
    CreateHotel(hotel)
      .then(() => {
        updateGrid();
      })
      .catch(() => console.log('CreateHotel-Error'));
  };

  return (
    <Modal
      title={'Adicionar Hotel'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submit}
    />
  );
};

const Modal = ({
  isOpen,
  title,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  title?: string;
  onSubmit: (hotel: Partial<HotelModel>) => void;
  onClose: () => void;
}): JSX.Element => {
  const initialState: Partial<HotelModel> = {};
  const [newHotel, setNewHotel] = useState<Partial<HotelModel>>(initialState);
  const handleSubmit = (): void => {
    onSubmit(newHotel);
    onClose();
  };
  const handleCancel = (): void => {
    setNewHotel(initialState);
    onClose();
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleCancel}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-center justify-center p-4 ">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            {title && (
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                {title}
              </DialogTitle>
            )}
            <form noValidate autoComplete="off">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {'Nombre'}
                </label>
                <Input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) =>
                    setNewHotel((state) => ({
                      ...state,
                      name: event.target.value,
                    }))
                  }
                />
              </div>
            </form>
            <div className="mt-4 flex justify-end">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-700"
                onClick={handleSubmit}
              >
                {'Crear'}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default HotelModal;
