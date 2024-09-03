import { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Select,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RoomModel } from '../../../common/models/room-model';
import ListSelect, {
  ListSelectOption,
  ListSelectOptions,
} from '../../../common/components/ListSelect';
import { RoomType } from '../../../common/enums/room-type';
import currency from 'currency.js';
import { CreateRoom } from '../../../common/services/room-service';
import Spinner from '../../../common/components/Spinner';
import {
  GetLocationTypeId,
  LocationType,
} from '../../../common/enums/location-type';
import { GetRoomLevels } from '../../../common/functions/room-functions';

interface HotelDrawerProps {
  isOpen: boolean;
  id?: number;
  onClose: () => void;
}

const initialState = {
  hotelId: 0,
  level: 1,
  type: RoomType.Single,
  quantity: 1,
  active: true,
  baseCost: 40000,
  taxes: 19,
  location: LocationType.Cal,
};

const HotelDrawer = ({ isOpen, id, onClose }: HotelDrawerProps) => {
  const [room, setRoom] = useState<Omit<RoomModel, 'id'>>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const levels = GetRoomLevels();
  const handleClose = (): void => {
    onClose();
    setRoom(initialState);
  };

  const handleSubmit = (): void => {
    setIsLoading(true);
    const newRoom: Partial<RoomModel> = {
      ...room,
      location: GetLocationTypeId(room.location),
    };
    CreateRoom(newRoom)
      .then(() => handleClose())
      .catch(() => console.log('ERROR'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isOpen && id) {
      setRoom((state) => {
        state.hotelId = id;
        return state;
      });
    }
  }, [id, isOpen]);

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="flex items-start justify-between px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      {'Asigna una habitación'}
                    </DialogTitle>
                    <TransitionChild>
                      <div className="flex items-center h-7 ml-3 duration-500 ease-in-out data-[closed]:opacity-0 ">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="relative rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </TransitionChild>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
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
                        selected={
                          room.type === '' ? 'Selecciona un tipo' : room.type
                        }
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
                            <ListSelectOption
                              key={option}
                              option={option}
                              value={option}
                            />
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
                            <ListSelectOption
                              key={option}
                              option={option}
                              value={option}
                            />
                          ))}
                        </ListSelectOptions>
                      </ListSelect>
                    </form>
                    <div className="mt-4 gap-4 flex justify-end">
                      <Button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={handleClose}
                      >
                        {'Cancel'}
                      </Button>
                      <Button
                        className="inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-700"
                        onClick={handleSubmit}
                      >
                        {'Guardar'}
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
      <Spinner show={isLoading} text={'Proccessing room asignation'} />
    </>
  );
};

export default HotelDrawer;
