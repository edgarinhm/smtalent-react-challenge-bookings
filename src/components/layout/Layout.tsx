import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = (): JSX.Element => {
  return (
    <main className="grid p-4">
      <NavBar />
      <Outlet />
    </main>
  );
};

const Default = (): JSX.Element => {
  return (
    <main className="grid">
      <Outlet />
    </main>
  );
};

Layout.Default = Default;

export default Layout;
