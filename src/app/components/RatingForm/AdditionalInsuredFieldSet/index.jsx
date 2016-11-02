import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';

function AdditionalInsuredFieldSet(props) {
  const {
    additionalInsured: {
      name,
      relationship,
      role,
      greaterThanTwoAdditional
    }
  } = props;
  return (
    <fieldset className="sub-questions">
      <span className="area-label-sub">Tell us about them.</span>
      <ul>
        <li>
          <label>
            <PureInput
              type="text"
              field={name}
              placeholder="Name"
            />
          </label>
        </li>
        <li>
          <label>
            <PureInput
              type="text"
              field={relationship}
              placeholder="Relationship to Primary"
            />
          </label>
        </li>
        <li>
          <label>
            <PureInput
              type="text"
              field={role}
              placeholder="Role on Project?"
            />
          </label>
        </li>
        <li>
        <span className="area-label-sub">Any other additional insured?</span>
        <radiogroup>
            <label>
              <PureRadio
                value="yes"
                field={greaterThanTwoAdditional}
              />
              Yes
            </label>
            <label>
              <PureRadio
                value="no"
                field={greaterThanTwoAdditional}
              />
              No
            </label>
          </radiogroup>
          </li>
      </ul>
    </fieldset>
  );
}

export default AdditionalInsuredFieldSet;
