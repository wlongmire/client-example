import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { editProfile, updateUserValues } from '../../../actions/userActions'

export class CompleteProfile extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      disabledFlag: true,
      firstName: props.user.firstName || '',
      lastName: props.user.lastName || '',
      jobTitle: props.user.title || '',
      phoneExt: props.user.phoneExt || '',
      phone: props.user.phone || ''
    }
  }

  ComponentWillMount(){

  }

  ComponentDidMount(){
    document.addEventListener("keyDown", this.handleKeyPress, false)
    this.firstName.focus();
  }

  handleKeyPress(event) {
    console.log('got to the event handler')
    console.log("key pressed => ", event.key)
    if(event.key == 'Enter'){
      handleSubmit();
    }
    else return
  }

  handleSubmit() {
    const { firstName, lastName, jobTitle, phone, phoneExt } = this.state
    if (firstName.length === 0 || lastName.length === 0 || phone.length === 0) {
      return this.setState({ ...this.state, errorStatus: true, errorMessage: '*Not All required fields are filled out!' })
    }

    const values = {
      firstName,
      lastName,
      title: jobTitle,
      phone,
      phoneExt
    }
    editProfile(this.props.user, { ...values })
      .then((resp) => {
        if (resp.success === true) {
          this.props.dispatch(updateUserValues(values))
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
        </form>
        <div className="completeProfileButton">
          <Button bsStyle="primary" onClick={() => { return this.handleSubmit() }}>Complete Profile</Button>
          {(this.state.errorStatus === true) ? helpBlock(this.state.errorMessage, 'helpBlockRed') : <div className="completeSpace" />}
        </div>
      </div>
    )
  }
}

CompleteProfile.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
  user: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect()(CompleteProfile)
// export default connect((store) => {
//   return ({
//     user: store.user
//   })
// })(CompleteProfile)