import fetch from 'isomorphic-fetch'
import config from '../../config'
let baseURL = config.apiserver.url

function getRating(submission) {
  return fetch(baseURL + '/api/getRating', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(submission)
  })
  .then(res => res.json())
  .then((res) => {
    return(res)
  })
  .catch((error) => {
    return Promise.reject({
      _error: error.message
    })
  })
}

export default getRating