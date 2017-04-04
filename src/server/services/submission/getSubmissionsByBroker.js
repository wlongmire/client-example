import { Submission } from '../../models'

export default async function getAllSubmissionsByBroker(brokerId) {
  return await Submission.find({
    broker: brokerId
  }).exec();
}