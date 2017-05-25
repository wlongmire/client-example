import fetch from 'isomorphic-fetch'
import config from 'config'
import { push } from 'react-router-redux'

import { 
  FETCH_SUBMISSIONS,
  USER_LOGGED_OUT,
  EDIT_SUBMISSION
} from 'src/app/constants/user'

import constants from 'app/constants/app'

const baseURL = config.apiserver.url

export const clearSubmissionStatus = () => {
  return ((dispatch) => {
    dispatch({ type: constants.CHANGE_SUBMISSION_STATUS, status: constants.SUBMISSION_STATUS.NONE })
    dispatch({ type: constants.CLEAR_SUBMISSION })
  })
}

export function getSubmissions(brokerID) {
  return (dispatch) => {
    fetch(`${baseURL}/api/getSubmissions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
  return (dispatch) => {
    fetch(`${baseURL}/api/getSubmission/${submission._id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
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
      } else {
        // add the entire submission in store in -> app.submission
        dispatch({ type: EDIT_SUBMISSION, payload: res.submission })

        // changes app.status to: EDIT
        dispatch({
          type: constants.CHANGE_SUBMISSION_STATUS,
          status: constants.SUBMISSION_STATUS.EDIT })

        // push the user to the form
        dispatch(push('/form'))
      }
    })
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: USER_LOGGED_OUT })
    dispatch(push('/'))
  }
}
