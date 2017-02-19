import React from 'react';

import PureInput from 'components/shared/PureInput';

function NamedInsuredCredentialsFieldSet(props) {
  const {
    primaryNamedInsured,
    errors
  } = props;

  return (
    <fieldset>

      <span
        className="area-label"
        data-tip="This entity must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor">
        Who is the Primary Named Insured?
      </span>

      <PureInput
        type="text"
        field={primaryNamedInsured}
        placeholder=""
        validation_status="default"
        validation_message=''
      />

    </fieldset>);
}

export default NamedInsuredCredentialsFieldSet;
