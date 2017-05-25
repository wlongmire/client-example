import fetch from 'isomorphic-fetch'
import config from '../../config'

function getSubmissions(brokerId) {
  let baseURL = config.apiserver.url
  return fetch(`${baseURL}/api/getSubmissions`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((res) => {
    return (res)
  })
  .catch((error) => {
    return Promise.reject({
      _error: error.message
    })
  })
}

export default getSubmissions
