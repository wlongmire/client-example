import React from 'react';

import {
  Route,
  IndexRoute
} from 'react-router';

import App from '../containers/App';
import Home from '../components/Home';
import Test from '../components/Test';

export default (
  <Route
    path='/'
    component={ App }>

    <IndexRoute
      component={ Home }
      onEnter={ handleRouteChange } />

    <Route
      path='/test'
      component={ Test }
      onEnter={ handleRouteChange } />
  </Route>
);
