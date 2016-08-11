import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';

function DemoDetailsFieldSet(props) {
  const {
    demoDetails: {
      subcontractor,
      costs,
      duration,
      pedestrianSafetyPrecautions
    }
  } = props;
  return (
    <fieldset>
      Ok, we're going to need some specifics on that
      <ol>
        <li>
          Is the GC hiring a demo subcontractor?
          <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={subcontractor}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={subcontractor}
              />
              No
            </label>
          </radiogroup>
        </li>
        <li>
          <label>
            What are the total demo costs?
            <PureInput
              type="number"
              field={costs}
            />
          </label>
        </li>
        <li>
          <label>
            How long, in months, will demo take?
            <PureInput
              type="number"
              field={duration}
            />
          </label>
        </li>
        <li>
          <label>
            What safety precautions, if any, are in place to protect pedestrians?
            <PureInput
              type="text"
              field={pedestrianSafetyPrecautions}
            />
          </label>
        </li>
      </ol>
    </fieldset>
  );
}

export default DemoDetailsFieldSet;
