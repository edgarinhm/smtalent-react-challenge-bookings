import { Button, Input } from '@headlessui/react';
import { FormEvent, useState } from 'react';
import DatePickerRange from '../../../common/components/DatePickerRange';
import dayjs, { Dayjs } from 'dayjs';
import OccupancyFilter from './OccupancyFilter';

const ReservationSearchFilters = () => {
  const [dateRange, setDateRange] = useState<Dayjs[]>();
  const [startDate, endDate] = dateRange ?? [null, null];
  const [selectedOccupancy, setSelectedOccupancy] = useState('');

  return (
    <div className="absolute left-1/2 -translate-y-14 z-40">
      <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <div className="mt-6 mb-4 p-1 inline-flex items-center bg-yellow-500 rounded-lg max-w-full">
          <div>
            <Input className="m-2 p-2 rounded" />
          </div>
          <div>
            <DatePickerRange
              showIcon
              toggleCalendarOnIconClick
              selectsRange={true}
              startDate={startDate?.toDate()}
              endDate={endDate?.toDate()}
              onChange={(update) => {
                setDateRange([
                  dayjs(update[0] ?? undefined),
                  dayjs(update[1] ?? undefined),
                ]);
              }}
            />
          </div>
          <div>
            <OccupancyFilter
              selected={selectedOccupancy}
              onChange={(value) => setSelectedOccupancy(value)}
            />
          </div>
          <div className="flex flex-auto ml-1 rounded bg-yellow-500">
            <Button className="rounded bg-blue-600 py-1 px-6 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-700 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white">
              {'Buscar'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReservationSearchFilters;
