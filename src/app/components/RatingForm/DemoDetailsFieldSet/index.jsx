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
      <ul>
        <li>
          <span className="area-label-sub">Is the GC hiring a demo subcontractor?</span>
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
            <span className="area-label-sub">What are the total demo costs?</span>
            <PureInput
              type="number"
              field={costs}
            />
          </label>
        </li>
        <li>
          <label>
            <span className="area-label-sub">How long, in months, will demo take?</span>
            <PureInput
              type="number"
              field={duration}
            />
          </label>
        </li>
        <li>
          <label>
            <span className="area-label-sub">What safety precautions, if any, are in place to protect pedestrians?</span>
            <PureInput
              type="text"
              field={pedestrianSafetyPrecautions}
            />
          </label>
        </li>
      </ul>
    </fieldset>
  );
}

export default DemoDetailsFieldSet;
