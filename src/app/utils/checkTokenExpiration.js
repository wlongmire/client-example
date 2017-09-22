import moment from 'moment'
import { cognitoPersistUser } from './cognitoPersistUser'

export function checkTokenExpiration(user) {
  // console.log("USER====>", user)
  return new Promise((resolve, reject) => {
    const isExpired = moment().isAfter(user.expiration)
    if (isExpired) {
      // if token is expried (usually expires in one hour), create a new token
      cognitoPersistUser((updatedUser) => {
        resolve({ status: 'expired', user: updatedUser })
      })
    } else {
      // if token is not expired, return success
      resolve({ status: 'success' })
    }
  })
}