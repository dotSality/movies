import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { findMovies, FindMoviesDataType } from 'bll/slices/movies-slice';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    title: null as string | null,
    type: null as string | null,
    error: null as string | null,
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload;
    },
    setFormValues(state, action: PayloadAction<FindMoviesDataType>) {
      state.title = action.payload.title;
      state.type = action.payload.type;
    },
    setAppError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(findMovies.rejected, (state, action) => {
      if (action.payload) state.error = action.payload?.Error;
    });
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus, setFormValues, setAppError } = slice.actions;

type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
