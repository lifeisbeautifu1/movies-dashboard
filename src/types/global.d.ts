export {};

declare global {
  interface IMovie {
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

  interface IMovieForm {
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
}
