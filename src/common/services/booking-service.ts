import { ApiBooking } from '../api/api-routes';
import { axiosInstance } from '../context/ApiBaseProvider';
import { BookingModel } from '../models/booking-model';

export const CreateBooking = async (
  booking: Partial<BookingModel>
): Promise<BookingModel> => {
  const url = ApiBooking.post();
  return (await axiosInstance.post<BookingModel>(url, booking)).data;
};

export const GetBookings = async (): Promise<BookingModel[]> => {
  const url = ApiBooking.get();
  return (await axiosInstance.get<BookingModel[]>(url)).data;
};

export const GetBookingsByHotelId = async (
  hotelId: number
): Promise<BookingModel[]> => {
  const url = ApiBooking.get();
  return (await axiosInstance.get<BookingModel[]>(url, { params: { hotelId } }))
    .data;
};

export const DeleteBookingById = async (id: number): Promise<BookingModel> => {
  const url = ApiBooking.delete(id);
  return (await axiosInstance.delete<BookingModel>(url)).data;
};
