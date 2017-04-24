import { getSubmissionByToken } from '../submission';
import filter from 'lodash/filter';
import utilities from '../../utils/utilities'
import config from '../../../config';

export default async function getPDFData(token, pdfType) {
  try {
    const submission = await getSubmissionByToken(token, pdfType)

    let aggregateLimit;
    let halvedCost = Math.ceil(((parseInt(submission.totalCost) / 2) * 1000000) / 1000000);

    if (halvedCost < 5000000) {
      aggregateLimit = 5000000
    } else if (aggregateLimit > 50000000) {
      aggregateLimit = 50000000
    } else {
      aggregateLimit = halvedCost;
    }
    let genAggLimit;
    let occAggLimit;
    switch(submission.type){
      case 'oi':
        occAggLimit = aggregateLimit + 1000000
        genAggLimit = aggregateLimit + 2000000
        break;
      case 'ocp':
        {
          switch (submission.limitsRequested){
            case '12':
              occAggLimit = 1000000
              genAggLimit = 2000000
            break;
            case '22':
              occAggLimit = 2000000
              genAggLimit = 2000000
            break;
            case '24':
              occAggLimit = 2000000
              genAggLimit = 4000000
            break;
            case '33':
              occAggLimit = 3000000
              genAggLimit = 3000000
            break;
            case '44':
              occAggLimit = 4000000
              genAggLimit = 4000000
            break;
            case '55':
              occAggLimit = 5000000
              genAggLimit = 5000000
            break;
          }
        }

    }

    let contractorLimits = '';

    if (submission.type == 'ocp') {
      contractorLimits = calcContractorLimits(parseInt(submission.totalCost), submission.projectAddress.projectState, submission.exteriorWorkFourStories, submission.verticalExpansion)
    }

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
      projectScope: submission.projectScope,
      projectTerm: `${submission.anticipatedStartDate.toLocaleDateString()} to ${submission.anticipatedFinishDate.toLocaleDateString()} `,
      projectCosts: `$${utilities.commifyNumber(parseInt(submission.totalCost))}`,
      gcKnown: submission.generalContractorKnown == 'true' ? 'Yes' : 'No',
      gcName: utilities.isDefined(submission.generalContractorName) ? submission.generalContractorName : '',
      gcCarrier: utilities.isDefined(submission.generalLiabilityCarrier) ? submission.generalLiabilityCarrier : '',
      glExpirationDate: utilities.isDefined(submission.generalContractorExpirationDate) && submission.generalContractorExpirationDate != null ? submission.generalContractorExpirationDate.toLocaleDateString() : '',
      gcSupervisingSubs: submission.otherSubcontractorsPaid == 'true' ? 'Yes' : 'No',
      glLimit: `$${utilities.commifyNumber(submission.generalContractorAmount)}`,
      argoEmail: config.argoEmail,
      willHaveOtherNamed: utilities.isDefined(submission.secondaryNameInsuredName) && submission.secondaryNameInsuredName.length > 1 ? 'Yes' : 'No',
      otherRole: utilities.isDefined(submission.secondaryNameInsuredRole) ? submission.secondaryNameInsuredRole : 'N/A',
      otherRelationship: utilities.isDefined(submission.secondaryNameInsuredRelationship) ? submission.secondaryNameInsuredRelationship : 'N/A',
      otherContractors: submission.otherSubcontractorsPaid == 'true' ? 'Yes' : 'No',
      otherName: utilities.isDefined(submission.secondaryNameInsuredName) ? submission.secondaryNameInsuredName : 'No AI Entities Submitted',
      otherAddress: utilities.isDefined(submission.secondaryNameInsuredAddress) ? submission.secondaryNameInsuredAddress : '',
      otherCity:utilities.isDefined(submission.secondaryNameInsuredCity) ? submission.secondaryNameInsuredCity : '',
      otherState:utilities.isDefined(submission.secondaryNameInsuredState) ? submission.secondaryNameInsuredState : '',
      otherZip:utilities.isDefined(submission.secondaryNameInsuredZipcode) ? submission.secondaryNameInsuredZipcode : '',
      greaterThanTwoAdditional: submission.additionalInsuredOther == 'true' ? 'Yes' : 'No',
      additionalName: utilities.isDefined(submission.additionalInsuredName) ? submission.additionalInsuredName : 'No Additional Insured',
      additionalRole: utilities.isDefined(submission.additionalInsuredRole) ? submission.additionalInsuredRole : 'N/A',
      additionalRelationship: utilities.isDefined(submission.additionalInsuredRelationship) ? submission.additionalInsuredRelationship : 'N/A',
      occurenceLimit: `$${utilities.commifyNumber(occAggLimit)}`,
      aggregateLimit: `$${utilities.commifyNumber(genAggLimit)}`,
      occupancyAccess: utilities.isDefined(submission.occupancyAccess) ? submission.occupancyAccess : '',
      occupancyCameras: utilities.isDefined(submission.occupancyCameras) ? submission.occupancyCameras : '',
      occupancyDoorman: utilities.isDefined(submission.occupancyDoorman) ? submission.occupancyDoorman : '',
      occupancySecurityPersonnel: utilities.isDefined(submission.occupancySecurityPersonnel) ? submission.occupancySecurityPersonnel : '',
      occupancySeparateEntry: utilities.isDefined(submission.occupancySeparateEntry) ? submission.occupancySeparateEntry : '',
      occupancyStairwells: utilities.isDefined(submission.occupancyStairwells) ? submission.occupancyStairwells : '',
      occupancylossInFiveYears: utilities.isDefined(submission.occupancylossIn5Years) ? submission.occupancylossIn5Years : '',
      occupancySquareFootage: utilities.isDefined(submission.occupancySquareFootage) ? submission.occupancySquareFootage : '',
      occupancyUnits: utilities.isDefined(submission.occupancyUnits) ? submission.occupancyUnits : '',
      occupancyCoverage: submission.occupancyCoverage == 'true' ? 'Yes' : 'No',
      occupancyType: utilities.isDefined(submission.occupancyType) ? submission.occupancyType : '',
      safetyPrecautions: utilities.isDefined(submission.exteriorDemoPrecautions) ? submission.exteriorDemoPrecautions : 'No',
      demoTerm: utilities.isDefined(submission.exteriorDemoTerm) ? submission.exteriorDemoTerm : '',
      demoCosts: utilities.isDefined(submission.exteriorDemoCost) ? submission.exteriorDemoCost : '',
      demoSubcontractor: utilities.isDefined(submission.exteriorDemoSubcontractor) ? submission.exteriorDemoSubcontractor : '',
      towerCraneUse: utilities.isDefined(submission.towerCraneUse) && submission.towerCraneUse == 'true' ? 'Yes' : 'No',
      workStartDate: utilities.isDefined(submission.workStartDate) && submission.workStartDate != null ? submission.workStartDate.toLocaleDateString() : '',
      workDescription: utilities.isDefined(submission.workStartDescription) ? submission.workStartDescription : '',
      workCost: utilities.isDefined(submission.totalSpent) ? `$${utilities.commifyNumber(submission.totalSpent)}` : '',
      workGCResponsible: utilities.isDefined(submission.priorGcResponsible) ? submission.priorGcResponsible : '',
      brokerName: submission.broker.name,
      deductibleText: submission.insuredAddress && submission.insuredAddress.state === 'NY' ? '$10,0000' : '$2,500',
      anticipatedFinishDate: utilities.isDefined(submission.anticipatedFinishDate) ? submission.anticipatedFinishDate : '',
      projectDefinedAreaScope: submission.projectDefinedAreaScope == 'true' ? 'Yes' : 'No',
      projectDefinedAreaScopeDetails: utilities.isDefined(submission.projectDefinedAreaScopeDetails) ? submission.projectDefinedAreaScopeDetails : '',
      projectRequirements: utilities.isDefined(submission.projectRequirements) ? submission.projectRequirements : '',
      limitsRequested: submission.limitsRequested ? limitsRequested[0][submission.limitsRequested] : 'N/A',
      excessLimits: `$ ${utilities.commifyNumber(parseInt(submission.excessLimitAmount))}`,
      baseExcess: utilities.isDefined(submission.rating[type]) && submission.rating[type].instantQuote ? `$ ${utilities.commifyNumber(submission.rating[type].excessPremium)}`: '',
      terrorExcess: utilities.isDefined(submission.rating[type]) && submission.rating[type].instantQuote ?  `$ ${utilities.commifyNumber(submission.rating[type].excessTerrorPremium)}`: '',
      totalExcess: utilities.isDefined(submission.rating[type]) && submission.rating[type].instantQuote ?  `$ ${utilities.commifyNumber(submission.rating[type].totalExcessPremium)}`: '',
      contractorLimits: contractorLimits,
      verticalAddition: submission.verticalExpansion == 'true' ? 'Yes': 'No',
      overFourFloors: submission.exteriorWorkFourStories == 'true' ? 'Yes' : 'No',
      multipleLocations: submission.servicingSeveralLocations == 'true' ? 'Yes': 'No',
      nychaProject: submission.nycha == 'true' ? 'Yes': 'No',
      specificFloors: submission.specificFloors == 'true' ? 'Yes': 'No',
      specificFloorsDetails: utilities.isDefined(submission.specificFloorsDetails) ? submission.specificFloorsDetails : '',
      sidewalkMaintaining: utilities.isDefined(submission.sidewalkMaintaining) ? submission.sidewalkMaintaining : '',
      sidewalkDetails: utilities.isDefined(submission.sidewalkDetails) ? submission.sidewalkDetails : '',
      anticipatedFinishDate: submission.anticipatedFinishDate.toISOString(),
      anticipatedStartDate: submission.anticipatedStartDate.toISOString(),
      projectRequirements: submission.projectRequirements == 'true' ? 'Yes': 'No',
      willHaveDemo: submission.exteriorDemo == 'true' ? 'Yes':'No',
      willHaveOccupancy: submission.occupancy == 'true' ? 'Yes': 'No',
      site1Details:submission.otherSitesAdditional1 == 'true' ? `${submission.otherSiteAddress1} ${submission.otherSiteCity1}, ${submission.otherSiteState1} ${submission.otherSiteZipcode1}` : '',
      site2Details:submission.otherSitesAdditional2 == 'true' ? `${submission.otherSiteAddress2} ${submission.otherSiteCity2}, ${submission.otherSiteState2} ${submission.otherSiteZipcode2}` : '',
      site3Details:submission.otherSitesAdditional3 == 'true' ? `${submission.otherSiteAddress3} ${submission.otherSiteCity3}, ${submission.otherSiteState3} ${submission.otherSiteZipcode3}` : '',
      site4Details:submission.otherSitesAdditional4 == 'true' ? `${submission.otherSiteAddress4} ${submission.otherSiteCity4}, ${submission.otherSiteState4} ${submission.otherSiteZipcode4}` : '',
      generalComments: utilities.isDefined(submission.generalComments) ? submission.generalComments : '',
      greaterThanTwoNamed: submission.secondaryNameInsuredOther == 'true' ? 'Yes': 'No',
      workStarted: submission.workStarted == 'true' ? 'Yes' : 'No'


    }
    if (submission.secondaryNameInsuredOther == 'true') {
      pdfData.hasOtherNamedInsuredExist = true;
    }
    if (submission.additionalInsuredOther == 'true' ) {
      pdfData.hasAdditionalInsuredExist = true;
    }

    if (submission.servicingSeveralLocations == 'true') {
      pdfData.multipleLocationsYes = true;
    }

    if (submission.contractorSameAllSites == 'true'){
      pdfData.contractorSameAllSitesYes = true;
    }

    if (submission.workStarted == 'true') {
      pdfData.workStartedYes = true;
    }

    if (submission.occupancy == 'true') {
      pdfData.willHaveOccupancyYes = true;
    }

    if (submission.exteriorDemo == 'true') {
      pdfData.willHaveDemoYes = true
    }

    if (submission.broker.name === 'Marsh USA Inc./R-T Specialty'){
      pdfData.marshBroker = true;
    }

    if (submission.specificFloors == 'true') {
      pdfData.specificFloorsYes = true;
    }

    if (submission.sidewalkMaintaining == 'Other') {
      pdfData.sidewalkMaintainingOther = true
    }

    if (submission.projectRequirements == 'true') {
      pdfData.willHaveDangerous = true;
    }

    console.log(pdfData);
    return pdfData;
  } catch (err) {
    console.log(err)
  }
}

function calcContractorLimits(costs, state, fourFloors, verticalExpansion) {
  let minimumOcc = 1
  let minimumAgg = 2
  switch (state) {
    case 'New York': {
      let halvedCost = Math.ceil((((costs/ 2) * 1000000) / 1000000) / 1000000);
      if ((halvedCost) > minimumAgg) {
        minimumAgg = halvedCost;
        minimumOcc = halvedCost;
      }
    }
    break;
    default:
     if (costs > 10000000 && costs < 20000000) {
        minimumAgg = 5;
        minimumOcc = 5
      } else if (costs > 20000000) {
        minimumAgg = 10;
        minimumOcc = 10
      }
    }

    if (fourFloors == 'true' && minimumAgg < 5) {
      minimumAgg = 5;
      minimumOcc = 5
    }

    if (verticalExpansion == 'true' && minimumAgg < 10) {
      minimumAgg = 10;
      minimumOcc = 10;
    }

    return `$${minimumOcc}M/${minimumAgg}M`
  }

