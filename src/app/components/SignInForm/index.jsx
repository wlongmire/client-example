import React from 'react';
import { connect } from 'react-redux';

import CredentialsFieldSet from '../SignInForm/CredentialsFieldSet';

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

        <div className="formFooter">
            <button type="submit" className="button">Sign In</button>
            <a className="button" href="/signup">Register</a>
        </div>
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
