
'use strict';

import styles from '../sass/main.scss';
import fontAwesome from 'font-awesome-sass-loader';

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import onReady from './utils/onReady';

import {reducer as formReducer} from 'redux-form';

// import configureStore from './store';
import routes from './routes';

// import ga from 'react-ga';

import config from 'config';

// if (config.env === 'production') {
//   ga.initialize(config.analytics.ua);
// }

import {
  Router,
  Route,
  browserHistory
} from 'react-router';

import {
  syncHistoryWithStore,
  routerReducer
} from 'react-router-redux';

const reducers = {
  form: formReducer
};


// const store = configureStore(browserHistory);
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);

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
