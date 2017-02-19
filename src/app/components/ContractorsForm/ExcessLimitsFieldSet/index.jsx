import React from 'react';

import PureInput from 'components/shared/PureInput';

function ExcessLimitsFieldSet(props) {
  const {
    glLimits,
    errors
  } = props;

  return (
    <fieldset>

      <span
        className="area-label"
        data-tip="Excess limits of the Contractor&#39;s primary Policy">
        What are the Excess limits of the Contractor&#39;s primary Policy?
      </span>

      <PureInput
        type="text"
        field={glLimits}
        placeholder="Excess limits"
        validation_status="default"
        validation_message=''
      />

    </fieldset>);
}

export default ExcessLimitsFieldSet;
