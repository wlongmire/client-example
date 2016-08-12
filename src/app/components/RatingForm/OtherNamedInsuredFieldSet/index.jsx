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
    <fieldset>
      Yes? Tell us about them.
      <ol>
        <li>
          <label>
            Name?
            <PureInput
              type="text"
              field={name}
            />
          </label>
        </li>
        <li>
          <label>
            Relationship to Primary?
            <PureInput
              type="text"
              field={relationship}
            />
          </label>
        </li>
        <li>
          <label>
            Role on Project?
            <PureInput
              type="text"
              field={role}
            />
          </label>
        </li>
      </ol>
    </fieldset>
  );
}

export default OtherNamedInsuredFieldSet;
