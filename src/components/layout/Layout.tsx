import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Banner from '../home/Banner';
import Footer from './Footer';

const Layout = (): JSX.Element => {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <Banner />
      <div className="container mx-auto py-10 flex-1">
        <Outlet />
      </div>
      <Footer />
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
