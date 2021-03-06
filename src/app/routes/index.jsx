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
import Clearance from 'routes/Clearance'
import UserManagement from 'routes/UserManagement'
import SignIn from 'routes/SignIn'
import Http404 from 'routes/Http404'
import ConfirmSignup from 'routes/ConfirmSignup'
import CompleteProfilePage from 'routes/CompleteProfilePage'
import ResetPassword from 'routes/ResetPassword'
import PassClearance from 'routes/PassClearance'
import FailClearance from 'routes/FailClearance'

import ClearanceUnderwriter from 'routes/ClearanceUnderwriter'
import FormUnderwriter from 'routes/FormUnderwriter'

import config from 'config'

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
      path="resetpassword"
      component={ResetPassword}
    />

    <Route
      path="failclearance"
      component={FailClearance}
    />

    <Route
      path="passclearance"
      component={PassClearance}
    />

    <Route
      path="clearanceunderwriter"
      component={UserIsAuthenticated(ClearanceUnderwriter)}
    />

    <Route
      path="formunderwriter"
      component={UserIsAuthenticated(FormUnderwriter)}
    />

    <Route
      path="*"
      component={Http404}
    />
  </Route>
)
