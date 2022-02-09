import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import s from './Movie.module.scss';

import { useAppSelector } from 'bll/hooks';

export const Movie = () => {
  const {
    Title,
    Year,
    imdbRating,
    Awards,
    Country,
    Genre,
    Language,
    Metascore,
    Plot,
    Poster,
    Rated,
    Writer,
    Actors,
  } = useAppSelector(state => state.movies.movie);
  return (
    <div className={s.main}>
      <Card sx={{ width: 400 }}>
        <div
          style={{
            backgroundPosition: 'center',
            backgroundImage: `url(${Poster})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '600px',
          }}
        />
        <div>
          <CardContent>
            <Typography variant="h5" component="div">
              {Title}
            </Typography>
            <Typography variant="h6" component="div">
              {Year}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {imdbRating}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Awards}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Country}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Genre}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Plot}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Language}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Rated}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Metascore}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Writer}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {Actors}
            </Typography>
          </CardContent>
        </div>
        <CardActions sx={{ justifyContent: 'center' }}>
          <NavLink style={{ textDecoration: 'none' }} to="/">
            <Button size="large">Go back</Button>
          </NavLink>
        </CardActions>
      </Card>
    </div>
  );
};
