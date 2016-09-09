import React from 'react';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import PureTextArea from 'components/shared/PureTextArea';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import styles from './styles';

import CredentialsFieldSet from '../SignInForm/CredentialsFieldSet';
import AccountFieldSet from './AccountFieldSet';

import decorator from './decorators';
import handleSubmit from './decorators/reduxForm/handleSubmit';


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
        <CredentialsFieldSet field={credentials} type="signUp" title="Here for the first time?" />
        <AccountFieldSet field={account} />
        <div className="formFooter">
            <button type="submit">Register</button>
            <a href="/">Back to Sign In</a>
        </div>
    </form>
    );
}

export default decorator(SignUpForm);