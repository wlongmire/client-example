const uid = require('uid-safe');

function clearanceFormFillout (browser, unique = true, primaryInsuredName) {
  const randomString = (unique === true) ? uid.sync(8) : '';
  const insuredName = primaryInsuredName || 'Andriy Kulak' + randomString
  const primaryInsuredAddress = (unique === true) ? randomString : '347 94th Street';
  const primaryInsuredCity = (unique === true) ? randomString : 'Brooklyn';
  const primaryInsuredState = 'New York'
  const primaryInsuredZipcode = (unique === true) ? randomString : 11209;

  return browser
      .useCss()
      // first named insured fields
      .setValue('#primaryInsuredName', insuredName)
      .setValue('#primaryInsuredAddress', primaryInsuredAddress)
      .setValue('#primaryInsuredCity', primaryInsuredCity)
      .setValue('#primaryInsuredState', primaryInsuredState)
      .setValue('#primaryInsuredZipcode', primaryInsuredZipcode)

      // project fields
      .setValue('#projectAddress', primaryInsuredAddress)
      .setValue('#projectCity', primaryInsuredCity)
      .setValue('#projectState', primaryInsuredState)
      .setValue('#projectZipcode', [primaryInsuredZipcode, browser.Keys.ENTER])
  
}

module.exports = clearanceFormFillout;