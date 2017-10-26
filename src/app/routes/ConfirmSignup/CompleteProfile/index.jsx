import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import form from '../signupForms/completeProfile'
import { editProfile } from '../../../actions/userActions'

class CompleteProfile extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      disabledFlag: true,
      firstName: '',
      lastName: '',
      jobTitle: '',
      phoneExt: '',
      phone: ''
    }
  }

  handleSubmit() {
    const { firstName, lastName, jobTitle, phone, phoneExt } = this.state
    console.log('getting here')
    if (firstName.length === 0 || lastName.length === 0 || phone.length === 0) {
      return this.setState({ ...this.state, errorStatus: true, errorMessage: '*Not All required fields are filled out!' })
    }

    const values = {
      firstName,
      lastName,
      jobTitle,
      phone,
      phoneExt
    }
    editProfile(this.props.user, { ...values })
      .then((resp) => {
        if (resp.success === true) {
          return this.props.goToNextStep()
        }
        return this.setState({ ...this.state, errorStatus: true, errorMessage: `There is a problem. ${resp.message}.. Please contact support!` })
      })
  }

  render() {
    const validateFirstName = (e) => {
      return this.setState({ ...this.state, errorStatus: false, firstName: e.target.value })
    }
    const validateLastName = (e) => {
      return this.setState({ ...this.state, errorStatus: false, lastName: e.target.value })
    }
    const validateJobTitle = (e) => {
      return this.setState({ ...this.state, errorStatus: false, jobTitle: e.target.value })
    }
    const validatePhone = (e) => {
      return this.setState({ ...this.state, errorStatus: false, phone: e.target.value })
    }
    const validatePhoneExt = (e) => {
      return this.setState({ ...this.state, errorStatus: false, phoneExt: e.target.value })
    }

    const { firstName, lastName, phone, } = this.state

    const helpBlock = (text, helpClass) => {
      return (<HelpBlock className={`${helpClass}`} >{text}</HelpBlock>)
    }

    return (
      <div className="completeProfile">
        <form>
          <FormGroup controlId="firstName">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              id="firstName"
              type="text"
              label="Text"
              onChange={validateFirstName}
            />
            {(firstName.length === 0) ? helpBlock('*Required', 'helpBlockRed') : <div className="completeSpace" />}
          </FormGroup>
          <FormGroup controlId="lastName">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              id="lastName"
              type="text"
              label="Text"
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
                  onChange={validatePhoneExt}
                />
              </FormGroup>
            </Col>
          </Row>
        </form>
        <div className="completeProfileButton">
          <Button onClick={() => { return this.handleSubmit() }}>Complete Profile</Button>
          {(this.state.errorStatus === true) ? helpBlock(this.state.errorMessage, 'helpBlockRed') : <div className="completeSpace" />}
        </div>
      </div>
    )
  }
}

CompleteProfile.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default connect((store) => {
  return ({
    user: store.user
  })
})(CompleteProfile)