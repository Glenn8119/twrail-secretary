import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import MainPage from './MainPage'
import CoverPage from './CoverPage'

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
  )
}

export default App
