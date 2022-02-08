import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
  },
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus } = slice.actions;

type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
