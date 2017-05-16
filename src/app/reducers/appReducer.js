import constants from 'src/app/constants/app';

const initialState = {
  status:constants.SUBMISSION_STATUS.NONE,
  submission:{},
  submissionFormParams:{}
};

export default function (state = initialState, action) {
  const {
    CHANGE_SUBMISSION_STATUS,
    CHANGE_SUBMISSION,
    CHANGE_SUBMISSION_PARAMS,
    CLEAR_SUBMISSION
  } = constants;

  switch (action.type) {
    case CHANGE_SUBMISSION_STATUS:
      return Object.assign(state,{
        status: action.status
      });
    

    case CHANGE_SUBMISSION:
      const submission = Object.assign(state.submission, action.submission)
      
      return Object.assign(state,{
        submission,
        submissionFormParams:Object.assign(state.submissionFormParams,action.submissionFormParams)
      })
    // case EDIT_SUBMISSION:
    //   return Object.assign(state, {
    //     submission: action.payload
    //   })
      
    case CLEAR_SUBMISSION:
      return Object.assign(state,{
        submission:{},
        submissionFormParams:{}
      });
  }

  return state;
}
