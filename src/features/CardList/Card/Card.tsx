import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useAppDispatch } from 'bll/hooks';
import { MovieType, openMovie } from 'bll/slices/movies-slice';

export const CardItem = ({ Poster, Title, Year }: Omit<MovieType, 'Type' | 'imdbID'>) => {
  const dispatch = useAppDispatch();

  const fetchMovie = () => {
    dispatch(openMovie(Title));
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        width: 400,
      }}
    >
      <div>
        <div
          style={{
            backgroundPosition: 'center',
            backgroundImage: `url(${Poster})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '300px',
          }}
        />
        <CardContent>
          <Typography
            sx={{ textAlign: 'center' }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {`${Title}, ${Year}`}
          </Typography>
        </CardContent>
      </div>
      <CardActions sx={{ justifyContent: 'center' }}>
        <NavLink style={{ textDecoration: 'none' }} to={`movie/${Title}`}>
          <Button onClick={fetchMovie} size="large">
            Learn More
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
};
