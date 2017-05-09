import React from 'react';
import DynamicNumber from 'react-dynamic-number';
import isDefined from '../utils/isDefined';
import classNames from 'classnames';
import Cleave from 'cleave.js/dist/cleave-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from 'react-bootstrap-date-picker';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime';

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
    super(props);
    const name = this.props.data.name;
    this.state = {
      value: isDefined(this.props.initialValues[name]) ? this.props.initialValues[name] : '',
      disabled: (this.props.initialParams[name] && this.props.initialParams[name].disabled)?this.props.initialParams[name].disabled:false,
      isValid: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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
    let value;

    switch (this.props.data.inputFormat) {
      case("currency"):
      case("number"):
        value = event.target.rawValue;
        break;
      default:
        value = event.target.value;
    }
    this.setState({ value });
    this.props.handleFormChange();
  }

    handleDateChange(event) {
      const formattedDate = moment(event.target.value, "MM/DD/YYYY").toISOString();

      if (formattedDate === 'Invalid date') {
        this.setState({
          value: null
        });
        console.log('THIS IS INVALID DATE');
        return;
      }
      this.setState({
        value: formattedDate
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

    let input;

    if(['currency', 'number'].indexOf(this.props.data.inputFormat) > -1) {
      const dollarPrefix = (this.props.data.inputFormat === 'currency') ? '$' : '';
      input = <Cleave className="input-numeral"
                      id={this.props.data.name}
                      className={classNames("form-control", "number-control", 'additional-padding', {'filled':this.state.value}, {disabled:this.state.disabled})}
                      autoComplete={false}
                      value={this.state.value}
                      options={
                        {
                          numeral: true,
                          numeralThousandsGroupStyle: 'thousand',
                          prefix: dollarPrefix,
                          rawValueTrimPrefix: true}
                        }
                      onChange={this.handleChange}/>;
    } else if(['date'].indexOf(this.props.data.inputFormat) > -1){
      input = <Cleave className="input-numeral"
                      id={this.props.data.name}
                      className={classNames("form-control", "number-control", 'additional-padding', {'filled':this.state.value}, {disabled:this.state.disabled})}
                      autoComplete={false}
                      placeholder="mm/dd/yyyy"
                      options={
                        {
                          date: true,
                          datePattern: ['m', 'd', 'Y']
                        }}
                      onChange={this.handleDateChange}/>;
    } else {
      const maxDate = (inputFormat === 'date')? '2099-12-31': '';
      input = (
        <FormControl
            placeholder={this.props.data.placeholder}
            className={classNames({'filled':this.state.value}, {disabled:this.state.disabled}, 'additional-padding')}
            disabled={this.state.disabled}
            autoComplete={false}
            id={this.props.data.name}
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

    const helpBlock = (this.state.isValid === 'error') ? <HelpBlock>{this.props.data.validationMessage}</HelpBlock> : null;
    return(
       <FormGroup validationState={this.getValidationState()} controlId={this.props.data.name}>
        { this.props.data.text && <ControlLabel>{this.props.data.text}</ControlLabel> }

        {overlay}
        {helpBlock}

       </FormGroup>
    );
  }
}

export default InputContainer;