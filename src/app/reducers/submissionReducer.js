import { 
  FETCH_SUBMISSIONS
} from './../constants/submission'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SUBMISSIONS:
      return { ...state, data: action.payload }
    default:
      return state
  }
}