import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MuiChipsInput } from 'mui-chips-input';
import { v4 as uuid } from 'uuid';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addMovie, editMovie } from '../features/movies/moviesSlice';
import { MultipleSelectChip } from '../components';

const emptyMovieData = {
  title: '',
  year: 0,
  plot: '',
  posterUrl: '',
  rate: 0,
  actors: [],
  genres: [],
  runtime: 0,
  director: '',
};

const MovieForm = () => {
  const [chips, setChips] = useState<string[]>([]);

  const [movieData, setMovieData] = useState<IMovieForm>(emptyMovieData);

  const [errors, setErrors] = useState({
    title: false,
    year: false,
    plot: false,
    posterUrl: false,
    rate: false,
    actors: false,
    genres: false,
    runtime: false,
    director: false,
  });

  const { isEdit, selectedMovie } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (isEdit && selectedMovie) {
      setMovieData({
        ...selectedMovie,
        actors: selectedMovie.actors.split(', '),
        rate: selectedMovie?.rate ? selectedMovie?.rate : 0,
      });
      setChips(selectedMovie.actors.split(', '));
    } else {
      setMovieData(emptyMovieData);
      setChips([]);
    }
  }, [isEdit, selectedMovie]);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleChangeChips = (newChips: any) => {
    setChips(newChips);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleErrorReset = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setErrors({
      ...errors,
      [e.target.name]: false,
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isError = false;
    let tempErrors = {};
    Object.keys(movieData).forEach((key) => {
      if (
        //@ts-ignore
        (typeof movieData[key] !== 'number' && !movieData[key].length) ||
        //@ts-ignore
        (typeof movieData[key] === 'number' && movieData[key] === 0)
      ) {
        // @ts-ignore
        tempErrors = {
          ...tempErrors,
          [key]: true,
        };

        isError = true;
      }
    });
    setErrors({
      ...errors,
      ...tempErrors,
    });
    if (isError) return;
    if (isEdit) {
      dispatch(
        editMovie({
          ...selectedMovie,
          ...movieData,
          actors: movieData.actors.join(', '),
          year: +movieData.year,
          runtime: +movieData.runtime,
          rate: +movieData.rate,
          id: selectedMovie?.id!,
        })
      );
      navigate('/movie/' + selectedMovie?.id);
    } else {
      const id = uuid();
      dispatch(
        addMovie({
          ...movieData,
          id,
          actors: movieData.actors.join(', '),
          year: +movieData.year,
          runtime: +movieData.runtime,
          rate: +movieData.rate,
        })
      );
      navigate('/movie/' + id);
    }
    setMovieData(emptyMovieData);
  };

  const handleAddChip = (actor: string) => {
    setMovieData({ ...movieData, actors: [...movieData.actors, actor] });
  };

  const handleDeleteChip = (actorToDelete: string) => {
    setMovieData({
      ...movieData,
      actors: movieData.actors.filter((a) => a !== actorToDelete),
    });
  };

  const setGenres = (value: string | string[]) => {
    setMovieData({
      ...movieData,
      genres: typeof value === 'string' ? value.split(',') : value,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='pl-2  mt-2 flex-grow flex flex-col'
      >
        <h2 className='pl-2 font-medium text-2xl'>
          {isEdit ? 'Редактирование' : 'Создание'}
        </h2>
        <div className='h-[0] pl-2 flex-grow overflow-y-scroll'>
          <div className='mt-4 flex flex-col gap-1 items-start'>
            <label htmlFor='title'>Название фильма</label>
            <input
              type='text'
              placeholder='Введите название фильма'
              id='title'
              name='title'
              value={movieData.title}
              onChange={handleChange}
              onFocus={handleErrorReset}
              className={`bg-[#ECF1F7] py-3 px-2 rounded-lg text-xs text-black/50 min-w-[325px] ${
                errors.title && 'bg-red-200 border border-red-300'
              }`}
            />
            {errors.title && (
              <p className='text-red-400 text-xs'>Обязательное поле</p>
            )}
          </div>
          <div className='mt-4 flex flex-col gap-1 items-start'>
            <label htmlFor='year'>Год выпуска</label>
            <input
              type='number'
              placeholder='Введите год выпуска'
              id='year'
              name='year'
              value={movieData.year}
              onChange={handleChange}
              onFocus={handleErrorReset}
              className={`bg-[#ECF1F7] py-3 px-2 rounded-lg text-xs text-black/50 min-w-[325px] ${
                errors.year && 'bg-red-200 border border-red-300'
              }`}
            />
            {errors.year && (
              <p className='text-red-400 text-xs'>Обязательное поле</p>
            )}
          </div>
          <div className='mt-4 flex flex-col gap-1'>
            <label htmlFor='plot'>Описание</label>
            <textarea
              placeholder='Введите описание ...'
              id='plot'
              name='plot'
              value={movieData.plot}
              onChange={handleChange}
              onFocus={handleErrorReset}
              className={`bg-[#ECF1F7] p-4 rounded-lg text-xs text-black/50 min-w-[325px] min-h-[150px] max-w-[640px] ${
                errors.plot && 'bg-red-200 border border-red-300'
              }`}
            />
            {errors.plot && (
              <p className='text-red-400 text-xs'>Обязательное поле</p>
            )}
          </div>
          <div className='mt-4 flex flex-col gap-1 items-start'>
            <label htmlFor='genres'>Укажите жанры</label>
            <MultipleSelectChip
              genres={movieData.genres}
              name='genres'
              setGenres={setGenres}
              error={errors.genres}
              setErrors={setErrors}
            />
            {errors.genres && (
              <p className='text-red-400 text-xs'>Обязательное поле</p>
            )}
          </div>
          <div className='mt-4 flex flex-col gap-1 items-start'>
            <label htmlFor='actors'>Укажите список актеров</label>
            <MuiChipsInput
              placeholder='Введите актеров (через enter)'
              className={`bg-[#ECF1F7] rounded-lg text-xs text-black/50 min-w-[325px] ${
                errors.actors && 'bg-red-200 border border-red-300'
              }`}
              id='actors'
              name='actors'
              onFocus={handleErrorReset}
              value={chips}
              onAddChip={handleAddChip}
              onDeleteChip={handleDeleteChip}
              onChange={handleChangeChips}
            />
            {errors.actors && (
              <p className='text-red-400 text-xs'>Обязательное поле</p>
            )}
          </div>
          <div className='mt-4 flex flex-col gap-1 items-start'>
            <label htmlFor='posterUrl'>Укажите ссылку на обложку</label>
            <input
              type='text'
              placeholder='Введите ссылку ...'
              id='posterUrl'
              name='posterUrl'
              value={movieData.posterUrl}
              onChange={handleChange}
              onFocus={handleErrorReset}
              className={`bg-[#ECF1F7] py-3 px-2 rounded-lg text-xs text-black/50 min-w-[325px] ${
                errors.posterUrl && 'bg-red-200 border border-red-300'
              }`}
            />
            {errors.posterUrl && (
              <p className='text-red-400 text-xs'>Обязательное поле</p>
            )}
          </div>
          <div className='mt-4 flex flex-col gap-1 items-start'>
            <label htmlFor='rate'>Рейтинг</label>
            <input
              type='number'
              min='0'
              max='10'
              step='any'
              placeholder='Задайте рейтинг'
              id='rate'
              name='rate'
              value={movieData.rate}
              onChange={handleChange}
              onFocus={handleErrorReset}
              className={`bg-[#ECF1F7] py-3 px-2 rounded-lg text-xs text-black/50 min-w-[325px] ${
                errors.rate && 'bg-red-200 border border-red-300'
              }`}
            />
            {errors.rate && (
              <p className='text-red-400 text-xs'>Обязательное поле</p>
            )}
          </div>
          <div className='mt-4 flex flex-col gap-1 items-start'>
            <label htmlFor='runtime'>Длительность</label>
            <input
              type='number'
              min='0'
              step='any'
              placeholder='Задайте длительность фильма'
              id='runtime'
              name='runtime'
              value={movieData.runtime}
              onChange={handleChange}
              onFocus={handleErrorReset}
              className={`bg-[#ECF1F7] py-3 px-2 rounded-lg text-xs text-black/50 min-w-[325px] ${
                errors.runtime && 'bg-red-200 border border-red-300'
              }`}
            />
            {errors.runtime && (
              <p className='text-red-400 text-xs'>Обязательное поле</p>
            )}
          </div>
          <div className='mt-4 mb-2 flex flex-col gap-1 items-start'>
            <label htmlFor='director'>Укажите режисера</label>
            <input
              type='text'
              placeholder='Введите ...'
              id='director'
              name='director'
              value={movieData?.director}
              onChange={handleChange}
              onFocus={handleErrorReset}
              className={`bg-[#ECF1F7] py-3 px-2 rounded-lg text-xs text-black/50 min-w-[325px]  ${
                errors.director && 'bg-red-200 border border-red-300'
              }`}
            />
          </div>
          {errors.director && (
            <p className='text-red-400 text-xs'>Обязательное поле</p>
          )}
        </div>
        <div className='flex items-center justify-end py-4 gap-5 border-t border-t-[#d9d9d9]'>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className='h-8 py-2 px-3 btn-drop-shadow bg-[#ECF1F7] transition duration-300 active:scale-[0.95] hover:opacity-90 rounded-lg text-xs text-[#336FEE]'
          >
            Отменить
          </button>
          <button
            type='submit'
            className='h-8 px-3 flex items-center gap-2 text-xs bg-primary transition duration-300 hover:bg-secondary btn-drop-shadow rounded-lg'
          >
            Сохранить
          </button>
        </div>
      </form>
    </>
  );
};

export default MovieForm;
