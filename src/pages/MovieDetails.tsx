import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiCopy } from "react-icons/bi";
import { BsHeart, BsFillHeartFill, BsHeartFill } from "react-icons/bs";
import {
  PencilSquareIcon,
  ChevronRightIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";

import { Loader } from "../components";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  getMovie,
  setIsEdit,
  addToFavourite,
  removeFromFavourites,
} from "../features/movies/moviesSlice";

const MovieDetials = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { selectedMovie, isLoading, favourites } = useAppSelector(
    (state) => state.movies
  );

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (!isLoading)
      tippy("#clipboard-btn", {
        content: "Скопировать",
      });
  }, [isLoading]);

  useEffect(() => {
    if (id) dispatch(getMovie(id));
  }, [id, dispatch]);

  const saveToClipboard = () => {
    navigator.clipboard.writeText(String(selectedMovie?.id));
  };

  const onEdit = () => {
    dispatch(setIsEdit(true));
    navigate("/movie/form");
  };

  const isFavourite = !!favourites.find(
    (movie) => movie.id === selectedMovie?.id
  );

  console.log(isFavourite);

  if (!selectedMovie) {
    return (
      <section className="w-full h-full flex items-center justify-center">
        <h2 className="py-2 px-3 rounded-lg bg-[#ECF1F7] text-sm">
          Фильм с номером {id} не найден
        </h2>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-full py-4 pl-8">
      {isLoading ? (
        <div className="w-full h-full flex flex-grow items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex items-center pl-2 justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm flex items-center gap-4">
                Id: {selectedMovie?.id}
                <BiCopy
                  onClick={saveToClipboard}
                  id="clipboard-btn"
                  className="w-5 h-5 cursor-pointer outline-none"
                />
              </div>
              <div
                className="text-sm px-2 py-2 flex items-center gap-2 hover:bg-gray-100 rounded transition cursor-pointer"
                onClick={() => {
                  isFavourite
                    ? dispatch(removeFromFavourites(selectedMovie))
                    : dispatch(addToFavourite(selectedMovie));
                }}
              >
                {isFavourite ? (
                  <>
                    <BsHeartFill className="text-xl text-red-500" />
                    Убрать из избранного
                  </>
                ) : (
                  <>
                    <BsHeart className="text-xl" />
                    Добавить в избранное
                  </>
                )}
              </div>
            </div>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 h-8 px-2 bg-transparent hover:bg-[#429bf9]/20 rounded-lg transition duration-300 hover:text-[#336FEE]"
            >
              <PencilSquareIcon className="h-6 w-6" />
              Редактировать
            </button>
          </div>
          <div className="mt-5 flex flex-col lg:flex-row  gap-3">
            <div className="w-[200px] h-[300px]">
              {!isImageLoaded && (
                <div className="flex animate-pulse justify-center items-center w-full h-full bg-gray-300 rounded  dark:bg-gray-700">
                  <CameraIcon className="w-12 h-12 text-gray-200" />
                </div>
              )}
              <img
                src={selectedMovie?.posterUrl}
                className={`${
                  !isImageLoaded && "hidden"
                } w-full h-full object-cover`}
                onError={() => setIsImageLoaded(false)}
                onLoad={() => {
                  setIsImageLoaded(true);
                }}
                alt="poster"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <h2 className="font-medium text-2xl">{selectedMovie?.title}</h2>
              <h3 className="mt-2 font-medium text-[#6c6c6c]">
                {selectedMovie?.director}
              </h3>
              <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between mt-4">
                <div className="flex flex-col">
                  <h3 className="font-medium">Параметры</h3>
                  <div className="h-12 flex items-center gap-6">
                    <p className="text-[#6c6c6c] min-w-[160px]">
                      Год производства
                    </p>
                    <p>{selectedMovie?.year}</p>
                  </div>
                  <div className="h-12 flex items-center gap-6">
                    <p className="text-[#6c6c6c] min-w-[160px]">Длительность</p>
                    <p>{selectedMovie?.runtime} мин.</p>
                  </div>
                  <div className="h-12 flex items-center gap-6">
                    <p className="text-[#6c6c6c] min-w-[160px]">Жанры</p>
                    <p>{selectedMovie?.genres.slice(0, 3).join(", ")}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-medium flex items-center gap-1 cursor-pointer">
                    В главных ролях
                    <ChevronRightIcon className="h-6 w-6" />
                  </h3>
                  <ul className="flex flex-col mt-4 gap-[6px]">
                    {selectedMovie?.actors
                      .split(", ")
                      .slice(0, 4)
                      .map((actor) => (
                        <li key={actor}>{actor}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4 md:mt-12">
            <h2 className="text-xl font-medium">Описание</h2>
            <p className="mt-2 md:mt-6">{selectedMovie?.plot}</p>
          </div>
          <div className="flex items-center mt-4 gap-12">
            <p className="font-medium">Текущий рейтинг</p>
            <span className="text-[32px] font-bold text-[#6c6c6c]">
              {selectedMovie?.rate
                ? selectedMovie?.rate
                : (Math.random() * 10).toFixed(1)}
            </span>
          </div>
        </>
      )}
    </section>
  );
};

export default MovieDetials;
