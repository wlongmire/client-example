import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'
import FormItemContainer from './FormItemContainer'
import getSupplementalQuestions from './utils/getSupplementalQuestions'
import getControlGroups from './utils/getControlGroups'
import getFormData from './utils/getFormData'
import flatten from './utils/flattenObject'

import DefaultValidation from './utils/DefaultValidation'

class FormBuilder extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: []
    }

    this.state = this.props.data

    this.controlGroups = getControlGroups(this.state.questions)
    this.initialParams = (this.props.initialParams || {})
    this.initialValues = flatten(this.props.initialValues || {})
    
    Object.keys(this.initialValues).forEach((name) => {
      if (typeof this.initialValues[name] === 'string') {
        this.initialValues[name] = this.initialValues[name].trim()
      }
    })
    
    this.onSubmit = this.onSubmit.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
    this.loadOptions = this.loadOptions.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()

    const values = getFormData(this.state)
    const flatValues = flatten(values)
    const allRequiredArray = []

    for (const item of this.state.questions) {
      if (item.required == true && !flatValues[item.name]) {
        allRequiredArray.push(item)
      }
    }

    this.props.handleSubmit(values, this.controlGroups, allRequiredArray)
  }

  onFormChange(event) {
    const values = flatten(getFormData(this.state))
    const form = this.state.questions
  }

  loadOptions(questionSet) {
    const options = this.props.options || {}
    let loadedItems = []

    const promises = questionSet.map((item, idx) => {

      if (item.attributes && item.attributes.optionsFunc && options[item.attributes.optionsFunc]) {
        loadedItems.push(idx)
        return (options[item.attributes.optionsFunc]())
      }
    }).filter(item => (item))

    return Promise.all(promises).then((resp) => {
      resp.map((options3, idx) => {
        questionSet[loadedItems[idx]].attributes.options = options3
      })

      return (questionSet)
    })
  }

  componentWillMount() {
    const questionsInitial = Object.assign([], this.state.questions)
    const supplementalQuestionsInitial = Object.assign([], this.state.supplementalQuestions)

    Promise.all(
      [
        this.loadOptions(supplementalQuestionsInitial),
        this.loadOptions(questionsInitial)
      ]).then((resp) => {
        const supplementalQuestions = resp[0]
        const questions = resp[1]

        this.setState({
          ...this.state,
          questions,
          supplementalQuestions
        })
      })
  }

  render() {
    let { controlGroups } = this;
    let Validation = this.props.Validation || DefaultValidation

    let result = []
    let indexBuilder = 0

    for (let group in controlGroups) {
      const formItemContainers = controlGroups[group].map((item, index) => {
        let closureState = this.state
        let validationClosure = function() {
          return getFormData(closureState)
        }

        return (
          <FormItemContainer
            key={item.questionId}
            data={item}
            supplementalQuestions={this.state.supplementalQuestions}
            handleFormChange={this.onFormChange}
            validation={new Validation(validationClosure)}
            initialParams={this.initialParams}
            initialValues={this.initialValues}
          />
        )
      })

      const questionTitle = () => {
        if (controlGroups[group][0] && controlGroups[group][0].title) {
          return (
            <div className="questionHeader">{controlGroups[group][0].title}
            </div>
          )
        }
        return <div />
      }

      indexBuilder += 1
      result.push(
        <div key={indexBuilder}>
          {questionTitle()}
          <div className="group">
            {formItemContainers}
          </div>
        </div>
      )
    }

    // show button only if the form elements are created
    let button

    if (this.props.submissionButtons) {
      button = this.props.submissionButtons()
    } else {
      button = (result.length > 0) ? (
        <Button type="submit">
          { this.props.submitTitle || 'Submit' }
        </Button>
      ) : null
    }

    return (
      <form className={`formBuilderElement ${this.state.name}`} name={this.state.name} onSubmit={this.onSubmit}>
        <div className="form">

          {result}
          {button}
        </div>

      </form>
    )
  }
}

FormBuilder.propTypes = {
  data: PropTypes.object,
  initialValues: PropTypes.object,
  initialParams: PropTypes.object,
  submitTitle: PropTypes.string,
  handleSubmit: PropTypes.func,
  submissionButtons: PropTypes.func
}

export default FormBuilder