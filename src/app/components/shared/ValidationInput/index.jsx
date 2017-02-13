import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class ValidationInput extends Component {
  constructor(props) {
   super(props);
  }

  onChange () {
    this.props.handleInputChange({ name: this.props.id, value: this.refs.input.value });
  }

  render () {
    const value = this.props.value || '';

    return (
      <div className={classNames("validation_component", this.props.className)} id={this.props.id}>
        {
          (() => {
            return (this.props.label) ? <label>{this.props.label}</label> : <label></label>;
          })()
        }

        <input className={ classNames("validation_input", this.props.validation_status) } ref="input" placeholder={this.props.placeholder} value={value} onChange={this.onChange} type={this.props.type} />
        <div className="validation_icon"></div>
        <div className="validation_text">{ this.props.validation_message }</div>
      </div>
    );
  }

};

ValidationInput.propTypes = {
  className:          React.PropTypes.string,
  id:                 React.PropTypes.string,
  label:              React.PropTypes.string,
  value:              React.PropTypes.string,
  placeholder:        React.PropTypes.string,
  validation_message: React.PropTypes.string,
  validation_status:  React.PropTypes.oneOf(['default','error', 'success']).isRequired,
  type:               React.PropTypes.oneOf(['input','optionSelect', 'password', 'radio', 'textarea']).isRequired,
  handleInputChange:  React.PropTypes.func
};

ValidationInput.defaultProps = {
  validation_status: 'default'
}

export default ValidationInput;
