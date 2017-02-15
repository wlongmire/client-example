import React from 'react';

import CredentialsRegisterFieldSet from './CredentialsRegisterFieldSet';
import AccountFieldSet from './AccountFieldSet';

import decorator from './decorators';

function SignUpForm(props) {
    const {
        fields: {
            credentials,
            account,
        },
        handleSubmit
    } = props;

    return (
				<form className="SignUpForm__container" onSubmit={handleSubmit}>
						<CredentialsRegisterFieldSet field={credentials} title="Here for the first time?" />
            <AccountFieldSet field={account} />

						<div className="formFooter">
								<button type="submit" className="button">Register</button>
								<a href="/">Back to Sign In</a>
						</div>
				</form>
    );
}

export default decorator(SignUpForm);
