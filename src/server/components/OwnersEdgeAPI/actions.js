import request from 'request';
import rp from 'request-promise';
import filter from 'lodash/filter';
import config from '../../../config';
import { User, Broker } from '../../models';

import * as emailService from '../../services/email';
import  * as submissionService  from  '../../services/submission';
import * as pdfService from '../../services/pdf';

import { edgeSubmissionService, businessMatchingService } from '../../services'
import {
  utilities
} from '../../utils'

const appId = config.appId;
const argoEmail = config.argoEmail;
const sgsEmail = config.sgsEmail;
const ratingsUrl = config.ratingsUrl;

async function getClearance(req, res) {
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

			const name = req.query.name || '';

			const projectAddress = {
				address:req.query.projectAddress || '',
				city:req.query.projectCity || '',
				state:req.query.projectState || '',
				zipcode:req.query.projectZipcode || '',
			}

			const insuredAddress = {
				address:req.query.insuredAddress || '',
				city:req.query.insuredCity || '',
				state:req.query.insuredState || '',
				zipcode:req.query.insuredZipcode || '',
			}

			Promise.all([submissionService.getAllSubmissions(), edgeSubmissionService.getAllSubmissionsByState(insuredAddress.state)])
			.then(function(resp){
				const submissions = resp[0].map(
					(s)=>({
						compName:	name,
						webName:	s.primaryInsuredName,
						compAddress: `${projectAddress.address} ${projectAddress.city} ${projectAddress.state} ${s.projectAddress.zipcode}`,
						webAddress: `${s.projectAddress.projectAddress} ${s.projectAddress.projectCity} ${s.projectAddress.projectState} ${s.projectAddress.projectZipcode}`
					})
				).concat(resp[1].map(
					(s)=>({
						compName:	name,
						webName:	s.CUST_NAME,
						compAddress:	`${insuredAddress.address} ${insuredAddress.city} ${insuredAddress.state} ${insuredAddress.zipcode}`,
						webAddress:`${s.ADDRESS_1} ${s.CITY} ${s.STATE} ${s.ZIP_CODE}`
					})
				))
				

				businessMatchingService.getBusinessMatching(
					submissions
				).then((resp)=>{
					return res.status(200).json({
						success: resp.success,
						matches: resp.matches
					});
				})
				.catch(error => {
					return res.status(200).json({
						success: false
					});
				})
			})
		}).catch(error => {
			return res.status(403).json({
				type: 'TokenExpired',
				message: 're-login to get new token',
			});
		})

	} catch (err) {
		return res.status(500)
	}
}

async function getRating(req, res) {
	try {
		if (!req.headers['x-token']) {
			return res.status(401).json('Authorization token required');
		}
		let result = await User.fromAuthToken(req.headers['x-token']);

		if (!result || !result.user) {
			return res.status(403).json({
				type: "AuthError",
				message: "Access forbidden. Invalid user token."
			});
		}

		const user = result.user;
		const newAuthToken = result.authToken;
		let broker = await Broker.findById(user._brokerId).exec()

		let paramsObject = req.body
		paramsObject.broker = broker
		paramsObject.submittedBy = user


		let ratingResult = await getRatingInternal(paramsObject)

		let ratingObject = JSON.parse(ratingResult)
		return res.status(200).json({
			success: true,
			rating: ratingObject.results,
			authToken: newAuthToken
		});
	}
	catch (err) {

	}
}

async function saveSubmission(req, res) {
	try {
		if (!req.headers['x-token']) {
			return res.status(401).json('Authorization token required');
		}

		let result = await User.fromAuthToken(req.headers['x-token']);
			if (!result || !result.user) {
				return res.status(403).json({
					type: "AuthError",
					message: "Access forbidden. Invalid user token."
				});
			}
		const user = result.user;
		const newAuthToken = result.authToken;
		let broker = await Broker.findById(user._brokerId).exec()
		let submission = req.body;
		submission.broker = broker;
		submission.submittedBy = user;

		const newId = await submissionService.createSubmission(submission);
		return res.status(200).json({success: true, submissionId: newId})
	}
	catch (err) {
		return res.status(500).json(err)
	}
}

