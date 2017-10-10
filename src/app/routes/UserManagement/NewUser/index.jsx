import {
  FormControl,
  FormGroup,
  ControlLabel,
  Radio,
  Button,
  Alert
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
    this.hideTest = this.hideTest.bind(this)
    // this.hideModal = this.hideModal.bind(this)
  }

  componentDidMount() {
    this.props.hideModal()
  }

  hideTest() {
    this.props.hideModal()
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

  // hideModal() {
  //   this.setState({
  //     ...this.state,
  //     modalDisplay: false
  //   })
  // }


  render() {
    console.log('this.props.admin', this.props.admin)
    const { alertDisplay } = this.props.admin

    console.log('alertDisplay', alertDisplay)

    return (
      <div className="backgroundNewUser">
        <div className="headerNewUser">Invite a team member</div>
        <div className="bodyNewUser"> Team members will be able to create, edit, and view submissions for {this.props.broker}</div>
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
            <ControlLabel>Make admin?</ControlLabel>
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
          <div className="bodyNewUser">Admins can add and remove other users.</div>

          <Button type="submit">Send Invite</Button>
        </form>

        <Button onClick={this.hideTest}>Hide Test</Button>

        { (alertDisplay && alertDisplay.show == true) ?
        <Alert bsStyle="danger" onDismiss={this.hideTest}>
          <h4>Oh snap! You got an error!</h4>
          <p>Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.</p>
          <p>
            <Button onClick={this.hideTest}>Hide Alert</Button>
          </p>
        </Alert>
        : <div />
        }
      </div>
    )
  }
}

NewUser.propTypes = {
  broker: PropTypes.string.isRequired,
  createNewUser: PropTypes.func.isRequired,
  user: PropTypes.object
}

function mapStateToProps(state) {
  return ({
    admin: state.admin
  })
}

export default connect(mapStateToProps, actions)(NewUser)


// style={{ backgroundColor: '#08415c', borderBottom: '2px solid red', color: 'white', width: '232px', height: '34px' }}