import { Submission } from '../../models'
import uuid from 'uuid';
import randomstring from 'randomstring';
import { getSubmissionById } from './'

export default async function createSubmission(requestBody) {
	return new Promise(async (resolve, reject) => {
		let sub = Submission.create(requestBody);
		let confNumber = await generateConfirmationNumber();
		sub.pdfToken = uuid.v4();
		sub.confirmationNumber = confNumber;
		let newSub = await sub.save();
		resolve(newSub._id);
	});
}

async function generateConfirmationNumber() {
  let confirmation = randomstring.generate({
    length: 12,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
  });
  let submission = await Submission.findOne({
    confirmationNumber: confirmation
  }).exec()
  if (!submission) {
    return confirmation
  } else {
    generateConfirmationNumber();
  }
}