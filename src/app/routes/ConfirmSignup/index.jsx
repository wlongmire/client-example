import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import SetPassword from './SetPassword'
import CompleteProfile from './CompleteProfile'
import SignupHeader from './SignupHeader'
import AllSet from './AllSet'
import { login, logout, createAlert } from '../../actions/userActions'

class ConfirmSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      errorMessage: null,
      cognitoUser: null
    }
  }

  componentDidMount() {
    document.body.className = 'body-signup-grey'

    if (!this.props.location.query.key) {
      this.props.dispatch(createAlert('The Key your provided is incorrect. Please login or contact support if you are experiencing issues!', 'info'))
      return browserHistory.push('/')
    }
    const gateway = apigClientFactory.newClient()

    // if (this.props.user) {
    //   this.props.dispatch(logout())
    // }
    return gateway.apiInviteGet({ urlKey: this.props.location.query.key }, {}).then((response, err) => {
      if (err) {
        return (this.setState({ ...this.state, step: 'error', errorMessage: err.message }))
      }

      if (response && response.data && response.data.success === true) {
        const { u, p } = response.data.data
        this.props.dispatch(login(
          u,
          p,
          () => {
            // this is an on success function. it should NEVER be triggered, we are resetting the password

            this.setState({ ...this.state, step: 'error', errorMessage: 'There is an error in resetting password' })
          },
          (err2) => {
            console.log('ERROR:', err2)

            const errorMap = {
              NotAuthorizedException: `${(err2.message === 'User is disabled') ? `User is disabled.
              If you believe this is an error, please contact the administrator.` : `${err2.message}`}`,
              UserNotFoundException: 'This Username is not within our records.',
              MigrationReset: 'Please contact us to reset your password.',
              InternalError: 'This Username is not within our records.'
            }
            const error = String(err2)
            const errorType = (error.indexOf(':') !== -1) ? error.slice(0, error.indexOf(':')) : error

            this.setState({ ...this.state, step: 'error', errorMessage: errorMap[errorType] })
          },
          (userAttributes, cognitoUser) => {
            this.setState({
              ...this.state,
              errorMessage: null,
              step: 0,
              cognitoUser,
              userAttributes
            })
          }
        ))
      } else {
       // AK_TO_DO
        this.props.dispatch(createAlert('The user is already created. Please login or contact support if you are experiencing issues!', 'info'))
        browserHistory.push('/')
      }
    })
  }

  componentWillUnmount() {
    document.body.className = ''
  }

  render() {
    const currentHeader = () => {
      switch (this.state.step) {
        case 'loading':
          return (<div />)
        case 0:
          return (<SignupHeader header1={'ACCOUNT STEP 1 OF 3'} header2={'Choose a new password'} />)
        case 1:
          return (<SignupHeader header1={'ACCOUNT STEP 2 OF 3'} header2={'Complete your profile'} />)
        case 2:
          return (<SignupHeader header1={'ACCOUNT STEP 3 OF 3'} header2={'You are all set!'} />)
        case 'error':
          return (<SignupHeader header1={''} header2={`Something is wrong. ${this.state.errorMessage} Please contact support!`} />)
        default:
          return (<SignupHeader header1={''} header2={'Something is wrong. Please contact support!'} />)
      }
    }

    const goToNextStep = (step) => {
      return (this.setState({ ...this.state, step }))
    }

    const currentStep = () => {
      switch (this.state.step) {
        case 'loading':
          return (<div />)
        case 0:
          return (
            <SetPassword
              goToNextStep={() => { return goToNextStep(1) }}
              cognitoUser={this.state.cognitoUser}
              userAttributes={this.state.userAttributes}
              urlKey={this.props.location.query.key}
            />)
        case 1:
          return (<CompleteProfile goToNextStep={() => { return goToNextStep(2) }} />)
        case 2:
          return (<AllSet />)
        default:
          return (<div />)
      }
    }

    const userDetails = () => {
      return (
        this.state.cognitoUser ? this.state.cognitoUser.username : ''
      )
    }

    return (
      <div className="signupBackground">
        <div className="signupHeader">
          <h1>Your Owner&apos;s Edge account</h1>
          <h3>{userDetails()}</h3>
        </div>

        <div className="currentHeader">
          {currentHeader()}
        </div>
        <div className="currentStep">
          {currentStep()}
        </div>
      </div>
    )
  }
}

ConfirmSignup.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func.isRequired

}

export default connect((store) => {
  return {
    user: store.user
  }
}, null)(ConfirmSignup)