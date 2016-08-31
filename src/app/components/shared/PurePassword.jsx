import React, { Component, PropTypes } from 'react';

import { onlyDomProps } from 'app/utils/reduxForm';

class PurePassword extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field;
  }

  render() {
    const { field, ...rest } = this.props;
    return (
      <input
        { ...onlyDomProps(field) }
        type="password"
        value={field.value || ''}
        { ...rest }
      />
    );
  }
}

PurePassword.propTypes = {
  field: PropTypes.object.isRequired
};

export default PurePassword;
