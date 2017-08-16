function submitForm(browser) {
  return browser
    .useXpath()
    .click('/html/body/div[1]/div/div/form/div/div[22]/button')
    // .useCss()
    // .click('.submitForm') // click on Review Submission
    .useCss()
    .waitForElementVisible('.confirmationDialog', null, null, null, 'Got to Confirmation Modal!')
    .pause(1000)
    // .click('.secondary') // click on Get Pricing
    // .click('.getPricing')
    .useXpath()
    .click('/html/body/div[3]/div/div[2]/div/div/div[2]/div/div[2]/button[1]')
    .useCss()
    .waitForElementVisible('.success', 30000, null, null, 'Got To Quote Results Screen!') // wait on pricing page until Owners and Protective Element is present
    .assert.containsText('.success', 'Your submission forms have been successfully processed.', 'Submission was a success - Emails have been sent and qoute has been saved!')
}

module.exports = submitForm;
