import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { MdHome } from 'react-icons/md';
import { LiaHotelSolid } from 'react-icons/lia';
import { MdOutlineBed } from 'react-icons/md';
import { FaBed } from 'react-icons/fa';
import useAuth from '../../common/hooks/useAuth';
import {
  homeRoute,
  hotelRoute,
  reservationRoute,
  roomRoute,
} from '../../routes';

const navigation = [
  { name: 'Home', href: homeRoute.name, icon: MdHome },
  { name: 'Hotels', href: hotelRoute.name, icon: LiaHotelSolid },
  { name: 'Rooms', href: roomRoute.name, icon: FaBed },
  { name: 'Reservations', href: reservationRoute.name, icon: MdOutlineBed },
];

const NavBar = () => {
  const { auth, logoutUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Disclosure as="nav" className="bg-blue-800 py-6">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    to={item.href}
                    key={item.name}
                    className={`inline-flex items-center  gap-1 rounded-full py-1.5 px-3 text-sm/6 text-white shadow-inner shadow-white/10 hover:bg-white hover:bg-opacity-10 ${pathname === item.href ? 'outline outline-1 outline-white bg-white bg-opacity-10' : ''}`}
                  >
                    {<item.icon className="size-6" />}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              className="flex bg-white items-center text-blue-600 p-2 rounded font-bold hover:bg-gray-100"
              onClick={() => (auth ? logoutUser() : navigate('/login'))}
            >
              <span className="absolute -inset-1.5" />

              {auth && (
                <>
                  <span className="mr-1">{'Sign Out'}</span>
                  <ArrowLeftStartOnRectangleIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </>
              )}
              {!auth && (
                <>
                  <span className="mr-1">{'Sign In'}</span>
                  <ArrowLeftEndOnRectangleIcon
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default NavBar;
