import React from 'react';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';

function AccountFieldSet(props) {
  let title = 'Account Information';

  const {
    account: {
      firstName,
      lastName
    }
  } = props;
  return (
    <fieldset>
      {title}
      <ol>
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
            Last Name*
            <PureInput
              type="text"
              field={lastName}
            />
          </label>
        </li>
      </ol>
    </fieldset>
  );
}

export default AccountFieldSet;
