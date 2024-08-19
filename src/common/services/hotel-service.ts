import { ApiHotel } from '../api/api-routes';
import { axiosInstance } from '../context/ApiBaseProvider';
import { HotelModel } from '../models/hotel-model';

export const GetHotels = async (): Promise<HotelModel[]> => {
  const url = ApiHotel.get();
  return (await axiosInstance.get<HotelModel[]>(url)).data;
};

export const DeleteHotelById = async (id: number): Promise<HotelModel> => {
  const url = ApiHotel.delete(id);
  return (await axiosInstance.delete<HotelModel>(url)).data;
};
