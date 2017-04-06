import { getSubmissionByToken } from '../submission';
import filter from 'lodash/filter';
import utilities from '../../utils/utilities'
import config from '../../../config';

export default async function getPDFData(token, pdfType) {
  try {
    const submission = await getSubmissionByToken(token, pdfType)

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
    let type = pdfType;
    if (pdfType === 'bind' || pdfType || 'excess') {
      type = submission.type
    }

    const pdfData = {
      namedInsured: submission.primaryInsuredName,
      quotedPremium: `$${utilities.commifyNumber(submission.rating[type].premium)}`,
      terrorPremium: `$${utilities.commifyNumber(submission.rating[type].terrorPremium)}`,
      addtlPremium: `$${utilities.commifyNumber(submission.rating[type].additionalCoverage)}`,
      totalPremium: `$${utilities.commifyNumber(submission.rating[type].totalPremium)}`,
      totalCost: `$${utilities.commifyNumber(submission.rating[type].totalPremium + 325)}`,
      inspectionAmount: `$${utilities.commifyNumber(325)}`,
      insuredAddress: submission.insuredAddress ? submission.insuredAddress.street: '',
      insuredCity: submission.insuredAddress ? submission.insuredAddress.city: '',
      insuredState: submission.insuredAddress ? submission.insuredAddress.state : '',
      insuredZip: submission.insuredAddress ? submission.insuredAddress.zip: '',
      projectAddress: submission.projectAddress ? submission.projectAddress.street: '',
      projectCity: submission.projectAddress ? submission.projectAddress.city: '',
      projectState: submission.projectAddress ? submission.projectAddress.state: '',
      projectZip: submission.projectAddress ? submission.projectAddress.zip: '',
      createdDate: submission.createdAt ? submission.createdAt.toLocaleDateString(): '',
      projectScope: submission.scope,
      projectTerm: `${submission.projectTerm} months`,
      projectCosts: `$${utilities.commifyNumber(parseInt(submission.totalCost))}`,
      gcKnown: submission.generalContractorKnown == 'true' ? 'yes' : 'no',
      gcName: submission.generalContractorName,
      gcCarrier: submission.generalLiabilityCarrier,
      glExpirationDate: utilities.isDefined(submission.generalContractorExpirationDate) ? submission.generalContractorExpirationDate : '',
      gcSupervisingSubs: submission.otherSubcontractorsPaid == 'true' ? 'yes' : 'no',
      argoEmail: config.argoEmail,
      willHaveOtherNamed: submission.secondaryNameInsuredName != '' ? true : false,
      otherRole: submission.secondaryNameInsuredName != '' ? submission.secondaryNameInsuredRole : 'No other Named Insured entities submitted',
      otherRelationship: submission.secondaryNameInsuredName != '' ? submission.secondaryNameInsuredRelationship : 'N/A',
      otherContractors: submission.otherSubcontractorsPaid == 'true' ? true : false,
      otherName: submission.secondaryNameInsuredName != '' ? submission.secondaryNameInsureName : 'No AI Entities Submitted',
      greaterThanTwoAdditional: submission.additionalInsuredOther == 'true',
      additionalName: submission.hasAdditionalInsuredName != '' ? submission.additionalInsuredName : 'No Additional Insured',
      additionalRole: submission.hasAdditionalInsuredName != '' ? submission.additionalInsuredRole : 'N/A',
      additionalRelationship: ssubmission.hasAdditionalInsuredName != '' ? submission.additionalInsuredRelationship : 'N/A',
      occurenceLimit: `$${utilities.commifyNumber(occAggLimit)}`,
      aggregateLimit: `$${utilities.commifyNumber(genAggLimit)}`,
      // willHaveOccupancy: submission.occupancyDetails && submission.occupancyDetails.willHave === 'yes' ? true : false,
      // occupancyBuildingAccessLimited: submission.occupancyDetails && submission.occupancyDetails.buildingAccessLimited === 'yes' ? true : false,
      // occupancySecurityCameras: submission.occupancyDetails && submission.occupancyDetails.securityCameras === 'yes' ? true : false,
      // occupancyDoorman: submission.occupancyDetails && submission.occupancyDetails.doorman === 'yes' ? true : false,
      // occupancySecurityPersonnel: submission.occupancyDetails && submission.occupancyDetails.securityPersonnel === 'yes' ? true : false,
      // occupancySeparateEntry: submission.occupancyDetails && submission.occupancyDetails.separateEntry === 'yes' ? true : false,
      // occupancySeparateStairwells: submission.occupancyDetails && submission.occupancyDetails.separateStairwells === 'yes' ? true : false,
      // occupancyLossesInLastFiveYears: submission.occupancyDetails && submission.occupancyDetails.lossesInLastFiveYears === 'yes' ? true : false,
      // occupancySquareFootage: submission.occupancyDetails ? submission.occupancyDetails.squareFootage : 'N/A',
      // occupancyNumberOfUnits: submission.occupancyUnits ? submission.occupancyDetails.numberOfUnits : 'N/A',
      // occupancyType: submission.occupancyType ? submission.occupancyDetails.type : 'N/A',
      // occupancyIsCoverageDesired: submission.occupancyDetails && submission.occupancyDetails.isCoverageDesired === 'yes' ? true : false,
      // willHaveDemoDetails: submission.demoDetails && submission.demoDetails.willHave === 'yes' ? true : false,
      // demoDetailsPedestrianSafetyPrecautions: submission.exteriorDemoPrecautions ? submission.demoDetails.pedestrianSafetyPrecautions : 'N/A',
      // demoDetailsDuration: submission.exteriorDemoTerm ? submission.demoDetails.duration : 'N/A',
      // demoDetailsCosts: submission.exteriorDemoCost ? submission.demoDetails.costs : 'N/A',
      // demoDetailsSubcontractor: submission.exteriorDemoSubcontractor,
       towerCraneUse: submission.towerCraneUse == 'true',
      // anyWorkCompleted: submission.workDetails && submission.workDetails.whatsCompleted !== '' ? true : false,
      // workStartDate: submission.workDetails ? submission.workDetails.startDate : 'N/A',
      // whatsCompleted: submission.workDetails ? submission.workDetails.whatsCompleted : 'N/A',
      brokerName: submission.broker.name,
      deductibleText: submission.insuredAddress && submission.insuredAddress.state === 'NY' ? '$10,0000' : '$2,500',
      anticipatedFinishDate: submission.anticipatedFinishDate,
      projectDefinedAreaScope: submission.projectDefinedAreaScope,
      projectDefinedAreaScopeDetails: submission.projectDefinedAreaScopeDetails,
      projectRequirements: submission.projectRequirements,
      limitsRequested: submission.limitsRequested ? limitsRequested[0][submission.limitsRequested] : 'N/A',
      excessLimits: `$ ${utilities.commifyNumber(parseInt(submission.excessLimitAmount))}`,
      baseExcess: `$ ${utilities.commifyNumber(submission.rating[type].excessPremium)}`,
      terrorExcess: `$ ${utilities.commifyNumber(submission.rating[type].excessTerror)}`,
      totalExcess: `$ ${utilities.commifyNumber(submission.rating[type].excessTotalPremium)}`,
    }
    if (submission.secondaryNameInsuredOther == 'true') {
      pdfData.hasOtherNamedInsuredExist = true;
    }
    
    if (submission.additionalInsuredOther == 'true' ) {
      pdfData.hasAdditionalInsuredExist = true;
    }

    if (submission.broker.name === 'Marsh USA Inc./R-T Specialty'){
      pdfData.marshBroker = true;
    }

    return pdfData;
  } catch (err) {
    console.log(err)
  }
}

