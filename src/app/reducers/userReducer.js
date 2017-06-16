import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../constants/user'

import config from 'config'

export default function (state = {}, action) {
  switch (action.type) {
    case (USER_LOGGED_IN):
      console.log('=======USER_LOGGED_IN======', action)
      return { ...action.payload }
    case (USER_LOGGED_OUT):
      return null
    default:
      return state
  }
}