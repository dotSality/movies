import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setAppStatus, setFormValues } from 'bll/slices/app-slice';
import {
  CurrentMovieType,
  FindRejectType,
  GetMoviesResponseType,
  moviesAPI,
} from 'dal/api/moviesAPI';

export const findMovies = createAsyncThunk<
  { movies: GetMoviesResponseType; page: number },
  { findData: FindMoviesDataType; page: number },
  { rejectValue: FindRejectType }
>(
  'movies/findMovies',
  async (
    data: { findData: FindMoviesDataType; page: number },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(setAppStatus('loading'));
    try {
      const res = await moviesAPI.getMovies(data.findData, data.page);
      if (res.data.Response === 'True') {
        dispatch(setAppStatus('succeeded'));
        dispatch(setFormValues(data.findData));
        return { movies: res.data, page: data.page };
      }
      dispatch(setAppStatus('failed'));
      return rejectWithValue({
        Response: res.data.Response,
        Error: res.data.Error !== 'Incorrect IMDb ID.' ? res.data.Error : 'Enter title',
      });
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

export const openMovie = createAsyncThunk(
  `movies/openMovie`,
  async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus('loading'));
    try {
      const res = await moviesAPI.getCurrentMovie(title);
      if (res.data.Response === 'True') {
        dispatch(setAppStatus('succeeded'));
        return res.data;
      }
      dispatch(setAppStatus('failed'));
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
    totalResults: null as number | null,
    movie: {} as CurrentMovieType,
    page: null as number | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(findMovies.pending, state => {
      state.movies = [];
      state.page = null;
      state.totalResults = null;
    });
    builder.addCase(findMovies.fulfilled, (state, action) => {
      state.movies = action.payload.movies.Search;
      state.totalResults = +action.payload.movies.totalResults;
      state.page = +action.payload.page;
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
