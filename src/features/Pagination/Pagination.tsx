import { Button, Stack } from '@mui/material';

import s from './Pagination.module.scss';

import { useAppDispatch, useAppSelector } from 'bll/hooks';
import { findMovies } from 'bll/slices/movies-slice';

type PropsType = {
  title: string;
  type: string;
};

export const Pagination = ({ title, type }: PropsType) => {
  const dispatch = useAppDispatch();
  const { totalResults, page } = useAppSelector(state => state.movies);
  const moviesOnPage = 10;
  let pages: number[] = [];
  if (totalResults && page) {
    const pagesCount = Math.ceil(totalResults / moviesOnPage);
    const currentPage = page;
    if (currentPage && pagesCount <= 9) {
      for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i);
      }
    } else if (currentPage >= 6 && currentPage < pagesCount - 6) {
      for (let i = currentPage - 4; i <= currentPage + 4; i += 1) {
        pages.push(i);
      }
    } else if (currentPage <= 6) {
      pages = Array(9)
        .fill(0)
        .map((_, i) => i + 1);
    } else {
      for (let i = pagesCount - 8; i < pagesCount; i += 1) {
        pages.push(i);
      }
    }
  }

  const onPageChange = (nextPage: number) =>
    dispatch(findMovies({ findData: { title, type }, page: nextPage }));

  const mappedPages = pages.map((el, i) => (
    <Button
      sx={{
        marginLeft: i === 0 ? '16px' : '0',
      }}
      key={el}
      onClick={() => onPageChange(el)}
      size="large"
      variant={el === page ? 'contained' : 'outlined'}
    >
      {el}
    </Button>
  ));

  return (
    <div className={s.paginator}>
      <Stack
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '0 10px',
        }}
        spacing={2}
        direction="row"
      >
        {mappedPages}
      </Stack>
    </div>
  );
};
