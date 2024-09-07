import { Button } from '@headlessui/react';
import { useCallback, useEffect, useState } from 'react';
import Table, {
  TableBody,
  TableColumn,
  TableHead,
  TableHeaders,
  TableRow,
} from '../../../common/components/Table';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import Spinner from '../../../common/components/Spinner';
import { useParams } from 'react-router-dom';
import { GetLocationType } from '../../../common/enums/location-type';
import {
  DeleteBookingById,
  GetBookings,
  GetBookingsByHotelId,
} from '../../../common/services/booking-service';
import { BookingModel } from '../../../common/models/booking-model';
import { HotelModel } from '../../../common/models/hotel-model';
import {
  GetHotelById,
  GetHotels,
} from '../../../common/services/hotel-service';

const columns = [
  { Header: 'Fecha ingreso', dataKey: 'checkIn' },
  { Header: 'Fecha salida', dataKey: 'checkOut' },
  { Header: 'Adultos', dataKey: 'adultCount' },
  { Header: 'Contacto de emergencia', dataKey: 'emergencyContactFullname' },
  {
    Header: 'Telefono de contacto de emergencia',
    dataKey: 'emergencyContactPhoneNumber',
  },
  { Header: 'Ubicación', dataKey: 'location', formatCell: GetLocationType },
];

const Reservation = (): JSX.Element => {
  const [bookings, setBookings] = useState<BookingModel[]>([]);
  const [hotels, setHotels] = useState<HotelModel[]>();
  const [currentRoomId, setCurrentRoomId] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [spinnerText, setSpinnerText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { hotelId } = useParams();

  const headers = !hotelId
    ? [
        {
          Header: 'Hotel',
          dataKey: 'hotelId',
          formatCell: (value: string) =>
            hotels?.find((hotel) => hotel.id === Number(value))?.name,
        },
        ...columns,
      ]
    : columns;

  const loadBookingsData = useCallback(async (): Promise<void> => {
    setSpinnerText('...Loading Bookings');
    setIsLoading(true);
    try {
      if (hotelId) {
        const bookings = await GetBookingsByHotelId(parseInt(hotelId));
        const hotel = await GetHotelById(parseInt(hotelId));
        setHotels([hotel]);
        setBookings(bookings);
      } else {
        const bookings = await GetBookings();
        const hotels = await GetHotels();
        setHotels(hotels);
        setBookings(bookings);
      }
    } catch (error) {
      console.log('error', error);
    }
    setIsLoading(false);
  }, [hotelId]);

  const handleDelete = (id: number): void => {
    setSpinnerText('Process delete');
    setIsLoading(true);
    DeleteBookingById(id)
      .then(() => {
        loadBookingsData();
      })
      .catch(() => console.log('DeleteHotelById-Erro'))
      .finally(() => setIsLoading(false));
  };

  const handleLog = (): void => {
    setSpinnerText(`${currentRoomId}-${isAddModalOpen}-${isEditModalOpen}`);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    loadBookingsData();
  }, [loadBookingsData]);

  return (
    <div className="grid p-2">
      <div className="flex items-center justify-between">
        <h1 className="mt-4 mb-4 font-bold">
          {'Lista de Reservaciones'}
          {hotelId
            ? `: ${hotels?.find((hotel) => hotel.id.toString() === hotelId)?.name}`
            : ''}
        </h1>
        <Button
          className="rounded-full py-2 px-4 text-md text-white bg-blue-500 data-[hover]:bg-blue-800 data-[active]:bg-blue-500"
          onClick={() => {
            handleLog();
          }}
        >
          {'Agregar Reservación'}
        </Button>
      </div>
      <Table>
        <TableHeaders>
          {headers.map((column) => (
            <TableHead key={`header-${column.dataKey}`}>
              {column.Header}
            </TableHead>
          ))}
          <TableHead>
            <span className="flex items-center justify-center">
              {'Opciones'}
            </span>
          </TableHead>
        </TableHeaders>
        <TableBody>
          {bookings?.map((row, rowIndex) => {
            return (
              <TableRow key={`row-${row['id']}-${rowIndex}`}>
                {headers.map((column) => (
                  <TableColumn key={`column-${column.dataKey}-${rowIndex}`}>
                    {column?.formatCell
                      ? column.formatCell(
                          `${row[column.dataKey as keyof typeof row]}`
                        )
                      : row[column.dataKey as keyof typeof row]}
                  </TableColumn>
                ))}
                <TableColumn>
                  <div className="flex items-center justify-center">
                    <Button
                      className="rounded bg-transparent py-2 px-4 text-md text-blue-500 data-[hover]:text-blue-800 data-[active]:text-blue-500"
                      onClick={() => {
                        setCurrentRoomId(row['id']);
                        handleLog();
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="rounded bg-transparent py-2 px-4 text-md text-red-500 data-[hover]:text-red-800 data-[active]:text-red-500"
                      onClick={() => handleDelete(row['id'])}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </TableColumn>
              </TableRow>
            );
          })}
          {!bookings?.length && !isLoading && (
            <TableRow>
              <TableColumn>{'No exiten registros'}</TableColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Spinner overlay="Component" show={isLoading} text={spinnerText} />
    </div>
  );
};

export default Reservation;
