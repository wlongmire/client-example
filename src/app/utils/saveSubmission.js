import fetch from 'isomorphic-fetch'
import config from '../../config'

function saveSubmission(submission) {
  const baseURL = config.apiserver.url
  return fetch(`${baseURL}/api/save`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(submission)
  })
  .then(res => res.json())
  .then((res) => {
    console.log('res', res)
    return (res)
  })
  .catch((error) => {
    return Promise.reject({
      _error: error.message
    })
  })
}

export default saveSubmission
