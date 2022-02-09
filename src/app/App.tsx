import React from 'react';

import { Route, Routes } from 'react-router-dom';

import s from './App.module.scss';

import { CardList } from 'features/CardList';
import { Movie } from 'features/Movie/Movie';

const App = () => (
  <div className={s.app}>
    <Routes>
      <Route path="movie/:title" element={<Movie />} />
      <Route path="/" element={<CardList />} />
    </Routes>
  </div>
);

export default App;
