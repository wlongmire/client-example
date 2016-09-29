import {
	SIGNUP_ERROR
}
from '../constants';

export default function (state = {}, action) {
	switch (action.type) {
	case SIGNUP_ERROR:
		return {...state, error: action.payload
		};
	default:
	}

	return state;
}