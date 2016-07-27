
'use strict';

require('../sass/main.scss');
require('font-awesome-sass-loader');

import React from 'react';
import { render } from 'react-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import onReady from './utils/onReady';
import store from './store';
import routes from './routes';
// import ga from 'react-ga';

import config from 'config';

// if (config.env === 'production') {
//   ga.initialize(config.analytics.ua);
// }

import {
  Router,
  browserHistory
} from 'react-router';

import {
  syncHistoryWithStore,
  routerReducer
} from 'react-router-redux';

const history = syncHistoryWithStore(
  browserHistory,
  store
);

// Routing middleware

history.listen(() => {
  window.scrollTo(0, 0);

  let route = window.location.pathname;

  // if (config.env === 'production') {
  //   ga.pageview(route);
  // }

  console.log('route change:', route);
});

// Initialize the app

onReady(() => {
  const container = document.getElementsByClassName(
    'app-container'
  )[0];

  render(
    <Provider store={ store }>
      <Router
        history={ history }
        routes={ routes }
      />
    </Provider>,
    container
  );
});
