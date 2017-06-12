import React, { Component } from 'react'

import Helmet from 'react-helmet'
import querystring from 'querystring'

import config from 'config'
import Header from 'components/Header'
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'

const query = querystring.parse(window.location.search.slice(1))
const content = require('content')

class App extends Component {

  componentDidMount() {
    // const userPool = new CognitoUserPool({
    //   UserPoolId: config.awsCognito.userPoolId,
    //   ClientId: config.awsCognito.clientId
    // })
    // const cognitoUser = userPool.getCurrentUser()

    // console.log('xx 2233 getCurrentUser', cognitoUser)
    // if (cognitoUser != null) {
    //   cognitoUser.getSession((err, session) => {
    //   if (err) {
    //       alert(err);
    //       return;
    //   }

    //     console.log('session', session)
    //     console.log('session validity: ' + session.isValid())

    //     // NOTE: getSession must be called to authenticate user before calling getUserAttributes
    //     cognitoUser.getUserAttributes((error, attributes) => {
    //       if (error) {
    //           // Handle error
    //       } else {
    //         console.log('xx 2233 get Attributes', attributes)
    //           // Do something with attributes
    //       }
    //     })

    //     const credentials = new AWS.CognitoIdentityCredentials({
    //       IdentityPoolId: config.awsCognito.identityPoolId,
    //       Logins: {
    //         [config.awsCognito.identityProvider]: session.getIdToken().getJwtToken()
    //       }
    //     }, {
    //       region: config.awsCognito.region
    //     })

    //     console.log('xx223 credentials', credentials)
    //     // if credentials.exipred === true, please sign in again

    //         // Instantiate aws sdk service objects now that the credentials have been updated.
    //         // example: var s3 = new AWS.S3();

    //     AWS.config.credentials = credentials
    //     AWS.config.apigClient = apigClientFactory.newClient({
    //       accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
    //       secretKey: AWS.config.credentials.data.Credentials.SecretKey,
    //       sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
    //       region: config.awsCognito.region
    //     })
    //   })
    // }
  }
  render() {
    const baseMeta = [
      {
        name: 'description',
        content: content.description
      },
      {
        property: 'og:type',
        content: 'site'
      }
    ]

    const titleTemplate = `${content.title} | %s`

    return (
      <div className="app">
        <Helmet
          titleTemplate={titleTemplate}
          meta={baseMeta}
        />

        <Header />

        { this.props.children }
      </div>
    );
  }

  getChildContext() {
    return { config, content }
  }

}

App.childContextTypes = {
  config: React.PropTypes.object.isRequired,
  content: React.PropTypes.object.isRequired
}

export default App
