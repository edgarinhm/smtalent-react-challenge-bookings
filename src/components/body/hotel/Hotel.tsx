import { useCallback, useEffect, useState } from 'react';
import Table, {
  TableBody,
  TableColumn,
  TableHead,
  TableHeaders,
  TableRow,
} from '../../../common/components/Table';
import {
  DeleteHotelById,
  GetHotels,
} from '../../../common/services/hotel-service';
import { HotelModel } from '../../../common/models/hotel-model';
import { Button } from '@headlessui/react';
import { FaEdit } from 'react-icons/fa';
import Spinner from '../../../common/components/Spinner';
import CreateHotelModal from './CreateHotelModal';
import UpdateHotelModal from './UpdateHotelModal';
import { GrOverview } from 'react-icons/gr';
import HotelDrawer from './HotelDrawer';
import { MdOutlineBed, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { hotelRoute } from '../../../routes';
import { GetLabelYesOrNotFormatter } from '../../../common/functions/table-formatters';

const Hotel = (): JSX.Element => {
  const [hotels, setHotels] = useState<HotelModel[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [spinnerText, setSpinnerText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentHotelId, setCurrentHotelId] = useState<number>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const columns = [
    { Header: 'Nombre', dataKey: 'name' },
    {
      Header: 'Activo',
      dataKey: 'active',
      formatCell: GetLabelYesOrNotFormatter,
    },
  ];

  const handleDelete = (id: number): void => {
    setSpinnerText('Process delete');
    setIsLoading(true);
    DeleteHotelById(id)
      .then(() => {
        loadHotelsData();
      })
      .catch(() => console.log('DeleteHotelById-Erro'))
      .finally(() => setIsLoading(false));
  };

  const loadHotelsData = useCallback(async (): Promise<void> => {
    setSpinnerText('...Loading Hotels');
    setIsLoading(true);
    GetHotels()
      .then((hotels) => setHotels(hotels))
      .finally(() => {
        setIsLoading(false);
        setSpinnerText('');
      });
  }, []);

  useEffect(() => {
    loadHotelsData();
  }, [loadHotelsData]);

  return (
    <div className="grid p-2">
      <div className="flex items-center justify-between">
        <h1 className="mt-4 mb-4 font-bold">{'Lista de Hoteles'}</h1>
        <Button
          className="rounded-full py-2 px-4 text-md text-white bg-blue-500 data-[hover]:bg-blue-800 data-[active]:bg-blue-500"
          onClick={() => setIsAddModalOpen(true)}
        >
          {'Agregar Hotel'}
        </Button>
      </div>
      <Table>
        <TableHeaders>
          {columns.map((column) => (
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
          {hotels?.map((row, rowIndex) => {
            return (
              <TableRow key={`row-${rowIndex}`}>
                {columns.map((column) => (
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
                        navigate(
                          `${hotelRoute.name}/${row['id']}/${
                            hotelRoute.subroutes.room.name
                          }`
                        );
                      }}
                    >
                      <GrOverview />
                    </Button>
                    <Button
                      className="rounded bg-transparent py-2 px-4 text-md text-blue-500 data-[hover]:text-blue-800 data-[active]:text-blue-500"
                      onClick={() => {
                        setCurrentHotelId(row['id']);
                        setIsDrawerOpen(true);
                      }}
                    >
                      <MdOutlineBed />
                    </Button>
                    <Button
                      className="rounded bg-transparent py-2 px-4 text-md text-blue-500 data-[hover]:text-blue-800 data-[active]:text-blue-500"
                      onClick={() => {
                        setCurrentHotelId(row['id']);
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
          {!hotels?.length && !isLoading && (
            <TableRow>
              <TableColumn>{'No exiten registros'}</TableColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CreateHotelModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        updateGrid={loadHotelsData}
      />
      <UpdateHotelModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        id={currentHotelId}
        updateGrid={loadHotelsData}
      />
      <HotelDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={currentHotelId}
      />
      <Spinner overlay="None" show={isLoading} text={spinnerText} />
    </div>
  );
};

export default Hotel;
