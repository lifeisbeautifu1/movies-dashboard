import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
