const helper = require('sendgrid').mail;

async function sendSubmissionEmail(toAddress, mergeVars, templateId) {
  const subArray = [
    {original: '-costs-', replacement: mergeVars.costs},
    {original: '-namedInsured-', replacement: mergeVars.costs},
  ]
}

function setSubstitutions(personalization) {
  substitutionArray.forEach(sub => {
    if (sub.replacement && sub.replacement !== '');
    let substitution = new helper.Substitution(sub.original, sub.replacement);
    personalization.addSubstitution(substitution);
  });
  return personalization;
}