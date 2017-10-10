import AWS from 'aws-sdk'
import config from 'config'
import { migrationLogin } from './migrationActions'
import { push } from 'react-router-redux'
import { browserHistory } from 'react-router'
import {
  USER_LOGGED_OUT,
  USER_LOGGED_IN
} from 'app/constants/user'

import mx from 'app/utils/MixpanelInterface'

import { setAlert } from './adminActions'
import { checkTokenExpiration } from '../utils/checkTokenExpiration'
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'

export function login(username, password, onSuccess, onFailure, newPasswordRequired) {
  return (dispatch) => {
    const userPool = new CognitoUserPool({
      UserPoolId: config.awsCognito.userPoolId,
      ClientId: config.awsCognito.clientId
    })

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
            window.apigClient = apigClientFactory.newClient({
              accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
              secretKey: AWS.config.credentials.data.Credentials.SecretKey,
              sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
              region: config.awsCognito.region
            })

            // get the current users subId
            getUserAttributes(cognitoUser).then(({ err, result }) => {
              if (err) {
                onFailure(err)
                return
              }

              const subId = result.filter((item) => { return item.Name == 'sub' })[0].Value

              apigClient.adminUsersIdGet({ id: subId }).then((adminUsersIdGetResp) => {
                const userTableEntry = adminUsersIdGetResp.data


                if (!userTableEntry.success || (userTableEntry.success && !userTableEntry.data)) {
                  onFailure(userTableEntry.errorCode)
                  return
                }

                onSuccess(resp, subId, cognitoUser, credentials.expireTime)

                const { role, brokerId, id } = userTableEntry.data
                
                apigClient.apiGetBrokerIdGet({ id: brokerId }).then((brokerResp) => {
                  const brokerInfo = brokerResp.data
                  const brokerName = brokerInfo.data ? brokerInfo.data.name : null

                  dispatch({
                    type: USER_LOGGED_IN,
                    payload: {
                      bundles: brokerInfo.data.bundles,
                      username: cognitoUser.username,
                      id,
                      role,
                      brokerId,
                      brokerName,
                      email: cognitoUser.username,
                      expiration: credentials.expireTime

                    }
                  })

                  browserHistory.push('/submissions')

                  FS.identify(cognitoUser.username, {
                    displayName: cognitoUser.username,
                    email_str: cognitoUser.username,
                    broker_str: brokerName,
                    subId_str: id
                  })

                  mixpanel.register({
                    BrokerName: brokerName,
                    User: cognitoUser.username,
                    Email: cognitoUser.username,
                    Broker: brokerId,
                    SubId: id,
                    Environment: config.env
                  })

                  mx.customEvent(
                    'auth',
                    'login')

                  // adding identity and attributes to
                  // mixpanel user profile
                  mixpanel.identify(cognitoUser.username)
                  mixpanel.people.set({ // eslint-disable-line
                    Broker: brokerId,
                    BrokerName: brokerName,
                    first_name: cognitoUser.username
                  })
                }, (err) => {
                  console.log('ERROR ================', err)
                })
              })
            })
          })
        },
        onFailure: (err) => {
          if (config.env === 'prod') {
           migrationLogin(username, password, onSuccess, onFailure, newPasswordRequired, dispatch)
          } else {
            onFailure(err)
          }

        },
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

    const userPool = new CognitoUserPool({
      UserPoolId: config.awsCognito.userPoolId,
      ClientId: config.awsCognito.clientId
    })

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

export function createNewUser(email, isAdmin, user) {
  return ((dispatch) => {
    checkTokenExpiration(user).then(() => {
      const body = {
        email,
        role: isAdmin == 'true' ? 'admin' : 'broker',
        broker_id: user.brokerId
      }

      apigClient.adminUsersPost({}, body, {}).then((resp) => {
        if (resp.data && resp.data.success === false) {
          dispatch(
            setAlert({ show: true, message: `${resp.data.message}`, bsStyle: 'danger' })
          )
        } else {
          dispatch(
            setAlert({ show: true, message: 'Success: User has been successful created.', bsStyle: 'success' })
          )
        }
      })
    })
  })
}