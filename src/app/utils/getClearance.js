import fetch from 'isomorphic-fetch'
import config from '../../config'
import { trim } from 'lodash'

function getClearance(params) {
  const baseURL = config.apiserver.url

  const apigClient = apigClientFactory.newClient({
    accessKey: params.user.accessToken,
    secretKey: params.user.idToken,
    region: config.awsCognito.region
  })

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

  apigClient.apiGetClearanceGet(apiparams)
  .then((resp) => {
    console.log(resp)
    // const data = resp.data
    // // empty previous edited submission in the store
    // if (data.success) {
    //   dispatch({ type: FETCH_SUBMISSIONS, payload: data.submissions })
    //   dispatch({ type: EDIT_SUBMISSION, payload: {} })
    // } else {
    //   alert('Error While Accessing Submissions DB.')
    // }
  })
  .catch((error) => {
    return Promise.reject({
      _error: error.message
    })
  })

  // const url = encodeURI(`${baseURL}/api/getClearance?name=${_.trim(params.name)}&projectAddress=${_.trim(params.addresses[0].projectAddress.replace("#",""))}&projectState=${_.trim(params.addresses[0].projectState)}&projectCity=${_.trim(params.addresses[0].projectCity)}&projectZipcode=${_.trim(params.addresses[0].projectZipcode)}&insuredAddress=${_.trim(params.addresses[1].primaryInsuredAddress.replace("#",""))}&insuredState=${_.trim(params.addresses[1].primaryInsuredState)}&insuredCity=${_.trim(params.addresses[1].primaryInsuredCity)}&insuredZipcode=${_.trim(params.addresses[1].primaryInsuredZipcode)}`)
  // return fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // })
  // .then(res => res.json())
  // .then((res) => {
  //   return(res);
  // })
  // .catch((error) => {
  //   return Promise.reject({
  //     _error: error.message
  //   });
  // });

};

export default getClearance;
