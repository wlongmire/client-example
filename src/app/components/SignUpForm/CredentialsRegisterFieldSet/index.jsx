import React from 'react';
import { connect } from 'react-redux';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';
import ValidationInput from 'components/shared/ValidationInput';

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
            validation_status={
              (()=> ((errors.username)?"error":"default"))()
            }
            validation_message={
              (errors.username || '')
            }
          />

        </li>

        <li>

          <PurePassword
            label="Password"
            field={password}
            placeholder="Password"
            validation_status={
              (()=> ((errors.password)?"error":"default"))()
            }
            validation_message={
              (errors.password || '')
            }
            />

        </li>

        <li>

          <PurePassword
            label="Retype Password"
            field={retypePassword}
            placeholder="Password"
            validation_status={
              (()=> ((errors.retypePassword)?"error":"default"))()
            }
            validation_message={
              (errors.retypePassword || '')
            }
            />

        </li>

      </ul>
    </fieldset>
  );
}

export default connect((state) => {

  return ({
    errors: state.error.signup.credentials
  });

})(CredentialsRegisterFieldSet);
