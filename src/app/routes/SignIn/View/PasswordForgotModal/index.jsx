import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'
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
    this.props.handleOK(values)
    console.log('values', values)
  }

  render() {
    const { error, errorMessage } = this.props

    console.log('this.props', this.props)
    return (
      <div className="pawsswordForgotModal">
        <p>Provide the email address you used to set up your account.</p>

        <FormBuilder
          data={form}
          submitTitle="Password Reset"
          submissionButtons={() => (
            <div>
              <Button className="btn" type="submit">Submit</Button>
              <Button className="btn secondary" onClick={this.props.handleCancel}>Cancel</Button>

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
      </div>
    )
  }
}

PasswordForgot.propTypes = {
  error: PropTypes.string,
  errorMessage: PropTypes.string,
  handleOK: PropTypes.func,
  handleCancel: PropTypes.func
}

export default PasswordForgot
