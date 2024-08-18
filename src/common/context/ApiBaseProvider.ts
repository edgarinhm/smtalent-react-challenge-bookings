import axios from 'axios';
import { ReactNode } from 'react';

const { APIHostName } =
  window['environment-config' as keyof typeof window] ?? {};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SMTALENT_API_URL_BOOKINGS ?? APIHostName,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AxiosSWRFetcher = async <T>(url: string): Promise<T> => {
  return axiosInstance.get(url).then((res) => res.data);
};

export const AxiosMultipleKeySWRFetcher = async <T>([
  url,
]: string[]): Promise<T> => {
  return axiosInstance.get(url).then((res) => res.data);
};

export const ApiBaseProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosInstance.interceptors.request.use(async (config: any) => {
    return config;
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosInstance.interceptors.response.use(async (response: any) => {
    return response;
  });

  return children;
};
