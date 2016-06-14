
'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import onReady from './utils/onReady';
import store from './store';
import routes from './routes';

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

history.listen(() => {
  console.log('route change', new Date());
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
