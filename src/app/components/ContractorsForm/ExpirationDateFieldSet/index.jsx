import React from 'react';

import PureInput from 'components/shared/PureInput';

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
        validation_status="default"
        validation_message=''
      />

    </fieldset>);
}

export default ExpirationDateFieldSet;
