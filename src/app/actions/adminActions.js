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


export function updateUser(row, statusType, user) {
  return ((dispatch) => {
    checkTokenExpiration(user).then((resp) => {
      if (resp.status === 'expired') {
        dispatch({ type: USER_LOGGED_IN, payload: resp.user })
      }

      if (resp.status === 'expired') {
        dispatch({ type: USER_LOGGED_IN, payload: resp.user })
      }
      apigClient.adminUsersIdPut({ id: row.id }, // id:
        [
          { fieldName: 'status', fieldValue: statusType },
        ]).then((resp2, error2) => {
          if (resp2.data && resp2.data.success === true) {
            const message = () => {
              switch (statusType) {
                case 'active':
                  return (`You have successefully activated: ${row.username} !`)
                case 'disabled':
                  return (`You have successefully disabled: ${row.username} !`)
                default:
                  return ('You have successefully made an update!')
              }
            }
            dispatch(setAlert({ show: true, message: message(), bsStyle: 'success' }))
            dispatch(getUsersByBrokerage(user))
          } else if (resp2.data && resp2.data.success === false) {
            dispatch(setAlert({ show: true, message: `${resp2.data.message}. Please contact your administrator for further support`, bsStyle: 'danger' }))
          } else {
            dispatch(setAlert({ show: true, message: 'There was an error processing your request. Please contact your administrator.', bsStyle: 'danger' }))
          }
        })
    })
  })
}