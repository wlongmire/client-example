import config from 'config'
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'
import AWS from 'aws-sdk'

export function getUserAttributes(cognitoUser) {
  return new Promise((resolve, reject) => {
    cognitoUser.getUserAttributes((error, result) => {
      resolve({ error: error, result })
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
        alert('Error in getting session', err)
        AWS.config.credentials.clearCachedId()
        cognitoUser.signOut()
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
      getUserAttributes(cognitoUser).then(({ error, result }) => {
        if (error) {
          console.log('Get User attributes error', error)
          AWS.config.credentials.clearCachedId()
          cognitoUser.signOut()
          callback(null)
        }

        if (result === null) {
          cognitoUser.signOut()
          AWS.config.credentials.clearCachedId()
          callback(null)
        } else {
          AWS.config.credentials.refresh((error) => {
            if (error) {
              console.log('Error refreshing credentials', error)

              cognitoUser.signOut()
              AWS.config.credentials.clearCachedId()
              callback(null)
            } else {
              const subId = result.filter((item) => { return item.Name == 'sub' })[0].Value;

              // creating a apigClient object which is globally accessible
              // you can interact with the databse this way
              // eslint-disable-next-line no-undef
              window.apigClient = apigClientFactory.newClient({
                accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
                secretKey: AWS.config.credentials.data.Credentials.SecretKey,
                sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
                region: config.awsCognito.region
              })

              apigClient.adminUsersIdGet({ id: subId }).then((adminUsersIdGetResp) => {
                const userTableEntry = adminUsersIdGetResp.data

                if (!userTableEntry.success || (userTableEntry.success && !userTableEntry.data)) {
                  console.log(`${userTableEntry.errorCode}: ${userTableEntry.message}`)
                  AWS.config.credentials.clearCachedId()
                  cognitoUser.signOut()
                  callback(null)
                }

                const { role, brokerId, id } = userTableEntry.data

                apigClient.apiGetBrokerIdGet({ id: brokerId }).then((brokerResp) => {
                  const brokerInfo = brokerResp.data
                  const brokerName = brokerInfo.data ? brokerInfo.data.name : null

                  //update lastOnline time
                  apigClient.adminUsersIdPut({ id: subId }, [
                    {
                      fieldName: 'lastOnline',
                      fieldValue: new Date().toISOString()
                    }
                  ]).then((result2) => {
                    const resp = result2.data

                    if (!resp.success) {
                      alert('Error on update: ', result.message)
                    } else {
                      console.log('Successfully updated')
                    }
                  })

                  // registering super properties for mixpanel events
                  mixpanel.register({
                    BrokerName: brokerName,
                    User: cognitoUser.username,
                    Email: cognitoUser.email,
                    Role: role,
                    Broker: brokerId,
                    SubId: id,
                    Environment: config.env
                  })

                  callback({
                    bundles: brokerInfo.data.bundles,
                    id,
                    brokerId,
                    brokerName,
                    username: cognitoUser.username,
                    email: cognitoUser.email,
                    role,
                    expiration: AWS.config.credentials.expireTime
                  })
                })
              })
            }
          })
        }
      })
    })
  }
}