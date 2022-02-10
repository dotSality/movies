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
  const pages: number[] = [];
  if (totalResults && page) {
    const pagesCount = Math.ceil(totalResults / moviesOnPage);
    const currentPage = page;
    if (currentPage && pagesCount <= 10) {
      for (let i = 1; i <= pagesCount; i += 1) {
        pages.push(i);
      }
    } else if (currentPage > 6 && currentPage < pagesCount - 6) {
      for (let i = currentPage - 5; i < currentPage + 5; i += 1) {
        pages.push(i);
      }
    } else {
      for (let i = pagesCount - 10; i <= pagesCount; i += 1) {
        pages.push(i);
      }
    }
  }

  const onPageChange = (nextPage: number) =>
    dispatch(findMovies({ findData: { title, type }, page: nextPage }));

  const mappedPages = pages.map(el => (
    <Button key={el} onClick={() => onPageChange(el)} size="large" variant="outlined">
      {el}
    </Button>
  ));

  return (
    <div className={s.paginator}>
      <Stack spacing={2} direction="row">
        {mappedPages}
      </Stack>
    </div>
  );
};
