import React, {Component} from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

import FormBuilder from 'components/shared/FormBuilder'
import form from './form.js'
import options from './options.js'

import { Button } from 'react-bootstrap'

import ToggleDisplay from 'components/shared/ToggleDisplay'

import mx from 'app/utils/MixpanelInterface';

import fetch from 'isomorphic-fetch';

import config from 'config';

import {
	SIGNUP_STATUS,
	USER_LOGGED_IN
} from 'app/constants/user';

class SignUpForm extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
          error:false,
          errorMessage: ""
      }

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values, controlGroups, requiredFields) {
        const baseURL = config.apiserver.url;
        const regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (values.username === "") {
            this.setState({ error:true, errorMessage:"Please Enter a Valid Username." })

        } else if (values.password === "") {
            this.setState({ error:true, errorMessage:"Please Enter a Valid Password." })

        } else if (values.password.length < 6 || !regularExpression.test(values.password)) {
            this.setState({ error:true, errorMessage:"Password must have at least 6 characters, have an upper case and special character." })

        } else if (values.retypePassword === "") {
            this.setState({ error:true, errorMessage:"Please Enter a Confirm Your Password." })

        } else if (values.password !== values.retypePassword) {
            this.setState({ error:true, errorMessage:"Passwords must match." })

        } else if (values.firstname === "") {
            this.setState({ error:true, errorMessage:"Please Enter a First Name." })

        } else if (values.lastname === "") {
            this.setState({ error:true, errorMessage:"Please Enter a Last Name." })

        } else if (values.broker === "") {
            this.setState({ error:true, errorMessage:"Please Select A Broker." })

        } else {
            fetch(baseURL + '/um/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: values.username,
		            password: values.password,
		            retypePassword: values.retypePassword,
		            firstName: values.firstName,
		            lastName: values.lastName,
		            _brokerId: values.broker
                })
            })
            .then(res => res.json())
            .then((res) => {
                switch(res.message) {
                    case('Sorry, that user name is not available. Please try something else.'):
                        this.setState({
                            error:true,
                            errorMessage:"Sorry, that username is already taken. Please try another."
                        })
                }

                if (res.token) {
                    const { user, token } = res;

                    localStorage.setItem('token', token);

                    mx.registrationEvent( user.email );
                    mx.loginEvent( user.email, user.email );

                    this.setState({ error:false, errorMessage:"" })

                    this.props.dispatch(push({
                        pathname: '/submissions',
                        state: { type: 'USER_LOGGED_IN', payload: res, user: user }
                    }));
                }

            })
            .catch((error) => {
                this.setState({
                    error:true,
                    errorMessage:"There appears to be an issue with our servers. Please contact us below for help."
                })
            });
        }
    }

    render() {
      return (
        <div className="SignUpForm__container">

          <h1>Create account</h1>
          <h3>Please enter your account details below</h3>
              
          <FormBuilder
              data={form}
              options={options}
              submissionButtons={()=>(
                  <div>
                      <ToggleDisplay 
                          show={this.state.error}
                          render={()=><div className="errorMessage">{ this.state.errorMessage }</div>}/>
                      <Button type="submit">Register</Button>
                      <Button href="/">Back</Button>
                  </div>
              )}
              handleSubmit={this.handleSubmit}
          />
              
        </div>
        
      )
    }
}

export default connect()(SignUpForm)

