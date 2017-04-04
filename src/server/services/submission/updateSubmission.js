import { Submission } from '../../models'

export default async function updateSubmission(id, submission) {
  return await Submission.findOneAndUpdate({
    _id: id
  }, {
    $set: submission
  }).exec();
}