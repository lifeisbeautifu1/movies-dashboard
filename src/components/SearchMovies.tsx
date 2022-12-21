import { useState, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

import { Filter } from './index';
import { useDebounce } from '../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { searchMovies } from '../features/movies/moviesSlice';
import { setIsFilterOpen } from '../features/filter/filterSlice';

const SearchMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { debounceValue } = useDebounce(searchTerm, 500);

  const { isFilterOpen } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchMovies(debounceValue));
  }, [debounceValue, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsFilterOpen(false));
    dispatch(searchMovies(searchTerm));
  };

  const onFilterClick = () => {
    if (isFilterOpen) dispatch(searchMovies(searchTerm));
    dispatch(setIsFilterOpen(!isFilterOpen));
  };

  return (
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
        onClick={onFilterClick}
        type='button'
        className='w-full h-8 px-3 flex items-center gap-2 text-xs bg-primary transition duration-300 hover:bg-secondary btn-drop-shadow rounded-lg text-center justify-center'
      >
        <FunnelIcon className='h-5 w-5' />
        {isFilterOpen ? 'Закрыть фильтр' : 'Открыть фильтр'}
      </button>
      {isFilterOpen && <Filter />}
    </form>
  );
};

export default SearchMovies;
