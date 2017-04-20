import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
}
from 'redux';

import userReducer from '../reducers/userReducer';
import errorReducer from '../reducers/errorReducer';
import appReducer from '../reducers/appReducer';

import submissionsReducer from '../reducers/SubmissionView/reducer';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import submissionFormReducer from '../reducers/submissionFormReducer';

const appReducers = combineReducers({
  user: userReducer,
  routing: routerReducer,
  error: errorReducer,
  submissions: submissionsReducer,
  app:appReducer,

  form: submissionFormReducer
});


let configureStore;

if (process.env.NODE_ENV === 'production') {

    /* PRODUCTION */
  configureStore = (history, initialState) => {
    return createStore(
            appReducers,
            initialState,
            applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware
            )
        );
  };
} else {

  const loggerMiddleware = createLogger();

    /* NON-PRODUCTION (Dev, Debug, etc) */
  configureStore = (history, initialState) => {
    const enhancer = compose(
      applyMiddleware(
        // loggerMiddleware,
        routerMiddleware(history),
        thunkMiddleware
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    return createStore(
            appReducers,
            initialState,
            enhancer
        );
  };
}

export default configureStore;
