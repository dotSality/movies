import axios from 'axios';

import { FindMoviesDataType, MovieType } from 'bll/slices/movies-slice';

const instance = axios.create({
  baseURL: 'http://www.omdbapi.com',
});
const apikey = '2d429144';

export const moviesAPI = {
  getMovies(data: FindMoviesDataType) {
    return instance.get<GetMoviesResponseType & FindRejectType>(
      `?apikey=${apikey}&s=${data.title}&type=${data.type}`,
    );
  },
};

export type GetMoviesResponseType = {
  Response: string;
  Search: MovieType[];
  totalResults: string;
};

export type FindRejectType = {
  Response: string;
  Error: string;
};
