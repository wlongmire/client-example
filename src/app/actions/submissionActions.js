import { push } from 'react-router-redux'
import trim from 'lodash/trim'
import { checkTokenExpiration } from '../utils/checkTokenExpiration'
import { transformSubmissionData } from '../utils/transformSubmissionData'
import { logout } from './userActions'

import {
  FETCH_SUBMISSIONS,
  CHANGE_SUBMISSION,
  CHANGE_SUBMISSION_STATUS,
  SUBMISSION_STATUS,
  CLEAR_SUBMISSION
} from './../constants/submission'

import {
  USER_LOGGED_IN,
} from './../constants/user'

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

      // eslint-disable-next-line no-undef
      apigClient.apiGetSubmissionsPost({}, body)
      .then((resp2) => {
        if (resp2.status === 200) {
          transformSubmissionData(resp2.data.submission).then((resp3) => {
            dispatch({ type: FETCH_SUBMISSIONS, payload: resp3 })
          })
        } else {
          alert('Error While Accessing Submissions DB.')
        }
      })
      .catch((error) => {
        // if there is a problem accessing the api with authorization errors
        if (error.status === 0 || error.status === 403) {
          dispatch(logout())
        }
      })
    })
  })
}

export function saveSubmission(submission, user) {
  return checkTokenExpiration(user).then(() => {
    const paramsId = submission._id ? { id: submission._id } : {}

    if (submission._id) {
      return apigClient.apiSaveIdPost(paramsId, submission, {})
      .then((resp) => {
        return ({
          ...resp,
          updated: true
        })
      })
      .catch((error) => {
        if (error.status === 0 || error.status === 403) {
          return Promise.resolve({ status: 'authError' })
        }
        return Promise.reject({
          _error: error.message
        })
      })
    }

    // eslint-disable-next-line no-undef
    return apigClient.apiSavePost({}, submission, {})
      .then((resp) => {
        return (resp)
      })
      .catch((error) => {
        if (error.status === 0 || error.status === 403) {
          console.log('THERE IS AN ERROR in THE SAVE SUBMISSION RESPONSE', error)
          return Promise.resolve({ status: 'authError' })
        }
        return Promise.reject({
          _error: error.message
        })
      })
  })
}

export function editSubmission(submission, user) {
  return ((dispatch) => {
    return checkTokenExpiration(user).then(() => {
      // eslint-disable-next-line no-undef
    return apigClient.apiGetSubmissionIdGet({ id: submission._id })
      .then((resp) => {
        const data = resp.data
        if (data.success) {
          // add the entire submission in store in -> app.submission
          // dispatch({ type: EDIT_SUBMISSION, payload: data.submission })
          const submissionFormParams = {
            primaryInsuredName: { disabled: true },

            primaryInsuredAddress: { disabled: true },
            primaryInsuredCity: { disabled: true },
            primaryInsuredState: { disabled: true },
            primaryInsuredZipcode: { disabled: true },

            projectAddress: { disabled: true },
            projectCity: { disabled: true },
            projectState: { disabled: true },
            projectZipcode: { disabled: true },
          }
          dispatch({
            type: CHANGE_SUBMISSION,
            payload: {
              submission: data.submission,
              submissionFormParams
            }
          })

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
    })
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

  // console.log("REAL USER====>", user)
  // console.log("USER====> TYPE OF", typeof user.expiration)
  // const testUser = {
  //   broker: "test-7fd-b3ff-4fd3-9fc2-e752b9f5b002",
  //   email: "andkulak@gmail.com",
  //   expiration: new Date(2016),
  //   subId:"b4a94152-ef9c-40e6-b3b7-8b38fba6ab96",
  //   username: "andkulak@gmail.com"
  // }

  // user
  return checkTokenExpiration(testUser).then((resp) => {
    // console.log("RESPONSE DATA ====> CLEARNCE", resp)
    // eslint-disable-next-line no-undef
    return apigClient.apiGetClearanceGet(apiparams, {}, {})
      .then((resp) => {
        return (resp.data)
      })
      .catch((error) => {
        console.log('THERE IS AN ERROR in THE CLEARNCE RESPONSE', error)
        if (error.status === 0 || error.status === 403) {
          return Promise.resolve({ status: 'authError' })
        }
        return Promise.reject({ error })
      })
  })
}

export function getRating(params, user) {
  const { submission } = params
  return checkTokenExpiration(user).then(() => {
    // eslint-disable-next-line no-undef
    return apigClient.apiGetRatingPost({}, submission, {})
      .then((resp) => {
        return (resp)
      })
      .catch((error) => {
        if (error.status === 0 || error.status === 403) {
          return Promise.resolve({ status: 'authError' })
        }
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
        return (resp)
      })
      .catch((error) => {
        return Promise.reject({
          _error: error.message
        })
      })
  })
}

export function sendClearanceEmail(emailAddress, emailType, user, userInput, clearanceMatches) {
  checkTokenExpiration(user).then(() => {
    // eslint-disable-next-line no-undef
    return apigClient.apiSendEmailIdPost(
      { id: '12312' },
      {
        emailAddress,
        emailType,
        input: userInput,
        matches: clearanceMatches
      },
      {})
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