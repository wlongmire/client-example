import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from 'redux';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// Add your component reducers
// in this linked file.
import components from 'components/reducers';

let configureStore;

if (process.env.NODE_ENV === 'production') {
  configureStore = (history, initialState) => {
    return createStore(
      combineReducers({
        ...components,
        routing: routerReducer,
        form: formReducer
      }),
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware
      ),
      initialState
    );
  };
} else {
  const loggerMiddleware = createLogger();

  configureStore = (history, initialState) => {
    createStore(
      combineReducers({
        ...components,
        routing: routerReducer,
        form: formReducer
      }),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      applyMiddleware(
        // loggerMiddleware,
        routerMiddleware(history),
        thunkMiddleware
      )
    );
  };
}

export default configureStore;
