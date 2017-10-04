import { checkTokenExpiration } from '../utils/checkTokenExpiration'

import {
  FETCH_USERS
} from './../constants/admin'

import {
  USER_LOGGED_IN,
} from './../constants/user'

export function getUsersByBrokerage(user) {
  return (dispatch) => {
    checkTokenExpiration(user).then((resp) => {
      if (resp.status === 'expired') {
        dispatch({ type: USER_LOGGED_IN, payload: resp.user })
      }
      if (!(user.role === 'admin')) {
        alert('You do not have required permissions to perform this action');
      }
      apigClient.adminUsersGet({broker: user.brokerId}, {}, {})
        .then(resp1 => {
          const apiResponse = resp1.body;
          if (apiResponse.success) {
            dispatch({type: FETCH_USERS, payload: apiResponse})
          } else {
            switch (apiResponse.errorCode) {
              //todo - talk about error handling
              case 'NoParamError':
                break;
              case 'InternalError':
                break;
            }
          }
        })
    });
  }
}