import { Submission } from '../../models'

export default async function getAllSubmissionsByBroker(brokerId) {
  return await Submission.find({
    broker: brokerId
  }).lean(true).select('primaryInsuredName totalCost rating type createdAt updatedAt _id').exec();
}