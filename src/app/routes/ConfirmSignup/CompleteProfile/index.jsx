import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import FormBuilder from 'components/shared/FormBuilder'
import ToggleDisplay from 'app/components/shared/ToggleDisplay'
import form from '../signupForms/completeProfile'

class CompleteProfile extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    console.log("Values from set COMPLETE PROFILE", values)
    return this.props.goToNextStep()
  }

  render() {
    const { error, errorMessage } = this.props
    return (
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
              className="btn" type="submit"
            >Complete Profile</Button>
          </div>
        )}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default CompleteProfile