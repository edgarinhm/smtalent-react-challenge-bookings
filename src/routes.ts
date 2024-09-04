export const homeRoute = { name: '/' };
export const loginRoute = { name: '/login' };
export const hotelRoute = {
  name: '/hotel',
  pathParam: ':hotelId',
  subroutes: {
    room: { name: 'roomAsignation' },
    reservation: { name: 'roomReservation' },
  },
};
export const roomRoute = {
  name: '/room',
  pathParam: ':id',
};
export const reservationRoute = {
  name: '/reservation',
  pathParam: ':id',
};
