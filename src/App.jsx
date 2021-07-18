import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders.jsx'

const App = () => {
  return (
    <HashRouter>
      <Route exact path='/' component={Orders}/>
    </HashRouter>
  )
}

export default App;