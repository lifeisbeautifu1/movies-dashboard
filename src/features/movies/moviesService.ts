import axios from "axios";

import { IMovie } from "../../types";

const API = axios.create({
  baseURL: "http://localhost:3001/movies",
});

export function getAllMovies() {
  return API.get("");
}

export function getMovie(id: string) {
  return API.get("/" + id);
}

export function searchMovies(queryString: string) {
  return API.get(queryString);
}

export function editMovie(id: string | number, movieData: IMovie) {
  return API.patch("/" + id, movieData);
}

export function addMovie(movieData: IMovie) {
  return API.post("/", movieData);
}

export function getGenres() {
  return axios.get("http://localhost:3001/genres");
}

export function getFavourites() {
  return axios.get("http://localhost:3001/favourites");
}

export function addToFavourite(movieData: IMovie) {
  return axios.post("http://localhost:3001/favourites", movieData);
}

export function removeFromFavourites(id: string | number) {
  return axios.delete(`http://localhost:3001/favourites/${id}`);
}

const moviesService = {
  getAllMovies,
  getMovie,
  searchMovies,
  editMovie,
  addMovie,
  getGenres,
  getFavourites,
  addToFavourite,
  removeFromFavourites,
};

export default moviesService;
