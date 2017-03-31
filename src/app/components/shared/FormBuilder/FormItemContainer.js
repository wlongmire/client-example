import React from 'react'
import ControlMaps from './controls'
import FormSupplementContainer from './FormSupplementContainer'

import getControlGroups from './utils/getControlGroups'
import getSupplementalQuestions from './utils/getSupplementalQuestions'

class FormItemContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleSupplementQuestions : []
    }
    this.initialValues = this.props.initialValues;

    this.handleSupplementTrigger = this.handleSupplementTrigger.bind(this)
  }

  handleSupplementTrigger(supplementalQuestionsIds) {
    this.setState({
      visibleSupplementQuestions : supplementalQuestionsIds
    })
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
          <FormItemContainer hidden={hidden} key={index} data={item} supplementalQuestions={this.props.supplementalQuestions} validation={this.props.validation} initialValues={this.initialValues}/>
        )
      })

      result.push(
        <div key={group} className='group'>
          {formSupplementContainer}
        </div>
      )
    }

    let hidden = (this.props.hidden) ? 'hidden' : null
    
    return (
      <div className={hidden}>
        <Control data={this.props.data} supplementalQuestions={this.props.supplementalQuestions} handleSupplementTrigger={this.handleSupplementTrigger} validation={this.props.validation} initialValues={this.initialValues}/>
        {result}
      </div>
    )
  }
}

export default FormItemContainer