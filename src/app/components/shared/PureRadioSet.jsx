import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import { onlyDomProps } from 'app/utils/reduxForm';

class PureRadioSet extends Component {

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

      <radiogroup
        className={ classNames("validation_input", this.props.validation_status) }>
        {
          (()=>{
            return options.map((option, idx)=>{

              return(
                <label key={idx}>
                  <input
                    { ...domProps }
                    value={option.value}
                    checked={option.value === field.value}
                    type="radio"
                  />
                {option.text}
                </label>
              );

            })
          })()
        }

      </radiogroup>

      <div className="validation_text">{ this.props.validation_message }</div>
    </div>
  }
}

export default PureRadioSet;
