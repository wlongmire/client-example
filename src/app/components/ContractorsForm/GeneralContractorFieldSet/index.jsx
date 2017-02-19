import React from 'react';

import PureInput from 'components/shared/PureInput';

function GeneralContractorFieldSet(props) {
  const {
    name,
    errors
  } = props;

  return (
    <fieldset>
      <span
        className="area-label"
        data-tip="Name of General Contractor">
        What is the Name of the Designated Contractor?
      </span>

      <PureInput
        type="text"
        field={name}
        placeholder="Name of General Contractor"
        validation_status="default"
        validation_message=''
      />

    </fieldset>);
}

export default GeneralContractorFieldSet;
