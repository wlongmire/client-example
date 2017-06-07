import config from '../../config'
import { trim } from 'lodash'

import {
  FETCH_SUBMISSIONS,
  EDIT_SUBMISSION
} from 'src/app/constants/submission'

function getClearance(params) {
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

export default getClearance
