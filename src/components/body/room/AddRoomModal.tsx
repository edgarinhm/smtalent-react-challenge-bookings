import { FormEvent, useState } from 'react';
import Modal from '../../../common/components/Modal';
import Spinner from '../../../common/components/Spinner';
import { Checkbox, Field, Input, Label, Select } from '@headlessui/react';
import { RoomModel } from '../../../common/models/room-model';
import { CreateRoom } from '../../../common/services/room-service';
import { RoomType } from '../../../common/enums/room-type';
import {
  GetLocationTypeId,
  LocationType,
} from '../../../common/enums/location-type';
import ListSelect, {
  ListSelectOption,
  ListSelectOptions,
} from '../../../common/components/ListSelect';
import currency from 'currency.js';
import { GetRoomLevels } from '../../../common/functions/room-functions';

interface AddRoomModalProps {
  isOpen: boolean;
  hotelId?: string;
  onClose: () => void;
  updateGrid: () => void;
}

const initialState = {
  id: 0,
  hotelId: 0,
  level: 1,
  type: RoomType.Single,
  quantity: 1,
  active: true,
  baseCost: 40000,
  taxes: 19,
  location: LocationType.Cal,
};

const AddRoomModal = ({
  isOpen,
  hotelId,
  onClose,
  updateGrid,
}: AddRoomModalProps) => {
  const [room, setRoom] = useState<RoomModel>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const levels = GetRoomLevels();
  const handleClose = (): void => {
    onClose();
    setRoom(initialState);
  };

  const handleSubmit = (): void => {
    setIsLoading(true);
    const roomUpdated = {
      ...room,
      location: GetLocationTypeId(room.location),
      hotelId: Number(hotelId),
    };

    CreateRoom(roomUpdated)
      .then(() => {
        console.log('ALERT OK');
        handleClose();
        updateGrid();
      })
      .catch(() => console.log('ALERT ERROR'))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Header title={'Editar Habitación'} />
        <form
          onSubmit={(event: FormEvent) => event.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <div className="mb-4">
            <Field className="flex flex-col gap-2">
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                {'Piso'}
              </Label>
              <Select
                value={room.level}
                name="level"
                aria-label="Level floor"
                onChange={(event) =>
                  setRoom((state) => ({
                    ...state,
                    level: levels[event.target.selectedIndex],
                  }))
                }
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <ListSelect
            label={'Tipo de habitacion'}
            selected={room.type === '' ? 'Selecciona un tipo' : room.type}
            onChange={(value) =>
              setRoom((state) => ({
                ...state,
                type: value,
              }))
            }
          >
            {!room.type && (
              <ListSelectOption
                placeholder={true}
                option={''}
                value={'Selecciona una habitación'}
              />
            )}
            <ListSelectOptions>
              {Object.values(RoomType).map((option) => (
                <ListSelectOption key={option} option={option} value={option} />
              ))}
            </ListSelectOptions>
          </ListSelect>
          <div className="mb-4">
            <Field className="flex flex-col gap-2">
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                {'Cantidad'}
              </Label>
              <Input
                type="number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={room.quantity}
                onChange={(event) =>
                  setRoom((state) => ({
                    ...state,
                    quantity: event.target.value
                      ? parseInt(event.target.value)
                      : 0,
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
                checked={room.active === true}
                onChange={(checked) =>
                  setRoom((state) => ({
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
          <div className="mb-4">
            <Field className="flex flex-col gap-2">
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                {'Precio base'}
              </Label>
              <Input
                type="number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={room.baseCost}
                onChange={(event) =>
                  setRoom((state) => ({
                    ...state,
                    baseCost: currency(event.target.value).value,
                  }))
                }
              />
            </Field>
          </div>
          <div className="mb-4">
            <Field className="flex flex-col gap-2">
              <Label className="block text-sm font-medium leading-6 text-gray-900">
                {'Impuestos'}
              </Label>
              <Input
                type="number"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={room.taxes}
                onChange={(event) =>
                  setRoom((state) => ({
                    ...state,
                    taxes: currency(event.target.value).value,
                  }))
                }
              />
            </Field>
          </div>
          <ListSelect
            label={'Ubicación'}
            selected={room.location}
            onChange={(value) =>
              setRoom((state) => ({
                ...state,
                location: value,
              }))
            }
          >
            <ListSelectOptions>
              {Object.values(LocationType).map((option) => (
                <ListSelectOption key={option} option={option} value={option} />
              ))}
            </ListSelectOptions>
          </ListSelect>
        </form>
        <Modal.Footer
          submitText={'Guardar Cambios'}
          onSubmit={handleSubmit}
          cancelText={'Cancelar'}
          onCancel={handleClose}
        />
      </Modal>
      <Spinner show={isLoading} text={'Proccesing create room'} />
    </>
  );
};

export default AddRoomModal;
