import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { cn } from '../../lib/utils';
import type { SortOption } from '../../features/neo/types';

interface SortSelectorProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
  className?: string;
}

const sortOptions: { value: SortOption; label: string; description: string }[] = [
  { value: 'closeness', label: 'Closest Approach', description: 'Nearest to Earth' },
  { value: 'size', label: 'Size', description: 'Largest first' },
  { value: 'velocity', label: 'Velocity', description: 'Fastest moving' },
];

export function SortSelector({ value, onChange, className }: SortSelectorProps) {
  const selectedOption = sortOptions.find(option => option.value === value);

  return (
    <div className={cn('w-full', className)}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg glassmorphism py-2 pl-3 pr-10 text-left text-white focus:outline-none focus:ring-2 focus:ring-nebula-purple focus:border-transparent">
            <span className="block truncate font-medium">
              {selectedOption?.label}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-white opacity-60"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md glassmorphism-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {sortOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    cn(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      active ? 'bg-nebula-purple-20 text-white' : 'text-gray-300'
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex flex-col">
                        <span className={cn('block truncate font-medium', selected ? 'text-white' : '')}>
                          {option.label}
                        </span>
                        <span className="text-sm text-gray-400">
                          {option.description}
                        </span>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-nebula-purple">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
