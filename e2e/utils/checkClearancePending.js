function checkClearancePending(browser) {
  return browser
    .useCss()
    .waitForElementVisible('.sub-header-firstRow', 45000, null, null, 'You got to the the form screen!')
    .assert.containsText('.sub-header-firstRow', 'CLEARANCE NEEDS REVIEW', 'Passed Clearance')
    .pause(1000)
}

module.exports = checkClearancePending