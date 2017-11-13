import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import SetPasswordC from '../../components/shared/SetPassword'
import CompleteProfileC from '../../components/shared/CompleteProfile'
import SignupHeaderC from '../../components/shared/SignupHeader'
import AllSetC from '../../components/shared/AllSet'
import { login, logout, createAlert } from '../../actions/userActions'

export class ConfirmSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0,
      errorMessage: null,
      cognitoUser: null,
      fade: false
    }
  }

  componentDidMount() {
    document.body.className = 'body-signup-grey'

    if (!this.props.location.query.key) {
      this.props.dispatch(createAlert('The Key your provided is incorrect. Please login or contact support if you are experiencing issues!', 'info'))
      return browserHistory.push('/')
    }
    const gateway = apigClientFactory.newClient()

    if (this.props.user) {
      this.props.dispatch(logout())
      browserHistory.push(`/confirmSignup?key=${this.props.location.query.key}`)
    }

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
        this.props.dispatch(createAlert('Your account has already been activated. Please log in below!', 'info'))
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
          return (<SignupHeaderC header1={'ACCOUNT STEP 1 OF 3'} header2={'Choose a new password'} />)
        case 1:
          return (<SignupHeaderC header1={'ACCOUNT STEP 2 OF 3'} header2={'Complete your profile'} />)
        case 2:
          return (<SignupHeaderC header1={'ACCOUNT STEP 3 OF 3'} header2={'You are all set!'} />)
        case 'error':
          return (<SignupHeaderC header1={''} header2={`Something is wrong. ${this.state.errorMessage} Please contact support!`} />)
        default:
          return (<SignupHeaderC header1={''} header2={'Something is wrong. Please contact support!'} />)
      }
    }

    const goToNextStep = (step) => {
      return (this.setState({ ...this.state, step, fade: !this.state.fade }))
    }

    const currentStep = () => {
      switch (this.state.step) {
        case 'loading':
          return (<div />)
        case 0:
          return (
            <SetPasswordC
              goToNextStep={() => { return goToNextStep(1) }}
              cognitoUser={this.state.cognitoUser}
              userAttributes={this.state.userAttributes}
              urlKey={this.props.location.query.key}
              path={this.props.location.pathname}
            />)
        case 1:
          return (<CompleteProfileC user={this.props.user} goToNextStep={() => { return goToNextStep(2) }} />)
        case 2:
          return (<AllSetC />)
        default:
          return (<div />)
      }
    }

    return (
      <div className="signupBackground">
        <div className="signupHeader">
          <h1>Your Owner&apos;s Edge account</h1>
          <h3>
            <b>{this.state.cognitoUser ? this.state.cognitoUser.username : ''}</b>
            {this.props.user ? ' at: ' : ''}
            <b>{this.props.user ? `${this.props.user.brokerName}` : ''}</b>
          </h3>
        </div>

        <div className="currentHeader">
          {currentHeader()}
        </div>
        <div className="currentStep">
          <CSSTransition
            timeout={1000}
            classNames="fade"
            in={this.state.fade}
          >
            {currentStep()}
          </CSSTransition>

        </div>
      </div>
    )
  }
}

ConfirmSignup.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default connect((store) => {
  return {
    user: store.user
  }
}, null)(ConfirmSignup)