import mongoose from 'mongoose';
import * as models from '../models';

import request from 'request';

async function getAllSubmissionsByState(state) {
  return await models.EdgeSubmission.find({"STATE":state}).exec()
}

export default {
  getAllSubmissionsByState
}