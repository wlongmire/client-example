import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import AdditionalInsuredInformationFieldSet from './AdditionalInsuredInformationFieldSet';

function AdditionalInsuredFieldSet(props) {
  const {
    additionalInsured,
    hasAdditionalInsured,
    errors
  } = props;

  const options = [
    {value:"yes", text:"Yes"},
    {value:"no", text:"No"}
  ];

  return (
    <fieldset>

      <PureRadioSet
        label={{text:"Any Additional Insured?",type:"title"}}
        data_tip="Qualified Additional Insureds must also be named as an Additional Insured on the General Contractor’s General Liability in order to be approved"
        field={hasAdditionalInsured}
        options={options}
        validation_status='default'
        validation_message=''
        />

      <ToggleDisplay
        show={hasAdditionalInsured.value === 'yes'}
        render={
          () => (<AdditionalInsuredInformationFieldSet additionalInsured={additionalInsured}/>)
        }/>


    </fieldset>
  );
}

export default AdditionalInsuredFieldSet;
