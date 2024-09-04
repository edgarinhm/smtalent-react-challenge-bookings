export interface BookingModel {
  id: number;
  hotelId: number;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  location: string;
  emergencyContactFullname: string;
  emergencyContactPhoneNumber: string;
}
