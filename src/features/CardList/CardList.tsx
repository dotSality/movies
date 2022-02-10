import React from 'react';

import s from './CardList.module.scss';

import defaultPoster from 'assets/img/default-poster.jpg';
import { useAppSelector } from 'bll/hooks';
import { CardItem } from 'features/CardList/Card/Card';
import { MenuBar } from 'features/MenuBar';
import { Pagination } from 'features/Pagination/Pagination';

export const CardList = () => {
  const { movies } = useAppSelector(state => state.movies);
  const { title, type } = useAppSelector(state => state.app);
  const mappedItems = movies.map(({ Poster, Title, Year, imdbID }) => (
    <div className={s.item} key={imdbID}>
      <CardItem
        Poster={Poster !== 'N/A' ? Poster : defaultPoster}
        Title={Title}
        Year={Year}
      />
    </div>
  ));
  return (
    <div>
      <MenuBar />
      <div className={s.itemContainer}>{mappedItems}</div>
      <Pagination title={title!} type={type!} />
    </div>
  );
};
