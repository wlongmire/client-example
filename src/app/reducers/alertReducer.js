import {
  ALERT_DISPLAY
} from '../constants/alert'

export default function (state = { display: {} }, action) {
  switch (action.type) {
    case (ALERT_DISPLAY):
      return { ...state, display: action.payload }
    default:
      return state
  }
}