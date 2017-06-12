import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import FormBuilder from 'components/shared/FormBuilder'
import form from './form.js'

import ToggleDisplay from 'components/shared/ToggleDisplay'
import DialogBox from 'components/shared/DialogBox'

import { Button } from 'react-bootstrap'

import PasswordResetModal from './PasswordResetModal'
import config from 'config'

import { login, getUserAttributes, setNewPassword } from 'app/actions/userActions'
import { USER_LOGGED_IN, SET_API_GATEWAY_CLIENT } from 'src/app/constants/user'

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: '',

      showResetModal: false,
      passwordResetError: false,
      passwordResetErrorMessage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleResetModalOk = this.handleResetModalOk.bind(this)
    this.handleResetModalCancel = this.handleResetModalCancel.bind(this)
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
          email: this.state.userAttributes.email,
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
        (cognito, subId, cognitoUser) => {
          this.setState({ error: false, errorMessage: '' })

          // AK_TO_DO
          getUserAttributes(cognitoUser).then(({ err, result }) => {
            if (err) {
              console.log(err)
              alert('error ', err)
            }
            console.log('USER ATTRIBUTES 23', result)

            const brokerId = result.filter((item) => {
              return item.Name == 'custom:brokerId'
            })

            console.log('brokerID xx222', brokerId)

            this.props.dispatch({
              type: USER_LOGGED_IN,
              payload: {
                cognito,
                subId: result[0].Value,
                username: values.username,
                email: values.username,
                broker: {
                  id: '123213131312',
                  name: 'Broker',
                  address: '2923 N 27th Street',
                  city: 'philadelphia',
                  state: 'PA',
                  zipcode: '19132'
                }

              }
            })
          })

          this.props.dispatch(push({ pathname: '/submissions' }))
        },
        (err) => {
          const errorMap = {
            NotAuthorizedException: 'Your Username/Password combination does not match our records.',
            UserNotFoundException: 'This Username is not within our records.'
          }
          const error = String(err)
          const errorType = error.slice(0, error.indexOf(':'))
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

      </div>)
  }
}

export default connect()(SignInForm)