import SearchBar from '../layout/SearchBar';
import Search from './Search';

const Home = () => {
  return (
    <div className="bg-white mb-24 w-full">
      <div className="absolute w-[calc(100%-10px)] max-w-[1100px] left-1/2 z-40 -translate-x-1/2 -translate-y-14">
        <SearchBar />
      </div>
      <Search />
    </div>
  );
};

export default Home;
