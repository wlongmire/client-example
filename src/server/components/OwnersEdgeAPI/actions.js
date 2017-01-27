import request from 'request';
import filter from 'lodash/filter';
import config from '../../../config';
import { User, Broker } from '../../models';
import { emailService, submissionService } from '../../services';

const appId = config.appId;
const argoEmail = config.argoEmail;

async function getSubmissions(req, res) {
     	try {

		if (!req.headers['x-token']) {
			return res.status(401).json('Authorization token required');
		}

		User.fromAuthToken(req.headers['x-token']).then((result) => {

			if (!result || !result.user) {
				return res.status(403).json({
					type: "AuthError",
					message: "Access forbidden. Invalid user token."
				});
			}

			const user = result.user;

			getAllSubmissionsByBroker(user._brokerId)
			.then(function(submissions){
				return res.status(200).json({
					success: true,
					submissions: submissions,
					//authToken: newAuthToken
				});
			})

		})
		.catch(error => {
			return res.status(403).json({
				type: 'TokenExpired',
				message: 're-login to get new token',
			});
		})

	} catch (err) {
		return res.status(500)
	}
}

async function getSingleSubmission(req, res) {
	const id = req.params.id || '';
}

async function getRating(req, res) {

	try {

		if (!req.headers['x-token']) {
			return res.status(401).json('Authorization token required');
		}

		User.fromAuthToken(req.headers['x-token']).then((result) => {

			if (!result || !result.user) {
				return res.status(403).json({
					type: "AuthError",
					message: "Access forbidden. Invalid user token."
				});
			}

			const user = result.user;
			const newAuthToken = result.authToken;
			Broker.findById(user._brokerId).exec()
				.then(broker => {

			let paramsObject = req.body;
			paramsObject.broker = broker;
			const params = JSON.stringify(paramsObject);


			request({
				method: 'POST',
				uri: `http://ratings-dev.argodigitalventures.com/api/rating/${appId}/calcRating`,
				body: params,
				headers: {
					'Content-Type': 'application/json'
				}
			}, (err, response, body)=> {
				if (err) {
					return res.status(response.statusCode).json({
						success: false,
						type: err.type,
						message: err.message
					});
				} else {
					const result = JSON.parse(body);
					console.log(result);
					let submission = createSubmissionObject(req.body, result);

					submission.broker = broker;
					submission.submittedBy = user;

					createNewSubmission(submission)
						.then(newSub => {
							//default is oi because both submissions have that.
							if (newSub.oiPremium.quotedPremium > 0) {
								if (newSub.broker.type ==='Retail A') {
										sendSubmissionEmailClient(newSub);
									}
								sendSubmissionEmailArgo(newSub);
								return res.status(response.statusCode).json({
									success: true,
									submission: newSub,
									authToken: newAuthToken
								});
							} else {
								sendNonQuoteEmailArgo(newSub)
								sendNonQuoteEmailBroker(newSub)
								return res.status(response.statusCode).json({
									success: true,
									submission: newSub,
									authToken: newAuthToken
								});
							}
						});
				}
			});
		});
	});
	} catch (err) {
		return res.status(500)
	}
}

function sendSubmissionEmailArgo(submission) {
	console.log('---generating GL PDF sendSubmissionEmailArgo---')
	let pdfArray = [];

	generateBindOrderPDF(submission.pdfToken)
	.then(bindpdf => {
		pdfArray.push({
			title: 'Owners Bind Order.pdf',
			content: bindpdf
		})

			if(submission.type === 'ocp') {

				generateOwnersContractorsProtectivePDF(submission.pdfToken)
					.then(glpdf => {
						pdfArray.push({
							title: 'Owners and Contractors Protective - General Liability',
							content: glpdf
						})
						generateOwnersEdgeQuotationPDF(submission.pdfToken)
							.then(glpdf => {
								pdfArray.push({
									title: 'Owners EDGE Quotation - General Liability.pdf',
									content: glpdf
								})
								if (submission.excessPremium > 0) {
									console.log('---generating Excess PDF---')
									generateExcessPDF(submission.pdfToken)
										.then(excessPdf => {
											pdfArray.push({
												title: `Owners Edge-Submission ${submission.confirmationNumber}-Excess.pdf`,
												content: excessPdf
											})
											emailService.sendSubmissionEmail('quotedArgo', argoEmail, submission, config.argoTemplateId, pdfArray);
										})
								} else
									emailService.sendSubmissionEmail('quotedArgo', argoEmail, submission, config.argoTemplateId, pdfArray);
							});
					});
			}else{

				generateOwnersEdgeQuotationPDF(submission.pdfToken)
					.then(glpdf => {
						pdfArray.push({
							title: 'Owners EDGE Quotation - General Liability.pdf',
							content: glpdf
						})
						if (submission.excessPremium > 0) {
							console.log('---generating Excess PDF---')
							generateExcessPDF(submission.pdfToken)
								.then(excessPdf => {
									pdfArray.push({
										title: `Owners Edge-Submission ${submission.confirmationNumber}-Excess.pdf`,
										content: excessPdf
									})
									emailService.sendSubmissionEmail('quotedArgo', argoEmail, submission, config.argoTemplateId, pdfArray);
								})
						} else
							emailService.sendSubmissionEmail('quotedArgo', argoEmail, submission, config.argoTemplateId, pdfArray);
					});
			}

		});
}


