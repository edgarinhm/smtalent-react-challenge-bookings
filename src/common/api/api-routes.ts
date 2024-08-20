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
