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
			console.log("fromAuthToken result is");

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
		//console.log("auth from token...");

		User.fromAuthToken(req.headers['x-token']).then((result) => {
			console.log("fromAuthToken result is");
			// console.log(result);

			if (!result || !result.user) {
				return res.status(403).json({
					type: "AuthError",
					message: "Access forbidden. Invalid user token."
				});
			}

			const params = JSON.stringify(req.body);
			const user = result.user;
			const newAuthToken = result.authToken;
			let broker;

			Broker.findById(user._brokerId).exec((err, brkr) => {
				// console.log("err?");
				// console.log(err);

				broker = brkr;
			});
			// console.log("Broker is");
			request({
				method: 'POST',
				uri: `http://ratingsapi-dev.herokuapp.com/api/rating/${appId}/calcRating`,
				body: params,
				headers: {
					'Content-Type': 'application/json'
				}
			}, function (err, response, body) {
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
								sendSubmissionEmailArgo(newSub);
								sendSubmissionEmailClient(newSub);
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
			}).bind(this);
		});

	} catch (err) {
		return res.status(500)
	}
}

function sendSubmissionEmailArgo(submission) {
	console.log('---generating GL PDF sendSubmissionEmailArgo---')
	let pdfArray = [];
	console.log(submission.pdfToken)

	generateBindOrderPDF(submission.pdfToken)
	.then(bindpdf => {
		pdfArray.push({
			title: 'Owners Bind Order.pdf',
			content: bindpdf
		})

		generateColonyOwnersInterestQuestionnairePDF(submission.pdfToken)
		.then(bindpdf => {

			pdfArray.push({
				title: 'Colony Owners Interest Questionnaire.pdf',
				content: bindpdf
			})

			generateSubmissionPDF(submission.pdfToken)
				.then(glpdf => {
					pdfArray.push({
						title: `Owners EDGE Quotation - General Liability.pdf`,
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
		generateColonyOwnersInterestQuestionnairePDF(submission.pdfToken)
		.then(bindpdf => {
			pdfArray.push({
				title: 'Colony Owners Interest Questionnaire.pdf',
				content: bindpdf
			})

			generateSubmissionPDF(submission.pdfToken)
				.then(glpdf => {
					pdfArray.push({
						title: `Owners EDGE Quotation - General Liability.pdf.pdf`,
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
								emailService.sendSubmissionEmail('quotedBroker', submission.contactInfo.email, submission, config.brokerTemplateId, pdfArray);
							})
					} else
						emailService.sendSubmissionEmail('quotedBroker', submission.contactInfo.email, submission, config.brokerTemplateId, pdfArray);
				});
		});

	});
}

function sendNonQuoteEmailArgo(submission) {
	emailService.sendSubmissionEmail('nonQuoteArgo', argoEmail, submission, config.argoNonQuoteTemplate, null);
}

function sendNonQuoteEmailBroker(submission) {
	emailService.sendSubmissionEmail('nonQuoteBroker', submission.contactInfo.email, submission, config.gubrokerNonQuoteTemplate, null);
}



async function createNewSubmission(submission) {
	return await submissionService.createSubmission(submission);
}

async function getAllSubmissionsByBroker(brokerId) {
	return await submissionService.getAllSubmissionsByBroker(brokerId);
}

async function generateSubmissionPDF(token) {
	let pdf = await submissionService.generateSubmissionPDF(token);
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
	const today = new Date();

	if (quoteInfo.premium > 0) {
		premium = quoteInfo.premium;
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


	let submission = {
		primaryNamedInsured: subInfo.primaryNamedInsured,
		namedInsuredAddress: subInfo.namedInsuredAddress,
		hasOtherNamedInsured: subInfo.otherNamedInsuredBoolean,
		otherNamedInsured: subInfo.otherNamedInsured,
		hasAdditionalInsured: subInfo.additionalInsuredBoolean,
		additionalInsured: subInfo.additionalInsured,
		projectAddress: subInfo.address,
		scope: subInfo.scope,
		term: subInfo.term,
		costs: subInfo.costs,
		generalContractorInfo: subInfo.generalContractor,
		occupancyDetails: subInfo.occupancyDetails,
		workDetails: subInfo.workDetails,
		contactInfo: subInfo.contactInfo,
		quotedPremium: premium,
		status: 'submitted',
		terrorPremium: terrorismPremium,
		additionalCoverage: additionalCoverage,
		totalPremium: totalPremium,
		totalCost: totalCost,
		excessPremium: quoteInfo.excessPremium,
		excessDetails: subInfo.excessDetails,
		generalComments: subInfo.generalComments,
		demoDetails: subInfo.demoDetails,
        towerCraneUse: subInfo.towerCraneUse
	}
	return submission;
}

export default {
	getRating,
	getSubmissions,
	getSingleSubmission
}