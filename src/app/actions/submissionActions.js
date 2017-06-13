import { push } from 'react-router-redux'
import config from 'config'
import trim from 'lodash/trim'

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
  console.log('BROKER in GET SUBMISSIONS', user)
  return ((dispatch) => {
    const body = {
      brokerId: user.broker
    }

   apigClient.apiGetSubmissionsPost({}, body)
    .then((resp) => {
      console.log('RESPONSE SUBMISSIONS', resp)

      if (resp.status === 200) {
        dispatch({ type: FETCH_SUBMISSIONS, payload: resp.data })
        dispatch({ type: EDIT_SUBMISSION, payload: {} })
      } else {
        alert('Error While Accessing Submissions DB.')
      }
    })
    .catch((error) => {
      console.log("RESPONSE ERROR", error)
      return Promise.reject({
        _error: error.message
      })
    })
  })
}

export function saveSubmission(submission) {
  console.log('SUBMISSION xx22 get toe save SUbmissions', submission)

  // eslint-disable-next-line no-undef
  return apigClient.apiSavePost({}, submission, {})
    .then((resp) => {
      console.log('RESPONSE save SUBMISSION xx22 =====', resp)
      return (resp)
    })
    .catch((error) => {
      console.log('ERROR SUBMISSION xx22 ====', error)
      return Promise.reject({
        _error: error.message
      })
    })
}

export function editSubmission(submission) {
  return ((dispatch) => {
    // eslint-disable-next-line no-undef
    apigClient.apiGetSubmissionIdGet({ id: submission._id })
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
  console.log('PARAMS 1223', params)
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

  // eslint-disable-next-line no-undef
  return apigClient.apiGetClearanceGet(apiparams, {}, {})
    .then((resp) => {
      return (resp.data)
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })
}

export function getRating(params) {
  const { submission } = params

  // eslint-disable-next-line no-undef
  return apigClient.apiGetRatingPost({}, submission, {})
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
  // eslint-disable-next-line no-undef
  return apigClient.apiSendEmailIdPost(
    { id: submissionId },
    { emailAddress, emailType },
    {})
    .then((resp) => {
      console.log('sucesss 123', resp)
      return (resp)
    })
    .catch((error) => {
      console.log('ERROR 123', error)
      return Promise.reject({
        _error: error.message
      })
    })
}