import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { FindRejectType, GetMoviesResponseType, moviesAPI } from 'api/moviesAPI';
import { setAppStatus } from 'bll/slices/app-slice';

export const findMovies = createAsyncThunk<
  GetMoviesResponseType,
  FindMoviesDataType,
  { rejectValue: FindRejectType }
>(
  'movies/findMovies',
  async (data: FindMoviesDataType, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }));
    try {
      const res = await moviesAPI.getMovies(data);
      if (res.data.Response === 'True') {
        dispatch(setAppStatus({ status: 'succeeded' }));
        console.log(res.data);
        return res.data;
      }
      console.log(res.data);
      dispatch(setAppStatus({ status: 'failed' }));
      return rejectWithValue({ Response: res.data.Response, Error: res.data.Error });
    } catch (e: any) {
      console.log(e.message);
      return rejectWithValue(e.message);
    }
  },
);

const slice = createSlice({
  name: 'movies',
  initialState: {
    movies: [] as MovieType[],
    totalResults: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(findMovies.fulfilled, (state, action) => {
      state.movies = action.payload.Search;
    });
  },
});

export const moviesReducer = slice.reducer;

export type FindMoviesDataType = {
  title: string;
  type: string;
};

export type MovieType = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};
