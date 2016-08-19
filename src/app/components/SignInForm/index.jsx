import React from 'react';

import PureInput from 'components/shared/PureInput';
import PureRadio from 'components/shared/PureRadio';
import PureOptionSelect from 'components/shared/PureOptionSelect';
import PureTextArea from 'components/shared/PureTextArea';
import ToggleDisplay from 'components/shared/ToggleDisplay';

import styles from './styles';

import CredentialsFieldSet from './CredentialsFieldSet';

import decorator from './decorators';

function SignInForm(props) {
    const {
        fields: {
            credentials
        },
        handleSubmit
    } = props;

    return (
    <form className="RatingForm__container" onSubmit={handleSubmit}>
        <CredentialsFieldSet field={credentials} />
        <button type="submit">Sign In</button>
    </form>
    );
}

export default decorator(SignInForm);