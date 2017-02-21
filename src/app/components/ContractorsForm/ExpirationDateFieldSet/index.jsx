import React from 'react';

import PureInput from 'components/shared/PureInput';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function ExpirationDateFieldSet(props) {
  const {
    glExpirationDate,
    errors
  } = props;

  return (
    <fieldset>

      <span
        className="area-label"
        data-tip="Expiration Date of the Contractor&#39;s GL Policy">
        When is the Expiration Date of the Contractor&#39;s GL Policy?
      </span>

      <PureInput
        type="date"
        field={glExpirationDate}
        placeholder="Expiration Date"
        validation_status={ validationStatus(errors, "date") }
        validation_message={ validationMessage(errors, "date") }
      />

    </fieldset>);
}

export default ExpirationDateFieldSet;
