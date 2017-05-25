import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../constants/user'

export default function (state = {}, actions) {
  switch (actions.type) {
    case (USER_LOGGED_IN):
      return Object.assign({}, state, actions.payload)
    case (USER_LOGGED_OUT):
      return null
    default:
      return state
  }
}