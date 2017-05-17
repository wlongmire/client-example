import { Submission } from '../../models'

export default async function getSingleSubmission(id) {
  return Submission.findById(id).exec()
}