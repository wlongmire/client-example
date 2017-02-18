import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import { onlyDomProps } from 'app/utils/reduxForm';

class PureTextArea extends Component {

  render() {
    const { field, ...rest } = this.props;
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

      <textarea
        { ...domProps }
        value={field.value || ''}
        type="radio"
        className={ classNames("validation_input", this.props.validation_status) }
        placeholder={this.props.placeholder}
      />

      <div className="validation_text">{ this.props.validation_message }</div>
    </div>
  }
}

PureTextArea.propTypes = {
  field: PropTypes.object.isRequired
};

export default PureTextArea;
