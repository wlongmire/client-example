import fetch from 'isomorphic-fetch'
import config from '../../config'

function getRating(submission) {
  let baseURL = config.apiserver.url
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