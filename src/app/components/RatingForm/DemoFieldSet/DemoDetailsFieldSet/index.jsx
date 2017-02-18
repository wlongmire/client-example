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
      <span className="area-label-sub">Ok, we're going to need some specifics on that</span>

      <ul>
        <li>
          
          <PureRadioSet
            label={{text:"Is the GC hiring a demo subcontractor?<",type:"title"}}
            field={subcontractor}
            options={options}
            validation_status='default'
            validation_message=''
            />
        </li>

        <li>
          <label>
            <span className="area-label-sub">What are the total demo costs?</span>
            <PureInput
              type="number"
              field={costs}
              validation_status='default'
              validation_message=''
            />
          </label>
        </li>

        <li>
          <label>
            <span className="area-label-sub">How long, in months, will demo take?</span>
            <PureInput
              type="number"
              field={duration}
              validation_status='default'
              validation_message=''
            />
          </label>
        </li>

        <li>
          <label>
            <span className="area-label-sub">What safety precautions, if any, are in place to protect pedestrians?</span>
            <PureInput
              type="text"
              field={pedestrianSafetyPrecautions}
              validation_status='default'
              validation_message=''
            />
          </label>
        </li>

      </ul>
    </fieldset>
  );
}

export default DemoDetailsFieldSet;
