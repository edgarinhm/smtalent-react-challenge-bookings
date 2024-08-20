import { useEffect, useState } from 'react';
import { HotelModel } from '../../../common/models/hotel-model';
import { GetHotelById } from '../../../common/services/hotel-service';
import { Button } from '@headlessui/react';

interface HotelDrawerProps {
  isOpen: boolean;
  id?: number;
  onClose: () => void;
}
const HotelDrawer = ({ isOpen, id, onClose }: HotelDrawerProps) => {
  const initialState: HotelModel = { id: 0, name: '', active: false };
  const [hotel, setHotel] = useState<HotelModel>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [spinnerText, setSpinnerText] = useState('');

  useEffect(() => {
    const loadHotelData = (id: number) => {
      setSpinnerText('...Loading Hotel ');
      setIsLoading(true);
      GetHotelById(id)
        .then((hotel) => setHotel(hotel))
        .catch(() => console.log('GetHotelById-Error'))
        .finally(() => setIsLoading(false));
    };

    if (isOpen && id) {
      loadHotelData(id);
    }
  }, [id, isOpen]);

  return (
    <div>
      {isOpen && (
        <>
          {'[Right Sidebar]'}
          <div>{'-Formulario para asignar habitaciones'}</div>
          <div>{'-Habitaciones asignadas'}</div>
          <Button
            className="rounded py-2 px-4 text-white bg-blue-500 data-[hover]:bg-blue-800 data-[active]:bg-blue-500"
            onClick={onClose}
          >
            {'Close Drawer'}
          </Button>
        </>
      )}
    </div>
  );
};

export default HotelDrawer;
