import mongoose from 'mongoose';
import * as models from '../models';

async function createSubmission(submission) {
  let sub = new models.Submission(submission);
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

export default {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission
}