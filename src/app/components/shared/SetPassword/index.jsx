import React, { Component, PropTypes } from 'react'
import { Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setNewPassword, login, userConfirmPassword } from '../../../actions/userActions'
import { newPasswordInitialized, newPasswordSaved } from '../../../actions/signupActions'
import ToggleDisplay from './../ToggleDisplay'

export class SetPassword extends Component {
  constructor() {
    super()

    this.state = {
      pwdLength: false,
      pwdNumber: false,
      pwdSpChar: false,
      caseChar: false,
      passwordMatch: null,
      disabledFlag: true,
      submitted: false,
      confirmPwdReqs: null,
      badPassConfFocus: null,
      userEmail: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(props) {
    if (!this.state.userEmail && props.userAttributes && props.userAttributes.email) {
      this.setState({
        userEmail: props.userAttributes.email
      }, () => {
        this.props.dispatch(newPasswordInitialized(this.state.userEmail))
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({...this.state, submitted:true})
    const { pwd, confirmPwd, pwdLength, caseChar, pwdSpChar, pwdNumber } = this.state
    let errorMsg = ''
    if (!pwdLength || !pwdNumber || !pwdSpChar || !caseChar || pwd !== confirmPwd) errorMsg += `Sorry, you need to include the following:<br/><br/>`

    if (!pwdLength) errorMsg += 'At least 8 characters <br/><br/>'
    if (!pwdNumber) errorMsg += `A number <br/><br/>`
    if (!pwdSpChar) errorMsg += `A special character (!@#$%^&*).<br/><br/>`
    if (!caseChar) errorMsg += `Both upper and lowercase characters <br/><br/>`
    if (pwd !== confirmPwd) errorMsg += 'Your passwords must match <br/><br/>'

    if (pwd.indexOf('+') > -1 || pwd.indexOf('=') > -1 || pwd.indexOf(' ') > -1) errorMsg += `Sorry, your password includes a special character we can't process. Please start over and avoid the following: +, =, or spaces`

    if (errorMsg.length > 0) {
      this.setState({ ...this.state, submitError: true, submitErrorMessage: errorMsg })
    } else {
      // -AK YOu might WANT TO ADD AN ELSE STATEMENT HERE FOR forgot Password
      // cognitoUser.confirmPassword ... onSuccess
      // Use case #12 in https://github.com/aws/amazon-cognito-identity-js
      if (this.props.path.toLowerCase() === '/resetpassword') {
        const t0 = performance.now()
        userConfirmPassword(this.props.confirmationCode, this.props.request, pwd,
          (email) => {
            const t1 = performance.now()
            console.log(`the setNewPassowrdFunction took ${t1 - t0} milliseconds`)
            this.props.dispatch(login(
              email,
              pwd,
              () => {
                const t2 = performance.now();
                console.log(`the login took ${t2 - t1} milliseconds`)
                apigClient.apiResetcodeCodeDelete({code: this.props.request}, { code: this.props.request }).then((response, err) => {
                  return this.props.goToNextStep()
                })
              },
              (err2) => {
                console.log('ERROR WHEN LOGGING IN:', err2)

                const errorMap = {
                  NotAuthorizedException: `${(err2.message === 'User is disabled') ? `User is disabled.
                  If you believe this is an error, please contact the administrator.` : `${err2.message}`}`,
                  UserNotFoundException: 'This Username is not within our records.',
                  MigrationReset: 'Please contact us to reset your password.',
                  InternalError: 'This Username is not within our records.'
                }
                const error = String(err2)
                const errorType = (error.indexOf(':') !== -1) ? error.slice(0, error.indexOf(':')) : error

                this.setState({ ...this.state, submitError: true, submitErrorMessage: errorMap[errorType], disabledFlag:false, submitted:false })
              }))
            },
          (err) => {
            // on FAILURE

            const error = String(err)
            const errorType = error.slice(error.indexOf('policy:') + 7, error.length)
            return this.setState({ ...this.state, submitError: true, submitErrorMessage: `${errorType}.`, disabledFlag:false,submitted:false })
          })
      } else {
      const t0 = performance.now();
      setNewPassword(
        this.props.cognitoUser,
        pwd,
        {
          name: this.props.userAttributes.email,
          preferred_username: this.props.userAttributes.email
        },
        () => {
          // on SUCCESS
          const t1 = performance.now();
          console.log(`the setNewPassowrdFunction took ${t1 - t0} milliseconds`)
          this.props.dispatch(newPasswordSaved(this.props.userAttributes.email))
          this.props.dispatch(login(
            this.props.cognitoUser.username,
            pwd,
            () => {
              // this is an on success login function
              const t2 = performance.now();
              console.log(`the login took ${t2 - t1} milliseconds`)
              apigClient.apiInviteDelete({}, { username: this.props.cognitoUser.username }).then((response, err) => {
                return this.props.goToNextStep()
              })
            },
            (err2) => {
              console.log('ERROR WHEN LOGGING IN:', err2)

              const errorMap = {
                NotAuthorizedException: `${(err2.message === 'User is disabled') ? `User is disabled.
                If you believe this is an error, please contact the administrator.` : `${err2.message}`}`,
                UserNotFoundException: 'This Username is not within our records.',
                MigrationReset: 'Please contact us to reset your password.',
                InternalError: 'This Username is not within our records.'
              }
              const error = String(err2)
              const errorType = (error.indexOf(':') !== -1) ? error.slice(0, error.indexOf(':')) : error

              this.setState({ ...this.state, submitError: true, submitErrorMessage: errorMap[errorType], disabledFlag:false,submitted:false })
            },
            () => {
              // This is on password reset. this function should never be called here. if it is something is wrong.
              this.setState({
                ...this.state,
                submitError: true,
                submitErrorMessage: 'There was an error logging in after resetting password. Please contact support'
              })
            }
          ))
        },
        (err) => {
          // on FAILURE

          const error = String(err)
          const errorType = error.slice(error.indexOf('policy:') + 7, error.length)
          return this.setState({ ...this.state, submitError: true, submitErrorMessage: `${errorType}.`, disabledFlag:false,submitted:false })
        })
      }
    }
  }

  render() {
    const fullStyle = {
      opacity: 1
    }
    const dimmedStyle = {
      opacity: 0.6
    }

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

    const validatePasswordHelpText = (e) => {
      const pwd = e.target.value
      const valid = {}
      valid.pwdLength = (pwd.length >= 8) || false

      const numberMatches = pwd.match(/\d+/g)
      valid.pwdNumber = numberMatches != null // single equal sign is important (!=)
      valid.pwdSpChar = pwd.match(/[\W]/) !== null // double equal sign is important (!==)
      valid.caseChar = (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) !== null
      if (valid.pwdLength === true && valid.pwdNumber === true && valid.pwdSpChar === true && valid.caseChar) {
        this.setState({ ...this.state, pwd, ...valid, submitError: false, disabledFlag: false, confirmPwdReqs: true })
      } else {
        this.setState({ ...this.state, pwd, ...valid, submitError: false, disabledFlag: true, confirmPwdReqs: false })
      }
    }

    const validatePasswordReqs = () => {
      if (!this.state.caseChar || !this.state.pwdLength || !this.state.pwdSpChar || !this.state.pwdNumber) {
        this.setState({...this.state, badPassConfFocus: true})
      } else {this.setState({...this.state, badPassConfFocus: null})}
    }

    const validateConfirmPassword = (e) => {
      const confirmPwd = e.target.value
      if (this.state.badPassConfFocus === true) {
        return
      }

      if (confirmPwd && (confirmPwd !== this.state.pwd)) {
        this.setState({ ...this.state, confirmPwd, submitError: false, passwordMatch: false })
      } else if (confirmPwd && (confirmPwd === this.state.pwd)) {
        this.setState({ ...this.state, confirmPwd, submitError: false, passwordMatch: true })
      } else {
        this.setState({ ...this.state, confirmPwd, submitError: false, passwordMatch: null })
      }
    }

    const checkMark = <i className="fa fa-check pwdCheckmark" aria-hidden="true" />
    const arrow = <i className="fa fa-arrow-right pwdArrow" aria-hidden="true" />


    const helpBlock = (text, helpClass) => {
      return (<HelpBlock className={`${helpClass}`} dangerouslySetInnerHTML={{__html:text}} ></HelpBlock>)
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
                  onBlur={validatePasswordHelpText}
                  onChange={validatePassword}
                />
                {(this.state.confirmPwdReqs === true) && helpBlock('Password Requirements met!', 'helpBlockGreen')}
                {(this.state.confirmPwdReqs === false) && helpBlock(`Password doesn't meet requirements.`, 'helpBlockRed')}
              </FormGroup>
              <FormGroup controlId="confirmPassword">
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  id="confirmPassword"
                  type="password"
                  label="Text"
                  onChange={validateConfirmPassword}
                  onFocus={validatePasswordReqs}
                />
                {(this.state.badPassConfFocus === true)&& helpBlock(`Wait! The above password doesn't meet requirements.`, 'helpBlockRed')}
                {(this.state.passwordMatch === false) && helpBlock('Your Passwords must match!', 'helpBlockRed')}
                {(this.state.passwordMatch === true) && helpBlock('Passwords match!', 'helpBlockGreen')}
              </FormGroup>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <div className="pwdRequirements">
                <h4>Must contain:</h4>
                <div style={this.state.pwdLength === true ? dimmedStyle:fullStyle}>{(this.state.pwdLength === true ? checkMark : arrow)} At least 8 characters</div>
                <div style={this.state.pwdNumber === true ? dimmedStyle:fullStyle}>{(this.state.pwdNumber === true ? checkMark : arrow)} A number</div>
                <div style={this.state.pwdSpChar === true ? dimmedStyle:fullStyle}>{(this.state.pwdSpChar === true ? checkMark : arrow)} A special character</div>
                <div style={this.state.caseChar === true ? dimmedStyle:fullStyle}>{(this.state.caseChar === true ? checkMark : arrow)} Both upper & lowercase letters</div>
              </div>
            </Col>
          </Row>
          <Row className="passwordSetSubmit">
            <Button disabled={this.state.submitted} bsStyle="primary" type="submit">Set Password</Button>
            {(this.state.submitError === true) && helpBlock(`<br/> ${this.state.submitErrorMessage}`, 'helpBlockRed')}
            <br/>
            <br/>
            <ToggleDisplay
            show={this.state.submitted}
            render={() => (
              <div>
                <span>Updating your password...</span>
              </div>)} />
          </Row>
        </form>
      </div>
    )
  }
}

SetPassword.propTypes = {
  goToNextStep: PropTypes.func,
  cognitoUser: PropTypes.object,
  userAttributes: PropTypes.object,
  dispatch: PropTypes.func

}

export default connect()(SetPassword)