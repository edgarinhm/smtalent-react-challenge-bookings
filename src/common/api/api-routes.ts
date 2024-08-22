export const ApiLogin = {
  get: (): string => '/users',
  post: (): string => '/users',
};

export const ApiHotel = {
  get: (): string => '/hotels',
  post: (): string => '/hotels',
  delete: (id: number): string => `/hotels/${id}`,
  put: (id: number): string => `/hotels/${id}`,
};

export const ApiRoom = {
  get: (): string => '/rooms',
  post: (): string => '/rooms',
  delete: (id: number): string => `/rooms/${id}`,
  put: (id: number): string => `/rooms/${id}`,
};
