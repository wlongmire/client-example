import fetch from 'isomorphic-fetch';
import {
	push
}
from 'react-router-redux';

import { CONFIRMATION } from '../../../../constants';

import validate from './validate';
import scrollTo from 'scroll-to';
import _ from 'lodash';

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

			dispatch(push({
				pathname: '/confirmation',
				state: {
					type: 'CONFIRMATION',
					payload: values
				}
			}));

		}

	}
}
