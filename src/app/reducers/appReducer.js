import { 
  EDIT_SUBMISSION,
  SUBMISSION_STATUS,
  CHANGE_SUBMISSION_STATUS,
  CHANGE_SUBMISSION,
  CLEAR_SUBMISSION
} from 'app/constants/submission'

export default function (state = {
  status: SUBMISSION_STATUS.NONE,
  submission: {},
  submissionFormParams: {}
}, action) {
  switch (action.type) {
    case CHANGE_SUBMISSION:
      const submission = Object.assign(state.submission, action.submission)
      return Object.assign(state, {
        submission,
        submissionFormParams: Object.assign(state.submissionFormParams, action.submissionFormParams)
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
