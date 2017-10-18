import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  FormGroup,
  Radio,
  Button
} from 'react-bootstrap'

import * as actions from '../../../actions/adminActions'

export class EditUserModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: (this.props.selectedUser && (this.props.selectedUser.role === 'admin')) ? 'true' : 'false'
    }
    this.onChangeAdmin = this.onChangeAdmin.bind(this)
    this.submitEditUser = this.submitEditUser.bind(this)
  }

  onChangeAdmin(event) {
    this.setState({
      ...this.state,
      isAdmin: event.target.value
    })
  }

  submitEditUser(event) {
    const { id, username } = this.props.selectedUser
    event.preventDefault()
    console.log('HITTING THISwerewrwer')

    apigClient.adminUsersIdPut({ id }, [
      {
        fieldName: 'role',
        fieldValue: (this.state.isAdmin === 'true') ? 'admin' : 'user'
      }
    ]).then((result2) => {
      console.log("RESULT oF THIS SHISZNIT", result2)
      if (result2.data && result2.data.success === true) {     
        this.props.setAlert({ show: true, message: 'Successfully Updated User Record!', bsStyle: 'success' })
        this.props.getUsersByBrokerage(this.props.loggedInUser)
        return this.props.hideEditModal()
      } else {
        this.props.setAlert({ show: false, message: `There was an error editing the user (${username}). Please contact support!`, bsStyle: 'warning' })
        return this.props.hideEditModal()
      }
    })
  }

  render() {
    console.log('is ADMIN', this.state.isAdmin)

    if ((this.props.selectedUser === null) || !this.props.selectedUser.id) {
      return (
        <div className="editUserModal">
          <h3>There was an error with the Edit Modal. Please contact support for assistance</h3>
        </div>
      )
    }

    const { email } = this.props.selectedUser

    return (
      <div className="editUserModal">
        <h3>Email:</h3>
        <h4>{email}</h4>

        <h3 className="editAminText">Is user an admin?</h3>
        <form onSubmit={this.submitEditUser}>
          <FormGroup>
            <br />

            <Radio
              name="radioGroup"
              className="editAdminInput"
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
              className="editAdminInput"
              inline
              required
              onChange={this.onChangeAdmin}
              value={'false'}
              checked={(this.state.isAdmin == 'false')}
            >
              No
            </Radio>
          </FormGroup>

          <p className="adminEditAddInfo">Admins can add and remove other users.</p>
          <Button className="saveEditChanges" type="submit">Save Changes</Button>
          <Button className="cancelEdit" onClick={() => { return this.props.hideEditModal() }}>Cancel</Button>
        </form>
      </div>
    )
  }
}

EditUserModal.propTypes = {
  // user: PropTypes.object,
  hideEditModal: PropTypes.func,
  setAlert: PropTypes.func,
  getUsersByBrokerage: PropTypes.func,
  selectedUser: PropTypes.object,
  loggedInUser: PropTypes.object
}

export default connect((state) => {
  return ({
    user: state.user
  })
}, actions)(EditUserModal)