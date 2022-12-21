import { SearchMovies, MovieList } from './index';

const Sidebar = () => {
  return (
    <aside className='col-span-4 flex flex-col border-r border-gray-200 h-full pr-3'>
      <SearchMovies />
      <MovieList />
    </aside>
  );
};

export default Sidebar;
