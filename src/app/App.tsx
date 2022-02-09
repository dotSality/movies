import React from 'react';

import s from './App.module.scss';

import { CardList } from 'features/CardList';
import { MenuBar } from 'features/MenuBar';

const App = () => (
  <div className={s.app}>
    <MenuBar />
    <CardList />
  </div>
);

export default App;
