import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setIsEdit } from '../features/movies/moviesSlice';
import { Loader, MovieItem } from './index';

const MovieList = () => {
  const { movies, selectedMovie, isMoviesLoading } = useAppSelector(
    (state) => state.movies
  );

  const { isFilterOpen } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onEdit = () => {
    dispatch(setIsEdit(false));
    navigate('/movie/form');
  };

  return (
    <>
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
          onClick={onEdit}
          className='w-full md:w-auto h-8 px-3 flex items-center gap-2 text-xs bg-primary transition duration-300 hover:bg-secondary btn-drop-shadow rounded-lg text-center'
        >
          <PlusIcon className='h-5 w-5' />
          Добавить
        </button>
      </div>
    </>
  );
};

export default MovieList;
