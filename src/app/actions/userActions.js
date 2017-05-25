import config from 'config'
import { push } from 'react-router-redux'

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from 'src/app/constants/user'

import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'

const userPool = new CognitoUserPool({
  UserPoolId: config.awsCognito.userPoolId,
  ClientId: config.awsCognito.clientId
})

export function login(username, password, onSuccess, onFailure, newPasswordRequired) {
  return (dispatch) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    })

    cognitoUser.authenticateUser(
      new AuthenticationDetails({
        Username: username,
        Password: password
      }), {
        onSuccess: (resp) => { onSuccess(resp, cognitoUser) },
        onFailure: (err) => { onFailure(err) },
        newPasswordRequired: (userAttributes) => {
          newPasswordRequired(userAttributes, cognitoUser)
        }
      })
  }
}

export function getUserAttributes(cognitoUser) {
  return new Promise((resolve) => {
    cognitoUser.getUserAttributes((err, result) => {
      resolve({ err, result })
    })
  })
}

export function setNewPassword(cognitoUser, newPassword, params, onSuccess, onFailure) {
  cognitoUser.completeNewPasswordChallenge(
    newPassword,
    params,
    {
      onSuccess: () => { onSuccess() },
      onFailure: (err) => { onFailure(err) }
    })
}

export function logout() {
  return (dispatch) => {
    const cognitoUser = userPool.getCurrentUser()

    cognitoUser.signOut()

    dispatch({ type: USER_LOGGED_OUT })
    dispatch(push('/'))
  }
}