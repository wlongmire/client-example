import React from 'react'
import ReactDOM from 'react-dom'

import {Button} from 'react-bootstrap'
import FormItemContainer from './FormItemContainer'

import getSupplementalQuestions from './utils/getSupplementalQuestions'
import getControlGroups from './utils/getControlGroups'
import getFormData from './utils/getFormData'

import DefaultValidation from './utils/DefaultValidation'

class FormBuilder extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: []
    }

    this.state = this.props.data
    this.initialValues = this.props.initialValues || {};
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    let values = getFormData(this.state)
    this.props.handleSubmit(values)
  }

  render() {
    let controlGroups = getControlGroups(this.state.questions)
    let Validation = this.props.Validation || DefaultValidation
    
    let result = []

    for (let group in controlGroups) {
      let formItemContainers = controlGroups[group].map((item, index) => {

        let closureState = this.state
        let validationClosure = function() {
          return getFormData(closureState)
        }
        
        return (
          <FormItemContainer key={index} data={item}
            supplementalQuestions={this.state.supplementalQuestions}
            validation={new Validation(validationClosure)}
            initialValues= {this.initialValues}/>
        )
      })
      
      if(group === 'undefined') {
        result.push(
            formItemContainers
        )
      } else {
        result.push(
          <div key={group} className='group'>
            {formItemContainers}
          </div>
        )
      }
    }

    // show button only if the form elements are created
    let button = (result.length > 0) ? (
      <Button type="submit">
          { this.props.submitTitle || "Submit" }
        </Button>
    ) : null

    return (
      <form className={`container ${this.state.name}`} onSubmit={this.onSubmit}>
        {result}
        {button}
      </form>
    )
  }
}

export default FormBuilder