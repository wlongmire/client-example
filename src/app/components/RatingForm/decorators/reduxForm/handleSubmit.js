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

import mx from 'app/utils/MixpanelInterface';

let baseURL = config.apiserver.url;

export function handleConfirmation(values) {
	const editing = (localStorage.getItem('editing') === "true") || false;

	return (dispatch) => {
		const errors = validate(values);

		//check clearance
		getClearanceMatches(values).then((matches)=>{
			if (matches && !editing) {

				errors.primaryNamedCredentials.name = "This submission match one already processed."
				alert(`This submission matches an entry already submitted.\nPrimary Insured Name: ${matches.primaryNamedInsured}\nPrimary Address: ${getAddress(matches)}`)

				dispatch({type: 'SET_FORM_ERROR', payload: { ratingOI:errors } });
				scrollTo(0, 0, { duration: 500 });

			} else {

				const async_errors =
		  			_.some( Object.keys(errors), (field)=>(!_.isEmpty(errors[field])) );

				if (async_errors) {
		  			dispatch({ type: 'SET_FORM_ERROR', payload: { ratingOI:errors } });
					scrollTo(0, 0, { duration: 500 });
				} else {

					mx.customEvent(
						"submission",
						"review",
						{
							"Type":"oi"
						}
					);

					dispatch({ type: 	'SET_FORM_ERROR', payload: { ratingOI:{} } });
					dispatch({ type: 	'SET_CONFIRMATION_DIALOG_OI', value: true });
					dispatch({ type:	'SAVE_VALUES', values });
				}

			}

		});

	}
}

function getAddress(sub) {
	return [	sub.namedInsuredAddress.city,
		sub.namedInsuredAddress.state,
		sub.namedInsuredAddress.street,
		sub.namedInsuredAddress.zip].join(' ');
}

function getClearanceMatches(submission_values) {
	//with clearance

	const matchString =
		(sub)=>([sub.primaryNamedInsured, getAddress(sub)].join(' '))

	const user = JSON.parse(localStorage.getItem('viewer'));

	return new Promise((resolve, reject)=>{

		return getSubmissions(user._brokerId).then((resp)=>{

			const matches = resp.submissions.find((s)=>{
				return (s.type === submission_values.type && matchString(s) === matchString(submission_values))
			});

			resolve(matches);

		});

	});
}

export function handleSubmit(values) {
	const body = formatRequestBody(values);

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

				localStorage.setItem('editing', false);

				const submission = res.submission;
				

				const params = 
					(submission.instantQuote) ? {
						"Total Premium":submission.oiPremium.totalPremium,
						"Base Premium":submission.oiPremium.quotedPremium,
						"Additional Coverage":submission.oiPremium.additionalCoverage,
						"Terrorism Coverage":submission.oiPremium.terrorPremium,
						"Type": submission.type
					} : {
						"reason": submission.reason,
						"Type": submission.type
					}
				
				mx.customEvent(
					"submission",
					(submission.instantQuote) ? "quoted" : "knockout",
					params
				);

				return dispatch(push({
					pathname: '/quote',
					state: { submission: res.submission, email: values.contactInfo.email }
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
		'demoDetails.costs': onlyNums(values.demoDetails.costs),
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
