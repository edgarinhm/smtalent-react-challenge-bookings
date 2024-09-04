import SearchResultsCard from '../../common/components/SearchResultsCard';
import { SearchHotelResponseModel } from '../../common/models/search-hotel-model';

interface SearchListProps {
  searchHotelData: SearchHotelResponseModel;
}

const SearchList = ({ searchHotelData }: SearchListProps): JSX.Element => {
  const { hotel: hotelData, search } = searchHotelData;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      {search.destination && (
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              {'Filtrar por:'}
            </h3>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {search.destination && (
              <>
                {`${search.destination}: ${hotelData?.length} alojamientos encontrados`}
              </>
            )}
          </span>
        </div>
        {hotelData?.map((hotel) => (
          <SearchResultsCard key={hotel.id} hotel={hotel} search={search} />
        ))}
      </div>
    </div>
  );
};

export default SearchList;
