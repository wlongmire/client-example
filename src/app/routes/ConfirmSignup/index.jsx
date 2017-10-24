import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import FormBuilder from 'components/shared/FormBuilder'
import ToggleDisplay from 'app/components/shared/ToggleDisplay'
import form from './signupForms/newPassword'
import SetPassword from './SetPassword'
import CompleteProfile from './CompleteProfile'
import SignupHeader from './SignupHeader'
import AllSet from './AllSet'

class ConfirmSignup extends Component {
  constructor() {
    super()
    this.state = {
      step: 0
    }
  }
  componentDidMount() {
    // console.log("HITTINTTWER#@R#$#$#$R%#$%#$#$#$$##$ ")
    // document.html.style.backgroundColor = 'red !important'
    // // document.body.className = 'body-signup'
    // console.log('DOCUMENT BODY', document.body)

    return apigClient.apiInviteGet({ urlKey: this.props.location.query.key }, {}).then((response, err) => {
      console.log("RESPONSE =====> TESTINGWRWERWE", response)
      console.log("ERROR TESTING ===>", err)
    })
  }

  render() {
    const { error, errorMessage } = this.props

    console.log('this.props.location.query.key', this.props.location.query.key)

    const currentHeader = () => {
      switch (this.state.step) {
        case 0:
          return (<SignupHeader header1={'ACCOUNT STEP 1 OF 3'} header2={'Choose a new password'} />)
        case 1:
          return (<SignupHeader header1={'ACCOUNT STEP 2 OF 3'} header2={'Complete your profile'} />)
        case 2:
          return (<SignupHeader header1={'ACCOUNT STEP 3 OF 3'} header2={'You are all set!'} />)
        default:
          return (<SignupHeader header1={'...'} header2={'Something is wrong. Please contact support!'} />)
      }
    }

    const goToNextStep = (step) => {
      console.log('HTTING THIS STEP', step)
      return (this.setState({ ...this.state, step }))
    }

    const currentStep = () => {
      switch (this.state.step) {
        case 0:
          return (<SetPassword goToNextStep={() => { return goToNextStep(1) }} />)
        case 1:
          return (<CompleteProfile goToNextStep={() => { return goToNextStep(2) }} />)
        case 2:
          return (<AllSet />)
        default:
          return (<div />)
      }
    }

    return (
      <div className="signupBackground">
        <div className="signupHeader">
          <h1>Your Owners Edge account</h1>
          <h3>email @ Acme</h3>
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

export default ConfirmSignup