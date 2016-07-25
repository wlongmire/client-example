import React from 'react';

import {
  Route,
  IndexRoute
} from 'react-router';

import App from 'components/app';
import Home from 'routes/Home';
import DevSandbox from 'routes/DevSandbox';
import Http404 from 'routes/Http404';

export default (
  <Route
    path='/'
    component={ App }>

    <IndexRoute
      component={ Home } />

    <Route
      path='/dev-sandbox'
      component={ DevSandbox } />

    <Route
      path='*'
      component={ Http404 } />
  </Route>
);
