import config from 'config'
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'
import AWS from 'aws-sdk'

export function cognitoTest2() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.awsCognito.userPoolId,
    ClientId: config.awsCognito.clientId
  })

  const cognitoUser = userPool.getCurrentUser()

  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err)
        return
      }

      console.log('session validity: ' + session.isValid())

      console.log('xx 2233')

      // NOTE: getSession must be called to authenticate user before calling getUserAttributes
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
            // Handle error
        } else {
            // Do something with attributes
          console.log('xx 2233 get Attributes', attributes)
        }
      })

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.awsCognito.identityPoolId, // your identity pool id here
        Logins: {
            // Change the key below according to the specific region your user pool is in.
          [config.awsCognito.identityProvider]: session.getIdToken().getJwtToken()
        }
      })

      console.log('xx 2233 AWS.config.credentials', AWS.config.credentials)

        // Instantiate aws sdk service objects now that the credentials have been updated.
        // example: var s3 = new AWS.S3();

        //call refresh method in order to authenticate user and get new temp credentials
      AWS.config.credentials.refresh((error) => {
          if (error) {
            console.error(error)
          } else {
            console.log('Successfully logged!')
          }
      })

      console.log('xx 2233 AWS.config.credentials AFTERWARDS', AWS.config.credentials)
    })
  }
}