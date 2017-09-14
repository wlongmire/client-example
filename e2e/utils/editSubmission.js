function editSubmission (browser, totalCost, phoneNumber, editSearchValue) {
  return browser
      .useXpath()
      .setValue('/html/body/div[1]/div/div/div/div/div[1]/div/div[2]/div/input', editSearchValue)
      .pause(500)
      .click('/html/body/div[1]/div/div/div/div/div[2]/div[2]/table/tbody/tr/td[11]/button')
      .useCss()
      // .click('.btn-default')
      .pause(2500)
      .clearValue('#totalCost')
      .setValue('#totalCost', totalCost)
      .clearValue('#phone')
      .setValue('#phone', phoneNumber)
}

module.exports = editSubmission;
