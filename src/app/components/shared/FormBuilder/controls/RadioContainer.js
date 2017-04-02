import React from 'react'
import isDefined from '../utils/isDefined'
import {
  FormGroup,
  Radio,
  ControlLabel,
  InputGroup,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'

class RadioContainer extends React.Component {
  constructor(props) {
    super(props)

    this.onChangeHandler = this.onChangeHandler.bind(this)
    const name = this.props.data.name
    this.state = {
      value: isDefined(this.props.initialValues[name]) ? this.props.initialValues.name : null,
      options: [].concat(this.props.data.attributes.options),
      isValid: null
    }
  }

  getValidationState() {

    // this bit of code acts as a circuit breaker
    // We want get validation to trigger a validation function and when results are back we need to call it again
    // But this breaks the loops
    if (this.state.isValid) {
      let isValid = this.state.isValid
      this.state.isValid = null
      return isValid
    }

    //only trigger validation if the value changes
    if (this.state.value !== '' &&
        this.props.data.attributes &&
        this.props.data.attributes.validationFunc) {
        this.props.validation[this.props.data.attributes.validationFunc](this.state.value).then((result)=> {
          this.setState({
            isValid: (result) ? 'success' : 'error'
          })
        })
    }

    if (this.state.isValid !== null) {
      return this.state.isValid
    }

    if (this.props.data.attributes && this.props.data.attributes.validationRegEx) {
      let regex = new RegExp(unescape(this.props.data.attributes.validationRegEx))
      return (regex.test(this.state.value)) ? 'success' : 'error'
    }

    return
  }

  onChangeHandler(event) {
    //get the data for selected option
    let option = this.props.data.attributes.options.filter((option) => {
      return option.value.toString() === event.target.value
    })[0]

    //trigger supplemental questions
    if(option.supplementalquestionIds && option.supplementalquestionIds.length > 0) {
      this.props.handleSupplementTrigger(option.supplementalquestionIds)
    } else {
      this.props.handleSupplementTrigger([])
    }

    //set value to selected option
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const tooltip = <Tooltip id={`tooltip_${this.props.data.questionId}`}> {this.props.data.tooltiptext}</Tooltip>

    let options = this.props.data.attributes.options.map((data, index) => {
      return (
          <Radio className={data.value && 'filled'} className={this.props.data.name} key={index} onChange={this.onChangeHandler} value={data.value} name={`optionGroup_${this.props.data.questionId}`}>{data.text}</Radio>
      )
    })

    return (
       <FormGroup validationState={this.getValidationState()} controlId={this.props.data.name}>
        {/* I'm adding the overlay to the ControlLabel in the case of Radio buttons.
        having a tooltip on the Radio buttons felt a little counter-intuitive in terms of UX*/}
        { this.props.data.text && <OverlayTrigger placement='top' overlay={tooltip} trigger={(this.props.data.tooltiptext) ? ['hover', 'focus'] : null}>
          <ControlLabel>{this.props.data.text}</ControlLabel>
        </OverlayTrigger> }
       
        {options}
       </FormGroup>
    )
  }
}

export default RadioContainer