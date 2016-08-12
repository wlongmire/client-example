import mongoose from 'mongoose';
import randomstring from 'randomstring'

const submissionSchema = new mongoose.Schema({
  confirmationNumber: String,
  primaryNamedInsured: String,
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
  createdAt: Date,
  updatedAt: Date
});

mongoose.model('submission', submissionSchema);

export default mongoose.model('submission');