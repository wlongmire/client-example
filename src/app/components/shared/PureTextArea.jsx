import React, { Component, PropTypes } from 'react';

import { onlyDomProps } from 'app/utils/reduxForm';

class PureTextArea extends Component {

  render() {
    const { field, ...rest } = this.props;
    return (
      <textarea
        { ...onlyDomProps(field) }
        value={field.value || ''}
        { ...rest }
      />
    );
  }
}

PureTextArea.propTypes = {
  field: PropTypes.object.isRequired
};

export default PureTextArea;
