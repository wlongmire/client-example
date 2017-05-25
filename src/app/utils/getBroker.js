import fetch from 'isomorphic-fetch'
import config from '../../config'
let baseURL = config.apiserver.url

function getBroker(brokerId) {
  return fetch(baseURL + `/api/getBroker?id=${brokerId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((res) => {
    console.log(res)
    return(res)
  })
  .catch((error) => {
    return Promise.reject({
      _error: error.message
    })
  })
}

export default getBroker
