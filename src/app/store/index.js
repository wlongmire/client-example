import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { formatDollars } from '../utils/utilities';

import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
}
from 'redux';

import userReducer from '../reducers/userReducer';
import errorReducer from '../reducers/errorReducer';
import submissionReducer from '../reducers/submissionReducer'
import {
    routerReducer, routerMiddleware
}
from 'react-router-redux';

// NOTE: Alias is required to get the formReducer reducer working correctly.


// Add your component reducers
// in this linked file.
import components from 'components/reducers';

const appReducers = combineReducers({
    ...components,
    user: userReducer,
        form: submissionReducer,
        routing: routerReducer,
        error: errorReducer
});


let configureStore;

if (process.env.NODE_ENV === 'production') {

    /* PRODUCTION */
    configureStore = (history, initialState) => {
        return createStore(
            appReducers,
            applyMiddleware(
                routerMiddleware(history),
                thunkMiddleware
            ),
            initialState
        );
    };
} else {
    const loggerMiddleware = createLogger();

    /* NON-PRODUCTION (Dev, Debug, etc) */
    configureStore = (history, initialState) => {
        return createStore(
            appReducers,
            window.devToolsExtension ? window.devToolsExtension() : f => f,
            applyMiddleware(
                loggerMiddleware,
                routerMiddleware(history),
                thunkMiddleware
            )
        );
    };
}

export default configureStore;