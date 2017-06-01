import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SET_API_GATEWAY_CLIENT
} from '../constants/user'

import config from 'config'

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