import mongoose from 'mongoose';
import * as models from '../models';
import randomstring from 'randomstring';
import pdf from 'html-pdf';
import handlebars from 'handlebars';
import config from '../../config'
import uuid from 'uuid';
import {utilities} from '../utils'
import request from 'request';

async function createSubmission(submission) {
  let sub = new models.Submission(submission);
  let confNumber = await generateConfirmationNumber();
  sub.pdfToken = uuid.v4();
  sub.confirmationNumber = confNumber;
  return await sub.save();
}

async function getAllSubmissions() {
  return await models.Submission.findAll().exec();
}

async function getSubmissionById(id) {
  return await models.Submission.findById(id).exec();
}

async function updateSubmission(id, submission) {
  return await models.Submission.findOneAndUpdate({_id: id}, {$set: submission}).exec();
}

async function getSubmissionByToken(token) {
  return await models.Submission.findOne({pdfToken: token}).exec();
}

function generateSubmissionPDF(token){
return new Promise((resolve,reject) => {
  try {
    generatePDFData({token: token})
     .then(pdfData => {
        request({
          url: config.submissionPDFUrl,
          method: 'GET'
        }, function(err, response, body) {
            let handleTemplate = handlebars.compile(body);
            let html = handleTemplate(Object.assign({}, pdfData));
            pdf.create(html, config.pdfOptions).toBuffer(function(err, buffer){
                console.log('successfully generated PDF');
              return resolve(buffer);
            });
        });
      });
  }
  catch (err) {
    return reject(err);
  }
  })
}

function generateExcessPDF(token) {
  return new Promise((resolve, reject) => {
    try {
    generateExcessPDFData({token: token})
      .then(pdfData => {
        request({
          url: config.excessPDFUrl,
          method: 'GET'
        }, function(err, response, body) {
            let handleTemplate = handlebars.compile(body);
            let html = handleTemplate(Object.assign({}, pdfData));
            pdf.create(html, config.pdfOptions).toBuffer(function(err, buffer){
                console.log('successfully generated Excess PDF');
              return resolve(buffer);
            });
          });
        });
    }
    catch (err) {
      console.log(err.message);
      return reject(err);
    }
  })
}

async function generateExcessPDFData(submissionIdentifier) {
  try {
  let submission;
  if (submissionIdentifier.token) {
    submission = await getSubmissionByToken(submissionIdentifier.token);
  } else {
    submission = await getSubmissionById(submissionIdentifier.token)
  }
  let terrorExcess = Math.round(0.05 * submission.excessPremium);
  let totalExcess = submission.excessPremium + terrorExcess

  const pdfData = {
    namedInsured: submission.primaryNamedInsured,
    excessLimits: `$ ${utilities.commifyNumber(submission.excessDetails.limits)}`,
    baseExcess: `$ ${utilities.commifyNumber(submission.excessPremium)}`,
    terrorExcess: `$ ${utilities.commifyNumber(terrorExcess)}`,
    totalExcess: `$ ${utilities.commifyNumber(totalExcess)}`
  }

  return pdfData;

  }
  catch (err){
    console.log(err.message)
  }

}

async function generatePDFData(submissionIdentifier) {
  try {
  let submission;
  if (submissionIdentifier.token) {
    submission = await getSubmissionByToken(submissionIdentifier.token);
  } else {
    submission = await getSubmissionById(submissionIdentifier.token)
  }

  let terrorismPremium = Math.round(0.05 * submission.quotedPremium);
  let additionalCoverage;
  if (submission.quotedPremium < 25000) {
    additionalCoverage = 125;
  } else {
    additionalCoverage = 250
  }

  let totalPremium = terrorismPremium + submission.quotedPremium + additionalCoverage;
  const inspectionCost = 325
  let totalCost = totalPremium + inspectionCost

  let gcInfo = submission.generalContractorInfo.isKnown === 'yes'

  const pdfData = {
    namedInsured: submission.primaryNamedInsured,
    quotedPremium: `$${utilities.commifyNumber(submission.quotedPremium)}`,
    terrorPremium: `$${utilities.commifyNumber(terrorismPremium)}`,
    addtlPremium: `$${utilities.commifyNumber(additionalCoverage)}`,
    totalPremium: `$${utilities.commifyNumber(totalPremium)}`,
    totalCost: `$${utilities.commifyNumber(totalCost)}`,
    inspectionAmount: `$${utilities.commifyNumber(inspectionCost)}`,
    insuredAddress: submission.namedInsuredAddress.street,
    insuredCity: submission.namedInsuredAddress.city,
    insuredState: submission.namedInsuredAddress.state,
    insuredZip: submission.namedInsuredAddress.zip,
    projectAddress: submission.projectAddress.street,
    projectCity: submission.projectAddress.city,
    projectState: submission.projectAddress.state,
    projectZip: submission.projectAddress.zip,
    createdDate: submission.createdAt.toLocaleDateString(),
    projectScope: submission.scope,
    projectTerm: `${submission.term} months`,
    projectCosts: `$${utilities.commifyNumber(submission.costs)}`,
    gcKnown: submission.generalContractorInfo.isKnown,
    gcName: gcInfo ? submission.generalContractorInfo.name : 'N/A',
    gcCarrier: gcInfo ? submission.generalContractorInfo.name : 'N/A',
    gcLimit: gcInfo ? submission.generalContractorInfo.name : 'N/A',
    gcSubcontractor: gcInfo ? submission.generalContractorInfo.name : 'N/A',
    argoEmail: config.argoEmail,
    otherRole: submission.hasOtherNamedInsured ? submission.otherNamedInsured.role : 'N/A',
    otherRelationship: submission.hasOtherNamedInsured ? submission.otherNamedInsured.relationship: 'N/A',
    otherName: submission.hasOtherNamedInsured ? submission.otherNamedInsured.name : 'N/A',
    commissionRate: `${submission.commission} %`
  }

  return pdfData;
}
 catch (err) {
  console.log(err.message)
 }
}

async function generateConfirmationNumber() {
  let confirmation = randomstring.generate({
    length: 12,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
  });
  let submission = await models.Submission.findOne({confirmationNumber: confirmation}).exec()
  if (!submission) {
    return confirmation
  }
  else {
    generateConfirmationNumber();
  }
}

export default {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  generateSubmissionPDF,
  generateExcessPDF
}