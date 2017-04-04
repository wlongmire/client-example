import { Submission } from '../../models'

export default async function getSubmissionById(id) {
  return await Submission.findById(id)
    .populate('broker submittedBy')
    .exec();
}