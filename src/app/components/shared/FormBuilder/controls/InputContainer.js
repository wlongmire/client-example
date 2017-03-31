import React from 'react'
import DynamicNumber from 'react-dynamic-number'
import isDefined from '../utils/isDefined'
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'

class InputContainer extends React.Component {
  constructor(props) {
    super(props)
    const name = this.props.data.name;
    this.state = {
      value: isDefined(this.props.initialValues[name]) ? this.props.initialValues[name] : '',
      isValid: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
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

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    const tooltip = <Tooltip id={`tooltip_${this.props.data.questionId}`}> {this.props.data.tooltiptext}</Tooltip>
    let inputFormat = this.props.data.inputFormat
    if (inputFormat === 'currency') inputFormat = 'number'
    let input

    // Using a different input type for number and currency. It will format the number but the value will remain the raw number value
    if (['currency', 'number'].indexOf(this.props.data.inputFormat) > -1) {
      input = <DynamicNumber id={this.props.data.name} className="form-control number-control" separator={'.'} thousand={true} integer={1000} fraction={1000} onChange={this.handleChange} value={parseInt(this.state.value)}/>
    } else {
      input = (
        <FormControl
            placeholder={this.props.data.placeholder}
            type={inputFormat}
            onChange={this.handleChange}
            componentClass={(this.props.data.inputType === 'freeform') ? 'textarea' : 'input'}
            value={this.state.value}
          />
      )
    }

    const overlay = (
      <OverlayTrigger placement='top' overlay={tooltip} trigger={(this.props.data.tooltiptext) ? ['hover', 'focus'] : null}>
        {input}
      </OverlayTrigger>
    )

    const wrapper = (this.props.data.inputFormat === 'currency') ? <InputGroup><InputGroup.Addon>$</InputGroup.Addon>{overlay}</InputGroup> : overlay
    const helpBlock = (this.state.isValid === 'error') ? <HelpBlock>{this.props.data.validationMessage}</HelpBlock> : null;
    return(

       <FormGroup validationState={this.getValidationState()} controlId={this.props.data.name}>
        <ControlLabel>{this.props.data.text}</ControlLabel>
        {wrapper}
        {helpBlock}

       </FormGroup>
    )
  }
}

export default InputContainer