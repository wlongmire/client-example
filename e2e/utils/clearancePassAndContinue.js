// wait for clearance to pass and get to the rest of the form
function clearancePassAndContinue(browser) {
 return browser
      .useCss()
      .waitForElementVisible('.match', 30000, null, null, 'You got to the clearance result screen!')
      .assert.containsText('.clearance', 'This Submission Has Passed Clearance!', 'Passed Clearance')
      .pause(1000)
      .useCss()
      .click('.clearanceButton')
      // .click('button.btn.btn-default')
}

module.exports = clearancePassAndContinue;
