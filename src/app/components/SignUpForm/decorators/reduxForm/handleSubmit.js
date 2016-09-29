import fetch from 'isomorphic-fetch';
import {
	push
}
from 'react-router-redux';
import config from '../../../../../config';
import {
	SIGNUP_ERROR
}
from '../../../../constants';

let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');



export default function handleSubmit(values, dispatch) {
	return () => {
		return fetch(baseURL + '/um/register', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: formatRequestBody(values)
			})
			.then(res => res.json())
			.then((res) => {
				if (!res.success) {
					// basically handling any signup rejection from server
					return dispatch({
						type: SIGNUP_ERROR,
						payload: res.message
					})

					//return Promise.reject(res.message);
				}
				return dispatch(push({
					pathname: '/form'
				}));
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