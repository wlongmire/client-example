import React from 'react';

import PureInput from 'components/shared/PureInput';

function FinishDateFieldSet(props) {
  const {
    anticipatedFinishDate,
    errors
  } = props;

  return (
    <fieldset>

      <span
        className="area-label"
        data-tip="provide the anticipated project term. Note: Maximum length of term cannot exceed 60 months.">
        What is the Anticipated Finish Date of Project?
      </span>

      <PureInput
        type="date"
        field={anticipatedFinishDate}
        validation_status="default"
        validation_message=''
      />

    </fieldset>);
}

export default FinishDateFieldSet;
