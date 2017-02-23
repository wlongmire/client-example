import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadioSet from 'components/shared/PureRadioSet';

function DemoDetailsFieldSet(props) {
  const {
    demoDetails: {
      subcontractor,
      costs,
      duration,
      pedestrianSafetyPrecautions
    }
  } = props;

  const options = [{value:"yes", text:"Yes"}, {value:"no", text:"No"}];

  return (
    <fieldset className="sub-questions">
      <span className="area-label-sub">Is the GC hiring a demo subcontractor?</span>
      <PureRadioSet
        field={subcontractor}
        options={options}
        validation_status='default'
        validation_message=''
        />

      <span className="area-label-sub">What are the total demo costs?</span>
      <PureInput
        type="number"
        field={costs}
        validation_status='default'
        validation_message=''
      />

      <span className="area-label-sub">How long, in months, will demo take?</span>
      <PureInput
        type="number"
        field={duration}
        validation_status='default'
        validation_message=''
      />

      <span className="area-label-sub">What safety precautions, if any, are in place to protect pedestrians?</span>
      <PureInput
        type="text"
        field={pedestrianSafetyPrecautions}
        validation_status='default'
        validation_message=''
      />

    </fieldset>
  );
}

export default DemoDetailsFieldSet;
