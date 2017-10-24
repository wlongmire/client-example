import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import FormBuilder from 'components/shared/FormBuilder'
import ToggleDisplay from 'app/components/shared/ToggleDisplay'
import form from './signupForms/newPassword'
import SetPassword from './SetPassword'
import SignupHeader from './SignupHeader'

class ConfirmSignup extends Component {
  constructor() {
    super()
    this.state = {
      step: 0
    }
  }
  componentDidMount() {
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
          return (<SignupHeader header1={'ACCOUNT STEP 2 OF 3'} header2={'Completed your profile'} />)
        case 2:
          return (<SignupHeader header1={'ACCOUNT STEP 3 OF 3'} header2={'You are all set!'} />)
        default:
          return (<SignupHeader header1={'...'} header2={'Something is wrong. Please contact support!'} />)
      }
    }

    const currentStep = () => {
      switch (this.state.step) {
        case 0:
          return (<SetPassword />)
        case 1:
          return (<div> CASE 1</div>)
        default:
          return (<div> something is wrong, please contact administrator</div>)
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
        <div>TESTING CONFIRM SIGNUP COMPONENT {this.props.location.query.key}</div>
      </div>
    )
  }
}

export default ConfirmSignup