import React, { Component } from 'react'
import DialogBox from 'app/components/shared/DialogBox'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import FormBuilder from 'app/components/shared/FormBuilder'
import form from './form.js'

const STATUS = {
  INPUT: "INPUT",
  LOADING: "LOADING",
  ERROR: "ERROR",
  RESULT: "RESULT"
}

export default class Input extends Component {
    constructor(props) {
      super(props)
      this.state = {
        requiredFields: [],
        validationModal: false,
        status: STATUS.INPUT
      }

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleValidationOk = this.handleValidationOk.bind(this)
    }

  handleSubmit(values, controlGroups, requiredFields) {
    if (requiredFields.length > 0) {
      this.setState({
        ...this.state,
        requiredFields,
        validationModal: true
      })
    } else {
      console.log('VALUES', values)
      this.props.handleSubmit(values)
    }
  }

    handleValidationOk() {
      this.setState({
        ...this.state,
        validationModal: false
      })
    }

    render() {
      const requiredList = () => {
        return this.state.requiredFields.map((r, idx) => {
          const fieldText = (r.questionId == '2c') ? 'State' : r.text

          return (
              <li key={idx} className="remainingField">{(fieldText ? fieldText : r.placeholder)}</li>
            )
        })
      }

      return (
        <div>
            <h3>First Let's Check for Clearance.</h3>
            <h4>Enter the following information to clear against previous submissions.</h4>

            <FormBuilder
                data={form}
                initialValues={this.props.input}
                submitTitle="Check For Clearance"
                handleSubmit={this.handleSubmit}
            />


          <DialogBox
            custom_class="confirmationDialog"
            title="Please fill out all required fields."
            show={this.state.validationModal}
          >
            <div> 
              <h4>Here are your remaining questions:</h4>
              <ul className="section">
                { requiredList() }
              </ul>

              <h4>
                Note: All required fields are <span className="required">underlined in red.</span>
              </h4>
              <br />
              <ButtonGroup>
                <Button
                  className="btn secondary"
                  onClick={this.handleValidationOk}
                >
                  Return to the Form
                </Button>
              </ButtonGroup>
            </div>

          </DialogBox>

        </div>)
    }
}
