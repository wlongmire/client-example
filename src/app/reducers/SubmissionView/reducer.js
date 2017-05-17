import { 
  FETCH_SUBMISSIONS, 
  EDIT_SUBMISSION 
} from 'src/app/constants/user';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SUBMISSIONS:
      return { ...state, data: action.payload }
    default:
      return state
    // case EDIT_SUBMISSION:
    //   return Object.assign(state, {
    //     submission: action.payload
    //   })
  }
}
