import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux';

import { routerReducer } from 'react-router-redux';

// Add your component reducers
// in this linked file.
import components from 'components/reducers';

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(
    combineReducers({
      ...components,
      routing: routerReducer
    }),
    applyMiddleware(
      thunkMiddleware
    )
  );

} else {
  const loggerMiddleware = createLogger();

  store = createStore(
    combineReducers({
      ...components,
      routing: routerReducer
    }),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
    applyMiddleware(
      // loggerMiddleware,
      thunkMiddleware
    )
  );
}

export default store;
