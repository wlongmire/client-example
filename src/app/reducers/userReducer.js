import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../constants/user'

const defaultValues = {
  congito: null,
  email: '',
  name: '',
  broker: {}
}

export default function (state = defaultValues, actions) {
  switch (actions.type) {
    case (USER_LOGGED_IN):
      return Object.assign({}, state, actions.payload)
    case (USER_LOGGED_OUT):
      return Object.assign({}, state, defaultValues)
    default:
      return state
  }
  return state
}