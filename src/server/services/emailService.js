import config from '../../config';

const helper = require('sendgrid').mail;


async function sendSubmissionEmail(toAddress, mergeVars, templateId) {
  console.log(mergeVars);
  let mail = new helper.Mail()
  let fromEmail = new helper.Email('submissions@ownersedge.us', 'Owners Edge Submission Service');
  mail.setFrom(fromEmail);
  mail.setSubject("Hello World from the SendGrid Node.js Library")
  let personalization = new helper.Personalization()
  let toEmail = new helper.Email(toAddress);
  personalization.addTo(toEmail);
  let content = new helper.Content("text/html", "<html><body></body></html>")
  mail.addContent(content);
  const subArray = [
    {original: '-costs-', replacement: mergeVars.costs},
    {original: '-namedInsured-', replacement: mergeVars.namedInsured},
  ]
  subArray.forEach(sub => {
    if (sub.replacement && sub.replacement !== '');
    let substitution = new helper.Substitution(sub.original, sub.replacement);
    personalization.addSubstitution(substitution);
  });
  mail.addPersonalization(personalization);
  mail.setTemplateId('21b98629-1c78-4de5-81a0-431f6666bc98');
  console.log(mail.toJSON());


  // let from_email = new helper.Email("test@example.com")
  // let to_email = new helper.Email("test@example.com")
  // let subject = "Hello World from the SendGrid Node.js Library"
  // let content = new helper.Content("text/plain", "some text here")
  // let mail = new helper.Mail(from_email, subject, to_email, content)
  // let email = new helper.Email("test2@example.com")
  // mail.personalizations[0].addTo(email)

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
  // requestpost.headers['Content-Type'] = 'application/json'
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
  sendSubmissionEmail
}