import {
  Button,
  Field,
  Input,
  Label,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { MinusIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline';

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
    <Popover className="group relative self-center box-border w-full">
      <PopoverButton className="box-border rounded bg-white flex flex-auto ml-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap p-2">
        <UserIcon className="pr-2 text-xs text-gray-600 inline-block size-6 align-top" />
        {' 2 adultos · 0 niños · 1 habitación'}
        <ChevronDownIcon className="size-5 group-data-[open]:rotate-180" />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="z-50 border shadow-xl shadow-gray-500/40 w-80 divide-y divide-white/5 rounded-md bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
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
