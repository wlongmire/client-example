import request from 'request';
import config from '../../../config';
import { emailService, submissionService } from '../../services';

const appId = config.appId;
const argoEmail = config.argoEmail;

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
        sendSubmissionEmailClient(submission);
        createNewSubmission(submission);
        return res.status(response.statusCode).json({success: true, premium: result.premium});
      }
    });
  } catch (err) {
    return res.status(500)
  }
}

async function getAllSubmissions(req, res) {

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

  let submission = {
    costs: subInfo.costs,
    premium: premium
  }
  return submission;
}

export default {
  getRating,
}