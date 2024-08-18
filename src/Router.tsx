import { Route, Routes } from 'react-router-dom';
import RequiereAuth from './common/components/RequireAuth';
import Login from './components/login/Login';
import Hotel from './components/body/hotel/Hotel';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import { homeRoute, hotelRoute, loginRoute } from './routes';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout.Default />}>
        <Route path={loginRoute} element={<Login />} />
      </Route>
      <Route path={homeRoute} element={<Layout />}>
        <Route
          path={homeRoute}
          element={<RequiereAuth redirectTo={loginRoute} />}
        >
          <Route path={homeRoute} element={<Home />} />
          <Route path={hotelRoute} element={<Hotel />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
