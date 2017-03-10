import React from 'react';
import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

import PureRadioSet from 'components/shared/PureRadioSet';

function TowerCraneFieldSet(props) {
  const {
    towerCraneUse,
    errors
  } = props;

  const options = [
    {value:"yes", text:"Yes"},
    {value:"no", text:"No"}
  ];

  return (
    <fieldset>

      <PureRadioSet
        label={{text:"Will there be use of a tower crane on this project?",type:"title"}}
        field={towerCraneUse}
        options={options}
        validation_status={ validationStatus(errors, "tower") }
        validation_message={ validationMessage(errors, "tower") }
        />

    </fieldset>
  );
}

export default TowerCraneFieldSet;
