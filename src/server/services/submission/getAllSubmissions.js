import { Submission } from '../../models'

export default async function getAllSubmissions() {
  return await Submission.findAll().exec();
}