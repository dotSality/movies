import React from 'react';

import s from './CardList.module.scss';

import { useAppSelector } from 'bll/hooks';
import { CardItem } from 'features/CardList/Card/Card';
import { MenuBar } from 'features/MenuBar';

export const CardList = () => {
  const { movies } = useAppSelector(state => state.movies);
  const mappedItems = movies.map(el => (
    <div className={s.item} key={el.imdbID}>
      <CardItem Poster={el.Poster} Title={el.Title} Year={el.Year} />
    </div>
  ));
  return (
    <div>
      <MenuBar />
      <div className={s.itemContainer}>{mappedItems}</div>
    </div>
  );
};
