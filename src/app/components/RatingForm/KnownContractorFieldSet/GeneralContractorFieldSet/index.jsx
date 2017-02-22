import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadioSet from 'components/shared/PureRadioSet';

function GeneralContractorFieldSet(props) {
  const {
    generalContractor: {
      name,
      glCarrier,
      glLimits,
      isSupervisingSubs
    }
  } = props;

  const options = [{value:"yes", text:"Yes"}, {value:"no", text:"No"}];

  return (
    <fieldset className="sub-questions">
      <span className="area-label-sub">Yes? Great! Lets get some more information</span>

      <PureInput
        type="text"
        field={name}
        placeholder="Name of General Contractor"
        validation_status='default'
        validation_message=''
      />

      <PureInput
        type="text"
        field={glCarrier}
        placeholder="General Liability Carrier"
        validation_status='default'
        validation_message=''
      />

      <PureInput
        type="text"
        field={glLimits}
        placeholder="Total GL Limits Required"
        validation_status='default'
        validation_message=''
      />

      <span className="area-label-sub">Is the owner paying, contracting, or supervising any subcontractors other than the GC?</span>
      <PureRadioSet
      field={isSupervisingSubs}
      options={options}
      validation_status='default'
      validation_message=''
      />

    </fieldset>
  );
}

export default GeneralContractorFieldSet;
