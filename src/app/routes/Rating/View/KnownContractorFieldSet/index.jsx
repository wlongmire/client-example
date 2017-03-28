import React from 'react';

import PureRadioSet from 'components/shared/PureRadioSet';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import GeneralContractorFieldSet from './GeneralContractorFieldSet';

function KnownContractorFieldSet(props) {
  const {
    generalContractor,
    errors
  } = props;

  const options = [{value:"yes", text:"Yes"}, {value:"no", text:"No"}];

  return (
    <fieldset>
      <PureRadioSet
        label={{text:"Is the General Contractor known?",type:"title"}}
        data_tip="Note: Coverage will be quoted subject to form U658 until the General Contractor is reviewed and approved. To approve the General Contractor we will need at a minimum, fully executed contract, certificate of insurance, and endorsement listing from the GC’s General Liability."
        field={generalContractor.isKnown}
        options={options}
        validation_status='default'
        validation_message=''
        />


      <ToggleDisplay
        show={generalContractor.isKnown.value === 'yes'}
        render={() => (
          <GeneralContractorFieldSet generalContractor={generalContractor} />
        )}
      />

    </fieldset>
  );
}

export default KnownContractorFieldSet;
