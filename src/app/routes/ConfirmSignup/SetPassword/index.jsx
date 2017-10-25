import React, { Component } from 'react'
import { Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import FormBuilder from 'components/shared/FormBuilder'
import ToggleDisplay from 'app/components/shared/ToggleDisplay'
import form from '../signupForms/newPassword'
import { setNewPassword } from '../../../actions/userActions'

class SetPassword extends Component {
  constructor() {
    super()

    this.state = {
      pwdLength: false,
      pwdNumber: false,
      pwdSpChar: false,
      caseChar: false,
      passwordMatch: null,
      disabledFlag: true

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // this.disableFlag()
  }
  handleSubmit(e) {
    e.preventDefault()

    console.log("Values from set PASSWORD", e.target)

    const { pwd, confirmPwd } = this.state
    console.log('pwd', pwd)
    console.log('confirmPwd', confirmPwd)

    if (pwd === '') {
      alert('MISSING PASSWROD')
      // this.setState({ passwordResetError: true, passwordResetErrorMessage: 'Please Enter a Valid Password.' })
    } else if (pwd !== confirmPwd) {
      this.setState({ ...this.state, passwordMatch: false, submitError: true, submitErrorMessage: 'Passwords must match!' })
    } else {
      setNewPassword(
        this.props.cognitoUser,
        pwd,
        {
          name: this.props.userAttributes.email,
          preferred_username: this.props.userAttributes.email
        },
        () => {
          // this.setState({ showResetModal: false })
          // on SUCCESS
          console.log("YOU MADE IT BRO")
          return this.props.goToNextStep()
        },
        (err) => {
          // on FAILURE

          const error = String(err)
          const errorType = error.slice(error.indexOf('policy:') + 7, error.length)
          return this.setState({ ...this.state, submitError: true, submitErrorMessage: `${errorType}.` })
        })
    }
    // return this.props.goToNextStep()
  }

  render() {
    const validatePassword = (e) => {
      const pwd = e.target.value
      const valid = {}
      valid.pwdLength = (pwd.length >= 8) || false

      const numberMatches = pwd.match(/\d+/g)
      valid.pwdNumber = numberMatches != null // single equal sign is important (!=)
      valid.pwdSpChar = pwd.match(/[\W]/) !== null // double equal sign is important (!==)
      valid.caseChar = (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) !== null

      if (valid.pwdLength === true && valid.pwdNumber === true && valid.pwdSpChar === true && valid.caseChar) {
        this.setState({ ...this.state, pwd, ...valid, submitError: false, disabledFlag: false })
      } else {
        this.setState({ ...this.state, pwd, ...valid, submitError: false, disabledFlag: true })
      }
    }

    const validateConfirmPassword = (e) => {
      const confirmPwd = e.target.value
      this.setState({ ...this.state, confirmPwd, submitError: false, passwordMatch: null })
    }

    console.log('THIS.STATE', this.props)
    const checkMark = <i className="fa fa-check pwdCheckmark" aria-hidden="true" />


    const helpBlock = (text, helpClass) => {
      return (<HelpBlock className={`${helpClass}`} >{text}</HelpBlock>)
    }

    return (
      <div className="setPassword">
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  id="password"
                  type="password"
                  label="Text"
                  onChange={validatePassword}
                />
                {(this.state.disabledFlag === false) ? helpBlock('Password Requirements met!', 'helpBlockGreen') : helpBlock('Please conform to password standards.', '')}
              </FormGroup>
              <FormGroup controlId="confirmPassword">
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  id="confirmPassword"
                  type="password"
                  label="Text"
                  onChange={validateConfirmPassword}
                />
                {(this.state.passwordMatch === false) && helpBlock('Passwords must match!', 'helpBlockRed')}
              </FormGroup>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <div className="pwdRequirements">
                <h4>Must contain:</h4>
                <div>{(this.state.pwdLength === true ? checkMark : <div />)} At least 8 characters</div>
                <div>{(this.state.pwdNumber === true ? checkMark : <div />)} A number</div>
                <div>{(this.state.pwdSpChar === true ? checkMark : <div />)} A special character</div>
                <div>{(this.state.caseChar === true ? checkMark : <div />)} Both upper & lowercase letters</div>
              </div>
            </Col>
          </Row>
          <Row className="passwordSetSubmit">
            <Button disabled={this.state.disabledFlag} type="submit">Set Password</Button>
            {(this.state.submitError === true) && helpBlock(`There is an error in submission! ${this.state.submitErrorMessage}`, 'helpBlockRed')}
          </Row>
        </form>
      </div>
    )
  }
}

export default SetPassword