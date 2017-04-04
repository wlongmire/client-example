import { Submission } from '../../models'

export default async function getSubmissionByToken(token) {
  return await Submission.findOne({
      pdfToken: token
    })
    .populate('broker submittedBy')
    .exec();
}