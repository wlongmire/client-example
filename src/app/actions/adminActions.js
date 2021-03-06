import { checkTokenExpiration } from '../utils/checkTokenExpiration'
import { FETCH_USERS, USER_ALERT_DISPLAY} from './../constants/admin'
import { USER_LOGGED_IN, USER_INVITE, USER_INVITE_RESEND, USER_INVITE_CANCEL } from './../constants/user'

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

export function createNewUser(
  email, 
  isAdmin, 
  user, 
  eventSource = null, 
  successMessage = `Success! An invite as been emailed to ${email}`) {
  
    return ((dispatch) => {
    const role = isAdmin == 'true' ? 'admin' : 'user'
    checkTokenExpiration(user).then(() => {
      const body = {
        email,
        role,
        broker_id: user.brokerId,
        invite_user_id: user.id
      }
      
      apigClient.adminUsersPost({}, body, {}).then((resp) => {
        if (resp.data && resp.data.success === false) {
          dispatch(
            setAlert({ show: true, message: `${resp.data.message}`, bsStyle: 'warning' })
          )
        } else {
          dispatch(
            setAlert({ show: true, message: successMessage, bsStyle: 'success' })
          )
          dispatch(invite(email, role, 'unknown', eventSource))
          dispatch(getUsersByBrokerage(user))
        }
      })
    })
  })

}

export function deleteUser(userToDelete, user) {
  return (dispatch) => {
    checkTokenExpiration(user).then((resp) => {
      if (resp.status === 'expired') {
        dispatch({ type: USER_LOGGED_IN, payload: resp.user })
      }

      if (!(user.role === 'admin')) {
        alert('You do not have required permissions to perform this action')
        return
      }

      const { id } = userToDelete

      apigClient.adminUsersIdDelete({ id }, { id }, {}).then((resp1) => {
        if (!resp1.data.success) {
          dispatch(
            setAlert({ show: true, message: `${resp1.data.message}`, bsStyle: 'danger' })
          )
        } else {
          dispatch(inviteCancel(userToDelete.email))
          dispatch(
            setAlert({ show: true, message: 'Success: User was successfully removed.', bsStyle: 'success' })
          )
        }

        dispatch(getUsersByBrokerage(user))
      })
    })
  }
}

export function resendPasswordUser(userToResendTo, user, eventSource = null) {
  return (dispatch) => {
    checkTokenExpiration(user).then((resp) => {
      if (resp.status === 'expired') {
        dispatch({ type: USER_LOGGED_IN, payload: resp.user })
      }

      if (!(user.role === 'admin')) {
        alert('You do not have required permissions to perform this action')
        return
      }

      apigClient.adminUsersIdDelete({ id: userToResendTo.id }, { id: userToResendTo.id }, {}).then((resp1) => {
        if (resp1.success === false) {
          dispatch(
            setAlert({ show: true, message: `${resp1.data.message}`, bsStyle: 'danger' })
          )
        } else {
          dispatch(inviteResend(userToResendTo.email))
          dispatch(createNewUser(userToResendTo.email, userToResendTo.role === 'admin', user, eventSource, 'Success: User password has been resent.'))
        }
      })

    })
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
          if (resp2.data && resp2.data.success === true && statusType === 'disabled') {
            dispatch(setAlert({ show: true, message: `Account disabled for: ${row.username}. You will still be able to access their submissions.`, bsStyle: 'warning' }))
            dispatch(getUsersByBrokerage(user))
          } else if (resp2.data && resp2.data.success === true && statusType !== 'disabled') {
            const message = () => {
              switch (statusType) {
                case 'active':
                  return (`Account reactivated for: ${row.username}. They can log in with their existing credentials.`)
                case 'disabled':
                  return (`Account disabled for: ${row.username}. You will still be able to access their submissions.`)
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

export function invite(email, role, referrerUserType = null, eventSource = null) {
  return {
    type: USER_INVITE,
    value: {
      email,
      role,
      referrerUserType,
      eventSource
    }
  }
}

export function inviteResend(email) {
  return {
    type: USER_INVITE_RESEND,
    value: email
  }
}

export function inviteCancel(email, role = null, referrerUserType = null) {
  return {
    type: USER_INVITE_CANCEL,
    value: {
      email,
      role,
      referrerUserType
    }
  }
}

export function setAlert(params) {
  return (dispatch) => {
    dispatch({ type: USER_ALERT_DISPLAY, payload: params })
  }
}