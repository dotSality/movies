import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import s from './Movie.module.scss';

import { useAppSelector } from 'bll/hooks';

export const Movie = () => {
  const navigate = useNavigate();
  const backPage = -1;
  const onReturnHandler = () => navigate(backPage);
  const status = useAppSelector(state => state.app.status);
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
      {status === 'loading' ? (
        <div
          style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Card sx={{ width: 400 }}>
          <div
            style={{
              backgroundPosition: 'center',
              backgroundImage: `url(${Poster})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              height: '400px',
            }}
          />
          <div>
            <CardContent>
              <Typography variant="h5" component="div">
                <b>Title:</b> {Title}
              </Typography>
              {Year !== 'N/A' && (
                <Typography variant="h6" component="div">
                  <b>Year:</b> {Year}
                </Typography>
              )}
              {imdbRating !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Imdb Rating:</b> {imdbRating}
                </Typography>
              )}
              {Awards !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Awards:</b> {Awards}
                </Typography>
              )}
              {Country !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Country:</b> {Country}
                </Typography>
              )}
              {Genre !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Genre:</b> {Genre}
                </Typography>
              )}
              {Plot !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Plot:</b> {Plot}
                </Typography>
              )}
              {Language !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Language:</b> {Language}
                </Typography>
              )}
              {Rated !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Rated:</b> {Rated}
                </Typography>
              )}
              {Metascore !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Metascore:</b> {Metascore}
                </Typography>
              )}
              {Writer !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Writter:</b> {Writer}
                </Typography>
              )}
              {Actors !== 'N/A' && (
                <Typography variant="subtitle1" component="div">
                  <b>Actors:</b> {Actors}
                </Typography>
              )}
            </CardContent>
          </div>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button onClick={onReturnHandler} size="large">
              Back to list
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};
