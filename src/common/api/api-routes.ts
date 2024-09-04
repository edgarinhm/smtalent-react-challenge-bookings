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

export const ApiSearchActiveHotelsByIds = {
  get: (params: string): string => `/hotels?active=true&id=${params}`,
};

export const ApiSearchActiveRoomsById = {
  get: (): string => `/rooms?active=true`,
};

export const ApiBooking = {
  post: () => 'bookings',
  get: () => 'bookings',
};
