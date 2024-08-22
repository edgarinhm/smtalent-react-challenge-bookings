import {
  GetHotelById,
  UpdateHotel,
} from '../../../common/services/hotel-service';
import { HotelModel } from '../../../common/models/hotel-model';
import { FormEvent, useEffect, useState } from 'react';
import Modal from '../../../common/components/Modal';
import Spinner from '../../../common/components/Spinner';
import { Checkbox, Field, Input, Label } from '@headlessui/react';

interface UpdateHotelModalProps {
  isOpen: boolean;
  id?: number;
  onClose: () => void;
  updateGrid: () => void;
}

const UpdateHotelModal = ({
  isOpen,
  id,
  onClose,
  updateGrid,
}: UpdateHotelModalProps) => {
  const initialState: HotelModel = { id: 0, name: '', active: false };
  const [hotel, setHotel] = useState<HotelModel>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [spinnerText, setSpinnerText] = useState('');

  const handleSubmit = () => {
    setSpinnerText('Processing edit hotel data');
    setIsLoading(true);
    UpdateHotel(hotel)
      .then(() => {
        onClose();
        updateGrid();
      })
      .catch(() => console.log('UpdateHotel-Error'))
      .finally(() => setIsLoading(false));
  };

  const handleClose = () => {
    onClose();
    setHotel(initialState);
  };

  useEffect(() => {
    const loadHotelData = (id: number) => {
      setSpinnerText('...Loading Hotel ');
      setIsLoading(true);
      GetHotelById(id)
        .then((hotel) => setHotel(hotel))
        .catch(() => console.log('GetHotelById-Error'))
        .finally(() => setIsLoading(false));
    };

    if (isOpen && id) {
      loadHotelData(id);
    }
  }, [id, isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Header title={'Editar Hotel'} />
        <form
          noValidate
          autoComplete="off"
          onSubmit={(event: FormEvent) => event.preventDefault()}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {'Nombre'}
            </label>
            <Input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={hotel.name}
              onChange={(event) =>
                setHotel((state) => ({
                  ...state,
                  name: event.target.value,
                }))
              }
            />
          </div>
          <div className="mb-4">
            <p className="block text-sm font-medium leading-6 text-gray-900">
              {'Estado'}
            </p>
            <Field className="flex items-center gap-2">
              <Checkbox
                checked={hotel.active === true}
                onChange={(checked) =>
                  setHotel((state) => ({
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
        <Modal.Footer
          submitText={'Guardar Cambios'}
          onSubmit={handleSubmit}
          cancelText={'Cancelar'}
          onCancel={handleClose}
        />
      </Modal>
      <Spinner show={isLoading} text={spinnerText} />
    </>
  );
};

export default UpdateHotelModal;
