import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import OtherNamedFieldSet from './OtherNamedFieldSet';

function SecondaryNamedInsuredFieldSet(props) {
  const {
    otherNamedInsured,
    hasOtherNamedInsured,
    greaterThanTwoNamed
  } = props;

  const options = [
    {value:'yes', text:'Yes'},
    {value:'no',  text:'No'}
  ];

  return (<fieldset>

    <PureRadioSet
      label={{text:"Is there a secondary named insured?",type:"title"}}
      data_tip="Qualified entities must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor"
      field={hasOtherNamedInsured}
      options={options}
      validation_status='default'
      validation_message=''
      />

    <ToggleDisplay
      show={hasOtherNamedInsured.value === 'yes'}
      render={
        () => (<OtherNamedFieldSet otherNamedInsured={otherNamedInsured}/>)
      }/>

  </fieldset>);
}

export default SecondaryNamedInsuredFieldSet;
