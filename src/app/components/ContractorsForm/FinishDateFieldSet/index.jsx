import React from 'react';

import PureInput from 'components/shared/PureInput';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

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
        validation_status={ validationStatus(errors, "date") }
        validation_message={ validationMessage(errors, "date") }
      />

    </fieldset>);
}

export default FinishDateFieldSet;
