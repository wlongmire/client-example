import React from 'react';
import PureInput from 'components/shared/PureInput';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function ProjectTermFieldSet(props) {
  const {
    term,
    errors
  } = props;

  return (
    <fieldset>
      <span className="area-label" data-tip="provide the anticipated project term. Note: Maximum length of term cannot exceed 60 months."> What is the term of the project, in months?</span>

      <PureInput
        type="number"
        field={term}
        validation_status={ validationStatus(errors, "term") }
        validation_message={ validationMessage(errors, "term") }
      />

    </fieldset>
  );
}

export default ProjectTermFieldSet;
