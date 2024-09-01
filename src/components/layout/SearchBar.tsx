import { Button, Input } from '@headlessui/react';
import { FormEvent, useState } from 'react';
import DatePickerRange from '../../common/components/DatePickerRange';
import dayjs, { Dayjs } from 'dayjs';
import OccupancyFilter from './OccupancyFilter';
import { SearchHotelModel } from '../../common/models/search-hotel-model';
import { IoBedOutline } from 'react-icons/io5';

const initalState: SearchHotelModel = {
  destination: '',
  checkIn: '',
  checkOut: '',
  adultCoount: 1,
  childCount: 0,
};

const SearchBar = () => {
  const [dateRange, setDateRange] = useState<Dayjs[]>();
  const [startDate, endDate] = dateRange ?? [null, null];
  const [selectedOccupancy, setSelectedOccupancy] = useState('');

  const [searchHotel, setSearchHotel] = useState<SearchHotelModel>(initalState);

  const handleSubmit = (): void => {
    console.log('searchHotel', searchHotel);
  };

  return (
    <div>
      <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <div className="mt-6 mb-4 p-1 flex items-center relative bg-yellow-500 rounded-lg max-w-full">
          <div className="flex flex-auto bg-white rounded-md w-1/3">
            <div className="flex flex-row p-2 items-center flex-1 w-full">
              <IoBedOutline className="mr-2 text-gray-600 size-6" />
              <Input
                className="mt-0.5 mb-0.5 p-1 border-solid border border-transparent rounded w-full outline-transparent"
                placeholder={'¿Adónde vas?'}
                value={searchHotel.destination}
                onChange={(event) =>
                  setSearchHotel((state) => ({
                    ...state,
                    destination: event.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex w-[27%] ml-1 bg-white rounded-md">
            <div className="p-1.5  w-full">
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
          </div>
          <div className="flex w-[27%] ml-1 bg-white rounded-md">
            <OccupancyFilter
              selected={selectedOccupancy}
              onChange={(value) => setSelectedOccupancy(value)}
            />
          </div>
          <div className="flex ml-1">
            <Button
              type="submit"
              className="w-full h-full rounded bg-blue-600 p-3 text-sm/6 font-bold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-700 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white"
              onClick={handleSubmit}
            >
              {'Buscar'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
