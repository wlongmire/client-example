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

export function cognitoTest2(callback) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.awsCognito.userPoolId,
    ClientId: config.awsCognito.clientId
  })

  const cognitoUser = userPool.getCurrentUser()

 if (cognitoUser === null) return null;

  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err)
        return
      }

      console.log('session validity: ' + session.isValid())

      console.log('xx 2233')

      // NOTE: getSession must be called to authenticate user before calling getUserAttributes
      

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.awsCognito.identityPoolId, // your identity pool id here
        Logins: {
            // Change the key below according to the specific region your user pool is in.
          [config.awsCognito.identityProvider]: session.getIdToken().getJwtToken()
        }
      }, {
        region: config.awsCognito.region
      })

      console.log('zz 2233 config.awsCognito.identityProvider', config.awsCognito.identityProvider)
      console.log('xx 2233 AWS.config.credentials', AWS.config.credentials)

        // Instantiate aws sdk service objects now that the credentials have been updated.
        // example: var s3 = new AWS.S3();

        //call refresh method in order to authenticate user and get new temp credentials
      getUserAttributes(cognitoUser).then(({ err, result }) => {
        console.log('get ATTRIBUTES result xx 2233', result)
        AWS.config.credentials.refresh((error, resp) => {
          if (error) {
            console.log('Error refreshing credentials', error)
            callback(null)
          } else {
            console.log('Successfully logged!', resp)

            window.apigClient = apigClientFactory.newClient({
              accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
              secretKey: AWS.config.credentials.data.Credentials.SecretKey,
              sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
              region: config.awsCognito.region
            })
            console.log('xx 2233 AWS.config.credentials AFTERWARDS', AWS.config.credentials)

            console.log('xx 2233 AWS.config.apigClient', AWS.config.apigClient)
            callback('test12334 99')
          }
        })
      })
    })

    console.log('xx 2233 AWS.config.credentials AFTERWARDS', AWS.config.credentials)
  }
}