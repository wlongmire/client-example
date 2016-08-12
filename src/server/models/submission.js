import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  primaryNamedInsured: String,
  hasOtherNamedInsured: Boolean,
  otherNamedInsured: Object,
  address: Object,
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