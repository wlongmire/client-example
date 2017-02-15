import React from 'react';

import CredentialsFieldSet from '../SignInForm/CredentialsFieldSet';

import decorator from './decorators';

function SignInForm(props) {
    const {
        fields: {
            credentials
        },
        handleSubmit
    } = props;

    return (
    <form className="SignInForm__container" onSubmit={handleSubmit}>
        <CredentialsFieldSet field={credentials}/>

        <div className="formFooter">
            <button type="submit" className="button">Sign In</button>
            <a className="button" href="/signup">Register</a>
        </div>
    </form>
    );
}

export default decorator(SignInForm);
