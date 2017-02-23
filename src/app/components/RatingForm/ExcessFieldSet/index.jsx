import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import ExcessDetailsFieldSet from './ExcessDetailsFieldSet';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function ExcessFieldSet(props) {
  const {
    excessDetails,
    errors
  } = props;

  const options = [
    {value:"yes", text:"Yes"},
    {value:"no", text:"No"}
  ];

  return (
    <fieldset>

      <PureRadioSet
        label={{text:"Does this project require excess coverage?",type:"title"}}
        field={excessDetails.required}
        options={options}
        validation_status={ validationStatus(errors, "required") }
        validation_message={ validationMessage(errors, "required") }
        />

      <ToggleDisplay
        show={excessDetails.required.value === 'yes'}
        render={() => (
          <ExcessDetailsFieldSet
            excessDetails={excessDetails}
            errors={errors}
          />
        )}
      />

    </fieldset>
  );
}

export default ExcessFieldSet;
