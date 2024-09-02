export interface SearchHotelModel {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  roomCount: number;
  hotelId?: number;
}
