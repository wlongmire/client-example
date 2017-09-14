
function checkSaveSubmission(browser, primaryInsuredName) {
  return browser
      .useXpath()
      .pause(5000)
      .click('/html/body/div[1]/div/nav/div/div[2]/ul/li[1]/a')
      .pause(4000)
      .setValue('/html/body/div[1]/div/div/div/div/div[1]/div/div[2]/div/input', primaryInsuredName)
      .pause(500)
      .useCss()
      .assert.containsText('.submissionHover', primaryInsuredName, 'Submission shows up in Submission Table!')
}

module.exports = checkSaveSubmission