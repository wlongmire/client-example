function checkClearancePass(browser) {
  return browser
    .useCss()
    .waitForElementVisible('.sub-header-firstRow', 30000, null, null, 'You got to the the form screen!')
    .assert.containsText('.sub-header-firstRow', 'CLEARANCE PASSED', 'Passed Clearance')
    .pause(1000)
}

module.exports = checkClearancePass