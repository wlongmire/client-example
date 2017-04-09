import fetch from 'isomorphic-fetch';

import config from '../../config';
let baseURL = config.apiserver.url;

function getClearance(params) {
  const url = encodeURI(baseURL + `/api/getClearance?name=${_.trim(params.name)}&address=${_.trim(params.address.replace("#",""))}&state=${_.trim(params.state)}&city=${_.trim(params.city)}&zipcode=${_.trim(params.zipcode)}`)

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
