import fetch from 'isomorphic-fetch';
import {
	push
}
from 'react-router-redux';

import { CONFIRMATION } from '../../../../constants';

import validate from './validate';
import scrollTo from 'scroll-to';
import _ from 'lodash';

import getSubmissions from 'app/utils/getSubmissions';
import jaro from 'jaro-winkler';

import config from '../../../../../config';
import { onlyNums } from '../../../../utils/utilities';

//let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');

let baseURL = config.apiserver.url;

export function handleConfirmation(values){
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
		      ratingOCP:errors
		    }
		  });

			scrollTo(0, 0, { duration: 500 });
		} else {

			//check for clearance
			const user = JSON.parse(localStorage.getItem('viewer'));

			const matchString =
				(sub)=>(sub.primaryNamedInsured)

			getSubmissions(user._brokerId).then((resp)=>{
				const submissions = _.sortBy(
					Object.assign([],resp.submissions)
						.filter((s)=>s.type===values.type)
						.map((s)=>({ ...s, _matchIndex:jaro(matchString(s), matchString(values))}))
					,"_matchIndex")
					.reverse();

				if (submissions[0]._matchIndex > 0.9) {

					errors.primaryNamedCredentials.name = "This submission match one already processed."
					alert(`This submission matches an entry already submitted.\nPrimary Insured Name: ${submissions[0].primaryNamedInsured}}`)

					dispatch({
				    type: 'SET_FORM_ERROR',
				    payload: {
				      ratingOCP:errors
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
