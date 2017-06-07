import config from '../../config'
let baseURL = config.apiserver.url

function sendEmail(emailAddress, emailType, submissionId) {
  return apigClient.apiSendEmailIdPost(
    {},
    JSON.stringify({
      emailAddress,
      emailType
    }),
    {})
    .then((resp) => {
      return (resp)
    })
    .catch((error) => {
      return Promise.reject({
        _error: error.message
      })
    })

  // return fetch(`${baseURL}/api/sendEmail/${submissionId}`, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body:JSON.stringify({
  //     emailAddress,
  //     emailType
  //   })
  // })
  // .then(res => res.json())
  // .then((res) => {
  //   console.log(res)
  //   return (res)
  // })
  // .catch((error) => {
  //   return Promise.reject({
  //     _error: error.message
  //   })
  // })
}

export default sendEmail
