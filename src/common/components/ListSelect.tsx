import { ReactNode } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface ListSelectProps {
  label?: string;
  selected: string;
  onChange: (value: string) => void;
  children: ReactNode;
}
const ListSelect = ({
  label,
  selected,
  onChange,
  children,
}: ListSelectProps) => {
  return (
    <div className={`${label ? 'h-20' : 'h-14'}`}>
      {label && <p className="text-sm font-medium">{label}</p>}
      <Listbox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          {children}
        </div>
      </Listbox>
    </div>
  );
};

export const ListSelectOptions = ({ children }: { children: ReactNode }) => {
  return (
    <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
      {children}
    </ListboxOptions>
  );
};

export const ListSelectOption = ({
  option,
  value,
  placeholder,
}: {
  option: string;
  value: string;
  placeholder?: boolean;
}) => {
  return (
    <ListboxOption
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${
          active && !placeholder ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
        }`
      }
      key={option}
      value={value}
    >
      {({ selected }) => (
        <>
          <span
            className={`block truncate ${
              selected ? 'font-medium' : 'font-normal'
            }`}
          >
            {option}
          </span>
          {selected && !placeholder ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </ListboxOption>
  );
};

export default ListSelect;
