import React from 'react';
import { connect } from 'react-redux';

import CredentialsRegisterFieldSet from './CredentialsRegisterFieldSet';
import AccountFieldSet from './AccountFieldSet';

import decorator from './decorators';

function SignUpForm(props) {
    const {
        fields: {
            credentials,
            account,
        },
        handleSubmit,
        errors
    } = props;

    return (
				<form className="SignUpForm__container" onSubmit={handleSubmit}>
						<CredentialsRegisterFieldSet field={credentials} errors={errors.credentials} title="Here for the first time?" />
            <AccountFieldSet field={account} errors={errors.account}/>

						<div className="formFooter">
								<button type="submit" className="button">Register</button>
								<a href="/">Back to Sign In</a>
						</div>
				</form>
    );
}

export default decorator(
  connect((state) => {

    return ({
      errors: state.error.signup || {}
    });

  })(SignUpForm)
);
