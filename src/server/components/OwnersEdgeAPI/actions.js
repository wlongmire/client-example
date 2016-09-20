import request from 'request';
import config from '../../../config';
import {User, Broker} from '../../models';
import { emailService, submissionService } from '../../services';

const appId = config.appId;
const argoEmail = config.argoEmail;

async function getSubmissions(req, res) {

}

async function getSingleSubmission(req, res) {
  const id = req.params.id || '';
}

async function getRating(req, res) {
  try {

    // console.log("checking for token...");
    if (!req.headers['x-token']) {
      return res.status(401).json('Authorization token required');
    }
    // console.log("auth from token...");

    User.fromAuthToken(req.headers['x-token']).then((result) => {
      // console.log("fromAuthToken result is");
      // console.log(result);

      if (!result || !result.user) {
        // console.log("Invalid token!");
        return res.status(403).json({ type: "AuthError", message: "Access forbidden. Invalid user token." });
      }

      const params = JSON.stringify(req.body);
      const user = result.user;
      const newAuthToken = result.authToken;
      let broker;

      Broker.findById(user._brokerId).exec((err, brkr) => {
        // console.log("err?");
        // console.log(err);
        // console.log("found broker");

        broker = brkr;
      });
      // console.log("Broker is");
      // console.log(broker);
      // console.log("Sending request!");
      request({
        method: 'POST',
        uri: `http://ratingsapi-dev.herokuapp.com/api/rating/${appId}/calcRating`,
        body: params,
        headers: {
          'Content-Type': 'application/json'
        }
      }, function (err, response, body) {
        if (err) {
          return res.status(response.statusCode).json({success: false, type: err.type, message: err.message});
        }
        else {
          const result = JSON.parse(body);
          let submission = createSubmissionObject(req.body, result);
          
          submission.broker = broker;
          submission.submittedBy = user;

          // console.log('creating submission as ');
          // console.log(submission);

          createNewSubmission(submission)
            .then(newSub => {
              console.log(newSub.quotedPremium);
              if (newSub.quotedPremium > 0)
              {
                generateSubmissionPDF(newSub.pdfToken)
                  .then(pdf => {
                  sendSubmissionEmailArgo(newSub, pdf);
                  //sendSubmissionEmailClient(newSub);
                  return res.status(response.statusCode).json({success: true, premium: result.premium, confirmation: newSub.confirmationNumber, authToken: newAuthToken});
                })
                .catch(err => {
                  console.log(err.message);
                });
              } else {
                sendNonQuoteEmailArgo(newSub)
                return res.status(response.statusCode).json({success: true, premium: result.premium, confirmation: newSub.confirmationNumber, authToken: newAuthToken});
              }
            });
          }
      }).bind(this);  
    });
    
  } catch (err) {
    return res.status(500)
  }
}

function sendSubmissionEmailArgo(submission, pdf) {
  emailService.sendSubmissionEmail(argoEmail, submission, config.argoTemplateId, pdf);
}

function sendSubmissionEmailClient(submission, pdf) {
  emailService.sendSubmissionEmail(submission.email, submission, config.brokerTemplateId);
}

function sendNonQuoteEmailArgo(submission){
  emailService.sendSubmissionEmail(argoEmail, submission, '', null);
}

async function createNewSubmission(submission) {
  return await submissionService.createSubmission(submission);
}

async function generateSubmissionPDF(token) {
  let pdf = await submissionService.generateSubmissionPDF(token);
  return pdf;
}

function createSubmissionObject(subInfo, quoteInfo) {
  let premium;
  const today = new Date();
  if (quoteInfo.premium > 0) {
    premium = quoteInfo.premium;
  }
  let submission = {
  primaryNamedInsured: subInfo.primaryNamedInsured,
  namedInsuredAddress: subInfo.namedInsuredAddress,
  hasOtherNamedInsured: subInfo.otherNamedInsuredBoolean,
  otherNamedInsured: subInfo.otherNamedInsured,
  projectAddress: subInfo.address,
  scope: subInfo.scope,
  term: subInfo.term,
  costs: subInfo.costs,
  generalContractorInfo: subInfo.generalContractor,
  occupancyDetails: subInfo.occupancyDetails,
  workDetails: subInfo.workDetails,
  contactInfo: subInfo.contactInfo,
  quotedPremium: premium,
  status: 'submitted'
  }
  return submission;
}

export default {
  getRating,
  getSubmissions,
  getSingleSubmission
}