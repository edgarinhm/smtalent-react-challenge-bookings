import { Route, Routes } from 'react-router-dom';
import RequiereAuth from './common/components/RequireAuth';
import Login from './components/login/Login';
import Hotel from './components/body/hotel/Hotel';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import {
  homeRoute,
  hotelRoute,
  loginRoute,
  reservationRoute,
  roomRoute,
} from './routes';
import Room from './components/body/room/Room';
import Reservation from './components/body/reservation/Reservation';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout.Default />}>
        <Route path={loginRoute.name} element={<Login />} />
      </Route>
      <Route path={homeRoute.name} element={<Layout />}>
        <Route
          path={homeRoute.name}
          element={<RequiereAuth redirectTo={loginRoute.name} />}
        >
          <Route path={homeRoute.name} element={<Home />} />
          <Route path={hotelRoute.name}>
            <Route index element={<Hotel />} />
            <Route path={hotelRoute.pathParam}>
              <Route path={hotelRoute.subroutes.room.name} element={<Room />} />
            </Route>
          </Route>
          <Route path={hotelRoute.name} element={<Hotel />} />
          <Route path={roomRoute.name}>
            <Route index element={<Room />} />
            <Route path={roomRoute.pathParam} element={<Room />} />
          </Route>
          <Route path={reservationRoute.name}>
            <Route index element={<Reservation />} />
            <Route
              path={reservationRoute.pathParam}
              element={<Reservation />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
