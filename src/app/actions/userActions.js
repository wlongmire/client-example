import config from 'config'
import { push } from 'react-router-redux'
import AWS from 'aws-sdk'
import moment from 'moment'
import { cognitoPersistUser } from '../utils/cognitoPersistUser'
import {
  USER_LOGGED_OUT,
  SET_API_GATEWAY_CLIENT,
  USER_LOGGED_IN,
} from 'app/constants/user'
import mx from 'app/utils/MixpanelInterface'

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
          console.log("RESPONSE FOR SIGNING", resp)
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
            console.log('response123', AWS.config.credentials.data.Credentials)
            window.apigClient = apigClientFactory.newClient({
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
              onSuccess(resp, result[0].Value, cognitoUser, credentials.expireTime)

              const brokerId = result.filter((item) => { return item.Name == 'custom:broker_id' })
              const subIdQuery = result.filter((item) => { return item.Name == 'sub' })

              console.log('BROKER ID', brokerId[0].Value)
              apigClient.apiGetBrokerIdGet({ id: brokerId[0].Value }).then((brokerResp) => {
                console.log('TEST =================', brokerResp)
                const brokerInfo = JSON.parse(brokerResp.data)
                console.log('brokerInfo.Item.Name', brokerInfo.data.Item.name)
                const brokerName = (brokerInfo.data && brokerInfo.data.Item) ? brokerInfo.data.Item.name : null

                mixpanel.register({
                  BrokerName: brokerName,
                  User: cognitoUser.username,
                  Email: cognitoUser.username,
                  Broker: brokerId[0].Value,
                  SubId: subIdQuery[0].Value,
                  Environment: config.mixPanelEnvironment
                })
                mx.customEvent(
                  'auth',
                  'login')
              
              // adding identity and attributes to
              // mixpanel user profile
              mixpanel.identify(cognitoUser.username) // eslint-disable-line
              mixpanel.people.set({ // eslint-disable-line
                Broker: brokerId[0].Value,
                first_name: cognitoUser.username
              })
              }, (err) => {
                console.log('ERROR ================', err)
              })

              // mx.customEvent(
              //     'auth',
              //     'login', {
              //       User: cognitoUser.username,
              //       Email: cognitoUser.username,
              //       SubId: subIdQuery[0].Value,
              //       Broker: brokerId[0].Value,
              //     }
              //   )
              
              // // adding identity and attributes to
              // // mixpanel user profile
              // mixpanel.identify(cognitoUser.username) // eslint-disable-line
              // mixpanel.people.set({ // eslint-disable-line
              //   Broker: brokerId[0].Value,
              //   first_name: cognitoUser.username
              // })
              // mixpanel.register({
              //     BrokerName: brokerInfo.Item.Name
              // })
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
    const cognitoParams = {
      IdentityPoolId: config.awsCognito.identityPoolId
    }

    const cognitoUser = userPool.getCurrentUser()

    cognitoUser.signOut()
    AWS.config.credentials.clearCachedId()

    const cognitoCredentials = new AWS.CognitoIdentityCredentials(cognitoParams)
    AWS.config.credentials = cognitoCredentials
    window.apigClient = null
    dispatch({ type: USER_LOGGED_OUT })
    dispatch(push('/'))
  }
}