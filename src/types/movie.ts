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

export interface IMovieData {
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
