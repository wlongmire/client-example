import {
  FormControl,
  FormGroup,
  ControlLabel,
  Radio,
  Button,
  Modal
} from 'react-bootstrap'
import { connect } from 'react-redux'

import React, { Component, PropTypes } from 'react'
import * as actions from '../../../actions/userActions'

class NewUser extends Component {
  constructor() {
    super()
    this.state = {
      isAdmin: 'false',
      email: '',
      modalDisplay: false
    }
    this.onChangeAdmin = this.onChangeAdmin.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.submitNewUser = this.submitNewUser.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  onChangeAdmin(event) {
    console.log('testing type', typeof event.target.value)
    console.log('testing value', event.target.value)
    this.setState({
      ...this.state,
      isAdmin: event.target.value
    })
  }

  onChangeEmail(event) {
    console.log('testing testing testing', event.target.value)
    this.setState({
      ...this.state,
      email: event.target.value
    })
  }

  submitNewUser(event) {
    event.preventDefault()
    this.props.createNewUser(this.state.email, this.state.isAdmin, this.props.user)
  }

  hideModal() {
    this.setState({
      ...this.state,
      modalDisplay: false
    })
  }


  render() {
    return (
      <div className="background-new-user">
        <div className="header-new-user">Invite a team member</div>
        <div> Team members will be able to create, edit, and view submissions for {this.props.broker}</div>
        <form onSubmit={this.submitNewUser}>
          <br />
          <FormGroup controlId="newUserEmail">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              required
              onChange={this.onChangeEmail}
              value={this.state.email}
              className="newUserEmail"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Is Admin?</ControlLabel>
            <br />
            <Radio
              name="radioGroup"
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
              inline
              required
              onChange={this.onChangeAdmin}
              value={'false'}
              checked={(this.state.isAdmin == 'false')}
            >
              No
            </Radio>
          </FormGroup>

          <Button type="submit">
            Sign in
          </Button>
        </form>


        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Modal title <Button onClick={this.hideModal}>x</Button></Modal.Title>
          </Modal.Header>
        </Modal.Dialog>
      </div>
    )
  }
}

NewUser.propTypes = {
  broker: PropTypes.string.isRequired,
  createNewUser: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default connect(null, actions)(NewUser)


// style={{ backgroundColor: '#08415c', borderBottom: '2px solid red', color: 'white', width: '232px', height: '34px' }}