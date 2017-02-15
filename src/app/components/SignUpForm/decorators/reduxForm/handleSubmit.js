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

//let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');
let baseURL = config.apiserver.url;

const handleSubmit = (values, dispatch) => {
	const errors = validate(values);

	if (
		!_.isEmpty(errors.credentials) ||
		!_.isEmpty(errors.account)
	) {
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

				console.log(res.message);

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

					return dispatch(push({
						pathname: '/form',

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
