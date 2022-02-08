import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from 'bll/slices/app-slice';
import { moviesReducer } from 'bll/slices/movies-slice';

const reducers = {
  movies: moviesReducer,
  app: appReducer,
};

export const store = configureStore({
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
