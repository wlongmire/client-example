import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import config from 'config'

import {
  FETCH_SUBMISSIONS,
  EDIT_SUBMISSION,
  CHANGE_SUBMISSION_STATUS,
  SUBMISSION_STATUS,
  CLEAR_SUBMISSION
} from 'src/app/constants/submission'

export const clearSubmissionStatus = () => {
  return ((dispatch) => {
    dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.NONE })
    dispatch({ type: CLEAR_SUBMISSION })
  })
}

export function getSubmissions(brokerId) {
  return (dispatch) => {
    fetch(`https://ezn98yxd1k.execute-api.us-east-1.amazonaws.com/dev/api/getSubmissions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res)
      // dispatch({ type: FETCH_SUBMISSIONS, payload: res })

      // // empty previous edited submission in the store
      // dispatch({ type: EDIT_SUBMISSION, payload: {} })
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })
  }
}


export function editSubmission(submission) {
  return fetch(`${config.apiserver.url}/api/getSubmission/${submission._id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((res) => {
    // add the entire submission in store in -> app.submission
    dispatch({ type: EDIT_SUBMISSION, payload: res.submission })

    // changes app.status to: EDIT
    dispatch({
      type: CHANGE_SUBMISSION_STATUS,
      status: SUBMISSION_STATUS.EDIT })

    // push the user to the form
    dispatch(push('/form'))
  })
}