import React, { Component, PropTypes } from 'react';

import { onlyDomProps } from 'app/utils/reduxForm';

class PureRadio extends Component {
  render() {
    const { field, value, ...rest } = this.props;
    return (
      <input
        { ...onlyDomProps(field) }
        type="radio"
        value={value}
        checked={value === field.value}
        { ...rest }
      />
    );
  }
}

PureRadio.propTypes = {
  field: PropTypes.object.isRequired
};

export default PureRadio;
