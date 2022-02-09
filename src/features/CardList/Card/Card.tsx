import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

import { MovieType } from 'bll/slices/movies-slice';

export const CardItem = ({ Poster, Title, Type, Year }: Omit<MovieType, 'imdbID'>) => (
  <Card sx={{ width: 400 }}>
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
      <Typography gutterBottom variant="h5" component="div">
        {Title}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        {Type}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        {Year}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);
