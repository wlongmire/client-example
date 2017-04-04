import mongoose from 'mongoose';
import randomstring from 'randomstring';

const Schema = mongoose.Schema;

const submissionSchema = new mongoose.Schema({
      confirmationNumber: String,
      type: String,
      status: String,
      primaryInsuredName: String,
      projectAddress: Object,
      passedClearance: Boolean,
      insuredAddress: Object,
      specificFloors: Boolean,
      secondaryInsured: Boolean,
      additionalInsured: Boolean,
      projectTerm: Number,
      totalCost: Number,
      towerCraneUse: Boolean,
      generalContractorKnown: Boolean,
      occupancy: Boolean,
      exteriorDemo: Boolean,
      workStarted: Boolean,
      excessLimit: Boolean,
      generalComments:String,
      sidewalkMaintaining: String,
      servicingSeveralLocations: Boolean,
      contactInfo: Object,
      specificFloorsDetails: String,
      secondaryNameInsuredName: String,
      secondaryNameInsuredRelationship: String,
      secondaryNameInsuredAddress: String,
      secondaryNameInsuredCity: String,
      secondaryNameInsuredState: String,
      secondaryNameInsuredZipcode: String,
      secondaryNameInsuredOther: Boolean,
      additionalInsuredName: String,
      additionalInsuredRelationship: String,
      additionalInsuredRole: String,
      additionalInsuredOther: Boolean,
      generalContractorName: String,
      generalLiabilityCarrier: String,
      generalContractorAmount: Number,
      otherSubcontractorsPaid: Boolean,
      occupancyCoverageDesired: Boolean,
      occupancyType: String,
      occupancyUnits: Number,
      occupancySquareFootage: Number,
      occupancylossIn5Years: Boolean,
      occupancyStairwells: Boolean,
      occupancySeparateEntry: Boolean,
      occupancySecurityPersonnel: Boolean,
      occupancyDoorman: Boolean,
      occupancyCameras: Boolean,
      occupancyAccess: Boolean,
      exteriorDemoSubcontractor: Boolean,
      exteriorDemoCost: Number,
      exteriorDemoTerm: Number,
      exteriorDemoPrecautions: String,
      workStartDate: Date,
      workStartDescription: String,
      totalSpent: String,
      priorGcResponsible: String,
      excessLimitAmount: String,
      sidewalkDetails: String,
      contractorSameAllSites: Boolean,
      otherSiteAddress1: String,
      otherSiteCity1: String,
      otherSiteState1: String,
      otherSiteZipcode1: String,
      otherSitesAdditional1: Boolean,
      otherSiteAddress2: String,
      otherSiteCity2: String,
      otherSiteState2: String,
      otherSiteZipcode2: String,
      otherSitesAdditional2: Boolean,
      otherSiteAddress3: String,
      otherSiteCity3: String,
      otherSiteState3: String,
      otherSiteZipcode3: String,
      otherSitesAdditional3: Boolean,
      otherSiteAddress4: String,
      otherSiteCity4: String,
      otherSiteState4: String,
      otherSiteZipcode4: String,
      otherSitesAdditional4: Boolean,
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
      excessLimit: Number,
      verticalExpansion: Boolean,
      specificFloors: Boolean,
      scope: String,
      isSupervisingSubs: Boolean,
      projectRequirements: Boolean,
      limitsRequested: Number,
      otherSubcontractorsPaid: Boolean,
      specificFloorsDetails: String,
      nycha: Boolean,
      rating: Array
}, {timestamps: true});

mongoose.model('submission', submissionSchema);

export default mongoose.model('submission');