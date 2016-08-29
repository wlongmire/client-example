import config from '../../config';
import {utilities} from '../utils';

const helper = require('sendgrid').mail;


async function sendSubmissionEmail(toAddress, mergeVars, templateId, pdf) {
  let mail = new helper.Mail()
  let fromEmail = new helper.Email('submissions@ownersedge.us', 'Owners Edge Submission Service');
  mail.setFrom(fromEmail);
  mail.setSubject("Submission Received")
  let personalization = new helper.Personalization()
  let toEmail = new helper.Email(toAddress);
  personalization.addTo(toEmail);
  // const subArray = [
  //   {original: '-costs-', replacement: `$${utilities.commifyNumber(mergeVars.costs)}`},
  //   {original: '-namedInsured-', replacement: mergeVars.primaryNamedInsured},
  //   {original: '-confirmationNumber-', replacement: mergeVars.confirmationNumber},
  //   {original: '-hasOtherNamedInsured-', replacement: mergeVars.hasOtherNamedInsured.toString()},
  //   {original: '-insuredAddress-', replacement: mergeVars.namedInsuredAddress.street},
  //   {original: '-insuredCity-', replacement: mergeVars.namedInsuredAddress.city},
  //   {original: '-insurecState-', replacement: mergeVars.namedInsuredAddress.state},
  //   {original: '-insuredZip-', replacement: mergeVars.namedInsuredAddress.zip},
  //   {original: '-otherInsuredName-', replacement: mergeVars.hasOtherNamedInsured ? mergeVars.otherNamedInsured.name : ''},
  //   {original: '-otherInsuredRole-', replacement: mergeVars.hasOtherNamedInsured  ? mergeVars.otherNamedInsured.role : ''},
  //   {original: '-otherInsuredRelationship-', replacement: mergeVars.hasOtherNamedInsured ? mergeVars.otherNamedInsured.relationship : ''},
  //   {original: '-projectAddress-', replacement: mergeVars.projectAddress.street},
  //   {original: '-projectCity-', replacement: mergeVars.projectAddress.city},
  //   {original: '-projectState-', replacement: mergeVars.projectAddress.state},
  //   {original: '-projectZip-', replacement: mergeVars.projectAddress.zip},
  //   {original: '-scope-', replacement: mergeVars.scope},
  //   {original: '-term-', replacement: `${mergeVars.term} months`},
  //   // {original: '-generalContractor-', replacement: mergeVars.primaryNamedInsured},
  //   {original: '-quotedPremium-', replacement: `$${utilities.commifyNumber(mergeVars.quotedPremium)}`}
  // ]
  // console.log(subArray);
  // subArray.forEach(sub => {
  //   let substitution;
  //   if (sub.replacement !== '') {
  //     substitution = new helper.Substitution(sub.original, sub.replacement);
  //   } else {
  //     substitution = new helper.Substitution(sub.original, `N/A`);
  //   }
  //   personalization.addSubstitution(substitution);
  // });
  mail.addPersonalization(personalization);
  mail.setTemplateId(templateId);
  if (utilities.isDefined(pdf)) {
    let attachment = new helper.Attachment()
    attachment.setContent(pdf.toString('base64'))
    attachment.setType("application/pdf")
    attachment.setFilename(`OwnersEdge-Submission-${mergeVars.confirmationNumber}.pdf`)
    attachment.setDisposition("attachment")
    mail.addAttachment(attachment)
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