function sendSubmissionEmailClient(submission) {
	console.log('---generating GL PDF sendSubmissionEmailClient---')
	let pdfArray = [];
	generateBindOrderPDF(submission.pdfToken)
	.then(bindpdf => {
		pdfArray.push({
			title: 'Owners Bind Order.pdf',
			content: bindpdf
		})

			if(submission.type === 'ocp') {

				generateOwnersContractorsProtectivePDF(submission.pdfToken)
					.then(glpdf => {
						pdfArray.push({
							title: 'Owners and Contractors Protective - General Liability',
							content: glpdf
						})
						generateOwnersEdgeQuotationPDF(submission.pdfToken)
							.then(glpdf => {
								pdfArray.push({
									title: 'Owners EDGE Quotation - General Liability.pdf',
									content: glpdf
								})
								if (submission.excessPremium > 0) {
									console.log('---generating Excess PDF---')
									generateExcessPDF(submission.pdfToken)
										.then(excessPdf => {
											pdfArray.push({
												title: `Owners Edge-Submission ${submission.confirmationNumber}-Excess.pdf`,
												content: excessPdf
											})
											emailService.sendSubmissionEmail('quotedArgo', argoEmail, submission, config.argoTemplateId, pdfArray);
										})
								} else{
                                   emailService.sendSubmissionEmail('quotedArgo', argoEmail, submission, config.argoTemplateId, pdfArray);
								}

							});
					});
			}else{

				generateOwnersEdgeQuotationPDF(submission.pdfToken)
					.then(glpdf => {
						pdfArray.push({
							title: 'Owners EDGE Quotation - General Liability.pdf',
							content: glpdf
						})
						if (submission.excessPremium > 0) {
							console.log('---generating Excess PDF---')
							generateExcessPDF(submission.pdfToken)
								.then(excessPdf => {
									pdfArray.push({
										title: `Owners Edge-Submission ${submission.confirmationNumber}-Excess.pdf`,
										content: excessPdf
									})
									emailService.sendSubmissionEmail('quotedArgo', argoEmail, submission, config.argoTemplateId, pdfArray);
								})
						} else{
                emailService.sendSubmissionEmail('quotedArgo', argoEmail, submission, config.argoTemplateId, pdfArray);
						}

					});
			}

		});
}

function sendNonQuoteEmailArgo(submission) {
	let pdfArray = [];

	if(submission.type === 'ocp') {

		generateOwnersContractorsProtectivePDF(submission.pdfToken)
				.then(glpdf => {
					pdfArray.push({
						title: 'Owners and Contractors Protective - General Liability',
						content: glpdf
					})
					emailService.sendSubmissionEmail('quotedArgo', argoEmail, submission, config.argoTemplateId, pdfArray);
			});

	}else{

		generateOwnersEdgeQuotationPDF(submission.pdfToken)
			.then(glpdf => {
				pdfArray.push({
					title: `Owners EDGE Quotation - General Liability.pdf.pdf`,
					content: glpdf
				});
				console.log('--finished generating GL PDF---');
				if (submission.excessPremium > 0) {
					console.log('---generating Excess PDF---')
					generateExcessPDF(submission.pdfToken)
						.then(excessPdf => {
							pdfArray.push({
								title: `Owners Edge-Submission ${submission.confirmationNumber}-Excess.pdf`,
								content: excessPdf
							})
							console.log('---sending non-quoted email---')
							emailService.sendSubmissionEmail('nonQuoteArgo', argoEmail, submission, config.argoNonQuoteTemplate, pdfArray);
						})
				} else{
                  emailService.sendSubmissionEmail('nonQuoteArgo', argoEmail, submission, config.argoNonQuoteTemplate,pdfArray);
				}

			});

	}


}

function sendNonQuoteEmailBroker(submission) {
	emailService.sendSubmissionEmail('nonQuoteBroker', submission.contactInfo.email, submission, config.brokerNonQuoteTemplate, null);
}



async function createNewSubmission(submission) {
	return await submissionService.createSubmission(submission);
}

async function getAllSubmissionsByBroker(brokerId) {
	return await submissionService.getAllSubmissionsByBroker(brokerId);
}

