import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import { onlyDomProps } from 'app/utils/reduxForm';

class PureInput extends Component {
  render() {
    const { field, ...rest } = this.props;
    const domProps = onlyDomProps(field);
    const type = this.props.type || "text";

    return <div className={classNames("validation_component", this.props.className)} id={this.props.id}>
      {
        (() => {
          return (this.props.label) ?
            <span
              className={(this.props.label.type==="subtitle")?
                "area-label-sub":
                "area-label"}
              data-tip={this.props.data_tip}>
              { this.props.label.text }
            </span>
            :<span></span>;
        })()
      }

      <input
        { ...domProps }
        value={field.value || ''}
        type={type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        className={ classNames("validation_input", this.props.validation_status) }
      />

      <div className="validation_text">{ this.props.validation_message }</div>
    </div>
  }
}

PureInput.propTypes = {
  field: PropTypes.object.isRequired
};

export default PureInput;
