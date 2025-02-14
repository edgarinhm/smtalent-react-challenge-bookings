import { Link, useNavigate } from 'react-router-dom';
import { FaHotel } from 'react-icons/fa';
import { hotelRoute } from '../../routes';
import {
  SearchHotelModel,
  SearchListHotelModel,
} from '../models/search-hotel-model';
import currency from 'currency.js';
import { AiFillStar } from 'react-icons/ai';
import ListSelect, { ListSelectOption, ListSelectOptions } from './ListSelect';
import { useState } from 'react';
import { RoomModel } from '../models/room-model';
import { Button } from '@headlessui/react';
import { CreateBooking } from '../services/booking-service';
import { BookingModel } from '../models/booking-model';

interface SearchResultsCardProps {
  hotel: SearchListHotelModel;
  search: SearchHotelModel;
}

const GetSortRooms = (rooms: RoomModel[]) => {
  return rooms.sort((a, b) => a.baseCost - b.baseCost);
};

const SearchResultsCard = ({ hotel, search }: SearchResultsCardProps) => {
  const roomsSorted = GetSortRooms(hotel.rooms);
  const [selectedRoom, setSelectedRoom] = useState<RoomModel>(roomsSorted[0]);
  const { rooms } = hotel;

  const navigate = useNavigate();

  const handleHotelReservation = async () => {
    try {
      const booking: Partial<BookingModel> = {
        adultCount: search.adultCount,
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        location: search.destination,
        emergencyContactFullname: 'test emeregency name',
        emergencyContactPhoneNumber: '1234567890',
        hotelId: hotel.id,
      };

      await CreateBooking(booking);

      navigate(
        `${hotelRoute.name}/${hotel.id}/${hotelRoute.subroutes.reservation.name}`
      );
    } catch (error) {
      console.log('ALERT_ERROR', error);
    }
  };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full flex justify-center ">
        <FaHotel className="w-full h-full object-cover object-center max-sm:w-1/3" />
      </div>
      <div className="grid grid-cols-2 justify-between items-start whitespace-nowrap max-sm:grid-cols-1">
        <div>
          <div className="flex items-center max-sm:flex-col">
            <Link
              to={`${hotelRoute.name}/${hotel.id}/${hotelRoute.subroutes.reservation.name}`}
              className="text-2xl font-bold cursor-pointer text-blue-600"
            >
              {hotel.name}
            </Link>
            <span className="flex">
              {Array.from({ length: 5 }).map((start, index) => (
                <AiFillStar
                  key={`${hotel.id}-starRating-${index}-${start}`}
                  className="fill-yellow-400"
                />
              ))}
            </span>
          </div>
          <div className="line-clamp-4">{'Some description'}</div>
          <div>
            <ListSelect
              label={'Tipo de habitacion'}
              selected={selectedRoom.type}
              onChange={(value) => {
                const currentRoom = rooms.find(
                  (room) => room.id.toString() === value
                );
                return currentRoom ? setSelectedRoom(currentRoom) : undefined;
              }}
            >
              <ListSelectOptions>
                {Object.values(roomsSorted).map((option) => (
                  <ListSelectOption
                    key={option.id}
                    option={option.type}
                    value={option.id.toString()}
                  />
                ))}
              </ListSelectOptions>
            </ListSelect>
          </div>
        </div>
        <div className="grid items-end whitespace-nowrap">
          <div className="flex flex-col items-end gap-1 max-sm:items-center">
            <span className="font-bold">
              {currency(selectedRoom.baseCost).format()} COP por noche
            </span>
            <Button
              className="bg-blue-600 text-white h-full p-2 rounded font-bold text-xl max-w-fit hover:bg-blue-500"
              onClick={handleHotelReservation}
            >
              {'Reservar ahora'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
