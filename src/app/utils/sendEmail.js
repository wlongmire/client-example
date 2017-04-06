import fetch from 'isomorphic-fetch';

import config from '../../config';
let baseURL = config.apiserver.url;

function sendEmail(emailAddress, emailType, submissionId) {
  return fetch(baseURL + `/api/sendEmail/${submissionId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-token': localStorage.getItem('token')
    },
    body:JSON.stringify({
      emailAddress,
      emailType
    })
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

export default sendEmail;
