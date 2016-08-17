import request from 'request';
import config from '../../../config';
import { emailService, submissionService } from '../../services';

const appId = config.appId;
const argoEmail = config.argoEmail;

async function getSubmissions(req, res) {

}

async function getSingleSubmission(req, res) {
  const id = req.params.id || '';
}

function getRating(req, res) {

  try {
    const params = JSON.stringify(req.body);
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
        sendSubmissionEmailArgo(submission);
        //sendSubmissionEmailClient(submission);
        createNewSubmission(submission)
          .then(newSub => {
            return res.status(response.statusCode).json({success: true, premium: result.premium, confirmation: newSub.confirmationNumber});
          });
        }
    });
  } catch (err) {
    return res.status(500)
  }
}

function sendSubmissionEmailArgo(submission) {
  emailService.sendSubmissionEmail(argoEmail, submission, config.argoSubEmailId);
}

function sendSubmissionEmailClient(submission) {
  emailService.sendSubmissionEmail(submission.email, submission, config.clientSubEmailId);
}

async function createNewSubmission(submission) {
  return await submissionService.createSubmission(submission);
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
  hasOtherNamedInsured: subInfo.hasOtherNamedInsured,
  otherNamedInsured: subInfo.otherNamedInsured,
  projectAddress: subInfo.address,
  scope: subInfo.scope,
  term: subInfo.term,
  costs: subInfo.costs,
  generalContractorInfo: subInfo.generalContractorInfo,
  occupancyDetails: subInfo.occupancyDetails,
  workDetails: subInfo.workDetails,
  contactInfo: subInfo.contactInfo,
  quotedPremium: premium,
  status: 'submitted',
  createdAt: today,
  updatedAt: today
  }
  return submission;
}

export default {
  getRating,
  getSubmissions,
  getSingleSubmission
}