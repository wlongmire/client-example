import config from '../../../config';
import rp from 'request-promise';
import handlebars from 'handlebars';
import pdf from 'html-pdf';
import { getPDFData } from './';

export default async function generatePDF(token, type) {
   return new Promise(async (resolve, reject) => {
    try {
      console.log(`type: ${type}, token: ${token}`)
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
          htmlUrl = config.ownersBindOrderPDFUrl
          break;
        case 'excess':
          htmlUrl = config.excessPDFUrl
          break;
      }
      console.log(htmlUrl);
      const body = await rp(htmlUrl);
      let html = generateHTML(body, data);
      pdf.create(html, config.pdfOptions).toBuffer(function (err, buffer) {
        return resolve(buffer);
      });
    } catch (err) {
      return reject(err);
    }
  });
}

function generateHTML(body, pdfData) {
  let handleTemplate = handlebars.compile(body);
  let html = handleTemplate(Object.assign({}, pdfData));
  return html;
}