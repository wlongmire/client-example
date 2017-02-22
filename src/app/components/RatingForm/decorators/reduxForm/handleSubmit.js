import fetch from 'isomorphic-fetch';
import {
	push
}
from 'react-router-redux';

import validate from './validate';
import scrollTo from 'scroll-to';
import _ from 'lodash';

import { CONFIRMATION } from '../../../../constants';

import getSubmissions from 'app/utils/getSubmissions';
import jaro from 'jaro-winkler';

import config from '../../../../../config';
import { onlyNums } from '../../../../utils/utilities';

//let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');
let baseURL = config.apiserver.url;

export function handleConfirmation(values) {
	return (dispatch) => {
		const errors = validate(values);

		const async_errors =
		  _.some(
		    Object.keys(errors),
		    (field)=>(!_.isEmpty(errors[field]))
		  );

		if (async_errors) {

		  dispatch({
		    type: 'SET_FORM_ERROR',
		    payload: {
		      ratingOI:errors
		    }
		  });

			scrollTo(0, 0, { duration: 500 });
		} else {

			//check for clearance
			const user = JSON.parse(localStorage.getItem('viewer'));
			const getAddress =
				(sub)=>(
					[	sub.namedInsuredAddress.city,
						sub.namedInsuredAddress.state,
						sub.namedInsuredAddress.street,
						sub.namedInsuredAddress.zip].join(' '));

			const matchString =
				(sub)=>([sub.primaryNamedInsured, getAddress(sub)].join(' '))

			getSubmissions(user._brokerId).then((resp)=>{
				const submissions = _.sortBy(
					Object.assign([],resp.submissions)
						.filter((s)=>s.type===values.type)
						.map((s)=>({ ...s, _matchIndex:jaro(matchString(s), matchString(values))}))
					,"_matchIndex")
					.reverse();

				if (submissions[0]._matchIndex > 0.9) {

					errors.primaryNamedCredentials.name = "This submission match one already processed."
					alert(`This submission matches an entry already submitted.\nPrimary Insured Name: ${submissions[0].primaryNamedInsured}\nPrimary Address: ${getAddress(submissions[0])}`)

					dispatch({
				    type: 'SET_FORM_ERROR',
				    payload: {
				      ratingOI:errors
				    }
				  });
					scrollTo(0, 0, { duration: 500 });
					
				} else {

					dispatch(push({
						pathname: '/confirmation',
						state: {
							type: 'CONFIRMATION',
							payload: values
						}
					}));

				}

			});

		}

	}
}

export function handleSubmit(values) {
	const body = (values.type === 'ocp')? formatRequestBodyOCP(values): formatRequestBody(values);
	return (dispatch) => {

		let token = localStorage.getItem('token');
		document.querySelector('.getQuote').textContent = 'Processing quote...';

		return fetch(baseURL + '/api/getRating', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'x-token': token
				},
				body
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

function formatRequestBodyOCP(values) {
	return JSON.stringify({
		...values,
		costs: onlyNums(values.costs),
	});
}

function formatRequestBody(values) {
	return JSON.stringify({
		...values,
		state: values.address.state,
		term: values.term,
		costs: onlyNums(values.costs),
		'generalContractor.glLimits': onlyNums(values.generalContractor.glLimits),
		contractorKnown: values.generalContractor.isKnown === 'yes',
		supervisingSubs: values.generalContractor.isSupervisingSubs === 'yes',
		demoRequired: values.demoDetails.willHave === 'yes',
		occupancy: values.occupancyDetails.willHave === 'yes',
		workStarted: values.workDetails.hasStarted === 'yes',
		towerCrane: values.towerCraneUse === 'yes',
		otherNamedInsuredBoolean: values.hasOtherNamedInsured === 'yes',
		additionalInsuredBoolean: values.hasAdditionalInsured === 'yes',
		excessLimits: values.excessDetails.limits !== null ? values.excessDetails.limits : 0,
		greaterThanTwoNamedBoolean: values.otherNamedInsured.greaterThanTwoNamed === 'yes',
		greaterThanTwoAdditionalBoolean: values.additionalInsured.greaterThanTwoAdditional === 'yes',
	});
}
