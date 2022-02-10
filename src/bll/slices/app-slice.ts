import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FindMoviesDataType } from 'bll/slices/movies-slice';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    title: null as string | null,
    type: null as string | null,
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload;
    },
    setFormValues(state, action: PayloadAction<FindMoviesDataType>) {
      state.title = action.payload.title;
      state.type = action.payload.type;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus, setFormValues } = slice.actions;

type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
