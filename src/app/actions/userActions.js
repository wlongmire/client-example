import config from 'config'
import { push } from 'react-router-redux'
import AWS from 'aws-sdk'

import {
  USER_LOGGED_OUT,
  SET_API_GATEWAY_CLIENT
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
        onSuccess: (resp) => {
          const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.awsCognito.identityPoolId,
            Logins: {
              [config.awsCognito.identityProvider]: resp.getIdToken().getJwtToken()
            }
          }, {
            region: config.awsCognito.region
          })


          credentials.get((err) => {
            if (err) {
              alert(err)
              return
            }

            AWS.config.credentials = credentials
            AWS.config.apigClient = apigClientFactory.newClient({
              accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
              secretKey: AWS.config.credentials.data.Credentials.SecretKey,
              sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
              region: config.awsCognito.region
            })
            
            getUserAttributes(cognitoUser).then(({ err, result }) => {
              if (err) {
                console.log(err)
                alert('error ', err)
              }
              onSuccess(resp, result[0].Value, cognitoUser)
            })
          })
        },
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

    window.apigClient = null
    dispatch({ type: USER_LOGGED_OUT })
    dispatch(push('/'))
  }
}