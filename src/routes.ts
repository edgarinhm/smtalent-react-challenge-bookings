export const homeRoute = { name: '/' };
export const loginRoute = { name: '/login' };
export const hotelRoute = {
  name: '/hotel',
  pathParam: ':hotelId',
  subroutes: {
    room: { name: 'roomAsignation' },
  },
};
export const roomRoute = {
  name: '/room',
  pathParam: ':id',
};
export const reservationsRoute = {
  name: '/reservations',
};
