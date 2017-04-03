import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const edgeSubmissionSchema = new mongoose.Schema({
  SUBMISSION_ID : String,
  POL_ID : String,
  CUST_NAME : String,
  ADDRESS_1 : String,
  CITY : String,
  STATE : String,
  ZIP_CODE : String,
  SUMISSION_DATE: String,
  PRODUCT_CODE: String,
  PRODUCT_NAME: String,
  SUBMISSION_INS_TS: String,
  SUBMISSION_UPD_TS: String,
  SUBM_POLICY_INS_TS: String,
  SUBM_POLICY_UPD_TS: String,
  PRODUCT_GENERAL_INS_TS: String,
  PRODUCT_GENERAL_UPD_TS: String,
}, {collection: 'D_SUBMISSIONS'});

export default mongoose.model('D_SUBMISSIONS', edgeSubmissionSchema);