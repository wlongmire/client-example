import React, {Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import FormBuilder from 'components/shared/FormBuilder'
import config from 'config';
import form from './form.js'

import ToggleDisplay from 'components/shared/ToggleDisplay'

import fetch from 'isomorphic-fetch';

import mx from 'app/utils/MixpanelInterface';
import { Button } from 'react-bootstrap'


class SignInForm extends Component {
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

        if (values.username === "") {
            this.setState({
                error:true,
                errorMessage:"Please Enter a Valid Username."
            })
        } else if (values.password === "") {
            this.setState({
                error:true,
                errorMessage:"Please Enter a Valid Password."
            })
        } else {
            fetch(baseURL + '/um/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(res => res.json())
            .then((res) => {
                switch(res.message) {
                    case("Your account has not been verified. Please contact your administrator."):
                        this.setState({
                            error:true,
                            errorMessage:"No registered account under that username."
                        })
                        return;

                    case("Password or username are incorrect"):
                        this.setState({
                            error:true,
                            errorMessage:"That Username / Password combination is incorrect"
                        })
                        return;
                }

                const {user, token} = res;

                localStorage.setItem('token', token);
                localStorage.setItem('viewer', JSON.stringify(user));

                this.setState({
                    error:false,
                    errorMessage:""
                })
                
                this.props.dispatch(push({
                    pathname: '/submissions',

                    state: {
                        type: 'USER_LOGGED_IN',
                        payload: res,
                        user: user
                    }
                }));
            })
            .catch((e) => {
                this.setState({
                    error:true,
                    errorMessage:"There appears to be an issue with our servers. Please contact us below for help."
                })
            });
            
        }
        
    }

    render() {
        const {
            handleSubmit
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
                        <ToggleDisplay 
                            show={this.state.error}
                            render={()=><div className="errorMessage">{ this.state.errorMessage }</div>}/>
                        <Button bsStyle="primary" type="submit">Sign In</Button>
                        {/*<Button bsStyle="primary" href="/signup">Register</Button>*/}
                    </div>
                )}
                handleSubmit={this.handleSubmit}
            />

            
        </div>)
    }
}

export default connect()(SignInForm)
