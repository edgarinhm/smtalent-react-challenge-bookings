import { HotelModel } from './hotel-model';
import { RoomModel } from './room-model';

export interface SearchHotelModel {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  roomCount: number;
  hotelId?: number;
}

export interface SearchListHotelModel extends HotelModel {
  rooms: RoomModel[];
}
export interface SearchHotelResponseModel {
  destination: string;
  hotel: SearchListHotelModel[];
}
