import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, MenuButton } from '@headlessui/react';

import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { MdHome, MdOutlineBedroomChild } from 'react-icons/md';

import useAuth from '../../common/hooks/useAuth';
import { homeRoute, hotelRoute } from '../../routes';

const navigation = [
  { name: 'Home', href: homeRoute, icon: MdHome },
  { name: 'Hotels', href: hotelRoute, icon: MdOutlineBedroomChild },
];

const NavBar = () => {
  const { auth, logoutUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Disclosure as="nav" className="bg-blue-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <Menu>
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <MenuButton
                      key={item.name}
                      id={item.name}
                      className={`inline-flex items-center  gap-1 rounded-full py-1.5 px-3 text-sm/6 text-white shadow-inner shadow-white/10 focus:outline-none  data-[hover]:bg-white data-[hover]:bg-opacity-10 ${pathname === item.href ? 'outline outline-1 outline-white' : ''}`}
                    >
                      {<item.icon className="size-6" />}
                      <Link to={item.href}>{item.name}</Link>
                    </MenuButton>
                  ))}
                </div>
              </Menu>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full  p-1 text-white hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => (auth ? logoutUser() : navigate('/login'))}
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">SignOut</span>
              {auth && (
                <ArrowLeftStartOnRectangleIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              )}
              {!auth && (
                <ArrowLeftEndOnRectangleIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default NavBar;
