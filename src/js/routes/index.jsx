import React from 'react';

import {
  Route,
  IndexRoute
} from 'react-router';

import App from '../App';
import Home from '../components/Home';
import Test from '../components/Test';
import DevSandbox from '../components/DevSandbox';
import Http404 from '../components/Http404';

export default (
  <Route
    path='/'
    component={ App }>

    <IndexRoute
      component={ Home } />

    <Route
      path='/test'
      component={ Test } />

    <Route
      path='/dev-sandbox'
      component={ DevSandbox } />

    <Route
      path='*'
      component={ Http404 } />
  </Route>
);
