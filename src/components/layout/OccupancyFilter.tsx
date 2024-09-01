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

interface OccupancyFilterProps {
  label?: string;
  selected: string;
  onChange: (value: string) => void;
}
const OccupancyFilter = ({
  label,
  selected,
  onChange,
}: OccupancyFilterProps) => {
  return (
    <Popover className="group relative self-center box-border w-full p-2 rounded-md">
      <PopoverButton className="mt-0.5 mb-0.5 pt-1 pb-1 pl-2 pr-6 text-sm border-solid border border-transparent rounded-md bg-white flex flex-auto items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap">
        <BiUser className="pr-2 text-xs text-gray-600 inline-block align-top size-6" />
        {' 2 adultos · 0 niños · 1 habitación'}
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
          className="z-50 mt-1 border shadow-xl shadow-gray-500/40 w-80 divide-y divide-white/5 rounded-md bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
          <div className="p-8" data-testid="occupancy-popup">
            <OccupancyFilterOption
              id={'group_adults'}
              option="Adultos"
              value="2"
            />
            <OccupancyFilterOption
              id={'group_children'}
              option="Niños"
              value="1"
            />
            <OccupancyFilterOption
              id={'group_rooms'}
              option="Habitaciones"
              value="2"
            />
            <Button
              type="button"
              className="w-full text-blue-500  font-bold rounded-sm outline outline-offset-2 outline-1 pt-1 pb-1 pl-3 pr-3 mt-4"
            >
              Listo
            </Button>
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
}: {
  id: string;
  option: string;
  value: string;
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
          />
        </div>
      </Field>
      <div className="flex items-center border border-gray-400 rounded">
        <Button
          tabIndex={-1}
          type="button"
          aria-hidden="true"
          className="size-10 me-0 p-1 text-blue-500 align-middle rounded bg-transparent transition-transform inline-flex decoration-none text-start border-none items-center justify-center"
        >
          <span className="relative inline-flex overflow-hidden flex-shrink-0 mt-0 mb-0 ml-3 mr-3">
            <MinusIcon
              className="inline-block h-4 align-top  w-auto"
              aria-hidden="true"
            />
          </span>
        </Button>
        <span
          className="text-sm leading-normal font-medium block text-center mt-0 mb-0 mr-1 ml-1 min-w-9"
          aria-hidden="true"
        >
          {value}
        </span>
        <Button
          tabIndex={-1}
          type="button"
          aria-hidden="true"
          className="size-10 me-0 p-1 text-blue-500 align-middle rounded bg-transparent transition-transform inline-flex decoration-none text-start border-none items-center justify-center"
        >
          <span className="relative inline-flex overflow-hidden flex-shrink-0 mt-0 mb-0 ml-3 mr-3">
            <PlusIcon
              className="inline-block h-4 align-top  w-auto"
              aria-hidden="true"
            />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default OccupancyFilter;
