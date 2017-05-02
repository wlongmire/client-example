import fetch from 'isomorphic-fetch';
import {
	push
}
from 'react-router-redux';

import config from 'config';

import {
	SIGNUP_STATUS,
	USER_LOGGED_IN
} from 'app/constants/user';

import validate from './validate';
import _ from 'lodash';

import base_form_structure from 'content/formStructure';

import mx from 'app/utils/MixpanelInterface';

let baseURL = config.apiserver.url;

const handleSubmit = (values, dispatch) => {

	const errors = validate(values);

	if (_.every(Object.keys(errors), (field)=>!_.isEmpty(errors[field]))) {

		return dispatch({
			type: 'SET_FORM_ERROR',
			payload: {
				signup:errors
			}
		});
	}
	const regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
	
	if (values.credentials.password.length < 6 || !regularExpression.test(values.credentials.password)) {
		return dispatch({
			type: 'SET_FORM_ERROR',
			payload: {
				signup: {
					credentials: {
						password: "Password must have at least 6 characters, have an upper case and special character"
					}
				}
			}
		});
	}

	if (values.credentials.password != values.credentials.retypePassword ) {
		return dispatch({
			type: 'SET_FORM_ERROR',
			payload: {
				signup: {
					credentials: {
						retypePassword: "Passwords must match!"
					}
				}
			}
		});
	}

	return () => {
		fetch(baseURL + '/um/register', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: formatRequestBody(values)
		})
		.then(res => res.json())
		.then((res) => {

			switch(res.message) {
				case('Sorry, that user name is not available. Please try something else.'):
					return dispatch({
						type: 'SET_FORM_ERROR',
						payload: {
							signup:{
								credentials:{
									username:"Username already in use."
								}
							}
						}
					});
			}

			if (res.token) {
				const {
					user, token
				} = res;

				localStorage.setItem('token', token);

				dispatch({
					type: 'SET_FORM_ERROR',
					payload:{
						base_form_structure
					}
				});

				mx.registrationEvent(
					user.email
				);

				mx.loginEvent(
					user.email,
					user.email
				);

				return dispatch(push({
					pathname: '/submissions',

					state: {
						type: 'USER_LOGGED_IN',
						payload: res,
						user: user
					}

				}));
			}

		})
		.catch((error) => {
			return Promise.reject({
				_error: error.message
			});
		});
	};
}

function formatRequestBody(values) {
	return JSON.stringify({
		username: values.credentials.username,
		password: values.credentials.password,
		retypePassword: values.credentials.retypePassword,
		firstName: values.account.firstName,
		lastName: values.account.lastName,
		_brokerId: values.account.broker
	});
}

export default handleSubmit;
