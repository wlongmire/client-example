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

export function createNewUser(email, isAdmin, user) {
  return ((dispatch) => {
    checkTokenExpiration(user).then(() => {
      const body = {
        email,
        role: isAdmin == 'true' ? 'admin' : 'broker',
        broker_id: user.brokerId
      }

      apigClient.adminUsersPost({}, body, {}).then((resp) => {
        if (resp.data && resp.data.success === false) {
          console.log(resp.data)
          
          dispatch(
            setAlert({ show: true, message: `${resp.data.message}`, bsStyle: 'danger' })
          )
          
        } else {
          dispatch(
            setAlert({ show: true, message: 'Success: User has been successful created.', bsStyle: 'success' })
          )
          dispatch(getUsersByBrokerage(user))
        }
      })
      
    })
  })
}

export function deleteUser(id, user) {
  return (dispatch) => {
    checkTokenExpiration(user).then((resp) => {
      if (resp.status === 'expired') {
        dispatch({ type: USER_LOGGED_IN, payload: resp.user })
      }

      if (!(user.role === 'admin')) {
        alert('You do not have required permissions to perform this action')
        return
      }

      apigClient.adminUsersIdDelete({id}, {id}, {}).then((resp1) => {
        if (resp.data.success === false) {
          
          dispatch(
            setAlert({ show: true, message: `${resp.data.message}`, bsStyle: 'danger' })
          )
        } else {
          dispatch(
            setAlert({ show: true, message: 'Pending user successfully removed', bsStyle: 'success' })
          )
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