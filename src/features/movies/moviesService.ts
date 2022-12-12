import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/movies',
});

export function getAllMovies() {
  return API.get('');
}

export function getMovie(id: string) {
  return API.get('/' + id);
}

export function searchMovies(queryString: string) {
  return API.get(queryString);
}

export function editMovie(id: string | number, movieData: IMovie) {
  return API.patch('/' + id, movieData);
}

export function addMovie(movieData: IMovie) {
  return API.post('/', movieData);
}

export function getGenres() {
  return axios.get('http://localhost:3001/genres');
}

const moviesService = {
  getAllMovies,
  getMovie,
  searchMovies,
  editMovie,
  addMovie,
  getGenres,
};

export default moviesService;
