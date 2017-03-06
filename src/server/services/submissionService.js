import mongoose from 'mongoose';
import * as models from '../models';
import randomstring from 'randomstring';
import pdf from 'html-pdf';
import handlebars from 'handlebars';
import config from '../../config'
import uuid from 'uuid';
import filter from 'lodash/filter';
import {
  utilities
} from '../utils'
import request from 'request';

async function createSubmission(submission) {
  let sub = new models.Submission(submission);
  let confNumber = await generateConfirmationNumber();
  sub.pdfToken = uuid.v4();
  sub.confirmationNumber = confNumber;
  let newSub = await sub.save();
  return getSubmissionById(newSub._id);
}

async function getAllSubmissions() {
  return await models.Submission.findAll().exec();
}

async function getAllSubmissionsByBroker(brokerId) {
  return await models.Submission.find({
    broker: brokerId
  }).exec();
}

async function getSubmissionById(id) {
  return await models.Submission.findById(id)
    .populate('broker submittedBy')
    .exec();
}

async function updateSubmission(id, submission) {
  return await models.Submission.findOneAndUpdate({
    _id: id
  }, {
    $set: submission
  }).exec();
}

async function getSubmissionByToken(token) {
  return await models.Submission.findOne({
      pdfToken: token
    })
    .populate('broker submittedBy')
    .exec();
}

function generateHTML(body, pdfData) {
  let handleTemplate = handlebars.compile(body);
  let html = handleTemplate(Object.assign({}, pdfData));
  return html;
}

function generateOwnersEdgeQuotationPDF(token) {
  return new Promise((resolve, reject) => {
    try {
      generatePDFData({
          token: token,
        }, 'oi')
        .then(pdfData => {
          request({
            url: config.ownersEdgeQuotationPDFUrl,
            method: 'GET'
          }, function (err, response, body) {
            let html = generateHTML(body, pdfData);
            pdf.create(html, config.pdfOptions).toBuffer(function (err, buffer) {
              return resolve(buffer);
            });
          });
        });
    } catch (err) {
      return reject(err);
    }
  })
}

function generateBindOrderPDF(token) {
  return new Promise((resolve, reject) => {
    try {
      generatePDFData({
          token: token,
        }, 'oi')
        .then(pdfData => {
          request({
            url: config.ownersBindOrderPDFUrl,
            method: 'GET'
          }, function (err, response, body) {
            let html = generateHTML(body, pdfData);
            pdf.create(html, config.pdfOptions).toBuffer(function (err, buffer) {
              return resolve(buffer);
            });
          });
        });
    } catch (err) {
      return reject(err);
    }
  })
}


function generateOwnersContractorsProtectivePDF(token) {
  return new Promise((resolve, reject) => {
    try {
      generatePDFData({
          token: token,
        }, 'ocp')
        .then(pdfData => {
          request({
            url: config.ownersContractorsProtectivePDFUrl,
            method: 'GET'
          }, function (err, response, body) {
            let html = generateHTML(body, pdfData);
            pdf.create(html, config.pdfOptions).toBuffer(function (err, buffer) {
              return resolve(buffer);
            });
          });
        });
    } catch (err) {
      return reject(err);
    }
  })
}

function generateColonyOwnersInterestQuestionnairePDF(token) {
  return new Promise((resolve, reject) => {
    try {
      generatePDFData({
          token: token,
          type: 'oi'
        })
        .then(pdfData => {
          request({
            url: config.colonyOwnersInterestQuestionnairePDFUrl,
            method: 'GET'
          }, function (err, response, body) {
            let html = generateHTML(body, pdfData);
            pdf.create(html, config.pdfOptions).toBuffer(function (err, buffer) {
              return resolve(buffer);
            });
          });
        });
    } catch (err) {
      return reject(err);
    }
  })
}

function generateExcessPDF(token) {
  console.log('*****Starting Excess Generation****')
  return new Promise((resolve, reject) => {
    try {
      generateExcessPDFData({
          token: token
        })
        .then(pdfData => {
          request({
            url: config.excessPDFUrl,
            method: 'GET'
          }, function (err, response, body) {
            let handleTemplate = handlebars.compile(body);
            let html = handleTemplate(Object.assign({}, pdfData));
            pdf.create(html, config.pdfOptions).toBuffer(function (err, buffer) {
              console.log('successfully generated Excess PDF');
              return resolve(buffer);
            });
          });
        });
    } catch (err) {
      console.log(err.message);
      return reject(err);
    }
  })
}

