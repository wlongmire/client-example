import fetch from 'isomorphic-fetch';

import config from '../../config';
let baseURL = config.apiserver.url;

function getClearance(params) {
  const url = encodeURI(baseURL + `/api/getClearance?name=${_.trim(params.name)}&projectAddress=${_.trim(params.addresses[0].projectAddress.replace("#",""))}&projectState=${_.trim(params.addresses[0].projectState)}&projectCity=${_.trim(params.addresses[0].projectCity)}&projectZipcode=${_.trim(params.addresses[0].projectZipcode)}&insuredAddress=${_.trim(params.addresses[1].primaryInsuredAddress.replace("#",""))}&insuredState=${_.trim(params.addresses[1].primaryInsuredState)}&insuredCity=${_.trim(params.addresses[1].primaryInsuredCity)}&insuredZipcode=${_.trim(params.addresses[1].primaryInsuredZipcode)}`)

  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-token': localStorage.getItem('token')
    }
  })
  .then(res => res.json())
  .then((res) => {
    return(res);
  })
  .catch((error) => {
    return Promise.reject({
      _error: error.message
    });
  });

};

export default getClearance;
