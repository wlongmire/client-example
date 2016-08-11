import React, { Component, PropTypes } from 'react';

import { onlyDomProps } from 'app/utils/reduxForm';

class PureInput extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field;
  }

  render() {
    const { field, ...rest } = this.props;
    return (
      <input
        { ...onlyDomProps(field) }
        value={field.value || ''}
        { ...rest }
      />
    );
  }
}

PureInput.propTypes = {
  field: PropTypes.object.isRequired
};

export default PureInput;
