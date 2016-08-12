import mongoose from 'mongoose';
import * as models from '../models';
import randomstring from 'randomstring';

async function createSubmission(submission) {
  let sub = new models.Submission(submission);
  let confNumber = await generateConfirmationNumber();
  sub.confirmationNumber = confNumber;
  console.log(confNumber);
  return await sub.save();
}

async function getAllSubmissions() {
  return await models.Submission.findAll().exec();
}

async function getSubmissionById(id) {
  return await models.Submission.findById(id).exec();
}

async function updateSubmission(id, submission) {
  return await models.Submission.findOneAndUpdate({_id: id}, {$set: submission}).exec();
}

async function generateConfirmationNumber() {
  let confirmation = randomstring.generate({
    length: 12,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
  });
  let submission = await models.Submission.findOne({confirmationNumber: confirmation}).exec()
  if (!submission) {
    return confirmation
  }
  else {
    generateConfirmationNumber();
  }
}

export default {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission
}