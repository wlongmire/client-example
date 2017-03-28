import React from 'react';
import { connect } from 'react-redux';

import CredentialsFieldSet from './CredentialsFieldSet';
import { Button } from 'react-bootstrap';

import decorator from './decorators';

function SignInForm(props) {
    const {
        fields: {
            credentials
        },
        handleSubmit,
        errors
    } = props;

    return (
    <form className="SignInForm__container" onSubmit={handleSubmit}>
        <CredentialsFieldSet field={credentials} errors={errors.credentials}/>

        <Button bsStyle="primary" type="submit">Sign In</Button>
        <Button bsStyle="primary" href="/signup">Register</Button>

    </form>
    );
}

export default decorator(
  connect((state) => {

    return ({
      errors: state.error.signin || {}
    });

  })(SignInForm)
);
