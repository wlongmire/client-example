import config from 'config'
import {login} from 'app/actions/userActions'
import AWS from 'aws-sdk'
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'

import {
  USER_LOGGED_OUT,
} from 'app/constants/user'

import mx from 'app/utils/MixpanelInterface'

const argoUserPool = {
  userPool: 'us-east-1_XWOnd6XH0',
  clientId: '3n7362ap9pa11lrqv4uas31g36',
  identifyPool: 'us-east-1:57db5f54-9c0c-4d2f-8b92-d3279a07f61c',
  identityProvider: 'cognito-idp.us-east-1.amazonaws.com/us-east-1_XWOnd6XH0'
}

export function migrationLogin(username = 'warrenlongmire@gmail.com', password = 'A0xt1982!', onSuccess, onFailure, newPasswordRequired, dispatch) {
  const sourceUserPool = new CognitoUserPool({
    UserPoolId: argoUserPool.userPool,
    ClientId: argoUserPool.clientId
  })

  const sourceCognitoUser = new CognitoUser({
    Username: username,
    Pool: sourceUserPool
  })

  const targetUserPool = new CognitoUserPool({
    UserPoolId: config.awsCognito.userPoolId,
    ClientId: config.awsCognito.clientId
  })

  const targetCognitoUser = new CognitoUser({
    Username: username,
    Pool: targetUserPool
  })
  
  // Authenticate on older system (argoGroup)
  // does user exist?
  sourceCognitoUser.authenticateUser(
    new AuthenticationDetails({
      Username: username,
      Password: password
    }), {
      onSuccess: () => {
        // clear the session from this authentication
        sourceCognitoUser.getUserAttributes((err, result) => {
          if (err) {
            console.log(err)
            alert('error ', err)
          }

          // get current broker for user (within argoGroup)
          const brokerId = result.filter((item) => { return item.Name == 'custom:broker_id' })[0].Value

          // create new user within config user pool
          targetUserPool.signUp(
            username,
            password,
            [{
              Name: 'email',
              Value: name
            }, {
              Name: 'custom:broker_id',
              Value: brokerId
            }],
            null,
            (err, result) => {
              if (err) {
                alert(err)
                return
              }

              // confirm that user
              console.log('successful signup')
              const CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
                apiVersion: '2016-04-19',
                region: config.awsCognito.region,
                credentials: new AWS.Credentials('AKIAJTJ4O4AV4FFOKCEA', '1UmI5tbZj9I4Uwr+6pmOfrkaC52KVeW/6pu3HW5Q')
              })

              CognitoIdentityServiceProvider.adminConfirmSignUp({
                UserPoolId: config.awsCognito.userPoolId,
                Username: username
              }, (err)=> {
                if (err) {
                  alert(err)
                  return
                }

                dispatch(login(username, password, onSuccess, onFailure, newPasswordRequired))
              })
          })
        })
      },
      onFailure: (err) => {
        onFailure(err)
      }
    })
}