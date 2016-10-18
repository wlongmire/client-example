import React from 'react';

import {
  Route,
  IndexRoute
} from 'react-router';

import { routerActions } from 'react-router-redux'


import { UserAuthWrapper } from 'redux-auth-wrapper';

import App from 'components/App';
import Home from 'routes/Home';
import Rating from 'routes/Rating';
import SignIn from 'routes/SignIn';
import SignUp from 'routes/SignUp';
import PowerConsole from 'routes/PowerConsole';
import RatingResults from 'components/RatingResults';
import Http404 from 'routes/Http404';

const UserIsAuthenticated = UserAuthWrapper({

  authSelector:         state => state.user,
  redirectAction:       routerActions.replace,
  wrapperDisplayName:   'UserIsAuthenticated',
  failureRedirectPath:  '/' // Go back to sign in page at /

});

const UserRolePowerUser = UserAuthWrapper({

  authSelector:         state => state.user,
  // redirectAction:       routerActions.replace,
  wrapperDisplayName:   'UserRolePowerUser',
  failureRedirectPath:  '/',
  predicate:            (props) => {
    
    return props.state.user.role === 'poweruser';
  },
  allowRedirectBack:    false

});

export default (
  <Route 
    path='/'
    component={App}>
    <IndexRoute
      component={SignIn}
    />
    <Route
      path='signup'
      component={SignUp}
    />
    <Route
      path='home'
      component={UserIsAuthenticated(Home)}
    />
    <Route
      path='form'
      component={UserIsAuthenticated(Rating)}
    />
    <Route
      path='quote'
      component={UserIsAuthenticated(RatingResults)}
    />
    <Route
      path='powerconsole'
      component={UserIsAuthenticated(UserRolePowerUser(PowerConsole))}
    />
    <Route
      path='*'
      component={Http404}
    />
  </Route>
);
