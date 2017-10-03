import Moment from 'moment'
import { formatDollars } from './utilities'

export function transformSubmissionData(submissionsArray) {
  return new Promise((resolve, reject) => {
    try {
      const list = submissionsArray.map((item) => {
        if (!item.rating) {
          return
        }

        const premiumType = item.rating[item.type]
        let quoteStatus
        if ((premiumType && premiumType.premium) && (item.clearanceStatus === 'pass')) {
          quoteStatus = 'Priced'
        } else if (!premiumType || !premiumType.premium) {
          quoteStatus = 'Referred'
        } else if ((premiumType && premiumType.premium) && (item.clearanceStatus === 'pending')) {
          quoteStatus = 'Pending Clearance'
        }

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
          ableToEdit: (premiumType && premiumType.premium) ? 'Yes' : 'No',
          quoteStatus
        })
      })

      resolve(list.filter((item)=>(item)))
    } catch (error) {
      reject(error)
    }
  })
}