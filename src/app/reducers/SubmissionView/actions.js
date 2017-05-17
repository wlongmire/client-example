import fetch from 'isomorphic-fetch'
import config from 'config'
import { push } from 'react-router-redux'

import { 
  FETCH_SUBMISSIONS, 
  USER_LOGGED_OUT, 
  EDIT_SUBMISSION 
} from 'src/app/constants/user'

import constants from 'app/constants/app'

let baseURL = config.apiserver.url

export const clearSubmissionStatus = () => {
  const { CHANGE_SUBMISSION_STATUS, CLEAR_SUBMISSION, SUBMISSION_STATUS } = constants
  return ((dispatch) => {
    dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.NONE })
    dispatch({ type: CLEAR_SUBMISSION});
  })
}

export function getSubmissions(brokerId) {
  return (dispatch) => {
    fetch(baseURL + '/api/getSubmissions', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then((res) => {
      if (res.type && res.type === 'TokenExpired') {
        dispatch({
          type: USER_LOGGED_OUT,
          payload: {},
          user: {}
        })

        dispatch(push('/'))
      }

      dispatch({ type: FETCH_SUBMISSIONS, payload: res })

      // empty previous edited submission in the store
      dispatch({ type: EDIT_SUBMISSION, payload: {} })
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })
  }
}


export function editSubmission(submission) {
  console.log('hitting EDIT SUBMISSION', submission)
  const { CHANGE_SUBMISSION_STATUS, SUBMISSION_STATUS } = constants

  return (dispatch) => {
    fetch(`${baseURL}/api/getSubmission/${submission._id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then((res) => {
      console.log('RESPONSE in CLIENT', res)
      console.log('RESPONSE in CLIENT BODY', res.body)
      if (res.type && res.type === 'TokenExpired') {
        dispatch({
          type: USER_LOGGED_OUT,
          payload: {},
          user: {}
        })
        dispatch(push('/'))
      } else {
        dispatch({ type: EDIT_SUBMISSION, payload: res.submission })
      }
    })
    // adds the submission info to submissions.selectedSubmission
    // once we hit the api, we can dispatch this with the all of the submission data
    // dispatch({ type: EDIT_SUBMISSION, payload: submission })

    // changes app.status to: EDIT
    dispatch({
      type: CHANGE_SUBMISSION_STATUS,
      status: SUBMISSION_STATUS.EDIT })

    // indicates if submission is oi or ocp in submission.type ...
    // however, not sure why status is here. it's already in app.state
    // dispatch({
    //   type: constants.CHANGE_SUBMISSION,
    //   submission: { type: submission.type, status: constants.SUBMISSION_STATUS.EDIT } })

    // TO_DO_AK: PUSH the user to a specific Route
    // dispatch(push('/form'))
  }
}

export function resetForm() {
  return (dispatch) => {
    dispatch({ type: EDIT_SUBMISSION, payload: {} })
    dispatch(push('/oiform'))
  }
}

export function resetContractorsForm() {
  return (dispatch) => {
    dispatch({
      type: EDIT_SUBMISSION,
      payload: {}
    })

    dispatch(push('/contractorsform'))
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('viewer')
  localStorage.removeItem('editing')
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_OUT })
    dispatch(push('/'))
  }
}
