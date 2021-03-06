import { 
  EDIT_SUBMISSION,
  SUBMISSION_STATUS,
  CHANGE_SUBMISSION_STATUS,
  CHANGE_SUBMISSION,
  CLEAR_SUBMISSION
} from './../constants/submission'

const initialState = {
  status: SUBMISSION_STATUS.NONE,
  submission: {},
  submissionFormParams: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_SUBMISSION:
      return Object.assign(state, {
        submission: Object.assign(state.submission, action.payload.submission),
        submissionFormParams: action.payload.submissionFormParams
      })
    case CHANGE_SUBMISSION_STATUS:
      return Object.assign(state, {
        status: action.status
      })
    case CLEAR_SUBMISSION:
      return Object.assign(state, {
        submission: {},
        submissionFormParams: {}
      })
    case EDIT_SUBMISSION:
      return Object.assign(state, {
        submission: action.payload
      })
    default:
      return state
  }
}
