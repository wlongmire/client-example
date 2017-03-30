import React, {Component} from 'react';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {
  validationStatus,
  validationMessage
} from 'app/utils/reduxForm';

class CredentialFieldSet extends Component {

  componentWillMount(){
    if(this.props.user){
      browserHistory.push('/submissions');
    }
  }

  render() {
    const {
      field: {
        username,
        password
      },
      errors
    } = this.props;

    return (
      <div>
        <h1>Welcome</h1>
        <h3>Please Sign In</h3>

        <PureInput
          type="text"
          field={username}
          placeholder="Username"
          validation_status={ validationStatus(errors, "username") }
          validation_message={ validationMessage(errors, "username") }
        />

        <PurePassword
          field={password}
          placeholder="Password"
          validation_status={ validationStatus(errors, "password") }
          validation_message={ validationMessage(errors, "password") }
          />
      </div>
    );
  }
}

export default connect((state)=>{
  return{
    user: state.user
  };
})(CredentialFieldSet);
