import React from 'react';
// import ga from 'react-ga';

import {
  Route,
  IndexRoute
} from 'react-router';

import App from '../containers/App';
import Home from '../components/Home';

function handleRouteChange (nextState) {
  window.scrollTo(0, 0);
  // ga.pageview(nextState.location.pathname);
}

export default (
  <Route
    path='/'
    component={ App }>
    <IndexRoute
      component={ Home }
      onEnter={ handleRouteChange } />
  </Route>
);
