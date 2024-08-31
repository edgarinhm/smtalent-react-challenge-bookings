import { Button, Input } from '@headlessui/react';
import dayjs, { Dayjs } from 'dayjs';
import { FormEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [dateRange, setDateRange] = useState<Dayjs[]>();
  const [startDate, endDate] = dateRange ?? [null, null];

  return (
    <div className="bg-white mb-24 w-full">
      <div>
        <div>
          <img
            className="w-full h-60 absolute object-cover left-0 right-0 m-0 mr-auto ml-auto z-10"
            alt="Una persona vestida con ropa de verano está sentada en un sofá en una sala de estar espaciosa. Está mirando por la ventana y tiene un libro en una mano y una taza en la otra. Los grandes ventanales del salón ofrecen una vista marítima, con el mar al fondo y palmeras en primer plano."
            src="https://q-xx.bstatic.com/xdata/images/xphoto/2880x868/363658458.jpeg?k=427a5cc2522eb3d80a76d232939725ec6cf76e03ef26ee846375709b3e9caf6f&amp;o="
          ></img>
        </div>
        <div className="z-30 max-w-screen-lg min-h-60 m-0 ml-auto mr-auto relative flex px-1 py-12">
          <div className="mt-auto mb-auto m-0">
            <header className="text-white">
              <h1 className="flex flex-col font-extrabold text-5xl">
                <span>{'Siéntete como en casa'}</span>
                <span>{'en tu próxima aventura'}</span>
              </h1>
              <p className="mt-1">
                {'Disfruta de un alojamiento entero para ti'}
              </p>
            </header>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 -translate-y-14 z-40">
        <form onSubmit={(event: FormEvent) => event.preventDefault()}>
          <div className="mt-6 mb-4 p-1 inline-flex items-center bg-yellow-500 rounded-lg max-w-full">
            <div>
              <Input className="m-2 p-2 rounded" />
            </div>
            <div>
              <DatePicker
                showIcon
                icon={<CalendarDaysIcon className="h-6 w-6 text-gray-500" />}
                selectsRange={true}
                startDate={startDate?.toDate()}
                endDate={endDate?.toDate()}
                onChange={(update) => {
                  console.log(
                    ' dayjs(update[0])',
                    dayjs(update[0] ?? undefined),
                    ' dayjs(update[1])',
                    dayjs(update[1] ?? undefined)
                  );
                  setDateRange([
                    dayjs(update[0] ?? undefined),
                    dayjs(update[1] ?? undefined),
                  ]);
                }}
              />
            </div>
            <div className="flex flex-auto ml-1 rounded bg-yellow-500">
              <Button className="rounded bg-blue-600 py-1 px-6 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-700 data-[open]:bg-blue-700 data-[focus]:outline-1 data-[focus]:outline-white">
                {'Buscar'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
