import { push } from 'react-router-redux'
import config from 'config'
import trim from 'lodash/trim'
import { checkTokenExpiration } from '../utils/checkTokenExpiration'
import { transformSubmissionData } from '../utils/transformSubmissionData'
import { logout } from './userActions'
import { isDefined } from '../utils/utilities'

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
      brokerId: user.brokerId
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
    const paramsId = submission.id ? { id: submission.id } : {}

    if (submission.id) {
      return apigClient.apiSaveIdPost(paramsId, submission, {})
      .then((resp) => {
        return ({
          ...resp,
          updated: true
        })
      })
      .catch((error) => {
        console.log(error)
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

    return apigClient.apiGetSubmissionIdGet({ id: submission.id })
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

          //Underwriter Access: 
          //Changes route for underwriter
          const route = (user.brokerId === config.underwriterBrokerId) ? '/formunderwriter' : '/form'
          dispatch(push(route))
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
    insuredZipcode: trim(params.addresses[1].primaryInsuredZipcode),
    userProductName: params.type.toUpperCase()
  }

  return checkTokenExpiration(user).then(() => {
    return apigClient.apiGetClearanceGet(apiparams, {}, {})
      .then((resp) => {
        if (!resp.data.success) {
          throw ({ message: 'Internal Error', errorCode: 'InternalError' })
        }
        return (resp.data)
      })
      .catch((error) => {
        if (error.status === 0 || error.status === 403) {
          return Promise.resolve({ success: false, status: 'authError' })
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

export function getClearanceInfo(id){
  const gateway = apigClientFactory.newClient()
  return gateway.apiGetClearanceInfoIdGet({id:id}, {},{})
    .then(resp => {
      console.log(`response`, resp)
      if (resp.data !== null && isDefined(resp.data.sgsResult)){
      return Promise.resolve(resp.data.sgsResult)
      }
      else return Promise.resolve(null)
    })
}

export function setClearance(id, status){
  const gateway = apigClientFactory.newClient()
  return gateway.apiSetClearanceIdPost({id: id}, [{fieldName: 'clearanceStatus', fieldValue: status}])
    .then(resp => {
      return Promise.resolve(resp)
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
        console.log(`email send ${emailAddress}`)
        return (resp)
      })
      .catch((error) => {
        return Promise.reject({
          _error: error.message
        })
      })
  })
}

export function sendClearanceEmail(emailAddress, emailType, user, userInput, matches) {
  checkTokenExpiration(user).then(() => {

    // eslint-disable-next-line no-undef
    return apigClient.apiSendEmailIdPost(
      { id: '12312' },
      {
        emailAddress,
        emailType,
        input: userInput,
        matches
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