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
  const apigClient = apiGateway.core.apiGatewayClientFactory.newClient({
    accessKey: 'ACCESS_KEY',
    secretKey: 'SECRET_KEY',
    sessionToken: 'SESSION_TOKEN',
    // OPTIONAL: If you are using temporary credentials you must include the session token
    region: config.awsCognito.region
    // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
  })
  console.log(apigClient)

  // const baseURL = config.apiserver.url

  // return (dispatch) => {
  //   apigClient.apiGetSubmissionsGet(
  //     {},
  //     {},
  //     {}
  //   ).then((resp) => {
  //     console.log(resp)
  //   })

    // fetch(`${baseURL}/api/getSubmissions`, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res => res.json())
    // .then((res) => {
    //   // empty previous edited submission in the store
    //   if (res.success) {
    //     dispatch({ type: FETCH_SUBMISSIONS, payload: res.submissions })
    //     dispatch({ type: EDIT_SUBMISSION, payload: {} })
    //   } else {
    //     alert('Error While Accessing Submissions DB.')
    //   }
    // })
    // .catch((error) => {
    //   return Promise.reject({
    //     _error: error.message
    //   })
    // })
  // }
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