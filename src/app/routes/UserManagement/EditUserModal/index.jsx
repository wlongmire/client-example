import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock,Radio } from 'react-bootstrap'
import {isNullOrEmpty} from '../../../utils/utilities'


import * as actions from '../../../actions/adminActions'

export class EditUserModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: (this.props.selectedUser && (this.props.selectedUser.role === 'admin')) ? 'true' : 'false',
      firstName: props.selectedUser.firstName || '',
      lastName: props.selectedUser.lastName || '',
      jobTitle: props.selectedUser.title || '',
      phoneExt: props.selectedUser.phoneExt || '',
      phone: props.selectedUser.phone || ''
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
    if (this.state.errorStatus) return;
    if (isNullOrEmpty(this.state.firstName)||isNullOrEmpty(this.state.lastName)||isNullOrEmpty(this.state.phone)) return;
    const paramsArray = [
      { fieldName: 'firstName', fieldValue: this.state.firstName },
      { fieldName: 'lastName', fieldValue: this.state.lastName },
      { fieldName: 'title', fieldValue: isNullOrEmpty(this.state.jobTitle) ? ' ' : this.state.jobTitle },
      { fieldName: 'phone', fieldValue: this.state.phone },
      { fieldName: 'phoneExt', fieldValue: isNullOrEmpty(this.state.phoneExt) ? ' ' : this.state.phoneExt }
    ]

    apigClient.adminUsersIdPut({ id }, [
      ...paramsArray,
      {
        fieldName: 'role',
        fieldValue: (this.state.isAdmin === 'true') ? 'admin' : 'user'
      }
    ]).then((result2) => {
      if (result2.data && result2.data.success === true) {
        this.props.dispatch(actions.setAlert({ show: true, message: `The profile for ${this.props.selectedUser.username} has been updated`, bsStyle: 'success' }))
        this.props.dispatch(actions.getUsersByBrokerage(this.props.loggedInUser))
        return this.props.hideEditModal()
      } else {
        this.props.setAlert({ show: false, message: `There was an error editing the user (${username}). Please contact support!`, bsStyle: 'warning' })
        return this.props.hideEditModal()
      }
    })
  }

  render() {
    if ((this.props.selectedUser === null) || !this.props.selectedUser.id) {
      return (
        <div className="editUserModal">
          <h3>There was an error with the Edit Modal. Please contact support for assistance</h3>
        </div>
      )
    }
    const validateFirstName = (e) => {
      return this.setState({ ...this.state, errorStatus: isNullOrEmpty(e.target.value)? true: false, firstName: e.target.value })
    }
    const validateLastName = (e) => {
      return this.setState({ ...this.state, errorStatus: isNullOrEmpty(e.target.value)? true: false, lastName: e.target.value })
    }
    const validateJobTitle = (e) => {
      return this.setState({ ...this.state, errorStatus: false, jobTitle: e.target.value })
    }
    const validatePhone = (e) => {
      return this.setState({ ...this.state, errorStatus: isNullOrEmpty(e.target.value)? true: false, phone: e.target.value })
    }
    const validatePhoneExt = (e) => {
      return this.setState({ ...this.state, errorStatus: false, phoneExt: e.target.value })
    }

    const { firstName, lastName, phone  } = this.state

    const helpBlock = (text, helpClass) => {
      return (<HelpBlock className={`${helpClass}`} >{text}</HelpBlock>)
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
              disabled={(this.props.selectedUser.id === this.props.user.id)}
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
              disabled={(this.props.selectedUser.id === this.props.user.id)}
            >
              No
            </Radio>
          </FormGroup>

          <p className="adminEditAddInfo">Admins can add and remove other users.</p>
          <FormGroup controlId="firstName">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            id="firstName"
            type="text"
            label="Text"
            value={this.state.firstName}
            onChange={validateFirstName}
            ref="firstName"
          />
          {(firstName.length === 0) ? helpBlock('*Required', 'helpBlockRed') : <div className="completeSpace" />}
        </FormGroup>
        <FormGroup controlId="lastName">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            id="lastName"
            type="text"
            label="Text"
            value={this.state.lastName}
            onChange={validateLastName}
          />
          {(lastName.length === 0) ? helpBlock('*Required', 'helpBlockRed') : <div className="completeSpace" />}
        </FormGroup>
        <FormGroup controlId="jobTitle">
          <ControlLabel>Job Title</ControlLabel>
          <FormControl
            id="jobTitle"
            type="text"
            label="Text"
            placeholder="optional"
            value={this.state.jobTitle}
            onChange={validateJobTitle}
          />
          <div className="completeSpace" />
        </FormGroup>
        <Row>
          <Col xs={8} sm={8} md={8} lg={8}>
            <FormGroup controlId="phone">
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl
                id="phone"
                type="text"
                label="Text"
                value={this.state.phone}
                onChange={validatePhone}
              />
              {(phone.length === 0) ? helpBlock('*Required', 'helpBlockRed') : <div className="completeSpace" />}
            </FormGroup>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <FormGroup controlId="phoneExt">
              <ControlLabel>Ext</ControlLabel>
              <FormControl
                id="phoneExt"
                type="text"
                label="Text"
                placeholder="optional"
                value={this.state.phoneExt}
                onChange={validatePhoneExt}
              />
            </FormGroup>
          </Col>
        </Row>
          <Button className="saveEditChanges" type="submit">Save Changes</Button>
          <Button className="cancelEdit" onClick={() => { return this.props.hideEditModal() }}>Cancel</Button>
        </form>
      </div>
    )
  }
}

EditUserModal.propTypes = {
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
})(EditUserModal)