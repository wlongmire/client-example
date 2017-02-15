import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import { onlyDomProps } from 'app/utils/reduxForm';

class PureInput extends Component {
  render() {
    const { field, ...rest } = this.props;
    const domProps = onlyDomProps(field);

    return <div className={classNames("validation_component", this.props.className)} id={this.props.id}>
      {
        (() => {
          return (this.props.label) ? <label>{this.props.label}</label> : <label></label>;
        })()
      }

      <input
        { ...domProps }
        value={field.value || ''}
        type="text"
        className={ classNames("validation_input", this.props.validation_status) }
        placeholder={this.props.placeholder}
      />

      <div className="validation_text">{ this.props.validation_message }</div>
    </div>
  }
}

PureInput.propTypes = {
  field: PropTypes.object.isRequired
};

export default PureInput;
