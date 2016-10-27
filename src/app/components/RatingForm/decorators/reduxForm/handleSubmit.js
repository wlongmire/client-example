import fetch from 'isomorphic-fetch';
import {
	push
}
from 'react-router-redux';

import config from '../../../../../config';
import { onlyNums } from '../../../../utils/utilities';

//let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');

let baseURL = config.apiserver.url;

export default function handleSubmit(values, dispatch) {
	return () => {

		let token = localStorage.getItem('token');
		document.querySelector('.getQuote').textContent = 'Processing quote...';

		return fetch(baseURL + '/api/getRating', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'x-token': token
				},
				body: formatRequestBody(values)
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
			demoRequired: values.demoDetails.willHave === 'yes',
			occupancy: values.occupancyDetails.willHave === 'yes',
			workStarted: values.workDetails.hasStarted === 'yes',
			towerCrane: values.towerCraneUse === 'yes',
			otherNamedInsuredBoolean: values.hasOtherNamedInsured === 'yes',
			excessLimits: values.excessDetails.limits !== null ? values.excessDetails.limits : 0,
			greaterThanTwoNamedBoolean: values.otherNamedInsured.greaterThanTwoNamed === 'yes',
			greaterThanTwoAdditionalBoolean: values.additionalInsured.greaterThanTwoAdditional === 'yes'
	});
}