import fetch from 'isomorphic-fetch';

import config from '../../config';
let baseURL = config.apiserver.url;

function getSubmissions(brokerId) {

  return fetch(baseURL + '/api/getSubmissions', {
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

export default getSubmissions;
