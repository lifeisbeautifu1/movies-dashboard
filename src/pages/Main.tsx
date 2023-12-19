import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Navbar, Sidebar } from "../components";
import { useAppDispatch } from "../app/hooks";
import {
  getMovies,
  getGenres,
  getFavourites,
} from "../features/movies/moviesSlice";

const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getGenres());
    dispatch(getFavourites());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="px-6 h-[calc(100vh-60px)] my-2 grid grid-cols-12 overflow-y-scroll">
        <Sidebar />
        <div className="col-span-8 flex flex-col">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Main;
