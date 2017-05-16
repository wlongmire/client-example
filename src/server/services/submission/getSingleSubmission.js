import { Submission } from '../../models'

export default async function getSingleSubmission(id) {
  return Submission.findById(id).exec()
  // console.log('getting to service', id)
  // Submission.findById(id, (err, res) => {
  //   if (err) return err
  //   console.log('RESPONSE on SERVER', res)
  //   return res
  // })
}