
function checkSaveSubmission(browser, primaryInsuredName) {
 return browser
      .useXpath()
      .click('/html/body/div[1]/div/nav/div/div[2]/ul/li[1]/a')
      .pause(7000)
      .setValue('/html/body/div[1]/div/div/div/div/div[1]/div/div[2]/div/input', primaryInsuredName)
      .useCss()
      .assert.containsText('.submissionHover', primaryInsuredName, 'Submission shows up in Submission Table!')
}

module.exports = checkSaveSubmission;
