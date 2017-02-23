import React from 'react';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

function CredentialFieldSet(props) {
  let title = props.title ? props.title : 'Coming Back?';

  const {
    field: {
      username,
      password
    },
    errors
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
              validation_status={ validationStatus(errors, "username") }
              validation_message={ validationMessage(errors, "username") }
            />
          </label>
        </li>

        <li>

          <label>
            <PurePassword
              field={password}
              placeholder="Password"
              validation_status={ validationStatus(errors, "password") }
              validation_message={ validationMessage(errors, "password") }
              />
          </label>
        </li>

      </ul>
    </fieldset>
  );
}

export default CredentialFieldSet;
