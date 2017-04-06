import React from 'react'
import ControlMaps from './controls'
import FormSupplementContainer from './FormSupplementContainer'

import getControlGroups from './utils/getControlGroups'
import getSupplementalQuestions from './utils/getSupplementalQuestions'
import classNames from 'classnames'

class FormItemContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleSupplementQuestions : []
    }
    this.initialValues = this.props.initialValues;

    this.handleSupplementTrigger = this.handleSupplementTrigger.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleSupplementTrigger(supplementalQuestionsIds) {
    this.setState({
      visibleSupplementQuestions : supplementalQuestionsIds
    })
  }

  handleFormChange() {
    this.props.handleFormChange();
  }

  render() {
    const Control = ControlMaps[this.props.data.inputType] || ControlMaps[this.props.data.inputFormat]
    const formItemSupplementQuestions = getSupplementalQuestions(this.props.data, this.props.supplementalQuestions)

    const controlGroups = getControlGroups(formItemSupplementQuestions || [])
    let result = []

    for (let group in controlGroups) {
      let formSupplementContainer = formItemSupplementQuestions.map((item, index) => {
        let hidden = this.state.visibleSupplementQuestions.indexOf(item.questionId) === -1

        return (
          <FormItemContainer 
            hidden={hidden}
            key={index}
            data={item}
            supplementalQuestions={this.props.supplementalQuestions}
            supplementalForm={ true }
            validation={this.props.validation}
            initialValues={this.initialValues}
            handleFormChange={this.props.handleFormChange}
          />
        )
      })
      
      result.push(
        <div key={group}>
          {formSupplementContainer}
        </div>
      )
    }

    let hidden = (this.props.hidden) ? 'hidden' : null
    
    return (
      <div className={ classNames(hidden, {'required':this.props.data.required}, {'supplementalContainer':this.props.supplementalForm}) }>
        <Control 
          data={this.props.data}
          required={this.props.data.required}
          supplementalQuestions={this.props.supplementalQuestions} 
          handleSupplementTrigger={this.handleSupplementTrigger}
          handleFormChange={this.handleFormChange}
          validation={this.props.validation}
          initialValues={this.initialValues}/>
        { result }
      </div>
    )
  }
}

export default FormItemContainer