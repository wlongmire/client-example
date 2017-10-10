import {
  FETCH_USERS,
  USER_ALERT_DISPLAY
} from '../constants/admin'

export default function (state = { users: [] }, action) {
  switch (action.type) {
    case (FETCH_USERS):
      return { ...state, users: action.payload }
    case (USER_ALERT_DISPLAY):
      return Object.assign(state, {
        alertDisplay: action.payload
      })
    default:
      return state
  }
}