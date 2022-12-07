import { useState, useEffect } from 'react';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import { MovieItem, Loader, Filter } from './index';
import { useDebounce } from '../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setSelectedMovie,
  setIsEdit,
  searchMovies,
  getMovies,
  getGenres,
  setIsFilterOpen,
} from '../features/movies/moviesSlice';

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { debounceValue } = useDebounce(searchTerm, 500);

  const { movies, selectedMovie, isMoviesLoading, isFilterOpen } =
    useAppSelector((state) => state.movies);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchMovies(debounceValue));
  }, [debounceValue, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsFilterOpen(false));
    dispatch(searchMovies(searchTerm));
  };

  return (
    <aside className='col-span-4 flex flex-col border-r border-gray-200 h-full pr-3'>
      <form
        onSubmit={handleSubmit}
        className={`py-[10px] flex flex-col gap-4 ${isFilterOpen && 'h-full'}`}
      >
        <div className='flex items-center gap-3'>
          <input
            placeholder='Введите название фильма'
            type='text'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className='bg-[#ECF1F7] h-8  w-full p-2 rounded-lg text-xs text-black/50 outline-none'
          />
          <button
            type='submit'
            className='hidden md:block h-8 py-2 px-3 btn-drop-shadow bg-[#ECF1F7] transition duration-300 active:scale-[0.95] hover:opacity-90 rounded-lg text-xs text-[#336FEE]'
          >
            Искать
          </button>
        </div>

        <button
          onClick={() => {
            if (isFilterOpen) dispatch(searchMovies(searchTerm));
            dispatch(setIsFilterOpen(!isFilterOpen));
          }}
          type='button'
          className='w-full h-8 px-3 flex items-center gap-2 text-xs bg-primary transition duration-300 hover:bg-secondary btn-drop-shadow rounded-lg text-center justify-center'
        >
          <FunnelIcon className='h-5 w-5' />
          {isFilterOpen ? 'Закрыть фильтр' : 'Открыть фильтр'}
        </button>
        {isFilterOpen && <Filter />}
      </form>
      <div className='flex flex-col justify-between flex-grow'>
        <ul className='flex flex-col h-[0] flex-grow overflow-y-scroll gap-2 py-2 '>
          {isMoviesLoading ? (
            <div className='w-full h-full flex items-center justify-center'>
              <Loader />
            </div>
          ) : (
            !isFilterOpen &&
            (movies.length === 0 ? (
              <div className='text-xs flex-grow flex items-center justify-center'>
                Ничего не найдено
              </div>
            ) : (
              movies.map((movie) => (
                <MovieItem
                  onClick={() => {
                    dispatch(setSelectedMovie(movie));
                    navigate('/movie/' + movie.id);
                  }}
                  key={movie.id}
                  active={movie.id === selectedMovie?.id}
                  id={movie.id}
                  title={movie.title}
                  genres={movie?.genres}
                  year={movie.year}
                />
              ))
            ))
          )}
        </ul>
      </div>
      <div className='py-4 mt-4 border-t border-t-[#d9d9d9] flex items-center justify-between'>
        <p className='text-xs hidden md:block'>
          {movies.length === 1 ? 'Найден' : 'Найдено'} {movies.length}{' '}
          {movies.length > 1 && movies.length <= 4
            ? 'элемента'
            : movies.length === 1
            ? 'элемент'
            : 'элементов'}
        </p>
        <button
          onClick={() => {
            dispatch(setIsEdit(false));
            navigate('/movie/form');
          }}
          className='w-full md:w-auto h-8 px-3 flex items-center gap-2 text-xs bg-primary transition duration-300 hover:bg-secondary btn-drop-shadow rounded-lg text-center'
        >
          <PlusIcon className='h-5 w-5' />
          Добавить
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
