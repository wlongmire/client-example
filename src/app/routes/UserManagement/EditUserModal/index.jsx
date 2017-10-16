import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  FormGroup,
  Radio,
  Button
} from 'react-bootstrap'

import * as actions from '../../../actions/userActions'

class EditUserModal extends Component {
  constructor() {
    super()
    this.state = {
      isAdmin: 'false'
    }
    this.onChangeAdmin = this.onChangeAdmin.bind(this)
  }

  onChangeAdmin(event) {
    this.setState({
      ...this.state,
      isAdmin: event.target.value
    })
  }

  render() {
    return (
      <div className="editUserModal">
        <h3>email</h3>
        <h4>warrenlongmire@gmail.com</h4>

        <h3>Is user an admin?</h3>
        <form onSubmit={this.submitNewUser}>
          <FormGroup>
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
        </form>

        <Button type="submit">Send Invite</Button>
      </div>
    )
  }
}

EditUserModal.propTypes = {
  user: PropTypes.object
}

export default connect((state) => {
  return ({
    user: state.user
  })
}, actions)(EditUserModal)