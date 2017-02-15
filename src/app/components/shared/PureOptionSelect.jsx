import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import { onlyDomProps } from 'app/utils/reduxForm';

class PureOptionSelect extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field;
  }

  render() {
    const { field, ...rest } = this.props;
    const domProps = onlyDomProps(field);

    return <div className={classNames("validation_component", this.props.className)} id={this.props.id}>
      {
        (() => {
          return (this.props.label) ? <label>{this.props.label}</label> : <label></label>;
        })()
      }

      <select
        { ...domProps }
        value={field.value || ''}
        type="text"
        className={ classNames("validation_input", this.props.validation_status) }
      >
        {this.props.children}
      </select>

      <div className="validation_text">{ this.props.validation_message }</div>
    </div>;

    // return (
    //   <select
    //     { ...onlyDomProps(field) }
    //     { ...rest }
    //   >
    //     {this.props.children}
    //   </select>
    // );
  }
}

PureOptionSelect.propTypes = {
  field: PropTypes.object.isRequired
};

export default PureOptionSelect;
