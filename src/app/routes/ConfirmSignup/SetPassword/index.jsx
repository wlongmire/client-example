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
      passwordMatch: null

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.disableFlag = this.disableFlag.bind(this)
  }

  componentDidMount() {
    // this.disableFlag()
  }
  handleSubmit(e) {
    e.preventDefault()

    // console.log("Values from set PASSWORD", e.target)

    // const { pwd, confirmPwd } = this.state
    // console.log('pwd', pwd)
    // console.log('confirmPwd', confirmPwd)

    // if (pwd === '') {
    //   alert('MISSING PASSWROD')
    //   // this.setState({ passwordResetError: true, passwordResetErrorMessage: 'Please Enter a Valid Password.' })
    // } else if (pwd !== confirmPwd) {
    //   this.setState({ ...this.state, passwordMatch: false })
    // } else {
    //   setNewPassword(
    //     this.props.cognitoUser,
    //     pwd,
    //     {
    //       name: this.state.userAttributes.email,
    //       preferred_username: this.state.userAttributes.email
    //     },
    //     () => {
    //       // this.setState({ showResetModal: false })
    //       // on SUCCESS
    //       return this.props.goToNextStep()
    //     },
    //     (err) => {
    //       // on FAILURE

    //       const error = String(err)
    //       const errorType = error.slice(error.indexOf('policy:') + 7, error.length)
    //       this.setState({ passwordResetError: true, passwordResetErrorMessage: `${errorType}.` })
    //     })
    // }
    return this.props.goToNextStep()
  }

  disableFlag() {
    const { pwdNumber, pwdSpChar, caseChar, pwdLength } = this.state
    if (
      pwdNumber === true &&
      pwdSpChar === true &&
      caseChar === true &&
      pwdLength === true
    ) {
      return this.setState({ ...this.state, disableFlag: false })
      // return false
    }
    return this.setState({ ...this.state, disableFlag: true })
    // return true
  }
    // if you want to manually go to the next step
    // return this.props.goToNextStep()

  render() {
    const validatePassword = (e) => {
      const pwd = e.target.value
      const validation = {}
      validation.pwdLength = (pwd.length >= 8) || false

      const numberMatches = pwd.match(/\d+/g)
      validation.pwdNumber = numberMatches != null // single equal sign is important (!=)
      validation.pwdSpChar = pwd.match(/[\W]/) !== null // double equal sign is important (!==)
      validation.caseChar = (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) !== null

      this.setState({ ...this.state, pwd, ...validation })
    }

    const validateConfirmPassword = (e) => {
      const confirmPwd = e.target.value
      this.setState({ ...this.state, confirmPwd, passwordMatch: null })
    }

    const disableFlag = () => {
      const { pwdNumber, pwdSpChar, caseChar, pwdLength } = this.state
      if (
        pwdNumber === true &&
        pwdSpChar === true &&
        caseChar === true &&
        pwdLength === true
      ) {
        // this.setState({ ...this.state, disableFlag: false })
        return false
      }
      // this.setState({ ...this.state, disableFlag: true })
      return true
    }

    console.log("THIS.STATE", this.state)
    const { error, errorMessage } = this.props

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
                {(this.state.disableFlag === false) && helpBlock('Please conform to password standards.', '')}
                {(this.state.disableFlag === true) && helpBlock('Please conform to password standards.', 'helpBlockGreen')}
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
              {/* <FormBuilder
                data={form}
                submitTitle="Password Reset"
                submissionButtons={() => (
                  <div>
                    <ToggleDisplay
                      show={error}
                      render={() => <div className="errorMessage">{ errorMessage }</div>}
                    />
                    <Button
                      className="btn" type="submit"
                    >Set Password</Button>
                  </div>
                )}
                handleSubmit={this.handleSubmit}
              /> */}
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
            <Button type="submit">Set Password</Button>
            {/* disabled={disableFlag()}  */}
          </Row>
        </form>
      </div>
    )
  }
}

export default SetPassword