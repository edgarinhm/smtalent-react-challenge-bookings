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
import { RoomModel } from '../../../common/models/room-model';
import {
  DeleteRoomById,
  GetRooms,
  GetRoomsByHotelId,
} from '../../../common/services/room-service';
import { useParams } from 'react-router-dom';
import { GetLabelYesOrNotFormatter } from '../../../common/functions/table-formatters';
import UpdateRoomModal from './UpdateRoomModal';
import { GetLocationType } from '../../../common/enums/location-type';
import currency from 'currency.js';
import CreateRoomModal from './CreateRoomModal';
import { GetHotels } from '../../../common/services/hotel-service';
import { HotelModel } from '../../../common/models/hotel-model';

const columns = [
  { Header: 'Piso', dataKey: 'level' },
  { Header: 'Tipo', dataKey: 'type' },
  { Header: 'Cantidad', dataKey: 'quantity' },
  {
    Header: 'Activo',
    dataKey: 'active',
    formatCell: GetLabelYesOrNotFormatter,
  },
  {
    Header: 'Valor',
    dataKey: 'baseCost',
    formatCell: (value: string) => currency(value).format(),
  },
  {
    Header: 'Impuestos',
    dataKey: 'taxes',
    formatCell: (value: string) => currency(value).format(),
  },
  { Header: 'Ubicación', dataKey: 'location', formatCell: GetLocationType },
];

const Room = (): JSX.Element => {
  const [rooms, setRooms] = useState<RoomModel[]>();
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

  const loadRoomsData = useCallback(async (): Promise<void> => {
    setSpinnerText('...Loading Rooms');
    setIsLoading(true);
    try {
      if (hotelId) {
        const data = await GetRoomsByHotelId(parseInt(hotelId));
        setRooms(data);
      } else {
        const hotels = await GetHotels();
        setHotels(hotels);
        const data = await GetRooms();
        setRooms(data);
      }
    } catch (error) {
      console.log('error', error);
    }
    setIsLoading(false);
  }, [hotelId]);

  const handleDelete = (id: number): void => {
    setSpinnerText('Process delete');
    setIsLoading(true);
    DeleteRoomById(id)
      .then(() => {
        loadRoomsData();
      })
      .catch(() => console.log('DeleteHotelById-Erro'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadRoomsData();
  }, [loadRoomsData]);

  return (
    <div className="grid p-2">
      <div className="flex items-center justify-between">
        <h1 className="mt-4 mb-4 font-bold">
          {'Lista de Habitaciones'}
          {hotelId ? ` Hotel: ${hotelId}` : ''}
        </h1>
        <Button
          className="rounded-full py-2 px-4 text-md text-white bg-blue-500 data-[hover]:bg-blue-800 data-[active]:bg-blue-500"
          onClick={() => setIsAddModalOpen(true)}
        >
          {'Agregar Habitación'}
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
          {rooms?.map((row, rowIndex) => {
            return (
              <TableRow key={`row-${rowIndex}`}>
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
                        setIsEditModalOpen(true);
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
          {!rooms?.length && !isLoading && (
            <TableRow>
              <TableColumn>{'No exiten registros'}</TableColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UpdateRoomModal
        isOpen={isEditModalOpen}
        id={currentRoomId}
        onClose={() => setIsEditModalOpen(false)}
        updateGrid={loadRoomsData}
      />
      <CreateRoomModal
        hotelId={hotelId}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        updateGrid={loadRoomsData}
      />
      <Spinner overlay="Component" show={isLoading} text={spinnerText} />
    </div>
  );
};

export default Room;
