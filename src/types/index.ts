export interface IMovie {
  id: number | string;
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  rate?: number;
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}

export interface IMovieForm {
  title: string;
  director: string;
  year: number;
  plot: string;
  rate: number;
  actors: string[];
  genres: string[];
  runtime: number;
  posterUrl: string;
}

export interface MoviesState {
  isLoading: boolean;
  isMoviesLoading: boolean;
  isEdit: boolean;
  movies: IMovie[];
  selectedMovie: IMovie | null;
  genres: string[];
  includedGenres: string[];
  favourites: IMovie[];
}

export interface FilterState {
  isFilterOpen: boolean;
  filterStartYear: number;
  filterEndYear: number;
  filterStartRuntime: number;
  filterEndRuntime: number;
}
