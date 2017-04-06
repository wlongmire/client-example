import mongoose from 'mongoose';
import randomstring from 'randomstring';

const Schema = mongoose.Schema;

const submissionSchema = new mongoose.Schema({
  type: String,
  status: String,
  primaryInsuredName: String,
  projectAddress: Object,
  passedClearance: String,
  insuredAddress: Object,
  specificFloors: String,
  secondaryInsured: String,
  additionalInsured: String,
  projectTerm: String,
  totalCost: String,
  towerCraneUse: String,
  generalContractorKnown: String,
  occupancy: String,
  exteriorDemo: String,
  workStarted: String,
  excessLimit: String,
  generalComments:String,
  sidewalkMaintaining: String,
  servicingSeveralLocations: String,
  contactInfo: Object,
  specificFloorsDetails: String,
  secondaryNameInsuredName: String,
  secondaryNameInsuredRelationship: String,
  secondaryNameInsuredAddress: String,
  secondaryNameInsuredCity: String,
  secondaryNameInsuredState: String,
  secondaryNameInsuredZipcode: String,
  secondaryNameInsuredOther: String,
  additionalInsuredName: String,
  additionalInsuredRelationship: String,
  additionalInsuredRole: String,
  additionalInsuredOther: String,
  generalContractorName: String,
  generalLiabilityCarrier: String,
  generalContractorAmount: String,
  otherSubcontractorsPaid: String,
  occupancyCoverageDesired: String,
  occupancyType: String,
  occupancyUnits: String,
  occupancySquareFootage: String,
  occupancylossIn5Years: String,
  occupancyStairwells: String,
  occupancySeparateEntry: String,
  occupancySecurityPersonnel: String,
  occupancyDoorman: String,
  occupancyCameras: String,
  occupancyAccess: String,
  exteriorDemoSubcontractor: String,
  exteriorDemoCost: String,
  exteriorDemoTerm: String,
  exteriorDemoPrecautions: String,
  workStartDate: Date,
  workStartDescription: String,
  totalSpent: String,
  priorGcResponsible: String,
  excessLimitAmount: String,
  sidewalkDetails: String,
  contractorSameAllSites: String,
  otherSiteAddress1: String,
  otherSiteCity1: String,
  otherSiteState1: String,
  otherSiteZipcode1: String,
  otherSitesAdditional1: String,
  otherSiteAddress2: String,
  otherSiteCity2: String,
  otherSiteState2: String,
  otherSiteZipcode2: String,
  otherSitesAdditional2: String,
  otherSiteAddress3: String,
  otherSiteCity3: String,
  otherSiteState3: String,
  otherSiteZipcode3: String,
  otherSitesAdditional3: String,
  otherSiteAddress4: String,
  otherSiteCity4: String,
  otherSiteState4: String,
  otherSiteZipcode4: String,
  otherSitesAdditional4: String,
  otherSiteAddress5: String,
  otherSiteCity5: String,
  otherSiteState5: String,
  otherSiteZipcode5: String,
  submittedBy: {type: Schema.Types.ObjectId, ref: 'user', default: null},
  broker: {type: Schema.Types.ObjectId, ref: 'broker', default: null},
  anticipatedFinishDate: Date,
  generalContractor: String,
  glCarrier: String,
  glExpirationDate: Date,
  excessLimit: String,
  verticalExpansion: String,
  specificFloors: String,
  scope: String,
  isSupervisingSubs: String,
  projectRequirements: String,
  limitsRequested: String,
  otherSubcontractorsPaid: String,
  specificFloorsDetails: String,
  nycha: String,
  rating: Object,
  pdfToken: String,
  confirmationNumber: String
}, {timestamps: true});

mongoose.model('submission', submissionSchema);

export default mongoose.model('submission');