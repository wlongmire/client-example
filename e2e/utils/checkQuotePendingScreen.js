function checkQuotePendingScreen(browser) {
  return browser
    .useCss()
    .waitForElementVisible('.pendingFirstRow', 30000, null, null, 'Got To Quote Results Screen!') // wait on pricing page until Owners and Protective Element is present
    .assert.containsText('.pendingFirstRow', 'Pricing will be emailed after clearance is confirmed.')
}

module.exports = checkQuotePendingScreen
