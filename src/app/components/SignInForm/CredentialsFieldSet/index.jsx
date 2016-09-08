import React from 'react';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';

function CredentialFieldSet(props) {
  let title = 'Coming Back?';
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
      <h1>{title}</h1>
      <ul className="no-bullets">
        <li>
          <label>
            <PureInput
              type="text"
              field={username}
              placeholder="Username (Email)"
            />
          </label>
          {username.touched && username.error && <div className="error">{username.error}</div>}
        </li>

        <li>
          <label><PurePassword field={password} placeholder="Password" /></label>
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
