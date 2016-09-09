import React from 'react';

import PureInput from 'components/shared/PureInput';

function OtherNamedInsuredFieldSet(props) {
  const {
    otherNamedInsured: {
      name,
      relationship,
      role
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
      </ul>
    </fieldset>
  );
}

export default OtherNamedInsuredFieldSet;
