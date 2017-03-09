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
    <div>
      <PureInput
          type="text"
          field={username}
          placeholder="Username (Email)"
          validation_status={ validationStatus(errors, "username") }
          validation_message={ validationMessage(errors, "username") }
        />

        <PurePassword
          field={password}
          placeholder="Password"
          validation_status={ validationStatus(errors, "password") }
          validation_message={ validationMessage(errors, "password") }
          />

        <PurePassword
          field={retypePassword}
          placeholder="Password"
          validation_status={ validationStatus(errors, "retypePassword") }
          validation_message={ validationMessage(errors, "retypePassword") }
          />

      </div>
  );
}

export default CredentialsRegisterFieldSet;
