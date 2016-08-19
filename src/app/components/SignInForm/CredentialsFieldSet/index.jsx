import React from 'react';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';

function CredentialFieldSet(props) {
  let title = 'User name and Password:';
  let provideRetypePassword = props.type == "signUp";

  let passwordFields;

  const {
    field: {
      username,
      password,
      retypePassword
    }
  } = props;

  if (provideRetypePassword) {
    passwordFields = <li><label>Password*<PurePassword field={password} /></label></li>;
    passwordFields += <li><label>Re-Type Password*<PurePassword field={retypePassword} /></label></li>;
  } else {
    passwordFields = <li><label>Password*<PurePassword field={password} /></label></li>;
  }

  return (
    <fieldset>
      {title}
      <ul>
        <li>
          <label>
            User Name*
            <PureInput
              type="text"
              field={username}
            />
          </label>
        </li>
        {passwordFields}
      </ul>
    </fieldset>
  );
}

export default CredentialFieldSet;
