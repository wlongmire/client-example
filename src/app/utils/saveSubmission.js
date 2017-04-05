import fetch from 'isomorphic-fetch';

import config from '../../config';
let baseURL = config.apiserver.url;

function saveSubmission(submission) {

  console.log("saveSubmission", JSON.stringify(submission))

  return fetch(baseURL + `/api/save`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-token': localStorage.getItem('token')
    },
    body: JSON.stringify(submission)
  })
  .then(res => res.json())
  .then((res) => {
    console.log("res", res);
    return(res);
  })
  .catch((error) => {
    return Promise.reject({
      _error: error.message
    });
  });

};

export default saveSubmission;
