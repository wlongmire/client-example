import { checkTokenExpiration } from '../utils/checkTokenExpiration'

import {
  FETCH_USERS,
  USER_ALERT_DISPLAY
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
        alert('You do not have required permissions to perform this action')
        return
      }

      apigClient.adminUsersGet({ broker: user.brokerId }, {}, {})
        .then((resp1) => {
          const apiResponse = resp1.data
          
          if (apiResponse.success) {
            dispatch({ type: FETCH_USERS, payload: apiResponse.data })
          } else {
            // todo - talk about error handling
            switch (apiResponse.errorCode) {
              case 'NoParamError':
                break
              case 'InternalError':
                break
            }
          }
        })
    })
  }
}

export function setAlert(params) {
  return (dispatch) => {
    dispatch({ type: USER_ALERT_DISPLAY, payload: params })
  }
}


export function updateUser(row, statusType) {
  return ((dispatch) => {
    apigClient.adminUsersIdPut({ id: row.id },
      [
        { fieldName: 'status', fieldValue: statusType },
      ]).then((response) => {
        console.log('RESPONSE 123123123', response)
        dispatch(getUsersByBrokerage(row))
      })
  })
}