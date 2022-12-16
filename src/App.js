import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import MainPage from './pages/mainPage';
import CoverPage from './pages/coverPage';

const App = () => {
  return (
    <div>
      <HashRouter>
        <div>
          <Route path='/' exact component={CoverPage} />
          <Route path='/main' component={MainPage} />
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
