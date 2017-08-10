function editSubmission (browser, totalCost, phoneNumber, editSearchValue) {
  return browser
      // .useXpath()
      // .setValue('/html/body/div[1]/div/div/div/div/div[2]/div[2]/table/tbody/tr[1]/td[11]/button', editSearchValue)
      // .pause(1000)
      // .useCss()
      // .click('/html/body/div[1]/div/div/div/div/div[2]/div[2]/table/tbody/tr[1]/td[11]/button', editSearchValue)
      .click('.btn-default')
      .pause(2500)
      .clearValue('#totalCost')
      .setValue('#totalCost', totalCost)
      .clearValue('#phone')
      .setValue('#phone', phoneNumber)
}

module.exports = editSubmission;
