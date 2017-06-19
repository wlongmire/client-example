import Moment from 'moment'
import { formatDollars } from './utilities'

export function transformSubmissionData(submissionsArray) {
  return new Promise((resolve, reject) => {
    try {
      const list = submissionsArray.map((item) => {
        const premiumType = item.rating[item.type]
        return ({
          _id: item._id,
          primaryInsuredName: item.primaryInsuredName,
          totalCost: item.totalCost ? formatDollars(item.totalCost) : 'n/a',
          quotedPremium: (premiumType && premiumType.premium) ? formatDollars(premiumType.premium) : 'n/a',
          totalPremium: (premiumType && premiumType.totalPremium) ? formatDollars(premiumType.totalPremium) : 'n/a',
          type: item.type,
          updatedAt: item.updatedAt,
          dateCreated: Moment(item.createdAt).format('MM-DD-YY hh:mma'),
          dateUpdated: Moment(item.updatedAt).format('MM-DD-YY hh:mma'),
          quoteStatus: (premiumType && premiumType.premium) ? 'Yes' : 'No'
        })
      })
      resolve(list)
    } catch (error) {
      reject(error)
    }
  })
}