import { 
  FETCH_SUBMISSIONS, 
  EDIT_SUBMISSION 
} from 'app/constants/user';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_SUBMISSIONS:
      return {...state, data: action.payload}
    case EDIT_SUBMISSION:
      return {...state, selectedSubmission: action.payload}
  }

  return state
}