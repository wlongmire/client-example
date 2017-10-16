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

export function createNewUser(email, isAdmin, user, successMessage = 'Success: User has been successful created.') {
  return ((dispatch) => {
    checkTokenExpiration(user).then(() => {
      const body = {
        email,
        role: isAdmin == 'true' ? 'admin' : 'user',
        broker_id: user.brokerId
      }

      apigClient.adminUsersPost({}, body, {}).then((resp) => {
        if (resp.data && resp.data.success === false) {
          dispatch(
            setAlert({ show: true, message: `${resp.data.message}`, bsStyle: 'danger' })
          )
          
        } else {
          dispatch(
            setAlert({ show: true, message: successMessage, bsStyle: 'success' })
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

      apigClient.adminUsersIdDelete({ id }, { id }, {}).then((resp1) => {
        if (!resp1.data.success) {
          dispatch(
            setAlert({ show: true, message: `${resp1.data.message}`, bsStyle: 'danger' })
          )
        } else {
          dispatch(
            setAlert({ show: true, message: 'Success: User was successfully removed.', bsStyle: 'success' })
          )
        }
        
        dispatch(getUsersByBrokerage(user))
      })
    })
  }
}

export function resendPasswordUser(sendUser, user) {
  return (dispatch) => {
    checkTokenExpiration(user).then((resp) => {
      if (resp.status === 'expired') {
        dispatch({ type: USER_LOGGED_IN, payload: resp.user })
      }

      if (!(user.role === 'admin')) {
        alert('You do not have required permissions to perform this action')
        return
      }
      
      apigClient.adminUsersIdDelete({ id: sendUser.id }, { id: sendUser.id }, {}).then((resp1) => {
        if (resp1.success === false) {
          dispatch(
            setAlert({ show: true, message: `${resp1.data.message}`, bsStyle: 'danger' })
          )
        } else {
          dispatch(createNewUser(sendUser.email, sendUser.role === 'admin', user, 'Success: User password has been resent.'))
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