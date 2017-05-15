import { Submission } from '../../models'
import uuid from 'uuid';
import randomstring from 'randomstring';
import { getSubmissionById } from './'
import { Broker } from '../../models';

export default async function createSubmission(requestBody) {
	return new Promise(async (resolve, reject) => {
    let confNumber = await generateConfirmationNumber();
		requestBody.pdfToken = uuid.v4();
		requestBody.confirmationNumber = confNumber;

		let sub = new Submission(requestBody);
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