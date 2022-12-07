import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../../types/movie';
import moviesService from './moviesService';

export interface MoviesState {
  isLoading: boolean;
  isMoviesLoading: boolean;
  isEdit: boolean;
  movies: IMovie[];
  genres: string[];
  selectedMovie: IMovie | null;
  isFilterOpen: boolean;
  filterStartYear: number;
  filterEndYear: number;
  filterStartRuntime: number;
  filterEndRuntime: number;
  includedGenres: string[];
}

const initialState: MoviesState = {
  isLoading: false,
  isMoviesLoading: false,
  isEdit: false,
  movies: [],
  genres: [],
  selectedMovie: null,
  isFilterOpen: false,
  filterStartYear: 1900,
  filterEndYear: new Date().getFullYear(),
  filterStartRuntime: 30,
  filterEndRuntime: 999,
  includedGenres: [],
};

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async (_, thunkAPI) => {
    try {
      const { data } = await moviesService.getAllMovies();
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGenres = createAsyncThunk(
  'movies/getGenres',
  async (_, thunkAPI) => {
    try {
      const { data } = await moviesService.getGenres();
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMovie = createAsyncThunk(
  'movies/getMovie',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await moviesService.getMovie(id);
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async (movieData: IMovie, thunkAPI) => {
    try {
      const { data } = await moviesService.addMovie(movieData);
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const editMovie = createAsyncThunk(
  'movies/editMovie',
  async (movieData: IMovie, thunkAPI) => {
    try {
      const { data } = await moviesService.editMovie(movieData?.id, movieData);
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (searchTerm: string, thunkAPI: any) => {
    try {
      const startYear = thunkAPI.getState().movies.filterStartYear;
      const endYear = thunkAPI.getState().movies.filterEndYear;
      const startRuntime = thunkAPI.getState().movies.filterStartRuntime;
      const endRuntime = thunkAPI.getState().movies.filterEndRuntime;
      const queryString = `?title_like=${searchTerm}&year_gte=${startYear}&year_lte=${endYear}&runtime_gte=${startRuntime}&runtime_lte=${endRuntime}`;
      const { data } = await moviesService.searchMovies(queryString);
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<IMovie>) => {
      state.selectedMovie = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    setIsFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload;
    },
    setFilterStartYear: (state, action: PayloadAction<number>) => {
      state.filterStartYear = action.payload;
    },
    setFilterEndYear: (state, action: PayloadAction<number>) => {
      state.filterEndYear = action.payload;
    },
    setFilterStartRuntime: (state, action: PayloadAction<number>) => {
      state.filterStartRuntime = action.payload;
    },
    setFilterEndRuntime: (state, action: PayloadAction<number>) => {
      state.filterEndRuntime = action.payload;
    },
    addToIncludedGenres: (state, action: PayloadAction<string>) => {
      state.includedGenres.push(action.payload);
    },
    removeFromIncludedGenres: (state, action: PayloadAction<string>) => {
      state.includedGenres = state.includedGenres.filter(
        (genre) => genre !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isMoviesLoading = true;
      })
      .addCase(
        getMovies.fulfilled,
        (state, action: PayloadAction<IMovie[]>) => {
          state.isMoviesLoading = false;
          state.movies = action.payload;
        }
      )
      .addCase(getMovies.rejected, (state) => {
        state.isMoviesLoading = false;
      })
      .addCase(getGenres.pending, (state) => {
        state.isMoviesLoading = true;
      })
      .addCase(
        getGenres.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.isMoviesLoading = false;
          state.genres = action.payload;
        }
      )
      .addCase(getGenres.rejected, (state) => {
        state.isMoviesLoading = false;
      })
      .addCase(searchMovies.pending, (state) => {
        state.isMoviesLoading = true;
      })
      .addCase(
        searchMovies.fulfilled,
        (state, action: PayloadAction<IMovie[]>) => {
          state.isMoviesLoading = false;
          state.movies = action.payload.filter((movie) => {
            return state.includedGenres.every((genre) =>
              movie.genres.includes(genre)
            );
          });
        }
      )
      .addCase(searchMovies.rejected, (state) => {
        state.isMoviesLoading = false;
      })
      .addCase(getMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovie.fulfilled, (state, action: PayloadAction<IMovie>) => {
        state.isLoading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(getMovie.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<IMovie>) => {
        state.isLoading = false;
        state.selectedMovie = action.payload;
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMovie.fulfilled, (state, action: PayloadAction<IMovie>) => {
        state.isLoading = false;
        state.selectedMovie = action.payload;
        state.movies = state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        );
      })
      .addCase(editMovie.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setSelectedMovie,
  setIsEdit,
  setIsFilterOpen,
  setFilterStartYear,
  setFilterEndYear,
  setFilterStartRuntime,
  setFilterEndRuntime,
  addToIncludedGenres,
  removeFromIncludedGenres,
} = moviesSlice.actions;

export default moviesSlice.reducer;
