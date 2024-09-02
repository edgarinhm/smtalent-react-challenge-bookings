import { Fragment } from 'react';
import {
  Button,
  Field,
  Input,
  Label,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { BiUser } from 'react-icons/bi';
import { OccupancyModel } from '../../common/models/occupancy-model';

interface OccupancyFilterProps {
  selected: OccupancyModel;
  onChange: (name: string, value: number) => void;
}
const OccupancyFilter = ({ selected, onChange }: OccupancyFilterProps) => {
  return (
    <Popover className="group relative self-center box-border w-full p-0.5 rounded-md">
      <PopoverButton className="p-0.5 text-sm border-solid border border-transparent rounded-md bg-white flex flex-auto items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap">
        <BiUser className="pr-2 text-xs text-gray-600 inline-block align-top size-6" />
        {` ${selected.adultCount} adultos · ${selected.childCount}  niños · ${selected.roomCount}  habitaciones`}
        <ChevronDownIcon className="size-5 group-data-[open]:rotate-180" />
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          transition
          anchor="bottom"
          className="z-50 mt-4 border shadow-xl shadow-gray-500/40 w-80 divide-y divide-white/5 rounded-md bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
          <div className="p-8" data-testid="occupancy-popup">
            <OccupancyFilterOption
              id={'adultCount'}
              option="Adultos"
              value={selected.adultCount.toString()}
              onChange={onChange}
              disabled={selected.adultCount === 1}
            />
            <OccupancyFilterOption
              id={'childCount'}
              option="Niños"
              value={selected.childCount.toString()}
              onChange={onChange}
              disabled={selected.childCount === 0}
            />
            <OccupancyFilterOption
              id={'roomCount'}
              option="Habitaciones"
              value={selected.roomCount.toString()}
              onChange={onChange}
              disabled={selected.roomCount === 1}
            />

            <PopoverButton
              type="button"
              className="w-full text-blue-500  font-bold rounded-sm outline outline-offset-2 outline-1 pt-1 pb-1 pl-3 pr-3 mt-4"
            >
              {'Listo'}
            </PopoverButton>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

const OccupancyFilterOption = ({
  id,
  option,
  value,
  disabled = false,
  onChange,
}: {
  id: string;
  option: string;
  value: string;
  disabled?: boolean;
  onChange: (name: string, value: number) => void;
}): JSX.Element => {
  return (
    <div className="mb-1 flex flex-wrap items-center justify-between">
      <Field>
        <div className="me-2">
          <Label className="font-medium text-xs leading-normal">{option}</Label>
          <Input
            type="range"
            className="absolute w-0 h-0 opacity-0 overflow-hidden pointer-events-none"
            id={id}
            min={1}
            max={30}
            step="1"
            aria-valuemin={1}
            aria-valuemax={30}
            aria-valuenow={Number(value)}
            onChange={(event) => onChange(id, Number(event.target.value))}
          />
        </div>
      </Field>
      <div className="flex items-center border border-gray-400 rounded">
        <Button
          tabIndex={-1}
          type="button"
          disabled={disabled}
          className="disabled:cursor-not-allowed disabled:focus:cursor-auto size-10 me-0 p-1 text-blue-500 align-middle rounded bg-transparent transition-transform inline-flex decoration-none text-start border-none items-center justify-center"
          onClick={() =>
            Number(value) > 0 ? onChange(id, Number(value) - 1) : undefined
          }
        >
          <span className="relative inline-flex overflow-hidden flex-shrink-0 mt-0 mb-0 ml-3 mr-3">
            <MinusIcon className="inline-block h-4 align-top  w-auto" />
          </span>
        </Button>
        <span className="text-sm leading-normal font-medium block text-center mt-0 mb-0 mr-1 ml-1 min-w-9">
          {value}
        </span>
        <Button
          tabIndex={-1}
          type="button"
          className="size-10 me-0 p-1 text-blue-500 align-middle rounded bg-transparent transition-transform inline-flex decoration-none text-start border-none items-center justify-center"
          onClick={() =>
            Number(value) < 30 ? onChange(id, Number(value) + 1) : undefined
          }
        >
          <span className="relative inline-flex overflow-hidden flex-shrink-0 mt-0 mb-0 ml-3 mr-3">
            <PlusIcon className="inline-block h-4 align-top  w-auto" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default OccupancyFilter;
