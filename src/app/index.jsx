'use strict'
import styles from '../sass/main.scss'
import fontAwesome from 'font-awesome-sass-loader'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import onReady from './utils/onReady'
import configureStore from './store'
import routes from './routes'
import config from 'config'
import { checkLoginStatus } from './utils/cognitoCheckStatus'
import { cognitoTest2 } from './utils/cognitoTest2'


import {
  Router,
  Route,
  browserHistory
} from 'react-router'

import {
  syncHistoryWithStore
} from 'react-router-redux'

// checkLoginStatus()
// cognitoTest2()
// We have our reducer setup handled by our configureStore() method.
const store = configureStore(browserHistory, {
  user: localStorage.getItem('viewer') && JSON.parse(localStorage.getItem('viewer')),
})

const history = syncHistoryWithStore(
  browserHistory,
  store
)

// Routing middleware

history.listen(() => {
  window.scrollTo(0, 0)

  const route = window.location.pathname
  console.log('route change:', route)
})

// Initialize the app
onReady(() => {
  const container = document.getElementsByClassName(
    'app-container'
  )[0];

  render(
    <Provider store={store}>
      <Router
        history={history}
        routes={routes}
      />
    </Provider>,
    container
  )
})