const helper = require('sendgrid').mail

export default async function buildMail(type, toAddress, submission, templateId, pdfArray) {
  const mail = new helper.Mail()
  const fromEmail = new helper.Email('digital.ventures.argo@gmail.com', 'Owners Edge Submission Service')

  console.log('building the mail!')
  mail.setFrom(fromEmail)

  const personalization = new helper.Personalization()
  const toEmail = new helper.Email(toAddress)
  personalization.addTo(toEmail)

  switch (type) {
    case 'quotedArgo':
      mail.setSubject(`Priced : ${submission.broker.name} ${submission.primaryInsuredName}`)
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name))
      personalization.addSubstitution(new helper.Substitution('{{brokerEmail}}', submission.contactInfo.email))
      personalization.addSubstitution(new helper.Substitution('{{brokerPhone}}', submission.contactInfo.phone))
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.primaryInsuredName))
      break

    case 'quotedBroker':
      mail.setSubject(`Your Submission and Pricing Details`)
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name))
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.primaryInsuredName))
      personalization.addSubstitution(new helper.Substitution('{{confirmationNumber}}', submission.confirmationNumber))
      break

    case 'nonQuoteArgo':
      mail.setSubject(`Not Priced : ${submission.broker.name} ${submission.primaryInsuredName}`)
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name))
      personalization.addSubstitution(new helper.Substitution('{{brokerEmail}}', submission.contactInfo.email))
      personalization.addSubstitution(new helper.Substitution('{{brokerPhone}}', submission.contactInfo.phone))
      personalization.addSubstitution(new helper.Substitution('{{namedInsured}}', submission.primaryInsuredName))
      break

    case 'nonQuoteBroker':
      mail.setSubject('Your Submission Details')
      personalization.addSubstitution(new helper.Substitution('{{brokerName}}', submission.broker.name))
      const reasonsHTML = buildReasonsHTML(submission)
      personalization.addSubstitution(new helper.Substitution('{{nonQuoteReasons}}', reasonsHTML))
      
  }

  mail.addPersonalization(personalization)
  mail.setTemplateId(templateId)

  if (pdfArray.length > 0) {
    pdfArray.map((pdf) => {
      const attachment = new helper.Attachment()
      attachment.setContent(pdf.content.toString('base64'))
      attachment.setType("application/pdf")
      attachment.setFilename(pdf.title)
      attachment.setDisposition("attachment")
      mail.addAttachment(attachment)
    })
  }
  return mail
}

function buildReasonsHTML(submission){
  let reasons = submission.rating[submission.type].reason
  let htmlString = '<div><table>'
  reasons.map(reason => {
    htmlString += `<tr><td>${reason}</td></tr>`
  })
  htmlString += '</table></div>'

  return htmlString
}
