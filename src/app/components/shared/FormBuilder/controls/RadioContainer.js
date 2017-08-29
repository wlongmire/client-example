import React, { PropTypes } from 'react'

import {
  FormGroup,
  Radio,
  ControlLabel,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'
import AdditionalInfoComponent from './AdditionalInfoComponent'

class RadioContainer extends React.Component {
  constructor(props) {
    super(props)

    this.onChangeHandler = this.onChangeHandler.bind(this)
    const name = this.props.data.name

    this.state = {
      // value: this.props.initialValues[name] ? this.props.initialValues[name] : null,
      disabled: (this.props.initialParams[name] && this.props.initialParams[name].disabled) ?
        this.props.initialParams[name].disabled : false,
      options: [].concat(this.props.data.attributes.options),
      isValid: null,
      validationMessage: ''
    }
  }

  componentWillMount() {
    if (this.props.initialValues[this.props.data.name]) {
      const event = {
        target: {
          value: this.props.initialValues[this.props.data.name]
        }
      }
      this.onChangeHandler(event)
    } else {
      this.setState({
        value: null
      })
    }
  }

  getValidationState() {
    // this bit of code acts as a circuit breaker
    // We want get validation to trigger a validation function
    // and when results are back we need to call it again
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
          isValid: (result) ? 'success' : 'error',
          validationMessage: (result.status) ? '' : result.message
        })
      })
    }

    if (this.state.isValid !== null) {
      return this.state.isValid
    }

    if (this.props.data.attributes && this.props.data.attributes.validationRegEx) {
      const regex = new RegExp(unescape(this.props.data.attributes.validationRegEx))
      return (regex.test(this.state.value)) ? 'success' : 'error'
    }

    return
  }

  onChangeHandler(event) {
    // get the data for selected option
    const option = this.props.data.attributes.options.filter((optionResult) => {
      return optionResult.value.toString() === event.target.value
    })[0]

    // trigger supplemental questions
    if (option.supplementalquestionIds && option.supplementalquestionIds.length > 0) {
      this.props.handleSupplementTrigger(option.supplementalquestionIds)
    } else {
      this.props.handleSupplementTrigger([])
    }

    // set value to selected option
    this.setState({
      value: event.target.value
    })

    this.props.handleFormChange()
  }

  render() {
    const tooltip = (<Tooltip id={`tooltip_${this.props.data.questionId}`}> {this.props.data.tooltiptext}</Tooltip>)
    const optionsItems = this.props.data.attributes.options || []

    const options = optionsItems.map((data, index) => {
      const checked = ((this.state.value) && (this.state.value.toString() === data.value.toString()))

      return (
        <Radio
          className={this.props.data.name}
          key={index}
          onChange={this.onChangeHandler}
          value={data.value}
          checked={checked}
          inline={this.props.data.verticalRadioAlign}
          disabled={this.state.disabled}
          name={`optionGroup_${this.props.data.questionId}`}
        >
          <span className="radioText">{data.text}</span>
        </Radio>
      )
    })

    return (
      <FormGroup
        className="radioGroup"
        validationState={this.getValidationState()}
        controlId={this.props.data.name}
      >
        {/* I'm adding the overlay to the ControlLabel in the case of Radio buttons.
        having a tooltip on the Radio buttons felt a little counter-intuitive in terms of UX*/}
        { this.props.data.text && <OverlayTrigger placement="top" overlay={tooltip} trigger={(this.props.data.tooltiptext) ? ['hover', 'focus'] : null}>
          <ControlLabel>{this.props.data.text}</ControlLabel>
        </OverlayTrigger> }
        <div className="options">
          {options}
        </div>
        <AdditionalInfoComponent
          additionalInfo1Color={this.props.data.additionalInfo1Color}
          additionalInfo1={this.props.data.additionalInfo1}
          additionalInfo2={this.props.data.additionalInfo2}
        />
      </FormGroup>
    )
  }
}


RadioContainer.propTypes = {
  data: PropTypes.object,
  initialParams: PropTypes.object,
  initialValues: PropTypes.object,
  validation: PropTypes.object,
  handleSupplementTrigger: PropTypes.func,
  handleFormChange: PropTypes.func
}


export default RadioContainer