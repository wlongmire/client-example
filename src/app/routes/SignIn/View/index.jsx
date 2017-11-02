import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import FormBuilder from 'components/shared/FormBuilder'
import form from './form.js'

import ToggleDisplay from 'app/components/shared/ToggleDisplay'
import DialogBox from 'components/shared/DialogBox'

import { Button } from 'react-bootstrap'

import PasswordResetModal from './PasswordResetModal'
import PasswordForgot from './PasswordForgotModal'
import config from 'config'

import { login, setNewPassword } from 'app/actions/userActions'

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: '',
      showForgotPassword: false,
      passwordForgotError: false,
      passwordForgotMessage: '',
      showResetModal: false,
      passwordResetError: false,
      passwordResetErrorMessage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleResetModalOk = this.handleResetModalOk.bind(this)
    this.handleResetModalCancel = this.handleResetModalCancel.bind(this)
    this.handleForgotModalCancel = this.handleForgotModalCancel.bind(this)
    this.handleForgotModalSubmit = this.handleForgotModalSubmit.bind(this)
  }

  componentDidMount() {
    // if user is logged in, redirect to submissions page
    // logged in user should not be able to access login screen unless they are
    // logged out
    if (this.props.user && this.props.user.username) {
      browserHistory.push('/submissions')
    }
  }

  handleForgotModalSubmit(values) {
    console.log('Testing Modale Values', values)
    browserHistory.push('/forgotpassword')
  }
  handleForgotModalCancel(values) {
    console.log('handleForgotModalCancel', values)
    this.setState({
      ...this.state,
      showForgotPassword: false,
      passwordForgotError: false,
      passwordForgotMessage: ''
    })
  }

  handleResetModalOk(values) {
    const { newPassword, rePassword } = values

    if (newPassword === '') {
      this.setState({ passwordResetError: true, passwordResetErrorMessage: 'Please Enter a Valid Username.' })
    } else if (rePassword === '') {
      this.setState({ passwordResetError: true, passwordResetErrorMessage: 'Please reenter your Password.' })
    } else if (newPassword !== rePassword) {
      this.setState({ passwordResetError: true, passwordResetErrorMessage: 'Your passwords do not match.' })
    } else {
      setNewPassword(
        this.state.cognitoUser,
        newPassword,
        {
          name: this.state.userAttributes.email,
          preferred_username: this.state.userAttributes.email
        },
        () => {
          this.setState({ showResetModal: false })
        },
        (err) => {
          const error = String(err)
          const errorType = error.slice(error.indexOf('policy:') + 7, error.length)
          this.setState({ passwordResetError: true, passwordResetErrorMessage: `${errorType}.` })
        })
    }
  }

  handleResetModalCancel() {
    this.setState({ passwordResetError: false, passwordResetMessage: '', showResetModal: false })
  }

  handleSubmit(values) {
    if (values.username === '') {
      this.setState({ error: true, errorMessage: 'Please Enter a Valid Username.' })
    } else if (values.password === '') {
      this.setState({ error: true, errorMessage: 'Please Enter a Valid Password.' })
    } else {
      this.props.dispatch(login(
        values.username,
        values.password,
        (cognito, subId, cognitoUser, tokenExpireTime, userData) => {
          // if user has profile filled out then redirect to submissions
          // otherwise ask user to fill out profile
          const { firstName, lastName, phone } = userData
          if (firstName && lastName && phone) {
            browserHistory.push('/submissions')
          } else {
            browserHistory.push('/completeprofile')
          }


          this.setState({ error: false, errorMessage: '' })
        },
        (err) => {
          console.log('error: ', err)

          const errorMap = {
            NotAuthorizedException: `${(err.message === 'User is disabled') ? `User is disabled.
            If you believe this is an error, please contact the administrator.` : `${err.message}`}`,
            UserNotFoundException: 'This Username is not within our records.',
            MigrationReset: 'Please contact us to reset your password.',
            InternalError: 'This Username is not within our records.'
          }
          const error = String(err)
          const errorType = (error.indexOf(':') !== -1) ? error.slice(0, error.indexOf(':')) : error

          this.setState({ error: true, errorMessage: errorMap[errorType] })
        },
        (userAttributes, cognitoUser) => {
          this.setState({
            error: false,
            errorMessage: '',
            showResetModal: true,
            cognitoUser,
            userAttributes
          })
        }
      ))
    }
  }

  render() {
    const showForgotModal = () => {
      return (this.setState({
        ...this.state,
        showForgotPassword: true
      }))
    }

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
              <br />
              <br />
              <div className="forgotPassword" onClick={() => { return showForgotModal() }}>Forgot your password?</div>
            </div>
          )}
          handleSubmit={this.handleSubmit}
        />

        <DialogBox
          custom_class="resetDialog"
          title="Reset Password"
          show={this.state.showResetModal}
        >
          <PasswordResetModal
            error={this.state.passwordResetError}
            errorMessage={this.state.passwordResetErrorMessage}
            handleOK={this.handleResetModalOk}
            handleCancel={this.handleResetModalCancel}
          />
        </DialogBox>


        <DialogBox
          custom_class="resetDialog"
          title="Reset Your Password"
          show={this.state.showForgotPassword}
          /* show={false} */
        >
          <PasswordForgot
            error={this.state.passwordResetError}
            errorMessage={this.state.passwordResetErrorMessage}
            handleOK={this.handleForgotModalSubmit}
            handleCancel={this.handleForgotModalCancel}
          />
        </DialogBox>

      </div>)
  }
}

SignInForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default connect((store) => {
  return {
    user: store.user
  }
})(SignInForm)