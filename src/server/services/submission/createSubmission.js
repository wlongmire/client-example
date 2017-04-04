import { Submission } from '../../models'
import uuid from 'uuid';
import randomstring from 'randomstring';
import { getSubmissionById } from './'

export default async function createSubmission(subInfo, quoteInfo) {
  const submission = createSubmissionObject(subInfo, quoteInfo);
  let sub = Submission.create(submission);
  let confNumber = await generateConfirmationNumber();
  sub.pdfToken = uuid.v4();
  sub.confirmationNumber = confNumber;
  let newSub = await sub.save();
  return getSubmissionById(newSub._id);
}

function createSubmissionObject(subInfo, quoteInfo) {
	let oiPremium = {};
	let ocpPremium = {};

	const today = new Date();
  const inspectionCost = 325;

	if (quoteInfo.success === true && quoteInfo.results.premium > 0 ) {

		oiPremium = {
			quotedPremium:       quoteInfo.results.premium,
			terrorPremium:       quoteInfo.results.oiTerrorPremium,
			additionalCoverage:  quoteInfo.results.oiAdditionalCoverage,
			totalPremium:        quoteInfo.results.totalOiPremium,
			totalCost:           quoteInfo.results.totalOiPremium + inspectionCost,
			excessQuotedPremium: quoteInfo.results.excessPremium,
			excessTerror:        quoteInfo.results.excessTerrorPremium,
			excessTotalPremium:  quoteInfo.results.totalExcessPremium,
			excessDetails:       subInfo.excessDetails
		}
	} else {
		oiPremium = {
			quotedPremium:       0,
			terrorPremium:       0,
			additionalCoverage:  0,
			totalPremium:        0,
			totalCost:           0,
			excessQuotedPremium: 0,
			excessTerror:        0,
			excessTotalPremium:  0,
			excessDetails:       subInfo.excessDetails,
			reason: quoteInfo.results.reason
		}
	}

  const limits = [
    {12:'$1,000,000/2,000,000'},
		{22:'$2,000,000/2,000,000'},
		{24:'$2,000,000/4,000,000'},
		{33:'$3,000,000/3,000,000'},
		{44:'$4,000,000/4,000,000'},
		{55:'$5,000,000/5,000,000'}
  ];

  if(subInfo.limitsRequested){
      ocpPremium.limitsRequested = filter(limits, function(o) {
      let key = Object.keys(o);
      return key[0] === String(subInfo.limitsRequested);
    });
  }

	let submission = {
    status:                   'submitted',
		primaryNamedInsured:      subInfo.primaryNamedInsured,
		namedInsuredAddress:      subInfo.namedInsuredAddress,
		hasOtherNamedInsured:     subInfo.otherNamedInsuredBoolean,
		otherNamedInsured:        subInfo.otherNamedInsured,
		hasAdditionalInsured:     subInfo.additionalInsuredBoolean,
		additionalInsured:        subInfo.additionalInsured,
		projectAddress:           subInfo.address,
		scope:                    subInfo.scope,
		type:                     subInfo.type,
		term:                     subInfo.term,
		costs:                    subInfo.costs,
		generalContractorInfo:    subInfo.generalContractor,
		occupancyDetails:         subInfo.occupancyDetails,
		workDetails:              subInfo.workDetails,
		contactInfo:              subInfo.contactInfo,
		generalComments:          subInfo.generalComments,
		demoDetails:              subInfo.demoDetails,
		towerCraneUse:            subInfo.towerCraneUse,
		greaterThanTwoNamed:      subInfo.greaterThanTwoNamedBoolean,
		greaterThanTwoAdditional: subInfo.greaterThanTwoAdditionalBoolean,
		anticipatedFinishDate:    subInfo.anticipatedFinishDate,
		projectDefinedAreaScope:  subInfo.projectDefinedAreaScope,
		projectDefinedAreaScopeDetails: subInfo.projectDefinedAreaScopeDetails,
		projectRequirements:      subInfo.projectRequirements,
		limitsRequested:          subInfo.limitsRequested,
		oiPremium:                oiPremium,
		instantQuote:             quoteInfo.results.instantQuote,
		supervisingSubs:          subInfo.supervisingSubs,
    excessDetails:            subInfo.excessDetails,
		demoRequired:             subInfo.demoRequired,
		occupancy:                subInfo.occupancy,
    broker:                   subInfo.broker,
    submittedBy:              subInfo.submittedBy
	}

	return submission;
}

async function generateConfirmationNumber() {
  let confirmation = randomstring.generate({
    length: 12,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
  });
  let submission = await Submission.findOne({
    confirmationNumber: confirmation
  }).exec()
  if (!submission) {
    return confirmation
  } else {
    generateConfirmationNumber();
  }
}