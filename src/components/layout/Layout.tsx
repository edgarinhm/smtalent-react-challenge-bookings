import { Outlet } from 'react-router-dom';
import { Button } from '@mui/base/Button';

const Layout = () => {
  return (
    <main className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">{'Bookings'}</h1>
        <Button className="bg-green-600 rounded-md py-1 px-4">
          {'Create Booking'}
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