async function generateExcessPDFData(submissionIdentifier) {
  console.log('****** gathering data for excess PDF *******')
  try {
    let submission;
    if (submissionIdentifier.token) {
      submission = await getSubmissionByToken(submissionIdentifier.token);
    } else {
      submission = await getSubmissionById(submissionIdentifier.token)
    }

    const pdfData = {
      namedInsured: submission.primaryNamedInsured,
      excessLimits: `$ ${utilities.commifyNumber(submission.oiPremium.excessDetails.limits)}`,
      baseExcess: `$ ${utilities.commifyNumber(submission.oiPremium.excessQuotedPremium)}`,
      terrorExcess: `$ ${utilities.commifyNumber(submission.oiPremium.excessTerror)}`,
      totalExcess: `$ ${utilities.commifyNumber(submission.oiPremium.excessTotalPremium)}`,
      brokerName: submission.broker.name
    }

    if (submission.broker.name === 'Marsh USA Inc./R-T Specialty'){
      pdfData.marshBroker = true;
    }

    return pdfData;

  } catch (err) {
    console.log(err.message)
  }

}

async function generatePDFData(submissionIdentifier, type) {
  try {
    let submission;
    if (submissionIdentifier.token) {
      submission = await getSubmissionByToken(submissionIdentifier.token);
    } else {
      submission = await getSubmissionById(submissionIdentifier.token)
    }
    console.log(submission);
    console.log(submission.oiPremium);

    let aggregateLimit;
    let halvedCost = Math.ceil(((submission.costs / 2) * 1000000) / 1000000);
    if (halvedCost < 5000000) {
      aggregateLimit = 5000000
    } else if (aggregateLimit > 50000000) {
      aggregateLimit = 50000000
    } else {
      aggregateLimit = halvedCost;
    }

    let occAggLimit = aggregateLimit + 1000000
    let genAggLimit = aggregateLimit + 2000000

    let gcInfo = submission.generalContractorInfo.isKnown === 'yes'

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
      namedInsured: submission.primaryNamedInsured,
      quotedPremium: `$${utilities.commifyNumber(submission.oiPremium.quotedPremium)}`,
      terrorPremium: `$${utilities.commifyNumber(submission.oiPremium.terrorPremium)}`,
      addtlPremium: `$${utilities.commifyNumber(submission.oiPremium.additionalCoverage)}`,
      totalPremium: `$${utilities.commifyNumber(submission.oiPremium.totalPremium)}`,
      totalCost: `$${utilities.commifyNumber(submission.oiPremium.totalCost)}`,
      inspectionAmount: `$${utilities.commifyNumber(325)}`,
      insuredAddress: submission.namedInsuredAddress ? submission.namedInsuredAddress.street: '',
      insuredCity: submission.namedInsuredAddress ? submission.namedInsuredAddress.city: '',
      insuredState: submission.namedInsuredAddress ? submission.namedInsuredAddress.state : '',
      insuredZip: submission.namedInsuredAddress ? submission.namedInsuredAddress.zip: '',
      projectAddress: submission.projectAddress ? submission.projectAddress.street: '',
      projectCity: submission.projectAddress ? submission.projectAddress.city: '',
      projectState: submission.projectAddress ? submission.projectAddress.state: '',
      projectZip: submission.projectAddress ? submission.projectAddress.zip: '',
      createdDate: submission.createdAt ? submission.createdAt.toLocaleDateString(): '',
      projectScope: submission.scope,
      projectTerm: `${submission.term} months`,
      projectCosts: `$${utilities.commifyNumber(submission.costs)}`,
      gcKnown: submission.generalContractorInfo ? submission.generalContractorInfo.isKnown: '',
      gcName: submission.generalContractorInfo ? submission.generalContractorInfo.name : 'GC Pending',
      gcCarrier: submission.generalContractorInfo ? submission.generalContractorInfo.glCarrier : 'N/A',
      gcLimit: submission.generalContractorInfo ? submission.generalContractorInfo.glLimits : 'N/A',
      glExpirationDate: submission.generalContractorInfo ? submission.generalContractorInfo.glExpirationDate : 'N/A',
      gcSubcontractor: gcInfo ? submission.generalContractorInfo.name : 'N/A',
      gcSupervisingSubs: gcInfo ? submission.generalContractorInfo.isSupervisingSubs : 'N/A',
      argoEmail: config.argoEmail,
      willHaveOtherNamed: submission.hasOtherNamedInsured && submission.otherNamedInsured.name ? true : false,
      otherRole: submission.hasOtherNamedInsured ? submission.otherNamedInsured.role : 'No other Named Insured entities submitted',
      otherRelationship: submission.hasOtherNamedInsured ? submission.otherNamedInsured.relationship : 'N/A',
      otherContractors: gcInfo && submission.generalContractorInfo.isSupervisingSubs === 'yes' ? true : false,
      otherName: submission.hasOtherNamedInsured ? submission.otherNamedInsured.name : 'No AI Entities Submitted',
      greaterThanTwoAdditional: submission.greaterThanTwoAdditional,
      additionalName: submission.hasAdditionalInsured ? submission.additionalInsured.name : 'No Additional Insured',
      additionalRole: submission.hasAdditionalInsured ? submission.additionalInsured.role : 'N/A',
      additionalRelationship: submission.hasAdditionalInsured ? submission.additionalInsured.relationship : 'N/A',
      commissionRate: `${submission.commission} %`,
      occurenceLimit: `$${utilities.commifyNumber(occAggLimit)}`,
      aggregateLimit: `$${utilities.commifyNumber(genAggLimit)}`,
      willHaveOccupancy: submission.occupancyDetails && submission.occupancyDetails.willHave === 'yes' ? true : false,
      occupancyBuildingAccessLimited: submission.occupancyDetails && submission.occupancyDetails.buildingAccessLimited === 'yes' ? true : false,
      occupancySecurityCameras: submission.occupancyDetails && submission.occupancyDetails.securityCameras === 'yes' ? true : false,
      occupancyDoorman: submission.occupancyDetails && submission.occupancyDetails.doorman === 'yes' ? true : false,
      occupancySecurityPersonnel: submission.occupancyDetails && submission.occupancyDetails.securityPersonnel === 'yes' ? true : false,
      occupancySeparateEntry: submission.occupancyDetails && submission.occupancyDetails.separateEntry === 'yes' ? true : false,
      occupancySeparateStairwells: submission.occupancyDetails && submission.occupancyDetails.separateStairwells === 'yes' ? true : false,
      occupancyLossesInLastFiveYears: submission.occupancyDetails && submission.occupancyDetails.lossesInLastFiveYears === 'yes' ? true : false,
      occupancySquareFootage: submission.occupancyDetails ? submission.occupancyDetails.squareFootage : 'N/A',
      occupancyNumberOfUnits: submission.occupancyDetails ? submission.occupancyDetails.numberOfUnits : 'N/A',
      occupancyType: submission.occupancyDetails ? submission.occupancyDetails.type : 'N/A',
      occupancyTypeCommercial: submission.occupancyDetails && submission.occupancyDetails.type === 'commercial' ? true : false,
      occupancyTypeResidential: submission.occupancyDetails && submission.occupancyDetails.type === 'residential' ? true : false,
      occupancyIsCoverageDesired: submission.occupancyDetails && submission.occupancyDetails.isCoverageDesired === 'yes' ? true : false,
      willHaveDemoDetails: submission.demoDetails && submission.demoDetails.willHave === 'yes' ? true : false,
      demoDetailsPedestrianSafetyPrecautions: submission.demoDetails ? submission.demoDetails.pedestrianSafetyPrecautions : 'N/A',
      demoDetailsDuration: submission.demoDetails ? submission.demoDetails.duration : 'N/A',
      demoDetailsCosts: submission.demoDetails ? submission.demoDetails.costs : 'N/A',
      demoDetailsSubcontractor: submission.demoDetails ? submission.demoDetails.subcontractor : 'N/A',
      towerCraneUse: submission.towerCraneUse && submission.towerCraneUse === 'yes' ? true : false,
      anyWorkCompleted: submission.workDetails && submission.workDetails.whatsCompleted !== '' ? true : false,
      workStartDate: submission.workDetails ? submission.workDetails.startDate : 'N/A',
      whatsCompleted: submission.workDetails ? submission.workDetails.whatsCompleted : 'N/A',
      brokerName: submission.broker ? submission.broker.name: '',
      deductibleText: submission.namedInsuredAddress && submission.namedInsuredAddress.state === 'NY' ? '$10,0000' : '$2,500',
      anticipatedFinishDate: submission.anticipatedFinishDate,
      projectDefinedAreaScope: submission.projectDefinedAreaScope,
      projectDefinedAreaScopeDetails: submission.projectDefinedAreaScopeDetails,
      projectRequirements: submission.projectRequirements,
      limitsRequested: submission.limitsRequested ? limitsRequested[0][submission.limitsRequested] : 'N/A',
    }
    if (submission.hasOtherNamedInsured) {
      pdfData.hasOtherNamedInsuredExist = true;
    }
    if (submission.hasAdditionalInsured) {
      pdfData.hasAdditionalInsuredExist = true;
    }
    if (submission.broker.name === 'Marsh USA Inc./R-T Specialty'){
      pdfData.marshBroker = true;
    }
    return pdfData;
  } catch (err) {
    console.log(err.message)
  }
}

async function generateConfirmationNumber() {
  let confirmation = randomstring.generate({
    length: 12,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
  });
  let submission = await models.Submission.findOne({
    confirmationNumber: confirmation
  }).exec()
  if (!submission) {
    return confirmation
  } else {
    generateConfirmationNumber();
  }
}

export default {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  generateOwnersEdgeQuotationPDF,
  generateExcessPDF,
  generateBindOrderPDF,
  getAllSubmissionsByBroker,
  generateColonyOwnersInterestQuestionnairePDF,
  generateOwnersContractorsProtectivePDF
}
