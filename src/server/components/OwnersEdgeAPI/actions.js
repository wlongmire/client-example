import request from 'request';
import config from '../../../config';
import { emailService } from '../../services';

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
        sendSubmissionEmailArgo(req.body, result);
        return res.status(response.statusCode).json({success: true, premium: result.premium});
      }
    });
  } catch (err) {
    return res.status(500)
  }
}

function sendSubmissionEmailArgo(info, quote) {

}

function sendSubmissionEmailClient(info, quote) {

}

export default {
  getRating
}