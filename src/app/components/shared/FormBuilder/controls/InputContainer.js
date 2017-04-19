import React from 'react';
import DynamicNumber from 'react-dynamic-number';
import isDefined from '../utils/isDefined';
import classNames from 'classnames';
import Cleave from 'cleave.js/dist/cleave-react';

import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Tooltip,
  Popover,
  OverlayTrigger
} from 'react-bootstrap';

class InputContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    const name = this.props.data.name;
    this.state = {
      value: isDefined(this.props.initialValues[name]) ? this.props.initialValues[name] : '',
      disabled: (this.props.initialParams[name] && this.props.initialParams[name].disabled)?this.props.initialParams[name].disabled:false,
      isValid: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
  }

  getValidationState() {

    // this bit of code acts as a circuit breaker
    // We want get validation to trigger a validation function and when results are back we need to call it again
    // But this breaks the loops
    if (this.state.isValid) {
      let isValid = this.state.isValid;
      this.state.isValid = null;
      return isValid;
    }

    //only trigger validation if the value changes
    if (this.state.value !== '' &&
        this.props.data.attributes &&
        this.props.data.attributes.validationFunc) {
        this.props.validation[this.props.data.attributes.validationFunc](this.state.value).then((result)=> {
          this.setState({
            isValid: (result) ? 'success' : 'error'
          });
        });
    }

    if (this.state.isValid !== null) {
      return this.state.isValid;
    }

    if (this.props.data.attributes && this.props.data.attributes.validationRegEx) {
      let regex = new RegExp(unescape(this.props.data.attributes.validationRegEx));
      return (regex.test(this.state.value)) ? 'success' : 'error';
    }

    return;

  }

  handleChange(event) {
    console.log('event', event);
    console.log('event.target.value', event.target.value);
    this.setState({
      value: event.target.value
    });
    this.props.handleFormChange();
  }

  handleNumberChange(event) {
    console.log('VALUE RAW VALUE', event.target.rawValue);
    this.setState({
      value: event.target.rawValue
    });
    this.props.handleFormChange();
  }

  render() {
    const tooltip = (<Tooltip 
        id={`tooltip_${this.props.data.questionId}`}
        placement="bottom"
        className="in"> 
        {this.props.data.tooltiptext}
      </Tooltip>);
    
    let inputFormat = this.props.data.inputFormat;
    if (inputFormat === 'currency') inputFormat = 'number';
    let input;
    const maxDate = (inputFormat === 'date')? '2099-12-31': '';
    if(['currency', 'number'].indexOf(this.props.data.inputFormat) > -1) {
      const initalValue = parseInt(this.state.value);
      input = <Cleave className="input-numeral"
                      id={this.props.data.name}
                      className="form-control number-control"
                      options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
                      onChange={this.handleNumberChange}/>;

    } else {   
      input = (
        <FormControl
            placeholder={this.props.data.placeholder}
            className={classNames({'filled':this.state.value}, {disabled:this.state.disabled})}
            disabled={this.state.disabled}
            type={inputFormat}
            onChange={this.handleChange}
            max={maxDate}
            componentClass={(this.props.data.inputType === 'freeform') ? 'textarea' : 'input'}
            value={this.state.value}
          />
    );
    }

    const overlay = (
      <OverlayTrigger placement='top' overlay={tooltip} trigger={(this.props.data.tooltiptext) ? ['hover', 'focus'] : null}>
        {input}
      </OverlayTrigger>
    );

    const wrapper = (this.props.data.inputFormat === 'currency') ? <InputGroup><InputGroup.Addon>$</InputGroup.Addon>{overlay}</InputGroup> : overlay
    const helpBlock = (this.state.isValid === 'error') ? <HelpBlock>{this.props.data.validationMessage}</HelpBlock> : null;
    return(
       <FormGroup validationState={this.getValidationState()} controlId={this.props.data.name}>
        { this.props.data.text && <ControlLabel>{this.props.data.text}</ControlLabel> }

        {wrapper}
        {helpBlock}

       </FormGroup>
    );
  }
}

export default InputContainer;