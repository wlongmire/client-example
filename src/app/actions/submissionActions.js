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

export function getSubmissions(user) {
  return ((dispatch) => {
    apigClient.apiGetSubmissionsGet()
    .then((resp) => {
      const data = resp.data

      if (data.success) {
        dispatch({ type: FETCH_SUBMISSIONS, payload: data.submissions })
        dispatch({ type: EDIT_SUBMISSION, payload: {} })
      } else {
        alert('Error While Accessing Submissions DB.')
      }
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })
  })
}

export function saveSubmission(submission) {
  return apigClient.apiSavePost({}, JSON.stringify(submission), {})
    .then((resp) => {
      return (resp)
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })
}

export function editSubmission(submission) {
  return ((dispatch) => {
    apigClient.apiGetSubmissionIdGet({id:submission._id})
    .then((resp) => {
      const data = resp.data
      if (data.success) {
        // add the entire submission in store in -> app.submission
        dispatch({ type: EDIT_SUBMISSION, payload: res.submission })

        // changes app.status to: EDIT
        dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.EDIT })

       // push the user to the form
        dispatch(push('/form'))
      } else {
        alert('Error While Accessing Submissions DB.')
      }
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })

    // return fetch(`${config.apiserver.url}/api/getSubmission/${submission._id}`, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res => res.json())
    // .then((res) => {
    //   // add the entire submission in store in -> app.submission
    //   dispatch({ type: EDIT_SUBMISSION, payload: res.submission })

    //   // changes app.status to: EDIT
    //   dispatch({
    //     type: CHANGE_SUBMISSION_STATUS,
    //     status: SUBMISSION_STATUS.EDIT })

    //   // push the user to the form
    //   dispatch(push('/form'))
    // })
  })
}

export function getClearance(params) {
  const apiparams = {
    name: trim(params.name),
    projectAddress: trim(params.addresses[0].projectAddress.replace('#', '')),
    projectState: trim(params.addresses[0].projectState),
    projectCity: trim(params.addresses[0].projectCity),
    projectZipcode: trim(params.addresses[0].projectZipcode),
    insuredAddress: trim(params.addresses[1].primaryInsuredAddress.replace('#', '')),
    insuredState: trim(params.addresses[1].primaryInsuredState),
    insuredCity: trim(params.addresses[1].primaryInsuredCity),
    insuredZipcode: trim(params.addresses[1].primaryInsuredZipcode)
  }

  return apigClient.apiGetClearanceGet(apiparams, {}, {})
    .then((resp) => {
      console.log(resp)
      return (resp)
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })
}

export function getRating(params) {
  const { submission } = params

  return apigClient.apiGetRatingPost({}, JSON.stringify(submission), {})
    .then((resp) => {
      return (resp)
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })
}

export function sendEmail(emailAddress, emailType, submissionId) {
  return apigClient.apiSendEmailIdPost(
    {},
    JSON.stringify({
      emailAddress,
      emailType
    }),
    {})
    .then((resp) => {
      return (resp)
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })
}