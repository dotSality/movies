import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  CurrentMovieType,
  FindRejectType,
  GetMoviesResponseType,
  moviesAPI,
} from 'api/moviesAPI';
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
        return res.data;
      }
      dispatch(setAppStatus({ status: 'failed' }));
      return rejectWithValue({ Response: res.data.Response, Error: res.data.Error });
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const openMovie = createAsyncThunk(
  `movies/openMovie`,
  async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: 'loading' }));
    try {
      const res = await moviesAPI.getCurrentMovie(title);
      if (res.data.Response === 'True') {
        dispatch(setAppStatus({ status: 'succeeded' }));
        return res.data;
      }
      dispatch(setAppStatus({ status: 'failed' }));
      return rejectWithValue({});
    } catch (e: any) {
      return rejectWithValue({});
    }
  },
);

const slice = createSlice({
  name: 'movies',
  initialState: {
    movies: [] as MovieType[],
    totalResults: null as string | null,
    movie: {} as CurrentMovieType,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(findMovies.fulfilled, (state, action) => {
      state.movies = action.payload.Search;
    });
    builder.addCase(openMovie.fulfilled, (state, action) => {
      state.movie = action.payload;
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
