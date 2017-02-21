import React from 'react';

import PureInput from 'components/shared/PureInput';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

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
        validation_status={ validationStatus(errors, "carrier") }
        validation_message={ validationMessage(errors, "carrier") }
      />

    </fieldset>);
}

export default GLCarrierFieldSet;
