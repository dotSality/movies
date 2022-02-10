import axios from 'axios';

import { FindMoviesDataType, MovieType } from 'bll/slices/movies-slice';

const instance = axios.create({
  baseURL: 'http://www.omdbapi.com',
});
const apikey = '2d429144';
const defaultPage: number = 1;

export const moviesAPI = {
  getMovies(data: FindMoviesDataType, page = defaultPage) {
    return instance.get<GetMoviesResponseType & FindRejectType>(
      `?apikey=${apikey}&s=${data.title}&type=${data.type}&page=${page}`,
    );
  },
  getCurrentMovie(title: string) {
    return instance.get<CurrentMovieType>(`?apikey=${apikey}&t=${title}`);
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

export type CurrentMovieType = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    {
      Source: string;
      Value: string;
    },
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};
