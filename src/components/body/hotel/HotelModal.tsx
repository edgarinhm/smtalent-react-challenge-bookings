import {
  Button,
  Checkbox,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
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
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            {title && (
              <DialogTitle
                as="h3"
                className="text-base/7 font-bold text-black mb-4"
              >
                {title}
              </DialogTitle>
            )}
            <form noValidate autoComplete="off">
              <div className="mb-4">
                <Field className="flex flex-col gap-2">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    {'Nombre'}
                  </Label>
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
                </Field>
              </div>
              <div className="flex flex-col mb-4 gap-2">
                <p className="block text-sm font-medium leading-6 text-gray-900">
                  {'Estado'}
                </p>
                <Field className="flex items-center gap-2">
                  <Checkbox
                    checked={newHotel.active === true}
                    onChange={(checked) =>
                      setNewHotel((state) => ({
                        ...state,
                        active: checked,
                      }))
                    }
                    className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                  >
                    <svg
                      className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Checkbox>
                  <Label>{'Activo'}</Label>
                </Field>
              </div>
            </form>
            <div className="mt-4 gap-4 flex justify-end">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={handleCancel}
              >
                {'Cancel'}
              </Button>
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
