import React from 'react';
import { connect } from 'react-redux';

import CredentialsRegisterFieldSet from './CredentialsRegisterFieldSet';
import AccountFieldSet from './AccountFieldSet';

import { Button } from 'react-bootstrap';

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
          <h1>Create account</h1>
          <h3>Please enter your account details below</h3>

					<CredentialsRegisterFieldSet field={credentials} errors={errors.credentials} title="Here for the first time?" />
          <AccountFieldSet field={account} errors={errors.account}/>

					<div className="formFooter">
							<Button type="submit" >Register</Button>
							<Button href="/">Back to Sign In</Button>
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
