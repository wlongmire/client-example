import React from 'react'

import {
  Route,
  IndexRoute
} from 'react-router'

import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from 'components/App'
import Submissions from 'routes/Submissions'
import Form from 'routes/Form'
import FormResults from 'routes/FormResults'
import ProductChoice from 'routes/ProductChoice'
import Clearance from 'routes/Clearance'
import UserManagement from 'routes/UserManagement'
import SignIn from 'routes/SignIn'
import Http404 from 'routes/Http404'
import ConfirmSignup from 'routes/ConfirmSignup'
import CompleteProfilePage from 'routes/CompleteProfilePage'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  failureRedirectPath: '/'
})


export default (
  <Route
    path="/"
    component={App}
  >
    <IndexRoute
      component={SignIn}
    />

    <Route
      path="submissions"
      component={UserIsAuthenticated(Submissions)}
    />

    <Route
      path="users"
      component={UserIsAuthenticated(UserManagement)}
    />

    <Route
      path="productChoice"
      component={UserIsAuthenticated(ProductChoice)}
    />

    <Route
      path="clearance"
      component={UserIsAuthenticated(Clearance)}
    />


    <Route
      path="form"
      component={UserIsAuthenticated(Form)}
    />

    <Route
      path="formResults"
      component={UserIsAuthenticated(FormResults)}
    />

    <Route
      path="confirmsignup"
      component={ConfirmSignup}
    />

    <Route
      path="completeprofile"
      component={CompleteProfilePage}
    />

    <Route
      path="*"
      component={Http404}
    />
  </Route>
)
