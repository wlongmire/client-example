import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import FormBuilder from 'components/shared/FormBuilder'
import config from 'config'
import form from './form.js'

import ToggleDisplay from 'components/shared/ToggleDisplay'

import mx from 'app/utils/MixpanelInterface'
import { Button } from 'react-bootstrap'

import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    if (values.username === '') {
      this.setState({
        error: true,
        errorMessage: 'Please Enter a Valid Username.'
      })
    } else if (values.password === '') {
      this.setState({
        error: true,
        errorMessage: 'Please Enter a Valid Password.'
      })
    } else {
      const userPool = new CognitoUserPool({
        UserPoolId: config.awsCognito.userPoolId,
        ClientId: config.awsCognito.clientId
      })

      const cognitoUser = new CognitoUser({
        Username: values.username,
        Pool: userPool
      })

      const authenticationData = new AuthenticationDetails({
        Username: values.username,
        Password: values.password
      })

      cognitoUser.authenticateUser(authenticationData, {
        onSuccess: (resp) => {
          console.log("login successful", resp)

          // localStorage.setItem('token', token)
          // localStorage.setItem('viewer', JSON.stringify(user))

          // this.setState({ error: false, errorMessage: ""})

          // this.props.dispatch(push({
          //     pathname: '/submissions',
          //     state: { type: 'USER_LOGGED_IN', payload: res, user: user }
          // }))

        },
        onFailure: (resp) => {
          console.log("failed login ", resp)
        },
        newPasswordRequired: (resp) => {
          console.log("new password required ", resp)

          // localStorage.setItem('token', token)
          // localStorage.setItem('viewer', JSON.stringify(user))

          // this.setState({ error: false, errorMessage: ""})

          // this.props.dispatch(push({
          //     pathname: '/submissions',
          //     state: { type: 'USER_LOGGED_IN', payload: res, user: user }
          // }))
          
        }
      })
    }
  }

  render() {
    const {
      handleSubmit
    } = this.props

    return (
      <div className="SignInForm__container">

        <h1>Welcome</h1>
        <h3>Please Sign In</h3>

        <FormBuilder
          data={form}
          submitTitle="Sign In"
          submissionButtons={() => (
            <div>
              <ToggleDisplay
                show={this.state.error}
                render={() => <div className="errorMessage">{ this.state.errorMessage }</div>}
              />
              <Button bsStyle="primary" type="submit">Sign In</Button>
              {/*<Button bsStyle='primary' href='/signup'>Register</Button>*/}
            </div>
          )}
          handleSubmit={this.handleSubmit}
        />
      </div>)
  }
}

export default connect()(SignInForm)
