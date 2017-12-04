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
      phone: props.user.phone || '',
      firstNameErr: null,
      lastNameErr: null,
      phoneErr: null
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
      if (!this.state.firstName.length > 0){
        this.setState({ ...this.state, firstNameErr:true, errorStatus: false, firstName: e.target.value })
      } else {
      return this.setState({ ...this.state, firstNameErr:null, errorStatus: false, firstName: e.target.value }) }
    }
    const validateLastName = (e) => {
      if (!this.state.lastName.length > 0){
        this.setState({ ...this.state, lastNameErr:true, errorStatus: false, firstName: e.target.value })
      } else {
      return this.setState({ ...this.state, lastNameErr:null, errorStatus: false, firstName: e.target.value }) }
    }
    const validateJobTitle = (e) => {
      return this.setState({ ...this.state, errorStatus: false, jobTitle: e.target.value })
    }
    const validatePhone = (e) => {
      if (!this.state.phone.length > 0){
        this.setState({ ...this.state, phoneErr:true, errorStatus: false, firstName: e.target.value })
      } else {
      return this.setState({ ...this.state, phoneErr:null, errorStatus: false, firstName: e.target.value }) }
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
              onBlur={validateFirstName}
              ref="firstName"
            />
            {(this.state.firstNameErr === true) ? helpBlock('*Required', 'helpBlockRed') : <div className="completeSpace" />}
          </FormGroup>
          <FormGroup controlId="lastName">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              id="lastName"
              type="text"
              label="Text"
              value={this.state.lastName}
              onBlur={validateLastName}
            />
            {(this.state.lastNameErr === true) ? helpBlock('*Required', 'helpBlockRed') : <div className="completeSpace" />}
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
                  onBlur={validatePhone}
                />
                {(this.state.phoneErr === true) ? helpBlock('*Required', 'helpBlockRed') : <div className="completeSpace" />}
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