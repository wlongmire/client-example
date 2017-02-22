import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import { onlyDomProps } from 'app/utils/reduxForm';

class PureOptionSelect extends Component {
  render() {
    const { field, options } = this.props;
    const domProps = onlyDomProps(field);

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
  }
}

PureOptionSelect.propTypes = {
  field: PropTypes.object.isRequired
};

export default PureOptionSelect;
