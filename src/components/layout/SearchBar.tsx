import { Button, Input } from '@headlessui/react';
import { FormEvent, useState } from 'react';
import { DatePickerSelectRangeInput } from '../../common/components/DatePickerRange';
import dayjs from 'dayjs';
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
  const [startDate, setStartDate] = useState<Date>(dayjs().toDate());
  const [endDate, setEndDate] = useState<Date | null>(
    dayjs().add(8, 'day').toDate()
  );

  const [selectedOccupancy, setSelectedOccupancy] = useState('');

  const [searchHotel, setSearchHotel] = useState<SearchHotelModel>(initalState);

  const handleSubmit = (): void => {
    console.log('searchHotel', searchHotel);
  };

  return (
    <div className="-mt-8">
      <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <div className="mt-6 mb-4 p-1 flex items-center relative bg-yellow-500 rounded-lg max-w-full">
          <div className="flex flex-row items-center flex-1 bg-white p-4 rounded">
            <IoBedOutline className="mr-2 text-gray-600 size-6" />
            <Input
              className="text-md w-full focus:outline-none"
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

          <div className="flex w-[27%] ml-1 bg-white rounded-md">
            <div className="p-3 w-full">
              <DatePickerSelectRangeInput
                minDate={dayjs()}
                selectedDate={dayjs(startDate)}
                startDate={startDate}
                endDate={endDate ?? undefined}
                onSelectRangeDate={(value) => {
                  const [start, end] = value;
                  setStartDate(start);
                  setEndDate(end);
                }}
              />
            </div>
          </div>
          <div className="flex w-[27%] ml-1 bg-white rounded-md">
            <div className="p-3 w-full">
              <OccupancyFilter
                selected={selectedOccupancy}
                onChange={(value) => setSelectedOccupancy(value)}
              />
            </div>
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
