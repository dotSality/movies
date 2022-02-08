import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { moviesAPI } from 'api/moviesAPI';
import { setAppStatus } from 'bll/slices/app-slice';

export const findMovies = createAsyncThunk(
  'movies/findMovies',
  // eslint-disable-next-line consistent-return
  async (data: FindMoviesDataType, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }));
    try {
      const res = await moviesAPI.getMovies(data);
      dispatch(setAppStatus({ status: 'succeeded' }));
      console.log(res);
    } catch (e: any) {
      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'movies',
  initialState: {},
  reducers: {},
});

export const moviesReducer = slice.reducer;

export type FindMoviesDataType = {
  title: string;
  type: string;
};
