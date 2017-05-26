import config from 'config'
import { push } from 'react-router-redux'
import AWS from 'aws-sdk'

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from 'src/app/constants/user'

import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'

const userPool = new CognitoUserPool({
  UserPoolId: config.awsCognito.userPoolId,
  ClientId: config.awsCognito.clientId
})

AWS.config.update({
  accessKeyId: config.awsCognito.dynoKey,
  secretAccessKey: config.awsCognito.dynoSecretAccessKey,
  region: config.awsCognito.region
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

export function getDynoUser(sub) {
  return new Promise((resolve) => {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'Users',
      Key: {
        id: '9192699f-3374-49bc-8e30-49dd2930eca9',
        sub
      }
    }

    docClient.get(params, (err, data) => {
      console.log(data)
      if (err) {
        resolve({ err, data: null })
      } else {
        resolve({ err: null, data })
      }
    })
  })
}

export function getDynoBroker(brokerID) {
  return new Promise((resolve) => {
    const docClient = new AWS.DynamoDB.DocumentClient()

    const params = {
      TableName: 'Brokers',
      Key:{
        BrokerId: brokerID
      }
    }

    docClient.get(params, function(err, data) {
      if (err) {
        resolve({ err, data: null })
      } else {
        resolve({ err: null, data })
      }
    })
  })
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