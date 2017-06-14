
export function checkTokenExpiration(expirationTime) {
  return new Promise((resolve, reject) => {
    const currentTime = Date.now()
    const expireTime = new Date(expirationTime)
    if (expireTime < currentTime) {
      resolve('time expired')
    }
    resolve('time NOT expired')
  })
}