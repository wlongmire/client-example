import { checkTokenExpiration } from '../utils/checkTokenExpiration'

export function getSubmissions(user) {
    const body = {
      brokerId: user.broker
    }
  return new Promise((resolve, reject) => {
    checkTokenExpiration(user).then((resp) => {
      // if (resp.status === 'expired') {
      //   dispatch({ type: USER_LOGGED_IN, payload: resp.user })
      // }
      console.log('getting here', user)
      apigClient.apiGetSubmissionsPost({}, body)
        .then((resp2) => {
          console.log('xx55 hitting the GET SUBMISSION ENDPOINT', resp2)
          if (resp2.status === 200) {
            resolve(resp2.data)
            // dispatch({ type: FETCH_SUBMISSIONS, payload: resp2.data })
          } else {
            alert('Error While Accessing Submissions DB.')
            console.log('get submissions response error =', resp2)
            reject(resp2)
          }
        }, (error) => {
          console.log('get submissions response error =', error)
          reject(error)
        })
    })
  })
}
