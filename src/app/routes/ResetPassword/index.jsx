import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import SetPasswordC from '../../components/shared/SetPassword'
import CompleteProfileC from '../../components/shared/CompleteProfile'
import SignupHeaderC from '../../components/shared/SignupHeader'
import AllSetC from '../../components/shared/AllSet'
import { login, logout, createAlert, getUserFromRequestCode } from '../../actions/userActions'

export class ForgotPassword extends Component {
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

    if (!this.props.location.query.confirmationCode || !this.props.location.query.request) {
      // Can be triggered after backend is set up... -AK
      this.props.dispatch(createAlert('The Key your provided is incorrect. Please login or contact support if you are experiencing issues!', 'info'))
      // return browserHistory.push('/')
    }

    getUserFromRequestCode(this.props.location.query.request)
      .then((resp, err) => {
        if (!resp.success) {
          this.props.dispatch(createAlert('This password link is no longer valid. Please log in or request another reset.', 'danger'))
          return browserHistory.push('/')
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
          return (<SignupHeaderC header1={''} header2={'Choose a new password'} />)
        case 1:
          return (<SignupHeaderC header1={''} header2={`You're all set!`} />)
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
              confirmationCode={this.props.location.query.confirmationCode}
              request={this.props.location.query.request}
              path={this.props.location.pathname}
            />)
        case 1:
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

ForgotPassword.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object
}

export default connect((store) => {
  return {
    user: store.user
  }
}, null)(ForgotPassword)