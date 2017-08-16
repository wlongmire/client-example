// ensure that the edited submission is properly updated

// this function converts a number to have commas and dollar sign
function numberWithCommas(x) {
  const numWithCommas = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return '$' + numWithCommas;
}

function checkEditSubmission(browser, randomPhoneNumber, randomTotalCost, editSearchValue) {
 return browser
      .useXpath()
      .click('/html/body/div[1]/div/nav/div/div[2]/ul/li[1]/a')
      .pause(7000)
      .setValue('/html/body/div[1]/div/div/div/div/div[1]/div/div[2]/div/input', editSearchValue)
      .useCss()
      .click('.btn-default')
      .pause(2500)
      .getValue("#phone", function(result) {
        this.assert.equal(result.value, randomPhoneNumber);
      })
      .getValue("#totalCost", function(result) {
        this.assert.equal(result.value, numberWithCommas(randomTotalCost));
      })
}

module.exports = checkEditSubmission;
