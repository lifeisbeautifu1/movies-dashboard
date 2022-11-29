import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/movies',
});

// A mock function to mimic making an async request for data
export function getAllMovies() {
  return API.get('');
}

export function getMovie(id: string) {
  return API.get('/' + id);
}

const moviesService = {
  getAllMovies,
  getMovie,
};

export default moviesService;
