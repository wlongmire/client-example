import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CompleteProfileC from '../../components/shared/CompleteProfile'
import SignupHeaderC from '../../components/shared/SignupHeader'
import AllSetC from '../../components/shared/AllSet'

class CompleteProfilePage extends Component {
  constructor() {
    super()
    this.state = {
      step: 0,
      fade: false
    }
  }
  componentDidMount() {
    document.body.className = 'body-signup-grey'
  }

  componentWillUnmount() {
    document.body.className = ''
  }

  render() {
    const currentHeader = () => {
      console.log('CURRENT STEP', this.state.step)
      switch (this.state.step) {
        case 'loading':
          return (<div />)
        case 0:
          return (<SignupHeaderC header1={''} header2={'Update Your Profile'} />)
        case 1:
          return (<SignupHeaderC header1={''} header2={`You're all set!`} />)
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
          return (<CompleteProfileC user={this.props.user} goToNextStep={() => { return goToNextStep(1) }} />)
        case 1:
          return (<AllSetC />)
        default:
          return (<div />)
      }
    }

    return (
      <div>
        <div className="signupBackground">
          <div className="signupHeader">
            <h1>Your Owner&apos;s Edge account</h1>
            <h3>
              <b>{this.props.user ? this.props.user.username : ''}</b>
              {this.props.user ? ' at: ' : ''}
              <b>{this.props.user ? `${this.props.user.brokerName}` : ''}</b>
            </h3>
          </div>

          <div className="currentHeader">
            {currentHeader()}
          </div>
          <div className="currentStep">
            {currentStep()}
          </div>
        </div>
      </div>
    )
  }
}

CompleteProfilePage.propTypes = {
  user: PropTypes.object
}

export default connect((store) => {
  return {
    user: store.user
  }
}, null)(CompleteProfilePage)