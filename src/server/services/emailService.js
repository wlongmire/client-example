import config from '../../config';
import {utilities} from '../utils';

const helper = require('sendgrid').mail;

async function sendSubmissionEmail(type, toAddress, submission, templateId, pdfArray) {
  let mail = new helper.Mail()
  let fromEmail = new helper.Email('digital.ventures.argo@gmail.com', 'Owners Edge Submission Service');

  mail.setFrom(fromEmail);
  mail.setSubject("Submission Received")

  let personalization = new helper.Personalization()
  let toEmail = new helper.Email(toAddress);
  personalization.addTo(toEmail);

  switch (type) {
    case 'quotedArgo':
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name));
      personalization.addSubstitution(new helper.Substitution('{{brokerEmail}}', submission.contactInfo.email));
      personalization.addSubstitution(new helper.Substitution('{{brokerPhone}}', submission.contactInfo.phone));
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.primaryNamedInsured));
    break;

    case 'quotedBroker':
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name));
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.primaryNamedInsured));
      personalization.addSubstitution(new helper.Substitution('{{confirmationNumber}}', submission.confirmationNumber))
    break;

    case 'quotedBroker':
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name));
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.primaryNamedInsured));
      personalization.addSubstitution(new helper.Substitution('{{confirmationNumber}}', submission.confirmationNumber))
    break;

    case 'nonQuoteArgo':
      personalization.addSubstitution(new helper.Substitution('{{brokerEmail}}', submission.contactInfo.email));
    break;

    case 'nonQuoteBroker':
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name));
      let reasonsHTML = buildReasonsHTML(submission);
      personalization.addSubstitution(new helper.Substitution('{{nonQuoteReasons}}', reasonsHTML));

    }
  mail.addPersonalization(personalization);
  mail.setTemplateId(templateId);

 console.log('---set Personalization---')
  if (pdfArray.length > 0) {
      pdfArray.forEach(pdf => {
        let attachment = new helper.Attachment()
        attachment.setContent(pdf.content.toString('base64'))
        attachment.setType("application/pdf")
        attachment.setFilename(pdf.title)
        attachment.setDisposition("attachment")
        mail.addAttachment(attachment)
    });
  }

  send(mail);
}

function send(mail){
  var sg = require('sendgrid')(config.sendGridKey);
  let requestBody = mail.toJSON();
  var emptyRequest = require('sendgrid-rest').request;
  var requestPost = JSON.parse(JSON.stringify(emptyRequest));

  requestPost.method = 'POST';
  requestPost.path = '/v3/mail/send';
  requestPost.body = requestBody;

  sg.API(requestPost, function (error, response) {
    if (error) {
     console.log(JSON.stringify(error))
    }
    else {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
    }
  })
}

function buildReasonsHTML(submission){
  let htmlString = `<div><table>`
  let reasonsArray = [];
  if (submission.costs > 30000000) {reasonsArray.push('Costs exceed $30,000,000')};
  if (submission.isSupervisingSubs || submission.supervisingSubs) {reasonsArray.push('Owner is directly involved in supervising subcontractors')};
  if (submission.demoRequired) {reasonsArray.push('Demolition is Required')};
  if (submission.towerCraneUse === 'yes'){reasonsArray.push('Tower Crane is being used')};
  if (submission.occupancy){reasonsArray.push('Coverage is being requested for occupancy')};
  reasonsArray.forEach(reason => {
    htmlString += `<tr><td>${reason}</td></tr>`
  });
  htmlString += `</table></div>`
  console.log(htmlString);
  return htmlString
}

export default {
  sendSubmissionEmail,
  send
}
