import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setFilterStartYear,
  setFilterEndYear,
  setFilterStartRuntime,
  setFilterEndRuntime,
} from '../features/filter/filterSlice';
import {
  addToIncludedGenres,
  removeFromIncludedGenres,
} from '../features/movies/moviesSlice';

const Filter = () => {
  const { genres, includedGenres } = useAppSelector((state) => state.movies);

  const {
    filterStartYear,
    filterEndYear,
    filterStartRuntime,
    filterEndRuntime,
  } = useAppSelector((state) => state.filter);

  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-col gap-4 h-[0] flex-grow overflow-scroll'>
      <div className='flex flex-col gap-2 text-sm'>
        <h1>Год выпуска</h1>
        <div className='flex gap-2 items-center'>
          <select
            value={filterStartYear}
            onChange={(e) => dispatch(setFilterStartYear(+e.target.value))}
            className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          >
            {Array.from(Array(new Date().getFullYear() - 2000 + 101).keys())
              .map((num) => num + 1900)
              .sort((a, b) => b - a)
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
          <span>по</span>
          <select
            value={filterEndYear}
            onChange={(e) => dispatch(setFilterEndYear(+e.target.value))}
            className='block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
          >
            {Array.from(Array(new Date().getFullYear() - 2000 + 101).keys())
              .map((num) => num + 1900)
              .sort((a, b) => b - a)
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='flex flex-col gap-2 text-sm'>
        <h1>Длительность</h1>
        <div className='flex gap-2 items-center'>
          <select
            value={filterStartRuntime}
            onChange={(e) => dispatch(setFilterStartRuntime(+e.target.value))}
            className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value={30}>30 минут</option>
            <option value={60}>1 час</option>
            <option value={90}>1 час 30 минут</option>
            <option value={120}>2 часа</option>
            <option value={150}>2 часа 30 минут</option>
            <option value={180}>3 часа</option>
          </select>
          <span>до</span>
          <select
            value={filterEndRuntime}
            onChange={(e) => dispatch(setFilterEndRuntime(+e.target.value))}
            className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value={30}>30 минут</option>
            <option value={60}>1 часа</option>
            <option value={90}>1 часа 30 минут</option>
            <option value={120}>2 часов</option>
            <option value={150}>2 часов 30 минут</option>
            <option value={999}>3 часов+</option>
          </select>
        </div>
      </div>
      <div className='flex flex-col gap-2 text-sm'>
        <h1>Жанры</h1>
        {genres.map((g, i) => (
          <div key={i} className='flex items-center'>
            <input
              id={`genre-${g}`}
              type='checkbox'
              onChange={() => {
                includedGenres.includes(g)
                  ? dispatch(removeFromIncludedGenres(g))
                  : dispatch(addToIncludedGenres(g));
              }}
              checked={includedGenres.includes(g)}
              className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300'
            />
            <label
              htmlFor={`genre-${g}`}
              className='ml-2 flex-grow text-sm text-gray-900'
            >
              {g}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
