import mongoose from 'mongoose';
import * as models from '../models';

import request from 'request';

async function getAllSubmissionsByState(state) {
  return await models.EdgeSubmission.find({"STATE":state}).lean(true).select('CUST_NAME ADDRESS_1 CITY STATE ZIP_CODE').exec()
}

export default {
  getAllSubmissionsByState
}