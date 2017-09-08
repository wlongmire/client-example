import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import FormBuilder from 'components/shared/FormBuilder'
import ToggleDisplay from 'app/components/shared/ToggleDisplay'

import form from './form'

class PasswordReset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      errorMessage: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    this.props.handleOK(values)
  }

  render() {
    const { error, errorMessage } = this.props

    return (
      <div className="PasswordReset">
        <h4>This password has been supplied to you through our administators.</h4>
        <h4>Please Enter a new password below.</h4>

        <FormBuilder
          data={form}
          submitTitle="Password Reset"
          submissionButtons={() => (
            <div>
              <ToggleDisplay
                show={error}
                render={() => <div className="errorMessage">{ errorMessage }</div>}
              />
              <Button
                className="btn secondary" type="submit">OK</Button>

              <Button
                className="btn" onClick={this.props.handleCancel}>Cancel</Button>
            </div>
          )}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default PasswordReset
