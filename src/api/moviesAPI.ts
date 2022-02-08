import axios from 'axios';

import { FindMoviesDataType } from 'bll/slices/movies-slice';

const instance = axios.create({
  baseURL: 'http://www.omdbapi.com',
});
const apikey = '2d429144';

export const moviesAPI = {
  getMovies(data: FindMoviesDataType) {
    return instance.get(`?apikey=${apikey}&s=${data.title}&type=${data.type}`);
  },
};
