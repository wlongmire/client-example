import {
  FormControl,
  FormGroup,
  ControlLabel,
  Radio,
  Button
} from 'react-bootstrap'
import { connect } from 'react-redux'

import React, { Component, PropTypes } from 'react'
import * as actions from '../../../actions/adminActions'
import { isEmptyObject } from './../../../utils/utilities'

class NewUser extends Component {
  constructor() {
    super()
    this.state = {
      isAdmin: 'false',
      email: ''
    }
    this.onChangeAdmin = this.onChangeAdmin.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.submitNewUser = this.submitNewUser.bind(this)
  }

  onChangeAdmin(event) {
    this.setState({
      ...this.state,
      isAdmin: event.target.value
    })
  }

  onChangeEmail(event) {
    this.setState({
      ...this.state,
      email: event.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmptyObject(nextProps.admin.alertDisplay) &&  nextProps.admin.alertDisplay.bsStyle === 'success') {
      this.setState({
        ...this.state,
        email: '',
        isAdmin: 'false'
      })
    }
  }

  submitNewUser(event) {
    event.preventDefault()
    this.props.handleCreateUser(this.state.email, this.state.isAdmin)
  }

  render() {
    return (
      <div className="newUserComponent">
        <h1>Invite a team member</h1>
        <p> Team members will be able to create, edit, and view submissions for {this.props.broker}</p>
        <form onSubmit={this.submitNewUser}>
          <br />
          <FormGroup controlId="newUserEmail">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              className="adminInput"
              required
              onChange={this.onChangeEmail}
              value={this.state.email}
              className="emailInput"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Make admin?</ControlLabel>
            <br />
            <Radio
              name="radioGroup"
              className="adminInput"
              inline
              required
              onChange={this.onChangeAdmin}
              value={'true'}
              checked={(this.state.isAdmin == 'true')}
            >
              Yes
            </Radio>
            {' '}
            <Radio
              name="radioGroup"
              className="adminInput"
              inline
              required
              onChange={this.onChangeAdmin}
              value={'false'}
              checked={(this.state.isAdmin == 'false')}
            >
              No
            </Radio>
          </FormGroup>
          <p>Admins can add and remove other users.</p>

          <Button type="submit">Send Invite</Button>
        </form>
      </div>
    )
  }
}

NewUser.propTypes = {
  broker: PropTypes.string.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  admin: PropTypes.object
}

export default connect((store) => {
  return ({
    user: store.user,
    admin: store.admin
  })
}, actions)(NewUser)