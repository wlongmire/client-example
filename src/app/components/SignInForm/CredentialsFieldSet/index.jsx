import React from 'react';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';

function CredentialFieldSet(props) {
  let title = 'User name and Password:';
  let type = props.type;
  
  const {
    field: {
      username,
      password,
      retypePassword
    }
  } = props;


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
          {username.touched && username.error && <div className="error">{username.error}</div>}
        </li>

        <li>
          <label>Password*<PurePassword field={password} /></label>
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </li>
        { type == 'signUp' &&
        <li>
          <label>Re-Type Password*<PurePassword field={retypePassword} /></label>
          {retypePassword.touched && retypePassword.error && <div className="error">{retypePassword.error}</div>}
        </li>
        }
      </ul>
    </fieldset>
  );
}

export default CredentialFieldSet;
