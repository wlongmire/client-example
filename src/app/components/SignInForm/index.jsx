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

import decorator from './decorators';
import handleSubmit from './decorators/reduxForm/handleSubmit';


function SignInForm(props) {

    const {
        fields: {
            credentials
        },
        handleSubmit
    } = props;
    
    return (
    <form className="SignInForm__container" onSubmit={handleSubmit}>
        <CredentialsFieldSet field={credentials} />
        <div className="formFooter">
            <button type="submit">Sign In</button>
            <a href="/signup">Register</a>
        </div>
    </form>
    );
}

export default decorator(SignInForm);