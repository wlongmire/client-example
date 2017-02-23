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
    // if user is already signed in, redirect user to submissions page
    if(this.props.user){
      browserHistory.push('/home');
    }
  }

  render(){
    let title = this.props.title ? this.props.title : 'Coming Back?';

    const {
      field: {
        username,
        password
      },
      errors
    } = this.props;
    console.log("SIGNIN", this.props);

    return (
      <fieldset>
        <h1>{title}</h1>

        <ul className="no-bullets">
          <li>
            <label>
              <PureInput
                type="text"
                field={username}
                placeholder="Username (Email)"
                validation_status={ validationStatus(errors, "username") }
                validation_message={ validationMessage(errors, "username") }
              />
            </label>
          </li>

          <li>

            <label>
              <PurePassword
                field={password}
                placeholder="Password"
                validation_status={ validationStatus(errors, "password") }
                validation_message={ validationMessage(errors, "password") }
                />
            </label>
          </li>

        </ul>
      </fieldset>
    );
  }
}

export default connect((state)=>{
  return{
    user: state.user
  };
})(CredentialFieldSet);
