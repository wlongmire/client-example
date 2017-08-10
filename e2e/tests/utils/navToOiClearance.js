// navigate to ocp clearance form
function navToOiClearance(browser) {
  return browser
      .click('/html/body/div[1]/div/nav/div/div[2]/ul/li[2]/a')
      .click('/html/body/div[1]/div/div/div/div[1]')
}

module.exports = navToOiClearance;