import config from '../../config';
import {utilities} from '../utils';

const helper = require('sendgrid').mail;
const fs = require('fs');

async function sendSubmissionEmail(type, toAddress, submission, templateId, pdfArray) {
  let mail = new helper.Mail()
  let fromEmail = new helper.Email('submissions@ownersedge.us', 'Owners Edge Submission Service');
  mail.setFrom(fromEmail);
  mail.setSubject("Submission Received")
  let personalization = new helper.Personalization()
  let toEmail = new helper.Email(toAddress);
  personalization.addTo(toEmail);
  switch (type) {
    case 'quotedArgo':
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name));
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.namedInsured));
    break;
    case 'quotedBroker':
          personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name));
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.primaryNamedInsured));
      personalization.addSubstitution(new helper.Substitution('{{confirmationNumber}}', submission.confirmationNumber))
    break;
    case 'nonQuoteArgo':
          personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name));
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.namedInsured));
    break;
    }
  mail.addPersonalization(personalization);
  mail.setTemplateId(templateId);

// Add Bind Order Sheet as the cover pdf
let attachment = new helper.Attachment();
let file = fs.readFileSync(`${__dirname}/Owners_Bind_Order.pdf`);
let base64File = new Buffer(file).toString('base64');
attachment.setContent(base64File);
attachment.setType('application/pdf');
attachment.setFilename('Owners Bind Order.pdf');
attachment.setDisposition('attachment');
mail.addAttachment(attachment);


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
  var sg = require('sendgrid')(config.sendGridKey)
  let requestBody = mail.toJSON();
  var emptyRequest = require('sendgrid-rest').request
  var requestPost = JSON.parse(JSON.stringify(emptyRequest))
  requestPost.method = 'POST'
  requestPost.path = '/v3/mail/send'
  requestPost.body = requestBody
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

export default {
  sendSubmissionEmail,
  send
}