import config from '../../config'

function saveSubmission(submission) {
  return apigClient.apiSavePost({}, JSON.stringify(submission), {})
    .then((resp) => {
      return (resp)
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })
}

export default saveSubmission
