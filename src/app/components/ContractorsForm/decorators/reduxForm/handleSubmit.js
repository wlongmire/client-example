import fetch from 'isomorphic-fetch';
import {
	push
}
from 'react-router-redux';

import { CONFIRMATION } from '../../../../constants';

import config from '../../../../../config';
import { onlyNums } from '../../../../utils/utilities';

//let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');

let baseURL = config.apiserver.url;

export function handleConfirmation(values){
	return (dispatch) => {
     
		dispatch(push({
			pathname: '/confirmation',
			state: {
				type: 'CONFIRMATION',
				payload: values
			}
		}));

	}
}

export function handleSubmit(values) {

	return (dispatch) => {

		let token = localStorage.getItem('token');
		document.querySelector('.getQuote').textContent = 'Processing quote...';

		//const test = formatRequestBody(values);

		console.log(values);

		return fetch(baseURL + '/api/getRating', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'x-token': token
				},
				body: values
			})
			.then(res => res.json())
			.then((res) => {
				if (!res.success) return Promise.reject(res.message);
				const {
					premium, authToken
				} = res;

				if (authToken) {
					localStorage.setItem('token', authToken);
				}
				return dispatch(push({
					pathname: '/quote',
					state: {
						submission: res.submission,
						email: values.contactInfo.email
					}
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
		...values,
		state: values.address.state,
			term: values.term,
			costs: onlyNums(values.costs),
			contractorKnown: values.generalContractor.isKnown === 'yes',
			supervisingSubs: values.generalContractor.isSupervisingSubs === 'yes',
		});
}