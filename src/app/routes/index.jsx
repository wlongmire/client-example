import React from 'react';

import {
  Route,
  IndexRoute
} from 'react-router';

import { routerActions } from 'react-router-redux';


import { UserAuthWrapper } from 'redux-auth-wrapper';
import { browserHistory } from 'react-redux';

import App from 'components/App';
import Home from 'routes/Home';
import Rating from 'routes/Rating';
import ProductChoice from 'routes/ProductChoice';
import SignIn from 'routes/SignIn';
import SignUp from 'routes/SignUp';
import RatingResults from 'components/RatingResults';
import Http404 from 'routes/Http404';

const UserIsAuthenticated = UserAuthWrapper({

  authSelector:         state => state.user,
  redirectAction:       routerActions.replace,
  wrapperDisplayName:   'UserIsAuthenticated',
  failureRedirectPath:  '/' // Go back to sign in page at /

});

const requireSignIn = () => {
  return browserHistory.push('/');
};

const UserRolePowerUser = UserAuthWrapper({
  authSelector:         state => state.user,
  wrapperDisplayName:   'UserRolePowerUser',
  redirectAction: requireSignIn,
  // failureRedirectPath:  '/', // <-- old way of redirecting user
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
      path='submissions'
      component={UserIsAuthenticated(Home)}
    />

    <Route
      path='productChoice'
      component={UserIsAuthenticated(ProductChoice)}
    />    

    <Route
      path='oiform'
      component={UserIsAuthenticated(Rating)}
    />

    <Route
      path='quote'
      component={UserIsAuthenticated(RatingResults)}
    />

    <Route
      path='*'
      component={Http404}
    />
  </Route>
);
