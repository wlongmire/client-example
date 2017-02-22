import React from 'react';

import PureRadioSet from 'components/shared/PureInput';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function VerticalExpansionFieldSet(props) {
  const {
    overFourFloors,
    errors
  } = props;

  return (
    <fieldset>

      <span className="area-label" data-tip="Does the project include the addition of any stories or vertical expansion?">
      Does the project include the addition of any stories or vertical expansion?
      </span>

      <PureRadioSet
        field={overFourFloors}
        options={[{value:"yes", text:"Yes"},{value:"no", text:"No"}]}
        validation_status={ validationStatus(errors, "required") }
        validation_message={ validationMessage(errors, "required") }
        />

    </fieldset>);
}

export default VerticalExpansionFieldSet;
