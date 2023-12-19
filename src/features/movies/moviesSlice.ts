import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import moviesService from "./moviesService";
import { IMovie, MoviesState } from "../../types";

const initialState: MoviesState = {
  isLoading: false,
  isMoviesLoading: false,
  isEdit: false,
  genres: [],
  includedGenres: [],
  movies: [],
  selectedMovie: null,
  favourites: [],
};

export const getMovies = createAsyncThunk(
  "movies/getMovies",
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
  "movies/getGenres",
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

export const getFavourites = createAsyncThunk(
  "movies/getAllFavourites",
  async (_, thunkAPI) => {
    try {
      const { data } = await moviesService.getFavourites();
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMovie = createAsyncThunk(
  "movies/getMovie",
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
  "movies/addMovie",
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

export const addToFavourite = createAsyncThunk(
  "movies/addToFavourite",
  async (movieData: IMovie, thunkAPI) => {
    try {
      const { data } = await moviesService.addToFavourite(movieData);
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const editMovie = createAsyncThunk(
  "movies/editMovie",
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

export const removeFromFavourites = createAsyncThunk(
  "movies/removeFromFavourites",
  async (movieData: IMovie, thunkAPI) => {
    try {
      const { data } = await moviesService.removeFromFavourites(movieData?.id);
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (searchTerm: string, thunkAPI: any) => {
    try {
      const startYear = thunkAPI.getState().filter.filterStartYear;
      const endYear = thunkAPI.getState().filter.filterEndYear;
      const startRuntime = thunkAPI.getState().filter.filterStartRuntime;
      const endRuntime = thunkAPI.getState().filter.filterEndRuntime;
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
  name: "movies",
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<IMovie>) => {
      state.selectedMovie = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
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
      .addCase(getFavourites.rejected, (state) => {
        state.isMoviesLoading = false;
      })
      .addCase(getFavourites.pending, (state) => {
        state.isMoviesLoading = true;
      })
      .addCase(
        getFavourites.fulfilled,
        (state, action: PayloadAction<IMovie[]>) => {
          state.isMoviesLoading = false;
          state.favourites = action.payload;
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
      .addCase(addToFavourite.rejected, (state) => {
        // state.isLoading = false;
      })
      .addCase(addToFavourite.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(
        addToFavourite.fulfilled,
        (state, action: PayloadAction<IMovie>) => {
          // state.isLoading = false;
          // state.selectedMovie = action.payload;
          state.favourites.push(action.payload);
          // state.movies.push(action.payload);
        }
      )
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
      })
      .addCase(removeFromFavourites.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(
        removeFromFavourites.fulfilled,
        (state, action: PayloadAction<IMovie>) => {
          // state.isLoading = false;
          // state.selectedMovie = action.payload;
          state.favourites = state.favourites.filter(
            (movie) => movie.id !== state.selectedMovie?.id
          );
        }
      )
      .addCase(removeFromFavourites.rejected, (state) => {
        // state.isLoading = false;
      });
  },
});

export const {
  setSelectedMovie,
  setIsEdit,
  addToIncludedGenres,
  removeFromIncludedGenres,
} = moviesSlice.actions;

export default moviesSlice.reducer;
