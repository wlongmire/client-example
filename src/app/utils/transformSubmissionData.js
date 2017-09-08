import Moment from 'moment'
import { formatDollars } from './utilities'

export function transformSubmissionData(submissionsArray) {
  return new Promise((resolve, reject) => {
    try {
      const list = submissionsArray.map((item) => {
        const premiumType = item.rating[item.type]
        return ({
          _id: item._id,
          clearanceStatus: item.clearanceStatus,
          primaryInsuredName: item.primaryInsuredName,
          totalCost: item.totalCost ? formatDollars(item.totalCost) : 'n/a',
          quotedPremium: (premiumType && premiumType.premium) && (item.clearanceStatus === 'pass') ? formatDollars(premiumType.premium) : 'n/a',
          totalPremium: (premiumType && premiumType.totalPremium) && (item.clearanceStatus === 'pass') ? formatDollars(premiumType.totalPremium) : 'n/a',
          type: item.type,
          updatedAt: item.updatedAt,
          dateCreated: item.createdAt ? Moment(item.createdAt).format('MM-DD-YY hh:mma') : null,
          dateUpdated: item.updatedAt ? Moment(item.updatedAt).format('MM-DD-YY hh:mma') : null,
          quoteStatus: (premiumType && premiumType.premium) ? 'Yes' : 'No'
        })
      })
      resolve(list)
    } catch (error) {
      reject(error)
    }
  })
}