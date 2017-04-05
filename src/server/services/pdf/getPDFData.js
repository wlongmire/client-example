import { getSubmissionByToken } from '../submission';
import filter from 'lodash/filter';
import utilities from '../../utils/utilities'
import config from '../../../config';

export default async function getPDFData(token) {
  try {
    const submission = await getSubmissionByToken(token)

    let aggregateLimit;
    let halvedCost = Math.ceil(((submission.totalCost / 2) * 1000000) / 1000000);
    if (halvedCost < 5000000) {
      aggregateLimit = 5000000
    } else if (aggregateLimit > 50000000) {
      aggregateLimit = 50000000
    } else {
      aggregateLimit = halvedCost;
    }

    let occAggLimit = aggregateLimit + 1000000
    let genAggLimit = aggregateLimit + 2000000

    //let gcInfo = submission.generalContractorInfo.isKnown === 'yes'

    const limits = [
      {12:'1m/2m'},
      {22:'2m/2m'},
      {24:'2m/4m'},
      {33:'3m/3m'},
      {44:'4m/4m'},
      {55:'5m/5m'}
    ];

    let limitsRequested;

    if(submission.limitsRequested){
        limitsRequested = filter(limits, function(o) {
        let key = Object.keys(o);
        return key[0] === String(submission.limitsRequested);
      });
    }

    const pdfData = {
      namedInsured: submission.primaryInsuredName
      // quotedPremium: `$${utilities.commifyNumber(submission.rating[0].premium)}`,
      // terrorPremium: `$${utilities.commifyNumber(submission.rating[0].oiTerrorPremium)}`,
      // addtlPremium: `$${utilities.commifyNumber(submission.rating[0].oiAdditionalCoverage)}`,
      // totalPremium: `$${utilities.commifyNumber(submission.rating[0].totalOiPremium)}`,
      // totalCost: `$${utilities.commifyNumber(submission.rating[0].totalCost)}`,
      // inspectionAmount: `$${utilities.commifyNumber(325)}`,
      // insuredAddress: submission.insuredAddress ? submission.insuredAddress.street: '',
      // insuredCity: submission.insuredAddress ? submission.insuredAddress.city: '',
      // insuredState: submission.insuredAddress ? submission.insuredAddress.state : '',
      // insuredZip: submission.insuredAddress ? submission.insuredAddress.zip: '',
      // projectAddress: submission.projectAddress ? submission.projectAddress.street: '',
      // projectCity: submission.projectAddress ? submission.projectAddress.city: '',
      // projectState: submission.projectAddress ? submission.projectAddress.state: '',
      // projectZip: submission.projectAddress ? submission.projectAddress.zip: '',
      // createdDate: submission.createdAt ? submission.createdAt.toLocaleDateString(): '',
      // projectScope: submission.scope,
      // projectTerm: `${submission.projectTerm} months`,
      // projectCosts: `$${utilities.commifyNumber(submission.costs)}`,
      // gcKnown: submission.generalContractorInfo ? submission.generalContractorInfo.isKnown: '',
      // gcName: submission.generalContractorInfo ? submission.generalContractorInfo.name : 'GC Pending',
      // gcCarrier: submission.generalContractorInfo ? submission.generalContractorInfo.glCarrier : 'N/A',
      // gcLimit: submission.generalContractorInfo ? submission.generalContractorInfo.glLimits : 'N/A',
      // glExpirationDate: submission.generalContractorInfo ? submission.generalContractorInfo.glExpirationDate : 'N/A',
      // gcSubcontractor: gcInfo ? submission.generalContractorInfo.name : 'N/A',
      // gcSupervisingSubs: gcInfo ? submission.generalContractorInfo.isSupervisingSubs : 'N/A',
      // argoEmail: config.argoEmail,
      // willHaveOtherNamed: submission.hasOtherNamedInsured && submission.otherNamedInsured.name ? true : false,
      // otherRole: submission.hasOtherNamedInsured ? submission.otherNamedInsured.role : 'No other Named Insured entities submitted',
      // otherRelationship: submission.hasOtherNamedInsured ? submission.otherNamedInsured.relationship : 'N/A',
      // otherContractors: gcInfo && submission.generalContractorInfo.isSupervisingSubs === 'yes' ? true : false,
      // otherName: submission.hasOtherNamedInsured ? submission.otherNamedInsured.name : 'No AI Entities Submitted',
      // greaterThanTwoAdditional: submission.greaterThanTwoAdditional,
      // additionalName: submission.hasAdditionalInsured ? submission.additionalInsured.name : 'No Additional Insured',
      // additionalRole: submission.hasAdditionalInsured ? submission.additionalInsured.role : 'N/A',
      // additionalRelationship: submission.hasAdditionalInsured ? submission.additionalInsured.relationship : 'N/A',
      // commissionRate: `${submission.commission} %`,
      // occurenceLimit: `$${utilities.commifyNumber(occAggLimit)}`,
      // aggregateLimit: `$${utilities.commifyNumber(genAggLimit)}`,
      // willHaveOccupancy: submission.occupancyDetails && submission.occupancyDetails.willHave === 'yes' ? true : false,
      // occupancyBuildingAccessLimited: submission.occupancyDetails && submission.occupancyDetails.buildingAccessLimited === 'yes' ? true : false,
      // occupancySecurityCameras: submission.occupancyDetails && submission.occupancyDetails.securityCameras === 'yes' ? true : false,
      // occupancyDoorman: submission.occupancyDetails && submission.occupancyDetails.doorman === 'yes' ? true : false,
      // occupancySecurityPersonnel: submission.occupancyDetails && submission.occupancyDetails.securityPersonnel === 'yes' ? true : false,
      // occupancySeparateEntry: submission.occupancyDetails && submission.occupancyDetails.separateEntry === 'yes' ? true : false,
      // occupancySeparateStairwells: submission.occupancyDetails && submission.occupancyDetails.separateStairwells === 'yes' ? true : false,
      // occupancyLossesInLastFiveYears: submission.occupancyDetails && submission.occupancyDetails.lossesInLastFiveYears === 'yes' ? true : false,
      // occupancySquareFootage: submission.occupancyDetails ? submission.occupancyDetails.squareFootage : 'N/A',
      // occupancyNumberOfUnits: submission.occupancyDetails ? submission.occupancyDetails.numberOfUnits : 'N/A',
      // occupancyType: submission.occupancyDetails ? submission.occupancyDetails.type : 'N/A',
      // occupancyTypeCommercial: submission.occupancyDetails && submission.occupancyDetails.type === 'commercial' ? true : false,
      // occupancyTypeResidential: submission.occupancyDetails && submission.occupancyDetails.type === 'residential' ? true : false,
      // occupancyIsCoverageDesired: submission.occupancyDetails && submission.occupancyDetails.isCoverageDesired === 'yes' ? true : false,
      // willHaveDemoDetails: submission.demoDetails && submission.demoDetails.willHave === 'yes' ? true : false,
      // demoDetailsPedestrianSafetyPrecautions: submission.demoDetails ? submission.demoDetails.pedestrianSafetyPrecautions : 'N/A',
      // demoDetailsDuration: submission.demoDetails ? submission.demoDetails.duration : 'N/A',
      // demoDetailsCosts: submission.demoDetails ? submission.demoDetails.costs : 'N/A',
      // demoDetailsSubcontractor: submission.demoDetails ? submission.demoDetails.subcontractor : 'N/A',
      // towerCraneUse: submission.towerCraneUse && submission.towerCraneUse === 'yes' ? true : false,
      // anyWorkCompleted: submission.workDetails && submission.workDetails.whatsCompleted !== '' ? true : false,
      // workStartDate: submission.workDetails ? submission.workDetails.startDate : 'N/A',
      // whatsCompleted: submission.workDetails ? submission.workDetails.whatsCompleted : 'N/A',
      // brokerName: submission.broker ? submission.broker.name: '',
      // deductibleText: submission.insuredAddress && submission.insuredAddress.state === 'NY' ? '$10,0000' : '$2,500',
      // anticipatedFinishDate: submission.anticipatedFinishDate,
      // projectDefinedAreaScope: submission.projectDefinedAreaScope,
      // projectDefinedAreaScopeDetails: submission.projectDefinedAreaScopeDetails,
      // projectRequirements: submission.projectRequirements,
      // limitsRequested: submission.limitsRequested ? limitsRequested[0][submission.limitsRequested] : 'N/A',
      // excessLimits: `$ ${utilities.commifyNumber(submission.rating[0].excessDetails.limits)}`,
      // baseExcess: `$ ${utilities.commifyNumber(submission.rating[0].excessQuotedPremium)}`,
      // terrorExcess: `$ ${utilities.commifyNumber(submission.rating[0].excessTerror)}`,
      // totalExcess: `$ ${utilities.commifyNumber(submission.rating[0].excessTotalPremium)}`,
    }
    // if (submission.secondaryNameInsuredOther) {
    //   pdfData.hasOtherNamedInsuredExist = true;
    // }
    // if (submission.additionalInsuredOther) {
    //   pdfData.hasAdditionalInsuredExist = true;
    // }
    // if (submission.broker.name === 'Marsh USA Inc./R-T Specialty'){
    //   pdfData.marshBroker = true;
    // }
    return pdfData;
  } catch (err) {
    console.log(err)
  }
}

