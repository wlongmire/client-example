import { buildMail } from './'

export async function sendMail (type, toAddress, submission, templateId, pdfArray){
  return new Promise ( async (resolve, reject) => {
    let mail = await buildMail(type, toAddress, submission, templateId, pdfArray)

    var sg = require('sendgrid')(config.sendGridKey);
    let requestBody = mail.toJSON();
    var emptyRequest = require('sendgrid-rest').request;
    var requestPost = JSON.parse(JSON.stringify(emptyRequest));

    requestPost.method = 'POST';
    requestPost.path = '/v3/mail/send';
    requestPost.body = requestBody;

      sg.API(requestPost, function (error, response) {
      if (error) {
      return reject(error);
      }
      else {
        return resolve(response);
      }
    });
  });
}