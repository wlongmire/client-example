function checkQuoteSuccessScreen(browser) {
  return browser
    .useCss()
    .waitForElementVisible('.success', 30000, null, null, 'Got To Quote Results Screen!') // wait on pricing page until Owners and Protective Element is present
    .assert.containsText('.success', 'Your submission forms have been successfully processed.', 'Submission was a success - Emails have been sent and qoute has been saved!')
}

module.exports = checkQuoteSuccessScreen
