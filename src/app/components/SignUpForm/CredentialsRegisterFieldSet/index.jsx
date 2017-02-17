import React from 'react';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';
import ValidationInput from 'components/shared/ValidationInput';
import { validationStatus, validationMessage } from 'app/utils/reduxForm';

function CredentialsRegisterFieldSet(props) {
  const {
    title,
    field: {
      username,
      password,
      retypePassword
    },
    errors
  } = props;

  return (
    <fieldset>
      <h3>Credential Details</h3>

      <ul className="no-bullets">
        <li>

          <PureInput
            label="Username"
            type="text"
            field={username}
            placeholder="Username (Email)"
            validation_status={ validationStatus(errors, "username") }
            validation_message={ validationMessage(errors, "username") }
          />

        </li>

        <li>

          <PurePassword
            label="Password"
            field={password}
            placeholder="Password"
            validation_status={ validationStatus(errors, "password") }
            validation_message={ validationMessage(errors, "password") }
            />

        </li>

        <li>

          <PurePassword
            label="Retype Password"
            field={retypePassword}
            placeholder="Password"
            validation_status={ validationStatus(errors, "retypePassword") }
            validation_message={ validationMessage(errors, "retypePassword") }
            />

        </li>

      </ul>
    </fieldset>
  );
}

export default CredentialsRegisterFieldSet;
