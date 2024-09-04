import {
  ApiSearchActiveHotelsByIds,
  ApiSearchActiveRoomsById,
} from '../api/api-routes';
import { axiosInstance } from '../context/ApiBaseProvider';
import { HotelModel } from '../models/hotel-model';
import { RoomModel } from '../models/room-model';
import {
  SearchHotelModel,
  SearchHotelResponseModel,
} from '../models/search-hotel-model';

export const GetSearchHotels = async (
  searchHotel: SearchHotelModel
): Promise<SearchHotelResponseModel> => {
  const rooms = (
    await axiosInstance.get<RoomModel[]>(ApiSearchActiveRoomsById.get(), {
      params: { location: searchHotel.destination },
    })
  ).data;

  const uniqueRoomIds = [
    ...new Set(
      rooms.map((room) => {
        return room.hotelId;
      })
    ),
  ];

  const params = uniqueRoomIds.join('&id=');

  const hotels = await axiosInstance.get<HotelModel[]>(
    ApiSearchActiveHotelsByIds.get(params)
  );

  const searchResult = hotels.data.map((hotel) => {
    return {
      ...hotel,
      rooms: rooms.filter((room) => room.hotelId === hotel.id),
    };
  });

  return { hotel: searchResult, search: searchHotel };
};
