import { ApiRoom } from '../api/api-routes';
import { axiosInstance } from '../context/ApiBaseProvider';
import { RoomModel } from '../models/room-model';

export const CreateRoom = async (
  room: Partial<RoomModel>
): Promise<RoomModel> => {
  const url = ApiRoom.post();
  return (await axiosInstance.post<RoomModel>(url, room)).data;
};
