import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import FormBuilder from 'components/shared/FormBuilder'
import ToggleDisplay from 'app/components/shared/ToggleDisplay'
import form from '../signupForms/completeProfile'
import { editProfile } from '../../../actions/userActions'

class CompleteProfile extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    editProfile(user.id, values)
      .then(() => {
        return this.props.goToNextStep()
      })
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

export default connect((store) => {
  return ({
    user: store.user
  })
})(CompleteProfile)