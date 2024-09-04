import { ApiBooking } from '../api/api-routes';
import { axiosInstance } from '../context/ApiBaseProvider';
import { BookingModel } from '../models/booking-model';

export const CreateBooking = async (
  booking: Partial<BookingModel>
): Promise<BookingModel> => {
  const url = ApiBooking.post();
  return (await axiosInstance.post<BookingModel>(url, booking)).data;
};
