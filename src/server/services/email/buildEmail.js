import config from '../../../config';
import {utilities} from '../../utils';

const helper = require('sendgrid').mail;

export default async function buildMail(type, toAddress, submission, templateId, pdfArray) {
  let mail = new helper.Mail()
  let fromEmail = new helper.Email('submissions@ownersedge.us', 'Owners Edge Submission Service');

  mail.setFrom(fromEmail);

  let personalization = new helper.Personalization()
  let toEmail = new helper.Email(toAddress);
  personalization.addTo(toEmail);

  switch (type) {
    case 'quotedArgo':
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name));
      personalization.addSubstitution(new helper.Substitution('{{brokerEmail}}', submission.contactInfo.email));
      personalization.addSubstitution(new helper.Substitution('{{brokerPhone}}', submission.contactInfo.phone));
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.primaryInsuredName));
    break;

    case 'quotedBroker':
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name));
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.primaryInsuredName));
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

  if (pdfArray.length > 0) {
      pdfArray.map(pdf => {
        let attachment = new helper.Attachment()
        attachment.setContent(pdf.content.toString('base64'))
        attachment.setType("application/pdf")
        attachment.setFilename(pdf.title)
        attachment.setDisposition("attachment")
        mail.addAttachment(attachment)
    });
  }
  console.log(mail)
  return mail;
}

function buildReasonsHTML(submission){
  let reasons = submission.rating[submission.type].reason;
  let htmlString = `<div><table>`
  reasons.map(reason => {
    htmlString += `<tr><td>${reason}</td></tr>`
  });
  htmlString += `</table></div>`
  return htmlString
}
