import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../constants/user'

export default function (state = {}, action) {
  switch (action.type) {
    case (USER_LOGGED_IN):
      return { ...action.payload }
    case (USER_LOGGED_OUT):
      return null
    default:
      return state
  }
}