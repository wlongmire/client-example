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
      insuredAddress: submission.insuredAddress.primaryInsuredAddress,
      insuredCity: submission.insuredAddress.primaryInsuredCity,
      insuredState: submission.insuredAddress.primaryInsuredState,
      insuredZip: submission.insuredAddress.primaryInsuredZipcode,
      projectAddress: submission.projectAddress.projectAddress,
      projectCity: submission.projectAddress.projectCity,
      projectState: submission.projectAddress.projectState,
      projectZip: submission.projectAddress.projectZipcode,
      createdDate: submission.createdAt ? submission.createdAt.toLocaleDateString(): '',
      projectScope: submission.scope,
      projectTerm: `${submission.projectTerm} months`,
      projectCosts: `$${utilities.commifyNumber(parseInt(submission.totalCost))}`,
      gcKnown: submission.generalContractorKnown == 'true' ? 'yes' : 'no',
      gcName: utilities.isDefined(submission.generalContractorName) ? submission.generalContractorName : '',
      gcCarrier: utilities.isDefined(submission.generalLiabilityCarrier) ? submission.generalLiabilityCarrier : '',
      glExpirationDate: utilities.isDefined(submission.generalContractorExpirationDate) ? submission.generalContractorExpirationDate : '',
      gcSupervisingSubs: submission.otherSubcontractorsPaid == 'true' ? 'yes' : 'no',
      argoEmail: config.argoEmail,
      willHaveOtherNamed: utilities.isDefined(submission.secondaryNameInsuredName) ? 'yes' : 'no',
      otherRole: utilities.isDefined(submission.secondaryNameInsuredRole) ? submission.secondaryNameInsuredRole : 'No other Named Insured entities submitted',
      otherRelationship: utilities.isDefined(submission.secondaryNameInsuredRelationship) ? submission.secondaryNameInsuredRelationship : 'N/A',
      otherContractors: submission.otherSubcontractorsPaid == 'true' ? 'yes' : 'no',
      otherName: utilities.isDefined(submission.secondaryNameInsuredName) ? submission.secondaryNameInsuredName : 'No AI Entities Submitted',
      greaterThanTwoAdditional: submission.additionalInsuredOther == 'true' ? 'yes' : 'no',
      additionalName: utilities.isDefined(submission.additionalInsuredName) ? submission.additionalInsuredName : 'No Additional Insured',
      additionalRole: utilities.isDefined(submission.additionalInsuredRole) ? submission.additionalInsuredRole : 'N/A',
      additionalRelationship: utilities.isDefined(submission.additionalInsuredRelationship) ? submission.additionalInsuredRelationship : 'N/A',
      occurenceLimit: `$${utilities.commifyNumber(occAggLimit)}`,
      aggregateLimit: `$${utilities.commifyNumber(genAggLimit)}`,
      occupancyBuildingAccessLimited: utilities.isDefined(submission.occupancyAccess) ? submission.occupancyAccess : '',
      occupancySecurityCameras: utilities.isDefined(submission.occupancyCameras) ? submission.occupancyCameras : '',
      occupancyDoorman: utilities.isDefined(submission.occupancyDoorman) ? submission.occupancySecurityDoorman : '',
      occupancySecurityPersonnel: utilities.isDefined(submission.occupancySecurityPersonel) ? submission.occupancySecurityPersonel : '',
      occupancySeparateEntry: utilities.isDefined(submission.occupancySeparateEntry) ? submission.occupancySeparateEntry : '',
      occupancySeparateStairwells: utilities.isDefined(submission.occupancyStairwells) ? submission.occupancyStairwells : '',
      occupancyLossesInLastFiveYears: utilities.isDefined(submission.occupancylossIn5Years) ? submission.occupancylossIn5Years : '',
      occupancySquareFootage: utilities.isDefined(submission.occupancySquareFootage) ? submission.occupancySquareFootage : '',
      occupancyNumberOfUnits: utilities.isDefined(submission.occupancyUnits) ? submission.occupancyUnits : '',
      occupancyType: utilities.isDefined(submission.occupancyType) ? submission.occupancyType : '',
       demoDetailsPedestrianSafetyPrecautions: utilities.isDefined(submission.exteriorDemoPrecautions) ? submission.exteriorDemoPrecautions : '',
       demoDetailsDuration: utilities.isDefined(submission.exteriorDemoTerm) ? submission.exteriorDemoTerm : '',
       demoDetailsCosts: utilities.isDefined(submission.exteriorDemoCost) ? submission.exteriorDemoCost : '',
       demoDetailsSubcontractor: utilities.isDefined(submission.exteriorDemoSubcontractor) ? submission.exteriorDemoSubcontractor : '',
       towerCraneUse: utilities.isDefined(submission.towerCraneUse) && submission.towerCraneUse == 'true' ? 'yes' : 'no',
      workStartDate: utilities.isDefined(submission.workStartDate) ? submission.workStartDate : '',
      whatsCompleted: utilities.isDefined(submission.workStartDateDescription) ? submission.workStartDateDescription : '',
      brokerName: submission.broker.name,
      deductibleText: submission.insuredAddress && submission.insuredAddress.state === 'NY' ? '$10,0000' : '$2,500',
      anticipatedFinishDate: utilities.isDefined(submission.anticipatedFinishDate) ? submission.anticipatedFinishDate : '',
      projectDefinedAreaScope: submission.projectDefinedAreaScope == 'true' ? 'yes' : 'no',
      projectDefinedAreaScopeDetails: utilities.isDefined(submission.projectDefinedAreaScopeDetails) ? submission.projectDefinedAreaScopeDetails : '',
      projectRequirements: utilities.isDefined(submission.projectRequirements) ? submission.projectRequirements : '',
      limitsRequested: submission.limitsRequested ? limitsRequested[0][submission.limitsRequested] : 'N/A',
      excessLimits: `$ ${utilities.commifyNumber(parseInt(submission.excessLimitAmount))}`,
      baseExcess: utilities.isDefined(submission.rating[type]) && submission.rating[type].instantQuote ? `$ ${utilities.commifyNumber(submission.rating[type].excessPremium)}`: '',
      terrorExcess: utilities.isDefined(submission.rating[type]) && submission.rating[type].instantQuote ?  `$ ${utilities.commifyNumber(submission.rating[type].excessTerror)}`: '',
      totalExcess: utilities.isDefined(submission.rating[type]) && submission.rating[type].instantQuote ?  `$ ${utilities.commifyNumber(submission.rating[type].excessTotalPremium)}`: '',
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
    console.log(pdfData);
    return pdfData;
  } catch (err) {
    console.log(err)
  }
}

