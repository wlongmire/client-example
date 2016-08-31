import React from 'react';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';

function AccountFieldSet(props) {
  let title = 'Account Information';

  const {
    field: {
      firstName,
      lastName
    }
  } = props;
  return (
    <fieldset>
      {title}
      <ul>
        <li>
          <label>
            First Name*
            <PureInput
              type="text"
              field={firstName}
            />
          </label>
        </li>
        <li>
          <label>
            Last Name
            <PureInput
              type="text"
              field={lastName}
            />
          </label>
        </li>
      </ul>
    </fieldset>
  );
}

export default AccountFieldSet;
