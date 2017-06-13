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

    console.log('AWS.config.apigClient', AWS.config.apigClient)

    // eslint-disable-next-line no-undef
    // AWS.config.
    const apigClient = apigClientFactory.newClient({
      // accessKey: AWS.config.credentials.data.Credentials.AccessKeyId,
      // secretKey: AWS.config.credentials.data.Credentials.SecretKey,
      // sessionToken: AWS.config.credentials.data.Credentials.SessionToken,
      // region: config.awsCognito.region
    })
    console.log('apigClient', apigClient)

    // get current cognito user
    // currentUser.session().isValid()
      // if true then Andrei will give you code
      // else send to login

    AWS.config.apigClient.apiGetSubmissionsPost({}, body)
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
  console.log('')

  return AWS.config.apigClient.apiSavePost({}, submission, {})
    .then((resp) => {
      console.log("RESPONSE save SUBMISSION xx22 =====", resp)
      return (resp)
    })
    .catch((error) => {
      console.log("ERROR SUBMISSION xx22 ====", error)
      return Promise.reject({
        _error: error.message
      })
    })
}

export function editSubmission(submission) {
  return ((dispatch) => {
    AWS.config.apigClient.apiGetSubmissionIdGet({id:submission._id})
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

  return AWS.config.apigClient.apiGetClearanceGet(apiparams, {}, {})
    .then((resp) => {
      console.log('CLERANCE RESPONSE', resp)
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

  return AWS.config.apigClient.apiGetRatingPost({}, submission, {})
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
  return AWS.config.apigClient.apiSendEmailIdPost(
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