import React from 'react';

import {
  Route,
  IndexRoute
} from 'react-router';

import App from 'components/App';
import Home from 'routes/Home';
import RatingResults from 'components/RatingResults';
import Http404 from 'routes/Http404';

export default (
  <Route
    path='/'
    component={App}
  >
    <IndexRoute
      component={Home}
    />
    <Route
      path='quote'
      component={RatingResults}
    />
    <Route
      path='*'
      component={Http404}
    />
  </Route>
);
