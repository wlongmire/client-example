import fetch from 'isomorphic-fetch';

import config from '../../config';
let baseURL = config.apiserver.url;

function getClearance(params) {

  const url = baseURL + `/api/getClearance?name=${name}&address=${params.address}&state=${params.state}&city=${params.city}&zipcode=${params.zipcode}`

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
    
    console.log(res);
    return(res);
  })
  .catch((error) => {
    return Promise.reject({
      _error: error.message
    });
  });

};

export default getClearance;
