import React from 'react';

import s from './App.module.scss';

import { MenuBar } from 'features/MenuBar';

const App = () => (
  <div className={s.app}>
    <MenuBar />
  </div>
);

export default App;
