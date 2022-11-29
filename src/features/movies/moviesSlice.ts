import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../app/store';
import { IMovie } from '../../types';
import moviesService from './moviesService';

export interface MoviesState {
  loading: boolean;
  movies: IMovie[];
  selectedMovie: IMovie | null;
}

const initialState: MoviesState = {
  loading: false,
  movies: [],
  selectedMovie: null,
};

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async (_, thunikAPI) => {
    try {
      const { data } = await moviesService.getAllMovies();
      return data;
    } catch (error) {
      console.log(error);
      thunikAPI.rejectWithValue(error);
    }
    // const response = await fetchCount(amount);
    // // The value we return becomes the `fulfilled` action payload
    // return response.data;
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    decrement: (state) => {},
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { increment, decrement, incrementByAmount } = moviesSlice.actions;

export default moviesSlice.reducer;
