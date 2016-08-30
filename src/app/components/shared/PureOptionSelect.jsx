import React, { Component, PropTypes } from 'react';

import { onlyDomProps } from 'app/utils/reduxForm';

class PureOptionSelect extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field;
  }

  render() {
    const { field, ...rest } = this.props;
    return (
      <select
        { ...onlyDomProps(field) }
        { ...rest }
      >
        {this.props.children}
      </select>
    );
  }
}

PureOptionSelect.propTypes = {
  field: PropTypes.object.isRequired
};

export default PureOptionSelect;
