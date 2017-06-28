import config from 'config'
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'
import AWS from 'aws-sdk'

export function getUserAttributes(cognitoUser) {
  return new Promise((resolve) => {
    cognitoUser.getUserAttributes((err, result) => {
      resolve({ err, result })
    })
  })
}

export function cognitoPersistUser(callback) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.awsCognito.userPoolId,
    ClientId: config.awsCognito.clientId
  })

  const cognitoUser = userPool.getCurrentUser()
  if (cognitoUser === null) {
    callback(null)
  }

  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log('Error in getting session', err)

        callback(null)
      }


      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.awsCognito.identityPoolId, // your identity pool id here
        Logins: {
            // Change the key below according to the specific region your user pool is in.
          [config.awsCognito.identityProvider]: session.getIdToken().getJwtToken()
        }
      }, {
        region: config.awsCognito.region
      })

      // call refresh method in order to authenticate user and get new temp credentials
      getUserAttributes(cognitoUser).then(({ error1, result }) => {
        if (error1) {
          console.log('get User attributes error', error1)
          callback(null)
        }

        AWS.config.credentials.refresh((error) => {
          if (error) {
            console.log('Error refreshing credentials', error)
            callback(null)
          } else {
            // getting attributes from response for 'getUserAttributes'
            const brokerIdQuery = result.filter((item) => { return item.Name == 'custom:broker_id' })
            const subIdQuery = result.filter((item) => { return item.Name == 'sub' })
            const usernameQuery = result.filter((item) => { return item.Name == 'preferred_username' })
            const emailQuery = result.filter((item) => { return item.Name == 'email' })

            // creating a apigClient object which is globally accessible
            // you can interact with the databse this way
            // eslint-disable-next-line no-undef
            window.apigClient = apigClientFactory.newClient({
              accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
              secretKey: AWS.config.credentials.data.Credentials.SecretKey,
              sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
              region: config.awsCognito.region
            })


            // "2017-06-14T04:32:02.000Z"
            // expiration: '2017-06-13T01:32:02.000Z'
            // sending the user info back to the store to be used in the app
            callback({
              subId: subIdQuery[0].Value,
              broker: brokerIdQuery[0].Value,
              username: usernameQuery[0].Value,
              email: emailQuery[0].Value,
              expiration: AWS.config.credentials.expireTime
            })
          }
        })
      })
    })
  }
}