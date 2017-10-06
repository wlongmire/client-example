import {
  FETCH_USERS
} from '../constants/admin'

export default function (state = { users: [] }, action) {
  switch (action.type) {
    case (FETCH_USERS):
      return { ...state, users: action.payload }
    default:
      return state
  }
}