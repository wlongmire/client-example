import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadioSet from 'components/shared/PureRadioSet';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function AdditionalInsuredInformationFieldSet(props) {
  const {
    additionalInsured: {
      name,
      relationship,
      role,
      greaterThanTwoAdditional
    },
    errors
  } = props;

  const options = [
    {value:'yes', text:'Yes'},
    {value:'no',  text:'No'},
  ];

  return (<fieldset className="sub-questions">
    <span className="area-label-sub">Tell us about them.</span>

    <PureInput
      type="text"
      field={name}
      placeholder="Name"
      validation_status={ validationStatus(errors, "name") }
      validation_message={ validationMessage(errors, "name") }
    />

    <PureInput
      type="text"
      field={relationship}
      placeholder="Relationship to Primary"
      validation_status={ validationStatus(errors, "relationship") }
      validation_message={ validationMessage(errors, "relationship") }
    />

    <PureInput
      type="text"
      field={role}
      placeholder="Role on Project?"
      validation_status={ validationStatus(errors, "role") }
      validation_message={ validationMessage(errors, "role") }
    />

    <PureRadioSet
    label={{text:"Any other additional Insured?",type:"subtitle"}}
    field={greaterThanTwoAdditional}
    options={options}
    validation_status={ validationStatus(errors, "greaterThanTwoAdditional") }
    validation_message={ validationMessage(errors, "greaterThanTwoAdditional") }
    />

  </fieldset>);
}

export default AdditionalInsuredInformationFieldSet;
