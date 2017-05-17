import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Cleave from 'cleave.js/dist/cleave-react'
import moment from 'moment'
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'
import isDefined from '../utils/isDefined'

class InputContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    const name = this.props.data.name
    this.state = {
      value: isDefined(this.props.initialValues[name]) ? this.props.initialValues[name] : '',
      disabled: (this.props.initialParams[name] && this.props.initialParams[name].disabled)
      ? this.props.initialParams[name].disabled : false,
      isValid: null,
      validationMessage: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  getValidationState() {
    // this bit of code acts as a circuit breaker
    // We want get validation to trigger
    // a validation function and when results are back we need to call it again
    // But this breaks the loops
    if (this.state.isValid) {
      const isValid = this.state.isValid
      this.state.isValid = null
      return isValid
    }

    // only trigger validation if the value changes
    if (this.state.value !== '' &&
        this.props.data.attributes &&
        this.props.data.attributes.validationFunc &&
        this.props.validation[this.props.data.attributes.validationFunc]) {

        this.props.validation[this.props.data.attributes.validationFunc](this.props.data.name, this.state.value).then((result) => {
          this.setState({
            isValid: (result.status) ? 'success' : 'error',
            validationMessage: (result.status) ? '' : result.message
          })
        })
    }

    if (this.state.isValid !== null) {
      return this.state.isValid
    }

    return
  }

  handleChange(event) {
    let value

    switch (this.props.data.inputFormat) {
      case ('currency'):
        break
      case ('number'):
        value = event.target.rawValue
        break
      default:
        value = event.target.value
    }
    this.setState({ value })
    this.props.handleFormChange()
  }

  handleDateChange() {
    this.props.handleFormChange()
  }

  render() {
    const tooltip = (
      <Tooltip
        id={`tooltip_${this.props.data.questionId}`}
        placement="bottom"
        className="in"
      >
        {this.props.data.tooltiptext}
      </Tooltip>)

    const inputFormat = this.props.data.inputFormat

    let input

    if (['currency', 'number'].indexOf(this.props.data.inputFormat) > -1) {
      const dollarPrefix = (this.props.data.inputFormat === 'currency') ? '$' : ''
      input = (
        <Cleave
          id={this.props.data.name}
          className={classNames('form-control', 'number-control', 'input-numeral', { filled: this.state.value }, { disabled: this.state.disabled })}
          autoComplete={false}
          value={this.state.value}
          options={{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            prefix: dollarPrefix,
            rawValueTrimPrefix: true
          }}
          onChange={this.handleChange}
        />)
    } else if (['date'].indexOf(this.props.data.inputFormat) > -1) {
      input = (
        <Cleave
          id={this.props.data.name}
          className={classNames('form-control', 'number-control', 'input-numeral', { filled: this.state.value }, { disabled: this.state.disabled })}
          autoComplete={false}
          value={moment(this.state.value).format('MM-DD-YYYY')}
          placeholder="mm/dd/yyyy"
          options={{
            date: true,
            datePattern: ['m', 'd', 'Y']
          }}
          onChange={this.handleDateChange}
        />)
    } else {
      input = (
        <FormControl
          placeholder={this.props.data.placeholder}
          className={classNames({ filled: this.state.value }, { disabled: this.state.disabled })}
          disabled={this.state.disabled}
          autoComplete={false}
          id={this.props.data.name}
          type={inputFormat}
          onChange={this.handleChange}
          componentClass={(this.props.data.inputType === 'freeform') ? 'textarea' : 'input'}
          value={this.state.value}
        />
      )
    }

    const overlay = (
      <OverlayTrigger placement="top" overlay={tooltip} trigger={(this.props.data.tooltiptext) ? ['hover', 'focus'] : null}>
        {input}
      </OverlayTrigger>
    )

    const helpBlock = (this.state.isValid === 'error') ? <HelpBlock>{this.state.validationMessage}</HelpBlock> : null
    return (
      <FormGroup validationState={this.getValidationState()} controlId={this.props.data.name}>
        { this.props.data.text && <ControlLabel>{this.props.data.text}</ControlLabel> }

        {overlay}
        {helpBlock}

      </FormGroup>
    )
  }
}

InputContainer.propTypes = {
  data: PropTypes.object.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  initialParams: PropTypes.object.isRequired
}

export default InputContainer