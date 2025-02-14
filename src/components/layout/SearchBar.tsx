import { Button } from '@headlessui/react';
import { FormEvent, useState } from 'react';
import { DatePickerSelectRangeInput } from '../../common/components/DatePickerRange';
import dayjs from 'dayjs';
import OccupancyFilter from './OccupancyFilter';
import {
  SearchHotelModel,
  SearchHotelResponseModel,
} from '../../common/models/search-hotel-model';
import { IoBedOutline } from 'react-icons/io5';
import ErrorTooltip from '../../common/components/ErrorTooltip';
import { GetSearchHotels } from '../../common/services/search-service';
import { GetLocationTypeId } from '../../common/enums/location-type';
import Autocomplete from '../../common/components/LocationAutocomplete';
import { ISODateFormat } from '../../common/constants/format-strings';

const initalState: SearchHotelModel = {
  destination: '',
  checkIn: '',
  checkOut: '',
  adultCount: 1,
  childCount: 0,
  roomCount: 1,
};

interface SearchBarProps {
  onSubmit: (hotels: SearchHotelResponseModel) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [startDate, setStartDate] = useState<Date>(dayjs().toDate());
  const [endDate, setEndDate] = useState<Date | null>(
    dayjs().add(8, 'day').toDate()
  );

  const [searchHotel, setSearchHotel] = useState<SearchHotelModel>(initalState);

  const [submitted, setSubmitted] = useState(false);

  const errors = {
    destination: { message: 'Introduce un destino para empezar a buscar.' },
  };

  const handleOccupancy = (name: string, value: number) => {
    setSearchHotel((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    setSubmitted(true);
    if (searchHotel.destination) {
      GetLocationTypeId(searchHotel.destination);

      const hotels = await GetSearchHotels({
        ...searchHotel,
        checkIn: dayjs(startDate).format(ISODateFormat),
        checkOut: dayjs(endDate).format(ISODateFormat),
      });

      onSubmit(hotels);
    }
  };

  return (
    <div className="-mt-1">
      <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <div className="mt-6 mb-4 p-1 flex items-center relative bg-yellow-500 rounded-lg max-w-full max-sm:flex-col">
          <div className="flex flex-row items-center flex-1 bg-white p-4 rounded max-sm:w-full">
            <ErrorTooltip
              error={
                !searchHotel.destination ? errors?.destination?.message : ''
              }
              show={submitted}
              placement="bottom"
              alignment="start"
            >
              <IoBedOutline className="mr-2 text-gray-600 size-6" />
              <Autocomplete
                placeholder={'¿Adónde vas?'}
                onChange={(value) =>
                  setSearchHotel((state) => ({
                    ...state,
                    destination: value,
                  }))
                }
              />
            </ErrorTooltip>
          </div>
          <div className="flex w-[27%] ml-1 bg-white rounded-md max-sm:w-full">
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
          <div className="flex w-[27%] ml-1 bg-white rounded-md max-sm:w-full">
            <div className="p-3 w-full">
              <OccupancyFilter
                selected={{
                  adultCount: searchHotel.adultCount,
                  childCount: searchHotel.childCount,
                  roomCount: searchHotel.roomCount,
                }}
                onChange={handleOccupancy}
              />
            </div>
          </div>
          <div className="flex ml-1 max-sm:w-full">
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
