import React from 'react';
import { connect } from 'react-redux';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';
import ValidationInput from 'components/shared/ValidationInput';

function CredentialFieldSet(props) {
  let title = props.title ? props.title : 'Coming Back?';
  let type = props.type;

  const {
    field: {
      username,
      password,
      password_retype
    },
    errors
  } = props;

  return (
    <fieldset>
      <ul className="no-bullets">
        
        <li>
          <label>
            <PureInput
              type="text"
              field={username}
              placeholder="Enter Email"
              validation_status={
                (()=> ((errors.username)?"error":"default"))()
              }
              validation_message={
                (errors.username || '')
              }
            />
          </label>
        </li>

        <li>

          <label>
            <PurePassword
              field={password}
              placeholder="Password"
              validation_status={
                (()=> ((errors.password)?"error":"default"))()
              }
              validation_message={
                (errors.password || '')
              }
              />
          </label>
        </li>

        <li>

          <label>
            <PurePassword
              field={password_retype}
              placeholder="Retype Password"
              validation_status={
                (()=> ((errors.password)?"error":"default"))()
              }
              validation_message={
                (errors.password || '')
              }
              />
          </label>

        </li>

      </ul>
    </fieldset>
  );
}

export default connect((state) => {

  return ({
    errors: state.error.signup.credentials
  });

})(CredentialFieldSet);
