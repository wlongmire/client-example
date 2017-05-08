import React from 'react'
import isDefined from '../utils/isDefined'
import classNames from 'classnames'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap'

class MultiSelectContainer extends React.Component {
  constructor(props) {
    super(props)

    const name = this.props.data.name;
    this.state = {
      value: isDefined(this.props.initialValues[name]) ? this.props.initialValues[name] : '',
      disabled: (this.props.initialParams[name] && this.props.initialParams[name].disabled)?this.props.initialParams[name].disabled:false,
      title: this.props.data.placeholder,
      isValid: null,
      validationMessage:""
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event) {
    this.setState({
      title: event
    })

    this.props.handleFormChange()
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
        this.props.data.attributes.validationFunc &&
        this.props.validation[this.props.data.attributes.validationFunc]) {
        
        this.props.validation[this.props.data.attributes.validationFunc](this.props.data.name, this.state.value).then((result)=> {
          this.setState({
            isValid: (result) ? 'success' : 'error',
            validationMessage:(result.status) ? "" : result.message
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

  render() {
    const tooltip = <Tooltip id={`tooltip_${this.props.data.questionId}`}> {this.props.data.tooltiptext}</Tooltip>

    this.options = this.props.data.attributes.options.map((data) => {
      return <option value={data.text} key={data.optionId}>{data.text}</option>
    })

    return(
       <FormGroup validationState={this.getValidationState()} controlId={this.props.data.name}>
          { this.props.data.text && <ControlLabel>{this.props.data.text}</ControlLabel> }

         <OverlayTrigger placement='top' overlay={tooltip} trigger={(this.props.data.tooltiptext) ? ['hover', 'focus'] : null}>
           <FormControl 
            componentClass="select" 
            className={classNames({'filled':this.state.value}, {disabled:this.state.disabled})}
            disabled={this.state.disabled}
            multiple>
            {this.options}
          </FormControl>
        </OverlayTrigger>
       </FormGroup>
    )
  }
}

export default MultiSelectContainer