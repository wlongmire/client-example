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
