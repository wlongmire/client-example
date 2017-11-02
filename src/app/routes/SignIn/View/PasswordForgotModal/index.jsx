import React, { Component } from 'react'
import { Button, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'
import FormBuilder from 'components/shared/FormBuilder'
import ToggleDisplay from 'app/components/shared/ToggleDisplay'

import form from './form'

class PasswordForgot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    if (values.email === '') {
      this.setState({
        ...this.state,
        error: true,
        errorMessage: 'Email field is not filled out'
      })
      console.log('getting to this state', this.state)
    } else {
      this.props.handleOK(values)
      console.log('values', values)
    }
  }

  render() {
    const { error, errorMessage } = this.state

    console.log('this.props', this.props)
    return (
      <div className="pawsswordForgotModal">
        <p>Provide the email address you used to set up your account.</p>

        <FormBuilder
          data={form}
          submitTitle="Password Reset"
          submissionButtons={() => (
            <div>
              <Button
                className="btn" type="submit">Submit</Button>

              <Button
                className="btn secondary" onClick={this.props.handleCancel}>Cancel</Button>

              <br />
              <br />
              <ToggleDisplay
                show={error}
                render={() => <div className="errorMessage">{ errorMessage }</div>}
              />
            </div>
          )}
          handleSubmit={this.handleSubmit}
        />
        {/* <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
        <Button className="btn" type="submit">Submit</Button>
        <Button className="btn secondary" onClick={this.props.handleCancel}>Cancel</Button>
        <ToggleDisplay
          show={error}
          render={() => <div className="errorMessage">{ errorMessage }</div>}
        />
        </form> */}
      </div>
    )
  }
}

export default PasswordForgot
