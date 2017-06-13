import config from 'config'
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'
import AWS from 'aws-sdk'

export function checkLoginStatus() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.awsCognito.userPoolId,
    ClientId: config.awsCognito.clientId
  })
  const cognitoUser = userPool.getCurrentUser()

  console.log('xx 2233 getCurrentUser', cognitoUser)
  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err)
        return
      }

      console.log('session', session)
      console.log('session validity: ' + session.isValid())

      // NOTE: getSession must be called to authenticate user before calling getUserAttributes
      cognitoUser.getUserAttributes((error, attributes) => {
        if (error) {
          console.log('get attributes error', error)
            // Handle error
        } else {
          console.log('xx 2233 get Attributes', attributes)
            // Do something with attributes
        }
      })

      console.log('config.awsCognito.identityProvider', config.awsCognito.identityProvider)

      const credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.awsCognito.identityPoolId,
        Logins: {
          [config.awsCognito.identityProvider]: session.getIdToken().getJwtToken()
        }
      }, {
        region: config.awsCognito.region
      })

      console.log('xx223 credentials', credentials)
      // if credentials.exipred === true, please sign in again

          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();

      AWS.config.credentials = credentials
      // AWS.config.apigClient = apigClientFactory.newClient({
      //   accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
      //   secretKey: AWS.config.credentials.data.Credentials.SecretKey,
      //   sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
      //   region: config.awsCognito.region
      // })
    })
  }
}