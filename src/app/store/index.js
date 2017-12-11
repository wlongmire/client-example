import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux'

import userReducer from '../reducers/userReducer'
import appReducer from '../reducers/appReducer'
import submissionsReducer from '../reducers/submissionReducer'
import adminReducer from '../reducers/adminReducer'
import alertReducer from '../reducers/alertReducer'

import { routerReducer, routerMiddleware } from 'react-router-redux'

const appReducers = combineReducers({
  routing: routerReducer,
  submissions: submissionsReducer,
  user: userReducer,
  app: appReducer,
  admin: adminReducer,
  alerts: alertReducer
})

const sagaMiddleware = createSagaMiddleware()
let configureStore

if (process.env.NODE_ENV === 'production') {
  
    /* PRODUCTION */
  configureStore = (history, initialState) => {
    const store = createStore(
      appReducers,
      initialState,
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        sagaMiddleware
      )
    )
    sagaMiddleware.run(rootSaga, initialState)
    return store
  }
} else {
  const loggerMiddleware = createLogger()

    /* NON-PRODUCTION (Dev, Debug, etc) */
  configureStore = (history, initialState) => {
    const enhancer = compose(
      applyMiddleware(
        loggerMiddleware,
        routerMiddleware(history),
        thunkMiddleware,
        sagaMiddleware
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )

    const store = createStore(
      appReducers,
      initialState,
      enhancer
    )
    sagaMiddleware.run(rootSaga, initialState)
    return store
  }
}

export default configureStore