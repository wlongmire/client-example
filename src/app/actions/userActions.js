import AWS from 'aws-sdk'
import config from 'config'
import { push } from 'react-router-redux'
import { browserHistory } from 'react-router'
import {
  USER_LOGGED_OUT,
  USER_LOGGED_IN
} from 'app/constants/user'
import { migrationLogin } from './migrationActions'
import { ALERT_DISPLAY } from '../constants/alert'

import mx from 'app/utils/MixpanelInterface'

import { setAlert, getUsersByBrokerage } from './adminActions'
import { checkTokenExpiration } from '../utils/checkTokenExpiration'
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'
import {isDefined, isNullOrEmpty} from './../utils/utilities'

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
            getUserAttributes(cognitoUser).then(({ error, result }) => {
              if (error) {
                onFailure(err)
                return
              }

              const subId = result.filter((item) => { return item.Name == 'sub' })[0].Value

              //get user table entry
              apigClient.profileIdGet({ id: subId }).then((usersIdGetResp) => {
                const userTableEntry = usersIdGetResp.data
                console.log('usersIdGetResp', usersIdGetResp)

                if (!userTableEntry.success || (userTableEntry.success && !userTableEntry.data)) {
                  onFailure(userTableEntry.errorCode)
                  return
                }

                if (userTableEntry.data.status === 'pending') {
                  apigClient.profileIdPut({ id: subId },
                    [
                      { fieldName: 'status', fieldValue: 'active' },
                      { fieldName: 'lastOnline', fieldValue: new Date().toISOString() }
                    ])
                } else if (userTableEntry.data.status === 'active') {
                  apigClient.profileIdPut({ id: subId },
                    [
                      { fieldName: 'lastOnline', fieldValue: new Date().toISOString() }
                    ])
                }


                const { role, brokerId, id, firstName, lastName, phone, phoneExt, title, email } = userTableEntry.data

                //get broker information
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
                      email,
                      title,
                      phoneExt,
                      phone,
                      lastName,
                      firstName,
                      expiration: credentials.expireTime
                    }
                  })

                  // update lastOnline time
                  apigClient.profileIdPut({ id }, [{ fieldName: 'lastOnline', fieldValue: new Date().toISOString() }]
                  ).then((result2) => {
                    const resp2 = result2.data
                    if (!resp2.success) {
                      alert('Error on update: ', result.message)
                    } else {
                      console.log('Successfully updated')
                    }
                  })

                  onSuccess(resp, subId, cognitoUser, credentials.expireTime, userTableEntry.data)

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

                }, (err2) => {
                  console.log('ERROR ================', err2)
                })
              })
            })
          })
        },
        onFailure: (err) => {
          onFailure(err)
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

    if (cognitoUser !== null) {
      cognitoUser.signOut()
    }

    if (AWS.config.credentials !== null) {
      AWS.config.credentials.clearCachedId()
    }


    const cognitoCredentials = new AWS.CognitoIdentityCredentials(cognitoParams)
    AWS.config.credentials = cognitoCredentials
    window.apigClient = null
    dispatch({ type: USER_LOGGED_OUT })
    dispatch(push('/'))
  }
}

export function userForgotPassword(email, onSuccess, onFailure) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.awsCognito.userPoolId,
    ClientId: config.awsCognito.clientId
  })

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool
  });

  cognitoUser.forgotPassword({
    onSuccess: () => { onSuccess() },
    onFailure: (err) => { onFailure(err) }
  });
}

export function userConfirmPassword(confirmationCode, requestCode, newPwd, onSuccess, onFailure) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.awsCognito.userPoolId,
    ClientId: config.awsCognito.clientId
  })

  getUserFromRequestCode(requestCode)
    .then(resp => {
      console.log('GOT TO HERE')
      console.log(resp)
      const cognitoUser = new CognitoUser({
        Username: resp.data.username,
        Pool: userPool
      });

      console.log('got a valid user')
      cognitoUser.confirmPassword(confirmationCode, newPwd, {
        onSuccess: () => { onSuccess(resp.data.username) },
        onFailure: (err) => { onFailure(err) }
      });
    })
}

export function getUserFromRequestCode(requestCode){
  return new Promise((resolve, reject) => {
    const apigClient = apigClientFactory.newClient()
    apigClient.apiResetcodeCodeGet({code: requestCode}, {})
      .then((resp, err) => {
        if (isDefined(resp.data)) {
          return resolve(resp.data)
        }
      })
  })
}

export function editProfile(user, values) {
  return new Promise((resolve, reject)=> {
    checkTokenExpiration(user).then(() => {
      const paramsArray = [
        { fieldName: 'firstName', fieldValue: values.firstName },
        { fieldName: 'lastName', fieldValue: values.lastName },
        { fieldName: 'title', fieldValue: isNullOrEmpty(values.jobTitle) ? ' ' : values.jobTitle },
        { fieldName: 'phone', fieldValue: values.phone },
        { fieldName: 'phoneExt', fieldValue: isNullOrEmpty(values.phoneExt) ? ' ' : values.phoneExt }
      ]

    apigClient.profileIdPut({ id: user.id }, paramsArray)
      .then((resp2, err1) => {
        console.log('err1', err1)
        console.log('resp2', resp2)
        if (resp2.data && resp2.data.success === true) {
          return resolve({
            success: true,
            data: resp2.data
          })
        }
        return resolve({
          success: false,
          message: err1.message
        })
      })
    })
  })
}

export function updateUserValues(values) {
  return ((dispatch, getState) => {
    const { user } = getState()
    dispatch({
      type: USER_LOGGED_IN,
      payload: {
        ...user,
        title: values.jobTitle,
        phoneExt: values.phoneExt,
        phone: values.phone,
        lastName: values.lastName,
        firstName: values.firstName
      }
    })
  })
}

export function createAlert(message, bsStyle, timeout=null) {
  return ((dispatch) => {
    dispatch({
      type: ALERT_DISPLAY,
      payload: {
        message,
        bsStyle,
        show: true
      }
    })
    if (timeout !== null){
      setTimeout(() => {
        dispatch({
          type: ALERT_DISPLAY,
          payload: {
            message: '',
            show: false
          }
        })
      }, timeout)
    }
  })
}