function clearanceFail(browser) {
  return browser
    .useCss()
    .waitForElementVisible('.match', 30000, null, null, 'There is a match on the screen!')
    .assert.containsText('.clearance', 'This Submission Did Not Pass Clearance.', 'Clearance did not pass!')
}

module.exports = clearanceFail;