import request from 'request';
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
				uri: `http://localhost:3000/api/rating/${appId}/calcRating`,
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
					let submission = createSubmissionObject(req.body, result);

					submission.broker = broker;
					submission.submittedBy = user;

					createNewSubmission(submission)
						.then(newSub => {
							if (newSub.quotedPremium > 0) {
								if (newSub.broker.name.includes('Marsh') || newSub.broker.name.includes('test')) {
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
				} else
						emailService.sendSubmissionEmail('nonQuoteArgo', argoEmail, submission, config.argoNonQuoteTemplate,pdfArray);
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

function createSubmissionObject(subInfo, quoteInfo) {
	let premium;
	let terrorismPremium;
	let additionalCoverage;
	let totalPremium;
	let totalCost;
	let excessTerror;
	let ocpTerror
	const today = new Date();

	if (quoteInfo.oi.premium > 0) {
		premium = quoteInfo.oi.premium;
		terrorismPremium = Math.round(0.05 * premium);
		if (premium < 25000) {
			additionalCoverage = 125;
		} else {
			additionalCoverage = 250
		}

		totalPremium = terrorismPremium + premium + additionalCoverage;
		const inspectionCost = 325
		totalCost = totalPremium + inspectionCost
	}

	if (quoteInfo.oi.excessPremium > 0) {
		excessTerror = Math.round(0.05 * quoteInfo.oi.excessPremium)
	}

	if (quoteInfo.ocp.premium > 0) {
		ocpTerror = Math.round(0.05 * quoteInfo.ocp.premium)
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
		oiPremium: {
			quotedPremium: premium,
			terrorPremium: terrorismPremium,
			additionalCoverage: additionalCoverage,
			totalPremium: totalPremium,
			totalCost: totalCost,
			excessPremium: quoteInfo.excessPremium,
			excessTerror: excessTerror,
			excessDetails: subInfo.excessDetails
			},
		ocpPremium: {
			quotedPremium: quoteInfo.ocp.premium,
			terrorPremium: ocpTerror
		},
		status: 'submitted',
		generalComments: subInfo.generalComments,
		demoDetails: subInfo.demoDetails,
    towerCraneUse: subInfo.towerCraneUse,
		greaterThanTwoNamed: subInfo.greaterThanTwoNamedBoolean,
		greaterThanTwoAdditional: subInfo.greaterThanTwoAdditionalBoolean,
		anticipatedFinishDate: subInfo.anticipatedFinishDate,
		projectDefinedAreaScope: subInfo.projectDefinedAreaScope,
		projectRequirements: subInfo.projectRequirements,
		limitsRequested: subInfo.limitsRequested
	}

	return submission;
}

export default {
	getRating,
	getSubmissions,
	getSingleSubmission
}