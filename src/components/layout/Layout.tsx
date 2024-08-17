import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">{'Bookings'}</h1>
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
