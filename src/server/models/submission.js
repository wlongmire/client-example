import mongoose from 'mongoose';
import randomstring from 'randomstring'

const Schema = mongoose.Schema;

const submissionSchema = new mongoose.Schema({
  confirmationNumber: String,
  primaryNamedInsured: String,
  namedInsuredAddress: Object,
  primaryNamedInsuredAddress: Boolean,
  hasOtherNamedInsured: Boolean,
  otherNamedInsured: Object,
  projectAddress: Object,
  scope: String,
  term: Number,
  costs: Number,
  generalContractorInfo: Object,
  occupancyDetails: Object,
  workDetails: Object,
  contactInfo: Object,
  quotedPremium: Number,
  status: String,
  commission: {type: Number, default: 15},
  pdfToken: String,
  terrorPremium: Number,
  additionalCoverage: Number,
  totalPremium: Number,
  totalCost: Number,
  excessPremium: Number,
  excessDetails: Object,
  submittedBy: {type: Schema.Types.ObjectId, ref: 'user', default: null},
  broker: {type: Schema.Types.ObjectId, ref: 'broker', default: null},
  generalComments: String
}, {timestamps: true});

mongoose.model('submission', submissionSchema);

export default mongoose.model('submission');