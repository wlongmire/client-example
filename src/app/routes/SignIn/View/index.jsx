import React, {Component} from 'react';
import { connect } from 'react-redux';

import FormBuilder from 'components/shared/FormBuilder'
import form from './form.js'

import CredentialsFieldSet from './CredentialsFieldSet'
import { Button } from 'react-bootstrap'

import decorator from './decorators'

class SignInForm extends Component {
    constructor(props) {
      super(props);
      
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values, controlGroups, requiredFields) {
        console.log(values)
        
    //   if(requiredFields.length > 0){
    //     this.setState({
    //       ...this.state,
    //       requiredFields,
    //       validationModal: true
    //     })
    //   } else {
    //     this.props.handleSubmit(values);
    //   }
    }

    render() {
        const {
            fields: {
                credentials
            },
            handleSubmit,
            errors
        } = this.props;

        return (
        <div className="SignInForm__container">

            <h1>Welcome</h1>
            <h3>Please Sign In</h3>

            <FormBuilder
                data={form}
                submitTitle="Sign In"
                submissionButtons={()=>(
                    <div>
                        <Button bsStyle="primary" type="submit">Sign In</Button>
                        <Button bsStyle="primary" href="/signup">Register</Button>
                    </div>
                )}
                handleSubmit={this.handleSubmit}
            />

        </div>)
    }
}

export default decorator(
  connect((state) => {

    return ({
      errors: state.error.signin || {}
    });

  })(SignInForm)
);