async function generateOwnersEdgeQuotationPDF(token) {
	let pdf = await submissionService.generateOwnersEdgeQuotationPDF(token);
	return pdf;
}

async function generateBindOrderPDF(token) {
	let pdf = await submissionService.generateBindOrderPDF(token);
	return pdf;
}

async function generateColonyOwnersInterestQuestionnairePDF(token) {
	let pdf = await submissionService.generateColonyOwnersInterestQuestionnairePDF(token);
	return pdf;
}

async function generateOwnersContractorsProtectivePDF(token) {
	let pdf = await submissionService.generateOwnersContractorsProtectivePDF(token);
	return pdf;
}

async function generateExcessPDF(token) {
	let pdf = await submissionService.generateExcessPDF(token);
	return pdf;
}

function calcPremium(premium){
  let additionalCoverage;
  const terrorismPremium = Math.round(0.05 * premium);
  if (premium < 25000) {
    additionalCoverage = 125;
  } else {
    additionalCoverage = 250;
  }
  const totalPremium = terrorismPremium + premium + additionalCoverage;
  const inspectionCost = 325;
  const totalCost = totalPremium + inspectionCost;

  return {
    totalPremium,
    totalCost,
    additionalCoverage,
    terrorismPremium
  };
}

function createSubmissionObject(subInfo, quoteInfo) {
	let oiPremium = {};
	let ocpPremium = {};
	const today = new Date();

	if (quoteInfo.oi.premium > 0 ) {

		oiPremium = {
			quotedPremium: quoteInfo.oi.premium,
			terrorPremium: calcPremium(quoteInfo.oi.premium).terrorismPremium,
			additionalCoverage: calcPremium(quoteInfo.oi.premium).additionalCoverage,
			totalPremium: calcPremium(quoteInfo.oi.premium).totalPremium,
			totalCost: calcPremium(quoteInfo.oi.premium).totalCost,
			excessPremium: quoteInfo.excessPremium,
			excessDetails: subInfo.excessDetails
		}
	}

	if (quoteInfo.oi.excessPremium > 0) {
		oiPremium.excessTerror = Math.round(0.05 * quoteInfo.oi.excessPremium)
	}

	if (quoteInfo.ocp.premium > 0 ) {
		ocpPremium = {
			quotedPremium: quoteInfo.ocp.premium,
			totalPremium: calcPremium(quoteInfo.ocp.premium).totalPremium,
			totalCost: calcPremium(quoteInfo.ocp.premium).totalCost,
			terrorPremium: calcPremium(quoteInfo.ocp.premium).terrorismPremium
		}
	}


	  const limits = [{12:'$1,000,000/2,000,000'},
					{22:'$2,000,000/2,000,000'},
					{24:'$2,000,000/4,000,000'},
					{33:'$3,000,000/3,000,000'},
					{44:'$4,000,000/4,000,000'},
					{55:'$5,000,000/5,000,000'} ];
    let limitsRequested;

    if(subInfo.limitsRequested){
        ocpPremium.limitsRequested = filter(limits, function(o) {
        let key = Object.keys(o);
        return key[0] === String(subInfo.limitsRequested);
      });
    }

	let submission = {
		primaryNamedInsured: subInfo.primaryNamedInsured,
		namedInsuredAddress: subInfo.namedInsuredAddress,
		hasOtherNamedInsured: subInfo.otherNamedInsuredBoolean,
		otherNamedInsured: subInfo.otherNamedInsured,
		hasAdditionalInsured: subInfo.additionalInsuredBoolean,
		additionalInsured: subInfo.additionalInsured,
		projectAddress: subInfo.address,
		scope: subInfo.scope,
		type:subInfo.type,
		term: subInfo.term,
		costs: subInfo.costs,
		generalContractorInfo: subInfo.generalContractor,
		occupancyDetails: subInfo.occupancyDetails,
		workDetails: subInfo.workDetails,
		contactInfo: subInfo.contactInfo,
		status: 'submitted',
		generalComments: subInfo.generalComments,
		demoDetails: subInfo.demoDetails,
        towerCraneUse: subInfo.towerCraneUse,
		greaterThanTwoNamed: subInfo.greaterThanTwoNamedBoolean,
		greaterThanTwoAdditional: subInfo.greaterThanTwoAdditionalBoolean,
		anticipatedFinishDate: subInfo.anticipatedFinishDate,
		projectDefinedAreaScope: subInfo.projectDefinedAreaScope,
		projectDefinedAreaScopeDetails: subInfo.projectDefinedAreaScopeDetails,
		projectRequirements: subInfo.projectRequirements,
		limitsRequested: subInfo.limitsRequested,
		oiPremium: oiPremium
	}

	if(subInfo.type === 'ocp'){
		submission.ocpPremium = ocpPremium;
	}

	return submission;
}

export default {
	getRating,
	getSubmissions,
	getSingleSubmission
}
