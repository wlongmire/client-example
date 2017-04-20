import config from '../../../config';
import rp from 'request-promise';
import handlebars from 'handlebars';
import pdf from 'html-pdf';
import { getPDFData } from './';

export default async function generatePDF(token, type, submissionType = '') {
   return new Promise(async (resolve, reject) => {
    try {
      let htmlUrl;
      const data = await getPDFData(token);
      switch (type) {
        case 'ocp':
          htmlUrl = config.ownersContractorsProtectivePDFUrl
          break;
        case 'oi':
          htmlUrl = config.ownersEdgeQuotationPDFUrl
          break;
        case 'bind':
          if (submissionType == 'ocp') {
            htmlUrl = config.ocpBindOrderPDFUrl
          } else {
            htmlUrl = config.ownersBindOrderPDFUrl
          }
          break;
        case 'excess':
          htmlUrl = config.excessPDFUrl
          break;
      }
      const body = await rp(htmlUrl);
      let html = await generateHTML(body, data);
      pdf.create(html, config.pdfOptions).toBuffer(function (err, buffer) {
        return resolve(buffer);
      });
    } catch (err) {
      return reject(err);
    }
  });
}

function generateHTML(body, pdfData) {
  return new Promise((resolve, reject) => {
  try{
  let handleTemplate = handlebars.compile(body);
  let html = handleTemplate(Object.assign({}, pdfData));
  return resolve(html);
  } catch (err) {
    console.log(err.message)
    return reject(err)
  }
  })
}