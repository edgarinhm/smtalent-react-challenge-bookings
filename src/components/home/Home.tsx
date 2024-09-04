import { useState } from 'react';
import SearchBar from '../layout/SearchBar';
import SearchList from './SearchList';
import { SearchHotelResponseModel } from '../../common/models/search-hotel-model';
import Banner from './Banner';

const initialState = {
  search: {
    adultCount: 0,
    checkIn: '',
    checkOut: '',
    childCount: 0,
    destination: '',
    roomCount: 0,
  },
  hotel: [],
};

const Home = () => {
  const [hotelData, setHotelData] =
    useState<SearchHotelResponseModel>(initialState);

  return (
    <div className="bg-white mb-24 w-full">
      <div className="-mt-10">
        <Banner />
      </div>
      <div className="absolute w-[calc(100%-10px)] max-w-[1100px] left-1/2 z-40 -translate-x-1/2 -translate-y-14">
        <SearchBar onSubmit={(hotels) => setHotelData(hotels)} />
      </div>
      <div className="p-8">
        <SearchList searchHotelData={hotelData} />
      </div>
    </div>
  );
};

export default Home;
