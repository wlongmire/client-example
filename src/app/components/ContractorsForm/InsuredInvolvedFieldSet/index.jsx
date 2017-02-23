import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import PureTextArea from 'components/shared/PureTextArea';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function InsuredInvolvedFieldSet(props) {
  const {
    isSupervisingSubs,
    errors
  } = props;

  return (
    <fieldset>
      <span
        className="area-label">
        Will the named insured be involved with any supervision or oversight of the project?
      </span>

      <PureRadioSet
        field={isSupervisingSubs}
        options={[{value:"yes", text:"Yes"},{value:"no", text:"No"}]}
        validation_status={ validationStatus(errors, "required") }
        validation_message={ validationMessage(errors, "required") }
      />

    </fieldset>);
}

export default InsuredInvolvedFieldSet;