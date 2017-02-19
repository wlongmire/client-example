import React from 'react';

import PureInput from 'components/shared/PureInput';

function GLCarrierFieldSet(props) {
  const {
    glCarrier,
    errors
  } = props;

  return (
    <fieldset>

      <span
        className="area-label"
        data-tip="Name of General Contractor">
        Who is the GL Carrier of Contractor?
      </span>

      <PureInput
        type="text"
        field={glCarrier}
        placeholder="GL Carrier of Contractor"
        validation_status="default"
        validation_message=''
      />

    </fieldset>);
}

export default GLCarrierFieldSet;
