import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterState } from '../../types';

const initialState: FilterState = {
  isFilterOpen: false,
  filterStartYear: 1900,
  filterEndYear: new Date().getFullYear(),
  filterStartRuntime: 30,
  filterEndRuntime: 999,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
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
  },
});

export const {
  setIsFilterOpen,
  setFilterStartYear,
  setFilterEndYear,
  setFilterStartRuntime,
  setFilterEndRuntime,
} = filterSlice.actions;

export default filterSlice.reducer;
