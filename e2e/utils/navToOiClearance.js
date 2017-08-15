// navigate to ocp clearance form
function navToOiClearance(browser) {
  return browser
      .waitForElementVisible('/html/body/div[1]/div/nav/div/div[2]/ul/li[2]/a', null, null, null, 'Got To OI - Part 1')
      .click('/html/body/div[1]/div/nav/div/div[2]/ul/li[2]/a')
      .waitForElementVisible('/html/body/div[1]/div/div/div/div[1]', null, null, null, 'Got To OI - Part 2')
      .click('/html/body/div[1]/div/div/div/div[1]')
}

module.exports = navToOiClearance;