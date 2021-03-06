
import styles from '../sass/main.scss'
import fontAwesome from 'font-awesome-sass-loader'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import onReady from './utils/onReady'
import configureStore from './store'
import routes from './routes'
import config from 'config'
import { cognitoPersistUser } from './utils/cognitoPersistUser'

import {
  Router,
  Route,
  browserHistory
} from 'react-router'

import {
  syncHistoryWithStore
} from 'react-router-redux'

cognitoPersistUser((user) => {
  const store = configureStore(browserHistory, {
    user
  })
  
  const history = syncHistoryWithStore(
    browserHistory,
    store
  )
  // Routing middleware

  history.listen(() => {
    window.scrollTo(0, 0)
    const route = window.location.pathname
  })

  // Initialize the app
  onReady(() => {
    const container = document.getElementsByClassName('app-container')[0]

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
})
