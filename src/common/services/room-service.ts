import { ApiRoom } from '../api/api-routes';
import { axiosInstance } from '../context/ApiBaseProvider';
import { RoomModel } from '../models/room-model';

export const CreateRoom = async (
  room: Partial<RoomModel>
): Promise<RoomModel> => {
  const url = ApiRoom.post();
  return (await axiosInstance.post<RoomModel>(url, room)).data;
};

export const UpdateRoom = async (room: RoomModel): Promise<RoomModel> => {
  const url = ApiRoom.put(room.id);
  return (await axiosInstance.put<RoomModel>(url, room)).data;
};

export const DeleteRoomById = async (id: number): Promise<RoomModel> => {
  const url = ApiRoom.delete(id);
  return (await axiosInstance.delete<RoomModel>(url)).data;
};

export const GetRooms = async (): Promise<RoomModel[]> => {
  const url = ApiRoom.get();
  return (await axiosInstance.get<RoomModel[]>(url)).data;
};

export const GetRoomsByHotelId = async (
  hotelId: number
): Promise<RoomModel[]> => {
  const url = ApiRoom.get();
  return (await axiosInstance.get<RoomModel[]>(url, { params: { hotelId } }))
    .data;
};

export const GetRoomById = async (id: number): Promise<RoomModel> => {
  const url = ApiRoom.get();
  return (await axiosInstance.get<RoomModel[]>(url, { params: { id } }))
    .data[0];
};