async function getPDF(req, res) {
	try {
		if (!req.headers['x-token']) {
			return res.status(401).json('Authorization token required');
		}
		let result = await User.fromAuthToken(req.headers['x-token']);
			if (!result || !result.user) {
				return res.status(403).json({
					type: "AuthError",
					message: "Access forbidden. Invalid user token."
				});
			}
		const user = result.user;
		const newAuthToken = result.authToken;
		const pdfArray = await generatePDFsInternal(req.params.submissionId);
		return res.status(200).json({success: true, pdfs: pdfArray});
	}
	catch (err) {
	}
}

async function sendEmail(req, res) {
	try {
		if (!req.headers['x-token']) {
			return res.status(401).json('Authorization token required');
		}
		let result = await User.fromAuthToken(req.headers['x-token']);

		if (!result || !result.user) {
			return res.status(403).json({
				type: "AuthError",
				message: "Access forbidden. Invalid user token."
			});
		}

		const user = result.user;
		const newAuthToken = result.authToken;

		await sendEmailInternal(req.params.id, req.body.emailAddress, req.body.emailType)
		return res.status(200).json({success: true});
	}
	catch (err) {

	}
}

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

			submissionService.getSubmissionsByBroker(user._brokerId)
			.then(function(submissions){
				return res.status(200).json({
					success: true,
					submissions: submissions
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

async function getBroker(req, res) {
  try {

	if (!req.headers['x-token']) {
		return res.status(401).json('Authorization token required');
	}

    Broker.findById(req.params.id).exec()
      .then(broker => {
        return res.status(200).json({
          success: true,
          broker
        });
      })
		  .catch(error => {
        return res.status(403).json({
          type: 'TokenExpired',
          message: 're-login to get new token',
			});
		});

	} catch (err) {
		return res.status(500)
	}
}

async function getSingleSubmission(req, res) {
	const id = req.params.id || '';
}

async function getRatingInternal(paramsObject) {
	const params = JSON.stringify(paramsObject);
	return await rp(`${ratingsUrl}/api/calcrating/${paramsObject.type}`, {
		method: 'POST',
		body: JSON.stringify(paramsObject),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

async function sendEmailInternal(submissionId, emailAddress, emailType) {

	const submission = await submissionService.getSubmissionById(submissionId);
  const pdfArray = await generatePDFsInternal(submissionId);

	let templateId;

	switch (emailType) {
		case 'nonQuoteArgo':
			templateId = config.argoNonQuoteTemplate;
			break;
		case 'nonQuoteBroker':
			templateId = config.brokerNonQuoteTemplate;
			break;
		case 'quotedArgo':
			templateId = config.argoTemplateId;
			break;
		case 'quotedBroker':
			templateId = config.brokerTemplateId;
			break;
	}
	console.log('got pdfs - on to mail')
	return await emailService.sendMail(emailType, emailAddress, submission, templateId, pdfArray);
}

async function generatePDFsInternal(submissionId) {
	console.log('generating pdf')
	const submission = await submissionService.getSubmissionById(submissionId);
	let pdfArray = [];

	let bindOrder = await pdfService.generatePDF(submission.pdfToken, 'bind');
	let oiQuote = await pdfService.generatePDF(submission.pdfToken, 'oi');
	let excessQuote = await pdfService
	pdfArray = [{title:`Owner's Edge Bind Order`, content: bindOrder},
											{title:`Owner's Interest - General Quote`, content: oiQuote}]
	if (submission.type === 'ocp') {
		let ocpQuote = await pdfService.generatePDF(submission.pdfToken, 'ocp');
		pdfArray = [...pdfArray, {title:`Owner's Contractor's Protective Quote`, content: ocpQuote}];
	}
	if (utilities.isDefined(submission.rating[submission.type].excessPremium) && submission.rating[submission.type].excessPremium > 0) {
		let excessQuote = await pdfService.generatePDF(submission.pdfToken, 'excess');
		pdfArray = [...pdfArray, {title: `Owner's Interest - Excess Quote`, content: excessQuote}];
	}
	console.log('finished generating pdfs');
	return pdfArray;
}

export default {
	getRating,
	sendEmail,
	getSubmissions,
	getClearance,
	getSingleSubmission,
  	getBroker,
	saveSubmission
}
