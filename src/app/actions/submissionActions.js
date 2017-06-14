import { push } from 'react-router-redux'
import config from 'config'
import trim from 'lodash/trim'
import { checkTokenExpiration } from '../utils/checkTokenExpiration'

import {
  FETCH_SUBMISSIONS,
  EDIT_SUBMISSION,
  CHANGE_SUBMISSION_STATUS,
  SUBMISSION_STATUS,
  CLEAR_SUBMISSION
} from 'src/app/constants/submission'
import {
  USER_LOGGED_IN,
} from 'src/app/constants/user'

export const clearSubmissionStatus = () => {
  return ((dispatch) => {
    dispatch({ type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.NONE })
    dispatch({ type: CLEAR_SUBMISSION })
  })
}

export function getSubmissions(user) {
  return ((dispatch) => {
    const body = {
      brokerId: user.broker
    }
    checkTokenExpiration(user).then((resp) => {
      if (resp.status === 'expired') {
        dispatch({ type: USER_LOGGED_IN, payload: resp.user })
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
        console.log('get submissions response error =', error)
        return Promise.reject({
          _error: error.message
        })
      })
    })
  })
}

export function saveSubmission(submission, user) {
  console.log('SUBMISSION xx22 get toe save SUbmissions', submission)

  return checkTokenExpiration(user).then(() => {
  // eslint-disable-next-line no-undef
    return apigClient.apiSavePost({}, submission, {})
      .then((resp) => {
        return (resp)
      })
      .catch((error) => {
        console.log('ERROR SUBMISSION xx22 ====', error)
        return Promise.reject({
          _error: error.message
        })
      })
  })
}

export function editSubmission(submission) {
  // *** need to check if token is expired before
  // AK_TO_DO
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

export function getClearance(params, user) {
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
  return checkTokenExpiration(user).then(() => {
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
  })
}

export function getRating(params, user) {
  console.log('get rating user xx55', user)
  const { submission } = params
  return checkTokenExpiration(user).then(() => {
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
  })
}

export function sendEmail(emailAddress, emailType, submissionId, user) {
  checkTokenExpiration(user).then(() => {
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
  })
}