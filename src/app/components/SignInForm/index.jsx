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

import CredentialsFieldSet from './CredentialsFieldSet';

import decorator from './decorators';
import handleSubmit from './decorators/reduxForm/handleSubmit';
import handleValidate from './decorators/reduxForm/handleValidate';


function SignInForm(props) {
    const {
        fields: {
            credentials
        },
        handleSubmit,
        handleValidate
    } = props;
    
    return (
    <form className="RatingForm__container" onSubmit={handleSubmit}>
        <CredentialsFieldSet field={credentials} />
        <button type="submit">Sign In</button>
        <button type="register">Register</button>
        <button>Forgot Password</button>
    </form>
    );
}

export default decorator(SignInForm);