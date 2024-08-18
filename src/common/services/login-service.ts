import { ApiLogin } from '../api/api-routes';
import { axiosInstance } from '../context/ApiBaseProvider';
import { UserModel } from '../models/user-model';

export const GetSignInLogin = async (
  email: string,
  password: string
): Promise<UserModel> => {
  const url = ApiLogin.get();
  return (
    await axiosInstance.get<UserModel[]>(url, {
      params: { email, password },
    })
  ).data[0];
};

export const CreateSignUpLogin = async (
  username: string,
  email: string,
  password: string
): Promise<UserModel> => {
  const url = ApiLogin.post();
  return (
    await axiosInstance.post<UserModel>(url, { username, email, password })
  ).data;
};
