import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import FormBuilder from 'components/shared/FormBuilder'
import config from 'config'
import form from './form.js'

import ToggleDisplay from 'components/shared/ToggleDisplay'
import DialogBox from 'components/shared/DialogBox'

import mx from 'app/utils/MixpanelInterface'
import { Button } from 'react-bootstrap'

import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js'

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: '',
      showResetModal: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleResetModalOk = this.handleResetModalOk.bind(this)
    this.handleResetModalCancel = this.handleResetModalCancel.bind(this)
  }

  handleResetModalOk() {
    this.setState({ showResetModal: false })
  }

  handleResetModalCancel() {
    this.setState({ showResetModal: false })
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
          console.log('login successful', resp)

          localStorage.setItem('token', token)
          localStorage.setItem('viewer', JSON.stringify(resp))

          this.setState({ error: false, errorMessage: '' })

          this.props.dispatch(push({
            pathname: '/submissions',
            state: { type: 'USER_LOGGED_IN', payload: resp, user: resp }
          }))
        },
        onFailure: (err) => {
          const error = String(err)

          console.log('failed login ', error.slice(0, error.indexOf(':')))
        },
        newPasswordRequired: (resp) => {
          console.log('new password required ', resp)
          this.setState({ showResetModal: true })
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

        <DialogBox
          custom_class="resetDialog"
          title="Reset Password"
          show={this.state.showResetModal}
        >
          <div>
            <h4>This is a temperary password. Click below to reset.</h4>

            
            <Button
              className="btn secondary"
              onClick={this.handleResetModalOk}
            >OK</Button>
            <Button
              className="btn"
              onClick={this.handleResetModalCancel}
            >Cancel</Button>
          
          </div>
        </DialogBox>

      </div>)
  }
}

export default connect()(SignInForm)
