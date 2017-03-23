import fetch from 'isomorphic-fetch';
import {
	push
}
from 'react-router-redux';

import config from '../../../../../config';

import {
	SIGNUP_STATUS,
	USER_LOGGED_IN
} from '../../../../constants';

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
			dispatch({
				type: SIGNUP_STATUS,
				payload: res.message
			})

			switch(res.message) {
				case("Sorry, that user name is not available. Please try something else."):
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
					email
				);

				mx.loginEvent(
					email,
					email
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
